/* ================= REGISTER ================= */
async function registerUser() {

    let name = document.getElementById("registerName").value;
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;

    try {
        let res = await fetch("https://rentease-backend-1.onrender.com/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        let data = await res.json();

        if (res.ok) {
            showMessage("Registration Successful ✅");

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);

        } else {
            showMessage(data.message || "Registration Failed ❌");
        }

    } catch (error) {
        console.log(error);
        showMessage("Server Error ❌");
    }
}

/* ================= LOGIN ================= */
async function loginUser() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    try {
        let res = await fetch("https://rentease-backend-1.onrender.com/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        let data = await res.json();

        if (res.ok) {
            showMessage("Login Successful ✅");

            // Save user session
            localStorage.setItem("user", JSON.stringify(data.user));

            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1200);

        } else {
            showMessage(data.message || "Login Failed ❌");
        }

    } catch (error) {
        console.log(error);
        showMessage("Server Error ❌");
    }
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
    }, 2000);
}