let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timer = null;
const display = document.getElementById("timer");
const laps = document.getElementById("laps");

function updateDisplay() {
  let h = String(hours).padStart(2, '0');
  let m = String(minutes).padStart(2, '0');
  let s = String(seconds).padStart(2, '0');
  let ms = String(milliseconds).padStart(3, '0');
  display.innerText = `${h}:${m}:${s}.${ms}`;
  document.title = `Stopwatch - ${h}:${m}:${s}.${ms}`;
}

function startTimer() {
  if (timer !== null) return;
  timer = setInterval(() => {
    milliseconds += 10;
    if (milliseconds >= 1000) {
      milliseconds = 0;
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
    }
    updateDisplay();
  }, 10);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  if (!confirm("Are you sure you want to reset the stopwatch?")) return;
  clearInterval(timer);
  timer = null;
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  updateDisplay();
  laps.innerHTML = "";
  document.title = "Stopwatch";
}

function recordLap() {
  const lapTime = display.innerText;
  const li = document.createElement("li");
  li.innerText = `Lap ${laps.children.length + 1}: ${lapTime}`;
  laps.appendChild(li);
  laps.scrollTop = laps.scrollHeight;
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("lapBtn").addEventListener("click", recordLap);

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

updateDisplay();
