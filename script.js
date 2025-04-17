// === ПАРАЛЛАКС, СЧЁТЧИКИ, ВИБРАЦИЯ, АНИМАЦИИ И СКРОЛЛ ===

// Инициализирует обратный отсчёт на 48 часов function startCountdown(id) { const element = document.getElementById(id); if (!element) return; const key = llc_deadline_${id}; let deadline = localStorage.getItem(key); if (!deadline) { deadline = Date.now() + 48 * 3600 * 1000; localStorage.setItem(key, deadline); } function update() { const now = Date.now(); const diff = deadline - now; if (diff <= 0) { element.textContent = '00:00:00'; return; } const h = String(Math.floor(diff / 3600000)).padStart(2, '0'); const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'); const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'); element.textContent = ${h}:${m}:${s}; } update(); setInterval(update, 1000); }

// По загрузке страницы document.addEventListener('DOMContentLoaded', () => { // Запускаем оба таймера startCountdown('countdown'); startCountdown('countdown-box');

// Плавный скролл якорей (CSS scroll-behavior уже задан) document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => { link.addEventListener('click', e => { e.preventDefault(); const target = document.querySelector(link.getAttribute('href')); if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }); });

// Вибрация WhatsApp и параллакс фона const whatsapp = document.querySelector('.whatsapp-button'); let ticking = false; window.addEventListener('scroll', () => { // Параллакс-лифт фона document.body.style.backgroundPositionY = ${-window.scrollY * 0.2}px;

// Вибрация кнопки
if (!ticking) {
  ticking = true;
  whatsapp.classList.add('shake');
  setTimeout(() => {
    whatsapp.classList.remove('shake');
    ticking = false;
  }, 600);
}

// Подсветка активного меню
const sections = document.querySelectorAll('section[id]');
let current = '';
sections.forEach(sec => {
  const top = sec.offsetTop - 100;
  if (window.pageYOffset >= top) current = sec.id;
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
});

});

// Fade-in для секций const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('fade-in-visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.2 }); document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Горизонтальный скролл галереи колесом const gallery = document.querySelector('.gallery'); if (gallery) { gallery.addEventListener('wheel', e => { e.preventDefault(); gallery.scrollLeft += e.deltaY; }); } });

