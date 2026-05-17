/* ═══════════════════════════════════════════
   MUSIC PLAYER — Rapa & Nawa
   Default: Facebook Friends
   ═══════════════════════════════════════════ */

// ── Fullscreen welcome overlay — muncul saat halaman pertama dibuka
function showWelcomeOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "music-welcome-overlay";
  overlay.innerHTML = `
    <div id="mwo-backdrop"></div>
    <div id="mwo-card">
      <div id="mwo-petals">
        <span class="mwo-petal" style="--r:0deg;  --d:90px">🌸</span>
        <span class="mwo-petal" style="--r:45deg; --d:95px">🌸</span>
        <span class="mwo-petal" style="--r:90deg; --d:88px">🌸</span>
        <span class="mwo-petal" style="--r:135deg;--d:92px">🌸</span>
        <span class="mwo-petal" style="--r:180deg;--d:90px">🌸</span>
        <span class="mwo-petal" style="--r:225deg;--d:95px">🌸</span>
        <span class="mwo-petal" style="--r:270deg;--d:88px">🌸</span>
        <span class="mwo-petal" style="--r:315deg;--d:92px">🌸</span>
      </div>
      <div id="mwo-note">♪</div>
      <h2 id="mwo-title">Rapa &amp; Nawa</h2>
      <p id="mwo-subtitle">Tap untuk mulai mendengarkan musik</p>
      <button id="mwo-btn">
        <span id="mwo-btn-icon">▶</span>
        <span>Mulai</span>
      </button>
      <p id="mwo-skip">atau tekan di mana saja</p>
    </div>
  `;

  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    #music-welcome-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: mwo-fadein 0.5s ease;
    }
    @keyframes mwo-fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes mwo-fadeout {
      from { opacity: 1; }
      to   { opacity: 0; }
    }
    #mwo-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(93, 64, 55, 0.55);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }
    #mwo-card {
      position: relative;
      z-index: 1;
      background: linear-gradient(145deg, rgba(255,249,240,0.97), rgba(250,218,221,0.97));
      border: 1px solid rgba(183,110,121,0.25);
      border-radius: 28px;
      padding: 48px 40px 36px;
      text-align: center;
      box-shadow: 0 32px 80px rgba(183,110,121,0.35), 0 4px 20px rgba(93,64,55,0.15);
      max-width: 340px;
      width: 90%;
      animation: mwo-popup 0.55s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes mwo-popup {
      from { transform: scale(0.7) translateY(30px); opacity: 0; }
      to   { transform: scale(1) translateY(0); opacity: 1; }
    }

    /* Floating petals */
    #mwo-petals {
      position: absolute;
      top: 50%; left: 50%;
      width: 0; height: 0;
      pointer-events: none;
    }
    .mwo-petal {
      position: absolute;
      font-size: 18px;
      opacity: 0.6;
      transform: rotate(var(--r)) translateX(var(--d));
      animation: mwo-orbit 8s linear infinite;
      transform-origin: 0 0;
    }
    @keyframes mwo-orbit {
      from { transform: rotate(var(--r)) translateX(var(--d)) rotate(0deg); }
      to   { transform: rotate(calc(var(--r) + 360deg)) translateX(var(--d)) rotate(-360deg); }
    }

    /* Big music note */
    #mwo-note {
      font-size: 56px;
      line-height: 1;
      margin-bottom: 16px;
      color: #B76E79;
      animation: mwo-pulse 1.8s ease-in-out infinite;
      display: inline-block;
      filter: drop-shadow(0 4px 16px rgba(183,110,121,0.4));
    }
    @keyframes mwo-pulse {
      0%, 100% { transform: scale(1);    filter: drop-shadow(0 4px 16px rgba(183,110,121,0.4)); }
      50%       { transform: scale(1.12); filter: drop-shadow(0 8px 28px rgba(183,110,121,0.6)); }
    }

    #mwo-title {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      font-style: italic;
      color: #5D4037;
      margin: 0 0 8px;
      font-weight: 700;
    }
    #mwo-subtitle {
      font-family: 'Quicksand', sans-serif;
      font-size: 14px;
      color: #9E7B7B;
      margin: 0 0 28px;
      line-height: 1.5;
    }

    #mwo-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #B76E79, #C4828E);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 14px 36px;
      font-family: 'Quicksand', sans-serif;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 8px 28px rgba(183,110,121,0.45);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      letter-spacing: 0.5px;
    }
    #mwo-btn:hover {
      transform: translateY(-3px) scale(1.04);
      box-shadow: 0 14px 36px rgba(183,110,121,0.55);
    }
    #mwo-btn:active { transform: scale(0.97); }
    #mwo-btn-icon {
      font-size: 14px;
      background: rgba(255,255,255,0.25);
      border-radius: 50%;
      width: 24px; height: 24px;
      display: flex; align-items: center; justify-content: center;
    }

    #mwo-skip {
      font-family: 'Quicksand', sans-serif;
      font-size: 11px;
      color: #C4A8A8;
      margin: 14px 0 0;
      letter-spacing: 0.3px;
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);

  // Function to dismiss overlay & start music
  const dismiss = () => {
    overlay.style.animation = "mwo-fadeout 0.4s ease forwards";
    setTimeout(() => overlay.remove(), 400);
    // Play & unmute
    audio.muted = false;
    audio.play().then(() => {
      isPlaying = true;
      updatePlayBtn();
    }).catch(() => {
      // Tetap coba play muted sebagai fallback
      audio.muted = true;
      audio.play().then(() => { isPlaying = true; updatePlayBtn(); }).catch(() => {});
    });
  };

  document.getElementById("mwo-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    dismiss();
  });
  // Klik backdrop juga dismiss
  document.getElementById("mwo-backdrop").addEventListener("click", dismiss);
}

