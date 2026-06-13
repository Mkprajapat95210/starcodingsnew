import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { supabase } from '@/lib/supabase';
import { Blog } from '@/types';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog – Tech Insights by Starcode',
  description: 'Stay updated with the latest tech trends, tutorials, and insights from the Starcode (Starcoding) development team.',
  keywords: ['Starcode Blog', 'Tech Tutorials', 'Starcoding Insights', 'Web Development Blog'],
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

interface Props {
  searchParams: Promise<{ tag?: string }>;
}

async function getBlogs(tag?: string): Promise<Blog[]> {
  try {
    let query = supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (tag) {
      query = query.contains('tags', [tag]);
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export default async function BlogPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const tag = resolvedSearchParams.tag;
  const blogs = await getBlogs(tag);

  return (
    <>
      <Breadcrumb title={tag ? `Blog: ${tag}` : "Our Blog"} current="Blog" />

      <section className="blog-classic-area-wrapper tmp-section-gap">
        <div className="container">
          <div className="row">
            {blogs.length === 0 ? (
              <p className="text-center col-12 py-5">No blog posts found.</p>
            ) : (
              blogs.map((blog, index) => {
                const image = blog.cover_image || blog.imageUrl || '/assets/images/blog/blog-img-1.jpg';
                const author = blog.author || 'Starcode Team';
                const date = formatDate(blog.published_at || blog.created_at || new Date().toISOString());
                const title = blog.title || 'Untitled Post';
                const slug = blog.slug || blog.id;
                const animationOrder = (index % 3) + 1;

                return (
                  <div key={blog.id} className="col-lg-4 col-md-6 col-sm-6 mb-5">
                    <div className={`blog-card tmp-hover-link image-box-hover tmp-scroll-trigger tmp-fade-in animation-order-${animationOrder}`}>
                      <div className="img-box">
                        <Link href={`/blog/${slug}`}>
                          <img className="w-100" src={image} alt={title} style={{ height: '250px', objectFit: 'cover' }} />
                        </Link>
                        <ul className="blog-tags">
                          <li>
                            <span className="tag-icon"><i className="fa-regular fa-user"></i></span>
                            {author}
                          </li>
                          <li>
                            <span className="tag-icon"><i className="fa-solid fa-calendar-days"></i></span>
                            {date}
                          </li>
                        </ul>
                      </div>
                      <div className="blog-content-wrap">
                        <h3 className="blog-title">
                          <Link className="link" href={`/blog/${slug}`}>{title}</Link>
                        </h3>
                        <p className="blog-excerpt mt-2 mb-4 line-clamp-2">{blog.excerpt}</p>
                        <div className="more-btn tmp-link-animation">
                          <Link href={`/blog/${slug}`} className="read-more-btn">
                            Read More{' '}
                            <span className="read-more-icon">
                              <i className="fa-solid fa-angle-right"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
