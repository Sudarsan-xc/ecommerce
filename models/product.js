const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    attributes: { type: [String], required: true }, // Add a comma here
    category: { type: String } // Define the category field correctly
});

module.exports = mongoose.model('Product', productSchema);
