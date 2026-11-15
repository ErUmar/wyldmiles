'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Hotel,
  MapPin,
  Star,
  Check,
  Filter,
  ArrowRight,
  Sparkles,
  Coffee,
  Wifi,
  Flame,
} from 'lucide-react';
import { Hotel as HotelType } from '@/types';
import { formatINR } from '@/lib/utils';
import BookingModal from '@/components/BookingModal';

interface ClientHotelsProps {
  initialHotels: HotelType[];
}

export default function ClientHotels({ initialHotels }: ClientHotelsProps) {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');

  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    hotel?: HotelType;
  }>({ isOpen: false });

  const filteredHotels = useMemo(() => {
    return initialHotels
      .filter((hotel) => {
        if (selectedType !== 'All' && hotel.propertyType !== selectedType) return false;
        if (selectedState !== 'All' && hotel.state !== selectedState) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.pricePerNight - b.pricePerNight;
        if (sortBy === 'price_high') return b.pricePerNight - a.pricePerNight;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialHotels, selectedType, selectedState, sortBy]);

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Header with Dal Lake Houseboat Photography */}
      <section className="relative bg-[#0E1513] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-400/20">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=85"
            alt="Dal Lake Houseboats Srinagar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Hotel className="w-3.5 h-3.5 text-amber-400" />
            <span>Dal Lake Houseboats & Alpine Mountain Chalets</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-6xl font-black text-white leading-tight uppercase tracking-tight">
            Handpicked Stays & Houseboats
          </h1>
          <p className="text-xs sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Cedarwood houseboats on Dal Lake, ski-in luxury lodges in Gulmarg, and apple orchard chalets in Pahalgam. Handpicked for comfort, heated interiors, and genuine Kashmiri hospitality.
          </p>
        </div>
      </section>

      {/* Filter and Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filters */}
        <div className="bg-white p-5 rounded-2xl shadow-subtle border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
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

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              'All',
              'Heritage Houseboat',
              'Luxury Resort',
              'Apple Orchard Chalet',
              'Alpine Glamping',
              'Boutique Hotel',
            ].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                  selectedType === type
                    ? 'bg-wyld-orange text-white font-bold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

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
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => {
            const amenities = hotel.amenities || [];
            return (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl overflow-hidden shadow-subtle hover:shadow-card transition duration-300 border border-gray-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={hotel.heroImage}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-wyld-forest text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {hotel.propertyType}
                    </span>
                    <div className="absolute bottom-2 right-2 bg-white text-gray-900 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{hotel.rating}</span>
                      <span className="text-[10px] text-gray-400 font-normal">({hotel.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 text-xs">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-wyld-forest group-hover:text-wyld-orange transition line-clamp-1">
                        {hotel.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-wyld-orange shrink-0" />
                        <span className="truncate">{hotel.location}</span>
                      </p>
                    </div>

                    <p className="text-gray-600 line-clamp-2 leading-relaxed">
                      {hotel.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {amenities.slice(0, 3).map((am, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-wyld-ivory text-gray-600 px-2 py-0.5 rounded border border-gray-200"
                        >
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block">Nightly Rate</span>
                    <span className="font-serif text-xl font-bold text-wyld-forest">
                      {formatINR(hotel.pricePerNight)}
                    </span>
                    <span className="text-[10px] text-gray-500"> / night</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/hotels/${hotel.slug}`}
                      className="text-xs font-semibold text-gray-700 hover:text-wyld-forest px-3 py-2 rounded-xl border border-gray-200 bg-white"
                    >
                      View Rooms
                    </Link>
                    <button
                      type="button"
                      onClick={() => setBookingModal({ isOpen: true, hotel })}
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
      {bookingModal.hotel && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={() => setBookingModal({ isOpen: false })}
          type="HOTEL"
          itemId={bookingModal.hotel.id}
          itemTitle={bookingModal.hotel.name}
          basePrice={bookingModal.hotel.pricePerNight}
          priceUnit="per night"
        />
      )}
    </div>
  );
}
