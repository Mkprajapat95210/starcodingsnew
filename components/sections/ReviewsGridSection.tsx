'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface ReviewWithProject {
  id: string;
  name: string;
  rating: number;
  text: string;
  created_at: string;
  profile_image_url: string | null;
  projects: {
    title: string;
  } | null;
}

export default function ReviewsGridSection() {
  const [reviews, setReviews] = useState<ReviewWithProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
    if (currentTheme) {
      setTheme(currentTheme);
    }
    const handleThemeChange = () => {
      const newTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
      if (newTheme) {
        setTheme(newTheme);
      }
    };
    document.documentElement.addEventListener('themechange', handleThemeChange);
    return () => document.documentElement.removeEventListener('themechange', handleThemeChange);
  }, []);

  useEffect(() => {
    async function fetchReviews() {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, name, rating, text, created_at, profile_image_url, projects(title)')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
      } else {
        setReviews(data as any || []);
      }
      setLoading(false);
    }

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <i
        key={i}
        className={`fa-star ${i < rating ? 'fa-solid text-warning' : 'fa-regular text-muted'}`}
        style={{ color: i < rating ? '#ffc107' : (theme === 'light' ? '#aaa' : '#555'), marginRight: '2px' }}
      ></i>
    ));
  };

  if (loading) {
    return (
      <div className="container tmp-section-gapBottom">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading reviews...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="reviews-grid-area tmp-section-gapBottom">
      <div className="container">
        <div className="section-head mb--50 text-center">
          <div className="section-sub-title center-title">
            <span className="subtitle">Wall of Love</span>
          </div>
          <h2 className="title">What Our Clients Are Saying</h2>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-5">
            <p className="description">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="row g-5">
            {reviews.map((review) => (
              <div key={review.id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="testimonial-card tmponhover style-2 h-100" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '30px',
                  background: theme === 'light' ? '#ffffff' : 'rgba(255,255,255,0.03)',
                  border: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease'
                }}>
                  <div className="content">
                    <div className="testimonital-icon mb--20">
                      <Image
                        src="/assets/images/icons/quote.svg"
                        alt="quote"
                        width={30}
                        height={20}
                        style={{ opacity: 0.5, width: 'auto', height: 'auto' }}
                      />
                    </div>
                    <div className="rating mb--15">
                      {renderStars(review.rating)}
                    </div>
                    <p className="review-text" style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: theme === 'light' ? '#333' : 'rgba(255,255,255,0.8)',
                      marginBottom: '20px',
                      fontStyle: 'italic'
                    }}>
                      "{review.text}"
                    </p>
                  </div>
                  <div className="client-info mt-auto pt--20" style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      {review.profile_image_url ? (
                      <Image
                        src={review.profile_image_url}
                        alt={review.name}
                        width={36}
                        height={36}
                        style={{ borderRadius: '50%', objectFit: 'cover', width: '36px', height: '36px' }}
                      />
                    ) : (
                      <i className="fa-regular fa-user-circle" style={{ fontSize: '36px', color: theme === 'light' ? '#999' : 'rgba(255,255,255,0.5)' }}></i>
                    )}
                      <h3 className="name" style={{ fontSize: '18px', marginBottom: '0', color: theme === 'light' ? '#111' : '#fff' }}>
                        {review.name}
                      </h3>
                    </div>
                    {review.projects?.title && (
                      <p className="project" style={{ fontSize: '13px', color: '#ff3838', fontWeight: '500', marginBottom: '4px', paddingLeft: '46px' }}>
                        Project: {review.projects.title}
                      </p>
                    )}
                    <p className="date" style={{ fontSize: '12px', color: theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)', paddingLeft: '46px' }}>
                      {new Date(review.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
