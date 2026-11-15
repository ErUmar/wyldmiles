'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  MapPin,
  Star,
  Check,
  X as XIcon,
  Calendar,
  Users,
  Compass,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Hotel,
  Car,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { TourPackage } from '@/types';
import { formatINR, getWhatsAppUrl } from '@/lib/utils';
import BookingModal from '@/components/BookingModal';

interface ClientPackageDetailProps {
  pkg: TourPackage & { destination?: any };
}

export default function ClientPackageDetail({ pkg }: ClientPackageDetailProps) {
  const [activeImage, setActiveImage] = useState(pkg.heroImage);
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const images = [pkg.heroImage, ...(pkg.gallery || [])].filter(Boolean);
  const activePrice = pkg.discountedPrice || pkg.pricePerPerson;

  const handleWhatsApp = () => {
    const text = `Hi WYLD MILES! I am looking to enquire about the "${pkg.title}" (${pkg.durationNights}N/${pkg.durationDays}D). Rate: ${formatINR(activePrice)}/person. Please share customized dates and available slots!`;
    window.open(getWhatsAppUrl({ text }), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/packages" className="flex items-center gap-1 hover:text-wyld-orange transition">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Tour Packages</span>
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{pkg.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Details, Gallery, Itinerary */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Gallery Banner */}
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-elevated bg-gray-100">
            <img src={activeImage} alt={pkg.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-wyld-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {pkg.travelStyle}
              </span>
              <span className="bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                {pkg.region}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{pkg.durationNights} Nights / {pkg.durationDays} Days</span>
            </div>
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

          {/* Title & Ratings */}
          <div className="space-y-3">
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-wyld-forest">
              {pkg.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{pkg.rating}</span>
                <span className="text-gray-400 font-normal">({pkg.reviewsCount} sample reviews)</span>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-wyld-forest">
                <MapPin className="w-3.5 h-3.5 text-wyld-orange" />
                {pkg.region} Circuit
              </span>
              <span>•</span>
              <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                Difficulty: {pkg.difficulty}
              </span>
            </div>
          </div>

          {/* Day-by-Day Interactive Itinerary */}
          <div className="bg-white rounded-2xl p-6 shadow-subtle border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-wyld-forest flex items-center gap-2">
                <Calendar className="w-5 h-5 text-wyld-orange" />
                <span>Detailed Day-by-Day Itinerary</span>
              </h3>
              <span className="text-xs text-gray-500 font-medium">
                {pkg.itinerary?.length} Days Planned
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {pkg.itinerary?.map((day) => {
                const isExpanded = expandedDay === day.day;
                return (
                  <div
                    key={day.day}
                    className="border border-gray-200 rounded-xl overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedDay(isExpanded ? 0 : day.day)}
                      className="w-full p-4 text-left flex items-center justify-between bg-wyld-ivory/60 hover:bg-wyld-ivory transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-wyld-forest text-white font-serif font-bold flex items-center justify-center text-xs shrink-0">
                          D{day.day}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-wyld-forest">
                            {day.title}
                          </h4>
                          <span className="text-[11px] text-gray-500 font-normal block sm:inline">
                            Overnight Stay: <strong className="text-gray-700">{day.stay}</strong>
                          </span>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-4 bg-white text-xs text-gray-700 space-y-3 border-t border-gray-100 animate-in fade-in">
                        <p className="leading-relaxed">{day.description}</p>
                        {day.highlights && (
                          <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60 text-[11px] text-amber-900">
                            <strong>Day Highlights:</strong> {day.highlights}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl space-y-3">
              <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>What's Included:</span>
              </h4>
              <ul className="space-y-2 text-xs text-emerald-950">
                {pkg.inclusions?.map((inc, i) => (
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
                <span>What's Not Included:</span>
              </h4>
              <ul className="space-y-2 text-xs text-rose-950">
                {pkg.exclusions?.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Sticky Booking Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 sticky top-24 space-y-6">
            <div className="pb-4 border-b border-gray-100">
              <span className="text-xs uppercase text-gray-500 font-semibold block">Package Pricing</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif text-3xl font-extrabold text-wyld-forest">
                  {formatINR(activePrice)}
                </span>
                {pkg.discountedPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatINR(pkg.pricePerPerson)}
                  </span>
                )}
                <span className="text-xs text-gray-500 font-medium">/ person</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                ✓ Includes Stays, Breakfast & Dinner, Private Transport
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-wyld-orange hover:bg-wyld-orangeHover text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Enquire This Package</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Srinagar Concierge</span>
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Customizable Itinerary on Request</span>
              </div>
              <div className="flex items-center gap-2">
                <Hotel className="w-4 h-4 text-wyld-orange shrink-0" />
                <span>Houseboat & Alpine Resort Category Choice</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Dedicated Mountain Chauffeur Assigned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        type="PACKAGE"
        itemId={pkg.id}
        itemTitle={pkg.title}
        basePrice={activePrice}
        priceUnit="per person"
      />
    </div>
  );
}
