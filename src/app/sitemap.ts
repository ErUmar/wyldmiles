import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wyldmiles.com';

  const destinations = await prisma.destination.findMany({ select: { slug: true, createdAt: true } });
  const packages = await prisma.tourPackage.findMany({ select: { slug: true, createdAt: true } });
  const bikes = await prisma.bike.findMany({ select: { slug: true, createdAt: true } });
  const cars = await prisma.car.findMany({ select: { slug: true, createdAt: true } });
  const hotels = await prisma.hotel.findMany({ select: { slug: true, createdAt: true } });

  const staticRoutes = [
    '',
    '/destinations',
    '/packages',
    '/hotels',
    '/bike-rentals',
    '/car-rentals',
    '/book',
    '/my-bookings',
    '/about',
    '/contact',
    '/faqs',
    '/terms',
    '/privacy',
    '/cancellation',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: d.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const packageRoutes = packages.map((p) => ({
    url: `${baseUrl}/packages/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const bikeRoutes = bikes.map((b) => ({
    url: `${baseUrl}/bike-rentals/${b.slug}`,
    lastModified: b.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const carRoutes = cars.map((c) => ({
    url: `${baseUrl}/car-rentals/${c.slug}`,
    lastModified: c.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const hotelRoutes = hotels.map((h) => ({
    url: `${baseUrl}/hotels/${h.slug}`,
    lastModified: h.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...packageRoutes,
    ...bikeRoutes,
    ...carRoutes,
    ...hotelRoutes,
  ];
}
