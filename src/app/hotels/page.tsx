import React from 'react';
import { prisma } from '@/lib/prisma';
import ClientHotels from './ClientHotels';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Himalayan Stays & Houseboats | Dal Lake Heritage Suites & Gulmarg Chalets | WYLD MILES',
  description:
    'Discover handpicked Himalayan accommodations. Traditional cedarwood houseboats on Dal Lake, ski-in alpine resorts in Gulmarg, and apple orchard chalets in Pahalgam.',
};

export const revalidate = 60;

export default async function HotelsPage() {
  const hotelsFromDb = await prisma.hotel.findMany({
    orderBy: { pricePerNight: 'asc' },
  });

  const hotels = hotelsFromDb.map((h) => ({
    ...h,
    gallery: JSON.parse(h.gallery || '[]'),
    amenities: JSON.parse(h.amenities || '[]'),
    rooms: JSON.parse(h.rooms || '[]'),
  }));

  return <ClientHotels initialHotels={hotels} />;
}
