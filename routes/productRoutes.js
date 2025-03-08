const express = require('express');
const Product = require('../models/product'); // Assuming your product schema is in "models/product.js"
const router = express.Router();

// Add product to cart
router.post('/add-to-cart', async (req, res) => {
    const productId = req.body.productId;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Initialize the cart if it doesn't exist
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Check if the product is already in the cart
        const existingProductIndex = req.session.cart.findIndex(item => item.product._id.toString() === productId);

        if (existingProductIndex === -1) {
            // If the product is not in the cart, add it
            req.session.cart.push({ product, quantity: 1 });
        } else {
            // If the product is already in the cart, increment the quantity
            req.session.cart[existingProductIndex].quantity += 1;
        }

        // Redirect to the cart page
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// View cart
router.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    let totalAmount = 0;

    cart.forEach(item => {
        totalAmount += item.product.price * item.quantity;
    });

    // If cart is empty, show a message
    if (cart.length === 0) {
        return res.render('cart', { cart, totalAmount, message: 'Your cart is empty!' });
    }

    res.render('cart', { cart, totalAmount });
});

// Remove product from cart
router.post('/remove-from-cart', (req, res) => {
    const productId = req.body.productId;

    // Remove product from cart
    req.session.cart = req.session.cart.filter(item => item.product._id.toString() !== productId);

    // Redirect to cart page
    res.redirect('/cart');
});

// Update product quantity in cart
router.post('/update-quantity', (req, res) => {
    const { productId, quantity } = req.body;

    const productIndex = req.session.cart.findIndex(item => item.product._id.toString() === productId);

    if (productIndex !== -1) {
        if (quantity <= 0) {
            // If the quantity is 0 or less, remove the product
            req.session.cart.splice(productIndex, 1);
        } else {
            // Update the quantity
            req.session.cart[productIndex].quantity = quantity;
        }
    }

    // Redirect to cart page
    res.redirect('/cart');
});

// Category filter route
router.get('/products', async (req, res) => {
    const category = req.query.category || "";
    try {
        let products;
        if (category) {
            products = await Product.find({ category });
        } else {
            products = await Product.find();
        }
        res.render('index', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Search products route
router.get('/filter', async (req, res) => {
    const query = req.query.query || "";
    try {
        const products = await Product.find({ name: new RegExp(query, 'i') });
        res.render('index', { products, query });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
