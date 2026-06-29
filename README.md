# ShopEase – Frontend E-Commerce Application

A production-quality e-commerce frontend built with React + Vite, Tailwind CSS v4, and DummyJSON API.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router DOM v7**
- **Framer Motion** – Cart item animations, Toast notifications
- **Lucide React** – Icon library
- **Context API** – Cart, Wishlist, Theme, Toast
- **LocalStorage** – Cart and Wishlist persistence
- **DummyJSON API** – `https://dummyjson.com/products`

## Features

- 🛍️ Product catalog with search, filters, and sorting
- 🗂️ Category filters: Electronics, Fashion, Furniture, Beauty
- 💛 Wishlist with localStorage persistence
- 🛒 Shopping cart with quantity controls and order summary
- 🌙 Dark / Light mode toggle (persisted in localStorage)
- 🔍 Debounced search synced to URL (`?search=query`)
- 📦 Product details: images, warranty, reviews, stock
- ⚠️ Error handling with Retry button
- 💀 Skeleton loaders on product list and detail pages
- 📱 Fully responsive – mobile, tablet, desktop
- 🔔 Animated toast notifications
- 404 Not Found page

## Getting Started

```bash
npm install
npm run dev