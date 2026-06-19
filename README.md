# 🛒 SastaBazzar

A full-featured E-Commerce Backend built using Node.js, Express.js, MongoDB, JWT Authentication, Cloudinary, and REST APIs.

## 🚀 Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Refresh Token Support
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Access Control (Admin/User)

### Product Management

* Create Product
* Get Products
* Get Product By ID
* Update Product
* Delete Product
* Product Image Upload using Cloudinary

### Order Management

* Place Order
* Get My Orders
* Get All Orders (Admin)
* Update Order Status
* Automatic Price Calculation

### Analytics

* Order Analytics
* Revenue Analytics
* Product Analytics

### Additional Features

* Email Notifications
* Error Handling Middleware
* MongoDB Atlas Integration
* Seed Data Script

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT
* bcrypt

### File Uploads

* Multer
* Cloudinary

### Utilities

* Nodemailer
* dotenv

---

## 📂 Project Structure

```text
backend/
├── controller/
├── middleware/
├── model/
├── routes/
├── utils/
├── Db/
├── public/
├── seed.js
├── index.js
└── package.json
```

---

## ⚙️ Installation

Clone Repository

```bash
git clone https://github.com/shreyansh-ku/SastaBazzar.git
```

Move to backend folder

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=7000
MONGODB_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password
```

Run project

```bash
npm run dev
```

---

## 📌 API Modules

### User APIs

* Register User
* Login User
* Profile Management

### Product APIs

* Create Product
* Get Products
* Update Product
* Delete Product

### Order APIs

* Place Order
* Get My Orders
* Get All Orders
* Update Order Status

### Analytics APIs

* Revenue Analytics
* Order Analytics

---

## 🔒 Security

* JWT Authentication
* Password Hashing
* Protected Routes
* Role-Based Authorization
* Environment Variable Protection

---

## 🌱 Database Seeding

```bash
node seed.js
```

---

## 📈 Future Improvements

* Razorpay Integration
* Product Reviews & Ratings
* Wishlist
* Cart Module
* Search & Filtering
* Pagination
* Swagger Documentation
* Docker Support
* Deployment on Render

---

## 👨‍💻 Author

**Shreyansh Kumar**

GitHub: https://github.com/shreyansh-ku

---

## ⭐ Status

Actively under development and continuously improving with new features.
