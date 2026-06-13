'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Start Footer Area */}
      <footer className="footer-area footer-style-one-wrapper tmp-section-gap">
        <div className="container">
          <div className="footer-main footer-style-one">
            <div className="row g-5">
              <div className="col-lg-5 col-md-6">
                <div className="single-footer-wrapper border-right mr--20">
                  <div className="logo">
                    <Link href="/">
                      <Image
                        src="/assets/images/logo/starcode-logo.png"
                        alt="Starcode – Full-Stack Web & App Development Company"
                        width={150}
                        height={40}
                        style={{ height: 'auto' }}
                      />
                    </Link>
                  </div>
                  <p className="description">
                    <span>Get Ready</span> To <br /> Create Great
                  </p>
                  <form action="#" className="newsletter-form-1 mt--40">
                    <input type="email" placeholder="Email Address" />
                    <span className="form-icon">
                      <i className="fa-regular fa-envelope"></i>
                    </span>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-footer-wrapper quick-link-wrap">
                  <h5 className="ft-title">Quick Link</h5>
                  <ul className="ft-link tmp-link-animation">
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/services">Service</Link></li>
                    <li><Link href="/contact">Contact Us</Link></li>
                    <li><Link href="/blog">Blogs</Link></li>
                    <li><Link href="/projects">Projects</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-footer-wrapper contact-wrap">
                  <h5 className="ft-title">Contact</h5>
                  <ul className="ft-link tmp-link-animation">
                    <li>
                      <span className="ft-icon"><i className="fa-solid fa-envelope"></i></span>
                      <a href="mailto:Starcodeteam@gmail.com">Starcodeteam@gmail.com</a>
                    </li>
                    <li>
                      <span className="ft-icon"><i className="fa-solid fa-location-dot"></i></span>
                      Near govt Lohia College Churu
                    </li>
                    <li>
                      <span className="ft-icon"><i className="fa-solid fa-phone"></i></span>
                      <a href="tel:+919521045443">+919521045443</a>
                    </li>
                  </ul>
                  <div className="social-link footer">
                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                    <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bg-img">
          <Image
            src="/assets/images/footer/footer-bg-img.png"
            alt="footer-img"
            width={400}
            height={200}
            style={{ width: 'auto' }}
          />
        </div>
      </footer>
      <div className="copyright-area-one">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-wrapper">
                <p className="copy-right-para">
                  © Starcode {currentYear} | All Rights Reserved
                </p>
                <ul>
                  <li><a href="#">Terms & Condition</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Footer Area */}
    </>
  );
}
