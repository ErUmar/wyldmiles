'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, ShieldCheck, ArrowUpRight, MapPin } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#080E0C] text-gray-300 text-xs py-2 px-4 border-b border-amber-400/20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 px-2.5 py-0.5 rounded-full font-extrabold text-[10px] tracking-wide uppercase">
            Kashmir Base
          </span>
          <span className="text-gray-200 font-medium text-[11px]">
            Discover the Himalayas with WYYLD MILES • Handcrafted Kashmir Circuits, Heritage Houseboats & Mountain 450 Fleet
          </span>
        </div>
        <div className="flex items-center gap-4 text-gray-400 text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Fleet in Srinagar
          </span>
          <span className="hidden md:inline text-gray-600">•</span>
          <Link
            href="tel:+919876543210"
            className="flex items-center gap-1 hover:text-amber-300 transition"
          >
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Srinagar HQ: +91 98765 43210</span>
          </Link>
          <span className="hidden md:inline text-gray-600">•</span>
          <Link
            href="/my-bookings"
            className="text-gray-300 hover:text-amber-300 transition flex items-center gap-0.5"
          >
            <span>Track Booking</span>
            <ArrowUpRight className="w-3 h-3 text-amber-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
