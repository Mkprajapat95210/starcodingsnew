import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GetInTouchSection from '@/components/sections/GetInTouchSection';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Starcode – Best Web & App Development Company',
  description: 'Learn about Starcode (Starcodings), a leading full-stack development agency specializing in high-performance web and mobile applications.',
  keywords: ['About Starcode', 'Starcoding Team', 'Best Software Agency', 'Full-Stack Developers'],
};

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb Area */}
      <div className="breadcrumb-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h1 className="title split-collab">About Me</h1>
                <ul className="page-list">
                  <li className="tmp-breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="icon"><i className="fa-solid fa-angle-right"></i></li>
                  <li className="tmp-breadcrumb-item active">About Me</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Area */}
      <section className="service-area tmp-section-gap">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="service-card-v1 tmp-scroll-trigger tmp-fade-in animation-order-1 tmp-link-animation">
                <div className="service-card-icon"><i className="fa-light fa-laptop-code"></i></div>
                <h4 className="service-title"><Link href="/services">Website Development</Link></h4>
                <p className="service-para">185 Projects</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="service-card-v1 tmp-scroll-trigger tmp-fade-in animation-order-2 tmp-link-animation">
                <div className="service-card-icon"><i className="fa-light fa-mobile-screen-button"></i></div>
                <h4 className="service-title"><Link href="/services">Mobile App Solutions</Link></h4>
                <p className="service-para">142 Projects</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="service-card-v1 tmp-scroll-trigger tmp-fade-in animation-order-3 tmp-link-animation">
                <div className="service-card-icon"><i className="fa-light fa-gears"></i></div>
                <h4 className="service-title"><Link href="/services">Business Automation</Link></h4>
                <p className="service-para">110 Projects</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="service-card-v1 tmp-scroll-trigger tmp-fade-in animation-order-4 tmp-link-animation">
                <div className="service-card-icon"><i className="fa-light fa-object-ungroup"></i></div>
                <h4 className="service-title"><Link href="/services">UI/UX & Strategy</Link></h4>
                <p className="service-para">195 Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Area */}
      <div className="tmp-skill-area tmp-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="inner">
              <div className="row">
                <div className="col-lg-6">
                  <div className="progress-wrapper">
                    <div className="content">
                      <h2 className="custom-title mb--30 tmp-scroll-trigger tmp-fade-in animation-order-1">
                        Design Skill{' '}
                        <span>
                          <Image src="/assets/images/custom-line/custom-line.png" alt="custom-line" width={100} height={10} style={{ height: 'auto' }} />
                        </span>
                      </h2>
                      {[
                        { label: 'PHOTOSHOT', percent: '100%', dur: '0.5s', delay: '.3s' },
                        { label: 'FIGMA', percent: '95%', dur: '0.6s', delay: '.4s' },
                        { label: 'ADOBE XD', percent: '60%', dur: '0.7s', delay: '.5s' },
                        { label: 'ADOBE ILLUSTRATOR', percent: '70%', dur: '0.8s', delay: '.6s' },
                      ].map((s) => (
                        <div key={s.label} className="progress-charts">
                          <div className="progress-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                            <h6 className="heading heading-h6" style={{ margin: 0 }}>{s.label}</h6>
                            <span className="percent-label" style={{ fontSize: '14px', fontWeight: 'bold' }}>{s.percent}</span>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar wow fadeInLeft"
                              data-wow-duration={s.dur}
                              data-wow-delay={s.delay}
                              role="progressbar"
                              style={{ width: s.percent }}
                              aria-valuenow={parseInt(s.percent)}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="progress-wrapper">
                    <div className="content">
                      <h2 className="custom-title mb--30 tmp-scroll-trigger tmp-fade-in animation-order-1">
                        Development Skill{' '}
                        <span>
                          <img src="/assets/images/custom-line/custom-line.png" alt="custom-line" />
                        </span>
                      </h2>
                      {[
                        { label: 'PHOTOSHOT', percent: '100%', dur: '0.5s', delay: '.3s' },
                        { label: 'FIGMA', percent: '95%', dur: '0.6s', delay: '.4s' },
                        { label: 'ADOBE XD', percent: '60%', dur: '0.7s', delay: '.5s' },
                        { label: 'ADOBE ILLUSTRATOR', percent: '70%', dur: '0.8s', delay: '.6s' },
                      ].map((s) => (
                        <div key={s.label + '-dev'} className="progress-charts">
                          <div className="progress-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                            <h6 className="heading heading-h6" style={{ margin: 0 }}>{s.label}</h6>
                            <span className="percent-label" style={{ fontSize: '14px', fontWeight: 'bold' }}>{s.percent}</span>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar wow fadeInLeft"
                              data-wow-duration={s.dur}
                              data-wow-delay={s.delay}
                              role="progressbar"
                              style={{ width: s.percent }}
                              aria-valuenow={parseInt(s.percent)}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Area */}
      <section className="counter-area">
        <div className="container">
          <div className="row g-5">
            <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
              <div className="year-of-expariance-wrapper bg-blur-style-one tmp-scroll-trigger tmp-fade-in animation-order-1">
                <div className="year-expariance-wrap">
                  <h2 className="counter year-number">
                    <span className="odometer" data-count="10">05</span>
                  </h2>
                  <h3 className="year-title">Years Of <br /> Expertise</h3>
                </div>
                <p className="year-para">
                  Our Star Code Team provides expert &apos;digital solutions&apos; and guidance to businesses,
                  helping them &apos;boost performance&apos; in the modern technology landscape.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
              <div className="counter-area-right-content">
                <div className="row g-5">
                  {[
                    { count: 250, label: 'Successful Projects', order: 1 },
                    { count: 50, label: 'Active Tech Stacks', order: 2 },
                    { count: 150, label: 'Clients Reviewed', order: 3 },
                    { count: 200, label: 'Satisfied Clients', order: 4 },
                  ].map((item) => (
                    <div key={item.label} className="col-lg-6 col-sm-6 col-12">
                      <div className={`counter-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${item.order}`}>
                        <h3 className="counter counter-title">
                          <span className="odometer" data-count={item.count}>00</span>+
                        </h3>
                        <p className="counter-para">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Experience Area */}
      <section className="education-experience tmp-section-gapTop">
        <div className="container">
          <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
            Education{' '}
            <span>
              <img src="/assets/images/custom-line/custom-line.png" alt="custom-line" />
            </span>
          </h2>
          <div className="row g-5">
            <div className="col-lg-6 col-sm-6">
              <div className="education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-1">
                <h4 className="edu-sub-title">Bachelor of Computer Applications</h4>
                <h2 className="edu-title">2020-2023</h2>
                <p className="edu-para">Foundation built on core programming principles, data structures, and object-oriented concepts, essential for modern development.</p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-2">
                <h4 className="edu-sub-title">Master of Technology (IT Specialization)</h4>
                <h2 className="edu-title">2023-2025</h2>
                <p className="edu-para">Advanced studies in scalable cloud architecture, high-performance computing, and specialized full-stack development methodologies.</p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-3">
                <h4 className="edu-sub-title">Bachelor of Science</h4>
                <h2 className="edu-title">2019-2022</h2>
                <p className="edu-para">Solid academic background focusing on logical reasoning, scientific data management, and systematic problem-solving approach.</p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-4">
                <h4 className="edu-sub-title">P.G. Diploma in Computer Applications</h4>
                <h2 className="edu-title">2022-2024</h2>
                <p className="edu-para">Focused postgraduate training in database administration, advanced web technology stacks, and efficient software utility design.</p>
              </div>
            </div>
          </div>

          {/* Experiences */}
          <div className="experiences-wrapper v2">
            <div className="row">
              <div className="col-lg-6">
                <div className="experiences-wrap-right-content">
                  <img
                    className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                    src="/assets/images/experiences/expert-img-two.jpg"
                    alt="Team Development Expertise"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="experiences-wrap-left-content">
                  <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
                    Experiences{' '}
                    <span>
                      <img src="/assets/images/custom-line/custom-line.png" alt="custom-line" />
                    </span>
                  </h2>
                  <div className="experience-content tmp-scroll-trigger tmp-fade-in animation-order-1">
                    <p className="ex-subtitle">LEAD FRONTEND DEVELOPMENT</p>
                    <h2 className="ex-name">Poonamchand Prajapat</h2>
                    <h3 className="ex-title">FRONTEND Developer</h3>
                    <p className="ex-para">Specializes in creating responsive, high-fidelity user interfaces using modern frameworks (React/Vue), focusing on optimal user experience and performance.</p>
                  </div>
                  <div className="experience-content tmp-scroll-trigger tmp-fade-in animation-order-2">
                    <p className="ex-subtitle">LEAD BACKEND DEVELOPMENT</p>
                    <h2 className="ex-name">Mukesh Prajapat</h2>
                    <h3 className="ex-title">BACKEND Developer</h3>
                    <p className="ex-para">Architects scalable server-side applications, manages robust databases, and builds secure, high-speed APIs for web and mobile platforms (Node.js/Python).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Price Plan — exact from about.html */}
      <section className="our-price-plan-area tmp-section-gapTop">
        <div className="container">
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
                    {['E-commerce, Blog, News, or Portfolio', 'Responsive Frontend (TypeScript)', 'Basic Backend (Node/Express/MongoDB)', 'Essential Features Only'].map((f) => (
                      <li key={f}><div className="check-box-item"><div className="box-icon"><i className="fa-solid fa-circle-check"></i></div><p className="box-para">{f}</p></div></li>
                    ))}
                  </ul>
                </div>
                <div className="tmp-button-here">
                  <Link className="tmp-btn hover-icon-reverse btn-border btn-md radius-round" href="/contact">
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Enquire Now</span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            {/* Card 2 - active */}
            <div className="col-lg-4 col-md-6 tmp-scroll-trigger tmp-fade-in animation-order-2">
              <div className="price-plan-card tmponhover blur-style-two active">
                <span className="price-sub-title">Web &amp; App Bundle ⚡</span>
                <h3 className="main-price">₹ 50K - 1L</h3>
                <p className="per-month">Starting Price</p>
                <div className="check-box">
                  <ul>
                    {['Full Website Development', 'Mobile App Development (Flutter/React Native)', 'Shared Backend Architecture', 'Firebase / Supabase Integration', 'Marketing & Support'].map((f) => (
                      <li key={f}><div className="check-box-item"><div className="box-icon"><i className="fa-solid fa-circle-check"></i></div><p className="box-para">{f}</p></div></li>
                    ))}
                  </ul>
                </div>
                <div className="tmp-button-here">
                  <Link className="tmp-btn hover-icon-reverse btn-md radius-round" href="/contact">
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Start Your Bundle</span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                    </span>
                  </Link>
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
                    {['Unique & Custom-Built Features', 'Advanced App/Web Architecture', 'Full Discovery & Consulting', 'Dedicated Team Support'].map((f) => (
                      <li key={f}><div className="check-box-item"><div className="box-icon"><i className="fa-solid fa-circle-check"></i></div><p className="box-para">{f}</p></div></li>
                    ))}
                  </ul>
                </div>
                <div className="tmp-button-here">
                  <Link className="tmp-btn hover-icon-reverse btn-border btn-md radius-round" href="/contact">
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Discuss Your Idea</span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                    </span>
                  </Link>
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
