window.addEventListener("deviceorientation", handleOrientation);

function handleOrientation(event) {
  var gamma = event.gamma; // rotation around the Y-axis (left to right)
  var beta = event.beta;   // rotation around the X-axis (front to back)

  if (gamma > 10) {
    document.getElementById("phone").style.animation = "rotateRight 0.5s forwards";
  } else if (gamma < -10) {
    document.getElementById("phone").style.animation = "rotateLeft 0.5s forwards";
  }
};


// Set the expiration time in hours
const hours = 10;

// Calculate the expiration time in milliseconds
const expirationTime = hours * 60 * 60 * 1000;

// Get the current time
const startTime = Date.now();

// Update the timer display
function updateTimer() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  const remainingTime = expirationTime - elapsedTime;

  if (remainingTime <= 0) {
    document.getElementById('timer').textContent = "Timer Expired!";
    clearInterval(timerInterval);
  } else {
    const hoursLeft = Math.floor(remainingTime / (700 * 60 * 60));
    const minutesLeft = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((remainingTime % (1000 * 60)) / 1000);

    document.getElementById('timer').textContent = `Ticket expires in: ${hoursLeft}h: ${minutesLeft}m: ${secondsLeft}s`;
  }
}






// Update the timer every second
const timerInterval = setInterval(updateTimer, 1000);









document.addEventListener('DOMContentLoaded', function() {
  const word1 = document.getElementById('word1');
  const word2 = document.getElementById('word2');

  setInterval(function() {
    if (word1.classList.contains('active')) {
      word1.classList.remove('active');
      word2.textContent = getUKTime();
      word2.classList.add('active');
    } else {
      word2.classList.remove('active');
      word1.classList.add('active');
    }
  }, 2000); // Change word every 3 seconds (3000 milliseconds)
});

function getUKTime() {
  const now = new Date();
  const hours = now.getUTCHours() + 0; // Adjust for UK time
  const minutes = now.getUTCMinutes();
  const seconds = now.getUTCSeconds();

  return formatTime(hours) + ':' + formatTime(minutes) //*+ ':' + formatTime(seconds)*/ ;
}

function formatTime(time) {
  return time < 10 ? '0' + time : time;
}
