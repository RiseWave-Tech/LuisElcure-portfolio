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
            // Efecto parallax más notorio con traslación más rápida y un sutil efecto de zoom
            parrotBg.style.transform = `translateY(${scrollPosition * 0.65}px) scale(${1 + scrollPosition * 0.0004})`;
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
                reveals[i].classList.add('active'); // Muestra el elemento al scrollear hacia abajo
            } else {
                reveals[i].classList.remove('active'); // Oculta el elemento al scrollear hacia arriba
            }
        }
    });

    // Disparar evento scroll al cargar para que los elementos visibles iniciales apliquen el efecto reveal
    window.dispatchEvent(new Event('scroll'));

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (!targetId || !targetId.startsWith('#') || targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
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
    // --- Project Modal Logic ---
    const modalElement = document.getElementById('projectModal');
    if (modalElement && typeof bootstrap !== 'undefined') {
        const projectModal = new bootstrap.Modal(modalElement);
        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');
        const modalDescription = document.getElementById('modalDescription');
        const modalImage = document.getElementById('modalImage');
        const modalVideo = document.getElementById('modalVideo');
        const modalLink = document.getElementById('modalLink');

        document.querySelectorAll('.project-card').forEach(card => {
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', () => {
                const title = card.querySelector('h4') ? card.querySelector('h4').innerText : 'Proyecto';
                const category = card.querySelector('.badge') ? card.querySelector('.badge').innerText : '';
                const desc = card.querySelector('p') ? card.querySelector('p').innerText : '';
                const img = card.querySelector('img');
                const videoSource = card.querySelector('video source');
                const link = card.getAttribute('data-link');

                modalTitle.innerText = title;
                modalCategory.innerText = category;
                modalDescription.innerText = desc;

                if (img) {
                    modalImage.src = img.src;
                    modalImage.classList.remove('d-none');
                    modalVideo.classList.add('d-none');
                    modalVideo.pause();
                } else if (videoSource) {
                    modalVideo.querySelector('source').src = videoSource.src;
                    modalVideo.load();
                    modalVideo.classList.remove('d-none');
                    modalImage.classList.add('d-none');
                    modalVideo.play();
                }

                if (link) {
                    modalLink.href = link;
                    modalLink.classList.remove('d-none');
                } else {
                    modalLink.classList.add('d-none');
                }

                projectModal.show();
            });
        });

        // Pause video when modal is closed
        modalElement.addEventListener('hidden.bs.modal', () => {
            modalVideo.pause();
        });
    }

});
