import React from 'react';
import { prisma } from '@/lib/prisma';
import ClientCarRentals from './ClientCarRentals';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Himalayan Car & 4x4 Rentals | Thar 4x4, Innova Crysta & Urbania | WYLD MILES',
  description:
    'Rent mountain-tested 4x4 SUVs, luxury chauffeur-driven Innova Crystas, and tempo travellers across Kashmir, Himachal, and Ladakh. Self-drive and commercial mountain chauffeurs available.',
};

export const revalidate = 60;

export default async function CarRentalsPage() {
  const carsFromDb = await prisma.car.findMany({
    orderBy: { dailyRate: 'desc' },
  });

  const cars = carsFromDb.map((c) => ({
    ...c,
    gallery: JSON.parse(c.gallery || '[]'),
    features: JSON.parse(c.features || '[]'),
  }));

  return <ClientCarRentals initialCars={cars} />;
}
