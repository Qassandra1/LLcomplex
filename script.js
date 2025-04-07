// === 1. СЧЁТЧИКИ 48 ЧАСОВ ===
function startCountdown(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const storedTime = localStorage.getItem(id + '_end');
  const end = storedTime ? new Date(storedTime) : new Date(Date.now() + 48 * 60 * 60 * 1000);

  localStorage.setItem(id + '_end', end.toISOString());

  function updateCountdown() {
    const now = new Date();
    const distance = end - now;

    if (distance <= 0) {
      localStorage.removeItem(id + '_end');
      return startCountdown(id);
    }

    const hours = String(Math.floor(distance / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

    el.innerText = `${hours}:${minutes}:${seconds}`;
    requestAnimationFrame(updateCountdown);
  }

  updateCountdown();
}

startCountdown('countdown');
startCountdown('countdown-box');

// === 2. WELCOME fadeIn (если не через CSS) ===
document.addEventListener('DOMContentLoaded', () => {
  const welcome = document.querySelector('.welcome');
  if (welcome) {
    welcome.style.opacity = 0;
    welcome.style.transform = 'translateY(30px)';
    setTimeout(() => {
      welcome.style.transition = 'all 1s ease';
      welcome.style.opacity = 1;
      welcome.style.transform = 'translateY(0)';
    }, 500);
  }
});

// === 3. ВИБРАЦИЯ WHATSAPP ПРИ СКРОЛЛЕ ===
let whatsapp = document.getElementById('whatsapp');
if (whatsapp) {
  let vibrate = false;
  window.addEventListener('scroll', () => {
    if (!vibrate) {
      vibrate = true;
      whatsapp.classList.add('vibrate-once');
      setTimeout(() => {
        whatsapp.classList.remove('vibrate-once');
        vibrate = false;
      }, 800);
    }
  });
}

// === 4. ГАЛЕРЕЯ Drag Scroll ===
document.querySelectorAll('.gallery').forEach(gallery => {
  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    gallery.classList.add('active');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });
  gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.classList.remove('active');
  });
  gallery.addEventListener('mouseup', () => {
    isDown = false;
    gallery.classList.remove('active');
  });
  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.5;
    gallery.scrollLeft = scrollLeft - walk;
  });
});

// === 5. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const block = document.querySelector(this.getAttribute('href'));
    if (block) {
      block.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === 6. ПОДСВЕТКА АКТИВНОЙ КНОПКИ МЕНЮ ===
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});
