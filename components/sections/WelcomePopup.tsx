'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function WelcomePopup() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popupData, setPopupData] = useState<{ active: boolean; desktop_image_url: string; mobile_image_url: string } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    if (hasSeenPopup) {
      setLoading(false);
      return () => window.removeEventListener('resize', checkScreenSize);
    }

    // Fetch popup settings from Supabase
    const fetchPopupSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('popup_settings')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching popup settings:', error);
          // For testing, show a default popup
          setPopupData({
            active: true,
            desktop_image_url: '',
            mobile_image_url: ''
          });
        } else if (data) {
          setPopupData(data);
        }
        setShow(true);
      } catch (err) {
        console.error('Error:', err);
        setShow(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPopupSettings();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto close after 10 seconds
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        closePopup();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  const closePopup = () => {
    setShow(false);
    localStorage.setItem('hasSeenPopup', 'true');
  };

  // If loading, show a simple loading overlay
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!show) {
    return null;
  }

  // Determine which image to show based on screen size
  const imageUrl = isMobile 
    ? (popupData?.mobile_image_url || '') 
    : (popupData?.desktop_image_url || '');

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.85)'
      }} 
      onClick={closePopup}
    >
      <div 
        style={{
          position: 'relative',
          maxWidth: '900px',
          width: '90%',
          margin: '0 auto'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closePopup}
          style={{
            position: 'absolute',
            top: '-50px',
            right: '0',
            color: 'white',
            fontSize: '48px',
            cursor: 'pointer',
            background: 'transparent',
            border: 'none',
            zIndex: 100000,
            lineHeight: 1
          }}
        >
          &times;
        </button>

        <div style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          maxHeight: '700px',
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Welcome Popup"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'white',
              textAlign: 'center'
            }}>
              <div>
                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Welcome to Starcode!</h2>
                <p style={{ color: '#888' }}>Add popup images in Supabase to see them here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}