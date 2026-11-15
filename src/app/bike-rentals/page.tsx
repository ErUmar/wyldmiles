import React from 'react';
import { prisma } from '@/lib/prisma';
import ClientBikeRentals from './ClientBikeRentals';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Himalayan Bike Rentals | Royal Enfield Himalayan 450, Classic 350 & KTM 390 | WYLD MILES',
  description:
    'Rent adventure motorcycles in Srinagar, Leh, and Manali. Royal Enfield Himalayan 450 Sherpa, Classic 350 Reborn, Scram 411, and KTM Adventure 390. Carrier-ready with emergency mountain toolkits.',
};

export const revalidate = 60;

export default async function BikeRentalsPage() {
  const bikesFromDb = await prisma.bike.findMany({
    orderBy: { dailyRate: 'desc' },
  });

  const bikes = bikesFromDb.map((b) => ({
    ...b,
    gallery: JSON.parse(b.gallery || '[]'),
    inclusions: JSON.parse(b.inclusions || '[]'),
    exclusions: JSON.parse(b.exclusions || '[]'),
    suitableRoutes: JSON.parse(b.suitableRoutes || '[]'),
  }));

  return <ClientBikeRentals initialBikes={bikes} />;
}
