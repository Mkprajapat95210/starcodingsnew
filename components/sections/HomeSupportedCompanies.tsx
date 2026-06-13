'use client';

import Image from 'next/image';
import LogoLoop from '@/components/ui/LogoLoop';

const row1 = [
  { src: '/assets/images/skills/hcj.png', alt: 'HTML CSS JS', height: 120 },
  { src: '/assets/images/skills/typescript (1).png', alt: 'TypeScript', height: 80 },
  { src: '/assets/images/skills/wordpress.webp', alt: 'WordPress', height: 100 },
  { src: '/assets/images/skills/flutter (1).webp', alt: 'Flutter', height: 90 },
];

const row2 = [
  { src: '/assets/images/skills/mern.png', alt: 'MERN Stack', height: 80 },
  { src: '/assets/images/skills/phps.png', alt: 'PHP', height: 110 },
  { src: '/assets/images/skills/firebase.webp', alt: 'Firebase', height: 100 },
  { src: '/assets/images/skills/shopify.png', alt: 'Shopify', height: 90 },
];

export default function HomeSupportedCompanies() {
  return (
    <div className="our-supported-company-area tmp-section-gap">
      <div className="container-fluid">
        <div className="section-head mb--50 text-center">
          <span className="subtitle">Technologies We Use</span>
          <h2 className="title">Our Tech Stack</h2>
        </div>
        
        <div style={{ marginBottom: '40px' }}>
          <LogoLoop 
            logos={row1} 
            speed={60} 
            direction="right" 
            renderItem={(item) => (
              <img 
                src={item.src} 
                alt={item.alt} 
                style={{ height: 'auto', maxHeight: '80px', width: 'auto', objectFit: 'contain' }} 
              />
            )}
            gap={40} 
            hoverSpeed={0} 
            scaleOnHover 
            fadeOut 
            fadeOutColor="var(--color-secondary)"
          />
        </div>

        <div>
          <LogoLoop 
            logos={row2} 
            speed={60} 
            direction="left" 
            renderItem={(item) => (
              <img 
                src={item.src} 
                alt={item.alt} 
                style={{ height: 'auto', maxHeight: '80px', width: 'auto', objectFit: 'contain' }} 
              />
            )}
            gap={40} 
            hoverSpeed={0} 
            scaleOnHover 
            fadeOut 
            fadeOutColor="var(--color-secondary)"
          />
        </div>
      </div>
    </div>
  );
}
