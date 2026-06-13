import Image from 'next/image';

const educations = [
  {
    subtitle: 'Bachelor of Computer Applications',
    title: '2020-2023',
    para: 'Foundation built on core programming principles, data structures, and object-oriented concepts, essential for modern development.',
    order: 1,
  },
  {
    subtitle: 'Master of Technology (IT Specialization)',
    title: '2023-2025',
    para: 'Advanced studies in scalable cloud architecture, high-performance computing, and specialized full-stack development methodologies.',
    order: 2,
  },
  {
    subtitle: 'Bachelor of Science',
    title: '2019-2022',
    para: 'Solid academic background focusing on logical reasoning, scientific data management, and systematic problem-solving approach.',
    order: 3,
  },
  {
    subtitle: 'P.G. Diploma in Computer Applications',
    title: '2022-2024',
    para: 'Focused postgraduate training in database administration, advanced web technology stacks, and efficient software utility design.',
    order: 4,
  },
];

const experiences = [
  {
    subtitle: 'LEAD FRONTEND DEVELOPMENT',
    name: 'Poonamchand Prajapat',
    role: 'FRONTEND Developer',
    para: 'Specializes in creating responsive, high-fidelity user interfaces using modern frameworks (React/Vue), focusing on optimal user experience and performance.',
    order: 1,
  },
  {
    subtitle: 'LEAD BACKEND DEVELOPMENT',
    name: 'Mukesh Prajapat',
    role: 'BACKEND Developer',
    para: 'Architects scalable server-side applications, manages robust databases, and builds secure, high-speed APIs for web and mobile platforms (Node.js/Python).',
    order: 2,
  },
];

export default function HomeEducationExperience() {
  return (
    <section className="education-experience tmp-section-gapTop">
      <div className="container">
        <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
          Education{' '}
          <span>
            <Image src="/assets/images/custom-line/custom-line.png" alt="custom-line" width={100} height={10} style={{ height: 'auto' }} />
          </span>
        </h2>
        <div className="row g-5">
          {educations.map((edu) => (
            <div key={edu.title} className="col-lg-6 col-sm-6">
              <div className={`education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${edu.order}`}>
                <h4 className="edu-sub-title">{edu.subtitle}</h4>
                <h2 className="edu-title">{edu.title}</h2>
                <p className="edu-para">{edu.para}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="experiences-wrapper v2">
          <div className="row">
            <div className="col-lg-6">
              <div className="experiences-wrap-right-content">
                <Image
                  className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                  src="/assets/images/experiences/expert-img-two.jpg"
                  alt="Team Development Expertise"
                  width={600}
                  height={400}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="experiences-wrap-left-content">
                <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
                  Experiences{' '}
                  <span>
                    <Image src="/assets/images/custom-line/custom-line.png" alt="custom-line" width={100} height={10} style={{ height: 'auto' }} />
                  </span>
                </h2>
                {experiences.map((exp) => (
                  <div
                    key={exp.name}
                    className={`experience-content tmp-scroll-trigger tmp-fade-in animation-order-${exp.order}`}
                  >
                    <p className="ex-subtitle">{exp.subtitle}</p>
                    <h2 className="ex-name">{exp.name}</h2>
                    <h3 className="ex-title">{exp.role}</h3>
                    <p className="ex-para">{exp.para}</p>
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
