const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");

/* CREATE BOOKING */
router.post("/", async (req, res) => {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Booking saved" });
});

/* GET BOOKINGS */
router.get("/", async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});

/* DELETE BOOKING */
router.delete("/:id", async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
});

module.exports = router;