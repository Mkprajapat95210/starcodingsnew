import Image from 'next/image';

const appSkills = [
  { label: 'NATIVE ANDROID (KOTLIN/JAVA)', percent: '100%', duration: '0.5s', delay: '.3s' },
  { label: 'NATIVE IOS (SWIFT)', percent: '95%', duration: '0.6s', delay: '.4s' },
  { label: 'CROSS-PLATFORM (FLUTTER/REACT NATIVE)', percent: '60%', duration: '0.7s', delay: '.5s' },
  { label: 'MOBILE BACKEND & API', percent: '70%', duration: '0.8s', delay: '.6s' },
];

const webSkills = [
  { label: 'MODERN FRONTEND (REACT/VUE)', percent: '100%', duration: '0.5s', delay: '.3s' },
  { label: 'SCALABLE BACKEND (NODE.JS/PYTHON)', percent: '95%', duration: '0.6s', delay: '.4s' },
  { label: 'CMS DEVELOPMENT (WORDPRESS/SHOPIFY)', percent: '60%', duration: '0.7s', delay: '.5s' },
  { label: 'BUSINESS AUTOMATION & API INTEGRATION', percent: '70%', duration: '0.8s', delay: '.6s' },
];

export default function HomeSkills() {
  return (
    <div className="tmp-skill-area tmp-section-gapTop">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="progress-wrapper">
              <div className="content">
                <h2 className="custom-title mb--30 tmp-scroll-trigger tmp-fade-in animation-order-1">
                  APP DEVELOPMENT{' '}
                  <span>
                    <Image src="/assets/images/custom-line/custom-line.png" alt="custom-line" width={100} height={10} style={{ height: 'auto' }} />
                  </span>
                </h2>
                {appSkills.map((skill) => (
                  <div key={skill.label} className="progress-charts">
                    <div className="progress-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                        <h6 className="heading heading-h6" style={{ margin: 0 }}>{skill.label}</h6>
                        <span className="percent-label" style={{ fontSize: '14px', fontWeight: 'bold' }}>{skill.percent}</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar wow fadeInLeft"
                        data-wow-duration={skill.duration}
                        data-wow-delay={skill.delay}
                        role="progressbar"
                        style={{ width: skill.percent }}
                        aria-valuenow={parseInt(skill.percent)}
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
                  WEBSITE DEVELOPMENT{' '}
                  <span>
                    <Image src="/assets/images/custom-line/custom-line.png" alt="custom-line" width={100} height={10} style={{ height: 'auto' }} />
                  </span>
                </h2>
                {webSkills.map((skill) => (
                  <div key={skill.label} className="progress-charts">
                    <div className="progress-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                        <h6 className="heading heading-h6" style={{ margin: 0 }}>{skill.label}</h6>
                        <span className="percent-label" style={{ fontSize: '14px', fontWeight: 'bold' }}>{skill.percent}</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar wow fadeInLeft"
                        data-wow-duration={skill.duration}
                        data-wow-delay={skill.delay}
                        role="progressbar"
                        style={{ width: skill.percent }}
                        aria-valuenow={parseInt(skill.percent)}
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
  );
}
