import React from 'react';
import { prisma } from '@/lib/prisma';
import ClientPackages from './ClientPackages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Himalayan Tour Packages | Kashmir Honeymoon, Spiti & Ladakh | WYLD MILES',
  description:
    'Handcrafted Himalayan tour packages with luxury cedar houseboats, private mountain chauffeur SUVs, and curated itineraries across Kashmir, Himachal, Uttarakhand, and Ladakh.',
};

export const revalidate = 60;

export default async function PackagesPage({
  searchParams,
}: {
  searchParams?: { region?: string; style?: string };
}) {
  const packagesFromDb = await prisma.tourPackage.findMany({
    orderBy: { pricePerPerson: 'asc' },
  });

  const packages = packagesFromDb.map((p) => ({
    ...p,
    gallery: JSON.parse(p.gallery || '[]'),
    inclusions: JSON.parse(p.inclusions || '[]'),
    exclusions: JSON.parse(p.exclusions || '[]'),
    itinerary: JSON.parse(p.itinerary || '[]'),
  }));

  return (
    <ClientPackages
      initialPackages={packages}
      initialRegion={searchParams?.region || 'All'}
      initialStyle={searchParams?.style || 'All'}
    />
  );
}
