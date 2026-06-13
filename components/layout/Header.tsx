'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Project' },
  { href: '/write-review', label: 'Review' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      {/* tpm-header-area start */}
      <header className="tmp-header-area-start header-one header--sticky header--transparent">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-content">
                <div className="logo">
                  <Link href="/">
                    <Image
                      className="logo-dark"
                      src="/assets/images/logo/starcode-logo.png"
                      alt="Starcode – Full-Stack Web & App Development Company"
                      width={150}
                      height={40}
                      style={{ height: 'auto' }}
                      priority
                    />
                    <Image
                      className="logo-white"
                      src="/assets/images/logo/starcode-logos.png"
                      alt="Starcode – Full-Stack Web & App Development Company"
                      width={150}
                      height={40}
                      style={{ height: 'auto' }}
                      priority
                    />
                  </Link>
                </div>
                <nav className="tmp-mainmenu-nav d-none d-xl-block">
                  <ul className="tmp-mainmenu">
                    {navLinks.map((link) => (
                      <li key={link.href} className={pathname === link.href ? 'active' : ''}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="tmp-header-right">
                  <div className="social-share-wrapper d-none d-md-block">
                    <div className="social-link">
                      <a href="#"><i className="fa-brands fa-instagram"></i></a>
                      <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                      <a href="#"><i className="fa-brands fa-twitter"></i></a>
                      <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                    </div>
                  </div>
                  <div className="actions-area">
                    <ThemeToggle />
                    <div className="tmp-side-collups-area d-none d-xl-block">
                      <button className="tmp-menu-bars tmp_button_active">
                        <i className="fa-regular fa-bars-staggered"></i>
                      </button>
                    </div>
                    <div className="tmp-side-collups-area d-block d-xl-none">
                      <button className="tmp-menu-bars humberger_menu_active">
                        <i className="fa-regular fa-bars-staggered"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* tpm-header-area end */}

      {/* Sidebar - Desktop */}
      <div className="d-none d-xl-block">
        <div className="tmp-sidebar-area tmp_side_bar">
          <div className="inner">
            <div className="top-area">
              <Link href="/" className="logo">
                <Image
                  className="logo-dark"
                  src="/assets/images/logo/starcode-logo.png"
                  alt="Starcode – Full-Stack Web & App Development Company"
                  width={150}
                  height={40}
                  style={{ height: 'auto' }}
                />
                <Image
                  className="logo-white"
                  src="/assets/images/logo/starcode-logos.png"
                  alt="Starcode – Full-Stack Web & App Development Company"
                  width={150}
                  height={40}
                  style={{ height: 'auto' }}
                />
              </Link>
              <div className="close-icon-area">
                <button className="tmp-round-action-btn close_side_menu_active">
                  <i className="fa-sharp fa-light fa-xmark"></i>
                </button>
              </div>
            </div>
            <div className="content-wrapper">
              <div className="image-area-feature">
                <Link href="/">
                  <Image
                    className="w-100"
                    src="/assets/images/logo/man.jpg"
                    alt="personal-logo"
                    width={600}
                    height={400}
                    style={{ height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </Link>
              </div>
              <h5 className="title mt--30">
                Starcode builds fast, scalable, and beautifully designed full-stack websites and mobile apps.
              </h5>
              <p className="disc">
                Starcode is a full-stack development team specializing in Webflow and Figma. We craft creative,
                dynamic, and user-focused web experiences that help brands grow and stand out online.
              </p>
              <div className="short-contact-area">
                <div className="single-contact">
                  <i className="fa-solid fa-phone"></i>
                  <div className="information tmp-link-animation">
                    <span>Call Now</span>
                    <a href="tel:+919521045443" className="number">+919521045443</a>
                  </div>
                </div>
                <div className="single-contact">
                  <i className="fa-solid fa-envelope"></i>
                  <div className="information tmp-link-animation">
                    <span>Mail Us</span>
                    <a href="mailto:starcode@gmail.com" className="number">starcode@gmail.com</a>
                  </div>
                </div>
                <div className="single-contact">
                  <i className="fa-solid fa-location-crosshairs"></i>
                  <div className="information tmp-link-animation">
                    <span>My Address</span>
                    <span className="number">Near govt lohia college churu ra</span>
                  </div>
                </div>
              </div>
              <div className="social-wrapper mt--20">
                <span className="subtitle">find with me</span>
                <div className="social-link">
                  <a href="#"><i className="fa-brands fa-instagram"></i></a>
                  <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#"><i className="fa-brands fa-twitter"></i></a>
                  <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a className="overlay_close_side_menu close_side_menu_active" href="javascript:void(0);"></a>
      </div>

      {/* Mobile Menu */}
      <div className="d-block d-xl-none">
        <div className="tmp-popup-mobile-menu">
          <div className="inner">
            <div className="header-top">
              <div className="logo">
                <Link href="/" className="logo-area">
                  <Image
                    className="logo-dark"
                    src="/assets/images/logo/starcode-logo.png"
                    alt="Starcode – Full-Stack Web & App Development Company"
                    width={150}
                    height={40}
                    style={{ height: 'auto' }}
                  />
                  <Image
                    className="logo-white"
                    src="/assets/images/logo/starcode-logos.png"
                    alt="Starcode – Full-Stack Web & App Development Company"
                    width={150}
                    height={40}
                    style={{ height: 'auto' }}
                  />
                </Link>
              </div>
              <div className="close-menu" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ThemeToggle />
                <button className="close-button tmp-round-action-btn">
                  <i className="fa-sharp fa-light fa-xmark"></i>
                </button>
              </div>
            </div>
            <ul className="tmp-mainmenu">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="social-wrapper mt--40">
              <span className="subtitle">find with me</span>
              <div className="social-link">
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#"><i className="fa-brands fa-twitter"></i></a>
                <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
