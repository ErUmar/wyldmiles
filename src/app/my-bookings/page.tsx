'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Calendar,
  Users,
  Compass,
  MessageCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { formatINR, getWhatsAppUrl } from '@/lib/utils';
import { Enquiry } from '@/types';

export default function MyBookingsPage() {
  const [searchReference, setSearchReference] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [results, setResults] = useState<Enquiry[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchReference.trim() && !searchEmail.trim()) {
      setErrorMsg('Please enter an Enquiry Reference Code or Email Address.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      if (searchReference.trim()) params.append('reference', searchReference.trim());
      if (searchEmail.trim()) params.append('email', searchEmail.trim());

      const res = await fetch(`/api/enquiries?${params.toString()}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setResults(data.enquiries);
      } else {
        setErrorMsg(data.error || 'No enquiries found matching your criteria.');
        setResults([]);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error looking up enquiry.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Booking Confirmed
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Under Concierge Review
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Cancelled
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Enquiry Submitted (Pending Review)
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2.5 bg-[#0E1513] px-4 py-2 rounded-full border border-amber-400/30 text-white shadow-md">
          <img src="/logo.jpg" alt="WYYLD MILES" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-xs font-black tracking-wider uppercase">
            WYYLD<span className="text-amber-400"> MILES</span>
          </span>
          <span className="text-gray-400 text-[10px]">• Srinagar Concierge</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl font-black text-gray-950">
          Track Your Himalayan Booking
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Enter your unique booking reference (e.g., <strong className="text-gray-950">WM-2026-XXXX</strong>) or email address to review live availability status, concierge notes, and confirmation details.
        </p>
      </div>

      {/* Lookup Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-subtle border border-gray-100 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="font-bold text-gray-700 block mb-1">
              Enquiry Reference Code (Preferred)
            </label>
            <input
              type="text"
              value={searchReference}
              onChange={(e) => setSearchReference(e.target.value.toUpperCase())}
              placeholder="e.g. WM-2026-4819"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange font-mono text-sm tracking-wider uppercase"
            />
          </div>

          <div className="text-center font-bold text-gray-400 text-[10px] uppercase">
            — OR BY EMAIL —
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">
              Customer Email Address
            </label>
            <input
              type="email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="e.g. aditya.sharma@example.com"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-wyld-forest hover:bg-wyld-forestDark text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>{isLoading ? 'Checking Mountain Database...' : 'Lookup Booking Status'}</span>
          </button>
        </form>

        {/* Quick Demo Reference Pill Helper */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>Demo References to Test:</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSearchReference('WM-2026-4819')}
              className="text-wyld-orange font-mono underline hover:text-wyld-forest"
            >
              WM-2026-4819
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setSearchReference('WM-2026-8392')}
              className="text-wyld-orange font-mono underline hover:text-wyld-forest"
            >
              WM-2026-8392
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-6">
          <h3 className="font-serif text-xl font-bold text-wyld-forest">
            Found Enquiries ({results.length})
          </h3>

          {results.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-3">
              <FileText className="w-10 h-10 text-gray-400 mx-auto" />
              <p className="text-xs text-gray-600">
                No matching enquiries found. Check your reference code or submit a new enquiry.
              </p>
              <Link
                href="/packages"
                className="inline-block bg-wyld-orange text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Browse Tour Packages
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white p-6 rounded-2xl shadow-subtle border border-gray-100 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-bold text-wyld-forest tracking-wider">
                        {enq.reference}
                      </span>
                      <span className="text-[10px] bg-wyld-ivory text-gray-600 px-2.5 py-0.5 rounded-full font-bold uppercase">
                        {enq.type}
                      </span>
                    </div>
                    {getStatusBadge(enq.status)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400 text-[10px] uppercase font-bold block">
                        Reserved Product
                      </span>
                      <strong className="text-gray-900 text-sm block mt-0.5">
                        {enq.itemTitle}
                      </strong>
                    </div>

                    <div>
                      <span className="text-gray-400 text-[10px] uppercase font-bold block">
                        Travel Dates
                      </span>
                      <span className="text-gray-800 block mt-0.5 font-medium">
                        {enq.startDate} {enq.endDate ? `to ${enq.endDate}` : ''}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400 text-[10px] uppercase font-bold block">
                        Guests / Riders
                      </span>
                      <span className="text-gray-800 block mt-0.5 font-medium">
                        {enq.guestsCount} Person(s)
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400 text-[10px] uppercase font-bold block">
                        Estimated Total
                      </span>
                      <span className="font-serif text-lg font-bold text-wyld-forest block">
                        {formatINR(enq.estimatedTotal)}
                      </span>
                    </div>
                  </div>

                  {enq.specialRequests && (
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-gray-700">
                      <strong>Preferences & Add-ons:</strong> {enq.specialRequests}
                    </div>
                  )}

                  {enq.adminNotes && (
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                      <strong>Concierge Update:</strong> {enq.adminNotes}
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[10px] text-gray-400">
                      Enquiry logged on {new Date(enq.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        const text = `Hi WYLD MILES! Following up on enquiry ${enq.reference} for ${enq.itemTitle}. Status: ${enq.status}. Please advise next steps!`;
                        window.open(getWhatsAppUrl({ text }), '_blank');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Concierge Regarding This Booking</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
