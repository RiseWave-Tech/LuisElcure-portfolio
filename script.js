document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode Toggle ---
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme);

    // --- Masonry Layout Initialization ---
    // Initialize Masonry after all images have loaded to prevent layout breaks
    var grid = document.querySelector('.grid');
    if (grid) {
        var msnry = new Masonry(grid, {
            itemSelector: '.grid-item',
            percentPosition: true,
            transitionDuration: '0.2s'
        });

        // Function to trigger layout
        const layoutGrid = () => msnry.layout();

        // 1. Wait for images to load
        if (window.imagesLoaded) {
            imagesLoaded(grid).on('progress', layoutGrid);
            imagesLoaded(grid).on('always', layoutGrid);
        }

        // 2. Wait for videos to load metadata (dimensions)
        document.querySelectorAll('video').forEach(video => {
            video.addEventListener('loadedmetadata', layoutGrid);
            video.addEventListener('canplay', layoutGrid);
        });

        // 3. Force layout after a short timeout as a fallback
        setTimeout(layoutGrid, 500);
        setTimeout(layoutGrid, 2000);
    }

    // --- Parallax Effect ---
    const parrotBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;
        if (parrotBg) {
            parrotBg.style.transform = 'translateY(' + (scrollPosition * 0.5) + 'px)';
        }

        // Navbar Glass Effect on Scroll
        const navbar = document.querySelector('.navbar');
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.boxShadow = 'var(--card-shadow)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }

        // --- Reveal on Scroll (Simple) ---
        const reveals = document.querySelectorAll('.glass-card, .section-padding h2');
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active'); // Add CSS class for fade-in if needed
            }
        }
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Simple Tilt Effect on Tech Stack (optional enhancement) ---
    const stackItems = document.querySelectorAll('.stack-item');
    stackItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            item.style.setProperty('--x', `${x}px`);
            item.style.setProperty('--y', `${y}px`);
        });
    });

});
