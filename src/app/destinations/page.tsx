import React from 'react';
import { prisma } from '@/lib/prisma';
import ClientDestinations from './ClientDestinations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Himalayan Destinations Guide | Kashmir, Himachal, Uttarakhand & Ladakh | WYLD MILES',
  description:
    'Comprehensive destination guide for the Himalayas. Explore Srinagar, Gulmarg, Pahalgam, Spiti Valley, Leh Ladakh, Rishikesh, and Auli. Altitude, best seasons, permits, and activities.',
};

export const revalidate = 60;

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams?: { state?: string };
}) {
  const destinationsFromDb = await prisma.destination.findMany({
    orderBy: { state: 'asc' },
  });

  const destinations = destinationsFromDb.map((d) => ({
    ...d,
    gallery: JSON.parse(d.gallery || '[]'),
    popularActivities: JSON.parse(d.popularActivities || '[]'),
  }));

  return (
    <ClientDestinations
      initialDestinations={destinations}
      initialState={searchParams?.state || 'All'}
    />
  );
}
