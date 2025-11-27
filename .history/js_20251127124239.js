// js.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// 1️⃣ Inisialisasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyARU1d5VqSl4L4MwIfPPNlOkmfQq3XGSiY",
  authDomain: "belanja-rumah.firebaseapp.com",
  projectId: "belanja-rumah",
  storageBucket: "belanja-rumah.firebasestorage.app",
  messagingSenderId: "281697731830",
  appId: "1:281697731830:web:5e5f5794a45c58335918d7"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2️⃣ Element
const input = document.getElementById("barang");
const btnTambah = document.querySelector("#inputan button");
const listEl = document.getElementById("list");
const clearBtn = document.getElementById("clear-all");

// 3️⃣ Render list realtime
const itemsCol = collection(db, "items");
onSnapshot(itemsCol, (snapshot) => {
    listEl.innerHTML = "";
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const li = document.createElement("li");
        li.classList.add("d-flex", "align-items-center", "mb-2");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input", "me-2");

        const text = document.createElement("span");
        text.textContent = data.name;

        li.appendChild(checkbox);
        li.appendChild(text);
        listEl.appendChild(li);
    });
});

// 4️⃣ Tambah item
btnTambah.addEventListener("click", async () => {
    const val = input.value.trim();
    if (!val) return;
    await addDoc(itemsCol, { name: val });
    input.value = "";
});

// Hapus item yang dicentang
clearBtn.addEventListener("click", async () => {
    // Ambil semua li
    const listItems = listEl.querySelectorAll("li");

    if (!confirm("Yakin udah kebeli yang dicentang saja?")) return;

    // Loop semua li
    for (const li of listItems) {
        const checkbox = li.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            const itemName = li.querySelector("span").textContent;
            // Cari document di Firestore yang sama namanya
            const snapshot = await getDocs(itemsCol);
            snapshot.forEach(async (docSnap) => {
                if (docSnap.data().name === itemName) {
                    await deleteDoc(doc(db, "items", docSnap.id));
                }
            });
        }
    }
});
