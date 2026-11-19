let targetRotation = 0;
let currentRotation = 0;

const SENSITIVITY = 1.5;
const MAX_ROTATION = 30;
const SMOOTHING = 0.1; // lower = smoother but laggier (try 0.05 - 0.2)

function handleDeviceOrientation(event) {
  if (event.gamma === null) return;

  // Just store the target, don't touch the DOM here
  const rotation = event.gamma * SENSITIVITY;
  targetRotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, rotation));
}

function animateRotation() {
  const el = document.querySelector('.main-time');
  const diff = targetRotation - currentRotation;

  // Skip tiny changes so it settles instead of twitching
  if (el && Math.abs(diff) > 0.05) {
    currentRotation += diff * SMOOTHING;
    el.style.transform = `rotate(${currentRotation.toFixed(2)}deg)`;
  }

  requestAnimationFrame(animateRotation);
}

requestAnimationFrame(animateRotation);

function getUKTime() {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit'
  });
}