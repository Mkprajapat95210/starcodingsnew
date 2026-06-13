import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WelcomePopup from '@/components/sections/WelcomePopup';

export const metadata: Metadata = {
  title: {
    default: 'Starcoding – Full-Stack Web & App Development Company',
    template: '%s | Starcoding',
  },
  description: 'Starcode — Premium Full-Stack Web and Mobile App Development. We build high-performance websites, scalable mobile apps, and business automation solutions. Best software development company Starcode, Starcodings, Starcoding.',
  keywords: ['Starcode', 'Starcodings', 'Starcoding', 'Full-Stack Development', 'Web Development', 'Mobile App Development', 'Business Automation', 'UI/UX Design', 'Software Company', 'Best Web Developers'],
  authors: [{ name: 'Starcode Team' }],
  creator: 'Starcode',
  publisher: 'Starcode',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://starcoding.in'), // Update with actual domain if different
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Starcoding – Full-Stack Web & App Development Company',
    description: 'Starcode — Premium Full-Stack Web and Mobile App Development. We build high-performance websites and apps.',
    url: 'https://starcoding.in',
    siteName: 'Starcoding',
    images: [
      {
        url: '/assets/images/logo/starcode-logo.png',
        width: 1200,
        height: 630,
        alt: 'Starcode Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starcoding – Full-Stack Web & App Development Company',
    description: 'Starcode — Premium Full-Stack Web and Mobile App Development.',
    images: ['/assets/images/logo/starcode-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/images/favicon.svg',
    shortcut: '/assets/images/favicon.svg',
    apple: '/assets/images/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <link rel="stylesheet" href="/assets/css/vendor/fontawesome.css" />
        <link rel="stylesheet" href="/assets/css/plugins/swiper.css" />
        <link rel="stylesheet" href="/assets/css/plugins/odometer.css" />
        <link rel="stylesheet" href="/assets/css/vendor/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/contact-form.css" />
        <link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="color-primary-2nd">
        <WelcomePopup />
        <Script
          id="structured-data"
          strategy="afterInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Starcode",
              "alternateName": ["Starcodings", "Starcoding"],
              "url": "https://starcoding.in",
              "logo": "https://starcoding.in/assets/images/logo/starcode-logo.png",
              "image": "https://starcoding.in/assets/images/logo/starcode-logo.png",
              "description": "Starcode is a premium full-stack web and mobile app development company specializing in high-performance digital solutions.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Churu",
                "addressRegion": "Rajasthan",
                "postalCode": "331001",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9521045443",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.instagram.com/starcode",
                "https://www.linkedin.com/company/starcode"
              ]
            }),
          }}
        />
        <div style={{ height: 0, width: 0, position: 'absolute', visibility: 'hidden' }}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <symbol id="icon-play" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></symbol>
            <symbol id="icon-pause" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></symbol>
            <symbol id="icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></symbol>
          </svg>
        </div>

        <Header />
        <main>{children}</main>
        <Footer />

        <div className="ready-chatting-option tmp-ready-chat">
          <a href="https://wa.me/919521045443" id="whatsapp-link" target="_blank" rel="noopener noreferrer">
            <label><i className="fab fa-facebook-messenger"></i></label>
          </a>
        </div>

        <div className="scrollToTop">
          <div className="arrowUp"><i className="fa-light fa-arrow-up"></i></div>
          <div className="water">
          </div>
        </div>

        <Script src="/assets/js/vendor/jquery.js" strategy="beforeInteractive" />
        <Script src="/assets/js/vendor/jquery-ui.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/waypoints.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/odometer.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/appear.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/jquery-one-page-nav.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/swiper.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/gsap.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/splittext.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/scrolltigger.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/scrolltoplugins.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/smoothscroll.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/waw.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/isotop.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/animation.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/backtop.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/text-type.js" strategy="lazyOnload" />
        <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" strategy="lazyOnload" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
