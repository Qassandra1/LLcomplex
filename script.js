// === script.js ===
document.addEventListener('DOMContentLoaded', () => {
  // 1. Countdown timers
  function startCountdown(id, hours) {
    const el = document.getElementById(id);
    if (!el) return;
    const now = Date.now();
    const storageKey = 'deadline_' + id;
    let deadline = parseInt(localStorage.getItem(storageKey), 10);
    if (isNaN(deadline) || deadline < now) {
      deadline = now + hours * 3600 * 1000;
      localStorage.setItem(storageKey, deadline);
    }
    const update = () => {
      const diff = deadline - Date.now();
      if (diff <= 0) {
        el.textContent = '00:00:00';
        return;
      }
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      el.textContent = `${h}:${m}:${s}`;
    };
    update();
    setInterval(update, 1000);
  }
  startCountdown('countdown', 48);
  startCountdown('countdown-box', 48);

  // 2. Fade‑in on scroll
  const welcome = document.querySelector('#welcome.fade-in');
  if (welcome) welcome.classList.add('visible');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.fade-in').forEach(el => {
    if (el !== welcome) observer.observe(el);
  });

  // 3. WhatsApp button vibration on scroll
  const waBtn = document.querySelector('.whatsapp-button');
  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (waBtn && !isTicking) {
      isTicking = true;
      waBtn.classList.add('shake');
      setTimeout(() => {
        waBtn.classList.remove('shake');
        isTicking = false;
      }, 800);
    }
  });

  // 4. Drag-to-scroll for galleries
  document.querySelectorAll('.gallery').forEach(gallery => {
    let isDown = false, startX, scrollLeft;
    gallery.addEventListener('mousedown', e => {
      isDown = true;
      gallery.classList.add('active');
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });
    ['mouseup', 'mouseleave'].forEach(evt =>
      gallery.addEventListener(evt, () => {
        isDown = false;
        gallery.classList.remove('active');
      })
    );
    gallery.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;
      gallery.scrollLeft = scrollLeft - walk;
    });
  });

  // 5. Smooth scroll & active menu highlight
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    let currentId = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 120) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  });
});
