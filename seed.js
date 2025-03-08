const mongoose = require('mongoose');
const Product = require('./models/product'); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    return Product.deleteMany({}); // Clear existing products
  })
  .then(() => {
    // Create an array of Nepali consumer goods with categories
    const products = [
      {
        name: "Dove Soap",
        description: "Moisturizing beauty bar soap for soft and smooth skin.",
        price: 80,
        imageUrl: "/dove soap.jpg",
        attributes: ["moisturizing", "gentle", "skin care"],
        category: "Personal Care"
      },
      {
        name: "Colgate Toothpaste",
        description: "Fluoride toothpaste for strong teeth and fresh breath.",
        price: 120,
        imageUrl: "/Colgate Toothpaste.jpeg",
        attributes: ["fluoride", "oral care", "fresh breath"],
        category: "Personal Care"
      },
      {
        name: "Nescafé Coffee",
        description: "Instant coffee with rich aroma and strong flavor.",
        price: 1300,
        imageUrl: "/Nescafe Coffee.jpeg",
        attributes: ["instant", "rich aroma", "strong flavor"],
        category: "Food & Beverages"
      },
      {
        name: "Lay’s Potato Chips",
        description: "Crispy and delicious potato chips with various flavors.",
        price: 50,
        imageUrl: "/Lays Potato Chips.jpeg",
        attributes: ["crispy", "snack", "flavored"],
        category: "Snacks"
      },
      {
        name: "Coca-Cola",
        description: "Refreshing carbonated soft drink with classic taste.",
        price: 270,
        imageUrl: "/Coca-Cola.jpeg",
        attributes: ["carbonated", "refreshing", "sweet"],
        category: "Food & Beverages"
      },
      {
        name: "Maggi Noodles",
        description: "Instant noodles with a delicious masala flavor.",
        price: 20,
        imageUrl: "/Maggi Noodles.jpeg",
        attributes: ["instant", "spicy", "quick meal"],
        category: "Snacks"
      },
      {
        name: "Tide Detergent",
        description: "Powerful laundry detergent for stain removal and freshness.",
        price: 500,
        imageUrl: "/Tide Detergent.jpeg",
        attributes: ["stain removal", "fresh scent", "laundry"],
        category: "Home Care"
      },
      {
        name: "Nutella Chocolate Hazelnut Spread",
        description: "Creamy hazelnut spread with cocoa, perfect for bread and desserts.",
        price: 825,
        imageUrl: "/Nutella Chocolate Hazelnut Spread.jpeg",
        attributes: ["chocolate", "hazelnut", "spread"],
        category: "Food & Beverages"
      },
      {
        name: "Gyan Chakki Aata",
        description: "Whole wheat flour ideal for making soft and fluffy rotis.",
        price: 415,
        imageUrl: "/Gyan Chakki Aata.jpeg",
        attributes: ["whole wheat", "flour", "baking"],
        category: "Grocery"
      },
      {
        name: "Haldiram's Bhujia",
        description: "Crispy and spicy gram flour noodles, a popular Indian snack.",
        price: 685,
        imageUrl: "/Haldiram Bhujia.jpeg",
        attributes: ["snack", "spicy", "crispy"],
        category: "Snacks"
      },
      {
        name: "Britannia Digestive Biscuit",
        description: "Healthy and tasty whole wheat biscuits.",
        price: 250,
        imageUrl: "/Britannia Digestive Biscuit.jpeg",
        attributes: ["whole wheat", "healthy", "snack"],
        category: "Snacks"
      },
      {
        name: "DDC Kanchan Cheese",
        description: "Creamy and rich cheese, perfect for cooking and snacking.",
        price: 290,
        imageUrl: "/DDC Kanchan Cheese.jpeg",
        attributes: ["cheese", "dairy", "snack"],
        category: "Dairy"
      },
      {
        name: "Upakar Illam Ghee",
        description: "Pure clarified butter made from high-quality milk.",
        price: 1350,
        imageUrl: "/Upakar Illam Ghee.jpeg",
        attributes: ["ghee", "dairy", "cooking"],
        category: "Grocery"
      },
      {
        name: "Wai Wai Noodles",
        description: "Popular instant noodles loved across Nepal.",
        price: 25,
        imageUrl: "/waiwai.png",
        attributes: ["instant", "spicy", "quick meal"],
        category: "Snacks"
      },
      {
        name: "Rumpum Noodles",
        description: "Delicious Nepali noodles with a unique taste.",
        price: 30,
        imageUrl: "/rumpum.png",
        attributes: ["instant", "spicy", "flavored"],
        category: "Snacks"
      },
      {
        name: "Mayos Noodles",
        description: "Another favorite Nepali instant noodle brand.",
        price: 25,
        imageUrl: "/mayos.png",
        attributes: ["quick meal", "spicy", "delicious"],
        category: "Snacks"
      },
      {
        name: "Milk Biscuit",
        description: "Healthy biscuits with a rich taste of milk.",
        price: 50,
        imageUrl: "/milkbiscuit.png",
        attributes: ["nutritious", "light", "tea-time snack"],
        category: "Snacks"
      },
      {
        name: "Digestive Biscuit",
        description: "Fiber-rich biscuits for a healthy diet.",
        price: 60,
        imageUrl: "/digestive.png",
        attributes: ["fiber-rich", "healthy", "crunchy"],
        category: "Snacks"
      },
      {
        name: "Tata Salt",
        description: "Iodized salt for a healthier lifestyle.",
        price: 40,
        imageUrl: "/tatasalt.png",
        attributes: ["iodized", "essential", "pure"],
        category: "Grocery"
      },
      {
        name: "Everest Masala",
        description: "Authentic spice blend for Nepali cooking.",
        price: 120,
        imageUrl: "/everest.png",
        attributes: ["spicy", "aromatic", "traditional"],
        category: "Grocery"
      },
      {
        name: "MDH Garam Masala",
        description: "Perfect blend of spices for rich flavors.",
        price: 150,
        imageUrl: "/mdh.png",
        attributes: ["aromatic", "flavorful", "premium"],
        category: "Grocery"
      },
      {
        name: "Figaro Olive Oil",
        description: "Extra virgin olive oil for cooking and skincare.",
        price: 500,
        imageUrl: "/figaro.png",
        attributes: ["extra virgin", "healthy", "pure"],
        category: "Grocery"
      },
      {
        name: "Pepsodent Toothpaste",
        description: "Best for cavity protection and fresh breath.",
        price: 110,
        imageUrl: "/pepsodent.png",
        attributes: ["cavity protection", "fresh breath", "strong teeth"],
        category: "Personal Care"
      },
      {
        name: "Close-Up Gel Toothpaste",
        description: "Gives you a refreshing breath all day long.",
        price: 130,
        imageUrl: "/closeup.png",
        attributes: ["fresh breath", "gel", "whitening"],
        category: "Personal Care"
      },
      {
        name: "Head & Shoulders Shampoo",
        description: "Anti-dandruff shampoo for healthy hair.",
        price: 250,
        imageUrl: "/hs.png",
        attributes: ["anti-dandruff", "moisturizing", "fresh"],
        category: "Personal Care"
      },
      {
        name: "Sunsilk Black Shine Shampoo",
        description: "Gives smooth and shiny black hair.",
        price: 280,
        imageUrl: "/sunsilk.png",
        attributes: ["black shine", "nourishing", "soft hair"],
        category: "Personal Care"
      },
      {
        name: "Dove Shampoo",
        description: "For intense repair and damage-free hair.",
        price: 300,
        imageUrl: "/dove.png",
        attributes: ["damage repair", "moisturizing", "smooth"],
        category: "Personal Care"
      },
      {
        name: "Lifebuoy Soap",
        description: "Germ protection soap for everyday use.",
        price: 50,
        imageUrl: "/lifebuoy.png",
        attributes: ["antibacterial", "refreshing", "trusted"],
        category: "Personal Care"
      },
      {
        name: "Dettol Soap",
        description: "Trusted antiseptic soap for clean skin.",
        price: 55,
        imageUrl: "/dettol.png",
        attributes: ["antiseptic", "germ protection", "trusted"],
        category: "Personal Care"
      },
      {
        name: "Patanjali Honey",
        description: "Organic honey with natural health benefits.",
        price: 300,
        imageUrl: "/ph.png",
        attributes: ["organic", "pure", "healthy"],
        category: "Food & Beverages"
      },
      {
        name: "Dabur Honey",
        description: "Best quality honey for immunity boosting.",
        price: 350,
        imageUrl: "/dh.png",
        attributes: ["natural", "immunity", "pure"],
        category: "Food & Beverages"
      },
      {
        name: "Harpic Powerplus Original",
        description: "Powerful toilet cleaner that removes tough stains and kills germs.",
        price: 158,
        imageUrl: "/Harpic Powerplus Original.jpeg",
        attributes: ["cleaning", "toilet cleaner", "hygiene"],
        category: "Home Care"
      },
      {
        name: "Mamy Poko Pants Extra Absorb Diaper - Large",
        description: "Comfortable diapers with extra absorbency for babies.",
        price: 638,
        imageUrl: "/Mamy Poko Pants Extra Absorb Diaper - Large.jpeg",
        attributes: ["diapers", "baby care", "absorbent"],
        category: "Baby Care"
      },
      {
        name: "Whisper Choice Wings Sanitary Pads Regular",
        description: "Sanitary pads with wings for comfort and protection.",
        price: 165,
        imageUrl: "/Whisper Choice Wings Sanitary Pads Regular.jpeg",
        attributes: ["sanitary pads", "feminine care", "comfort"],
        category: "Personal Care"
      }
    ];

    // Insert the products into the database
    return Product.insertMany(products);
  })
  .then(() => {
    console.log("Nepali consumer goods inserted successfully");
    return mongoose.disconnect(); // Disconnect from the database
  })
  .catch(err => {
    console.error("Error inserting products:", err);
  });
