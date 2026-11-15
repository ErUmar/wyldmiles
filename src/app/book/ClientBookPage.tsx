'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  AlertCircle,
  Compass,
  Bike,
  Car,
  Hotel,
} from 'lucide-react';
import { formatINR, getWhatsAppUrl } from '@/lib/utils';

interface ClientBookPageProps {
  packages: any[];
  bikes: any[];
  cars: any[];
  hotels: any[];
  initialType?: string;
  initialId?: string;
}

export default function ClientBookPage({
  packages,
  bikes,
  cars,
  hotels,
  initialType = 'PACKAGE',
  initialId,
}: ClientBookPageProps) {
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedItemId, setSelectedItemId] = useState<string>(initialId || '');
  const [startDate, setStartDate] = useState('2026-11-25');
  const [endDate, setEndDate] = useState('2026-11-30');
  const [guestsCount, setGuestsCount] = useState(2);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Srinagar Base');
  const [specialRequests, setSpecialRequests] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Determine current items list based on selectedType
  const currentItems =
    selectedType === 'BIKE'
      ? bikes
      : selectedType === 'CAR'
      ? cars
      : selectedType === 'HOTEL'
      ? hotels
      : packages;

  // Selected item object
  const activeItem =
    currentItems.find((item) => item.id === selectedItemId) || currentItems[0];

  const getPrice = () => {
    if (!activeItem) return 0;
    if (selectedType === 'PACKAGE') return (activeItem.discountedPrice || activeItem.pricePerPerson) * guestsCount;
    if (selectedType === 'HOTEL') return activeItem.pricePerNight * guestsCount;
    return activeItem.dailyRate || 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail) {
      setErrorMsg('Please enter your name, phone, and email.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType,
          itemId: activeItem?.id,
          itemTitle: activeItem?.title || activeItem?.name || 'Custom Himalayan Trip',
          customerName,
          customerEmail,
          customerPhone,
          startDate,
          endDate,
          guestsCount,
          pickupLocation,
          specialRequests,
          estimatedTotal: getPrice(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReference(data.reference);
      } else {
        setErrorMsg(data.error || 'Failed to submit enquiry.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-3 bg-[#0E1513] px-4 py-2 rounded-full border border-amber-400/30 text-white shadow-lg">
          <img src="/logo.jpg" alt="WYYLD MILES" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-xs font-black tracking-wider uppercase">
            WYYLD<span className="text-amber-400"> MILES</span>
          </span>
          <span className="text-gray-400 text-[10px]">• Srinagar Operations</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl font-black text-gray-950">
          Reserve Your Himalayan Journey
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Choose your travel category, select your preferred vehicle, package, or stay, and submit an enquiry directly to our mountain desk.
        </p>
      </div>

      {reference ? (
        <div className="bg-white p-8 rounded-3xl shadow-card border border-gray-100 text-center space-y-5 animate-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Enquiry Submitted • Pending Review
            </span>
            <h3 className="font-serif text-2xl font-bold text-wyld-forest mt-2">
              We've Logged Your Request!
            </h3>
            <p className="text-xs text-gray-600 mt-1 max-w-md mx-auto">
              Your reference code has been recorded. Our Srinagar concierge will review vehicle/stay availability and connect with you shortly.
            </p>
          </div>

          <div className="bg-wyld-ivory border border-wyld-forest/20 rounded-2xl p-4 max-w-sm mx-auto shadow-sm">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest block">
              Enquiry Reference
            </span>
            <span className="font-mono text-2xl font-bold text-wyld-orange tracking-wider">
              {reference}
            </span>
            <p className="text-[11px] text-gray-500 mt-1">
              You can track this enquiry anytime under{' '}
              <Link href="/my-bookings" className="text-wyld-forest font-bold underline">
                My Enquiries
              </Link>.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => {
                const text = `Hi WYLD MILES! Following up on enquiry ${reference} for ${activeItem?.title || activeItem?.name}. Please advise on confirmation!`;
                window.open(getWhatsAppUrl({ text }), '_blank');
              }}
              className="w-full max-w-md mx-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp with Reference</span>
            </button>
            <Link
              href="/"
              className="inline-block text-xs font-semibold text-gray-500 hover:text-wyld-forest underline"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-gray-100 space-y-6 text-xs text-gray-700">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Category Selector */}
          <div>
            <label className="font-bold text-gray-700 block mb-2 uppercase text-[11px] tracking-wider">
              Step 1: Select Experience Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'PACKAGE', label: 'Tour Packages', icon: Compass },
                { id: 'BIKE', label: 'Bike Rental', icon: Bike },
                { id: 'CAR', label: 'Car & 4x4s', icon: Car },
                { id: 'HOTEL', label: 'Hotels & Stays', icon: Hotel },
              ].map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedType === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(cat.id);
                      setSelectedItemId('');
                    }}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-bold text-xs transition ${
                      isSelected
                        ? 'bg-wyld-forest text-white border-wyld-forest shadow-md'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-gray-500'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Item Selector */}
          <div>
            <label className="font-bold text-gray-700 block mb-1 uppercase text-[11px] tracking-wider">
              Step 2: Choose Product / Fleet Vehicle
            </label>
            <select
              value={selectedItemId || activeItem?.id}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange font-bold text-xs"
            >
              {currentItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title || item.name} — {formatINR(item.discountedPrice || item.pricePerPerson || item.dailyRate || item.pricePerNight)}
                </option>
              ))}
            </select>
          </div>

          {/* Dates & Travelers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
                required
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Guests / Riders</label>
              <input
                type="number"
                min="1"
                max="25"
                value={guestsCount}
                onChange={(e) => setGuestsCount(parseInt(e.target.value) || 1)}
                className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
                required
              />
            </div>
          </div>

          {/* Customer Information */}
          <div className="pt-2 border-t border-gray-100 space-y-4">
            <span className="font-bold text-gray-700 block uppercase text-[11px] tracking-wider">
              Step 3: Contact Information
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ananya Das"
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="ananya@example.com"
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Special Preferences / Requests</label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Rider height, jacket sizes, airport pickup time, vegetarian meals, etc."
                rows={2}
                className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange text-xs"
              />
            </div>
          </div>

          {/* Pricing Summary & Submit */}
          <div className="p-4 bg-wyld-ivory rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 block">
                Estimated Enquiry Value
              </span>
              <span className="font-serif text-2xl font-bold text-wyld-forest">
                {formatINR(getPrice())}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-wyld-orange hover:bg-wyld-orangeHover text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-white" />
              <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Booking Enquiry'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
