import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ClientBikeDetail from './ClientBikeDetail';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bike = await prisma.bike.findUnique({
    where: { slug: params.slug },
  });

  if (!bike) {
    return { title: 'Bike Not Found | WYLD MILES' };
  }

  return {
    title: `${bike.name} Rental in Kashmir & Himalayas | WYLD MILES`,
    description: `Rent ${bike.name} in Srinagar, Leh, and Manali. ${bike.engineCc}cc, ${bike.powerBhp} bhp, Dual-channel ABS, pannier luggage rack ready.`,
  };
}

export default async function BikeDetailPage({ params }: Props) {
  const bike = await prisma.bike.findUnique({
    where: { slug: params.slug },
  });

  if (!bike) notFound();

  const formattedBike = {
    ...bike,
    gallery: JSON.parse(bike.gallery || '[]'),
    inclusions: JSON.parse(bike.inclusions || '[]'),
    exclusions: JSON.parse(bike.exclusions || '[]'),
    suitableRoutes: JSON.parse(bike.suitableRoutes || '[]'),
  };

  return <ClientBikeDetail bike={formattedBike} />;
}
