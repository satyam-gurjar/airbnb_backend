# House Selling Buying 🏠

A backend built using **Node.js**, **Express.js**, **EJS**, and **Tailwind CSS**.  
This project demonstrates **MVC architecture**, server-side rendering, and file-based data handling, making it ideal for learning and portfolio use.

---

## 🚀 Features

- 🏡 View all registered homes
- ➕ Add new homes as a host
- ✏️ Edit existing home details
- ❌ Remove homes
- 📄 View detailed home pages
- ❤️ Add / Remove homes from favourites
- 📅 Book homes
- ⚠️ Custom 404 error page
- 🧠 Clean MVC architecture

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **EJS (Server-side templating)**
- **Tailwind CSS**
- **JSON (File-based data storage)**
- **Nodemon** (Development)

---

## 📁 Project Structure

House/
│
├── controller/
│   ├── hostController.js
│   ├── storeController.js
│   └── errors.js
│
├── Data/
│   ├── homes.json
│   └── favourite.json
│
├── models/
│   ├── homes.js
│   └── favourite.js
│
├── routes/
│   ├── hostRouter.js
│   └── storeRouter.js
│
├── views/
│   ├── host/
│   ├── store/
│   ├── partials/
│   └── 404.ejs
│
├── public/
├── utils/
├── app.js
├── package.json
└── nodemon.json

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/satyam-gurjar/airbnb_backend.git

 ```
## goto in  House folder
## Install dependencies
```bash
npm install
```

## Run the project
```bash
npm run dev
```
