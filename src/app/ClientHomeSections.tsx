'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Star,
  Users,
  Bike,
  Car,
  Hotel,
  Compass,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Check,
  CheckCircle,
  HelpCircle,
  Fuel,
  Gauge,
  Phone,
  MessageCircle,
  Shield,
  HeartHandshake,
  Mountain,
  Flame,
  Camera,
} from 'lucide-react';
import { Destination, TourPackage, Hotel as HotelType, Bike as BikeType, Car as CarType } from '@/types';
import { formatINR, getWhatsAppUrl } from '@/lib/utils';
import BookingModal from '@/components/BookingModal';
import BikeCompareModal from '@/components/BikeCompareModal';

interface ClientHomeSectionsProps {
  destinations: any[];
  packages: any[];
  hotels: any[];
  bikes: any[];
  cars: any[];
}

export const KASHMIR_ADVENTURES = [
  {
    id: 'gulmarg-skiing',
    title: 'Gulmarg Heli-Skiing & Backcountry Powder',
    location: 'Mt. Apharwat (13,780 FT), Gulmarg',
    category: 'Winter Snow Sports',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80',
    tag: 'World-Class Dry Powder',
    description: 'Ascend on the high-altitude Gulmarg Gondola Phase 2 to shred untouched Himalayan dry powder bowls with IFMGA certified ski instructors.',
    ctaText: 'Explore Ski Packages',
    href: '/packages/kashmir-paradise-circuit',
  },
  {
    id: 'zojila-motorcycling',
    title: 'Zojila & Sinthan Top High-Pass Motorcycling',
    location: 'Zojila (11,575 FT) & Sinthan Pass (12,414 FT)',
    category: 'Adventure Riding',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    tag: 'Royal Enfield 450 Fleet',
    description: 'Carve along cliffside dirt tracks, snow walls, and glacial streams connecting Kashmir to Ladakh and Kishtwar on our new Himalayan 450 fleet.',
    ctaText: 'Rent Himalayan 450',
    href: '/bike-rentals/royal-enfield-himalayan-450',
  },
  {
    id: 'great-lakes-trek',
    title: 'Kashmir Great Lakes & Tarsar Marsar Trekking',
    location: 'Sonamarg to Naranag / Aru Valley',
    category: 'High-Altitude Alpine Trek',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tag: '7 Glacial Tarns',
    description: 'Trek across 7 high-altitude emerald lakes surrounded by wildflower carpeted alpine meadows, roaring brooks, and night camps beneath the Milky Way.',
    ctaText: 'Discover Treks',
    href: '/packages',
  },
  {
    id: 'pahalgam-rafting',
    title: 'Lidder River White-Water Rafting & Angling',
    location: 'Lidder Valley & Betaab, Pahalgam',
    category: 'River Sports',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    tag: 'Grade III-IV Rapids',
    description: 'Conquer roaring glacial torrents of the Lidder River amidst towering pine forests, or enjoy peaceful brown trout fly-fishing along pristine riverbanks.',
    ctaText: 'Plan Pahalgam Stay',
    href: '/destinations/pahalgam',
  },
  {
    id: 'houseboat-living',
    title: 'Dal Lake Heritage Cedar Houseboat Living',
    location: 'Dal Lake & Nigeen Lake, Srinagar',
    category: 'Boutique Heritage',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    tag: 'Royal Hand-Carved Pinewood',
    description: 'Experience Kashmir like royalty in hand-carved cedarwood floating palaces with ornate Khatamband ceilings, sunset Shikara cruises, and steaming Kehwa tea.',
    ctaText: 'View Houseboats',
    href: '/hotels',
  },
  {
    id: 'gurez-4x4-expedition',
    title: 'Gurez Valley Frontier Off-Road 4x4 Expedition',
    location: 'Razdan Top (11,672 FT) & Dawar, Gurez',
    category: 'Overlanding & 4x4',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    tag: 'Remote Border Realm',
    description: 'Navigate rocky mountain riverbeds and off-road ridges in a Mahindra Thar 4x4 towards the iconic pyramid peak of Habba Khatoon and Dard-Shin villages.',
    ctaText: 'Book Thar 4x4',
    href: '/car-rentals/mahindra-thar-4x4-hardtop',
  },
];

