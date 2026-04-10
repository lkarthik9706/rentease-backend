/* ================= ADMIN DASHBOARD ================= */
async function loadDashboard() {

    try {
        let res = await fetch("https://rentease-backend-1.onrender.com/api/bookings"); // ✅ FIXED URL
        let bookings = await res.json();
        /* TOTAL BOOKINGS */
        document.getElementById("totalBookings").innerText = bookings.length;

        /* TOTAL REVENUE */
        let total = 0;

        bookings.forEach(b => {
            let price = parseInt(b.price?.replace(/[^\d]/g, "")) || 100;
            total += price;
        });

        document.getElementById("totalRevenue").innerText = "€" + total;

        /* SHOW BOOKINGS */
        let container = document.getElementById("adminBookings");
        container.innerHTML = "";

        bookings.forEach(b => {

            let div = document.createElement("div");
            div.classList.add("booking-card");

            div.innerHTML = `
                <h3>${b.title}</h3>
                <p>${b.location}</p>
                <p>Date: ${b.date}</p>
                <p>Status: ${b.status}</p>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.log(error);
        alert("Admin Dashboard Error ❌");
    }
}

/* LOAD ON START */
window.onload = loadDashboard;