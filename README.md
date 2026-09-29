# Lumina Luxe MedSpa — Clinic Operations & Client Portal Demo

[![Live Demo](https://img.shields.io/badge/Live_Demo-lumina--demo1.netlify.app-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://lumina-demo1.netlify.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-C5A880.svg?style=for-the-badge)](LICENSE)

> **Live Interactive Demo**: [https://lumina-demo1.netlify.app/](https://lumina-demo1.netlify.app/)

---

## Overview

**Lumina Luxe MedSpa** is an interactive front-end web application demonstrating a modern clinical operating system and client booking portal for aesthetic practices, medical spas, and longevity clinics in the US, UK, and Australia.

Built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS v4**, this portfolio project showcases high-end editorial UI design, robust accessibility (WCAG AA), responsive layouts across mobile, tablet, and desktop, and simulated clinical workflows.

> **Note**: This application is an interactive portfolio demonstration using simulated data. It does not provide real medical services or manage actual protected health records.

---

## Showcase Previews

Placeholders for screenshots and recordings are located in [`/docs`](./docs/README.md):

| Preview | Description |
| :--- | :--- |
| **01. Landing Hero** | Desktop luxury hero with trust bar and dual action funnels |
| **02. Before & After Slider** | Keyboard-accessible clinical comparison with ARIA slider roles |
| **03. Booking Wizard** | 4-step appointment scheduling with multi-currency conversion |
| **04. Daily Queue & E-Sign** | Staff patient check-in with drawn and typed signature alternatives |
| **05. Executive Telemetry** | Revenue performance bar chart with axis scales, tooltips, and P&L metrics |

---

## Key Features

### 1. High-Touch Landing Experience
- **Editorial Design System**: Curated color identity (deep navy `#0B0F19` with warm metallic gold `#C5A880`), fluid typography (`Cormorant Garamond` display headers + `Plus Jakarta Sans` UI body), and 8px grid alignment.
- **Sticky Navbar with Scroll-Blur & Spy**: Dynamic blur on scroll and active section tracking via `IntersectionObserver`.
- **Accessible Mobile Drawer**: Slide-over navigation featuring focus trapping and `Esc` key dismissal.
- **Accessible Before & After Slider**: Touch, mouse, and full keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`) adhering to WAI-ARIA slider standards.
- **Interactive Treatment Estimator**: Dynamic package pricing calculator with session bundling discount tiers and duration estimates.
- **Global Currency Engine**: Instant price toggling across USD ($), EUR (€), GBP (£), AUD (A$), and CAD (C$).

### 2. Multi-Role Clinic Operations Dashboard
Switch between 3 simulated clinic perspectives at any time:
- **Client (VIP Patient)**: Schedule appointments, review upcoming treatment countdowns, examine clinical progress milestones, and preview tax receipts.
- **Staff (Clinician / Aesthetician)**: Manage daily patient appointments, check in arrivals, record anatomical treatment notes, and execute digital intake consents.
- **Admin (Clinic Director)**: Monitor financial telemetry, track gross run-rate through an interactive animated revenue chart, oversee inventory supplies, and manage client CRM records.

### 3. Workflow Utilities & Usability
- **Guided Tour Checklist**: Dismissible step-by-step walkthrough ("1. Book as Client → 2. Check in as Staff → 3. View revenue as Admin") with completion celebration.
- **Accessible Digital Consent**: Dual-mode signature pad supporting handwritten stylus drawing and a typed legal name alternative for keyboard-only users.
- **Universal Command Palette (`⌘K` / `Ctrl+K`)**: Rapid navigation and action dispatcher.
- **Real-Time Toast Feedback**: Transient notifications confirming status updates, e-sign completions, and demo resets.
- **Demo State Reset**: Instantly restore all appointments and billing records back to baseline seed data.

---

## Technical Decisions

| Category | Choice | Rationale |
| :--- | :--- | :--- |
| **Framework** | React 18 + TypeScript | Component reusability, strict type safety, and predictable state management |
| **Styling** | Tailwind CSS v4 + Custom Tokens | Modern CSS theme engine, fine-grained control over contrast and fluid type clamp |
| **Build Tool** | Vite 8 | Near-instant hot module replacement (HMR) and optimized Rollup chunk bundling |
| **Accessibility** | WCAG AA Standards | Strict 4.5:1 text contrast, visible focus rings with offsets, ARIA roles, and `prefers-reduced-motion` |
| **Code Splitting** | `React.lazy` + `Suspense` | Initial bundle kept lightweight (~102 kB gzipped) by lazy-loading dashboard views |
| **Resilience** | React Error Boundary | Gracefully captures runtime exceptions and provides one-click recovery |

---

## Local Development

### Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm 9+

### Installation & Run

```bash
# 1. Clone repository
git clone https://github.com/icebergf6/lumina-luxe-medspa.git
cd lumina-luxe-medspa

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Typecheck & Production Build

```bash
# Verify TypeScript types
npx tsc --noEmit

# Compile production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Automated CI

This repository includes a continuous integration workflow located at [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) that verifies dependency installation, TypeScript types, and production builds on every push to `main`.

---

## Contact & Inquiries

Designed & developed by **Leo Syafiq** (Senior Front-End Engineer & Product Designer).

- **Email**: [hello@leosyafiq.com](mailto:hello@leosyafiq.com)
- **Portfolio**: [leosyafiq.com](https://leosyafiq.com)
- **GitHub**: [@icebergf6](https://github.com/icebergf6)

*Available for custom web applications, SaaS front-end architecture, and bespoke clinic portal developments.*
