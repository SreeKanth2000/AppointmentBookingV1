document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeAOS();
    initializeNavbar();
    initializeTestimonials();
    initializeCounters();
});

// Initialize Particles.js
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
}

// Enhanced Navbar Scroll Effect
function initializeNavbar() {
    const navbar = document.querySelector('.navbar-glass');
    const navbarHeight = navbar.offsetHeight;
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > navbarHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Parallax effect for hero section
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
}

// Initialize Testimonials Slider
function initializeTestimonials() {
    const testimonials = [
        {
            name: "John Doe",
            role: "CEO, TechCorp",
            image: "assets/images/testimonial1.jpg",
            text: "BookPro has transformed how we handle appointments. The AI-powered scheduling is a game-changer!"
        },
        // Add more testimonials
    ];

    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        renderTestimonials(testimonials, slider);
        initializeSlider(slider);
    }
}

function renderTestimonials(testimonials, container) {
    const testimonialHTML = testimonials.map(testimonial => `
        <div class="testimonial-card" data-aos="fade-up">
            <div class="testimonial-content">
                <div class="testimonial-image">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                </div>
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = testimonialHTML;
}

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            const time = value / speed;

            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value;
            }
        }
        animate();
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Video Modal Implementation
function initializeVideoModal() {
    const demoButton = document.querySelector('a[href="#demo"]');
    const modalHTML = `
        <div class="modal fade" id="videoModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        <div class="ratio ratio-16x9">
                            <iframe src="about:blank" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));

    demoButton.addEventListener('click', (e) => {
        e.preventDefault();
        videoModal.show();
        document.querySelector('#videoModal iframe').src = 'YOUR_VIDEO_URL';
    });

    document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => {
        document.querySelector('#videoModal iframe').src = 'about:blank';
    });
}

// Enhanced Scroll Effects
function initializeScrollEffects() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                initializeSectionAnimations(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function initializeSectionAnimations(section) {
    const elements = section.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, index * 200);
    });
}

// Feature Card Hover Effects
function initializeFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Pricing Toggle
function initializePricingToggle() {
    const toggleButton = document.querySelector('.pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');

    if (toggleButton) {
        toggleButton.addEventListener('change', () => {
            monthlyPrices.forEach(price => price.classList.toggle('active'));
            yearlyPrices.forEach(price => price.classList.toggle('active'));
        });
    }
}

// Contact Form Validation
function initializeContactForm() {
    const form = document.querySelector('#contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showToast('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            showToast('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
    });
}

// Custom Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} show`;
    toast.innerHTML = `
        <div class="toast-header">
            <i class="bi ${getToastIcon(type)} me-2"></i>
            <strong class="me-auto">${capitalizeFirstLetter(type)}</strong>
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
        <div class="toast-body">${message}</div>
    `;
    
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        success: 'bi-check-circle-fill',
        error: 'bi-exclamation-circle-fill',
        info: 'bi-info-circle-fill',
        warning: 'bi-exclamation-triangle-fill'
    };
    return icons[type] || icons.info;
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
    return container;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeAOS();
    initializeNavbar();
    initializeTestimonials();
    initializeCounters();
    initializeVideoModal();
    initializeScrollEffects();
    initializeFeatureCards();
    initializePricingToggle();
    initializeContactForm();
});

// Handle loading and page transitions
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    document.querySelector('.loading-screen')?.classList.add('fade-out');
});