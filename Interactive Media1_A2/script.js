// ===============================
//         Calendar Logic         
// ===============================

// Get current month and year
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Month labels for header
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Dynamically generate calendar table for given month/year
function generateCalendar(month, year) {
  const calendarTable = document.getElementById('calendarTable');
  const monthYearDisplay = document.getElementById('calendarMonthYear');
  calendarTable.innerHTML = '';
  monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let row = document.createElement('tr');

  // Create table header row with weekdays
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let headerRow = document.createElement('tr');
  for (let day of days) {
    let th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th);
  }
  calendarTable.appendChild(headerRow);

  // Insert blank cells for days before 1st of the month
  for (let i = 0; i < (firstDay + 6) % 7; i++) {
    row.appendChild(document.createElement('td'));
  }

  // Insert date cells with emoji toggle
  for (let date = 1; date <= lastDate; date++) {
    if (row.children.length === 7) {
      calendarTable.appendChild(row);
      row = document.createElement('tr');
    }

    const cell = document.createElement('td');
    cell.innerHTML = `
      <div class="calendar-cell">
        <div class="day-number">${date}</div>
        <div class="emoji"></div>
      </div>
    `;

    // Highlight today's date
    const today = new Date();
    if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add('today');
    }

    // Toggle 🌱 emoji on click
    cell.addEventListener('click', () => {
      const emojiDiv = cell.querySelector('.emoji');
      emojiDiv.textContent = emojiDiv.textContent === '🌱' ? '' : '🌱';
    });

    row.appendChild(cell);
  }

  calendarTable.appendChild(row);
}

// Navigation buttons to switch calendar month
document.getElementById('prevMonth').addEventListener('click', () => {
  currentMonth = (currentMonth - 1 + 12) % 12;
  if (currentMonth === 11) currentYear--;
  generateCalendar(currentMonth, currentYear);
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentMonth = (currentMonth + 1) % 12;
  if (currentMonth === 0) currentYear++;
  generateCalendar(currentMonth, currentYear);
});

// ===============================
//       Playlist Media Logic     
// ===============================

// Study-friendly track list
const playlist = [
  { title: "너의 한마디", artist: "신인류", src: "audio/신인류_너의한마디.mp3" },
  { title: "무릎", artist: "아이유", src: "audio/아이유_무릎.mp3" },
  { title: "시가 될 이야기", artist: "신지훈", src: "audio/신지훈_시가될이야기.mp3" },
  { title: "그런 날", artist: "윈터", src: "audio/윈터_그런날.mp3" },
  { title: "가끔 미치도록 네가 안고 싶을 때가 있어", artist: "가을방학", src: "audio/가을방학_가끔미치도록네가안고싶을때가있어.mp3" },
  { title: "여름비", artist: "샘김", src: "audio/샘김_여름비.mp3" },
  { title: "우리가 헤어져야 했던 이유", artist: "비비", src: "audio/비비_우리가헤어져야했던이유.mp3" },
  { title: "Come back", artist: "수지", src: "audio/수지_Comeback.mp3" },
  { title: "기다린 만큼 더", artist: "검정치마", src: "audio/검정치마_기다린만큼더.mp3" },
  { title: "우리 사이 은하수를 만들어", artist: "오존", src: "audio/오존_우리사이은하수를만들어.mp3" }
];


// Media control variables
let currentIndex = 0;
const audio = document.getElementById("audioPlayer");
const trackFull = document.getElementById("trackFull");
const playBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const remainingTimeEl = document.getElementById("remainingTime");

// Converts seconds to mm:ss format
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Updates active track style in playlist
function updateTrackHighlight() {
  const items = document.querySelectorAll(".playlist-tracklist li");
  items.forEach((li, idx) => {
    li.classList.toggle("active-track", idx === currentIndex);
  });
}

// Bind click listeners to track items
function bindTrackListClicks() {
  const items = document.querySelectorAll(".playlist-tracklist li");
  items.forEach((li, idx) => {
    li.addEventListener("click", () => {
      loadTrack(idx);
    });
  });
}

// Load and play selected track
function loadTrack(index) {
  currentIndex = index;
  const track = playlist[index];
  audio.src = track.src;
  trackFull.textContent = `${track.title} – ${track.artist}`;
  audio.play();
  playBtn.textContent = "⏸";
  updateTrackHighlight();
  bindTrackListClicks();
}

// Play/pause toggle
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

// Navigate to previous track
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
});

// Navigate to next track
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
});

// Auto-play next when track ends
audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
});

// Update playback time and progress bar
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percent;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    remainingTimeEl.textContent = `-${formatTime(audio.duration - audio.currentTime)}`;
  }
});

// Seek playback on progress bar input
progressBar.addEventListener("input", () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

// ===============================
//         Stopwatch Logic        
// ===============================

// Track time values
let stopwatchInterval;
let elapsedTime = 0;
let running = false;

// DOM elements
const display = document.getElementById('stopwatch');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Format stopwatch into HH:MM:SS
function formatStopwatchTime(time) {
  const hrs = String(Math.floor(time / 3600)).padStart(2, '0');
  const mins = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const secs = String(time % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

// Update stopwatch text
function updateDisplay() {
  display.textContent = formatStopwatchTime(elapsedTime);
}

// Highlight the active stopwatch button
function setActiveButton(activeBtn) {
  [startBtn, pauseBtn, resetBtn].forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}

// Start stopwatch
startBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    stopwatchInterval = setInterval(() => {
      elapsedTime++;
      updateDisplay();
    }, 1000);
  }
  setActiveButton(startBtn);
});

// Pause stopwatch
pauseBtn.addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  running = false;
  setActiveButton(pauseBtn);
});

// Reset stopwatch
resetBtn.addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  elapsedTime = 0;
  updateDisplay();
  running = false;
  setActiveButton(resetBtn);
});

// ===============================
//     Initial Setup on Load      
// ===============================
window.addEventListener('DOMContentLoaded', () => {
  generateCalendar(currentMonth, currentYear); // build calendar
  loadTrack(currentIndex);                     // load default track
  updateDisplay();                             // show 00:00:00
});

