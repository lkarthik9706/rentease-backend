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
mongoose.connect("mongodb://lkarthik:87654321@ac-6nrwcso-shard-00-00.ekmyqii.mongodb.net:27017,ac-6nrwcso-shard-00-01.ekmyqii.mongodb.net:27017,ac-6nrwcso-shard-00-02.ekmyqii.mongodb.net:27017/rentease?ssl=true&replicaSet=atlas-t13s5o-shard-0&authSource=admin&retryWrites=true&w=majority")
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