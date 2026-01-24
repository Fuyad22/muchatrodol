// Member Modal Function - Define globally before DOMContentLoaded
function openMemberModal(card) {
    const memberModal = document.getElementById('memberModal');
    if (!memberModal) {
        console.error('Member modal not found');
        return;
    }

    const name = card.getAttribute('data-name');
    const role = card.getAttribute('data-role');
    const email = card.getAttribute('data-email');
    const phone = card.getAttribute('data-phone');
    const bio = card.getAttribute('data-bio');
    const achievements = card.getAttribute('data-achievements');

    // Populate modal
    document.getElementById('modalMemberName').textContent = name || 'N/A';
    document.getElementById('modalMemberRole').textContent = role || 'N/A';
    document.getElementById('modalMemberEmail').textContent = email || 'N/A';
    document.getElementById('modalMemberPhone').textContent = phone || 'N/A';
    document.getElementById('modalMemberBio').textContent = bio || 'No bio available';

    // Populate achievements
    const achievementsEl = document.getElementById('modalMemberAchievements');
    if (achievementsEl && achievements) {
        achievementsEl.innerHTML = '';
        achievements.split(',').forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement.trim();
            achievementsEl.appendChild(li);
        });
    }

    // Show modal
    memberModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Toast Notification System - Define functions first
function showToast(message, type = 'info', title = '', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        console.error('Toast container not found');
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Icon based on type
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    // Default titles
    const titles = {
        success: title || 'Success!',
        error: title || 'Error!',
        warning: title || 'Warning!',
        info: title || 'Info'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${titles[type]}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" aria-label="Close notification">×</button>
        <div class="toast-progress"></div>
    `;

    toastContainer.appendChild(toast);

    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        removeToast(toast);
    });

    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            removeToast(toast);
        }, duration);
    }

    return toast;
}

function removeToast(toast) {
    if (!toast || toast.classList.contains('removing')) return;

    toast.classList.add('removing');
    setTimeout(() => {
        if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }
    }, 300);
}

// API Configuration - Point to Django backend on port 8000
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000/api'
    : '/api';

console.log('API URL configured as:', API_URL);

// Load Events Dynamically
async function loadEvents() {
    try {
        console.log('Fetching events from:', `${API_URL}/events`);
        const response = await fetch(`${API_URL}/events?t=${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        console.log('Events data received:', data);

        if (data.success && data.events && data.events.length > 0) {
            const eventsGrid = document.querySelector('.events-grid');
            if (eventsGrid) {
                eventsGrid.innerHTML = '';

                data.events.forEach(event => {
                    const eventDate = new Date(event.date);
                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const month = monthNames[eventDate.getMonth()];
                    const day = eventDate.getDate();

                    const eventCard = document.createElement('div');
                    eventCard.className = 'event-card';
                    eventCard.innerHTML = `
                        <div class="event-date">
                            <span class="day">${day}</span>
                            <span class="month">${month}</span>
                        </div>
                        <div class="event-content">
                            <h4>${event.title}</h4>
                            <p class="event-time"><i class="far fa-clock"></i> ${event.start_time.slice(0, 5)} - ${event.end_time.slice(0, 5)}</p>
                            <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                            <p class="event-description">${event.description}</p>
                            <button class="event-register-btn" data-event="${event.title}">Register Now</button>
                        </div>
                    `;
                    eventsGrid.appendChild(eventCard);
                });
            }
        }
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Load News Dynamically
async function loadNews() {
    try {
        console.log('Fetching news from:', `${API_URL}/news?limit=3`);
        const response = await fetch(`${API_URL}/news?limit=3&t=${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        console.log('News data received:', data);

        if (data.success && data.news && data.news.length > 0) {
            const newsGrid = document.querySelector('.news-grid');
            if (newsGrid) {
                newsGrid.innerHTML = '';

                data.news.forEach(article => {
                    const pubDate = new Date(article.published_date);
                    const formattedDate = pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

                    const newsCard = document.createElement('article');
                    newsCard.className = 'news-card';
                    newsCard.setAttribute('data-title', article.title);
                    newsCard.setAttribute('data-url', window.location.href);
                    newsCard.innerHTML = `
                        <div class="news-image">
                            <img src="${article.image}" alt="${article.title}" loading="lazy">
                            <span class="news-badge">Latest</span>
                        </div>
                        <div class="news-content">
                            <div class="news-meta">
                                <span><i class="far fa-calendar"></i> ${formattedDate}</span>
                                <span><i class="far fa-user"></i> ${article.author}</span>
                            </div>
                            <h3>${article.title}</h3>
                            <p>${article.excerpt}</p>
                            <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                            <div class="share-buttons">
                                <span class="share-label"><i class="fas fa-share-alt"></i> Share:</span>
                                <button class="share-btn" data-platform="facebook" aria-label="Share on Facebook">
                                    <i class="fab fa-facebook-f"></i>
                                </button>
                                <button class="share-btn" data-platform="twitter" aria-label="Share on Twitter">
                                    <i class="fab fa-twitter"></i>
                                </button>
                                <button class="share-btn" data-platform="linkedin" aria-label="Share on LinkedIn">
                                    <i class="fab fa-linkedin-in"></i>
                                </button>
                                <button class="share-btn" data-platform="whatsapp" aria-label="Share on WhatsApp">
                                    <i class="fab fa-whatsapp"></i>
                                </button>
                                <button class="share-btn" data-platform="copy" aria-label="Copy link">
                                    <i class="fas fa-link"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    newsGrid.appendChild(newsCard);
                });
            }
        }
    } catch (error) {
        console.error('Error loading news:', error);
    }
}

