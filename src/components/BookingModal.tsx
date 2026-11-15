'use client';

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  MessageCircle,
  Sparkles,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { formatINR, getWhatsAppUrl } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'PACKAGE' | 'HOTEL' | 'BIKE' | 'CAR' | 'CUSTOM';
  itemId?: string;
  itemTitle: string;
  basePrice: number;
  priceUnit?: string; // e.g. "per person", "per night", "per day"
}

export default function BookingModal({
  isOpen,
  onClose,
  type,
  itemId,
  itemTitle,
  basePrice,
  priceUnit = 'per person',
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [startDate, setStartDate] = useState('2026-11-25');
  const [endDate, setEndDate] = useState('2026-11-30');
  const [guestsCount, setGuestsCount] = useState(2);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Srinagar Base');
  const [dropoffLocation, setDropoffLocation] = useState('Srinagar Base');
  const [specialRequests, setSpecialRequests] = useState('');

  // Mountain Add-ons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const availableAddons = [
    { id: 'riding_gear', title: 'DOT Riding Jacket & Knee Guards', price: 450, unit: 'per day', applicable: ['BIKE'] },
    { id: 'extra_helmet', title: 'Pillion Certified Helmet', price: 150, unit: 'per day', applicable: ['BIKE'] },
    { id: 'jerry_can', title: '5L Metal Fuel Jerry Can with Mount', price: 200, unit: 'one-time', applicable: ['BIKE', 'CAR'] },
    { id: 'oxygen_cylinder', title: 'Portable Medical Oxygen Kit (High Passes)', price: 1200, unit: 'one-time', applicable: ['PACKAGE', 'BIKE', 'CAR'] },
    { id: 'snow_chains', title: 'Certified Steel Snow Chains Set', price: 800, unit: 'one-time', applicable: ['CAR'] },
    { id: 'shikara_sunset', title: 'Private Sunset Shikara Ride on Dal Lake', price: 1000, unit: 'one-time', applicable: ['PACKAGE', 'HOTEL'] },
  ].filter((a) => a.applicable.includes(type) || a.applicable.includes('ALL'));

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculatedTotal = () => {
    let total = basePrice * guestsCount;
    // Add addon costs
    for (const addonId of selectedAddons) {
      const addon = availableAddons.find((a) => a.id === addonId);
      if (addon) total += addon.price;
    }
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setErrorMessage('Please provide your name, phone number, and email.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          itemId,
          itemTitle,
          customerName,
          customerEmail,
          customerPhone,
          startDate,
          endDate,
          guestsCount,
          pickupLocation,
          dropoffLocation,
          specialRequests: `${specialRequests.trim()} [Add-ons: ${selectedAddons.join(', ') || 'None'}]`,
          estimatedTotal: calculatedTotal(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedReference(data.reference);
        setStep(3); // Success step
      } else {
        setErrorMessage(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error submitting enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    if (!submittedReference) return;
    const text = `Hello WYYLD MILES! I have submitted an expedition enquiry for ${itemTitle}.\n\nReference: ${submittedReference}\nName: ${customerName}\nDates: ${startDate} to ${endDate}\nGuests/Riders: ${guestsCount}\nEstimated: ${formatINR(calculatedTotal())}\n\nPlease confirm availability and next steps with Srinagar operations!`;
    window.open(getWhatsAppUrl({ text }), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-amber-400/30 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#0E1513] text-white p-5 flex items-center justify-between shrink-0 border-b border-amber-400/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/40 shrink-0 bg-black">
              <img src="/logo.jpg" alt="WYYLD MILES" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider uppercase">
                  {type} ENQUIRY
                </span>
                <span className="text-[10px] text-amber-200/80 font-bold uppercase tracking-wider">
                  Srinagar Base
                </span>
              </div>
              <h3 className="font-sans text-base sm:text-lg font-black text-white mt-0.5 line-clamp-1">
                {itemTitle}
              </h3>
              <p className="text-xs text-gray-300">
                Starting from <strong className="text-amber-400">{formatINR(basePrice)}</strong> {priceUnit}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-gray-700">
          {/* STEP 1: Dates, Guests & Mountain Addons */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3 rounded-xl flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Booking Enquiry Flow: Submitting this form checks real-time Himalayan mountain slot availability and connects you directly with our local concierge.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Start / Check-in Date *
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-sm p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-wyld-orange focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    End / Check-out Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-sm p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-wyld-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {type === 'BIKE' ? 'Number of Riders' : 'Number of Guests / Travellers'} *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(parseInt(e.target.value) || 1)}
                    className="w-full text-sm p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-wyld-orange focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Pickup / Starting Location
                  </label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="e.g. Srinagar Airport, Leh, Manali"
                    className="w-full text-sm p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-wyld-orange focus:outline-none"
                  />
                </div>
              </div>

              {/* Addons Selection */}
              {availableAddons.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-gray-800 block mb-2">
                    Curated Himalayan Add-ons:
                  </span>
                  <div className="space-y-2">
                    {availableAddons.map((addon) => {
                      const isSelected = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                            isSelected
                              ? 'bg-wyld-orange/10 border-wyld-orange text-wyld-forest'
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 text-xs">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="rounded text-wyld-orange focus:ring-wyld-orange cursor-pointer"
                            />
                            <span className="font-semibold">{addon.title}</span>
                          </div>
                          <span className="text-xs font-bold text-wyld-orange">
                            +{formatINR(addon.price)} <span className="font-normal text-gray-500 text-[10px]">({addon.unit})</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Live Cost Summary */}
              <div className="p-3 bg-wyld-ivory rounded-xl border border-wyld-sage/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-600 block">Estimated Enquiry Value:</span>
                  <span className="text-lg font-serif font-bold text-wyld-forest">
                    {formatINR(calculatedTotal())}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-wyld-orange hover:bg-wyld-orangeHover text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition"
                >
                  Continue to Contact Details →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Customer Contact Information */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-sm p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-wyld-orange focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full text-sm p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-wyld-orange focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full text-sm p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-wyld-orange focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Special Requests / Mountain Preferences (Optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Need vegetarian meals, airport pickup time, rider height or jacket sizes, anniversary setup, etc."
                  rows={3}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-wyld-orange focus:outline-none"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Selected Product:</span>
                  <strong className="text-gray-900">{itemTitle}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Travel Dates:</span>
                  <span>{startDate} to {endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests / Riders:</span>
                  <span>{guestsCount}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200 font-bold text-wyld-forest text-sm">
                  <span>Estimated Total:</span>
                  <span>{formatINR(calculatedTotal())}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition"
                >
                  ← Back to Options
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-wyld-forest hover:bg-wyld-forestDark text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting to Mountain Desk...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                      <span>Submit Booking Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Submission Success Screen */}
          {step === 3 && submittedReference && (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Enquiry Submitted • Pending Review
                </span>
                <h3 className="font-serif text-2xl font-bold text-wyld-forest mt-2">
                  We've Received Your Enquiry!
                </h3>
                <p className="text-xs text-gray-600 mt-1 max-w-md mx-auto">
                  Your booking request has been logged in our mountain dispatch database. An administrator will review your requested slots and confirm availability.
                </p>
              </div>

              <div className="bg-wyld-ivory border border-wyld-forest/20 rounded-2xl p-4 max-w-sm mx-auto shadow-sm">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest block">
                  Enquiry Reference Code
                </span>
                <span className="font-mono text-xl font-bold text-wyld-orange tracking-wider">
                  {submittedReference}
                </span>
                <p className="text-[11px] text-gray-500 mt-1">
                  Save this code to track your status anytime under{' '}
                  <strong className="text-wyld-forest">My Enquiries</strong>.
                </p>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="w-full max-w-md mx-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Instant WhatsApp Confirmation with Concierge</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-800 block mx-auto underline underline-offset-4"
                >
                  Close & Continue Exploring WYLD MILES
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
