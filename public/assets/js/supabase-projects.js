document.addEventListener('DOMContentLoaded', async () => {
  const SUPABASE_URL = 'https://mqjnlctdmponvxmkucoa.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xam5sY3RkbXBvbnZ4bWt1Y29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MTY3NTEsImV4cCI6MjA3NjA5Mjc1MX0.zBshZBeC44aRehc0B27QrBiW4QlNL2SCgv0Y7X7Zdw8';

	// Ensure the Supabase library is loaded and create a client without shadowing the global
	if (!window.supabase || typeof window.supabase.createClient !== 'function') {
		console.error('Supabase library not loaded. Make sure the CDN script is included before this file.');
		return;
	}
	const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const projectsContainer = document.getElementById('projects-container');
  if (!projectsContainer) {
	console.error('Projects container not found.');
	return;
  }

	async function fetchProjects() {
	try {
			const { data, error } = await supabaseClient
		.from('projects')
		.select('*')
		.order('created_at', { ascending: false });

	  if (error) {
		throw error;
	  }

	  displayProjects(data);
	} catch (error) {
	  console.error('Error fetching projects:', error?.message ?? error);
	  projectsContainer.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
	}
  }

  function displayProjects(projects) {
	if (!projects || projects.length === 0) {
	  projectsContainer.innerHTML = '<p>No projects found.</p>';
	  return;
	}

	projectsContainer.innerHTML = ''; // Clear existing content

	projects.forEach((project, idx) => {
	  const imageSrc = project.imageUrl || 'assets/images/portfolio/portfolio-01.jpg';
	  const title = project.title || 'Untitled Project';
	  const description = project.description || project.summary || project.portfoli_card_para || 'Project description unavailable.';
	  const link = project.link || project.url || '#';
	  const category = project.category || 'Web Development';
	  const animationOrder = idx + 1;

	  const projectElement = `
		<div class="col-lg-6 col-sm-6">
			<div class="latest-portfolio-card tmp-hover-link tmp-scroll-trigger tmp-fade-in animation-order-${animationOrder}">
				<div class="portfoli-card-img">
					<div class="img-box v2">
						<a class="tmp-scroll-trigger tmp-zoom-in animation-order-1" href="${link}">
							<img class="w-100" src="${imageSrc}" alt="Thumbnail">
						</a>
					</div>
					</div>
					<div class="portfolio-card-content-wrap">
						<div class="content-left">
							<h3 class="portfolio-card-title"><a class="link" href="${link}">${title}</a></h3>
							<p class="portfoli-card-para">${description}</p>
						</div>
						<a href="${link}" class="tmp-arrow-icon-btn">
							<div class="btn-inner">
								<i class="tmp-icon fa-solid fa-arrow-up-right"></i>
								<i class="tmp-icon-bottom fa-solid fa-arrow-up-right"></i>
							</div>
						</a>
					</div>
				</div>
			</div>`;
	  projectsContainer.insertAdjacentHTML('beforeend', projectElement);
	});
  }

  fetchProjects();
});