// ── Strategy: tampilkan overlay welcome, lalu play saat user klik
function attemptAutoplay() {
  // Load lagu dulu (tanpa autoplay) agar siap diputar
  audio.muted = true;
  audio.load();
  // Overlay akan handle play saat user interaksi
  showWelcomeOverlay();
}

const playlist = [
  { title: "Facebook Friends",     artist: "Niki",  src: "music/6. Facebook Friends.mp3" },
  { title: "Before",               artist: "Niki",  src: "music/1. Before.mp3" },
  { title: "High School in Jakarta", artist: "Niki", src: "music/2. High School in Jakarta.mp3" },
  { title: "Backburner",           artist: "Niki",  src: "music/3. Backburner.mp3" },
  { title: "Keeping Tabs",         artist: "Niki",  src: "music/4. Keeping Tabs.mp3" },
  { title: "The Apt We Won't Share", artist: "Niki", src: "music/5. The Apartment We Won't Share.mp3" },
  { title: "Milk Teeth",           artist: "Niki",  src: "music/8. Milk Teeth.mp3" },
  { title: "Autumn",               artist: "Niki",  src: "music/9. Autumn.mp3" },
  { title: "Oceans & Engines",     artist: "Niki",  src: "music/10. Oceans & Engines.mp3" },
  { title: "On The Drive Home",    artist: "Niki",  src: "music/11. On The Drive Home.mp3" },
  { title: "Take A Chance With Me", artist: "Niki", src: "music/12. Take A Chance With Me.mp3" },
];

let currentIndex = 0;
let isPlaying = false;
let panelOpen = false;

const audio = new Audio();

