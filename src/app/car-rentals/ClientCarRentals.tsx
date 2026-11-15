'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Car,
  Users,
  Briefcase,
  ShieldCheck,
  Check,
  Filter,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { Car as CarType } from '@/types';
import { formatINR } from '@/lib/utils';
import BookingModal from '@/components/BookingModal';

interface ClientCarRentalsProps {
  initialCars: CarType[];
}

export default function ClientCarRentals({ initialCars }: ClientCarRentalsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDriveMode, setSelectedDriveMode] = useState<'All' | 'Self-Drive' | 'Chauffeur'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'seats'>('featured');

  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    car?: CarType;
  }>({ isOpen: false });

  const filteredCars = useMemo(() => {
    return initialCars
      .filter((car) => {
        if (selectedCategory !== 'All' && car.category !== selectedCategory) return false;
        if (selectedDriveMode === 'Self-Drive' && !car.selfDriveAllowed) return false;
        if (selectedDriveMode === 'Chauffeur' && !car.driverIncluded) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.dailyRate - b.dailyRate;
        if (sortBy === 'price_high') return b.dailyRate - a.dailyRate;
        if (sortBy === 'seats') return b.seats - a.seats;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialCars, selectedCategory, selectedDriveMode, sortBy]);

  return (
    <div className="space-y-12 pb-24">
      {/* 1. HERO SECTION WITH KASHMIR 4X4 ADVENTURE */}
      <section className="relative bg-[#0E1513] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-400/20">
        <div className="absolute inset-0 z-0 opacity-35">
          <img
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2000&q=85"
            alt="4x4 Vehicle on rugged mountain road"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Car className="w-4 h-4 text-amber-400" />
            <span>Kashmir 4x4 & SUV Fleet • Thar, Scorpio-N & Innova</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-6xl font-black text-white max-w-3xl leading-tight uppercase tracking-tight">
            Take the Scenic Route.
          </h1>

          <p className="text-xs sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            From winding pine valleys in Pahalgam to rocky trails in Gurez and high mountain passes in Ladakh. Self-drive Mahindra Thar 4x4 or relax with verified Kashmiri mountain chauffeurs.
          </p>

          <div className="pt-2 text-xs text-amber-200 flex items-center gap-2 bg-black/40 backdrop-blur-md p-3 rounded-xl max-w-3xl border border-amber-500/30">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Regulatory Advisory:</strong> Self-drive permits and outstation commercial clearances are subject to union regulations across high passes (e.g. Rohtang Pass, Leh inner line). Our Srinagar operations desk handles all necessary route permits.
            </span>
          </div>
        </div>
      </section>

      {/* 2. FILTER BAR & CAR GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-subtle border border-gray-100 text-xs">
          {/* Drive Mode Tabs */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">
              Preference:
            </span>
            {(['All', 'Self-Drive', 'Chauffeur'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedDriveMode(mode)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  selectedDriveMode === mode
                    ? 'bg-wyld-forest text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', '4x4 Off-roader', 'Premium SUV', 'Premium MPV', 'Compact SUV', 'Luxury Van', 'Tempo', 'Hatchback'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-wyld-orange text-white font-bold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-50 text-gray-900 font-bold p-1.5 rounded-lg border border-gray-200 focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="seats">Most Seats</option>
            </select>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => {
            const features = car.features || [];
            return (
              <div
                key={car.id}
                className="bg-white rounded-2xl overflow-hidden shadow-subtle hover:shadow-card transition duration-300 border border-gray-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={car.heroImage}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-wyld-forest text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {car.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {car.selfDriveAllowed ? 'Self-Drive' : 'Chauffeur Included'}
                    </span>
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <div>
                      <h3 className="font-serif text-base font-bold text-wyld-forest line-clamp-1 group-hover:text-wyld-orange transition">
                        {car.name}
                      </h3>
                      <p className="text-[11px] text-gray-500">{car.brand}</p>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700 bg-wyld-ivory/80 p-2 rounded-xl text-[11px]">
                      <span className="flex items-center gap-1 font-semibold">
                        <Users className="w-3.5 h-3.5 text-wyld-orange" />
                        {car.seats} Seats
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-gray-500" />
                        {car.luggageBags} Bags
                      </span>
                      <span>•</span>
                      <span>{car.transmission}</span>
                    </div>

                    <div className="space-y-1 pt-1 text-[11px] text-gray-600">
                      {features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block">Daily Rate</span>
                    <span className="font-serif text-lg font-bold text-wyld-forest">
                      {formatINR(car.dailyRate)}
                    </span>
                    <span className="text-[10px] text-gray-500"> / day</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/car-rentals/${car.slug}`}
                      className="text-xs font-semibold text-gray-600 hover:text-wyld-forest px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white"
                    >
                      Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => setBookingModal({ isOpen: true, car })}
                      className="bg-wyld-forest hover:bg-wyld-forestDark text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow transition"
                    >
                      Book Car
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Booking Modal */}
      {bookingModal.car && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={() => setBookingModal({ isOpen: false })}
          type="CAR"
          itemId={bookingModal.car.id}
          itemTitle={bookingModal.car.name}
          basePrice={bookingModal.car.dailyRate}
          priceUnit="per day"
        />
      )}
    </div>
  );
}
