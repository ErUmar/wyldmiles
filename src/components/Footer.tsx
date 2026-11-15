'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  ShieldAlert,
  Heart,
  Bike,
  Car,
  Hotel,
  ShieldCheck,
  Mountain,
  ArrowUpRight,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1311] text-white border-t border-amber-400/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Demo Disclaimer Alert Box */}
        <div className="mb-12 bg-white/5 border border-amber-400/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs text-gray-300">
          <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] block sm:inline mr-2">
              Illustrative Demonstration Platform Notice:
            </span>
            <span>
              WYYLD MILES is a demonstration travel, stay, and adventure vehicle rental platform based in Kashmir. All demo inventory, vehicle specs, hotel rates, reviews, and availability are illustrative sample data. Submitting an enquiry creates an authentic booking request in the persistent database with reference tracking (e.g. WM-2026-XXXX).
            </span>
          </div>
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info with Authentic Logo & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-amber-400/40 shadow-xl bg-black shrink-0">
                <img
                  src="/logo.jpg"
                  alt="WYYLD MILES"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-wider text-white uppercase font-sans leading-none">
                  WYYLD<span className="text-amber-400"> MILES</span>
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="h-[1px] w-4 bg-amber-400/60" />
                  <p className="text-[9px] tracking-[0.25em] text-amber-300 font-extrabold uppercase">
                    WANDER. YEARN. LIVE. DISCOVER.
                  </p>
                  <div className="h-[1px] w-4 bg-amber-400/60" />
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm pt-2">
              Proudly rooted in the Vale of Kashmir. WYYLD MILES bridges luxury alpine hospitality, high-altitude motorcycle expeditions, and tailored Himalayan road trips across Kashmir, Ladakh, Himachal, and Uttarakhand.
            </p>

            <div className="space-y-2 text-xs text-gray-300 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Base Camp: Boulevard Road, Dal Lake, Srinagar, Kashmir 190001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Expedition Helpline: +91 98765 43210 (Srinagar HQ)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Enquiries: reservations@wyldmiles.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Kashmir & Himalayan Tour Packages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 tracking-wider uppercase">
              Curated Circuits
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/packages/kashmir-paradise-circuit" className="hover:text-amber-300 transition">
                  Kashmir Paradise Circuit (6D/5N)
                </Link>
              </li>
              <li>
                <Link href="/packages/kashmir-honeymoon-escape" className="hover:text-amber-300 transition">
                  Romantic Kashmir Honeymoon (7D/6N)
                </Link>
              </li>
              <li>
                <Link href="/packages/gurez-frontier-unexplored" className="hover:text-amber-300 transition">
                  Gurez Valley Frontier (5D/4N)
                </Link>
              </li>
              <li>
                <Link href="/packages/leh-ladakh-motorcycle-expedition" className="hover:text-amber-300 transition">
                  Leh Ladakh Khardung La Ride (8D/7N)
                </Link>
              </li>
              <li>
                <Link href="/packages/spiti-valley-high-altitude-circuit" className="hover:text-amber-300 transition">
                  Spiti Valley 4x4 Circuit (8D/7N)
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-amber-400 font-semibold hover:underline flex items-center gap-1">
                  <span>View All 8+ Circuits</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Adventure Rentals Marketplace */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 tracking-wider uppercase">
              Himalayan Rentals
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/bike-rentals/royal-enfield-himalayan-450" className="hover:text-amber-300 transition">
                  Royal Enfield Himalayan 450
                </Link>
              </li>
              <li>
                <Link href="/bike-rentals/ktm-390-adventure" className="hover:text-amber-300 transition">
                  KTM 390 Adventure
                </Link>
              </li>
              <li>
                <Link href="/bike-rentals/royal-enfield-classic-350-reborn" className="hover:text-amber-300 transition">
                  Royal Enfield Classic 350
                </Link>
              </li>
              <li>
                <Link href="/car-rentals/mahindra-thar-4x4-hardtop" className="hover:text-amber-300 transition">
                  Mahindra Thar 4x4 Hardtop
                </Link>
              </li>
              <li>
                <Link href="/car-rentals/toyota-innova-crysta-luxury" className="hover:text-amber-300 transition">
                  Toyota Innova Crysta
                </Link>
              </li>
              <li>
                <Link href="/bike-rentals" className="text-amber-400 font-semibold hover:underline flex items-center gap-1">
                  <span>Compare Bike Specs</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links & Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 tracking-wider uppercase">
              Customer Hub
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/my-bookings" className="hover:text-amber-300 transition flex items-center gap-1">
                  <span>Track Booking Status</span>
                  <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">LIVE</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 transition">
                  Admin Dispatch Portal
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition">
                  About Our Kashmir Roots
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-amber-300 transition">
                  Expedition FAQs & Permits
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-amber-300 transition">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition">
                  Rental Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-300 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 WYYLD MILES Pvt. Ltd. (Kashmir, India). All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Direct Kashmir Base Operations
            </span>
            <span>•</span>
            <span>No Hidden Surcharges</span>
            <span>•</span>
            <span>24x7 Himalayan Breakdown Assist</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
