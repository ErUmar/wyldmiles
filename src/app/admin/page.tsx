import React from 'react';
import { prisma } from '@/lib/prisma';
import ClientAdminDashboard from './ClientAdminDashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Control Center | WYLD MILES',
  description: 'Operations and dispatch dashboard for WYLD MILES Himalayan Expeditions.',
};

export const revalidate = 0; // Dynamic server rendering for live admin updates

export default async function AdminPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const bikes = await prisma.bike.findMany({
    orderBy: { dailyRate: 'desc' },
  });

  const cars = await prisma.car.findMany({
    orderBy: { dailyRate: 'desc' },
  });

  const packages = await prisma.tourPackage.findMany({
    orderBy: { pricePerPerson: 'asc' },
  });

  const hotels = await prisma.hotel.findMany({
    orderBy: { pricePerNight: 'asc' },
  });

  const destinations = await prisma.destination.findMany({
    orderBy: { state: 'asc' },
  });

  return (
    <ClientAdminDashboard
      initialEnquiries={enquiries as any}
      initialBikes={bikes as any}
      initialCars={cars as any}
      initialPackages={packages as any}
      initialHotels={hotels as any}
      initialDestinations={destinations as any}
    />
  );
}
