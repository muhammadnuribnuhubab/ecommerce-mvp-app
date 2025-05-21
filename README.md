# 🛒 Ecommerce MVP App

A MVP simulation of an e-commerce app with essential features
like product browsing, category filters, cart, checkout, and user
authentication.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-000?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## 🚀 Features

### 🏠 Home Page

- Browse featured and trending products
- Product cards with images, names, and prices
- Live search functionality

### 📄 Product Detail Page

- Complete product info (image, price, description, stock)
- Add to cart functionality
- Related products section

### 🛒 Cart System

- Add/remove products from cart
- View cart summary and total
- Responsive cart drawer or page

### 🔐 Authentication

- Sign up, sign in, and sign out (powered by Supabase)
- Protected routes for user account

### 👤 User Account

- View order history (if implemented)
- Manage profile information

### 🖼️ UI & Experience

- Responsive design for all devices
- Smooth transitions and animations (Framer Motion)
- Accessible and keyboard-friendly navigation

---

## 🛠️ Tech Stack

- [Next.js (App Router)](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com)
- [Headless UI](https://headlessui.com)
- [Lucide Icons](https://lucide.dev)

---

## 📦 Getting Started

```bash
git clone https://github.com/your-username/ecommerce-mvp-app.git
cd ecommerce-mvp-app

npm install  # or bun install
npm run dev  # or bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 🔐 Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Supabase Docs](https://supabase.com/docs)
- [Headless UI Docs](https://headlessui.com)

---

## 🚀 Deploy on Vercel

Click below to deploy your own:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/your-username/ecommerce-mvp-app)
