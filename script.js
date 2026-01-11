document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor (Only on Desktop) ---
    if (window.innerWidth > 768) {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        const triggers = document.querySelectorAll('.hover-trigger');

        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                setTimeout(() => {
                    follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                }, 50);
            });
        });

        triggers.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('nav-active');
        
        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        });
    });

    // --- 3. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. Horizontal Scroll (DESKTOP ONLY) ---
    // We disable the JS scroll logic on mobile to let CSS Native Scroll take over
    if (window.innerWidth > 768) {
        const hContainer = document.querySelector('.h-scroll-container');
        const hTrack = document.querySelector('.horizontal-track');

        window.addEventListener('scroll', () => {
            const offsetTop = hContainer.offsetTop;
            const scrollY = window.scrollY;
            const containerHeight = hContainer.offsetHeight;
            const windowHeight = window.innerHeight;

            if (scrollY >= offsetTop && scrollY <= offsetTop + containerHeight - windowHeight) {
                const percentage = (scrollY - offsetTop) / (containerHeight - windowHeight);
                const scrollWidth = hTrack.scrollWidth - window.innerWidth;
                const xMove = percentage * scrollWidth;
                hTrack.style.transform = `translateX(-${xMove}px)`;
            }
        });
    }
});

// Add Keyframe for mobile menu fade in js
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes navLinkFade {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
}
`;
document.head.appendChild(styleSheet);