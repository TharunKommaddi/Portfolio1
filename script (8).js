// ====================================
// THARUN KOMMADDI PORTFOLIO JS
// ====================================

// ============ DOM ELEMENTS ============
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ============ NAVBAR SCROLL EFFECT ============
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============ MOBILE MENU TOGGLE ============
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============ SMOOTH SCROLLING ============
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============ ACTIVE LINK HIGHLIGHT ============
const sections = document.querySelectorAll('section');

function highlightNav() {
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ============ DARK MODE TOGGLE ============
// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save theme preference
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.work-card, .achievement-item, .education-item, .timeline-item');
animateElements.forEach(el => observer.observe(el));

// ============ FORM SUBMISSION ============
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Here you would normally send the data to a server
    // For now, we'll just log it and show a message
    console.log('Form Data:', data);
    
    // Create mailto link as fallback
    const mailtoLink = `mailto:tharunkommaddi@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Thank you! Your message has been sent.', 'success');
    
    // Reset form
    contactForm.reset();
});

// ============ NOTIFICATION SYSTEM ============
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-family: var(--font-body);
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============ SCROLL PROGRESS INDICATOR ============
function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            z-index: 10001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress);

// ============ TYPING EFFECT FOR HERO SUBTITLE ============
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 80);
    }
});

// ============ LAZY LOADING IMAGES ============
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ============ CURSOR ANIMATION (Desktop Only) ============
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, .btn');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ============ SCROLL TO TOP ============
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: var(--shadow);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

// ============ PERFORMANCE OPTIMIZATION ============
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    highlightNav();
    updateScrollProgress();
}, 10));

// ============ CONSOLE MESSAGE ============
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #0066cc; font-size: 16px; font-weight: bold;');
console.log('%cIf you have any questions or want to collaborate, feel free to reach out!', 'color: #00a8e8; font-size: 14px;');
console.log('%c📧 tharunkommaddi@gmail.com', 'color: #666; font-size: 14px;');

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial scroll event
    highlightNav();
    updateScrollProgress();
    
    // Hide scroll indicator after 3 seconds
    setTimeout(() => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        }
    }, 3000);
});
