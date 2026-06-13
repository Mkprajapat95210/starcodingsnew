'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

// Custom Dropdown Component to perfectly match input-field styling
function CustomDropdown({
  name,
  options,
  value,
  onChange,
  placeholder,
}: {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label || '';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="form-group" style={{ position: 'relative' }} ref={dropdownRef}>
      <input type="hidden" name={name} value={value} required />

      <div onClick={() => setIsOpen(!isOpen)} style={{ position: 'relative', cursor: 'pointer' }}>
        <input
          type="text"
          className="input-field"
          value={selectedLabel}
          placeholder={placeholder}
          readOnly
          style={{ cursor: 'pointer', caretColor: 'transparent', paddingRight: '40px' }}
        />
        <i
          className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#a0a0a0',
            pointerEvents: 'none',
            transition: '0.3s'
          }}
        ></i>
      </div>

      {isOpen && (
        <div
          className="custom-dropdown-list"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: '#111',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            marginTop: '5px',
            maxHeight: '250px',
            overflowY: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          }}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              style={{
                padding: '12px 20px',
                cursor: 'pointer',
                color: value === opt.value ? '#ff3838' : '#fff',
                transition: 'all 0.2s ease',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                fontWeight: value === opt.value ? '600' : '400',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 56, 56, 0.1)';
                e.currentTarget.style.paddingLeft = '25px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.paddingLeft = '20px';
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReviewFormSection() {
  const [step, setStep] = useState<'email' | 'otp' | 'review'>('email');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [projects, setProjects] = useState<{ id: string; title: string }[]>([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Custom dropdown states
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  // Check if already logged in on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      // Fetch projects
      const { data } = await supabase.from('projects').select('id, title').order('created_at', { ascending: false });
      if (data) setProjects(data);

      // Check auth session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setStep('review');
      }
    };
    fetchInitialData();
  }, []);

  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setErrorMessage('Please use a valid @gmail.com email address.');
      return;
    }

    setStatus('loading');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setStatus('error');
    } else {
      setStatus('idle');
      setStep('otp');
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const formData = new FormData(e.currentTarget);
    const token = formData.get('token') as string;

    setStatus('loading');
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) {
      setErrorMessage(error.message);
      setStatus('error');
    } else {
      setStatus('idle');
      setStep('review');
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload file to Supabase Storage
  const uploadProfileImage = async (userId: string) => {
    if (!profileImage) return null;

    setUploading(true);
    const fileExt = profileImage.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('review-profiles')
      .upload(filePath, profileImage, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      setUploading(false);
      return null;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('review-profiles')
      .getPublicUrl(filePath);

    setUploading(false);
    return data.publicUrl;
  };

  const handleSubmitReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const project_id = formData.get('project_id') as string;
    const rating = Number(formData.get('rating'));
    const text = formData.get('text') as string;

    if (!project_id || !rating) {
      setErrorMessage('Please select a project and a rating.');
      setStatus('error');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setErrorMessage('You must be logged in to submit a review.');
      setStatus('error');
      return;
    }

    let profileImageUrl = null;
    if (profileImage) {
      profileImageUrl = await uploadProfileImage(user.id);
      console.log('Uploaded profile image URL:', profileImageUrl); // Log the URL
    }

    const { error } = await supabase.from('reviews').insert([
      { 
        user_id: user.id, 
        project_id, 
        name, 
        rating, 
        text, 
        status: 'pending',
        profile_image_url: profileImageUrl 
      },
    ]).select(); // Add select to get the inserted row back

    console.log('Insert error:', error);

    if (error) {
      setErrorMessage(error.message);
      setStatus('error');
    } else {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setSelectedProject('');
      setSelectedRating('');
      setProfileImage(null);
      setProfileImagePreview(null);
    }
  };

  return (
    <section className="get-in-touch-area tmp-section-gapBottom">
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="contact-get-in-touch-wrap">
          <div className="get-in-touch-wrapper tmponhover">
            <div className="row g-5 align-items-center">
              <div className="col-lg-5">
                <div className="section-head text-align-left">
                  <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                    <span className="subtitle">CUSTOMER REVIEWS</span>
                  </div>
                  <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                    Share Your Experience
                  </h2>
                  <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                    We value your feedback! Please log in with your Gmail account to write a review. Your insights help us improve and serve you better.
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="contact-inner">
                  <div className="contact-form">
                    {errorMessage && (
                      <div className="error" style={{ marginBottom: '15px', color: '#ff4d4f' }}>
                        <p>{errorMessage}</p>
                      </div>
                    )}
                    {status === 'success' && step === 'review' && (
                      <div style={{ marginBottom: '15px', color: '#52c41a' }}>
                        <p>Thank you! Your review has been submitted successfully and is pending approval.</p>
                      </div>
                    )}

                    {step === 'email' && (
                      <form className="tmp-dynamic-form" onSubmit={handleSendOtp}>
                        <div className="contact-form-wrapper row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <input
                                className="input-field"
                                type="email"
                                placeholder="Enter your @gmail.com address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="tmp-button-here">
                              <button
                                className="tmp-btn hover-icon-reverse radius-round w-100"
                                type="submit"
                                disabled={status === 'loading'}
                              >
                                <span className="icon-reverse-wrapper">
                                  <span className="btn-text">
                                    {status === 'loading' ? 'Sending...' : 'Send Login Code'}
                                  </span>
                                  <span className="btn-icon">
                                    <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                  </span>
                                  <span className="btn-icon">
                                    <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                  </span>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}

                    {step === 'otp' && (
                      <form className="tmp-dynamic-form" onSubmit={handleVerifyOtp}>
                        <div className="contact-form-wrapper row">
                          <div className="col-lg-12">
                            <p style={{ marginBottom: '15px', color: '#fff' }}>
                              We sent a 6-digit code to <strong>{email}</strong>
                            </p>
                            <div className="form-group">
                              <input
                                className="input-field"
                                type="text"
                                name="token"
                                placeholder="Enter 6-digit OTP"
                                required
                                pattern="\d{6}"
                                title="Please enter a 6-digit OTP"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="tmp-button-here">
                              <button
                                className="tmp-btn hover-icon-reverse radius-round w-100"
                                type="submit"
                                disabled={status === 'loading'}
                              >
                                <span className="icon-reverse-wrapper">
                                  <span className="btn-text">
                                    {status === 'loading' ? 'Verifying...' : 'Verify & Continue'}
                                  </span>
                                  <span className="btn-icon">
                                    <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                  </span>
                                  <span className="btn-icon">
                                    <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                  </span>
                                </span>
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => setStep('email')}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#a0a0a0',
                                marginTop: '15px',
                                textDecoration: 'underline',
                              }}
                            >
                              Change Email
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {step === 'review' && status !== 'success' && (
                      <form className="tmp-dynamic-form" onSubmit={handleSubmitReview}>
                        <div className="contact-form-wrapper row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <input
                                className="input-field"
                                name="name"
                                placeholder="Your Name"
                                type="text"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <CustomDropdown
                              name="project_id"
                              placeholder="Select Project"
                              value={selectedProject}
                              onChange={setSelectedProject}
                              options={projects.map(p => ({ label: p.title, value: p.id }))}
                            />
                          </div>

                          <div className="col-lg-12">
                            <CustomDropdown
                              name="rating"
                              placeholder="Select Rating (1-5)"
                              value={selectedRating}
                              onChange={setSelectedRating}
                              options={[
                                { label: '⭐⭐⭐⭐⭐ 5 Stars - Excellent', value: '5' },
                                { label: '⭐⭐⭐⭐ 4 Stars - Very Good', value: '4' },
                                { label: '⭐⭐⭐ 3 Stars - Good', value: '3' },
                                { label: '⭐⭐ 2 Stars - Fair', value: '2' },
                                { label: '⭐ 1 Star - Poor', value: '1' },
                              ]}
                            />
                          </div>

                          <div className="col-lg-12">
                            <div className="form-group">
                              <label style={{ color: '#fff', marginBottom: '8px', display: 'block' }}>
                                Profile Image (Optional)
                              </label>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '20px',
                                border: '1px dashed rgba(255,255,255,0.2)',
                                borderRadius: '8px',
                              }}>
                                {profileImagePreview ? (
                                  <>
                                    <Image
                                      src={profileImagePreview}
                                      alt="Profile preview"
                                      width={80}
                                      height={80}
                                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setProfileImage(null);
                                        setProfileImagePreview(null);
                                      }}
                                      style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#ff4d4f',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                      }}
                                    >
                                      Remove Image
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <i className="fa-regular fa-user-circle" style={{ fontSize: '48px', color: 'rgba(255,255,255,0.5)' }}></i>
                                    <label style={{
                                      cursor: 'pointer',
                                      color: '#a0a0a0',
                                    }}>
                                      Click to upload
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="input-field"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                      />
                                    </label>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="form-group">
                              <textarea
                                className="input-field"
                                placeholder="Write your review here..."
                                name="text"
                                required
                                rows={4}
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="tmp-button-here">
                              <button
                                className="tmp-btn hover-icon-reverse radius-round w-100"
                                type="submit"
                                disabled={status === 'loading' || uploading}
                              >
                                <span className="icon-reverse-wrapper">
                                  <span className="btn-text">
                                    {status === 'loading' || uploading ? 'Submitting...' : 'Submit Review'}
                                  </span>
                                  <span className="btn-icon">
                                    <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                  </span>
                                  <span className="btn-icon">
                                    <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                  </span>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
