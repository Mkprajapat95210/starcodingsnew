'use client';

import { useState, FormEvent } from 'react';

const GOOGLE_FORM_ACTION =
  'https://script.google.com/macros/s/AKfycbwq6ZHt22CXFofGOAmi3U0focbJQTTzRFGlM-8fwh07VoznDIoi4wgqHJShEGKCCjpJGQ/exec';

export default function GetInTouchForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    try {
      await fetch(GOOGLE_FORM_ACTION, { method: 'POST', body: formData });
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-form">
      <div
        id="form-messages"
        className={status === 'success' ? '' : status === 'error' ? 'error' : 'error'}
        style={{ marginBottom: status !== 'idle' ? '12px' : '0' }}
      >
        {status === 'success' && (
          <p style={{ color: 'green' }}>Your message has been sent successfully!</p>
        )}
        {status === 'error' && (
          <p style={{ color: 'red' }}>Something went wrong. Please try again.</p>
        )}
      </div>

      <form
        className="tmp-dynamic-form"
        id="contact-form"
        onSubmit={handleSubmit}
      >
        <div className="contact-form-wrapper row">
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="input-field"
                name="name"
                id="contact-name"
                placeholder="Your Name"
                type="text"
                required
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="input-field"
                name="phone"
                id="contact-phone"
                placeholder="Phone Number"
                type="tel"
                required
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="input-field"
                id="contact-email"
                name="email"
                placeholder="Your Email"
                type="email"
                required
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="input-field"
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <textarea
                className="input-field"
                placeholder="Your Message"
                name="message"
                id="contact-message"
                required
              ></textarea>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tmp-button-here">
              <button
                className="tmp-btn hover-icon-reverse radius-round w-100"
                name="submit"
                type="submit"
                id="submit"
                disabled={status === 'loading'}
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">
                    {status === 'loading' ? 'Sending...' : 'Send Appointment'}
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

      {/* Hidden iframe for silent form submission (matching original) */}
      <div id="lottie-overlay" style={{ display: 'none' }}>
        <div id="lottie-container"></div>
      </div>
      <iframe name="hidden_iframe" style={{ display: 'none' }} title="hidden"></iframe>
    </div>
  );
}