export default function ClientHomeSections({
  destinations,
  packages,
  hotels,
  bikes,
  cars,
}: ClientHomeSectionsProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  // Booking Modal State
  const [bookingModalState, setBookingModalState] = useState<{
    isOpen: boolean;
    type: 'PACKAGE' | 'HOTEL' | 'BIKE' | 'CAR';
    itemId?: string;
    itemTitle: string;
    basePrice: number;
    priceUnit?: string;
  }>({
    isOpen: false,
    type: 'PACKAGE',
    itemTitle: '',
    basePrice: 0,
  });

  // Bike Compare State
  const [selectedBikesForCompare, setSelectedBikesForCompare] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const toggleBikeCompare = (id: string) => {
    setSelectedBikesForCompare((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const openBooking = (
    type: 'PACKAGE' | 'HOTEL' | 'BIKE' | 'CAR',
    itemId: string,
    itemTitle: string,
    basePrice: number,
    priceUnit: string = 'per person'
  ) => {
    setBookingModalState({
      isOpen: true,
      type,
      itemId,
      itemTitle,
      basePrice,
      priceUnit,
    });
  };

  const filteredDestinations =
    selectedRegion === 'All'
      ? destinations
      : destinations.filter((d) => d.state === selectedRegion);

  const comparedBikeObjects = bikes
    .filter((b) => selectedBikesForCompare.includes(b.id))
    .map((b) => ({
      ...b,
      gallery: JSON.parse(b.gallery || '[]'),
      inclusions: JSON.parse(b.inclusions || '[]'),
      exclusions: JSON.parse(b.exclusions || '[]'),
      suitableRoutes: JSON.parse(b.suitableRoutes || '[]'),
    }));

  return (
    <div className="space-y-24">
      {/* 1. KASHMIR ADVENTURE EXPEDITIONS ("The Wild Kashmir Collection") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-bold uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>The Wild Kashmir Collection</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight font-sans">
              Iconic Kashmir Adventures
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
              From deep powder slopes at 13,780 ft to thrilling mountain road trips along the Kishanganga river. Handcrafted by local Kashmiri explorers.
            </p>
          </div>

          <Link
            href="/packages?region=Kashmir"
            className="inline-flex items-center gap-2 bg-[#0E1513] text-white hover:bg-black text-xs font-bold px-5 py-3 rounded-full transition shadow-md"
          >
            <span>Explore All Kashmir Expeditions</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </div>

        {/* 6 High-Impact Adventure Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KASHMIR_ADVENTURES.map((adv) => (
            <div
              key={adv.id}
              className="group relative rounded-[28px] overflow-hidden bg-gray-900 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-[420px]"
            >
              {/* Card Photo with Zoom Effect */}
              <img
                src={adv.image}
                alt={adv.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
              />
              
              {/* Gradient Scrims */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

              {/* Top Badges */}
              <div className="relative z-10 p-5 flex items-center justify-between">
                <span className="bg-amber-400 text-gray-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {adv.tag}
                </span>
                <span className="text-[11px] bg-black/60 backdrop-blur-md text-white font-medium px-2.5 py-0.5 rounded-full border border-white/20">
                  {adv.category}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 p-5 sm:p-6 space-y-2.5 text-white">
                <p className="text-[11px] text-amber-300 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{adv.location}</span>
                </p>
                <h3 className="text-xl font-black text-white leading-tight font-sans">
                  {adv.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                  {adv.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={adv.href}
                    className="inline-flex items-center gap-2 bg-white/15 hover:bg-amber-400 hover:text-gray-950 backdrop-blur-md border border-white/25 text-white text-xs font-bold px-4 py-2 rounded-full transition-all duration-300 group/btn"
                  >
                    <span>{adv.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. STATS & LOCAL KASHMIR HERITAGE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Vertical Imagery with Kashmir Dal Lake */}
          <div className="lg:col-span-5 relative h-80 sm:h-96 lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl group border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=85"
              alt="Kashmir Dal Lake with traditional Shikara"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <span className="text-[10px] bg-amber-400 text-gray-950 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                Srinagar HQ Base
              </span>
              <p className="font-sans text-xl font-black text-white">Rooted in the Vale of Kashmir</p>
              <p className="text-xs text-gray-300">Boulevard Road, Dal Lake • Direct Fleet Dispatch</p>
            </div>
          </div>

          {/* Text & 3 Big Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Middlemen • 100% Local Kashmir Operators</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight font-sans">
                Real local expertise from those who grew up in these mountains
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl">
                Unlike generic online travel aggregators, WYYLD MILES operates its own verified motorcycle fleet, luxury 4x4s, and handpicked boutique stays straight out of Srinagar. You travel with genuine local support, 24/7 mountain breakdown cover, and authentic Kashmiri warmth.
              </p>
            </div>

            {/* 3 Big Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="space-y-1">
                <span className="text-3xl sm:text-5xl font-black text-gray-950 font-sans tracking-tight">
                  98%
                </span>
                <p className="text-[11px] text-gray-500 uppercase tracking-wide font-bold">
                  Traveler Delight
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-3xl sm:text-5xl font-black text-gray-950 font-sans tracking-tight">
                  100%
                </span>
                <p className="text-[11px] text-gray-500 uppercase tracking-wide font-bold">
                  Verified Local Fleet
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-3xl sm:text-5xl font-black text-gray-950 font-sans tracking-tight">
                  24/7
                </span>
                <p className="text-[11px] text-gray-500 uppercase tracking-wide font-bold">
                  High-Pass Assist
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESTINATION EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight font-sans">
              Discover Himalayan Destinations
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Handpicked valleys, alpine meadows, and high passes across Kashmir, Ladakh, and Himachal.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1 rounded-full text-xs font-semibold">
            {['All', 'Kashmir', 'Himachal', 'Uttarakhand', 'Ladakh'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  selectedRegion === region
                    ? 'bg-gray-950 text-white font-bold shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredDestinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group relative rounded-3xl overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 bg-gray-100 h-64 sm:h-76 flex flex-col justify-end p-4 border border-gray-100"
            >
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="relative z-10 space-y-1">
                <span className="inline-block bg-amber-400 text-gray-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {dest.state}
                </span>
                <h3 className="text-lg font-bold text-white font-sans flex items-center justify-between">
                  <span>{dest.name}</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-amber-400 group-hover:text-gray-950 flex items-center justify-center text-white transition-all transform group-hover:translate-x-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </h3>
                <p className="text-[11px] text-gray-300 line-clamp-1">{dest.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. THREE VALUE PROPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-y border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-gray-950 font-sans">Ease of Travel</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Curated itineraries, direct Srinagar Airport pickups, and seamless high-pass permits assistance.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-gray-950 font-sans">Kashmiri Road Pilots</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Experienced local drivers and motorcycle leads who know every hairpin turn and weather shift.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-gray-950 font-sans">Safe & Inspected Fleet</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              42-point safety check on every Royal Enfield 450 and 4x4 before handover, plus toolkits and backup.
            </p>
          </div>
        </div>
      </section>

      {/* 5. POPULAR TOUR PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight font-sans">
              Curated Himalayan Tour Packages
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Complete itineraries featuring luxury stays, private mountain transport, and meals.
            </p>
          </div>

          <Link
            href="/packages"
            className="text-xs font-bold text-gray-900 hover:text-amber-600 flex items-center gap-1 transition"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => {
            const inclusions = JSON.parse(pkg.inclusions || '[]');
            return (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden shadow-subtle hover:shadow-card transition duration-300 border border-gray-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                    <img
                      src={pkg.heroImage}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-white/90 backdrop-blur-md text-gray-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {pkg.travelStyle}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{pkg.durationNights}N / {pkg.durationDays}D</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white text-gray-950 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{pkg.rating}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-amber-600 transition line-clamp-2 font-sans">
                      {pkg.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-gray-600">
                      {inclusions.slice(0, 2).map((inc: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 font-bold block">Starting</span>
                    <span className="text-lg font-extrabold text-gray-950 font-sans">
                      {formatINR(pkg.discountedPrice || pkg.pricePerPerson)}
                    </span>
                    <span className="text-[10px] text-gray-500"> / person</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="text-xs font-bold text-gray-700 hover:text-gray-950 px-3.5 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() =>
                        openBooking(
                          'PACKAGE',
                          pkg.id,
                          pkg.title,
                          pkg.discountedPrice || pkg.pricePerPerson,
                          'per person'
                        )
                      }
                      className="bg-[#111827] hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-full shadow transition"
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

      {/* 6. FLAGSHIP BIKE RENTALS (Clean Dribbble Card Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-[#0B1311] rounded-3xl p-6 sm:p-10 text-white space-y-8 border border-amber-400/20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="bg-amber-400 text-gray-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Flagship Fleet
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                Himalayan Bike Rentals
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
                Royal Enfield Himalayan 450, Classic 350, and KTM 390 Adventure. Fully prepped with luggage racks and mountain breakdown support.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {selectedBikesForCompare.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsCompareOpen(true)}
                  className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold text-xs px-4 py-2.5 rounded-full transition"
                >
                  Compare ({selectedBikesForCompare.length})
                </button>
              )}
              <Link
                href="/bike-rentals"
                className="bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs px-5 py-2.5 rounded-full transition flex items-center gap-1.5"
              >
                <span>View All Bikes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bikes.map((bike) => (
              <div
                key={bike.id}
                className="bg-white text-gray-950 rounded-3xl overflow-hidden shadow-card flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={bike.heroImage}
                      alt={bike.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#111827] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {bike.brand}
                    </span>
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <h3 className="font-bold text-sm text-gray-950 line-clamp-1 font-sans">
                      {bike.name}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-gray-500 bg-gray-50 p-2 rounded-xl">
                      <span>{bike.engineCc} cc</span>
                      <span>•</span>
                      <span>{bike.fuelCapacityLitres}L Tank</span>
                      <span>•</span>
                      <span>{bike.absType}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <label className="flex items-center gap-1.5 cursor-pointer text-gray-600">
                        <input
                          type="checkbox"
                          checked={selectedBikesForCompare.includes(bike.id)}
                          onChange={() => toggleBikeCompare(bike.id)}
                          className="rounded text-amber-500 cursor-pointer"
                        />
                        <span>Compare</span>
                      </label>
                      <span className="text-[10px] text-gray-400">
                        Deposit: {formatINR(bike.securityDeposit)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-extrabold text-gray-950 font-sans">
                      {formatINR(bike.dailyRate)}
                    </span>
                    <span className="text-[10px] text-gray-500"> / day</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openBooking('BIKE', bike.id, bike.name, bike.dailyRate, 'per day')
                    }
                    className="bg-[#111827] hover:bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow transition"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DEDICATED CAR RENTALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight font-sans">
              Car & 4x4 Mountain Rentals
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Thar 4x4, Innova Crysta, Scorpio-N, and luxury executive vans for Kashmir and high-altitude passes.
            </p>
          </div>

          <Link
            href="/car-rentals"
            className="text-xs font-bold text-gray-900 hover:text-amber-600 flex items-center gap-1 transition"
          >
            <span>View All Cars</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-3xl overflow-hidden shadow-subtle hover:shadow-card transition duration-300 border border-gray-100 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={car.heroImage}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#111827] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {car.category}
                  </span>
                </div>

                <div className="p-4 space-y-2 text-xs">
                  <h3 className="font-bold text-sm text-gray-950 line-clamp-1 font-sans">
                    {car.name}
                  </h3>
                  <div className="flex items-center gap-3 text-gray-500 text-[11px]">
                    <span>{car.seats} Seats</span>
                    <span>•</span>
                    <span>{car.transmission}</span>
                    <span>•</span>
                    <span>{car.selfDriveAllowed ? 'Self-Drive' : 'Chauffeur'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-base font-extrabold text-gray-950 font-sans">
                    {formatINR(car.dailyRate)}
                  </span>
                  <span className="text-[10px] text-gray-500"> / day</span>
                </div>

                <button
                  type="button"
                  onClick={() => openBooking('CAR', car.id, car.name, car.dailyRate, 'per day')}
                  className="bg-[#111827] hover:bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow transition"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. STAYS & HOUSEBOATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight font-sans">
              Handpicked Stays & Houseboats
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Dal Lake cedar houseboats, ski chalets in Gulmarg, and apple orchard cottages in Pahalgam.
            </p>
          </div>

          <Link
            href="/hotels"
            className="text-xs font-bold text-gray-900 hover:text-amber-600 flex items-center gap-1 transition"
          >
            <span>View All Stays</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl overflow-hidden shadow-subtle hover:shadow-card transition duration-300 border border-gray-100 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={hotel.heroImage}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#111827] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {hotel.propertyType}
                  </span>
                </div>

                <div className="p-4 space-y-1.5 text-xs">
                  <h3 className="font-bold text-sm text-gray-950 line-clamp-1 font-sans">
                    {hotel.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{hotel.location}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-base font-extrabold text-gray-950 font-sans">
                    {formatINR(hotel.pricePerNight)}
                  </span>
                  <span className="text-[10px] text-gray-500"> / night</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openBooking('HOTEL', hotel.id, hotel.name, hotel.pricePerNight, 'per night')
                  }
                  className="bg-[#111827] hover:bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow transition"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalState.isOpen}
        onClose={() => setBookingModalState((prev) => ({ ...prev, isOpen: false }))}
        type={bookingModalState.type}
        itemId={bookingModalState.itemId}
        itemTitle={bookingModalState.itemTitle}
        basePrice={bookingModalState.basePrice}
        priceUnit={bookingModalState.priceUnit}
      />

      <BikeCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        bikes={comparedBikeObjects}
        onBookBike={(bike) =>
          openBooking('BIKE', bike.id, bike.name, bike.dailyRate, 'per day')
        }
      />
    </div>
  );
}
