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
    // 3. SCROLL ANIMATIONS
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });
    }

    // ========================================
    // 6. LIGHTBOX WITH SWIPE / NEXT-NAVIGATION
    // ========================================
    let lightboxImages = [];
    let currentImageIndex = 0;

    function getLightboxImages() {
        return Array.from(document.querySelectorAll('.grid-item img')).map(function(img) {
            return {
                src: img.src,
                alt: img.alt || 'Paradise Villa Bequia'
            };
        });
    }

    window.openLightbox = function(imageSrc, caption, element) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');

        if (!lightbox || !lightboxImage) return;

        lightboxImages = getLightboxImages();

        if (element && element.querySelector) {
            const clickedImg = element.querySelector('img');
            const allImages = Array.from(document.querySelectorAll('.grid-item img'));
            currentImageIndex = allImages.indexOf(clickedImg);
        } else {
            currentImageIndex = lightboxImages.findIndex(function(img) {
                return img.src === imageSrc;
            });
        }

        if (currentImageIndex === -1 || currentImageIndex === undefined) {
            currentImageIndex = 0;
        }

        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeydown);
    };

    function updateLightboxImage() {
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const lightboxCounter = document.getElementById('lightboxCounter');

        if (!lightboxImages[currentImageIndex]) return;

        lightboxImage.src = lightboxImages[currentImageIndex].src;
        lightboxCaption.textContent = lightboxImages[currentImageIndex].alt;
        if (lightboxCounter) {
            lightboxCounter.textContent = (currentImageIndex + 1) + ' / ' + lightboxImages.length;
        }
    }

    function nextImage() {
        if (lightboxImages.length === 0) return;
        currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
        updateLightboxImage();
    }

    function prevImage() {
        if (lightboxImages.length === 0) return;
        currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightboxImage();
    }

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
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }

    // ========================================
    // 7. INITIALIZE EVERYTHING
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        initParallax();
        initStickyNav();
        initScrollAnimations();
        initBackToTop();
        initSmoothScroll();

        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');
        if (prevBtn) prevBtn.addEventListener('click', function(e) { e.stopPropagation(); prevImage(); });
        if (nextBtn) nextBtn.addEventListener('click', function(e) { e.stopPropagation(); nextImage(); });

        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        }

        const lightboxImage = document.getElementById('lightboxImage');
        if (lightboxImage) {
            lightboxImage.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        if (lightbox) {
            lightbox.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            lightbox.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        nextImage();
                    } else {
                        prevImage();
                    }
                }
            }, { passive: true });
        }
    });

})();

