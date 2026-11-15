import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ClientDestinationDetail from './ClientDestinationDetail';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dest = await prisma.destination.findUnique({
    where: { slug: params.slug },
  });

  if (!dest) return { title: 'Destination Not Found | WYLD MILES' };

  return {
    title: `${dest.name}, ${dest.state} Travel Guide | WYLD MILES`,
    description: `Complete travel guide for ${dest.name}. ${dest.tagline}. Best season: ${dest.bestSeason}. Altitude: ${dest.altitude}.`,
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const dest = await prisma.destination.findUnique({
    where: { slug: params.slug },
    include: {
      packages: true,
      hotels: true,
    },
  });

  if (!dest) notFound();

  const formattedDest = {
    ...dest,
    gallery: JSON.parse(dest.gallery || '[]'),
    popularActivities: JSON.parse(dest.popularActivities || '[]'),
    packages: dest.packages.map((p) => ({
      ...p,
      inclusions: JSON.parse(p.inclusions || '[]'),
    })),
    hotels: dest.hotels.map((h) => ({
      ...h,
      amenities: JSON.parse(h.amenities || '[]'),
    })),
  };

  return <ClientDestinationDetail dest={formattedDest as any} />;
}
