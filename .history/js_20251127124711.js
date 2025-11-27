// js.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
    getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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

// 3️⃣ Reference collection
const itemsCol = collection(db, "items");

// 4️⃣ Render list realtime
onSnapshot(itemsCol, (snapshot) => {
    listEl.innerHTML = "";
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const li = document.createElement("li");
        li.classList.add("d-flex", "align-items-center", "mb-2");
        li.dataset.id = docSnap.id; // simpan docId di li

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input", "me-2");

        const text = document.createElement("span");
        text.textContent = data.name;

        // dicoret jika dicentang
        checkbox.addEventListener("change", () => {
            text.style.textDecoration = checkbox.checked ? "line-through" : "none";
            text.style.color = checkbox.checked ? "#555" : "#000";
        });

        li.appendChild(checkbox);
        li.appendChild(text);
        listEl.appendChild(li);
    });
});

// 5️⃣ Tambah item
btnTambah.addEventListener("click", async () => {
    const val = input.value.trim();
    if (!val) return;
    await addDoc(itemsCol, { name: val });
    input.value = "";
});

// 6️⃣ Hapus item dicentang
clearBtn.addEventListener("click", async () => {
    const checkedItems = listEl.querySelectorAll("li input[type='checkbox']:checked");

    if (!confirm(`Yakin udah kebeli ${checkedItems.length} item?`)) return;

    for (const checkbox of checkedItems) {
        const li = checkbox.parentElement;
        const docId = li.dataset.id;
        await deleteDoc(doc(db, "items", docId));
    }
});
