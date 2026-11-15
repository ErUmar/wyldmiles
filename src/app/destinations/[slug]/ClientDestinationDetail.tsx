'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Compass,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Hotel,
  Calendar,
  Sparkles,
  Check,
  CloudSun,
  MessageCircle,
} from 'lucide-react';
import { Destination, TourPackage, Hotel as HotelType } from '@/types';
import { formatINR, getWhatsAppUrl } from '@/lib/utils';

interface ClientDestinationDetailProps {
  dest: Destination & {
    packages: TourPackage[];
    hotels: HotelType[];
  };
}

export default function ClientDestinationDetail({ dest }: ClientDestinationDetailProps) {
  const images = [dest.heroImage, ...(dest.gallery || [])].filter(Boolean);

  const handleWhatsApp = () => {
    const text = `Hi WYLD MILES! I am planning a trip to ${dest.name}, ${dest.state}. Can you assist with customized tour packages, stays, and bike/car rentals?`;
    window.open(getWhatsAppUrl({ text }), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/destinations" className="flex items-center gap-1 hover:text-wyld-orange transition">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Destinations</span>
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{dest.name}</span>
      </div>

      {/* Main Destination Hero */}
      <div className="relative h-96 sm:h-[440px] w-full rounded-3xl overflow-hidden shadow-elevated">
        <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

        <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-wyld-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {dest.state}
            </span>
            {dest.permitRequired && (
              <span className="bg-amber-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Special Inner-Line Permit Required
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
            {dest.name}
          </h1>
          <p className="text-sm sm:text-base text-wyld-ivory/90 max-w-2xl">
            {dest.tagline}
          </p>
        </div>
      </div>

      {/* Key Quick Facts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-2xl shadow-subtle border border-gray-100 flex items-center gap-3">
          <div className="p-2.5 bg-wyld-orange/20 text-wyld-orange rounded-xl">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-gray-400 uppercase text-[10px] font-bold block">Altitude</span>
            <span className="font-bold text-gray-900 text-sm">{dest.altitude}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-subtle border border-gray-100 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-gray-400 uppercase text-[10px] font-bold block">Best Travel Season</span>
            <span className="font-bold text-gray-900 text-xs line-clamp-1">{dest.bestSeason}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-subtle border border-gray-100 flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/20 text-cyan-600 rounded-xl">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <span className="text-gray-400 uppercase text-[10px] font-bold block">Weather Profile</span>
            <span className="font-bold text-gray-900 text-xs line-clamp-1">{dest.weatherSummary}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-subtle border border-gray-100 flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-600 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-gray-400 uppercase text-[10px] font-bold block">Permit Advisory</span>
            <span className="font-bold text-gray-900 text-xs">
              {dest.permitRequired ? 'Permit Handled by WYLD MILES' : 'No Permit Needed'}
            </span>
          </div>
        </div>
      </div>

      {/* Overview & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-subtle border border-gray-100 space-y-3">
            <h3 className="font-serif text-xl font-bold text-wyld-forest">
              About {dest.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {dest.description}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-subtle border border-gray-100 space-y-3">
            <h3 className="font-serif text-xl font-bold text-wyld-forest">
              Must-Experience Mountain Activities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {dest.popularActivities?.map((act, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-wyld-ivory rounded-xl border border-gray-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-gray-800">{act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky CTA */}
        <div>
          <div className="bg-wyld-forestDark text-white rounded-2xl p-6 shadow-card border border-white/10 space-y-5 sticky top-24">
            <div className="space-y-1">
              <span className="text-xs uppercase text-amber-300 font-bold tracking-wider">
                Custom Expedition
              </span>
              <h4 className="font-serif text-xl font-bold text-white">
                Plan Your Journey to {dest.name}
              </h4>
              <p className="text-xs text-wyld-sage leading-relaxed">
                Connect directly with our local Srinagar mountain desk for vehicle allocation, hotel bookings, or customized circuits.
              </p>
            </div>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge for {dest.name}</span>
            </button>

            <Link
              href="/packages"
              className="w-full bg-wyld-orange hover:bg-wyld-orangeHover text-white font-bold text-xs py-3 px-4 rounded-xl shadow transition flex items-center justify-center gap-2 text-center"
            >
              <span>Explore All Tour Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
