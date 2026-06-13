import Link from 'next/link';

const plans = [
  {
    subtitle: 'Standard Website',
    price: '₹ 30K - 50K',
    period: 'Starting Price',
    features: [
      'E-commerce, Blog, News, or Portfolio',
      'Responsive Frontend (TypeScript)',
      'Basic Backend (Node/Express/MongoDB)',
      'Essential Features Only',
    ],
    btnText: 'Enquire Now',
    btnClass: 'tmp-btn hover-icon-reverse btn-border btn-md radius-round',
    order: 1,
    active: false,
  },
  {
    subtitle: 'Web & App Bundle ⚡',
    price: '₹ 50K - 1L',
    period: 'Starting Price',
    features: [
      'Full Website Development',
      'Mobile App Development (Flutter/React Native)',
      'Shared Backend Architecture',
      'Firebase / Supabase Integration',
      'Marketing & Support',
    ],
    btnText: 'Start Your Bundle',
    btnClass: 'tmp-btn hover-icon-reverse btn-md radius-round',
    order: 2,
    active: true,
  },
  {
    subtitle: 'Custom Startup Idea',
    price: '₹ 1L +',
    period: 'Based on Complexity',
    features: [
      'Unique & Custom-Built Features',
      'Advanced App/Web Architecture',
      'Full Discovery & Consulting',
      'Dedicated Team Support',
    ],
    btnText: 'Discuss Your Idea',
    btnClass: 'tmp-btn hover-icon-reverse btn-border btn-md radius-round',
    order: 3,
    active: false,
  },
];

export default function HomePricing() {
  return (
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
          {plans.map((plan) => (
            <div key={plan.subtitle} className={`col-lg-4 col-md-6 tmp-scroll-trigger tmp-fade-in animation-order-${plan.order}`}>
              <div className={`price-plan-card tmponhover blur-style-two${plan.active ? ' active' : ''}`}>
                <span className="price-sub-title">{plan.subtitle}</span>
                <h3 className="main-price">{plan.price}</h3>
                <p className="per-month">{plan.period}</p>
                <div className="check-box">
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <div className="check-box-item">
                          <div className="box-icon">
                            <i className="fa-solid fa-circle-check"></i>
                          </div>
                          <p className="box-para">{feature}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tmp-button-here">
                  <Link className={plan.btnClass} href="/contact">
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">{plan.btnText}</span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                      <span className="btn-icon"><i className="fa-sharp fa-regular fa-arrow-right"></i></span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
