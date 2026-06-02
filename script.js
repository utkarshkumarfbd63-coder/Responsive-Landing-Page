/**
 * ORBITRON GAMING - Main Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loading Screen ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000); // Fake load time for effect

    // --- 2. Mobile Navbar Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- 3. Navbar Scroll Effect & Active State ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        // Navbar blur on scroll
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }

        // Active link highlighting
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Back to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 4. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                // Check if element has a delay attribute
                const delay = el.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        el.classList.add('active');
                    }, delay);
                } else {
                    el.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // --- 5. Countdown Timer ---
    const countdown = () => {
        const countDate = new Date('June 15, 2026 00:00:00').getTime();
        const now = new Date().getTime();
        const gap = countDate - now;

        if (gap > 0) {
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const d = Math.floor(gap / day);
            const h = Math.floor((gap % day) / hour);
            const m = Math.floor((gap % hour) / minute);
            const s = Math.floor((gap % minute) / second);

            document.getElementById('cd-days').innerText = d < 10 ? '0' + d : d;
            document.getElementById('cd-hours').innerText = h < 10 ? '0' + h : h;
            document.getElementById('cd-mins').innerText = m < 10 ? '0' + m : m;
            document.getElementById('cd-secs').innerText = s < 10 ? '0' + s : s;
        }
    };
    setInterval(countdown, 1000);

    // --- 6. Number Counter Animation ---
    const counters = document.querySelectorAll('.stat-number');
    let started = false;

    const startCounters = () => {
        if (started) return;
        const statsSection = document.getElementById('stats');
        const statsTop = statsSection.getBoundingClientRect().top;

        if (statsTop < window.innerHeight) {
            started = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const prefix = counter.getAttribute('data-prefix') || '';
                const increment = target / 100; // Adjust speed

                const updateCounter = () => {
                    const c = +counter.innerText.replace(/[^0-9]/g, '');
                    if (c < target) {
                        counter.innerText = prefix + Math.ceil(c + increment).toLocaleString();
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.innerText = prefix + target.toLocaleString();
                    }
                };
                updateCounter();
            });
            
            // Trigger progress bars
            const bars = document.querySelectorAll('.stat-fill');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    };
    window.addEventListener('scroll', startCounters);

    // --- 7. Contact Form Handling ---
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Button loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Processing...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.style.pointerEvents = 'none';

        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.pointerEvents = 'auto';
            successMsg.style.display = 'block';
            form.reset();
            
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        }, 1500);
    });

    // --- 8. Particle Canvas Background ---
    initParticles();
});

// Particle System Logic
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * -1 - 0.5; // Upward drift
            this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.5)' : 'rgba(189, 0, 255, 0.5)';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around
            if (this.y < 0) this.y = height;
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
    }
    
    function init() {
        particles = [];
        const particleCount = window.innerWidth < 768 ? 40 : 100; // Less particles on mobile
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}
