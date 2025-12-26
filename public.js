import { db } from "./firebase-init.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const elCount = document.getElementById("pendingCount");
const elUpdated = document.getElementById("updatedAt");

// Kita simpan angka di doc: status/pending
const ref = doc(db, "status", "pending");

function formatTime(ms) {
  if (!ms) return "—";
  const d = new Date(ms);
  return d.toLocaleString("id-ID", { hour12: false });
}

onSnapshot(ref, (snap) => {
  if (!snap.exists()) {
    elCount.textContent = "0";
    elUpdated.textContent = "—";
    return;
  }
  const data = snap.data();
  elCount.textContent = String(data.pendingCount ?? 0);
  elUpdated.textContent = formatTime(data.updatedAtMs);
});
