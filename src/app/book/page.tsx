import React from 'react';
import { prisma } from '@/lib/prisma';
import ClientBookPage from './ClientBookPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Himalayan Expedition | WYLD MILES',
  description: 'Reserve tour packages, Himalayan adventure bikes, 4x4s, and boutique stays.',
};

export default async function BookPage({
  searchParams,
}: {
  searchParams?: { type?: string; id?: string };
}) {
  const packages = await prisma.tourPackage.findMany({ select: { id: true, title: true, pricePerPerson: true, discountedPrice: true } });
  const bikes = await prisma.bike.findMany({ select: { id: true, name: true, dailyRate: true } });
  const cars = await prisma.car.findMany({ select: { id: true, name: true, dailyRate: true } });
  const hotels = await prisma.hotel.findMany({ select: { id: true, name: true, pricePerNight: true } });

  return (
    <ClientBookPage
      packages={packages}
      bikes={bikes}
      cars={cars}
      hotels={hotels}
      initialType={searchParams?.type || 'PACKAGE'}
      initialId={searchParams?.id}
    />
  );
}
