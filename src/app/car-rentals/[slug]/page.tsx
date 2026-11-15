import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ClientCarDetail from './ClientCarDetail';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = await prisma.car.findUnique({
    where: { slug: params.slug },
  });

  if (!car) return { title: 'Vehicle Not Found | WYLD MILES' };

  return {
    title: `${car.name} Rental in Kashmir & Himalayas | WYLD MILES`,
    description: `Rent ${car.name} in Srinagar, Manali, and Leh. ${car.seats} seats, ${car.transmission}, ${car.selfDriveAllowed ? 'Self-drive available' : 'Chauffeur-driven'}.`,
  };
}

export default async function CarDetailPage({ params }: Props) {
  const car = await prisma.car.findUnique({
    where: { slug: params.slug },
  });

  if (!car) notFound();

  const formattedCar = {
    ...car,
    gallery: JSON.parse(car.gallery || '[]'),
    features: JSON.parse(car.features || '[]'),
  };

  return <ClientCarDetail car={formattedCar} />;
}
