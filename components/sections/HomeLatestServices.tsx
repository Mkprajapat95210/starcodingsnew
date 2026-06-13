export default function HomeLatestServices() {
  return (
    <section className="latest-service-area tmp-section-gapTop">
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Our Core Services</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Transforming Ideas Into Digital Reality
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            We build high-performance &apos;Websites&apos;, scalable &apos;Apps&apos;, and tailored &apos;Business Automation&apos;
            solutions that drive efficiency, growth, and organizational success for our clients.
          </p>
        </div>
        <div className="row">
          <div className="col-lg-6">
            {[
              {
                num: '01.',
                title: 'High-Performance Websites',
                para: 'We design and develop fast, secure, and SEO-optimized websites, including e-commerce, corporate sites, and custom web portals.',
                order: 1,
              },
              {
                num: '02.',
                title: 'Custom Mobile Applications',
                para: 'We create intuitive and robust mobile apps (iOS & Android) that ensure seamless user experience and high engagement for your business.',
                order: 2,
              },
              {
                num: '03.',
                title: 'Business Automation Systems',
                para: 'Automate repetitive tasks, integrate complex systems, and streamline workflows to drastically improve your operational efficiency and productivity.',
                order: 3,
              },
            ].map((item) => (
              <div
                key={item.num}
                className={`service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${item.order}`}
              >
                <h2 className="service-card-num">
                  <span>{item.num}</span>{item.title}
                </h2>
                <p className="service-para">{item.para}</p>
              </div>
            ))}
          </div>
          <div className="col-lg-6">
            <div className="service-card-user-image">
              {/* @ts-ignore */}
              <lottie-player
                className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                src="/assets/images/home/developer skills.json"
                background="transparent"
                speed="1"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loop
                autoplay
                suppressHydrationWarning
              >{/* @ts-ignore */}
              </lottie-player>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
