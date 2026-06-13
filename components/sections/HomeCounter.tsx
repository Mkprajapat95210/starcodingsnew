export default function HomeCounter() {
  return (
    <section className="counter-area">
      <div className="container">
        <div className="row g-5">
          <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
            <div className="year-of-expariance-wrapper bg-blur-style-one tmp-scroll-trigger tmp-fade-in animation-order-1">
              <div className="year-expariance-wrap">
                <h2 className="counter year-number">
                  <span className="odometer" data-count="10" suppressHydrationWarning>05</span>
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
                        <span className="odometer" data-count={item.count} suppressHydrationWarning>00</span>+
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
  );
}
