const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const natural = require('natural');
const TfIdf = natural.TfIdf;
const stemmer = natural.PorterStemmer;
const levenshtein = require('fast-levenshtein');

// Define Synonyms
const synonyms = {
    "coke": ["coca cola", "cola"],
    "pepsi": ["pepsi cola"],
    "burger": ["hamburger"],
};

const expandQuery = (query) => {
    const words = query.toLowerCase().split(" ");
    let expandedWords = new Set(words);
    
    words.forEach(word => {
        if (synonyms[word]) {
            synonyms[word].forEach(syn => expandedWords.add(syn));
        }
    });
    
    return Array.from(expandedWords).join(" ");
};

// Add product to cart
router.post('/add-to-cart', async (req, res) => {
    const productId = req.body.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send('Product not found');
        
        if (!req.session.cart) req.session.cart = [];
        const existingProductIndex = req.session.cart.findIndex(item => item.product._id.toString() === productId);
        
        if (existingProductIndex === -1) {
            req.session.cart.push({ product, quantity: 1 });
        } else {
            req.session.cart[existingProductIndex].quantity += 1;
        }
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// View cart
router.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    let totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    res.render('cart', { cart, totalAmount, message: cart.length === 0 ? 'Your cart is empty!' : '' });
});

// Remove product from cart
router.post('/remove-from-cart', (req, res) => {
    req.session.cart = req.session.cart.filter(item => item.product._id.toString() !== req.body.productId);
    res.redirect('/cart');
});

// Update product quantity in cart
router.post('/update-quantity', (req, res) => {
    const { productId, quantity } = req.body;
    const productIndex = req.session.cart.findIndex(item => item.product._id.toString() === productId);
    
    if (productIndex !== -1) {
        if (quantity <= 0) {
            req.session.cart.splice(productIndex, 1);
        } else {
            req.session.cart[productIndex].quantity = quantity;
        }
    }
    res.redirect('/cart');
});

// Filter and search products with synonyms and TF-IDF
router.get('/filter', async (req, res) => {
    let { query } = req.query;
    const productsPerPage = 6;
    const page = parseInt(req.query.page) || 1;
    try {
        let products = await Product.find();
        if (!query) {
            return res.render('index', {
                products: products.slice((page - 1) * productsPerPage, page * productsPerPage),
                currentPage: page,
                totalPages: Math.ceil(products.length / productsPerPage),
                query: ''
            });
        }
        
        query = expandQuery(query);
        const tfidf = new TfIdf();
        products.forEach(product => {
            let productText = `${product.name} ${product.description} ${product.attributes.join(' ')}`;
            tfidf.addDocument(stemmer.stem(productText.toLowerCase()));
        });
        
        let scores = [];
        tfidf.tfidfs(stemmer.stem(query.toLowerCase()), (i, measure) => {
            let product = products[i];
            let productText = `${product.name} ${product.description}`;
            let similarity = 1 - (levenshtein.get(query.toLowerCase(), productText.toLowerCase()) / Math.max(query.length, productText.length));
            let finalScore = measure * 0.7 + similarity * 0.3;
            scores.push({ product, score: finalScore });
        });

        scores.sort((a, b) => b.score - a.score);
        let sortedProducts = scores.map(item => item.product);
        const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
        res.render('index', {
            products: sortedProducts.slice((page - 1) * productsPerPage, page * productsPerPage),
            currentPage: page,
            totalPages,
            query
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
