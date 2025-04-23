// script.js

if (window.innerWidth > 1024) {
  document.addEventListener('DOMContentLoaded', () => {

    // === 1) Fade-in для всех секций с классом .fade-in ===
    const faders = document.querySelectorAll('.fade-in');
    const appearOpts = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
    const appearOnScroll = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, appearOpts);
    faders.forEach(el => appearOnScroll.observe(el));

    // === 2) Smooth scroll и подсветка меню ===
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id], footer#docs');
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const tgt = document.querySelector(link.getAttribute('href'));
        if (tgt) tgt.scrollIntoView({ behavior: 'smooth' });
      });
    });
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.pageYOffset >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${current}`
        );
      });
    });

    // === 3) Drag-scroll галереи до/после ===
    document.querySelectorAll('.gallery').forEach(gallery => {
      let isDown = false, startX, scrollLeft;
      gallery.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
      });
      ['mouseup', 'mouseleave'].forEach(evt =>
        gallery.addEventListener(evt, () => (isDown = false))
      );
      gallery.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gallery.offsetLeft;
        gallery.scrollLeft = scrollLeft - (x - startX) * 1.5;
      });
    });

    // === 4) Вибрация WhatsApp при скролле ===
    const wa = document.querySelector('.whatsapp-button');
    let canShake = true;
    window.addEventListener('scroll', () => {
      if (!wa || !canShake) return;
      canShake = false;
      wa.classList.add('shake');
      setTimeout(() => {
        wa.classList.remove('shake');
        canShake = true;
      }, 500);
    });

    // === 5) Countdown, который точно отсчитывает и всегда мигает ===
    function startCountdown(id, hours) {
      const el = document.getElementById(id);
      if (!el) return;
      const endTime = Date.now() + hours * 3600 * 1000;
      // Добавляем класс, чтобы он всегда мигал
      el.classList.add('blink');
      // Функция обновления текста
      const update = () => {
        const diff = endTime - Date.now();
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

  });
}
