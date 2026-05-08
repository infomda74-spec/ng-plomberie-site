// NG Plomberie - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(45, 80, 22, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(45, 80, 22, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<span class="loading"></span> Envoi...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    showMessage('success', 'Merci pour votre demande ! Nous vous contacterons sous 24h.');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }

    // Form validation function
    function validateForm(data) {
        let isValid = true;
        
        // Reset previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const errorMsg = group.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.style.display = 'none';
            }
        });
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            showFieldError('name', 'Veuillez entrer un nom valide');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            showFieldError('email', 'Veuillez entrer un email valide');
            isValid = false;
        }
        
        // Phone validation (optional but if provided, should be valid)
        if (data.phone && !/^[\d\s\+\-\(\)]{10,}$/.test(data.phone)) {
            showFieldError('phone', 'Veuillez entrer un numéro de téléphone valide');
            isValid = false;
        }
        
        // Service validation
        if (!data.service) {
            showFieldError('service', 'Veuillez sélectionner un service');
            isValid = false;
        }
        
        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            showFieldError('message', 'Veuillez entrer un message d\'au moins 10 caractères');
            isValid = false;
        }
        
        return isValid;
    }

    // Show field error
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        
        let errorMsg = formGroup.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    }

    // Show message function
    function showMessage(type, text) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        message.style.display = 'block';
        
        // Insert at top of contact form
        const contactForm = document.getElementById('contactForm');
        contactForm.parentNode.insertBefore(message, contactForm);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            message.style.display = 'none';
            setTimeout(() => message.remove(), 300);
        }, 5000);
    }

    // Service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                animateCounter(target, numericValue, isPercentage);
                counterObserver.unobserve(target);
            }
        });
    }, counterOptions);

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Counter animation function
    function animateCounter(element, target, isPercentage) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
        }, 30);
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 10) {
                value = value.substring(0, 10);
            }
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.substring(0, 2) + ' ' + value.substring(2);
                } else {
                    value = value.substring(0, 2) + ' ' + value.substring(2, 6) + ' ' + value.substring(6);
                }
            }
            
            e.target.value = value;
        });
    }

    // Initialize Google Map
    function initMap() {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            // Default location (Paris)
            const location = { lat: 48.8566, lng: 2.3522 };
            
            const map = new google.maps.Map(mapElement, {
                zoom: 15,
                center: location,
                styles: [
                    {
                        featureType: "all",
                        elementType: "geometry.fill",
                        stylers: [{ weight: "2.00" }]
                    },
                    {
                        featureType: "all",
                        elementType: "geometry.stroke",
                        stylers: [{ color: "#9c9c9c" }]
                    },
                    {
                        featureType: "all",
                        elementType: "labels.text",
                        stylers: [{ visibility: "on" }]
                    }
                ]
            });
            
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: "NG Plomberie",
                icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="18" fill="#2d5016"/>
                            <path d="M20 10 L20 25 M15 20 L25 20" stroke="white" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(40, 40)
                }
            });
        }
    }

    // Initialize map when Google Maps API is loaded
    if (typeof google !== 'undefined') {
        initMap();
    }

    // Add scroll reveal animation to elements
    const revealElements = document.querySelectorAll('.service-card, .about-content > *, .contact-content > *');
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Reveal elements on scroll
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // Sticky CTA functionality
    const stickyCta = document.querySelector('.sticky-cta');
    if (stickyCta) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                stickyCta.style.opacity = '1';
                stickyCta.style.transform = 'translateY(0)';
            } else {
                stickyCta.style.opacity = '0.8';
                stickyCta.style.transform = 'translateY(100px)';
            }
        });
        
        // Initial state
        stickyCta.style.opacity = '0.8';
        stickyCta.style.transform = 'translateY(100px)';
        stickyCta.style.transition = 'all 0.3s ease';
    }

    // Emergency contact button
    const emergencyButtons = document.querySelectorAll('a[href^="tel:"]');
    emergencyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Urgence')) {
                if (!confirm('Êtes-vous sûr de vouloir appeler le numéro d\'urgence ?')) {
                    e.preventDefault();
                }
            }
        });
    });

    // Live chat simulation (placeholder)
    function initLiveChat() {
        const chatButton = document.createElement('button');
        chatButton.className = 'chat-button';
        chatButton.innerHTML = '<i class="fas fa-comments"></i>';
        chatButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--accent-color);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: var(--shadow-hover);
            z-index: 999;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        `;
        
        chatButton.addEventListener('click', function() {
            alert('Chat en direct bientôt disponible !');
        });
        
        document.body.appendChild(chatButton);
    }

    // Initialize live chat
    initLiveChat();

    // Print functionality
    window.addEventListener('beforeprint', function() {
        document.querySelectorAll('.navbar').forEach(nav => {
            nav.style.display = 'none';
        });
        document.querySelectorAll('.chat-button').forEach(chat => {
            chat.style.display = 'none';
        });
    });

    window.addEventListener('afterprint', function() {
        document.querySelectorAll('.navbar').forEach(nav => {
            nav.style.display = 'block';
        });
        document.querySelectorAll('.chat-button').forEach(chat => {
            chat.style.display = 'flex';
        });
    });

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Accessibility: Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Utility functions
function debounce(func, wait) {
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

// Mobile detection
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Check if device supports touch
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Add classes to body for responsive behavior
if (isMobile()) {
    document.body.classList.add('mobile-device');
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Google Maps Initialization
function initMap() {
    // Location for NG Plomberie (123 Avenue de la Plomberie, 75000 Paris, France)
    const location = { lat: 48.8566, lng: 2.3522 };
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ]
    });
    
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "NG Plomberie",
        icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#2d5016" stroke="white" stroke-width="2"/>
                    <path d="M20 12 L20 24 M16 20 L24 20" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 40)
        }
    });
    
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 10px 0; color: #2d5016;">NG Plomberie</h3>
                <p style="margin: 0 0 5px 0;">123 Avenue de la Plomberie</p>
                <p style="margin: 0 0 5px 0;">75000 Paris, France</p>
                <p style="margin: 0 0 5px 0;"><strong>Tél:</strong> 01 23 45 67 89</p>
                <p style="margin: 0;"><strong>Urgences:</strong> 06 12 34 56 78</p>
            </div>
        `
    });
    
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
    
    // Open info window on load
    infoWindow.open(map, marker);
}

// Gallery Lightbox
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay h3').textContent;
            const location = this.querySelector('.gallery-overlay p').textContent;
            
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${title}" style="max-width: 90vw; max-height: 90vh;">
                    <div class="lightbox-info">
                        <h3>${title}</h3>
                        <p>${location}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
});

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox.active {
        opacity: 1;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        z-index: 10001;
    }
    
    .lightbox-info {
        color: white;
        text-align: center;
        padding: 20px;
        background: rgba(0, 0, 0, 0.7);
        margin-top: 10px;
    }
    
    .lightbox-info h3 {
        margin-bottom: 10px;
        color: #7cb342;
    }
`;
document.head.appendChild(lightboxStyles);