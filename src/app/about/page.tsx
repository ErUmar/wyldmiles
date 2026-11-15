import React from 'react';
import Link from 'next/link';
import { Compass, Mountain, ShieldCheck, Heart, Users, MapPin, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | WYYLD MILES – Wander. Yearn. Live. Discover. (Kashmir)',
  description:
    'Rooted in Srinagar, Kashmir. WYYLD MILES bridges luxury boutique hospitality, high-altitude motorcycle expeditions, and tailored Himalayan road trips.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-24">
      {/* Hero with Brand Logo */}
      <section className="relative bg-[#0E1513] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-amber-400/20 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
          <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-2xl mx-auto bg-black">
            <img src="/logo.jpg" alt="WYYLD MILES" className="w-full h-full object-cover" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-widest">
            <span>Born in Srinagar, Kashmir</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-6xl font-black text-white leading-tight uppercase tracking-tight">
            WYYLD<span className="text-amber-400"> MILES</span>
          </h1>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-amber-400/60" />
            <p className="text-xs sm:text-sm tracking-[0.28em] text-amber-300 font-extrabold uppercase">
              WANDER. YEARN. LIVE. DISCOVER.
            </p>
            <div className="h-[1px] w-8 bg-amber-400/60" />
          </div>

          <p className="text-xs sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            WYYLD MILES was founded by Kashmiri mountain pilots, seasoned expedition riders, and boutique hospitality hosts with an enduring love for our Himalayan homeland.
          </p>
        </div>
      </section>

      {/* Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-elevated h-96 lg:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80"
              alt="Kashmir valley landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs font-bold text-wyld-orange uppercase tracking-wider block">
                Local Presence
              </span>
              <h3 className="font-serif text-2xl font-bold">Base Camp: Srinagar, Dal Lake</h3>
            </div>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wyld-forest">
              More Than a Travel Agency. We are Mountain Gateways.
            </h2>
            <p>
              The Himalayas are not merely destinations to be ticked off a list. They are ancient, living landscapes demanding reverence, preparedness, and local intuition.
            </p>
            <p>
              At WYLD MILES, we recognized a glaring disconnect: corporate travel portals treating high-altitude mountain travel like cookie-cutter city breaks, while informal local agents struggled to deliver modern reliability, vehicle mechanical safety, and transparent pricing.
            </p>
            <p>
              We established our central base on Boulevard Road along Dal Lake in Srinagar. Here, we oversee hand-carved heritage cedar houseboats, maintain our dedicated fleet of Royal Enfield Himalayan 450s and 4x4s, and brief every driver and rider on high mountain passes like Zojila, Rohtang, and Khardung La.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-subtle space-y-1">
                <span className="font-serif text-2xl font-bold text-wyld-forest">16+</span>
                <span className="text-xs text-gray-500 block">Himalayan Destinations Covered</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-subtle space-y-1">
                <span className="font-serif text-2xl font-bold text-wyld-orange">100%</span>
                <span className="text-xs text-gray-500 block">Ground Verified Fleet & Stays</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="bg-wyld-ivory py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-wyld-orange uppercase tracking-wider">
              Our Principles
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-wyld-forest">
              The Three Pillars of WYLD MILES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-wyld-forest">
                Rider & Traveller Safety First
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Emergency mountain toolkits, puncture repair kits, secondary fuel cans, and portable medical oxygen cylinders accompany every high-altitude expedition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-xl bg-wyld-orange/15 text-wyld-orange flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-wyld-forest">
                Authentic Boutique Hospitality
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We champion family-run cedar houseboats on Dal Lake, apple orchard chalets in Pahalgam, and traditional Ladakhi earthen residences over soulless concrete chains.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-subtle space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-600 flex items-center justify-center font-bold">
                <Mountain className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-wyld-forest">
                Eco-Conscious Mountain Pledge
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We strictly practice Leave No Trace principles on high-altitude passes, support local shepherd communities, and promote responsible single-use plastic reduction.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
