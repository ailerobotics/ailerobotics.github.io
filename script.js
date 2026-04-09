// Sample Job Data
const jobListings = [
    {
        id: 1,
        title: 'Founding Engineer - Robotics AI & Multimodal Systems',
        department: 'engineering',
        type: 'Full-time',
        location: 'Hybrid',
        description: 'Stealth mode startup working at the intersection of robotics, manipulation, and AI based learning. Initial technical foundations already built, moving into deeper development and scaling. Full time role supported through a government innovation grant. Opportunity to grow into senior leadership or C level role as the company scales.',
        requirements: [
            'Strong background in robotics with focus on manipulation and control',
            'Hands on experience with ROS or ROS2',
            'Experience with robot kinematics, dynamics, motion planning, and control',
            'Experience with AI based learning methods such as reinforcement learning, imitation learning, or self supervised learning',
            'Experience with deep learning frameworks and perception pipelines',
            'Experience with multimodal large models such as Vision Language Models and Vision Language Action models is a strong plus',
            'System level thinker who enjoys connecting hardware, software, and learning',
            'PhD in Robotics, AI, or related field is a plus but not mandatory',
            'Entrepreneurial mindset with high ownership and curiosity',
            'Eligibility to work full time under a government funded grant position'
        ],
        responsibilities: [
            'Own and drive core robotics and AI development',
            'Design system architecture across manipulation, learning, and perception',
            'Develop and train learning pipelines including reinforcement and imitation learning',
            'Make key technical decisions with long term scalability in mind',
            'Work closely with founders on technical vision and roadmap',
            'Help define engineering culture and future hiring'
        ],
        workOn: [
            'Robotic manipulation systems including perception, planning, and control',
            'Learning based approaches for robot skills, behaviors, and decision making',
            'Integration of multimodal AI combining vision, language, and action',
            'Vision Language Models and Vision Language Action models in robotic pipelines',
            'Real world robotic experiments and sim to real transfer',
            'Turning research ideas into deployable systems'
        ]
    }
];

// Load job listings
function loadJobListings() {
    const jobsContainer = document.getElementById('jobs-container');
    if (!jobsContainer) return;

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

// Handle form submissions
function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = {
        type: 'contact',
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    console.log('Contact Form Submitted:', formData);
    // You can send this data to a backend server here
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

function handleUnsoliciedSubmit(event) {
    event.preventDefault();

    const formData = {
        type: 'unsolicited_application',
        name: document.getElementById('app-name').value,
        email: document.getElementById('app-email').value,
        phone: document.getElementById('app-phone').value,
        linkedin: document.getElementById('app-linkedin').value,
        portfolio: document.getElementById('app-portfolio').value,
        interests: document.getElementById('app-interests').value,
        experience: document.getElementById('app-experience').value,
        resume: document.getElementById('app-resume').value,
        timestamp: new Date().toISOString()
    };

    console.log('Unsolicited Application Submitted:', formData);
    // You can send this data to a backend server here
    alert('Thank you for your application! We appreciate your interest in AILE Robotics.');
    event.target.reset();
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
});
