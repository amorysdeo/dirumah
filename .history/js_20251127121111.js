const input = document.getElementById("barang");
const btnTambah = document.querySelector("#inputan button");
const listEl = document.getElementById("list");
const clearBtn = document.getElementById("clear-all");

let items = [];

function renderList() {
    listEl.innerHTML = "";

    items.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("d-flex", "align-items-center", "mb-2");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input", "me-2");

        const text = document.createElement("span");
        text.textContent = item;

        li.appendChild(checkbox);
        li.appendChild(text);

        listEl.appendChild(li);
    });
}

btnTambah.addEventListener("click", () => {
    const val = input.value.trim();
    if (!val) return;

    items.push(val);
    input.value = "";
    renderList();
});

clearBtn.addEventListener("click", () => {
    if (items.length === 0) return; // kalau kosong, skip

    // popup konfirmasi
    const yakin = confirm("Yakin udah kebeli ya?");
    if (!yakin) return;

    items = [];
    renderList();
});