function formatTime(s) {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function loadSong(index, autoplay = false) {
  currentIndex = index;
  const song = playlist[index];
  audio.src = song.src;

  // Update mini bar
  document.getElementById("mp-mini-title").textContent = song.title;
  document.getElementById("mp-mini-artist").textContent = song.artist;

  // Update panel header
  document.getElementById("mp-title").textContent = song.title;
  document.getElementById("mp-artist").textContent = song.artist;

  // Update progress
  document.getElementById("mp-seek").value = 0;
  document.getElementById("mp-current").textContent = "0:00";
  document.getElementById("mp-duration").textContent = "0:00";

  // Update playlist highlight
  document.querySelectorAll(".mp-playlist-item").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  if (autoplay) playSong();
}

function playSong() {
  audio.play().then(() => {
    isPlaying = true;
    updatePlayBtn();
  }).catch(() => {});
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  updatePlayBtn();
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

function updatePlayBtn() {
  const icon = isPlaying ? "⏸" : "▶";
  document.getElementById("mp-play-btn").textContent = icon;
  document.getElementById("mp-mini-play").textContent = icon;
}

function nextSong() {
  loadSong((currentIndex + 1) % playlist.length, true);
}

function prevSong() {
  loadSong((currentIndex - 1 + playlist.length) % playlist.length, true);
}

function togglePanel() {
  panelOpen = !panelOpen;
  document.getElementById("mp-panel").classList.toggle("open", panelOpen);
}

// Build player DOM
function buildPlayer() {
  const container = document.createElement("div");
  container.id = "music-player";
  container.innerHTML = `
    <!-- Full panel -->
    <div id="mp-panel">
      <div id="mp-panel-header">
        <div id="mp-art">♪</div>
        <div id="mp-info">
          <div id="mp-title">${playlist[0].title}</div>
          <div id="mp-artist">${playlist[0].artist}</div>
        </div>
        <button id="mp-close-btn" onclick="togglePanel()">✕</button>
      </div>

      <div id="mp-controls-row">
        <button class="mp-ctrl" onclick="prevSong()">⏮</button>
        <button class="mp-ctrl mp-play" id="mp-play-btn" onclick="togglePlay()">▶</button>
        <button class="mp-ctrl" onclick="nextSong()">⏭</button>
      </div>

      <div id="mp-seek-row">
        <span id="mp-current">0:00</span>
        <input type="range" id="mp-seek" value="0" min="0" step="0.1">
        <span id="mp-duration">0:00</span>
      </div>

      <div id="mp-vol-row">
        <span>🔈</span>
        <input type="range" id="mp-vol" value="80" min="0" max="100">
      </div>

      <div id="mp-playlist">
        ${playlist.map((s, i) => `
          <div class="mp-playlist-item${i === 0 ? " active" : ""}" onclick="loadSong(${i}, true)">
            <div class="mp-item-title">${s.title}</div>
            <div class="mp-item-artist">${s.artist}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Mini floating bar -->
    <div id="mp-mini" onclick="togglePanel()">
      <div id="mp-mini-art">♪</div>
      <div id="mp-mini-info">
        <div id="mp-mini-title">${playlist[0].title}</div>
        <div id="mp-mini-artist">${playlist[0].artist}</div>
      </div>
      <button id="mp-mini-play" onclick="event.stopPropagation(); togglePlay()">▶</button>
    </div>
  `;
  document.body.appendChild(container);

  // Audio events
  audio.addEventListener("timeupdate", () => {
    const seek = document.getElementById("mp-seek");
    const cur  = document.getElementById("mp-current");
    if (seek && !seek.matches(":active")) {
      seek.max   = audio.duration || 0;
      seek.value = audio.currentTime;
    }
    if (cur) cur.textContent = formatTime(audio.currentTime);
    const dur = document.getElementById("mp-duration");
    if (dur) dur.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("ended", nextSong);

  document.getElementById("mp-seek").addEventListener("input", (e) => {
    audio.currentTime = e.target.value;
  });

  document.getElementById("mp-vol").addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
  });

  audio.volume = 0.8;
  loadSong(0);
}

document.addEventListener("DOMContentLoaded", () => {
  buildPlayer();
  attemptAutoplay();
});
