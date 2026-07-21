// Job Data
const jobListings = [];

// Load job listings
function loadJobListings() {
    const jobsContainer = document.getElementById('jobs-container');
    if (!jobsContainer) return;

    if (jobListings.length === 0) {
        jobsContainer.innerHTML = `
            <div class="no-openings">
                <h3>No open positions right now</h3>
                <p>We're not actively hiring at the moment, but we're always glad to meet talented people. Send us an unsolicited application and we'll reach out when the right role opens up.</p>
                <a href="#unsolicited-form" class="btn btn-secondary">Submit an Application</a>
            </div>
        `;
        return;
    }

    jobsContainer.innerHTML = jobListings.map(job => `
        <div class="job-card" onclick="openJobModal(${job.id})">
            <h3>${job.title}</h3>
            <span class="department">${job.department.toUpperCase()}</span>
            <p>${job.description}</p>
            <div class="job-card-meta">
                <span>📍 ${job.location}</span>
                <span>⏰ ${job.type}</span>
            </div>
        </div>
    `).join('');
}

// Filter and search jobs
function setupJobFilters() {
    const searchInput = document.getElementById('search-jobs');
    const filterSelect = document.getElementById('filter-dept');

    if (!searchInput || !filterSelect) return;

    searchInput.addEventListener('input', filterJobs);
    filterSelect.addEventListener('change', filterJobs);
}

function filterJobs() {
    const searchTerm = document.getElementById('search-jobs')?.value.toLowerCase() || '';
    const departmentFilter = document.getElementById('filter-dept')?.value || '';
    const jobsContainer = document.getElementById('jobs-container');

    if (!jobsContainer) return;

    const filtered = jobListings.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) || 
                            job.description.toLowerCase().includes(searchTerm);
        const matchesDept = !departmentFilter || job.department === departmentFilter;
        return matchesSearch && matchesDept;
    });

    jobsContainer.innerHTML = filtered.length > 0 
        ? filtered.map(job => `
            <div class="job-card" onclick="openJobModal(${job.id})">
                <h3>${job.title}</h3>
                <span class="department">${job.department.toUpperCase()}</span>
                <p>${job.description}</p>
                <div class="job-card-meta">
                    <span>📍 ${job.location}</span>
                    <span>⏰ ${job.type}</span>
                </div>
            </div>
        `).join('')
        : '<p style="grid-column: 1/-1; text-align: center; color: #2F3438;">No positions found matching your criteria.</p>';
}

// Open job modal
function openJobModal(jobId) {
    const job = jobListings.find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('job-modal');
    const detailContent = document.getElementById('job-detail-content');

    let modalHTML = `
        <h2>${job.title}</h2>
        <div class="job-card-meta" style="margin-bottom: 30px;">
            <span>📍 ${job.location}</span>
            <span>⏰ ${job.type}</span>
            <span>🏢 ${job.department.charAt(0).toUpperCase() + job.department.slice(1)}</span>
        </div>

        <h3>About the Role</h3>
        <p>${job.description}</p>
    `;

    if (job.workOn) {
        modalHTML += `
            <h3>What You Will Work On</h3>
            <ul>
                ${job.workOn.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
    }

    modalHTML += `
        <h3>Key Responsibilities</h3>
        <ul>
            ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
        </ul>

        <h3>What We Are Looking For</h3>
        <ul>
            ${job.requirements.map(req => `<li>${req}</li>`).join('')}
        </ul>
    `;

    detailContent.innerHTML = modalHTML;

    document.getElementById('job-id').value = jobId;
    modal.classList.remove('hidden');
}

function closeJobModal() {
    document.getElementById('job-modal').classList.add('hidden');
}

// Application Modal
function openApplicationForm() {
    document.getElementById('job-modal').classList.add('hidden');
    document.getElementById('application-modal').classList.remove('hidden');
}

function closeApplicationModal() {
    document.getElementById('application-modal').classList.add('hidden');
}

// Form pages: pre-fill subject from URL (e.g. Book a Pilot Project),
// and show a confirmation banner after a successful FormSubmit redirect.
function setupFormPage() {
    const params = new URLSearchParams(window.location.search);

    const subjectField = document.getElementById('subject');
    const subjectParam = params.get('subject');
    if (subjectField && subjectParam) {
        subjectField.value = subjectParam;
    }

    if (params.get('sent') === '1') {
        const banner = document.getElementById('form-status');
        if (banner) {
            banner.textContent = 'Thank you! Your submission has been received. We will get back to you soon.';
            banner.classList.remove('hidden');
            banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

function handleJobApplication(event) {
    event.preventDefault();

    const formData = {
        type: 'job_application',
        job_id: document.getElementById('job-id').value,
        name: document.getElementById('job-app-name').value,
        email: document.getElementById('job-app-email').value,
        phone: document.getElementById('job-app-phone').value,
        linkedin: document.getElementById('job-app-linkedin').value,
        cover_letter: document.getElementById('job-app-cover').value,
        resume: document.getElementById('job-app-resume').value,
        timestamp: new Date().toISOString()
    };

    console.log('Job Application Submitted:', formData);
    // You can send this data to a backend server here
    alert('Thank you for applying! We will review your application and get back to you soon.');
    closeApplicationModal();
    event.target.reset();
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const jobModal = document.getElementById('job-modal');
    const appModal = document.getElementById('application-modal');

    if (event.target === jobModal) {
        jobModal.classList.add('hidden');
    }
    if (event.target === appModal) {
        appModal.classList.add('hidden');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only load jobs if we're on the jobs page
    if (document.getElementById('jobs-container')) {
        loadJobListings();
        setupJobFilters();
    }

    // Form pages setup (subject pre-fill + sent confirmation)
    if (document.getElementById('form-status')) {
        setupFormPage();
    }
});
