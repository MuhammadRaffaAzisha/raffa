/* ═══════════════════════════════════════════════
   LOVE NOTES — Firebase Firestore Integration
   Real-time cross-device notes
   ═══════════════════════════════════════════════ */
import { initializeApp }    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot,
         orderBy, query, serverTimestamp, updateDoc,
         doc, increment }   from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ── Firebase Config ── */
const firebaseConfig = {
  apiKey:            "AIzaSyAfiNILZSS5xfxSEU9BjY3pjS0YSYb8Cw4",
  authDomain:        "raffa-1cfe3.firebaseapp.com",
  projectId:         "raffa-1cfe3",
  storageBucket:     "raffa-1cfe3.firebasestorage.app",
  messagingSenderId: "415866790115",
  appId:             "1:415866790115:web:c582a8b7a98132e4a965d6",
  measurementId:     "G-CT6QZR9GQ0"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);
const notesCol = collection(db, "notes");

/* ── Helpers ── */
const ROTATIONS = [-4, -2, -1, 0, 1, 2, 4];
const CARD_BG   = ["#FFF5F6", "#FFF8F2", "#FDF5FF", "#F5FAFF", "#FFFDF0"];

const rand = arr => arr[Math.floor(Math.random() * arr.length)];

function formatDate(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ── Build note card ── */
function buildCard(data, id) {
  const liked = JSON.parse(localStorage.getItem("likedNotes") || "{}");
  const isLiked = !!liked[id];

  const card = document.createElement("div");
  card.className = "note-card";
  card.dataset.id = id;
  card.style.setProperty("--rot", `${rand(ROTATIONS)}deg`);
  card.style.background = rand(CARD_BG);

  card.innerHTML = `
    <p class="note-text">${data.text}</p>
    <div class="note-card-footer">
      <span class="note-date">${formatDate(data.createdAt)}</span>
      <button class="note-heart${isLiked ? " liked" : ""}" data-id="${id}">
        ♡ <span>${data.likes || 0}</span>
      </button>
    </div>
  `;

  card.querySelector(".note-heart").addEventListener("click", async e => {
    e.stopPropagation();
    const likedMap = JSON.parse(localStorage.getItem("likedNotes") || "{}");
    if (likedMap[id]) return;
    likedMap[id] = true;
    localStorage.setItem("likedNotes", JSON.stringify(likedMap));
    e.currentTarget.classList.add("liked");
    await updateDoc(doc(db, "notes", id), { likes: increment(1) });
  });

  return card;
}

/* ── Render feed ── */
function renderFeed(docs) {
  const feed = document.getElementById("notes-feed");
  if (!feed) return;
  feed.innerHTML = "";

  if (docs.length === 0) {
    feed.innerHTML = `<p class="notes-empty">Belum ada notes… jadilah yang pertama 🌸</p>`;
    return;
  }
  docs.forEach(d => feed.appendChild(buildCard(d.data(), d.id)));
}

/* ── Submit note ── */
async function submitNote() {
  const input = document.getElementById("note-input");
  const btn   = document.getElementById("note-submit");
  const text  = input.value.trim();
  if (!text) { input.focus(); return; }

  btn.disabled = true;
  btn.textContent = "Sending ♡…";

  try {
    await addDoc(notesCol, { text, createdAt: serverTimestamp(), likes: 0 });
    input.value = "";
    btn.textContent = "Sent! ♡";
    setTimeout(() => {
      btn.textContent = "Send with Love ♡";
      btn.disabled = false;
    }, 2000);
  } catch (err) {
    console.error(err);
    btn.textContent = "Send with Love ♡";
    btn.disabled = false;
  }
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", () => {
  /* Update date preview in form */
  const dateEl = document.getElementById("note-date-preview");
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  /* Submit button */
  document.getElementById("note-submit")?.addEventListener("click", submitNote);

  /* Ctrl+Enter shortcut */
  document.getElementById("note-input")?.addEventListener("keydown", e => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) submitNote();
  });

  /* Real-time listener */
  const q = query(notesCol, orderBy("createdAt", "desc"));
  onSnapshot(q, snap => renderFeed(snap.docs));
});
