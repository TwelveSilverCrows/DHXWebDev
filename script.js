document.addEventListener('DOMContentLoaded', () => {
    function getRandomColor() {
        const colors = ['#ff6347', '#ffa500', '#32cd32', '#1e90ff', '#ff69b4'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const confettiBtn = document.querySelector('.btn.primary-btn');
    const confettiContainer = document.getElementById('confetti-container');

    // Safe guards for optional elements
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                menuToggle.innerHTML = '&times;';
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                menuToggle.innerHTML = '&#9776;';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (navLinks && navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '&#9776;';
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    function spawnConfetti(count = 80) {
        if (!confettiContainer) return;
        for (let i = 0; i < count; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';

            // visual properties
            piece.style.background = getRandomColor();
            piece.style.left = (Math.random() * 100) + 'vw';
            piece.style.top = (-10 - Math.random() * 20) + 'vh';
            piece.style.opacity = '1';
            piece.style.animationName = 'confetti-fall';
            piece.style.animationDuration = (2 + Math.random() * 3) + 's';
            piece.style.animationDelay = (Math.random() * 0.5) + 's';
            piece.style.transform = `rotate(${Math.random() * 360}deg)`;

            confettiContainer.appendChild(piece);

            piece.addEventListener('animationend', () => piece.remove());
        }
    }

    if (confettiBtn) {
        confettiBtn.addEventListener('click', (e) => {
            e.preventDefault(); // avoid jumping to #confetti anchor
            spawnConfetti(60);
        });
    }
});
