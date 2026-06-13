import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomeBanner from '@/components/sections/HomeBanner';
import HomeServices from '@/components/sections/HomeServices';
import HomeCounter from '@/components/sections/HomeCounter';
import HomeLatestServices from '@/components/sections/HomeLatestServices';
import HomeSkills from '@/components/sections/HomeSkills';
import HomeEducationExperience from '@/components/sections/HomeEducationExperience';
import HomeSupportedCompanies from '@/components/sections/HomeSupportedCompanies';
import HomePortfolio from '@/components/sections/HomePortfolio';
import HomeMySkill from '@/components/sections/HomeMySkill';
import HomePricing from '@/components/sections/HomePricing';
import HomeTestimonial from '@/components/sections/HomeTestimonial';
import HomeBlog from '@/components/sections/HomeBlog';

export default function HomePage() {
  return (
    <>
      <HomeBanner />
      <HomeServices />
      <HomeCounter />
      <HomeLatestServices />
      <HomeSkills />
      <HomeEducationExperience />
      <HomeSupportedCompanies />
      <div className="tpm-custom-box-bg">
        <HomePortfolio />
        <HomeMySkill />
      </div>
      <HomePricing />
      <HomeTestimonial />
      <HomeBlog />
      {/* SEO Keywords Section (Hidden) */}
      <div className="visually-hidden" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
        <h2>Starcode, Starcodings, Starcoding</h2>
        <p>Best web development company, app development services, business automation churu, rajasthan.</p>
      </div>
    </>
  );
}
