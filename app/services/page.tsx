import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GetInTouchSection from '@/components/sections/GetInTouchSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services – Web, App & Automation by Starcode',
  description: 'Explore professional services by Starcode (Starcoding): Custom Web Development, Mobile Apps (iOS/Android), UI/UX Design, and Business Automation.',
  keywords: ['Starcode Services', 'Web Development Starcode', 'App Development Starcoding', 'Business Automation'],
};

export default function ServicesPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h1 className="title split-collab">My Service</h1>
                <ul className="page-list">
                  <li className="tmp-breadcrumb-item"><a href="/">Home</a></li>
                  <li className="icon"><i className="fa-solid fa-angle-right"></i></li>
                  <li className="tmp-breadcrumb-item active">Service</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Service Area */}
      <section className="latest-service-area tmp-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-6">
              <a href="#" className="service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-1">
                <h2 className="service-card-num"><span>01.</span>Great App Design (UX)</h2>
                <p className="service-para">We make apps and websites easy to use and beautiful to look at, so your customers love them and come back often.</p>
              </a>
              <a href="#" className="service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-2">
                <h2 className="service-card-num"><span>02.</span>Building Websites</h2>
                <p className="service-para">We build fast and modern websites using the latest technology. They work perfectly on phones, tablets, and computers.</p>
              </a>
              <a href="#" className="service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-3">
                <h2 className="service-card-num"><span>03.</span>Creating Mobile Apps</h2>
                <p className="service-para">We develop mobile apps for both iPhone and Android (Apple and Google) from one code, which saves you time and money.</p>
              </a>
            </div>
            <div className="col-lg-6 col-sm-6">
              <a href="#" className="service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-4">
                <h2 className="service-card-num"><span>04.</span>Amazing Look &amp; Feel</h2>
                <p className="service-para">We focus on colors, fonts, and layouts to make sure your product looks professional, attractive, and memorable.</p>
              </a>
              <a href="#" className="service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-5">
                <h2 className="service-card-num"><span>05.</span>Your Brand Identity</h2>
                <p className="service-para">We create your company&apos;s full personality—from the logo to the overall style—so people instantly know and trust your brand.</p>
              </a>
              <a href="#" className="service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-6">
                <h2 className="service-card-num"><span>06.</span>Making Everything Work</h2>
                <p className="service-para">We set up the hidden systems (the &apos;brain&apos; of the app) to manage data, security, and make sure all the features run smoothly and safely.</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Price Plan */}
      <section className="our-price-plan-area tmp-section-gapTop">
        <div className="container" style={{ marginBottom: '50px' }}>
          <div className="section-head mb--50">
            <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
              <span className="subtitle">Our Project Pricing</span>
            </div>
            <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
              Tailored Solutions &amp; Transparent <br /> Pricing for Your Digital Vision
            </h2>
          </div>
          <div className="row align-items-center">
            {/* Card 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="price-plan-card tmponhover blur-style-two tmp-scroll-trigger tmp-fade-in animation-order-1">
                <span className="price-sub-title">Standard Website</span>
                <h3 className="main-price">₹ 30K - 50K</h3>
                <p className="per-month">Starting Price</p>
                <div className="check-box">
                  <ul>
                    {['E-commerce, Blog, News, or Portfolio','Responsive Frontend (TypeScript)','Basic Backend (Node/Express/MongoDB)','Essential Features Only'].map((f) => (
                      <li key={f}><div className="check-box-item"><div className="box-icon"><i className="fa-solid fa-circle-check"></i></div><p className="box-para">{f}</p></div></li>
                    ))}
                  </ul>
                </div>
                <div className="tmp-button-here">
                  <a className="tmp-btn hover-icon-reverse btn-border btn-md radius-round" href="/contact">
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Enquire Now</span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            {/* Card 2 active */}
            <div className="col-lg-4 col-md-6 tmp-scroll-trigger tmp-fade-in animation-order-2">
              <div className="price-plan-card tmponhover blur-style-two active">
                <span className="price-sub-title">Web &amp; App Bundle ⚡</span>
                <h3 className="main-price">₹ 50K - 1L</h3>
                <p className="per-month">Starting Price</p>
                <div className="check-box">
                  <ul>
                    {['Full Website Development','Mobile App Development (Flutter/React Native)','Shared Backend Architecture','Firebase / Supabase Integration','Marketing & Support'].map((f) => (
                      <li key={f}><div className="check-box-item"><div className="box-icon"><i className="fa-solid fa-circle-check"></i></div><p className="box-para">{f}</p></div></li>
                    ))}
                  </ul>
                </div>
                <div className="tmp-button-here">
                  <a className="tmp-btn hover-icon-reverse btn-md radius-round" href="/contact">
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Start Your Bundle</span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="price-plan-card tmponhover blur-style-two tmp-scroll-trigger tmp-fade-in animation-order-3">
                <span className="price-sub-title">Custom Startup Idea</span>
                <h3 className="main-price">₹ 1L +</h3>
                <p className="per-month">Based on Complexity</p>
                <div className="check-box">
                  <ul>
                    {['Unique & Custom-Built Features','Advanced App/Web Architecture','Full Discovery & Consulting','Dedicated Team Support'].map((f) => (
                      <li key={f}><div className="check-box-item"><div className="box-icon"><i className="fa-solid fa-circle-check"></i></div><p className="box-para">{f}</p></div></li>
                    ))}
                  </ul>
                </div>
                <div className="tmp-button-here">
                  <a className="tmp-btn hover-icon-reverse btn-border btn-md radius-round" href="/contact">
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Discuss Your Idea</span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <GetInTouchSection />
    </>
  );
}
