// ---------- Tilt rotation ----------

const SENSITIVITY = 2.5;
const MAX_ROTATION = 30;
const SMOOTHING = 0.3; // lower = smoother but laggier (try 0.05 - 0.2)

let targetRotation = 0;
let currentRotation = 0;

function handleDeviceOrientation(event) {
  if (event.gamma === null) return;

  const rotation = event.gamma * SENSITIVITY;
  targetRotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, rotation));
}

function animateRotation() {
  const el = document.querySelector('.main-time');
  const diff = targetRotation - currentRotation;

  if (el && Math.abs(diff) > 0.05) {
    currentRotation += diff * SMOOTHING;
    el.style.transform = `rotate(${currentRotation.toFixed(2)}deg)`;
  }

  requestAnimationFrame(animateRotation);
}

let orientationListening = false;

function startOrientation() {
  if (orientationListening) return;
  orientationListening = true;
  window.addEventListener('deviceorientation', handleDeviceOrientation);
}

function requestOrientationPermission() {
  // iOS 13+ needs explicit permission, and it must come from a user gesture
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    DeviceOrientationEvent.requestPermission()
      .then((state) => {
        if (state === 'granted') {
          startOrientation();
        } else {
          console.log('Permission denied for device orientation.');
        }
      })
      .catch(console.error);
  } else {
    // Android and other browsers don't need permission
    startOrientation();
  }
}

requestAnimationFrame(animateRotation);

window.addEventListener('load', () => {
  const needsPermission =
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function';

  if (needsPermission) {
    // Wait for a tap, since iOS rejects the request without one
    document.body.addEventListener('click', requestOrientationPermission, { once: true });
  } else {
    startOrientation();
  }
});

// ---------- Ticket expiry timer ----------

const EXPIRY_HOURS = 10;
const expirationTime = EXPIRY_HOURS * 60 * 60 * 1000;
const startTime = Date.now();

function updateTimer() {
  const timerEl = document.getElementById('timer');
  if (!timerEl) return;

  const remaining = expirationTime - (Date.now() - startTime);

  if (remaining <= 0) {
    timerEl.textContent = 'Timer Expired!';
    clearInterval(timerInterval);
    return;
  }

  const hoursLeft = Math.floor(remaining / (1000 * 60 * 60));
  const minutesLeft = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((remaining % (1000 * 60)) / 1000);

  timerEl.textContent = `Ticket expires in: ${hoursLeft}h: ${minutesLeft}m: ${secondsLeft}s`;
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

// ---------- Word / UK time swap ----------

function getUKTime() {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const word1 = document.getElementById('word1');
  const word2 = document.getElementById('word2');
  if (!word1 || !word2) return;

  setInterval(() => {
    if (word1.classList.contains('active')) {
      word1.classList.remove('active');
      word2.textContent = getUKTime();
      word2.classList.add('active');
    } else {
      word2.classList.remove('active');
      word1.classList.add('active');
    }
  }, 2000);
});

// ---------- Date ----------

function updateDate() {
  const dateEl = document.getElementById('date');
  if (!dateEl) return;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();

  dateEl.textContent = `Valid from: 00:00, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

document.addEventListener('DOMContentLoaded', updateDate);