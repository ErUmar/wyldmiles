'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Hotel,
  MapPin,
  Star,
  Check,
  Calendar,
  Users,
  ArrowLeft,
  Coffee,
  Wifi,
  Flame,
  MessageCircle,
  ShieldCheck,
  Bed,
} from 'lucide-react';
import { Hotel as HotelType, HotelRoom } from '@/types';
import { formatINR, getWhatsAppUrl } from '@/lib/utils';
import BookingModal from '@/components/BookingModal';

interface ClientHotelDetailProps {
  hotel: HotelType;
}

export default function ClientHotelDetail({ hotel }: ClientHotelDetailProps) {
  const [activeImage, setActiveImage] = useState(hotel.heroImage);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(
    hotel.rooms && hotel.rooms.length > 0 ? hotel.rooms[0] : null
  );
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const images = [hotel.heroImage, ...(hotel.gallery || [])].filter(Boolean);
  const effectivePrice = selectedRoom?.price || hotel.pricePerNight;

  const handleWhatsApp = () => {
    const text = `Hi WYLD MILES! I am inquiring about room availability at "${hotel.name}" in ${hotel.location}. Selected room: ${selectedRoom?.type || 'Standard'} (Rate: ${formatINR(effectivePrice)}/night). Please check dates!`;
    window.open(getWhatsAppUrl({ text }), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/hotels" className="flex items-center gap-1 hover:text-wyld-orange transition">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Stays & Houseboats</span>
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{hotel.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Photo Gallery */}
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-elevated bg-gray-100">
            <img src={activeImage} alt={hotel.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-wyld-forest text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {hotel.propertyType}
              </span>
              <span className="bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                {hotel.state}
              </span>
            </div>
            <div className="absolute bottom-4 right-4 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 shadow">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{hotel.rating}</span>
              <span className="text-gray-400 font-normal">({hotel.reviewsCount} sample reviews)</span>
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

          {/* Title & Description */}
          <div className="space-y-3">
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-wyld-forest">
              {hotel.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-wyld-orange shrink-0" />
              <span>{hotel.location}</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pt-2">
              {hotel.description}
            </p>
          </div>

          {/* Room Categories */}
          <div className="bg-white rounded-2xl p-6 shadow-subtle border border-gray-100 space-y-4">
            <h3 className="font-serif text-xl font-bold text-wyld-forest flex items-center gap-2">
              <Bed className="w-5 h-5 text-wyld-orange" />
              <span>Available Room Categories</span>
            </h3>

            <div className="space-y-3">
              {hotel.rooms?.map((room, idx) => {
                const isSelected = selectedRoom?.type === room.type;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-4 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-wyld-orange bg-wyld-orange/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="room"
                          checked={isSelected}
                          onChange={() => setSelectedRoom(room)}
                          className="text-wyld-orange focus:ring-wyld-orange cursor-pointer"
                        />
                        <h4 className="font-bold text-sm text-wyld-forest">{room.type}</h4>
                      </div>
                      <p className="text-xs text-gray-600">
                        {room.bed} • Max {room.occupancy}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {room.features?.map((f, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-white text-gray-600 px-2 py-0.5 rounded border border-gray-200"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right sm:shrink-0">
                      <span className="font-serif text-xl font-bold text-wyld-forest block">
                        {formatINR(room.price)}
                      </span>
                      <span className="text-[10px] text-gray-500">per night</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="bg-white rounded-2xl p-6 shadow-subtle border border-gray-100 space-y-3">
            <h3 className="font-serif text-lg font-bold text-wyld-forest">
              Property Amenities & Facilities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-gray-700">
              {hotel.amenities?.map((am, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-wyld-ivory rounded-lg border border-gray-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Booking Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 sticky top-24 space-y-6">
            <div className="pb-4 border-b border-gray-100">
              <span className="text-xs uppercase text-gray-500 font-semibold block">
                Selected Room: {selectedRoom?.type || 'Standard'}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif text-3xl font-extrabold text-wyld-forest">
                  {formatINR(effectivePrice)}
                </span>
                <span className="text-xs text-gray-500 font-medium">/ night</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                ✓ Includes Breakfast & Mountain View
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-wyld-orange hover:bg-wyld-orangeHover text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Enquire Dates & Stay</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Srinagar Stay Desk</span>
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
              <span className="font-bold text-gray-900 block">Stay Policies:</span>
              <p className="text-[11px] leading-relaxed">
                • Check-in: 12:00 PM | Check-out: 11:00 AM
                <br />
                • Traditional Saffron Kahwa welcome drink on arrival.
                <br />
                • Complimentary Shikara crossing included for houseboats.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        type="HOTEL"
        itemId={hotel.id}
        itemTitle={`${hotel.name} (${selectedRoom?.type || 'Standard'})`}
        basePrice={effectivePrice}
        priceUnit="per night"
      />
    </div>
  );
}
