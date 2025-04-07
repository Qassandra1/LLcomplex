// Таймер 48 часов на старте страницы function startCountdown(id, durationHours = 48) { const countdownElement = document.getElementById(id); const deadline = new Date().getTime() + durationHours * 60 * 60 * 1000;

function updateTimer() { const now = new Date().getTime(); const distance = deadline - now;

if (distance < 0) {
  countdownElement.innerHTML = "00:00:00";
  return;
}

const hours = Math.floor((distance / (1000 * 60 * 60)) % 48).toString().padStart(2, '0');
const minutes = Math.floor((distance / (1000 * 60)) % 60).toString().padStart(2, '0');
const seconds = Math.floor((distance / 1000) % 60).toString().padStart(2, '0');

countdownElement.innerHTML = `${hours}:${minutes}:${seconds}`;

}

updateTimer(); setInterval(updateTimer, 1000); }

// Вызов счётчиков для двух мест window.addEventListener("DOMContentLoaded", () => { startCountdown("countdown"); startCountdown("countdown-box"); });

