import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ClientHotelDetail from './ClientHotelDetail';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hotel = await prisma.hotel.findUnique({
    where: { slug: params.slug },
  });

  if (!hotel) return { title: 'Hotel Not Found | WYLD MILES' };

  return {
    title: `${hotel.name} | Stays & Houseboats | WYLD MILES`,
    description: `Book ${hotel.name} in ${hotel.location}. ${hotel.propertyType} starting from ₹${hotel.pricePerNight} per night.`,
  };
}

export default async function HotelDetailPage({ params }: Props) {
  const hotel = await prisma.hotel.findUnique({
    where: { slug: params.slug },
  });

  if (!hotel) notFound();

  const formattedHotel = {
    ...hotel,
    gallery: JSON.parse(hotel.gallery || '[]'),
    amenities: JSON.parse(hotel.amenities || '[]'),
    rooms: JSON.parse(hotel.rooms || '[]'),
  };

  return <ClientHotelDetail hotel={formattedHotel} />;
}
