import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import FoxicoHero from '@/components/FoxicoHero';
import SearchWidget from '@/components/SearchWidget';
import ClientHomeSections from './ClientHomeSections';

export const revalidate = 60;

export default async function HomePage() {
  const destinations = await prisma.destination.findMany({
    where: { featured: true },
    take: 8,
  });

  const packages = await prisma.tourPackage.findMany({
    where: { featured: true },
    take: 6,
  });

  const hotels = await prisma.hotel.findMany({
    where: { featured: true },
    take: 4,
  });

  const bikes = await prisma.bike.findMany({
    where: { featured: true },
    take: 4,
  });

  const cars = await prisma.car.findMany({
    where: { featured: true },
    take: 4,
  });

  return (
    <div className="space-y-16 lg:space-y-24 pb-20 bg-white">
      {/* 1. CINEMATIC FOXICO-STYLE HERO SLIDER (Directly inspired by uploaded reference) */}
      <FoxicoHero />

      {/* 2. FLOATING MULTI-CATEGORY SEARCH WIDGET */}
      <div className="-mt-16 sm:-mt-20 relative z-30 px-4 sm:px-6 lg:px-8">
        <SearchWidget />
      </div>

      {/* 3. SIGNATURE TYPOGRAPHY WITH INLINE CAPSULE IMAGES */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 uppercase tracking-widest">
          <span>Kashmir • Himachal • Uttarakhand • Ladakh</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-950 leading-tight tracking-tight font-sans">
          Take the step and explore
          <span className="capsule-img w-20 sm:w-28 h-8 sm:h-12 inline-block mx-2 align-middle">
            <img
              src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=400&q=80"
              alt="Kashmir Dal Lake"
              className="w-full h-full object-cover rounded-full"
            />
          </span>
          the
          <br className="hidden sm:inline" />
          Himalayas
          <span className="capsule-img w-24 sm:w-32 h-8 sm:h-12 inline-block mx-2 align-middle">
            <img
              src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=400&q=80"
              alt="Gulmarg Alpine Snow"
              className="w-full h-full object-cover rounded-full"
            />
          </span>
          waiting for you.
        </h2>

        <p className="text-xs sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          From the tranquil waters of Dal Lake and powder snow in Gulmarg to rugged motorcycle road trips across Zojila Pass. WYYLD MILES connects you directly to the heart of Kashmir.
        </p>
      </section>

      {/* 4. CLIENT INTERACTIVE SECTIONS (Stats, Kashmir Adventure Grid, Fleets, Stays & Modals) */}
      <ClientHomeSections
        destinations={destinations as any}
        packages={packages as any}
        hotels={hotels as any}
        bikes={bikes as any}
        cars={cars as any}
      />
    </div>
  );
}
