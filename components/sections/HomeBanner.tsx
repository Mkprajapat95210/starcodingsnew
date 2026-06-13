'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HomeBanner() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Read initial theme from DOM
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
    if (currentTheme) setTheme(currentTheme);

    // Watch for theme changes via MutationObserver
    const observer = new MutationObserver(() => {
      const updated = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
      if (updated) setTheme(updated);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const heroImage =
    theme === 'light'
      ? '/assets/images/home/light-hero.png'
      : '/assets/images/home/home-hero.png';

  return (
    <div className="rpp-banner-three-area">
      <div className="container">
        <div className="banner-three-main-wrapper">
          <div className="row">
            <div className="col-lg-4">
              <div className="inner">
                <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">Welcome to</span>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">Star Code Team</h1>
                <div className="button-area-banner-three tmp-scroll-trigger tmp-fade-in animation-order-3">
                  <Link className="tmp-btn hover-icon-reverse radius-round" href="/projects">
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">View Our Projects</span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="banner-right-content">
                <div className="about-me tmp-scroll-trigger tmp-fade-in animation-order-1">
                  <h3 className="title">Our Expertise</h3>
                  <p className="para tmp-title-split">
                    We deliver excellent <span>&quot;Websites&quot;</span>, powerful <span>&quot;Mobile Apps&quot;</span>,
                    and smart <span>&quot;Business Automation&quot;</span> solutions.
                  </p>
                </div>
                <div className="find-me-on mt--40 tmp-scroll-trigger tmp-fade-in animation-order-2">
                  <h2 className="find-me-on-title">Connect with Us</h2>
                  <div className="social-link banner">
                    <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
                    <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                    <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-benner-img-three">
            <Image
              className="tmp-scroll-trigger tmp-zoom-in animation-order-2"
              src={heroImage}
              alt="Star Code Team Graphic"
              width={800}
              height={600}
              priority
            />
            {/* Premium overlay for smooth blending */}
            <div className="banner-image-overlay-new"></div>
          </div>
          <h2 className="texts-one up-down-2 outlined-text">WEB DESIGN</h2>
          <h2 className="texts-two up-down style outlined-text-red">APP DESIGN</h2>
        </div>
      </div>
    </div>
  );
}
