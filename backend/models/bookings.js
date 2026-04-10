const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    title: String,
    location: String,
    price: String,
    date: String,
    status: String
});

module.exports = mongoose.model("Booking", bookingSchema);