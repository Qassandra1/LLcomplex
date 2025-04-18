// === Инициализация всех эффектов после загрузки страницы ===
document.addEventListener('DOMContentLoaded', () => {
  // 1) Обратный отсчёт (2 таймера по 48 часов)
  function startCountdown(id, hours) {
    const el = document.getElementById(id);
    // вычисляем дедлайн: либо из localStorage, либо сейчас + hours
    const now = Date.now();
    let deadline = parseInt(localStorage.getItem(id), 10);
    if (isNaN(deadline) || deadline < now) {
      deadline = now + hours * 3600_000;
      localStorage.setItem(id, deadline);
    }
    const update = () => {
      const diff = deadline - Date.now();
      if (diff <= 0) {
        el.textContent = '00:00:00';
      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        el.textContent = 
          String(h).padStart(2, '0') + ':' +
          String(m).padStart(2, '0') + ':' +
          String(s).padStart(2, '0');
      }
    };
    update();
    setInterval(update, 1000);
  }
  startCountdown('countdown', 48);
  startCountdown('countdown-box', 48);

  // 2) Появление блоков с классом .fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // 3) Вибрация WhatsApp‑кнопки при скролле
  const wa = document.querySelector('.whatsapp-button');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking && wa) {
      ticking = true;
      wa.classList.add('shake');
      setTimeout(() => {
        wa.classList.remove('shake');
        ticking = false;
      }, 800);
    }
  });

  // 4) Drag‑scroll для галереи «До и После»
  document.querySelectorAll('.gallery').forEach(gallery => {
    let isDown = false, startX, scrollLeft;
    gallery.addEventListener('mousedown', e => {
      isDown = true;
      gallery.classList.add('active');
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });
    ['mouseleave','mouseup'].forEach(evt => {
      gallery.addEventListener(evt, () => {
        isDown = false;
        gallery.classList.remove('active');
      });
    });
    gallery.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 1.5;
      gallery.scrollLeft = scrollLeft - walk;
    });
  });

  // 5) Подсвечивание активного пункта меню при скролле
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) link.classList.add('active');
      }
    });
  });
});
