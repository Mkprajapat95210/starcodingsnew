import Link from 'next/link';

const services = [
  { icon: 'fa-light fa-laptop-code', title: 'Website Development', count: '185 Projects', order: 1 },
  { icon: 'fa-light fa-mobile-screen-button', title: 'Mobile App Solutions', count: '142 Projects', order: 2 },
  { icon: 'fa-light fa-gears', title: 'Business Automation', count: '110 Projects', order: 3 },
  { icon: 'fa-light fa-object-ungroup', title: 'UI/UX & Strategy', count: '195 Projects', order: 4 },
];

export default function HomeServices() {
  return (
    <section className="service-area tmp-section-gap">
      <div className="container">
        <div className="row justify-content-center">
          {services.map((service) => (
            <div key={service.title} className="col-lg-3 col-md-4 col-sm-6">
              <div className={`service-card-v1 tmp-scroll-trigger tmp-fade-in animation-order-${service.order} tmp-link-animation`}>
                <div className="service-card-icon">
                  <i className={service.icon}></i>
                </div>
                <h4 className="service-title">
                  <Link href="/services">{service.title}</Link>
                </h4>
                <p className="service-para">{service.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
