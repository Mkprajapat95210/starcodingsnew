import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProjectFilter from '@/components/ui/ProjectFilter';
import { supabase } from '@/lib/supabase';
import { Project, Category } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects – Starcode Portfolio & Case Studies',
  description: 'View our successful projects at Starcode (Starcoding). From e-commerce platforms to custom mobile apps, we deliver excellence.',
  keywords: ['Starcode Projects', 'Starcoding Portfolio', 'Web Development Case Studies'],
};

interface Props {
  searchParams: Promise<{ category?: string }>;
}

async function getProjects(category?: string): Promise<Project[]> {
  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export default async function ProjectsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;

  // Fetch both in parallel
  const [projects, categories] = await Promise.all([
    getProjects(category),
    getCategories()
  ]);

  return (
    <>
      <Breadcrumb title={category ? `Projects: ${category}` : "My Project"} current="Project" />

      <div className="latest-portfolio-area custom-column-grid tmp-section-gap">
        <div className="container">
          {/* Section Header */}
          <div className="section-head mb--60 text-center">
            <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
              <span className="subtitle">Latest Work</span>
            </div>
            <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
              Our Recent Projects & Success Stories
            </h2>
            <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3 mx-auto" style={{ maxWidth: '800px', color: 'var(--color-body)' }}>
              We work on Websites, Mobile Apps, and Business Automation. Here are some of our best projects.
            </p>
          </div>

          <ProjectFilter categories={categories} />
          <div className="row mt--30" id="projects-container">
            {projects.length === 0 ? (
              <p className="text-center col-12 py-5" style={{ color: 'var(--color-heading)' }}>No projects found in this category.</p>
            ) : (
              projects.map((project, idx) => {
                // Check all possible variations of the image URL column name
                const rawImageUrl = (project as any).imageurl || project.imageUrl || (project as any).image_url;
                
                // Handle Supabase URL correctly
                let imageSrc = rawImageUrl || '/assets/images/blog/blog-img-1.jpg';
                
                // If the imageUrl is just a path (not a full URL), construct the public URL
                if (rawImageUrl && !rawImageUrl.startsWith('http')) {
                  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
                  imageSrc = `${supabaseUrl}/storage/v1/object/public/projects/${rawImageUrl}`;
                }

                const title = project.title || 'Untitled Project';
                const description = project.summary || project.description || 'Project description unavailable.';
                const link = project.link || '#';
                const animationOrder = (idx % 4) + 1;

                return (
                  <div key={project.id} className="col-lg-6 col-md-6 mb-5">
                    <div className={`latest-portfolio-card tmp-hover-link tmp-scroll-trigger tmp-fade-in animation-order-${animationOrder}`}>
                      <div className="portfoli-card-img" style={{ overflow: 'hidden', borderRadius: '12px' }}>
                        <div className="img-box v2" style={{ backgroundColor: '#1a1a1a' }}>
                          <Link className="tmp-scroll-trigger tmp-zoom-in animation-order-1" href={link}>
                            <Image 
                              className="w-100" 
                              src={imageSrc} 
                              alt={title} 
                              width={1200} 
                              height={800} 
                              style={{ 
                                width: '100%',
                                height: '450px', 
                                objectFit: 'cover',
                                objectPosition: 'top center'
                              }}
                              unoptimized={imageSrc.startsWith('http')}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="portfolio-card-content-wrap">
                        <div className="content-left">
                          <h3 className="portfolio-card-title">
                            <Link className="link" href={link}>{title}</Link>
                          </h3>
                          <p className="portfoli-card-para">{description}</p>
                        </div>
                        <Link href={link} className="tmp-arrow-icon-btn">
                          <div className="btn-inner">
                            <i className="tmp-icon fa-solid fa-arrow-up-right"></i>
                            <i className="tmp-icon-bottom fa-solid fa-arrow-up-right"></i>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
