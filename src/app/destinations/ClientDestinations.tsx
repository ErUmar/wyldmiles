'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Compass,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { Destination } from '@/types';

interface ClientDestinationsProps {
  initialDestinations: Destination[];
  initialState?: string;
}

export default function ClientDestinations({
  initialDestinations,
  initialState = 'All',
}: ClientDestinationsProps) {
  const [selectedState, setSelectedState] = useState(initialState);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return initialDestinations.filter((d) => {
      if (selectedState !== 'All' && d.state !== selectedState) return false;
      if (
        searchQuery.trim() &&
        !d.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !d.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [initialDestinations, selectedState, searchQuery]);

  return (
    <div className="space-y-12 pb-24">
      {/* Hero with Breathtaking Kashmir Landscapes */}
      <section className="relative bg-[#0E1513] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-400/20">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2000&q=85"
            alt="Kashmir Mountain Peaks"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Kashmir, Ladakh, Himachal & Uttarakhand</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-6xl font-black text-white leading-tight uppercase tracking-tight">
            Explore Himalayan Destinations
          </h1>
          <p className="text-xs sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Detailed guides to high mountain regions across Kashmir and the Himalayas. Discover elevations, best travel windows, permit requirements, and local road connections.
          </p>
        </div>
      </section>

      {/* Filter and Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* State Tabs & Search */}
        <div className="bg-white p-4 rounded-2xl shadow-subtle border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">
              Region:
            </span>
            {['All', 'Kashmir', 'Himachal', 'Uttarakhand', 'Ladakh'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  selectedState === st
                    ? 'bg-wyld-forest text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, valley..."
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
            />
          </div>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-subtle hover:shadow-card transition duration-300 border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-wyld-forest/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {dest.state}
                  </span>
                  {dest.permitRequired && (
                    <span className="absolute top-3 right-3 bg-amber-500 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Permit
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-xl font-bold text-white">{dest.name}</h3>
                    <p className="text-[11px] text-wyld-ivory/90 line-clamp-1">{dest.tagline}</p>
                  </div>
                </div>

                <div className="p-4 space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-wyld-orange shrink-0" />
                    <span className="text-[11px] line-clamp-1">
                      <strong>Best Season:</strong> {dest.bestSeason}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-[11px]">
                      <strong>Altitude:</strong> {dest.altitude}
                    </span>
                  </div>

                  <p className="text-gray-500 line-clamp-2 pt-1 text-[11px] leading-relaxed">
                    {dest.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-gray-100 flex items-center justify-between font-bold text-xs text-wyld-forest group-hover:text-wyld-orange transition">
                <span>Explore Packages & Stays</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
