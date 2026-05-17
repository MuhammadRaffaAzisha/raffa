/* ═══════════════════════════════════════════
   MUSIC PLAYER — Rapa & Nawa
   Default: Facebook Friends
   ═══════════════════════════════════════════ */

// ── Strategy: muted autoplay (selalu berhasil di semua browser)
// Browser MENGIZINKAN autoplay jika audio muted — sama seperti YouTube/Instagram
function attemptAutoplay() {
  audio.muted = true;   // mute dulu agar browser izinkan
  audio.play().then(() => {
    isPlaying = true;
    updatePlayBtn();
    showUnmuteHint(); // tampilkan hint "tap to unmute"
  }).catch(() => {
    // Fallback: jika masih diblokir (sangat jarang), tunggu interaksi
    const startMuted = () => {
      audio.muted = true;
      audio.play().then(() => {
        isPlaying = true;
        updatePlayBtn();
        showUnmuteHint();
      }).catch(() => {});
    };
    ["click", "touchstart", "keydown", "scroll"].forEach(ev =>
      document.addEventListener(ev, startMuted, { once: true })
    );
  });
}

function showUnmuteHint() {
  const hint = document.createElement("div");
  hint.id = "unmute-hint";
  hint.innerHTML = "🔇 Tap to unmute music";
  hint.style.cssText = `
    position:fixed; bottom:90px; right:24px; z-index:10000;
    background:rgba(93,64,55,0.88); color:#fff;
    padding:10px 18px; border-radius:50px;
    font-family:'Quicksand',sans-serif; font-size:13px; font-weight:600;
    cursor:pointer; box-shadow:0 4px 20px rgba(0,0,0,0.2);
    animation:fadeInUp 0.4s ease; backdrop-filter:blur(8px);
    transition: opacity 0.3s;
  `;
  document.body.appendChild(hint);

  const unmute = () => {
    audio.muted = false;
    hint.style.opacity = "0";
    setTimeout(() => hint.remove(), 300);
    // Update volume slider juga
    const vol = document.getElementById("mp-vol");
    if (vol) audio.volume = vol.value / 100;
  };

  hint.addEventListener("click", unmute);
  // Auto unmute juga saat user klik mini player
  document.getElementById("mp-mini")?.addEventListener("click", unmute, { once: true });
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
