
<div align="center">
  <img src="https://mdoro.netlify.app/images/logo.png" alt="Mani D'Oro Logo" width="150" style="border-radius: 10px; margin-bottom: 20px;" />
  
  # Mani D'Oro — Artisanal Gold Jewellery
  
  <p><b>A premium e-commerce showcase for handcrafted gold jewellery.</b></p>

  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18.3-blue.svg?style=flat-square&logo=react" alt="React" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.6-3178c6.svg?style=flat-square&logo=typescript" alt="TypeScript" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-7.3-646CFF.svg?style=flat-square&logo=vite" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Database-Supabase-3ECF8E.svg?style=flat-square&logo=supabase" alt="Supabase" /></a>
    <a href="https://cloudflare.com/"><img src="https://img.shields.io/badge/Deploy-Cloudflare-F38020.svg?style=flat-square&logo=cloudflare" alt="Cloudflare" /></a>
  </p>

  <p><em>Designed with a luxury editorial "Obsidian & Gold" aesthetic.</em></p>
</div>

---

## 📑 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started (Local Development)](#-getting-started-local-development)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment Strategy](#-deployment-strategy)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 About the Project

**Mani D'Oro** is a bespoke digital atelier built to showcase heritage-grade jewellery. The platform goes beyond a simple storefront, offering an interactive, tactile experience that mirrors high-end physical showrooms. From full-screen image lightboxes to dynamic cart drawers, every micro-interaction is polished.

This repository (`cloudflare-supabase` branch) represents the modern full-stack implementation using a edge-ready architecture, leveraging **Cloudflare** for lightning-fast delivery and **Supabase** (PostgreSQL) for reliable data persistence.

---

## ✨ Key Features

### 🛍️ Smart Cart & Reservation
- **Context-Aware Cart:** Built on React Context (`CartContext`) for fast, prop-drilling-free state management.
- **Dynamic Slide-in Drawer:** Spring-animated cart slide-out via Framer Motion, featuring live subtotal calculation and variant (size) tracking.
- **Navbar Integration:** Animated badge counters in the navigation header provide real-time visual feedback when items are added.

### 📸 Premium Dynamic Gallery
- **Mobile-First Touch Swiping:** Implemented seamless horizontal swiping for product galleries to cater to mobile shoppers.
- **Inspectable Lightbox:** Full-screen, tap-to-zoom image lightbox for meticulous inspection of artisanal craftsmanship.
- **Synced Navigation:** Dot indicators and thumbnail grids stay perfectly synchronized with the currently viewed image.

### 📱 "Obsidian & Gold" Design System
- **Responsive Excellence:** Tailored CSS Grid and Flexbox layouts ensuring flawless scaling from mobile to ultra-wide displays.
- **Custom UI Elements:** Sleek hamburger menu and highly accessible primitives powered by Radix UI.
- **Color Palette:** A luxurious blend of Obsidian (`#1d1c12`), Cream (`#fef9e9`), and Artisanal Gold (`#795900`).

### 💬 Client Engagement
- **WhatsApp Concierge:** One-tap enquiry button seamlessly routing users to WhatsApp, pre-filled with the product's Name, Price, Size, and page link.
- **Bespoke Commissions:** Native inquiry forms designed for custom alterations and gemstone requests.

---

## 🛠️ Architecture & Tech Stack

### Frontend Application
- **Core Framework:** React 18, TypeScript
- **State & Data Fetching:** TanStack React Query v5, React Context API
- **Routing:** Wouter (Lightweight client-side routing)
- **Styling:** Tailwind CSS v3, Tailwind Animate
- **Animations:** Framer Motion
- **UI Components:** Radix UI, Shadcn/UI patterns, Lucide React

### Backend Infrastructure
- **Server:** Express.js (Node.js) with TypeScript
- **Database:** PostgreSQL (Hosted via **Supabase**)
- **ORM:** Drizzle ORM (Type-safe SQL schema definitions and queries)
- **Authentication:** Passport.js with session management
- **Edge Deployment Target:** **Cloudflare Pages / Workers** (as per branch architecture)

---

## 📂 Project Structure

```text
jwellery/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # UI Components (CartDrawer, Navbar, ImageGallery)
│   │   ├── hooks/          # React hooks (use-toast, use-mobile)
│   │   ├── lib/            # Utilities & CartContext
│   │   └── pages/          # App views (Home, Product Detail, Admin)
│   └── index.html          # HTML entry point
├── server/                 # Express Backend API
│   ├── auth.ts             # Authentication setup
│   ├── routes.ts           # REST API endpoints
│   └── storage.ts          # Storage interfaces (Supabase Postgres & Memory)
├── shared/                 # Shared domain logic
│   └── schema.ts           # Drizzle SQL tables & Zod schemas
└── drizzle.config.ts       # Drizzle Kit configuration
```

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository
Make sure to check out the specific target branch:
```bash
git clone -b cloudflare-supabase https://github.com/ak2328/Jwellery.git
cd Jwellery
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase Database
Create a new project in [Supabase](https://supabase.com/). Go to your database settings and copy the connection string.

Create a `.env` file in the root of the project:
```env
# Example .env configuration
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE-REF].supabase.co:5432/postgres
NODE_ENV=development
```

### 4. Push Database Schema
Push your Drizzle schema to Supabase to initialize the tables:
```bash
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```
*This command uses Vite and TSX to concurrently run the Express backend API and the frontend development server on `http://localhost:5000`.*

---

## 🔌 API Reference

| HTTP Method | Endpoint Path | Description | Authorization |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieve the complete catalogue of jewellery. | Public |
| `GET` | `/api/products/:id` | Fetch details of a specific piece by ID. | Public |
| `POST` | `/api/products` | Add a new piece to the catalogue. | Admin |
| `POST` | `/api/register` | Register a new user/admin account. | Public |
| `POST` | `/api/login` | Authenticate and start a secure session. | Public |

---

## 🌍 Deployment Strategy (Cloudflare & Supabase)

1. **Database:** The database is fully managed by **Supabase**. Ensure your `DATABASE_URL` is set in your production environment variables.
2. **Frontend Deployment:** Connect the repository to **Cloudflare Pages**. 
    - Build command: `npm run build`
    - Build output directory: `dist/public` (or `dist/client` based on vite config)
3. **Backend API:** For edge deployment, the Express server logic can be migrated to **Cloudflare Workers** using adapters, or hosted separately via standard Node.js environments (like Render or Railway), depending on your final decoupled architecture goals.

---

## 🤝 Contributing

We welcome contributions to refine the Mani D'Oro experience!
1. Fork the project.
2. Create a feature branch: `git checkout -b feature/NewAnimation`
3. Commit your changes: `git commit -m "Add smooth scroll animation"`
4. Push to the branch: `git push origin feature/NewAnimation`
5. Open a Pull Request.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <p>Crafted with precision, code, and passion. ✨</p>
</div>
