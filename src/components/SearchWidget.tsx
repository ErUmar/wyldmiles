'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Compass,
  Bike,
  Hotel,
  Car,
  MapPin,
  Calendar,
  Users,
  Search,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function SearchWidget() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'packages' | 'bikes' | 'hotels' | 'cars'>('packages');

  // Fields
  const [dest, setDest] = useState('Srinagar, Kashmir');
  const [checkIn, setCheckIn] = useState('2026-11-20');
  const [checkOut, setCheckOut] = useState('2026-11-26');
  const [guests, setGuests] = useState('2 People');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'packages') {
      router.push(`/packages?region=${encodeURIComponent(dest)}&date=${checkIn}&travellers=${guests}`);
    } else if (activeTab === 'bikes') {
      router.push(`/bike-rentals?location=${encodeURIComponent(dest)}&pickup=${checkIn}&returnDate=${checkOut}`);
    } else if (activeTab === 'hotels') {
      router.push(`/hotels?destination=${encodeURIComponent(dest)}&checkin=${checkIn}&checkout=${checkOut}`);
    } else if (activeTab === 'cars') {
      router.push(`/car-rentals?location=${encodeURIComponent(dest)}&pickup=${checkIn}&returnDate=${checkOut}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#0E1513]/90 backdrop-blur-xl rounded-[28px] p-4 sm:p-6 shadow-2xl border border-amber-400/30 text-white">
      {/* Top Segmented Pill Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-1 sm:gap-2 overflow-x-auto pb-3 sm:pb-5 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('packages')}
          className={`flex items-center gap-2 py-2.5 px-4 sm:px-6 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'packages'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-lg shadow-amber-500/20'
              : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Tour Packages</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bikes')}
          className={`flex items-center gap-2 py-2.5 px-4 sm:px-6 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'bikes'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-lg shadow-amber-500/20'
              : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Bike className="w-4 h-4" />
          <span>Bike Rentals (450 ADV)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hotels')}
          className={`flex items-center gap-2 py-2.5 px-4 sm:px-6 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'hotels'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-lg shadow-amber-500/20'
              : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Hotel className="w-4 h-4" />
          <span>Hotels & Houseboats</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cars')}
          className={`flex items-center gap-2 py-2.5 px-4 sm:px-6 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'cars'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-lg shadow-amber-500/20'
              : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Car & 4x4s</span>
        </button>
      </div>

      {/* Horizontal Form Grid */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        {/* Destination Selector */}
        <div className="lg:col-span-4 p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition">
          <label className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
            {activeTab === 'bikes' || activeTab === 'cars' ? 'Pickup Location' : 'Destination'}
          </label>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={dest}
              onChange={(e) => setDest(e.target.value)}
              className="w-full bg-transparent font-bold text-white text-xs focus:outline-none cursor-pointer"
            >
              <optgroup label="Kashmir (Our Base)">
                <option value="Srinagar, Kashmir" className="bg-gray-900 text-white">Srinagar - Dal Lake & Airport Hub</option>
                <option value="Gulmarg, Kashmir" className="bg-gray-900 text-white">Gulmarg - Apharwat Ski Peak (8,690 ft)</option>
                <option value="Pahalgam, Kashmir" className="bg-gray-900 text-white">Pahalgam - Betaab & Lidder Valley</option>
                <option value="Sonamarg, Kashmir" className="bg-gray-900 text-white">Sonamarg - Thajiwas & Zojila Pass</option>
                <option value="Gurez Valley, Kashmir" className="bg-gray-900 text-white">Gurez Valley - Habba Khatoon (7,874 ft)</option>
                <option value="Doodhpathri, Kashmir" className="bg-gray-900 text-white">Doodhpathri - Meadow of Milk</option>
              </optgroup>
              <optgroup label="Ladakh & Himachal">
                <option value="Leh, Ladakh" className="bg-gray-900 text-white">Leh, Ladakh - Khardung La (17,582 ft)</option>
                <option value="Manali, Himachal" className="bg-gray-900 text-white">Manali, Himachal - Atal Tunnel</option>
                <option value="Spiti Valley, Himachal" className="bg-gray-900 text-white">Spiti Valley - Kunzum Pass</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Date Pickers */}
        <div className="lg:col-span-3 p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition">
          <label className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
            {activeTab === 'packages' ? 'Travel Date' : 'Check-in / Pickup'}
          </label>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent font-bold text-white text-xs focus:outline-none [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Guests / Riders */}
        <div className="lg:col-span-3 p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition">
          <label className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
            {activeTab === 'bikes' ? 'Riders & Pillion' : 'Travellers & Guests'}
          </label>
          <div className="flex items-center gap-2 mt-1">
            <Users className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent font-bold text-white text-xs focus:outline-none cursor-pointer"
            >
              <option value="1 Person" className="bg-gray-900 text-white">1 Solo Rider / Traveler</option>
              <option value="2 People" className="bg-gray-900 text-white">2 People (Couple / Duo)</option>
              <option value="4 People" className="bg-gray-900 text-white">4 People (Family / Group)</option>
              <option value="6+ People" className="bg-gray-900 text-white">6+ People (Expedition Convoy)</option>
            </select>
          </div>
        </div>

        {/* Search Submit Button */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-extrabold text-xs sm:text-sm py-4 px-4 rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 group"
          >
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>

      {/* Trust micro-text below search */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-gray-300">
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          ✓ Verified Fleet in Srinagar & Airport Pickup Available
        </span>
        <span className="text-gray-400">
          Instant WhatsApp Confirmation • Zero Middleman Markup
        </span>
      </div>
    </div>
  );
}
