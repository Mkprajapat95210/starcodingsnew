// supabase-blogs.js

document.addEventListener('DOMContentLoaded', async () => {
  const SUPABASE_URL = 'https://mqjnlctdmponvxmkucoa.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xam5sY3RkbXBvbnZ4bWt1Y29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MTY3NTEsImV4cCI6MjA3NjA5Mjc1MX0.zBshZBeC44aRehc0B27QrBiW4QlNL2SCgv0Y7X7Zdw8';

  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.error('Supabase library not loaded. Make sure the CDN script is included before this file.');
    return;
  }
  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Helper to format date
  const fmtDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return iso; }
  };

  async function fetchBlogs(limit = null) {
    try {
      let query = supabaseClient.from('blogs').select('*').order('created_at', { ascending: false });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching blogs:', err);
      return null;
    }
  }

  function renderBlogCard(blog) {
    const image = blog.imageUrl || 'assets/images/blog/blog-img-1.jpg';
    const author = blog.author || 'Starcode Team';
    const date = fmtDate(blog.created_at || blog.published_at || new Date().toISOString());
    const title = blog.title || 'Untitled Post';
    const slug = blog.slug || blog.id || '#';
    const link = blog.link || `blog-details.html?id=${slug}`;

    return `
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="blog-card tmp-hover-link image-box-hover tmp-scroll-trigger tmp-fade-in">
          <div class="img-box">
            <a href="${link}">
              <img class="w-100" src="${image}" alt="Blog Thumbnail">
            </a>
            <ul class="blog-tags">
              <li><span class="tag-icon"><i class="fa-regular fa-user"></i></span>${author}</li>
              <li><span class="tag-icon"><i class="fa-solid fa-calendar-days"></i></span>${date}</li>
            </ul>
          </div>
          <div class="blog-content-wrap">
            <h3 class="blog-title"><a class="link" href="${link}">${title}</a></h3>
            <div class="more-btn tmp-link-animation">
              <a href="${link}" class="read-more-btn">Read More <span class="read-more-icon"><i class="fa-solid fa-angle-right"></i></span></a>
            </div>
          </div>
        </div>
      </div>`;
  }

  // Index page: render latest 3 if container exists
  const indexContainer = document.querySelector('.blog-and-news-are .row');
  if (indexContainer) {
    const blogs = await fetchBlogs(3);
    if (blogs && blogs.length) {
      indexContainer.innerHTML = '';
      blogs.forEach((b, i) => {
        const el = renderBlogCard(b);
        indexContainer.insertAdjacentHTML('beforeend', el);
      });
    }
  }

  // Blog listing page: render all in the blog-classic-area-wrapper
  // Avoid running this on the blog details page (which also uses the same wrapper)
  const blogListContainer = document.querySelector('.blog-classic-area-wrapper .row');
  const isDetailPage = document.body && document.body.classList && document.body.classList.contains('blog-details');
  if (blogListContainer && !isDetailPage) {
    const blogs = await fetchBlogs();
    if (blogs && blogs.length) {
      blogListContainer.innerHTML = '';
      blogs.forEach((b, i) => {
        const el = renderBlogCard(b);
        blogListContainer.insertAdjacentHTML('beforeend', el);
      });
    }
  }

  // Blog details page: if an identifier is present in the query string, fetch and render single post
  async function fetchBlogDetailByIdentifier(identifier) {
    try {
      // Try slug match first
      let { data, error } = await supabaseClient.from('blogs').select('*').eq('slug', identifier).limit(1).maybeSingle();
      if (error) throw error;
      if (!data) {
        // Try id match
        const byId = await supabaseClient.from('blogs').select('*').eq('id', identifier).limit(1).maybeSingle();
        if (byId.error) throw byId.error;
        data = byId.data;
      }
      return data || null;
    } catch (err) {
      console.error('Error fetching blog detail:', err);
      return null;
    }
  }

  function renderBlogDetail(blog) {
    if (!blog) return;
    const image = blog.imageUrl || blog.cover_image || 'assets/images/blog/details/01.png';
    const author = blog.author || 'Starcode Team';
    const date = fmtDate(blog.created_at || blog.published_at || new Date().toISOString());
    const title = blog.title || 'Untitled Post';
    const tags = blog.tags || blog.category || '';
    // The page uses several blocks; update the main parts safely.
    const thumbImg = document.querySelector('.thumbnail-top img');
    if (thumbImg) {
      thumbImg.src = image;
      thumbImg.alt = title;
    }

    const authorEl = document.querySelector('.blog-classic-tag h4.title');
    if (authorEl) authorEl.textContent = `By ${author}`;

    const dateEl = document.querySelector('.blog-classic-tag ul li:nth-child(2) .tag-title');
    if (dateEl) dateEl.textContent = date;

    const titleEl = document.querySelector('.blog-details-left-area h3.title');
    if (titleEl) titleEl.textContent = title;

    // Replace the first descriptive block with the content from the blog. We assume `content` contains HTML.
    const descBlocks = document.querySelectorAll('.blog-details-discription');
    if (descBlocks && descBlocks.length) {
      const first = descBlocks[0];
      // Keep simple tag area and then render the content
      const contentHtml = blog.content || blog.body_html || blog.excerpt || '';
      const safeContent = contentHtml; // assume trusted HTML from CMS; if user input, sanitize on server-side.
      first.innerHTML = `
        <div class="blog-classic-tag">
          <h4 class="title">By ${author}</h4>
          <ul>
            <li>
              <div class="tag-wrap">
                <i class="fa-solid fa-tag"></i>
                <h4 class="tag-title">${tags}</h4>
              </div>
            </li>
            <li>
              <div class="tag-wrap">
                <i class="fa-solid fa-calendar-day"></i>
                <h4 class="tag-title">${date}</h4>
              </div>
            </li>
          </ul>
        </div>
        <h3 class="title split-collab">${title}</h3>
        <div class="post-content">${safeContent}</div>
      `;
    }

    // --- Render tags into the navigation tags list ---
    try {
      const navTagsUl = document.querySelector('.blog-details-navigation .navigation-tags ul');
      if (navTagsUl) {
        navTagsUl.innerHTML = '';
        // Normalize tags: try JSON, else comma-split, else single string
        let tagsArr = [];
        if (Array.isArray(tags)) tagsArr = tags;
        else if (typeof tags === 'string') {
          try {
            const parsed = JSON.parse(tags);
            if (Array.isArray(parsed)) tagsArr = parsed;
            else tagsArr = [tags];
          } catch (e) {
            // not JSON
            tagsArr = tags.split(',').map(t => t.trim()).filter(Boolean);
            if (!tagsArr.length && tags.trim()) tagsArr = [tags.trim()];
          }
        }

        tagsArr.forEach(t => {
          const li = document.createElement('li');
          const p = document.createElement('p');
          p.className = 'tag';
          const a = document.createElement('a');
          a.href = `blog.html?tag=${encodeURIComponent(t)}`;
          a.textContent = t;
          p.appendChild(a);
          li.appendChild(p);
          navTagsUl.appendChild(li);
        });
      }
    } catch (e) {
      // ignore tag rendering errors
    }

    // --- Populate swiper/gallery images from the blog record ---
    try {
      // Determine image list: prefer gallery/images array, else use cover_image/imageUrl
      let imgs = [];
      if (Array.isArray(blog.gallery) && blog.gallery.length) imgs = blog.gallery;
      else if (Array.isArray(blog.images) && blog.images.length) imgs = blog.images;
      else if (typeof blog.gallery === 'string') {
        try { const g = JSON.parse(blog.gallery); if (Array.isArray(g)) imgs = g; } catch (e) {}
      } else if (typeof blog.images === 'string') {
        try { const g = JSON.parse(blog.images); if (Array.isArray(g)) imgs = g; } catch (e) {}
      }
      if (!imgs.length) {
        if (blog.cover_image) imgs = [blog.cover_image];
        else if (blog.imageUrl) imgs = [blog.imageUrl];
      }

      // Replace images inside the swiper area
      const swiperImgs = document.querySelectorAll('.our-portfolio-swiper .blog-details-swiper img');
      if (swiperImgs && swiperImgs.length) {
        // If we have as many or more imgs, map them; otherwise set first img for all
        if (imgs.length >= swiperImgs.length) {
          swiperImgs.forEach((imgEl, i) => {
            imgEl.src = imgs[i] || imgs[0];
            imgEl.alt = title;
          });
        } else if (imgs.length === 1) {
          swiperImgs.forEach((imgEl) => {
            imgEl.src = imgs[0];
            imgEl.alt = title;
          });
        } else if (imgs.length > 1) {
          // set first few, others fallback to first
          swiperImgs.forEach((imgEl, i) => {
            imgEl.src = imgs[i] || imgs[0];
            imgEl.alt = title;
          });
        }
      }
    } catch (e) {
      // ignore gallery errors
    }

    // Setup previous / next buttons
    try {
      setupPrevNext(blog);
    } catch (e) {
      // ignore
    }

    // --- Populate quote area (if present) ---
    try {
      const quoteText = blog.quote_text || blog.excerpt || '';
      const quoteAuthor = blog.quote_author || blog.author || '';
      const quotePara = document.querySelector('.quote-area-blog-details p.disc');
      const quoteAuthorEl = document.querySelector('.quote-area-blog-details h3.author');
      if (quotePara) quotePara.textContent = quoteText;
      if (quoteAuthorEl) quoteAuthorEl.textContent = quoteAuthor;
    } catch (e) {
      // ignore
    }
  }

  // --- Recent posts helpers ---
  async function fetchRecentPosts(limit = 5) {
    try {
      const { data, error } = await supabaseClient
        .from('blogs')
        .select('id,slug,title,excerpt,cover_image,created_at')
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching recent posts:', err);
      return [];
    }
  }

  function renderRecentPosts(posts) {
    const container = document.querySelector('.signle-side-bar.recent-post-area .body');
    if (!container) return;
    container.innerHTML = '';

    posts.forEach((p, idx) => {
      const a = document.createElement('a');
      a.href = `blog-details.html?id=${encodeURIComponent(p.slug || p.id)}`;
      a.className = 'single-post';
      a.innerHTML = `
        <span class="single-post-left">
          <i class="fa-solid fa-arrow-right"></i>
          <span class="post-title">${escapeHtml(p.title || 'Untitled')}</span>
        </span>
        <span class="post-num">${idx + 1}</span>
      `;

      // In-place navigation: fetch and render without full reload
      a.addEventListener('click', async (e) => {
        e.preventDefault();
        const identifier = p.slug || p.id;
        const blog = await fetchBlogDetailByIdentifier(identifier);
        if (blog) {
          renderBlogDetail(blog);
          const top = document.querySelector('.blog-details-left-area');
          if (top) top.scrollIntoView({ behavior: 'smooth' });
        }
      });

      container.appendChild(a);
    });
  }

  function escapeHtml(unsafe) {
    return (unsafe || '').replace(/[&<"'>]/g, function (m) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m];
    });
  }

  // --- Prev/Next navigation helpers ---
  async function fetchAllPostsForNav(limit = 1000) {
    try {
      const { data, error } = await supabaseClient
        .from('blogs')
        .select('id,slug,title,created_at')
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching posts for nav:', err);
      return [];
    }
  }

  async function setupPrevNext(current) {
    if (!current) return;
    const list = await fetchAllPostsForNav();
    if (!list || !list.length) return;

    // find index by id or slug
    const idx = list.findIndex((p) => (p.id && current.id && p.id === current.id) || (p.slug && current.slug && p.slug === current.slug));

    const prevBtn = document.querySelector('.our-portfolio-swiper-btn-wrap .prev-btn');
    const nextBtn = document.querySelector('.our-portfolio-swiper-btn-wrap .next-btn');

    const setButton = (btnEl, post) => {
      if (!btnEl) return;
      const titleEl = btnEl.querySelector('.btn-content h4.title');
      if (post) {
        btnEl.style.display = '';
        btnEl.href = `blog-details.html?id=${encodeURIComponent(post.slug || post.id)}`;
        if (titleEl) titleEl.textContent = post.title || '';
        // attach click handler to load in-place
        btnEl.onclick = async function (e) {
          e.preventDefault();
          const identifier = post.slug || post.id;
          const blog = await fetchBlogDetailByIdentifier(identifier);
          if (blog) {
            renderBlogDetail(blog);
            const top = document.querySelector('.blog-details-left-area');
            if (top) top.scrollIntoView({ behavior: 'smooth' });
          }
        };
      } else {
        // hide if not available
        btnEl.style.display = 'none';
        btnEl.onclick = null;
      }
    };

    const prevPost = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null; // older
    const nextPost = idx > 0 ? list[idx - 1] : null; // newer

    setButton(prevBtn, prevPost);
    setButton(nextBtn, nextPost);
  }

  // --- Search functionality ---
  async function searchPosts(queryText, limit = 10) {
    if (!queryText || !queryText.trim()) return [];
    try {
      // Search in title and excerpt using ILIKE for case-insensitive match
      const q = `%${queryText.trim()}%`;
      const { data, error } = await supabaseClient
        .from('blogs')
        .select('id,slug,title,excerpt,cover_image,created_at')
        .or(`title.ilike.${q},excerpt.ilike.${q},content.ilike.${q}`)
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error searching posts:', err);
      return [];
    }
  }

  // Hook up search input/button on details page
  const searchInput = document.getElementById('blog-search-input');
  const searchButton = document.getElementById('blog-search-button');
  const recentContainer = document.getElementById('recent-posts-container');

  if (searchButton && searchInput) {
    searchButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const q = searchInput.value || '';
      const results = await searchPosts(q, 10);
      if (results && results.length) {
        renderRecentPosts(results);
      } else {
        if (recentContainer) recentContainer.innerHTML = '<p>No posts found.</p>';
      }
    });

    // Enter key triggers search
    searchInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = searchInput.value || '';
        const results = await searchPosts(q, 10);
        if (results && results.length) {
          renderRecentPosts(results);
        } else {
          if (recentContainer) recentContainer.innerHTML = '<p>No posts found.</p>';
        }
      }
    });
  }

  const params = new URLSearchParams(window.location.search);
  const identifier = params.get('id') || params.get('slug');
  if (identifier && document.querySelector('.blog-details-left-area')) {
    const blog = await fetchBlogDetailByIdentifier(identifier);
    if (blog) {
      renderBlogDetail(blog);
    } else {
      // show not found
      const container = document.querySelector('.blog-details-left-area');
      if (container) container.innerHTML = '<p>Blog post not found.</p>';
    }
    // fetch and render recent posts in sidebar
    const recent = await fetchRecentPosts(5);
    if (recent && recent.length) renderRecentPosts(recent);
  }

});
