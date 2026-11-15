'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Bike,
  Gauge,
  Fuel,
  ShieldCheck,
  Check,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Filter,
  ArrowRight,
  Info,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { Bike as BikeType } from '@/types';
import { formatINR } from '@/lib/utils';
import BookingModal from '@/components/BookingModal';
import BikeCompareModal from '@/components/BikeCompareModal';

interface ClientBikeRentalsProps {
  initialBikes: BikeType[];
}

export default function ClientBikeRentals({ initialBikes }: ClientBikeRentalsProps) {
  // Search and filter state
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pickupCity, setPickupCity] = useState('Srinagar');
  const [pickupDate, setPickupDate] = useState('2026-11-20');
  const [returnDate, setReturnDate] = useState('2026-11-26');
  const [pickupTime, setPickupTime] = useState('09:00 AM');
  const [riderAge, setRiderAge] = useState('25+');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'engine'>('featured');

  // Bike Compare State
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Booking Modal State
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    bike?: BikeType;
  }>({ isOpen: false });

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const filteredBikes = useMemo(() => {
    return initialBikes
      .filter((b) => {
        if (selectedBrand !== 'All' && b.brand !== selectedBrand) return false;
        if (selectedCategory !== 'All' && b.category !== selectedCategory) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.dailyRate - b.dailyRate;
        if (sortBy === 'price_high') return b.dailyRate - a.dailyRate;
        if (sortBy === 'engine') return b.engineCc - a.engineCc;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialBikes, selectedBrand, selectedCategory, sortBy]);

  const comparedBikes = initialBikes.filter((b) => compareIds.includes(b.id));

  return (
    <div className="space-y-12 pb-24">
      {/* 1. HERO SECTION WITH KASHMIR ADVENTURE RIDING */}
      <section className="relative bg-[#0E1513] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-400/20">
        <div className="absolute inset-0 z-0 opacity-35">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=2000&q=85"
            alt="Motorcycle on Himalayan Snow Pass"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Bike className="w-4 h-4 text-amber-400" />
            <span>Kashmir Flagship Fleet • Royal Enfield Himalayan 450</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-6xl font-black text-white max-w-3xl leading-tight uppercase tracking-tight">
            Find Your Ride. Chase the Mountains.
          </h1>

          <p className="text-xs sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Experience the Himalayas on two wheels. Royal Enfield Himalayan 450, Classic 350, and KTM 390 Adventure. Verified machines with heavy-duty pannier racks, crash guards, and 24/7 mountain breakdown assistance.
          </p>

          {/* Quick Pick Hub Bar */}
          <div className="pt-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-wyld-sage block mb-1">
                Pickup Hub
              </label>
              <select
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
                className="w-full bg-wyld-forest/90 text-white font-bold p-2 rounded-lg border border-white/10 focus:outline-none"
              >
                <option value="Srinagar">Srinagar (Airport / Boulevard)</option>
                <option value="Leh">Leh (Fort Road / Airport)</option>
                <option value="Manali">Manali (Mall Road)</option>
                <option value="Rishikesh">Rishikesh (Tapovan)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-wyld-sage block mb-1">
                Pickup Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-wyld-forest/90 text-white font-bold p-2 rounded-lg border border-white/10 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-wyld-sage block mb-1">
                Return Date
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-wyld-forest/90 text-white font-bold p-2 rounded-lg border border-white/10 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-wyld-sage block mb-1">
                Time
              </label>
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full bg-wyld-forest/90 text-white font-bold p-2 rounded-lg border border-white/10 focus:outline-none"
              >
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-wyld-sage block mb-1">
                Rider Age
              </label>
              <select
                value={riderAge}
                onChange={(e) => setRiderAge(e.target.value)}
                className="w-full bg-wyld-forest/90 text-white font-bold p-2 rounded-lg border border-white/10 focus:outline-none"
              >
                <option value="21-24">21 - 24 years</option>
                <option value="25+">25+ years (Standard)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {}}
                className="w-full bg-wyld-orange hover:bg-wyld-orangeHover text-white font-bold p-2 rounded-lg shadow transition text-center"
              >
                Filter Fleet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLEET LISTINGS & COMPARISON BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-subtle border border-gray-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-wyld-orange" />
              Brand:
            </span>
            {['All', 'Royal Enfield', 'KTM', 'Bajaj', 'BMW'].map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  selectedBrand === brand
                    ? 'bg-wyld-forest text-white font-bold shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {compareIds.length > 0 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Compare ({compareIds.length})</span>
              </button>
            )}

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
                <option value="engine">Highest Displacement (cc)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bike Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBikes.map((bike) => {
            const isCompared = compareIds.includes(bike.id);
            return (
              <div
                key={bike.id}
                className="bg-white rounded-2xl overflow-hidden shadow-subtle hover:shadow-card transition duration-300 border border-gray-100 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with Overlay Badges */}
                  <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={bike.heroImage}
                      alt={bike.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-wyld-forest text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        {bike.brand}
                      </span>
                      {bike.featured && (
                        <span className="bg-wyld-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-lg flex items-center justify-between font-semibold">
                      <span>{bike.absType}</span>
                      <span className="text-emerald-300">Carrier Installed</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-3 text-xs">
                    <div>
                      <h3 className="font-serif text-base font-bold text-wyld-forest line-clamp-1 group-hover:text-wyld-orange transition">
                        {bike.name}
                      </h3>
                      <p className="text-[11px] text-gray-500">{bike.category}</p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-wyld-ivory/80 p-2.5 rounded-xl text-[11px] text-gray-700">
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-wyld-orange" />
                        <span>{bike.engineCc} cc</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Fuel className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{bike.fuelCapacityLitres} L Fuel</span>
                      </div>
                      <div className="col-span-2 text-[10px] text-gray-500 border-t border-gray-200/60 pt-1 flex justify-between">
                        <span>
                          <strong>Power:</strong> {bike.powerBhp} bhp
                        </span>
                        <span>
                          <strong>Torque:</strong> {bike.torqueNm} Nm
                        </span>
                      </div>
                    </div>

                    {/* Inclusions summary */}
                    <div className="space-y-1 text-[11px] text-gray-600">
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complimentary ISI Rider Helmet</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Rear Pannier Luggage Stay & Bungee Cords</span>
                      </div>
                    </div>

                    {/* Compare & Deposit */}
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[11px]">
                      <label className="flex items-center gap-1.5 cursor-pointer text-gray-600 hover:text-wyld-forest select-none">
                        <input
                          type="checkbox"
                          checked={isCompared}
                          onChange={() => toggleCompare(bike.id)}
                          className="rounded text-wyld-orange focus:ring-wyld-orange cursor-pointer"
                        />
                        <span className="font-medium">Compare Spec</span>
                      </label>
                      <span className="text-gray-500 text-[10px]">
                        Deposit: <strong>{formatINR(bike.securityDeposit)}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Price and Book */}
                <div className="p-4 pt-2 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block">Daily Rental</span>
                    <span className="font-serif text-lg font-bold text-wyld-forest">
                      {formatINR(bike.dailyRate)}
                    </span>
                    <span className="text-[10px] text-gray-500"> / day</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/bike-rentals/${bike.slug}`}
                      className="text-xs font-semibold text-gray-600 hover:text-wyld-forest px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white"
                    >
                      Specs
                    </Link>
                    <button
                      type="button"
                      onClick={() => setBookingModal({ isOpen: true, bike })}
                      className="bg-wyld-orange hover:bg-wyld-orangeHover text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow transition active:scale-98"
                    >
                      Book Ride
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HIMALAYAN MOTORCYCLE EXPEDITION RULES & ESSENTIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-wyld-charcoalDark text-wyld-ivory rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-wyld-orange text-xs font-bold uppercase tracking-wider">
              Mountain Pilot Advisory
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Himalayan Motorbike Rental Rules & Verification
            </h3>
            <p className="text-xs text-wyld-sage leading-relaxed">
              Before setting out on the Zojila pass, Khardung La, or Spiti circuit, review our standard requirements designed to ensure rider safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-wyld-ivory/90">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Documents & Licences</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-[11px]">
                Valid original Indian Driving Licence (MCWG) or International Driving Permit (IDP) required. Original Aadhaar or Passport copy verified at key handover.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Fuel className="w-4 h-4" />
                <span>Security Deposit & Refunds</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-[11px]">
                Refundable security deposit (₹5,000 to ₹12,000 depending on bike model) processed via UPI/Netbanking immediately after vehicle return inspection.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Leh Union & Permit Rules</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-[11px]">
                Outside state bikes are permitted to travel from Srinagar/Manali to Leh city. Sightseeing to Nubra/Pangong follows local union guidelines which we assist with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {bookingModal.bike && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={() => setBookingModal({ isOpen: false })}
          type="BIKE"
          itemId={bookingModal.bike.id}
          itemTitle={bookingModal.bike.name}
          basePrice={bookingModal.bike.dailyRate}
          priceUnit="per day"
        />
      )}

      <BikeCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        bikes={comparedBikes}
        onBookBike={(bike) => setBookingModal({ isOpen: true, bike })}
      />
    </div>
  );
}
