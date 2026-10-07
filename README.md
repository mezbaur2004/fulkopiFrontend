# Fulkopi Frontend

Live Demo: [https://fulkopi-frontend.vercel.app/](https://fulkopi-frontend.vercel.app/)

> **Try it:** register an account on the live app to shop and check out. The admin dashboard needs an admin account and is available on request.
    > **Note:** Backend is hosted on Render, so the initial load may take ~15 seconds.

This is the frontend for **Fulkopi**, a MERN‑stack e‑commerce app featuring Google OAuth, custom login, SSLCommerz payment integration, and a clean architecture that works directly with the backend.

> ⚠️ Note: This project prioritizes **robust data flow, backend integration, and full-stack logic** over UI/UX polish. All critical flows — login, product management, and checkout — are fully functional and tested.

## ✨ Features

- Built with **React** and **Redux** for state management
- **Formik** & **Yup** for robust form handling & validation
- Login via **Google OAuth** + traditional email/password
- **Payment checkout** via SSLCommerz
- **Admin Dashboard** with product management
    - Brand and Category dropdown with search box for easy product addition
    - Full control of products, orders, and inventory
- Connects with backend API to manage products, cart, and orders
- Deployable on **Vercel** or locally, just update endpoints & environment variables

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```
VITE_BASE_URL=https://fulkopi-backend.onrender.com/api/
VITE_GOOGLE_CLIENT_ID=360419847873-al8qlkartaevkhiafl9lutk8qb5hjerh.apps.googleusercontent.com
```

These values point to the live backend and your Google OAuth client.

## 🚀 Getting Started

1. Clone the repository:

```
git clone https://github.com/mezbaur2004/fulkopiFrontend.git
cd fulkopiFrontend
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

The app opens at `http://localhost:5173` by default. You can log in, browse products, test checkout, or log into the **admin dashboard** to manage products.

## 📁 Project Structure

```
fulkopiFrontend/
├─ public/             # Static files (index.html, favicon, etc.)
├─ src/
│  ├─ APIRequest/      # API request helper functions
│  ├─ assets/          # Images, icons, and static assets
│  ├─ components/      # Reusable UI components
│  ├─ helper/          # Utility functions and helpers
│  ├─ pages/           # Screens: Home, Login, Checkout, Admin Dashboard, etc.
│  ├─ redux/           # State management (actions, reducers, store)
│  ├─ App.jsx          # Main app component
│  └─ main.jsx         # Entry point for React/Vite
├─ .env                # Environment variables
├─ .gitignore
├─ index.html
├─ package.json
├─ package-lock.json
├─ README.md
└─ vite.config.js
```

## 🔍 Quick Test Flow

- Open the live demo or run locally
- Login via Google or custom email/password
- Browse products → add items to cart → proceed to checkout via SSLCommerz
- **Admin Dashboard:** Login with admin credentials above → manage products and inventory
- Verify that API calls work and payment/admin flows complete

## 🧑‍💻 Author

**Mezbaur Are Rafi** – [GitHub](https://github.com/mezbaur2004)
