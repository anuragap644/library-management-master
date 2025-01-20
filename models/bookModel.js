const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    publishedYear: { type: Number },
    copiesAvailable: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
})

module.exports = mongoose.model("Book",bookSchema);