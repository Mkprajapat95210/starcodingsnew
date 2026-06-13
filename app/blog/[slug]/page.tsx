import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { Blog } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    // Try slug first
    let { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).limit(1).maybeSingle();
    if (error) throw error;
    if (!data) {
      // Try by id
      const byId = await supabase.from('blogs').select('*').eq('id', slug).limit(1).maybeSingle();
      if (byId.error) throw byId.error;
      data = byId.data;
    }
    return data || null;
  } catch {
    return null;
  }
}

async function getRecentPosts(): Promise<Partial<Blog>[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('id,slug,title,excerpt,cover_image,created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.slug);
  return {
    title: blog ? `${blog.title} – Starcode Blog` : 'Blog Post – Starcode',
    description: blog?.excerpt || 'Read the latest insights from Starcode.',
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.slug);
  const recentPosts = await getRecentPosts();

  if (!blog) {
    return (
      <div className="container tmp-section-gap">
        <p>Blog post not found.</p>
        <Link href="/blog">← Back to Blog</Link>
      </div>
    );
  }

  const image = blog.cover_image || blog.imageUrl || '/assets/images/blog/details/01.png';
  const author = blog.author || 'Starcode Team';
  const date = formatDate(blog.published_at || blog.created_at || new Date().toISOString());

  // Normalize tags
  let tagsArr: string[] = [];
  const tags = blog.tags;
  if (Array.isArray(tags)) tagsArr = tags;
  else if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags);
      tagsArr = Array.isArray(parsed) ? parsed : [tags];
    } catch {
      tagsArr = tags.split(',').map((t) => t.trim()).filter(Boolean);
      if (!tagsArr.length && tags.trim()) tagsArr = [tags.trim()];
    }
  }

  return (
    <>
      <div className="blog-details-area tmp-section-gap blog-details">
        <div className="container">
          <div className="row g-5">
            {/* Left Content */}
            <div className="col-lg-8">
              <div className="blog-details-left-area">
                <div className="thumbnail-top mb--40">
                  <img src={image} alt={blog.title} className="w-100 radius-10" style={{ maxHeight: '500px', objectFit: 'cover' }} />
                </div>

                <div className="blog-details-discription">
                  <div className="blog-classic-tag mb--20">
                    <h4 className="title">By {author}</h4>
                    <ul className="d-flex gap-4 list-unstyled">
                      <li>
                        <div className="tag-wrap d-flex align-items-center gap-2">
                          <i className="fa-solid fa-tag text-primary"></i>
                          <h4 className="tag-title m-0" style={{ fontSize: '14px' }}>{tagsArr.join(', ')}</h4>
                        </div>
                      </li>
                      <li>
                        <div className="tag-wrap d-flex align-items-center gap-2">
                          <i className="fa-solid fa-calendar-day text-primary"></i>
                          <h4 className="tag-title m-0" style={{ fontSize: '14px' }}>{date}</h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <h1 className="title split-collab mb--30" style={{ fontSize: '36px', fontWeight: '700' }}>{blog.title}</h1>
                  <div
                    className="post-content custom-blog-content"
                    style={{ lineHeight: '1.8', fontSize: '18px', color: '#666' }}
                    dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p>` }}
                  />
                </div>

                {/* Quote Area */}
                {blog.quote_text && (
                  <div className="quote-area-blog-details">
                    <Image src="/assets/images/icons/quote-2.svg" alt="quote" width={40} height={30} style={{ height: 'auto' }} />
                    <p className="disc">{blog.quote_text}</p>
                    <h3 className="author">{blog.quote_author || author}</h3>
                  </div>
                )}

                {/* Navigation Tags */}
                <div className="blog-details-navigation">
                  <div className="navigation-tags">
                    <ul>
                      {tagsArr.map((tag) => (
                        <li key={tag}>
                          <p className="tag">
                            <Link href={`/blog?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="blog-sidebar">
                {/* Recent Posts */}
                <div className="signle-side-bar recent-post-area">
                  <div className="title-area">
                    <h3 className="title">Recent Posts</h3>
                  </div>
                  <div className="body">
                    {recentPosts.map((post, idx) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug || post.id}`}
                        className="single-post"
                      >
                        <span className="single-post-left">
                          <i className="fa-solid fa-arrow-right"></i>
                          <span className="post-title">{post.title || 'Untitled'}</span>
                        </span>
                        <span className="post-num">{idx + 1}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {tagsArr.length > 0 && (
                  <div className="signle-side-bar">
                    <div className="title-area">
                      <h3 className="title">Tags</h3>
                    </div>
                    <div className="body">
                      <ul className="tags-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', padding: 0 }}>
                        {tagsArr.map((tag) => (
                          <li key={tag}>
                            <Link
                              href={`/blog?tag=${encodeURIComponent(tag)}`}
                              className="tag"
                              style={{ padding: '4px 12px', border: '1px solid currentColor', borderRadius: '20px', fontSize: '13px' }}
                            >
                              {tag}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
