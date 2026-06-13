export default function HomeMySkill() {
  return (
    <section className="my-skill tmp-section-gapTop">
      <div className="container">
        <div className="section-head text-align-left mb--60">
          <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Our Expertise</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Technical Excellence from &apos;Starcode&apos; <br /> for Next-Gen Solutions
          </h2>
        </div>
        <div className="services-widget v1">
          <div className="service-item tmp-scroll-trigger tmp-fade-in animation-order-1">
            <div className="my-skill-card">
              <div className="card-icon">
                <i className="fa-light fa-laptop-code"></i>
              </div>
              <div className="card-title">
                <h3 className="main-title">Web Development</h3>
                <p className="sub-title">Modern Full-Stack</p>
              </div>
              <p className="card-para">
                We build robust web solutions using &apos;TypeScript&apos; for the frontend and a powerful
                &apos;Node.js, Express, MongoDB&apos; stack for reliable backend performance.
              </p>
              <a href="#" className="read-more-btn">
                Explore Web Projects{' '}
                <span className="read-more-icon">
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </a>
            </div>
            <button className="service-link modal-popup"></button>
          </div>

          <div className="service-item tmp-scroll-trigger tmp-fade-in animation-order-2">
            <div className="my-skill-card">
              <div className="card-icon">
                <i className="fa-light fa-mobile-screen-button"></i>
              </div>
              <div className="card-title">
                <h3 className="main-title">App Development</h3>
                <p className="sub-title">Cross-Platform Apps</p>
              </div>
              <p className="card-para">
                We develop high-quality, cross-platform mobile apps using &apos;Flutter&apos; and &apos;React Native&apos;,
                backed by flexible services like &apos;Firebase&apos; and &apos;Supabase&apos;.
              </p>
              <a href="#" className="read-more-btn">
                Explore App Projects{' '}
                <span className="read-more-icon">
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </a>
            </div>
            <button className="service-link modal-popup"></button>
          </div>

          <div className="service-item tmp-scroll-trigger tmp-fade-in animation-order-3">
            <div className="my-skill-card">
              <div className="card-icon">
                <i className="fa-light fa-robot"></i>
              </div>
              <div className="card-title">
                <h3 className="main-title">Business Automation</h3>
                <p className="sub-title">Efficient Workflows</p>
              </div>
              <p className="card-para">
                Maximize efficiency by automating your business processes. We integrate custom solutions
                to save you time and maximize your resources.
              </p>
              <a href="#" className="read-more-btn">
                Learn About Automation{' '}
                <span className="read-more-icon">
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </a>
            </div>
            <button className="service-link modal-popup"></button>
          </div>
        </div>
      </div>
    </section>
  );
}
