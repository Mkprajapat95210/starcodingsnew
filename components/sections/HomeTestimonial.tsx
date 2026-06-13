'use client';

import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

// Declare Swiper type for TypeScript
declare global {
  interface Window {
    Swiper: any;
  }
}

export default function HomeTestimonial() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [swiper, setSwiper] = useState<any>(null);

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
        .select('*, projects(title)')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(10);

      console.log('Fetched reviews:', data); // Log the data
      console.log('Fetch error:', error); // Log any error
      setReviews(data || []);
      setLoading(false);
    }
    fetchReviews();
  }, []);

  // Initialize Swiper after reviews are loaded
  useEffect(() => {
    if (!loading && reviews.length > 0 && typeof window !== 'undefined' && window.Swiper) {
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => {
        // Destroy existing Swiper instance if it exists
        const existingSwiperElement = document.querySelector('.swiper-testimonials-2');
        if (existingSwiperElement && (existingSwiperElement as any).swiper) {
          (existingSwiperElement as any).swiper.destroy(true, true);
        }

        const newSwiper = new window.Swiper('.swiper-testimonials-2', {
          slidesPerView: 2,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.tmp-swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            0: {
              slidesPerView: 1,
            },
            992: {
              slidesPerView: 2,
            },
          },
          equalHeight: true,
        });
        setSwiper(newSwiper);
      }, 100);

      return () => {
        clearTimeout(timer);
        if (swiper) {
          swiper.destroy(true, true);
        }
      };
    }
  }, [loading, reviews.length]);

  if (loading) {
    return (
      <section className="testimonial-area tmp-section-gapTop">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading testimonials...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonial-area tmp-section-gapTop" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Client Success Stories</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2 text-center">
            What Our Clients Say <br /> About Starcode
          </h2>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="swiper-testimonials-area-wrapper-card">
              <div className="swiper swiper-testimonials-2">
                <div className="swiper-wrapper" key={reviews.length}>
                  {reviews.map((t, index) => (
                    <div key={t.id || index} className="swiper-slide" style={{ height: 'auto' }}>
                      <div className="testimonial-card tmponhover style-2" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="content" style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                          <div className="testimonital-icon">
                            <Image src="/assets/images/icons/quote.svg" alt="testimonial-icon" width={40} height={30} style={{ width: 'auto', height: 'auto' }} />
                          </div>
                          <h2 className="text-doc" style={{ color: theme === 'light' ? '#333' : undefined, flex: '1' }}>"{t.text}"</h2>
                          <div className="client-info" style={{ marginTop: 'auto', paddingTop: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                              {t.profile_image_url ? (
                                <Image
                                  src={t.profile_image_url}
                                  alt={t.name}
                                  width={40}
                                  height={40}
                                  style={{ borderRadius: '50%', objectFit: 'cover', width: '40px', height: '40px' }}
                                />
                              ) : (
                                <i className="fa-regular fa-user-circle" style={{ fontSize: '40px', color: theme === 'light' ? '#999' : 'rgba(255,255,255,0.5)' }}></i>
                              )}
                              <h3 className="card-title" style={{ marginBottom: '0', color: theme === 'light' ? '#111' : undefined }}>{t.name}</h3>
                            </div>
                            <p className="card-para" style={{ color: '#ffc107', fontSize: '18px', margin: '0', paddingLeft: '50px' }}>
                                {'⭐'.repeat(t.rating)}
                            </p>
                            {t.projects?.title && (
                                <p className="card-para" style={{ fontSize: '14px', marginTop: '4px', paddingLeft: '50px' }}>
                                    Reviewed: <strong>{t.projects.title}</strong>
                                </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="tmp-swiper-pagination" style={{ marginTop: '40px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
