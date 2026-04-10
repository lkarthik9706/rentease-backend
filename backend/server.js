const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

/* CONNECT DATABASE */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));
/* ROUTES */
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);

/* SERVER */
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
app.get("/", (req, res) => {
    res.send("🚀 RentEase Backend Running Successfully");
});