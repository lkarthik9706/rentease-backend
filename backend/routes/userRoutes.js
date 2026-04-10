const express = require("express");
const router = express.Router();
const User = require("../models/users");

/* REGISTER */
router.post("/register", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User Registered" });
});

/* LOGIN */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
        res.json({ message: "Login success" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

module.exports = router;