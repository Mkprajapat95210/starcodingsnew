import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GetInTouchSection from '@/components/sections/GetInTouchSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Starcode – Start Your Digital Journey',
  description: 'Contact Starcode (Starcoding) today for a free consultation. Let’s build your next big idea together.',
  keywords: ['Contact Starcode', 'Starcoding Support', 'Hire Web Developers', 'App Development Inquiry'],
};

export default function ContactPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h1 className="title split-collab">Contact Us</h1>
                <ul className="page-list">
                  <li className="tmp-breadcrumb-item"><a href="/">Home</a></li>
                  <li className="icon"><i className="fa-solid fa-angle-right"></i></li>
                  <li className="tmp-breadcrumb-item active">Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info + Form */}
      <div className="contact-area-wrapper tmp-section-gap">
        <div className="container">

          {/* 3 Info Cards */}
          <div className="contact-info-wrap">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="contact-info tmp-scroll-trigger tmponhover tmp-fade-in animation-order-1">
                  <div className="contact-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <h3 className="title">Address</h3>
                  <p className="para">Near Govt Lohia college</p>
                  <p className="para">Churu 331001</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="contact-info tmp-scroll-trigger tmponhover tmp-fade-in animation-order-2">
                  <div className="contact-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <h3 className="title">E-mail</h3>
                  <a href="mailto:starcode@gmail.com" rel="nofollow">
                    <p className="para">starcode@gmail.com</p>
                  </a>
                  <a href="mailto:starcodeteam@gmail.com" rel="nofollow">
                    <p className="para">starcodeteam@gmail.com</p>
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="contact-info tmp-scroll-trigger tmponhover tmp-fade-in animation-order-3">
                  <div className="contact-icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <h3 className="title">Call Me</h3>
                  <p className="para"><a href="tel:+919521045443" rel="nofollow">+91 9521045443</a></p>
                  <p className="para"><a href="tel:+919587826831" rel="nofollow">+91 9587826831</a></p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Get In Touch Form */}
        <GetInTouchSection />

      </div>
    </>
  );
}
