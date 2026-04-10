/* LOAD PROPERTY DETAILS */
let property = JSON.parse(localStorage.getItem("selectedProperty"));

let container = document.getElementById("propertyDetails");

if (property && container) {
    container.innerHTML = `
        <h3>${property.title}</h3>
        <p>${property.location}</p>
        <p><strong>${property.price}</strong></p>
    `;
}

/* COMPLETE PAYMENT */
async function completePayment() {

    if (!property) {
        alert("No property selected!");
        return;
    }

    let booking = {
        title: property.title,
        location: property.location,
        price: property.price,
        date: new Date().toLocaleDateString(),
        status: "Confirmed"
    };

    try {
        let res = await fetch("https://rentease-backend-1.onrender.com/api/bookings", {  // ✅ FIXED
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
        });

        if (res.ok) {
            showMessage("Payment Successful 🎉");

            setTimeout(() => {
                window.location.href = "../modules/bookings.html";
            }, 1200);
        } else {
            showMessage("Payment Failed ❌");
        }

    } catch (error) {
        console.log(error);
        showMessage("Server Error ❌");
    }
}

/* CANCEL PAYMENT */
function cancelPayment() {

    showMessage("Payment Cancelled ❌");

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1200);
}

/* CUSTOM MESSAGE */
function showMessage(text) {
    let msg = document.createElement("div");
    msg.className = "custom-message";
    msg.innerText = text;

    document.body.appendChild(msg);

    setTimeout(() => msg.classList.add("show"), 100);

    setTimeout(() => {
        msg.classList.remove("show");
        setTimeout(() => msg.remove(), 400);
    }, 2000);
}