const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/product');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');

// Set up session middleware
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

// Routes
app.use('/products', productRoutes);

// Default route to display homepage
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products, message: '' });
    } catch (err) {
        res.status(500).send("Error fetching products.");
    }
});

// Enhanced search with related products
app.get('/filter', async (req, res) => {
    try {
        const query = req.query.query ? req.query.query.trim() : '';
        let products = [];

        if (query) {
            products = await Product.find({ name: { $regex: query, $options: 'i' } });
            
            if (products.length > 0) {
                const categories = [...new Set(products.map(p => p.category))];
                const relatedProducts = await Product.find({ category: { $in: categories } });
                
                const productSet = new Map();
                [...products, ...relatedProducts].forEach(p => productSet.set(p._id.toString(), p));
                products = Array.from(productSet.values());
            }
        }
        res.render('index', { products, message: query ? `Results for "${query}"` : 'Showing all products' });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
