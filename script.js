// === СТАРТ СЧЁТЧИКОВ НА 48 ЧАСОВ === function startCountdown(id) { const element = document.getElementById(id); if (!element) return;

const now = Date.now(); let deadline = localStorage.getItem(llc_${id}); if (!deadline) { deadline = now + 48 * 60 * 60 * 1000; localStorage.setItem(llc_${id}, deadline); }

function update() { const remaining = deadline - Date.now(); if (remaining <= 0) { element.textContent = "00:00:00"; return; } const h = Math.floor(remaining / 3600000).toString().padStart(2, '0'); const m = Math.floor((remaining % 3600000) / 60000).toString().padStart(2, '0'); const s = Math.floor((remaining % 60000) / 1000).toString().padStart(2, '0'); element.textContent = ${h}:${m}:${s}; }

update(); setInterval(update, 1000); }

// === ЗАПУСК === document.addEventListener("DOMContentLoaded", () => { startCountdown("countdown"); startCountdown("countdown-box");

// === ВИБРАЦИЯ WHATSAPP ПРИ СКРОЛЛЕ === const whatsapp = document.getElementById("whatsapp"); let vibrating = false; window.addEventListener("scroll", () => { if (!vibrating) { vibrating = true; whatsapp.classList.add("shake"); setTimeout(() => { whatsapp.classList.remove("shake"); vibrating = false; }, 600); } });

// === ГАЛЕРЕЯ: ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ === const gallery = document.querySelector(".gallery, .gallery-scroll"); if (gallery) { gallery.addEventListener("wheel", (e) => { e.preventDefault(); gallery.scrollLeft += e.deltaY; }); }

// === WELCOME FADE-IN === const welcome = document.querySelector("#welcome"); if (welcome) { welcome.classList.add("fade-in-visible"); }

// === ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ === const faders = document.querySelectorAll(".section"); const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("fade-in-visible"); } }); }, { threshold: 0.1 });

faders.forEach(el => observer.observe(el));

// === ПОДСВЕТКА АКТИВНОГО ЯКОРЯ === const sections = document.querySelectorAll("section[id]"), navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => { let current = ""; sections.forEach(section => { const sectionTop = section.offsetTop - 80; if (pageYOffset >= sectionTop) { current = section.getAttribute("id"); } }); navLinks.forEach(link => { link.classList.remove("active"); if (link.getAttribute("href") === #${current}) { link.classList.add("active"); } }); }); });

