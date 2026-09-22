# 🌸 Lumina Luxe MedSpa — Clinic Operations OS & VIP Client Sanctuary

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Netlify Ready](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com/)

> **A high-ticket fullstack portfolio web application engineered for luxury medical spas, aesthetic dermatology clinics, and longevity centers.** Designed to demonstrate enterprise-grade freelance development capabilities ($2,500 – $5,000+ value).

---

## 💎 Project Highlights

- **Zero-Backend Architecture**: 100% independent client-side persistence powered by an event-driven `LocalStorage` engine. Zero database setup or API keys required to test.
- **Role-Based Simulated Access**: Instant persona switcher (`Admin / Medical Director`, `Staff / Practitioner`, `Client / VIP Patient`) with live capability matrices.
- **Mobile-First UX / UI**: Custom off-canvas slide-out sidebar drawers, responsive touch-friendly cards, and dynamic touch-action isolated HTML5 signature pad.
- **Interactive Clinical Evidence**: Real-time Before/After interactive slider with touch drag support.
- **Financial & Booking Automation**: 4-step appointment booking wizard with automated invoice generation, simulated Stripe credit card checkout with confetti, printable medical tax receipts, and 1-click CSV accounting exports.

---

## 🏛️ Comprehensive Feature Breakdown

### 1. Luxury Public Landing Page
- **Hero Section**: High-converting luxury aesthetics, dynamic social proof counters (4.98 rating, 350+ reviews, 94.6% retention), and dual conversion CTAs.
- **Treatment Menu**: Categorized medical services (Aesthetics, Anti-Aging, Wellness, Body Contouring) with pricing, duration, and one-click booking pre-selection.
- **Interactive Before & After Slider**: Touch & mouse-controlled anatomical comparison slider with clinical case study notes and protocol specifications.
- **Medical Specialists Team**: Stanford and Harvard alumni doctor profiles with board certifications, active licenses, and direct booking triggers.
- **Interactive Price & Bundle Estimator**: Custom package calculator computing session discounts (5% to 20%), total duration, and per-session cost savings.
- **Client Reviews & Concierge FAQ**: Curated patient feedback and collapsible pre/post-procedure guidance.
- **Smooth Slide-Over Mobile Drawer**: Clean off-canvas slide-out menu with persona switcher, navigation items, and direct portal CTAs.

---

### 2. Multi-Role Clinic Operations Dashboard

#### 👑 1. Executive Clinic Director (`Admin`)
- **Real-Time Financial Analytics**: Gross monthly revenue ($128,450), active bookings volume, retention rate, and interactive weekly revenue SVG bar chart.
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

### 3. Integrated Tooling & Shortcuts

- **Command Palette (`Ctrl+K` / `Cmd+K`)**: Global spotlight search to instantly jump between views, switch personas, or book appointments.
- **SMS & Email Notification Simulator**: Realistic Twilio SMS and Resend email dispatch drawer simulating real-world patient alerts.
- **Interactive Role User Guide & SOP**: Built-in manual with step-by-step procedures tailored to each role, interactive feature launchers, and MedSpa operational workflow flowchart.
- **One-Click Demo Reset**: Reset all appointments, invoices, and CRM records back to original seed data at any time.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) with `@tailwindcss/vite` |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with custom luxury color palette (Obsidian `#0B0F19`, Champagne Gold `#C5A880`, Warm Cream `#E2CFB6`) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **State & Storage** | React Context API + LocalStorage Service with event pub/sub subscription bus |
| **Canvas** | HTML5 2D Canvas API with touch-action isolation |
| **Deployment** | Pre-configured for [Netlify](https://www.netlify.com/) (`netlify.toml` + `public/_redirects`) |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (version 18 or higher recommended)
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
The compiled, minified bundle will be generated in the `dist/` directory.

---

## 🌐 Deploy to Netlify

This project is pre-configured for seamless deployment to Netlify:

1. Connect your GitHub repository to [Netlify](https://app.netlify.com/).
2. Netlify will automatically detect `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy Site**. SPA routing rules are handled via `public/_redirects` and `netlify.toml`.

---

## 📱 Mobile Responsiveness Audit

- ✅ **No Horizontal Overflow**: Tested on 360px, 375px (iPhone SE/13), 390px, and 414px viewports.
- ✅ **Slide-Over Navigation**: Full-height drawer with smooth transitions and backdrop blur.
- ✅ **Mobile Table Adaptations**: Invoices, CRM, and Appointments adapt to native-feeling mobile cards on small screens.
- ✅ **Touch Gesture Handling**: HTML5 canvas and Before/After slider feature dedicated `touch-action: none` to prevent page scrolling while drawing or dragging.

---

## 📄 License

This project is developed as a showcase portfolio application for freelance client acquisition. Open source under the [MIT License](LICENSE).
