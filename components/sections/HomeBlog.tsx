import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Blog } from '@/types';

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

// Static fallback blogs from original HTML
const fallbackBlogs: Partial<Blog>[] = [
  {
    id: '1',
    slug: '1',
    imageUrl: '/assets/images/blog/blog-img-4.jpg',
    author: 'Starcode Team',
    created_at: '2025-10-25T00:00:00Z',
    title: "Why We Choose 'TypeScript' for Scalable Frontend Development",
  },
  {
    id: '2',
    slug: '2',
    imageUrl: '/assets/images/blog/blog-img-5.jpg',
    author: 'Vikram S.',
    created_at: '2025-10-18T00:00:00Z',
    title: 'Flutter vs. React Native: Which is Best for Your Startup App?',
  },
  {
    id: '3',
    slug: '3',
    imageUrl: '/assets/images/blog/blog-img-6.jpg',
    author: 'Priya M.',
    created_at: '2025-10-10T00:00:00Z',
    title: 'Automating Your Workflow: 3 Simple Steps to Boost Productivity',
  },
];

async function getLatestBlogs(): Promise<Partial<Blog>[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);
    if (error || !data || data.length === 0) return fallbackBlogs;
    return data;
  } catch {
    return fallbackBlogs;
  }
}

export default async function HomeBlog() {
  const blogs = await getLatestBlogs();

  return (
    <section className="blog-and-news-are tmp-section-gap">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Tech Insights &amp; News</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Decoding the Future of Development <br /> and Business Automation
          </h2>
        </div>
        <div className="row">
          {blogs.map((blog, index) => {
            const image = blog.imageUrl || blog.cover_image || '/assets/images/blog/blog-img-1.jpg';
            const author = blog.author || 'Starcode Team';
            const date = formatDate(blog.created_at || blog.published_at || new Date().toISOString());
            const title = blog.title || 'Untitled Post';
            const slug = blog.slug || blog.id || '#';

            return (
              <div key={blog.id} className="col-lg-4 col-md-6 col-sm-6">
                <div className={`blog-card tmp-hover-link tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}>
                  <div className="img-box">
                    <Link href={`/blog/${slug}`}>
                      <img className="img-primary hidden-on-mobile" src={image} alt="Blog Thumbnail" />
                      <img className="img-secondary" src={image} alt="Blog Thumbnail" />
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
                    <h3 className="blog-title v2">
                      <Link className="link" href={`/blog/${slug}`}>{title}</Link>
                    </h3>
                    <Link href={`/blog/${slug}`} className="read-more-btn v2">
                      Read More{' '}
                      <span className="read-more-icon">
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
