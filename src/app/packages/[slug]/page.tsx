import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ClientPackageDetail from './ClientPackageDetail';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = await prisma.tourPackage.findUnique({
    where: { slug: params.slug },
  });

  if (!pkg) return { title: 'Package Not Found | WYLD MILES' };

  return {
    title: `${pkg.title} | WYLD MILES Himalayan Expeditions`,
    description: `Book ${pkg.title} (${pkg.durationNights}N/${pkg.durationDays}D) in ${pkg.region}. Starting from ₹${pkg.discountedPrice || pkg.pricePerPerson} per person.`,
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const pkg = await prisma.tourPackage.findUnique({
    where: { slug: params.slug },
    include: { destination: true },
  });

  if (!pkg) notFound();

  const formattedPkg = {
    ...pkg,
    gallery: JSON.parse(pkg.gallery || '[]'),
    inclusions: JSON.parse(pkg.inclusions || '[]'),
    exclusions: JSON.parse(pkg.exclusions || '[]'),
    itinerary: JSON.parse(pkg.itinerary || '[]'),
  };

  return <ClientPackageDetail pkg={formattedPkg} />;
}
