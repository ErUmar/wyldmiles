# WYLD MILES — Premium Himalayan Travel, Booking & Rental Platform

> *"Find Your Wild. Make Every Mile Count."*  
> Born in Srinagar, Kashmir. A premier gateway to Himalayan journeys, boutique cedar houseboats, curated mountain tours, and high-altitude adventure motorcycle & 4x4 rentals.

---

## 🏔️ 1. Project Overview

**WYLD MILES** is a production-quality travel-tech platform that combines the discoverability and booking UX of **Agoda** and **MakeMyTrip** with a boutique Himalayan aesthetic.

- **Primary Base:** Srinagar, Kashmir, India (Boulevard Road, Dal Lake).
- **Core Regions:** Kashmir, Himachal Pradesh, Uttarakhand, Ladakh.
- **Key Offerings:**
  - 🏍️ **Himalayan Adventure Bike Rentals (Flagship):** Royal Enfield Himalayan 450, Classic 350 Reborn, Scram 411, KTM 390 Adventure, BMW G310 GS with interactive spec comparison matrix.
  - 🚙 **Car & 4x4 Rentals:** Mahindra Thar 4x4, Scorpio-N, Toyota Innova Crysta, Force Urbania luxury vans (Self-drive & Chauffeur-driven).
  - 🏕️ **Curated Stays:** Handcrafted cedarwood houseboats on Dal Lake, alpine ski resorts in Gulmarg, and apple orchard chalets in Pahalgam.
  - 🎒 **Signature Tour Packages:** Day-by-day interactive itineraries for honeymooners, families, and road-trip adventurers.
  - 📋 **Live Enquiry & Dispatch Engine:** Automatic reference code generation (`WM-2026-XXXX`), status tracking, and 1-click WhatsApp concierge.
  - 🛡️ **Admin Operations Portal:** Role-based management dashboard for enquiries, fleet availability, rates, and customer status.

---

## 🛠️ 2. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom Himalayan brand palette (`#183C32` Deep Forest Green, `#202B28` Charcoal, `#F7F5EF` Warm Ivory, `#D77B42` Adventure Orange, `#A9BBA9` Sage)
- **Database & ORM:** SQLite (Zero-config local persistence, switchable to PostgreSQL via Prisma)
- **Icons:** Lucide React
- **Validation:** Zod
- **SEO & Metadata:** Dynamic OpenGraph, XML Sitemaps (`/sitemap.xml`), Robots (`/robots.txt`)

---

## 🚀 3. Getting Started

### Prerequisites
- Node.js v18+ or v20+ LTS

### 1. Installation & Setup
```bash
# Navigate to the project directory
cd C:\Users\sshek\.gemini\antigravity\scratch\wyld-miles

# Dependencies already installed. If reinstalling:
npm install
```

### 2. Database Sync & Seeding
```bash
# Push Prisma schema to SQLite
npx prisma db push

# Seed realistic Himalayan inventory (16 destinations, 8 packages, 6 stays, 8 bikes, 8 cars)
node prisma/seed.js
```

### 3. Run Development Server
```bash
npm run dev
# The website runs on http://localhost:3000
```

### 4. Run Production Server
```bash
npm run build
npm start
# The production server starts instantly on http://localhost:3000
```

---

## 🔐 4. Admin Portal Access

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email:** `admin@wyldmiles.com`
- **Password:** `wyldmiles_admin_2026`

**Capabilities:**
- View live pipeline metrics (Total enquiries, estimated revenue, active fleet count).
- Filter enquiries by status (`PENDING`, `UNDER_REVIEW`, `CONFIRMED`, `CANCELLED`).
- Update enquiry statuses and add internal concierge notes.
- Launch 1-click WhatsApp conversations with customers.
- Monitor active motorcycle and vehicle fleet availability.

---

## 📱 5. Customer Enquiry Tracking

Customers can track any enquiry in real time by visiting [http://localhost:3000/my-bookings](http://localhost:3000/my-bookings) and entering their reference code (e.g., `WM-2026-4819` or `WM-2026-9340`) or email address.

---

## 📂 6. Codebase Structure

```
wyld-miles/
├── prisma/
│   ├── schema.prisma         # Data models (Destination, TourPackage, Hotel, Bike, Car, Enquiry, User)
│   └── seed.js               # Comprehensive realistic seed data
├── src/
│   ├── app/
│   │   ├── layout.tsx        # AnnouncementBar, Navbar, FloatingWhatsApp, Footer
│   │   ├── page.tsx          # Homepage with Hero, 4-tab search, and curated sections
│   │   ├── bike-rentals/     # Flagship Bike Rental Marketplace & Detail Pages
│   │   ├── car-rentals/      # Car & 4x4 Rental Marketplace & Detail Pages
│   │   ├── packages/         # Tour Packages Marketplace & Day-by-day Itineraries
│   │   ├── hotels/           # Curated Stays, Houseboats & Chalets
│   │   ├── destinations/     # Regional Destination Guides & Activities
│   │   ├── book/             # Unified Booking Engine Wizard
│   │   ├── my-bookings/      # Customer Enquiry Tracker
│   │   ├── admin/            # Secure Admin Operations Control Center
│   │   ├── about/            # The WYLD MILES Story & Mountain Pillars
│   │   ├── contact/          # Srinagar HQ Contact Form & Helpline
│   │   ├── faqs/             # Mountain Travel FAQs, AMS & Permits
│   │   ├── cancellation/     # Cancellation & Security Deposit Terms
│   │   ├── terms/            # Terms of Service
│   │   ├── privacy/          # Privacy Policy
│   │   ├── sitemap.ts        # Auto-generated XML Sitemap
│   │   └── robots.ts         # SEO Robots rules
│   ├── components/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchWidget.tsx
│   │   ├── BookingModal.tsx
│   │   ├── BikeCompareModal.tsx
│   │   └── FloatingWhatsApp.tsx
│   ├── lib/
│   │   ├── prisma.ts         # Singleton database client
│   │   └── utils.ts          # INR formatting, WhatsApp link generator, reference generator
│   └── types/
│       └── index.ts          # TypeScript interfaces for all entities
├── .env                      # Environment configuration
└── tailwind.config.ts        # Custom brand color palette
```

---

*Note: All inventory, prices, vehicle fleets, and reviews are clearly identified as illustrative demo data for WYLD MILES.*
