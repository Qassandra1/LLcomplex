// === Fade-in заголовка при загрузке ===
document.addEventListener("DOMContentLoaded", () => {
  const fadeEl = document.querySelector(".fade-in");
  if (fadeEl) {
    fadeEl.classList.add("visible");
  }
});

// === Счётчик на 48 часов ===
function startCountdown() {
  const countdownEls = document.querySelectorAll("#countdown");
  const savedTime = localStorage.getItem("ll_timer_start");
  const startTime = savedTime ? parseInt(savedTime) : Date.now();

  if (!savedTime) localStorage.setItem("ll_timer_start", startTime);

  const duration = 48 * 60 * 60 * 1000; // 48 часов в мс

  function updateCountdown() {
    const now = Date.now();
    let diff = startTime + duration - now;

    if (diff <= 0) {
      localStorage.setItem("ll_timer_start", Date.now());
      diff = duration;
    }

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 48);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEls.forEach(el => {
      el.innerHTML = `${hours}ч ${minutes}м ${seconds}с`;
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

startCountdown();

// === Плавный скролл по якорям ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
