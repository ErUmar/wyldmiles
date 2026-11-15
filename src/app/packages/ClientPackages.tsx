'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Clock,
  Star,
  Check,
  Filter,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { TourPackage } from '@/types';
import { formatINR } from '@/lib/utils';
import BookingModal from '@/components/BookingModal';

interface ClientPackagesProps {
  initialPackages: TourPackage[];
  initialRegion?: string;
  initialStyle?: string;
}

export default function ClientPackages({
  initialPackages,
  initialRegion = 'All',
  initialStyle = 'All',
}: ClientPackagesProps) {
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'duration'>('featured');

  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    pkg?: TourPackage;
  }>({ isOpen: false });

  const filteredPackages = useMemo(() => {
    return initialPackages
      .filter((pkg) => {
        if (selectedRegion !== 'All' && pkg.region !== selectedRegion) return false;
        if (selectedStyle !== 'All' && pkg.travelStyle !== selectedStyle) return false;
        if (selectedDuration === 'short' && pkg.durationDays > 5) return false;
        if (selectedDuration === 'medium' && (pkg.durationDays < 6 || pkg.durationDays > 7)) return false;
        if (selectedDuration === 'long' && pkg.durationDays < 8) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') {
          const priceA = a.discountedPrice || a.pricePerPerson;
          const priceB = b.discountedPrice || b.pricePerPerson;
          return priceA - priceB;
        }
        if (sortBy === 'price_high') {
          const priceA = a.discountedPrice || a.pricePerPerson;
          const priceB = b.discountedPrice || b.pricePerPerson;
          return priceB - priceA;
        }
        if (sortBy === 'duration') return b.durationDays - a.durationDays;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialPackages, selectedRegion, selectedStyle, selectedDuration, sortBy]);

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Header with Kashmir Adventure Photography */}
      <section className="relative bg-[#0E1513] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-400/20">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=85"
            alt="Kashmir Himalayan landscape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Kashmir & Himalayan Expeditions</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-6xl font-black text-white leading-tight uppercase tracking-tight">
            Tour Packages & Circuits
          </h1>
          <p className="text-xs sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Thoughtfully planned circuits across Kashmir, Ladakh, and Himachal. Handpicked Dal Lake cedar houseboats, private mountain chauffeur SUVs, and 24/7 direct Srinagar operations.
          </p>
        </div>
      </section>

      {/* Filter and Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-subtle border border-gray-100 space-y-4 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Region Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-wyld-orange" />
                Region:
              </span>
              {['All', 'Kashmir', 'Himachal', 'Uttarakhand', 'Ladakh'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    selectedRegion === reg
                      ? 'bg-wyld-forest text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-semibold">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 text-gray-900 font-bold p-1.5 rounded-lg border border-gray-200 focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="duration">Longest Duration</option>
              </select>
            </div>
          </div>

          {/* Sub Filters: Travel Style and Duration */}
          <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">
                Travel Style:
              </span>
              {['All', 'Honeymoon', 'Family', 'Adventure', 'Bike Expedition'].map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                    selectedStyle === style
                      ? 'bg-wyld-orange text-white font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">
                Duration:
              </span>
              {[
                { label: 'All', val: 'All' },
                { label: '4-5 Days', val: 'short' },
                { label: '6-7 Days', val: 'medium' },
                { label: '8+ Days', val: 'long' },
              ].map((dur) => (
                <button
                  key={dur.val}
                  onClick={() => setSelectedDuration(dur.val)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                    selectedDuration === dur.val
                      ? 'bg-wyld-forest text-white font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const inclusions = pkg.inclusions || [];
            return (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl overflow-hidden shadow-subtle hover:shadow-card transition duration-300 border border-gray-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                    <img
                      src={pkg.heroImage}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-wyld-orange text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        {pkg.travelStyle}
                      </span>
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {pkg.region}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-amber-300 text-xs font-semibold px-3 py-1 rounded-lg flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{pkg.durationNights}N / {pkg.durationDays}D</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white text-gray-900 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{pkg.rating}</span>
                      <span className="text-[10px] text-gray-400 font-normal">({pkg.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-serif text-lg font-bold text-wyld-forest group-hover:text-wyld-orange transition line-clamp-2">
                      {pkg.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-gray-600">
                      {inclusions.slice(0, 3).map((inc, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block">Starting from</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-xl font-bold text-wyld-forest">
                        {formatINR(pkg.discountedPrice || pkg.pricePerPerson)}
                      </span>
                      {pkg.discountedPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatINR(pkg.pricePerPerson)}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-500">/ person</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="text-xs font-semibold text-gray-700 hover:text-wyld-forest px-3 py-2 rounded-xl border border-gray-200 bg-white"
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => setBookingModal({ isOpen: true, pkg })}
                      className="bg-wyld-orange hover:bg-wyld-orangeHover text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow transition"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Booking Modal */}
      {bookingModal.pkg && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={() => setBookingModal({ isOpen: false })}
          type="PACKAGE"
          itemId={bookingModal.pkg.id}
          itemTitle={bookingModal.pkg.title}
          basePrice={bookingModal.pkg.discountedPrice || bookingModal.pkg.pricePerPerson}
          priceUnit="per person"
        />
      )}
    </div>
  );
}
