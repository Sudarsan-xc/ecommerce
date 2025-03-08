# E-Commerce Project

## 📌 Project Overview
This is a full-stack e-commerce web application built using **Node.js, Express, MongoDB, and EJS**. It allows users to browse products, add them to a cart, and place orders. Admins can manage product listings and view orders.

## 🚀 Features
- User authentication & authorization
- Product catalog with categories
- Search & filtering functionality
- Shopping cart & checkout process
- Order history for users
- Admin dashboard for managing products and orders

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, Bootstrap, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Version Control**: Git & GitHub

## 📂 Folder Structure
```
major-main-main/
│── models/          # Database models (Product, User, Order)
│── routes/          # Express routes
│── views/           # EJS templates for frontend
│── public/          # Static assets (CSS, JS, Images)
│── seed.js          # Script to seed database
│── app.js           # Main server file
│── .gitignore       # Git ignore file
│── package.json     # Dependencies & scripts
```

## 🔧 Installation & Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/Sudarsan-xc/ecommerce.git
   cd ecommerce
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   SESSION_SECRET=your_secret_key
   ```

4. **Seed the Database** (Optional: Populate with sample data)
   ```sh
   node seed.js
   ```

5. **Run the Server**
   ```sh
   node app.js
   ```
   The app will be available at **http://localhost:3000**.

## 🛠 Troubleshooting
If you face issues pushing the project to GitHub, try:
```sh
git pull origin main --rebase
git push -u origin main
```

## 🤝 Contributing
1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature-branch`)
3. **Make changes and commit** (`git commit -m "Your message"`)
4. **Push to your fork** (`git push origin feature-branch`)
5. **Create a pull request**

## 📄 License
This project is **open-source** and available under the [MIT License](LICENSE).

