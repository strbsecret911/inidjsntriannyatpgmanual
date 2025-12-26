import { auth, db, googleProvider } from "./firebase-init.js";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  doc,
  onSnapshot,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const ADMIN_EMAIL_ALLOWED = "dinijanuari23@gmail.com"; // email kamu

const elAuthState = document.getElementById("authState");
const elInput = document.getElementById("inputPending");
const elUpdated = document.getElementById("updatedAt");
const elMsg = document.getElementById("msg");

const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const btnSave = document.getElementById("btnSave");
const btnPlus = document.getElementById("btnPlus");
const btnMinus = document.getElementById("btnMinus");

const ref = doc(db, "status", "pending");

function formatTime(ms) {
  if (!ms) return "—";
  const d = new Date(ms);
  return d.toLocaleString("id-ID", { hour12: false });
}

function setMessage(text) {
  elMsg.textContent = text || "";
}

function isAllowed(user) {
  return user?.email?.toLowerCase() === ADMIN_EMAIL_ALLOWED.toLowerCase();
}

async function saveValue(newVal) {
  const n = Number(newVal);
  if (!Number.isFinite(n) || n < 0) {
    setMessage("Angka harus >= 0");
    return;
  }
  setMessage("Menyimpan…");
  await setDoc(ref, {
    pendingCount: Math.floor(n),
    updatedAtMs: Date.now(),
  }, { merge: true });
  setMessage("Tersimpan ✅");
}

btnLogin.addEventListener("click", async () => {
  setMessage("");
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (e) {
    setMessage("Login gagal: " + (e?.message || e));
  }
});

btnLogout.addEventListener("click", async () => {
  setMessage("");
  try {
    await signOut(auth);
  } catch (e) {
    setMessage("Logout gagal: " + (e?.message || e));
  }
});

btnSave.addEventListener("click", async () => {
  await saveValue(elInput.value);
});

btnPlus.addEventListener("click", async () => {
  const cur = Number(elInput.value || 0);
  elInput.value = String((Number.isFinite(cur) ? cur : 0) + 1);
  await saveValue(elInput.value);
});

btnMinus.addEventListener("click", async () => {
  const cur = Number(elInput.value || 0);
  const next = Math.max(0, (Number.isFinite(cur) ? cur : 0) - 1);
  elInput.value = String(next);
  await saveValue(elInput.value);
});

// Realtime baca angka
onSnapshot(ref, (snap) => {
  const data = snap.exists() ? snap.data() : {};
  elInput.value = String(data.pendingCount ?? 0);
  elUpdated.textContent = formatTime(data.updatedAtMs);
});

// Auth state
onAuthStateChanged(auth, (user) => {
  if (!user) {
    elAuthState.textContent = "Status: belum login";
    btnLogin.disabled = false;
    btnLogout.disabled = true;
    btnSave.disabled = true;
    btnPlus.disabled = true;
    btnMinus.disabled = true;
    setMessage("Silakan login dulu.");
    return;
  }

  if (!isAllowed(user)) {
    elAuthState.textContent = `Login sebagai: ${user.email} (TIDAK punya izin edit)`;
    btnLogin.disabled = true;
    btnLogout.disabled = false;
    btnSave.disabled = true;
    btnPlus.disabled = true;
    btnMinus.disabled = true;
    setMessage("Akun ini tidak diizinkan mengubah angka.");
    return;
  }

  elAuthState.textContent = `Login sebagai: ${user.email} (OK)`;
  btnLogin.disabled = true;
  btnLogout.disabled = false;
  btnSave.disabled = false;
  btnPlus.disabled = false;
  btnMinus.disabled = false;
  setMessage("");
});
