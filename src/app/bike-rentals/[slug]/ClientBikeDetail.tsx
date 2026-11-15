'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bike,
  Gauge,
  Fuel,
  ShieldCheck,
  Check,
  X as XIcon,
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  FileText,
  AlertTriangle,
  Send,
  MessageCircle,
} from 'lucide-react';
import { Bike as BikeType } from '@/types';
import { formatINR, getWhatsAppUrl } from '@/lib/utils';
import BookingModal from '@/components/BookingModal';

interface ClientBikeDetailProps {
  bike: BikeType;
}

export default function ClientBikeDetail({ bike }: ClientBikeDetailProps) {
  const [activeImage, setActiveImage] = useState(bike.heroImage);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const images = [bike.heroImage, ...(bike.gallery || [])].filter(Boolean);

  const handleWhatsApp = () => {
    const text = `Hi WYLD MILES! I want to check availability for renting the ${bike.name} in Srinagar/Leh. Daily rate: ${formatINR(bike.dailyRate)}. Please share dates and handover location!`;
    window.open(getWhatsAppUrl({ text }), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb & Back */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/bike-rentals" className="flex items-center gap-1 hover:text-wyld-orange transition">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bike Fleet</span>
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{bike.name}</span>
      </div>

      {/* Main Grid: Gallery & Quick Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Images & Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Large Image */}
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-elevated bg-gray-100">
            <img
              src={activeImage}
              alt={bike.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-wyld-forest text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {bike.brand} • {bike.category}
            </span>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                    activeImage === img ? 'border-wyld-orange shadow' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-wyld-forest">
              {bike.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Engineered for rugged Himalayan mountain terrain. Tuned for high-altitude passes, steep gravel inclines, water crossings, and multi-day expedition endurance.
            </p>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="bg-white rounded-2xl p-6 shadow-subtle border border-gray-100 space-y-4">
            <h3 className="font-serif text-lg font-bold text-wyld-forest flex items-center gap-2">
              <Gauge className="w-5 h-5 text-wyld-orange" />
              <span>Technical Specifications</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-wyld-ivory rounded-xl border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Engine Displacement</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{bike.engineCc} cc</span>
              </div>

              <div className="p-3 bg-wyld-ivory rounded-xl border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Max Power</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{bike.powerBhp} bhp</span>
              </div>

              <div className="p-3 bg-wyld-ivory rounded-xl border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Max Torque</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{bike.torqueNm} Nm</span>
              </div>

              <div className="p-3 bg-wyld-ivory rounded-xl border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Transmission</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{bike.transmission}</span>
              </div>

              <div className="p-3 bg-wyld-ivory rounded-xl border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Fuel Tank Capacity</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{bike.fuelCapacityLitres} Litres</span>
              </div>

              <div className="p-3 bg-wyld-ivory rounded-xl border border-gray-200">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">ABS & Braking</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">{bike.absType}</span>
              </div>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl space-y-3">
              <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Rental Inclusions</span>
              </h4>
              <ul className="space-y-2 text-xs text-emerald-950">
                {bike.inclusions?.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/70 border border-rose-200 p-5 rounded-2xl space-y-3">
              <h4 className="font-bold text-sm text-rose-900 flex items-center gap-1.5">
                <XIcon className="w-4 h-4 text-rose-600" />
                <span>Rental Exclusions</span>
              </h4>
              <ul className="space-y-2 text-xs text-rose-950">
                {bike.exclusions?.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Suitable Routes */}
          <div className="bg-white rounded-2xl p-6 shadow-subtle border border-gray-100 space-y-3">
            <h4 className="font-serif text-base font-bold text-wyld-forest flex items-center gap-2">
              <MapPin className="w-4 h-4 text-wyld-orange" />
              <span>Recommended Himalayan Routes for this Motorcycle</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {bike.suitableRoutes?.map((route, i) => (
                <span
                  key={i}
                  className="bg-wyld-ivory text-wyld-forest font-semibold text-xs px-3 py-1.5 rounded-xl border border-gray-200"
                >
                  {route}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Sticky Booking Card & Verification Terms */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 sticky top-24 space-y-6">
            <div className="pb-4 border-b border-gray-100">
              <span className="text-xs uppercase text-gray-500 font-semibold block">Rental Rate</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif text-3xl font-extrabold text-wyld-forest">
                  {formatINR(bike.dailyRate)}
                </span>
                <span className="text-xs text-gray-500 font-medium">/ 24 Hours</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Security Deposit: <strong className="text-gray-900">{formatINR(bike.securityDeposit)}</strong> (Refundable at dropoff)
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-wyld-orange hover:bg-wyld-orangeHover text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve / Enquire Now</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Srinagar Hub</span>
              </button>
            </div>

            {/* Document Checklist */}
            <div className="pt-4 border-t border-gray-100 space-y-3 text-xs text-gray-600">
              <h5 className="font-bold text-gray-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-wyld-forest" />
                <span>Mandatory Documents:</span>
              </h5>
              <ul className="space-y-1.5 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Original Driving Licence (MCWG)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Aadhaar Card / Passport</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Minimum Age: 21 Years</span>
                </li>
              </ul>
            </div>

            {/* Hub info */}
            <div className="bg-wyld-ivory p-3.5 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1">
              <span className="font-bold text-wyld-forest block">Available Pickup Hubs:</span>
              <p className="text-[11px] leading-relaxed">
                • Srinagar Airport Desk & Boulevard Road
                <br />
                • Leh City Centre (Fort Road)
                <br />
                • Manali Mall Road Hub
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        type="BIKE"
        itemId={bike.id}
        itemTitle={bike.name}
        basePrice={bike.dailyRate}
        priceUnit="per day"
      />
    </div>
  );
}
