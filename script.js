(function() {
    'use strict';

    // ========================================
    // 1. PARALLAX EFFECT
    // ========================================
    function initParallax() {
        const heroImage = document.getElementById('heroImage');
        if (!heroImage) return;

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollPosition = window.pageYOffset;
                    heroImage.style.transform = 'translateY(' + (scrollPosition * 0.5) + 'px)';
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ========================================
    // 2. STICKY NAVIGATION
    // ========================================
    function initStickyNav() {
        const nav = document.getElementById('stickyNav');
        if (!nav) return;

        const hero = document.getElementById('hero');
        let heroHeight = hero ? hero.offsetHeight : 600;

        // Recalculate on resize
        window.addEventListener('resize', function() {
            if (hero) heroHeight = hero.offsetHeight;
        });

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollY = window.pageYOffset;
                    if (scrollY > heroHeight * 0.6) {
                        nav.classList.add('scrolled');
                    } else {
                        nav.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ========================================
    // 3. SCROLL ANIMATIONS (Intersection Observer)
    // ========================================
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.section');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            });

            sections.forEach(function(section) {
                observer.observe(section);
            });
        } else {
            // Fallback for older browsers
            sections.forEach(function(section) {
                section.classList.add('visible');
            });
        }
    }

    // ========================================
    // 4. BACK TO TOP BUTTON
    // ========================================
    function initBackToTop() {
        const button = document.getElementById('backToTop');
        if (!button) return;

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollY = window.pageYOffset;
                    if (scrollY > 600) {
                        button.classList.add('visible');
                    } else {
                        button.classList.remove('visible');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });

        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // 5. SMOOTH SCROLL FOR CTA BUTTONS
    // ========================================
    function initSmoothScroll() {
        const ctaButtons = document.querySelectorAll('a[href^="#"]');
        const nav = document.getElementById('stickyNav');
        const navHeight = nav ? nav.offsetHeight : 70;

        ctaButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========================================
    // 6. LIGHTBOX FUNCTIONS
    // ========================================
    window.openLightbox = function(imageSrc, caption) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');

        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption || '';

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeydown);
    };

    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeydown);
    };

    function handleKeydown(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    }

    // Prevent closing when clicking on the image itself
    document.addEventListener('DOMContentLoaded', function() {
        const lightboxImage = document.getElementById('lightboxImage');
        if (lightboxImage) {
            lightboxImage.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });

    // ========================================
    // 7. INITIALIZE EVERYTHING
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        initParallax();
        initStickyNav();
        initScrollAnimations();
        initBackToTop();
        initSmoothScroll();
    });

})();