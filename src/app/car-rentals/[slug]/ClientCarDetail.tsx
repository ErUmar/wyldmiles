'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Car,
  Users,
  Briefcase,
  ShieldCheck,
  Check,
  X as XIcon,
  ArrowLeft,
  Calendar,
  MessageCircle,
  AlertTriangle,
  FileText,
  Fuel,
} from 'lucide-react';
import { Car as CarType } from '@/types';
import { formatINR, getWhatsAppUrl } from '@/lib/utils';
import BookingModal from '@/components/BookingModal';

interface ClientCarDetailProps {
  car: CarType;
}

export default function ClientCarDetail({ car }: ClientCarDetailProps) {
  const [activeImage, setActiveImage] = useState(car.heroImage);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const images = [car.heroImage, ...(car.gallery || [])].filter(Boolean);

  const handleWhatsApp = () => {
    const text = `Hi WYLD MILES! I am inquiring about the ${car.name} (${car.category}). Daily rate: ${formatINR(car.dailyRate)}. Please confirm availability for my travel dates!`;
    window.open(getWhatsAppUrl({ text }), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/car-rentals" className="flex items-center gap-1 hover:text-wyld-orange transition">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Car Fleet</span>
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{car.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-elevated bg-gray-100">
            <img src={activeImage} alt={car.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-wyld-forest text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {car.brand} • {car.category}
              </span>
              <span className="bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {car.selfDriveAllowed ? 'Self-Drive Eligible' : 'Chauffeur Driven'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-wyld-forest">
              {car.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Designed for comfortable mountain highway touring, rugged high-pass crossings, and family expeditions across Kashmir, Himachal, and Ladakh.
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl p-6 shadow-subtle border border-gray-100 space-y-4">
            <h3 className="font-serif text-lg font-bold text-wyld-forest">
              Vehicle Capabilities & Inclusions
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-wyld-ivory rounded-xl border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Passenger Seats</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{car.seats} Persons</span>
              </div>
              <div className="p-3 bg-wyld-ivory rounded-xl border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Luggage Capacity</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{car.luggageBags} Standard Bags</span>
              </div>
              <div className="p-3 bg-wyld-ivory rounded-xl border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Transmission</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{car.transmission}</span>
              </div>
              <div className="p-3 bg-wyld-ivory rounded-xl border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Fuel Type</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{car.fuelType}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold text-gray-800 block mb-2">Equipped Features:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {car.features?.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 sticky top-24 space-y-6">
            <div className="pb-4 border-b border-gray-100">
              <span className="text-xs uppercase text-gray-500 font-semibold block">Rental Rate</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif text-3xl font-extrabold text-wyld-forest">
                  {formatINR(car.dailyRate)}
                </span>
                <span className="text-xs text-gray-500 font-medium">/ 24 Hours</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Minimum Rental Duration: <strong className="text-gray-900">{car.minDays} Days</strong>
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-wyld-forest hover:bg-wyld-forestDark text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Enquire / Book Vehicle</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Srinagar Fleet Desk</span>
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
              <span className="font-bold text-gray-900 block">Rental Policies & Inclusions:</span>
              <p className="text-[11px] leading-relaxed">
                • Commercial permits for J&K, HP and Ladakh included.
                <br />
                • Chauffeur night allowance (₹500/night) applicable on outstation trips.
                <br />
                • Snow chains available on demand for Gulmarg & Zojila winter drives.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        type="CAR"
        itemId={car.id}
        itemTitle={car.name}
        basePrice={car.dailyRate}
        priceUnit="per day"
      />
    </div>
  );
}
