/* GKES Website Interactivity */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle logic
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const svg = menuToggle.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            } else {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            }
        });
    }

    // Close mobile menu when clicking a link
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const svg = menuToggle.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            });
        });
    }

    // Principal's Message "Read More" Toggle for Mobile
    const readMoreBtn = document.getElementById('readMoreBtn');
    const shortMessage = document.getElementById('principalMessageShort');
    const fullMessage = document.getElementById('principalMessageFull');

    if (readMoreBtn && shortMessage && fullMessage) {
        readMoreBtn.addEventListener('click', () => {
            const isExpanded = !fullMessage.classList.contains('hidden');
            
            if (isExpanded) {
                fullMessage.classList.add('hidden');
                shortMessage.classList.remove('hidden');
                readMoreBtn.innerHTML = `
                    <span>Read Full Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                `;
            } else {
                shortMessage.classList.add('hidden');
                fullMessage.classList.remove('hidden');
                readMoreBtn.innerHTML = `
                    <span>Show Less</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                `;
            }
        });
    }

    // Core Values Carousel with Pagination Dots
    const carousel = document.getElementById('valuesCarousel');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (carousel && dots.length > 0) {
        // Update dots based on scroll position
        const updateDots = () => {
            const scrollLeft = carousel.scrollLeft;
            const cardWidth = carousel.offsetWidth;
            const activeIndex = Math.round(scrollLeft / cardWidth);
            
            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.remove('bg-slate-300');
                    dot.classList.add('bg-gkes-900');
                } else {
                    dot.classList.remove('bg-gkes-900');
                    dot.classList.add('bg-slate-300');
                }
            });
        };

        // Listen for scroll events
        carousel.addEventListener('scroll', updateDots);

        // Click on dots to navigate
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const cardWidth = carousel.offsetWidth;
                carousel.scrollTo({
                    left: cardWidth * index,
                    behavior: 'smooth'
                });
            });
        });
    }

    // Smooth scroll reveal observer (desktop only for performance)
    if (window.innerWidth >= 768) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('section');
        revealElements.forEach(el => observer.observe(el));
    }

    // Handle Active Nav Link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-gkes-900', 'font-bold');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('text-gkes-900', 'font-bold');
            }
        });
    });
});
