# 🌸 Lumina Luxe MedSpa — Luxury Aesthetics Clinic OS & VIP Client Sanctuary

<div align="center">

![Lumina Luxe MedSpa Banner](https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200)

### *Elegance Redefined, Science Perfected.*
**A High-Ticket Fullstack Portfolio Web Application for Medical Spas, Cosmetic Surgery & Longevity Clinics.**

[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Netlify Deploy](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Live Demo](#-live-demo--preview) • [Key Features](#-key-features) • [Architecture](#-system-architecture) • [Demo Personas](#-demo-personas--role-access) • [Getting Started](#-getting-started) • [Netlify Deployment](#-deployment-to-netlify)

</div>

---

## 💎 Executive Summary

**Lumina Luxe MedSpa** is an enterprise-grade digital flagship and clinic operations system built specifically for high-end aesthetic medicine practices, cosmetic dermatology suites, and longevity wellness clinics. 

It pairs an **editorial-luxury patient-facing web experience** with an **in-clinic business operating system (Clinic OS)** featuring real-time financial tracking, multi-provider calendar orchestration, HTML5 canvas electronic consent forms, automated accounts receivable, and simulated Stripe billing.

> **Designed to demonstrate high-value freelance development capabilities ($2,500 – $5,000+ client contract valuation).**

---

## 🌟 Key Features

### 🏛️ 1. Editorial Public Web Experience
- **High-Converting Hero Showcase**: Dynamic verified social proof counters (4.98 rating, 350+ reviews, 94.6% retention) and dual conversion funnels (*Book Online* & *Access Portal*).
- **Interactive Before & After Anatomical Slider**: Touch & mouse-enabled comparison slider allowing prospective patients to inspect real clinical tissue remodeling and barrier restoration.
- **Board-Certified Specialists**: Profiles of Stanford and Harvard alumni physicians with verifiable credential badges and direct consultation booking.
- **Custom Bespoke Price & Bundle Estimator**: Real-time package calculator dynamically factoring multi-session discount tiers (5% to 20%), session durations, and savings breakdown.
- **Verified Reviews & Concierge FAQ**: Social proof testimonials and accordion guidance for pre/post-procedure care.
- **Smooth Mobile Off-Canvas Slide Drawer**: A slide-out sidebar navigation with dark blur backdrop, quick role switcher, and action CTAs.

---

### 💻 2. Multi-Role Clinic Operations Dashboard

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LUMINA LUXE CLINIC OS                           │
├───────────────────┬───────────────────────────┬────────────────────────┤
│   👑 ADMIN ROLE   │      🩺 STAFF ROLE        │     💎 CLIENT ROLE     │
│  (Medical Director│  (Nurse Practitioner)     │     (VIP Patient)      │
├───────────────────┼───────────────────────────┼────────────────────────┤
│ • Financial KPIs  │ • Real-time Daily Queue   │ • 24/7 Booking Wizard  │
│ • SVG Revenue Bar │ • Visual Calendar / Day   │ • Visit Countdown      │
│ • Treatment Menu  │ • HTML5 Canvas E-Sign     │ • Pre-Arrival Consents │
│ • Billing Ledger  │ • Dermal Chart Records    │ • 1-Click Stripe Pay   │
│ • 1-Click CSV Exp │ • Mark Completed Hand-off │ • Printable Tax Invoice│
└───────────────────┴───────────────────────────┴────────────────────────┘
```

#### 👑 1. Executive Clinic Director (`Admin`)
- **Real-Time Financial Analytics**: High-level gross collections ($128,450), active bookings, retention rate, and interactive weekly revenue SVG bar chart.
- **Provider Schedule Oversight**: Visual 6-column time-grid calendar with appointment status management (`Confirmed`, `In-Progress`, `Completed`, `Cancelled`).
- **Treatment Catalog Editor**: Live management of service titles, descriptions, duration, and pricing with instant synchronization across the platform.
- **Automated Billing Ledger**: Accounts receivable ledger, settled payment tracking, and one-click CSV export for QuickBooks / CPA review.
- **HIPAA-Compliant Patient CRM**: Patient roster with lifetime spend, visit count, Fitzpatrick skin profile, and downloadable roster CSV.

#### 🩺 2. Aesthetic Nurse Practitioner (`Staff`)
- **Daily Treatment Queue**: Filtered daily appointment queue with room check-in capabilities.
- **Mobile Day Switcher**: Scrollable day selector pills (`[Today] [Wed] [Thu]...`) displaying vertical schedule slots on smartphones.
- **HTML5 Canvas E-Signature Pad**: Dynamic drawing pad for medical consent forms with stylus/finger touch support, stroke smoothing, and verification badges.
- **Clinical Progress Notes**: Inspection of dermal charts, reported contraindications, and treatment parameter notes.

#### 💎 3. VIP Client Sanctuary (`Client`)
- **Upcoming Visit Countdown**: Live countdown timer to next private suite session with specialist details and suite arrival instructions.
- **24/7 Online Booking Wizard**: 4-step wizard to pick treatments, doctors, dates, and morning/afternoon slots.
- **Pre-Arrival Digital Consent**: Review and e-sign legal waivers directly from mobile devices before arriving at the clinic.
- **1-Click Stripe Billing & Tax Receipts**: Simulated Stripe credit card modal with input validation, test card filler, celebratory confetti, and print-ready PDF/paper receipts.

---

### 🚀 3. Integrated Tooling & Shortcuts

- **Command Palette (`Ctrl+K` / `Cmd+K`)**: Global spotlight search to instantly jump between views, switch personas, or book appointments.
- **Automated SMS & Email Notification Simulator**: Realistic Twilio SMS and Resend email dispatch drawer simulating real-world patient alerts.
- **Interactive Role User Guide & SOP**: Built-in manual with step-by-step procedures tailored to each role, interactive feature launchers, and MedSpa operational workflow flowchart.
- **One-Click Demo Reset**: Reset all appointments, invoices, and CRM records back to original seed data at any time.

---

## 👥 Demo Personas & Role Access

| Persona | Name | Role Title | Key Permissions |
| :--- | :--- | :--- | :--- |
| **👑 Admin** | **Dr. Eleanor Vance, MD** | Clinic Medical Director | Full financial ledger, pricing edits, master calendar, CSV export |
| **🩺 Staff** | **Chloe Rivera, NP** | Lead Aesthetic Injector | Queue management, canvas digital consent, chart notes, procedure completion |
| **💎 Client** | **Sophia Laurent** | VIP Platinum Member | 24/7 self-booking, countdown timer, pre-treatment waivers, Stripe checkout |

*Tip: You can switch personas at any time using the floating bottom switcher or directly from the Demo Profile view.*

---

## 📱 Mobile-First UI/UX Engineering

- **Zero Horizontal Overflow**: Verified on 360px, 375px (iPhone SE/13), 390px, and 414px viewports.
- **Slide-Over Navigation**: Full-height drawer with smooth transitions and backdrop blur.
- **Responsive Mobile Cards vs Desktop Tables**: Invoices, CRM, and Appointments automatically adapt to native-feeling mobile cards on small screens.
- **Touch Gesture Handling**: HTML5 canvas and Before/After slider feature dedicated `touch-action: none` to prevent page scrolling while drawing or dragging.

---

## 🛠️ Technology Stack

```
Frontend Architecture:
├── React 18 (Component-driven UI, Hooks, Context API)
├── TypeScript 5 (Strict static typing & interfaces)
├── Tailwind CSS v4 (Modern HSL luxury tokens & typography)
├── Vite 6 (Lightning-fast HMR & build bundling)
├── Lucide React (Curated medical & luxury icon set)
├── HTML5 Canvas API (Touch e-signature drawing pad)
└── LocalStorage Engine (Reactive state bus with event subscriptions)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/icebergf6/lumina-luxe-medspa.git
cd lumina-luxe-medspa
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```
Production assets will be generated in `dist/`.

---

## 🌐 Deployment to Netlify

This project is configured with `netlify.toml` and `public/_redirects`:

1. Connect your repository to [Netlify](https://app.netlify.com/).
2. Netlify will auto-detect:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy Site**.

---

## 📂 Project Structure

```
lumina-luxe-medspa/
├── public/
│   ├── _redirects              # Netlify SPA redirect rules
│   ├── favicon.svg             # Brand favicon
│   └── icons.svg
├── src/
│   ├── assets/                 # Brand imagery & graphics
│   ├── components/
│   │   ├── common/             # Command palette, demo switcher, notifications
│   │   ├── dashboard/          # Clinic OS layout & specialized views
│   │   │   └── views/          # Appointments, CRM, Invoices, Profile, Guide, Stripe
│   │   └── landing/            # Hero, Treatments, B&A Slider, Doctors, Estimator, FAQ
│   ├── context/                # AuthContext (roles, navigation state, modals)
│   ├── data/                   # Seed data (services, doctors, patients, invoices)
│   ├── services/               # StorageService (LocalStorage CRUD & event bus)
│   ├── types/                  # TypeScript data interfaces
│   ├── App.tsx                 # Root application
│   ├── main.tsx                # Entry point
│   └── index.css               # Design tokens, fonts, and animation keyframes
├── netlify.toml                # Netlify deployment configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.

---

<div align="center">
  <sub>Crafted with passion for luxury medical aesthetic clinics.</sub>
</div>