// Load Team Members Dynamically
async function loadTeamMembers() {
    try {
        console.log('Fetching team members from:', `${API_URL}/team`);
        const response = await fetch(`${API_URL}/team?t=${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        console.log('Team data received:', data);

        if (data.success && data.team && data.team.length > 0) {
            const teamGrid = document.querySelector('.team-grid');
            if (teamGrid) {
                teamGrid.innerHTML = '';

                data.team.forEach(member => {
                    const memberCard = document.createElement('div');
                    memberCard.className = 'member-card';
                    // Store data in dataset
                    memberCard.dataset.name = member.name;
                    memberCard.dataset.role = member.position;
                    memberCard.dataset.email = member.email || 'N/A';
                    memberCard.dataset.phone = member.phone || 'N/A';
                    memberCard.dataset.bio = member.bio || 'No bio available';
                    memberCard.dataset.achievements = 'Active member,Community leader,Event organizer';

                    // Add click event listener directly
                    memberCard.addEventListener('click', function () {
                        openMemberModal(this);
                    });

                    memberCard.innerHTML = `
                        <div class="member-avatar">
                            ${member.photo ? `<img src="${member.photo}" alt="${member.name}">` : '<i class="fas fa-user-circle"></i>'}
                        </div>
                        <h4 class="member-name">${member.name}</h4>
                        <p class="member-role">${member.position}</p>
                        <p class="member-info">${member.bio ? member.bio.substring(0, 80) + '...' : 'Click for details'}</p>
                    `;
                    teamGrid.appendChild(memberCard);
                });
            }
        }
    } catch (error) {
        console.error('Error loading team members:', error);
    }
}

// Initialize Team Section Event Listeners (for static content)
function initializeTeamEvents() {
    const teamGrid = document.querySelector('.team-grid');
    if (teamGrid) {
        teamGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.member-card');
            if (card) {
                openMemberModal(card);
            }
        });
    }
}

// Load Gallery Images Dynamically
async function loadGallery() {
    try {
        console.log('Fetching gallery from:', `${API_URL}/gallery`);
        const response = await fetch(`${API_URL}/gallery?t=${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        console.log('Gallery data received:', data);

        if (data.success && data.gallery && data.gallery.length > 0) {
            const galleryGrid = document.querySelector('.gallery-grid');
            if (galleryGrid) {
                galleryGrid.innerHTML = '';

                data.gallery.forEach(item => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.setAttribute('data-category', item.category || 'all');

                    galleryItem.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="gallery-overlay">
                            <h4>${item.title}</h4>
                            <p>${item.description || ''}</p>
                            <button class="view-image-btn" aria-label="View image">
                                <i class="fas fa-search-plus"></i>
                            </button>
                        </div>
                    `;
                    galleryGrid.appendChild(galleryItem);
                });
            }
        }
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

// Load FAQs Dynamically
async function loadFAQs() {
    try {
        console.log('Fetching FAQs from:', `${API_URL}/faqs`);
        const response = await fetch(`${API_URL}/faqs?t=${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        console.log('FAQs data received:', data);

        if (data.success && data.faqs && data.faqs.length > 0) {
            const faqContainer = document.querySelector('.faq-container');
            if (faqContainer) {
                faqContainer.innerHTML = '';

                data.faqs.forEach((faq, index) => {
                    const faqItem = document.createElement('div');
                    faqItem.className = 'faq-item';
                    if (index === 0) faqItem.classList.add('active');

                    faqItem.innerHTML = `
                        <div class="faq-question">
                            <h4>${faq.question}</h4>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-answer">
                            <p>${faq.answer}</p>
                        </div>
                    `;
                    faqContainer.appendChild(faqItem);
                });

                // Re-attach FAQ click handlers
                const faqQuestions = document.querySelectorAll('.faq-question');
                faqQuestions.forEach(question => {
                    question.addEventListener('click', () => {
                        const faqItem = question.parentElement;
                        const isActive = faqItem.classList.contains('active');

                        document.querySelectorAll('.faq-item').forEach(item => {
                            item.classList.remove('active');
                        });

                        if (!isActive) {
                            faqItem.classList.add('active');
                        }
                    });
                });
            }
        }
    } catch (error) {
        console.error('Error loading FAQs:', error);
    }
}

// Load Hero Sections Dynamically
// Load Slider Content Dynamically (Hero + Featured)
async function loadSliderContent() {
    try {
        console.log('Fetching slider content from:', `${API_URL}/slider-content`);
        const response = await fetch(`${API_URL}/slider-content?t=${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        console.log('Slider content received:', data);

        if (data.success && data.slides && data.slides.length > 0) {
            const sliderContainer = document.querySelector('.slider-container');
            const dotsContainer = document.querySelector('.slider-dots');

            if (sliderContainer && dotsContainer) {
                sliderContainer.innerHTML = '';
                dotsContainer.innerHTML = '';

                data.slides.forEach((slideItem, index) => {
                    // Create slide
                    const slide = document.createElement('div');
                    slide.className = 'slide';
                    if (index === 0) slide.classList.add('active');
                    // Add type class for specific styling if needed
                    slide.classList.add(`slide-type-${slideItem.type}`);

                    slide.innerHTML = `
                        <div class="slide-content">
                            ${slideItem.type !== 'hero' ? `<span class="slide-badge">${slideItem.type.toUpperCase()}</span>` : ''}
                            <h2>${slideItem.title}</h2>
                            <p>${slideItem.subtitle}</p>
                            <a href="${slideItem.link}" class="cta-btn">${slideItem.cta_text || 'Learn More'}</a>
                        </div>
                    `;

                    if (slideItem.image) {
                        slide.style.backgroundImage = `url(${slideItem.image})`;
                    } else {
                        // Fallback for items without image
                        slide.style.backgroundColor = '#1a472a'; // Primary Color
                    }

                    sliderContainer.appendChild(slide);

                    // Create dot
                    const dot = document.createElement('span');
                    dot.className = 'dot';
                    if (index === 0) dot.classList.add('active');
                    dot.setAttribute('onclick', `currentSlide(${index})`);
                    dotsContainer.appendChild(dot);
                });
            }
        }
    } catch (error) {
        console.error('Error loading slider content:', error);
    }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

    // Disable and clear any existing service workers/caches (prevents stale UI)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => registration.unregister());
        });
    }
    if ('caches' in window) {
        caches.keys().then((names) => {
            names.forEach((name) => caches.delete(name));
        });
    }

    // Load all dynamic content from Django backend
    Promise.all([
        loadSliderContent(),
        loadEvents(),
        loadNews(),
        loadTeamMembers(),
        loadGallery(),
        loadFAQs()
    ]).then(() => {
        // Initialize Gallery Events after content is loaded
        initializeGalleryEvents();
        initializeTeamEvents();
        handleBloodDonation(); // Initialize blood donation form

        // Hide preloader after all content is loaded
        const preloader = document.querySelector('.preloader, #preloader, [class*="loader"], [class*="spinner"]');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
        console.log('All dynamic content loaded successfully');
    }).catch(error => {
        console.error('Error loading dynamic content:', error);
        // Hide preloader even if there's an error
        const preloader = document.querySelector('.preloader, #preloader, [class*="loader"], [class*="spinner"]');
        if (preloader) {
            preloader.style.display = 'none';
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            });
        });
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });

        // Update navbar shadow on scroll
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Slider Functionality
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');
    const dotContainer = document.getElementById('sliderDots');

    function showSlide(index) {
        if (slides.length === 0) return;

        // Ensure index is within bounds
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }

        // Hide all slides and remove active class
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide
        slides[currentSlideIndex].classList.add('active');
        if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
    }

    function changeSlide(direction) {
        showSlide(currentSlideIndex + direction);
    }

    // Event Listeners for Slider
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeSlide(-1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeSlide(1));
    }

    if (dotContainer) {
        dotContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                if (!isNaN(index)) {
                    showSlide(index);
                }
            }
        });
    }

    // Auto slide every 5 seconds
    let autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);

    // Scroll Animation Observer
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, sectionObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                sectionObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, sectionObserverOptions);

    // Observe all sections and other desired elements
    document.querySelectorAll('section, .footer, .hero-slider').forEach(section => {
        section.classList.add('fade-in-section');
        sectionObserver.observe(section);
    });

    // Pause auto slide on hover
    const sliderSection = document.querySelector('.slider-section');
    if (sliderSection) {
        sliderSection.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        sliderSection.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                changeSlide(1);
            }, 5000);
        });
    }

    // Member Details Modal - Setup close handlers
    const memberModal = document.getElementById('memberModal');
    const memberCloseBtn = document.querySelector('.member-close');

    if (memberCloseBtn && memberModal) {
        memberCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            memberModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close member modal when clicking outside
    if (memberModal) {
        memberModal.addEventListener('click', (e) => {
            if (e.target === memberModal) {
                memberModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Subscribe Modal
    const modal = document.getElementById('subscribeModal');
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const closeModal = document.getElementById('subscribeModalClose');

    console.log('Subscribe button:', subscribeBtn);
    console.log('Subscribe modal:', modal);
    console.log('Close modal button:', closeModal);

    if (subscribeBtn && modal) {
        subscribeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Subscribe button clicked!');
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', (e) => {
            console.log('Close button clicked!');
            e.preventDefault();
            e.stopPropagation();
            const subscribeModal = document.getElementById('subscribeModal');
            if (subscribeModal) {
                subscribeModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    } else {
        console.error('Subscribe modal close button not found!');
    }

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        const memberModal = document.getElementById('memberModal');
        if (memberModal && e.target === memberModal) {
            memberModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        const eventModal = document.getElementById('eventRegistrationModal');
        if (eventModal && e.target === eventModal) {
            eventModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Advanced Form Validation Functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[0-9+\-\(\)\s]{10,}$/;
        return phoneRegex.test(phone);
    }

    function showFieldError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        const errorDiv = formGroup.querySelector('.error-message');
        const errorText = formGroup.querySelector('.error-text');

        input.classList.add('invalid');
        input.classList.remove('valid');

        if (errorDiv && errorText) {
            errorText.textContent = message;
            errorDiv.style.display = 'flex';
        }
    }

    function hideFieldError(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        const errorDiv = formGroup.querySelector('.error-message');

        input.classList.remove('invalid');
        if (input.value.trim() !== '' && input.checkValidity()) {
            input.classList.add('valid');
        }

        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }

    function validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        const name = input.name || input.id;

        // Required check
        if (input.hasAttribute('required') && value === '') {
            showFieldError(input, 'This field is required');
            return false;
        }

        // Email validation
        if (type === 'email' && value !== '') {
            if (!validateEmail(value)) {
                showFieldError(input, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (type === 'tel' && value !== '') {
            if (!validatePhone(value)) {
                showFieldError(input, 'Please enter a valid phone number');
                return false;
            }
        }

        // Min length validation
        if (input.hasAttribute('minlength')) {
            const minLength = parseInt(input.getAttribute('minlength'));
            if (value.length < minLength && value.length > 0) {
                showFieldError(input, `Minimum ${minLength} characters required`);
                return false;
            }
        }

        // Select validation
        if (input.tagName === 'SELECT' && input.hasAttribute('required') && value === '') {
            showFieldError(input, 'Please select an option');
            return false;
        }

        hideFieldError(input);
        return true;
    }

    // Real-time validation for all form inputs
    const allFormInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    allFormInputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '' || input.hasAttribute('required')) {
                validateField(input);
            }
        });

        // Clear error on input
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });

    // Character counter for textareas
    const textareasWithCounter = document.querySelectorAll('.form-textarea[maxlength]');
    textareasWithCounter.forEach(textarea => {
        const formGroup = textarea.closest('.form-group');
        const counter = formGroup ? formGroup.querySelector('.char-counter .current') : null;

        if (counter) {
            textarea.addEventListener('input', () => {
                const length = textarea.value.length;
                const maxLength = parseInt(textarea.getAttribute('maxlength'));
                counter.textContent = length;

                const counterDiv = counter.closest('.char-counter');
                if (length > maxLength * 0.9) {
                    counterDiv.classList.add('warning');
                } else {
                    counterDiv.classList.remove('warning');
                }

                if (length >= maxLength) {
                    counterDiv.classList.add('error');
                } else {
                    counterDiv.classList.remove('error');
                }
            });
        }
    });

    // Subscribe Form Submission
    const subscribeFormOld = document.querySelector('.subscribe-form');
    if (subscribeFormOld) {
        subscribeFormOld.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = subscribeFormOld.querySelector('#subscribeEmail');
            const submitBtn = subscribeFormOld.querySelector('.modal-submit-btn');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Subscribe';

            try {
                const email = emailInput.value.trim();

                if (!email) {
                    showToast('Please enter your email address', 'error', 'Error');
                    return;
                }

                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                    submitBtn.disabled = true;
                }

                // Send to backend
                const response = await fetch(`${API_URL}/subscribe`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (data.success) {
                    showToast(data.message, 'success', 'Success!');
                    subscribeFormOld.reset();

                    // Close modal
                    const modal = document.getElementById('subscribeModal');
                    if (modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                } else {
                    showToast(data.message, 'error', 'Error');
                }
            } catch (error) {
                console.error('Subscribe error:', error);
                showToast('Failed to subscribe. Please try again later.', 'error', 'Connection Error');
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Load More Gallery
    const loadMoreGalleryBtn = document.getElementById('loadMoreGallery');
    if (loadMoreGalleryBtn) {
        loadMoreGalleryBtn.addEventListener('click', () => {
            showToast('All photos are currently loaded!', 'info', 'Gallery', 3000);
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');

                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    // Event Registration Modal
    const eventRegistrationModal = document.getElementById('eventRegistrationModal');
    const eventRegisterBtns = document.querySelectorAll('.event-register-btn');
    const eventCloseBtn = document.querySelector('.event-close');
    const eventTitle = document.getElementById('eventTitle');
    const eventRegistrationForm = document.querySelector('.event-registration-form');

    if (eventRegisterBtns.length > 0 && eventRegistrationModal) {
        eventRegisterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const eventName = btn.getAttribute('data-event');
                if (eventTitle) eventTitle.textContent = `Register for: ${eventName}`;
                eventRegistrationModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    }

    if (eventCloseBtn && eventRegistrationModal) {
        eventCloseBtn.addEventListener('click', () => {
            eventRegistrationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (eventRegistrationForm) {
        eventRegistrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = eventRegistrationForm.querySelector('.modal-submit-btn');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Register for Event';

            try {
                // Get form data
                const formData = {
                    name: eventRegistrationForm.querySelector('input[type="text"]').value.trim(),
                    email: eventRegistrationForm.querySelector('input[type="email"]').value.trim(),
                    phone: eventRegistrationForm.querySelector('input[type="tel"]')?.value.trim() || '',
                    eventId: eventTitle ? eventTitle.textContent : 'Unknown Event'
                };

                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
                    submitBtn.disabled = true;
                }

                // Send to backend
                const response = await fetch(`${API_URL}/register-event`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    showToast(data.message, 'success', 'Registered!');
                    eventRegistrationForm.reset();

                    // Close modal
                    if (eventRegistrationModal) {
                        eventRegistrationModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                } else {
                    showToast(data.message, 'error', 'Error');
                }
            } catch (error) {
                console.error('Event registration error:', error);
                showToast('Failed to register. Please try again later.', 'error', 'Connection Error');
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // Library Search Functionality
    const librarySearch = document.getElementById('librarySearch');
    const libraryCards = document.querySelectorAll('.library-card');

    if (librarySearch && libraryCards.length > 0) {
        librarySearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            libraryCards.forEach(card => {
                const title = card.querySelector('h4');
                const description = card.querySelector('p');
                const titleText = title ? title.textContent.toLowerCase() : '';
                const descText = description ? description.textContent.toLowerCase() : '';

                if (titleText.includes(searchTerm) || descText.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;

            try {
                // Get form data
                const formData = {
                    name: contactForm.querySelector('#name').value.trim(),
                    email: contactForm.querySelector('#email').value.trim(),
                    subject: contactForm.querySelector('#subject').value.trim(),
                    message: contactForm.querySelector('#message').value.trim()
                };

                // Disable button
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                // Send to backend
                const response = await fetch(`${API_URL}/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    showToast(data.message, 'success', 'Message Sent!');
                    contactForm.reset();
                } else {
                    showToast(data.message, 'error', 'Error');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                showToast('Failed to send message. Please try again or email us directly.', 'error', 'Connection Error');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll Animation for Elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(el => {
        fadeInObserver.observe(el);
    });

    // Observe event cards
    document.querySelectorAll('.event-card').forEach(el => {
        fadeInObserver.observe(el);
    });

    // Observe news cards
    document.querySelectorAll('.news-card').forEach(el => {
        fadeInObserver.observe(el);
    });

    // Observe member cards, library cards
    document.querySelectorAll('.member-card, .library-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cardObserver.observe(el);
    });

    // Animated Counter Function
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isPlus = target > 999;

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = isPlus ? target + '+' : target + '+';
                clearInterval(timer);
                element.parentElement.classList.remove('counting');
            } else {
                element.textContent = Math.floor(start) + (isPlus ? '+' : '+');
            }
        }, 16);
    }

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-item');

                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                        item.classList.add('counting');

                        const counter = item.querySelector('h4');
                        const text = counter.textContent;
                        const number = parseInt(text.replace(/\D/g, ''));

                        counter.textContent = '0';
                        animateCounter(counter, number, 2000);
                    }, index * 200);
                });

                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const bloodStats = document.querySelector('.blood-stats');
    if (bloodStats) {
        statsObserver.observe(bloodStats);
    }

    // Initialize slider
    showSlide(0);

    // Service worker disabled to prevent stale caching during development

    // Page loader
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
            }, 500);
        });
    }

    // Cookie consent
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');

    if (!localStorage.getItem('cookieConsent') && cookieConsent) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }

    if (cookieAccept && cookieConsent) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.classList.remove('show');
            showToast('Cookie preferences saved!', 'success', 'Preferences Saved');
        });
    }

    if (cookieDecline && cookieConsent) {
        cookieDecline.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieConsent.classList.remove('show');
            showToast('Cookie preferences updated', 'info', 'Preferences Updated');
        });
    }

    // Add loading animation
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Gallery & Lightbox
    let galleryItems = document.querySelectorAll('.gallery-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const currentImageIndex = document.getElementById('currentImageIndex');
    const totalImages = document.getElementById('totalImages');

    let currentIndex = 0;
    let visibleImages = [];

    // Update visible images array
    function updateVisibleImages() {
        galleryItems = document.querySelectorAll('.gallery-item');
        visibleImages = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
        if (totalImages) {
            totalImages.textContent = visibleImages.length;
        }
    }

    // Function to initialize gallery events (called after dynamic load)
    function initializeGalleryEvents() {
        galleryItems = document.querySelectorAll('.gallery-item');
        updateVisibleImages();

        // Gallery filter
        if (filterBtns.length > 0) {
            filterBtns.forEach(btn => {
                // Remove old listeners to prevent duplicates (cloning is a simple way, or just assume init runs once)
                // For simplicity assuming init runs once after load.

                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filter = btn.getAttribute('data-filter');

                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.classList.remove('hide');
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.classList.add('hide');
                            }, 300);
                        }
                    });

                    updateVisibleImages();
                });
            });
        }

        // Open lightbox
        galleryItems.forEach((item, index) => {
            const viewBtn = item.querySelector('.view-image-btn');
            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openLightbox(index);
                });
            }

            item.addEventListener('click', () => {
                openLightbox(index);
            });
        });
    }

    function openLightbox(index) {
        updateVisibleImages();
        currentIndex = visibleImages.indexOf(galleryItems[index]);
        if (currentIndex === -1) currentIndex = 0;

        if (lightbox) {
            showImage(currentIndex);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function showImage(index) {
        if (visibleImages.length === 0) return;

        const item = visibleImages[index];
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay h4');
        const desc = item.querySelector('.gallery-overlay p');

        if (lightboxImage && img) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }

        if (lightboxTitle && title) {
            lightboxTitle.textContent = title.textContent;
        }

        if (lightboxDesc && desc) {
            lightboxDesc.textContent = desc.textContent;
        }

        if (currentImageIndex) {
            currentImageIndex.textContent = index + 1;
        }
    }

    // Close lightbox
    if (lightboxClose && lightbox) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
            showImage(currentIndex);
        });
    }

    // Next image
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % visibleImages.length;
            showImage(currentIndex);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
            showImage(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % visibleImages.length;
            showImage(currentIndex);
        }
    });

    // Initialize visible images
    updateVisibleImages();

    // Social Media Share Functionality
    function shareContent(platform, title, url, description = '') {
        const pageTitle = title || document.title;
        const pageUrl = url || window.location.href;
        const pageDescription = description || document.querySelector('meta[name="description"]')?.content || '';

        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(pageTitle + ' ' + pageUrl)}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(pageDescription + '\n\n' + pageUrl)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(pageUrl).then(() => {
                    showToast('Link copied to clipboard!', 'success', 'Copied!');
                }).catch(() => {
                    showToast('Failed to copy link', 'error', 'Error');
                });
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400,resizable=yes,scrollbars=yes');
        }
    }

    // News card share buttons
    const newsShareButtons = document.querySelectorAll('.news-card .share-btn');
    newsShareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.getAttribute('data-platform');
            const newsCard = btn.closest('.news-card');
            const title = newsCard.getAttribute('data-title');
            const url = newsCard.getAttribute('data-url');
            const description = newsCard.querySelector('p')?.textContent;

            shareContent(platform, title, url, description);
        });
    });

    // Floating share bar buttons
    const floatingShareButtons = document.querySelectorAll('.floating-share-btn');
    floatingShareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.getAttribute('data-platform');
            shareContent(platform);
        });
    });

    // Video Player Functionality
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoModalClose = document.querySelector('.video-modal-close');

    function openVideoModal(videoId, title) {
        if (!videoModal || !videoPlayer) return;

        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        videoPlayer.src = embedUrl;

        if (videoModalTitle) {
            videoModalTitle.textContent = title;
        }

        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        if (!videoModal || !videoPlayer) return;

        videoModal.classList.remove('active');
        videoPlayer.src = '';
        document.body.style.overflow = 'auto';
    }

    // Video thumbnails click handlers
    const videoContainers = document.querySelectorAll('.video-container, .video-card');
    videoContainers.forEach(container => {
        const playBtn = container.querySelector('.play-btn');
        const thumbnail = container.querySelector('.video-thumbnail');

        const clickHandler = () => {
            const videoId = container.getAttribute('data-video-id');
            const title = container.getAttribute('data-title');

            if (videoId && title) {
                openVideoModal(videoId, title);
            }
        };

        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                clickHandler();
            });
        }

        if (thumbnail) {
            thumbnail.addEventListener('click', clickHandler);
        }
    });

    // Close video modal
    if (videoModalClose) {
        videoModalClose.addEventListener('click', closeVideoModal);
    }

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }

    // Keyboard control for video modal
    document.addEventListener('keydown', (e) => {
        if (videoModal && videoModal.classList.contains('active') && e.key === 'Escape') {
            closeVideoModal();
        }
    });

    // Testimonials Carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        // Remove active class from all
        testimonialCards.forEach(card => card.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        // Add active class to current
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        currentTestimonial = index;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    function startTestimonialAutoplay() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function stopTestimonialAutoplay() {
        clearInterval(testimonialInterval);
    }

    // Navigation buttons
    if (carouselNext) {
        carouselNext.addEventListener('click', () => {
            nextTestimonial();
            stopTestimonialAutoplay();
            startTestimonialAutoplay();
        });
    }

    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
            prevTestimonial();
            stopTestimonialAutoplay();
            startTestimonialAutoplay();
        });
    }

    // Indicator dots
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonial(index);
            stopTestimonialAutoplay();
            startTestimonialAutoplay();
        });
    });

    // Start autoplay if testimonials exist
    if (testimonialCards.length > 0) {
        showTestimonial(0);
        startTestimonialAutoplay();

        // Pause on hover
        const testimonialSection = document.querySelector('.testimonials-carousel');
        if (testimonialSection) {
            testimonialSection.addEventListener('mouseenter', stopTestimonialAutoplay);
            testimonialSection.addEventListener('mouseleave', startTestimonialAutoplay);
        }
    }



    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');

        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            if (themeIcon) {
                if (document.body.classList.contains('dark-mode')) {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                    localStorage.setItem('theme', 'light');
                }
            }
        });
    }

    // Blood Donation Modal & Form Logic
    const bloodDonationModal = document.getElementById('bloodDonationModal');
    const bloodDonateBtn = document.querySelector('.donate-blood-btn');
    const bloodCloseBtn = document.querySelector('.blood-close');
    const bloodForm = document.querySelector('.blood-donation-form');

    if (bloodDonateBtn && bloodDonationModal) {
        bloodDonateBtn.addEventListener('click', () => {
            bloodDonationModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if (bloodCloseBtn && bloodDonationModal) {
        bloodCloseBtn.addEventListener('click', () => {
            bloodDonationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (bloodDonationModal) {
        bloodDonationModal.addEventListener('click', (e) => {
            if (e.target === bloodDonationModal) {
                bloodDonationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (bloodForm) {
        bloodForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = bloodForm.querySelector('.blood-btn');
            const originalBtnText = submitBtn.innerHTML;

            try {
                // Collect form data
                const formData = {
                    name: bloodForm.querySelector('input[name="name"]').value.trim(),
                    age: parseInt(bloodForm.querySelector('input[name="age"]').value),
                    email: bloodForm.querySelector('input[name="email"]').value.trim(),
                    phone: bloodForm.querySelector('input[name="phone"]').value.trim(),
                    blood_type: bloodForm.querySelector('select[name="blood_type"]').value,
                    address: bloodForm.querySelector('input[name="address"]').value.trim(),
                    medical_conditions: bloodForm.querySelector('textarea[name="medical_conditions"]').value.trim()
                };

                // Basic validation
                if (!formData.name || !formData.email || !formData.phone || !formData.blood_type || !formData.address) {
                    showToast('Please fill in all required fields.', 'error');
                    return;
                }

                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
                submitBtn.disabled = true;

                // Send to backend
                const response = await fetch(`${API_URL}/donate-blood`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    showToast(data.message || 'Registration successful!', 'success', 'Registered');
                    bloodForm.reset();
                    setTimeout(() => {
                        bloodDonationModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 2000);
                } else {
                    showToast(data.message || 'Registration failed.', 'error', 'Error');
                    if (data.errors) {
                        console.error('Validation errors:', data.errors);
                    }
                }

            } catch (error) {
                console.error('Blood donation error:', error);
                showToast('Failed to connect to server. Please try again.', 'error', 'Network Error');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Handle Blood Donation Form
    function handleBloodDonation() {
        const bloodForm = document.getElementById('bloodDonationForm');
        if (!bloodForm) return;

        bloodForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = bloodForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;

            try {
                // Collect form data - using names from HTML
                const formData = {
                    name: bloodForm.querySelector('input[name="name"]').value.trim(),
                    age: parseInt(bloodForm.querySelector('input[name="age"]').value),
                    email: bloodForm.querySelector('input[name="email"]').value.trim(),
                    phone: bloodForm.querySelector('input[name="phone"]').value.trim(),
                    blood_type: bloodForm.querySelector('select[name="blood_type"]').value,
                    address: bloodForm.querySelector('textarea[name="address"]').value.trim(),
                    medical_conditions: bloodForm.querySelector('textarea[name="medical_conditions"]').value.trim()
                };

                // Basic validation
                if (!formData.name || !formData.email || !formData.phone || !formData.blood_type || !formData.address) {
                    showToast('Please fill in all required fields.', 'error');
                    return;
                }

                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
                submitBtn.disabled = true;

                // Send to backend
                const response = await fetch(`${API_URL}/donate-blood`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    showToast(data.message || 'Registration successful!', 'success', 'Registered');
                    bloodForm.reset();
                } else {
                    showToast(data.message || 'Registration failed.', 'error', 'Error');
                }

            } catch (error) {
                console.error('Blood donation error:', error);
                showToast('Failed to connect to server. Please try again.', 'error', 'Network Error');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

}); // End DOMContentLoaded