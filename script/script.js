/* ================= SEARCH ================= */
function searchProperties() {
    let cityInput = document.getElementById("searchCity").value.toLowerCase();
    let typeInput = document.getElementById("searchType").value;

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let city = card.getAttribute("data-city");
        let type = card.getAttribute("data-type");

        let cityMatch = city.includes(cityInput);
        let typeMatch = typeInput === "" || type === typeInput;

        card.style.display = (cityMatch && typeMatch) ? "block" : "none";
    });
}

/* ================= BOOK NOW ================= */
document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        let card = btn.closest(".card");

        let property = {
            title: card.querySelector("h3").innerText,
            location: card.querySelector("p").innerText,
            price: card.querySelector(".price").innerText
        };

        localStorage.setItem("selectedProperty", JSON.stringify(property));

        window.location.href = "modules/payment.html";
    });
});

/* ================= LOAD BOOKINGS ================= */
async function loadBookings() {

    let container = document.querySelector(".history-container");
    if (!container) return;

    container.innerHTML = "";

    try {
        let res = await fetch("https://rentease-backend-1.onrender.com/api/bookings"); // ✅ FIXED
        let bookings = await res.json();

        if (bookings.length === 0) {
            container.innerHTML = "<p>No bookings yet</p>";
            return;
        }

        bookings.forEach(b => {

            let div = document.createElement("div");
            div.classList.add("booking-card");

            div.innerHTML = `
                <h3>${b.title}</h3>
                <p>${b.location}</p>
                <p>Date: ${b.date}</p>
                <p>${b.status}</p>

                <button onclick="openCancelModal('${b._id}')">
                    Cancel Booking
                </button>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.log(error);
        showMessage("Failed to load bookings ❌");
    }
}

/* ================= CANCEL BOOKING ================= */
let selectedBookingId = null;

function openCancelModal(id) {
    selectedBookingId = id;
    document.getElementById("confirmModal").style.display = "flex";
}

/* YES CANCEL */
let yesBtn = document.getElementById("confirmYes");
if (yesBtn) {
    yesBtn.onclick = async function () {

       await fetch(`https://rentease-backend-1.onrender.com/api/bookings/${id}`, {
            method: "DELETE"
        });

        document.getElementById("confirmModal").style.display = "none";

        showMessage("Booking Cancelled ❌");

        loadBookings();
    };
}

/* NO CANCEL */
let noBtn = document.getElementById("confirmNo");
if (noBtn) {
    noBtn.onclick = function () {
        document.getElementById("confirmModal").style.display = "none";
    };
}

/* ================= MESSAGE ================= */
function showMessage(text) {
    let msg = document.createElement("div");
    msg.className = "custom-message";
    msg.innerText = text;

    document.body.appendChild(msg);

    setTimeout(() => msg.classList.add("show"), 100);

    setTimeout(() => {
        msg.classList.remove("show");
        setTimeout(() => msg.remove(), 400);
    }, 2500);
}

/* ================= DARK MODE ================= */
let toggle = document.getElementById("darkToggle");

if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

/* ================= LOAD ON START ================= */
window.onload = function () {

    loadBookings();

    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
};