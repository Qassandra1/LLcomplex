// LL-Complex Landing Page Script

document.addEventListener('DOMContentLoaded', () => {
  
  // === 1) Mobile Menu Toggle ===
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  // === 2) Smooth Scroll & Active Nav Highlight ===
  const navLinksAll = document.querySelectorAll('.nav-links a, .footer-col a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  
  navLinksAll.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Highlight active section in nav
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };
  
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => navObserver.observe(section));

  // === 3) Fade-in Animation on Scroll ===
  const fadeElements = document.querySelectorAll('.section, .gallery-item, .review-card, .step-card, .guarantee-card, .order-card');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });

  // === 4) FAQ Accordion ===
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // === 5) Countdown Timer ===
  function startCountdown(elementId, hours) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Get or set end time in localStorage
    const storageKey = `countdown_${elementId}`;
    let endTime = localStorage.getItem(storageKey);
    
    if (!endTime || parseInt(endTime) < Date.now()) {
      endTime = Date.now() + hours * 3600 * 1000;
      localStorage.setItem(storageKey, endTime);
    }
    
    function update() {
      const now = Date.now();
      const diff = parseInt(endTime) - now;
      
      if (diff <= 0) {
        // Reset timer
        endTime = Date.now() + hours * 3600 * 1000;
        localStorage.setItem(storageKey, endTime);
      }
      
      const totalSeconds = Math.floor(diff / 1000);
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      
      element.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    
    update();
    setInterval(update, 1000);
  }
  
  startCountdown('countdown', 48);

  // === 6) Navbar Background on Scroll ===
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(10, 10, 10, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.9)';
      navbar.style.boxShadow = 'none';
    }
  });

  // === 7) Gallery Drag Scroll (for touch devices) ===
  const galleries = document.querySelectorAll('.gallery');
  
  galleries.forEach(gallery => {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    gallery.addEventListener('mousedown', (e) => {
      isDown = true;
      gallery.style.cursor = 'grabbing';
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });
    
    gallery.addEventListener('mouseleave', () => {
      isDown = false;
      gallery.style.cursor = 'grab';
    });
    
    gallery.addEventListener('mouseup', () => {
      isDown = false;
      gallery.style.cursor = 'grab';
    });
    
    gallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 2;
      gallery.scrollLeft = scrollLeft - walk;
    });
  });

  // === 8) WhatsApp Button Animation ===
  const whatsappBtn = document.querySelector('.whatsapp-button');
  
  if (whatsappBtn) {
    // Periodic attention animation
    setInterval(() => {
      whatsappBtn.querySelector('img').style.animation = 'shake 0.5s ease';
      setTimeout(() => {
        whatsappBtn.querySelector('img').style.animation = '';
      }, 500);
    }, 10000);
  }

  // === 9) Track CTA Clicks (for analytics) ===
  const ctaButtons = document.querySelectorAll('.btn, .btn-order');
  
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const buttonText = btn.textContent.trim();
      const section = btn.closest('section')?.id || 'unknown';
      
      // Log for analytics (can be replaced with actual analytics code)
      console.log(`CTA Click: "${buttonText}" in section "${section}"`);
      
      // You can add Google Analytics or other tracking here
      // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': buttonText });
    });
  });

  // === 10) Lazy Load Images ===
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });
  
  images.forEach(img => imageObserver.observe(img));

  // === 11) Form Validation (if form is added later) ===
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Пожалуйста, заполните все обязательные поля');
      }
    });
  });

  // === 12) Preloader (optional) ===
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

});

// === Utility Functions ===

// Debounce function for scroll events
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

// Throttle function for frequent events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
