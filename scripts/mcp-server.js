#!/usr/bin/env node

/**
 * WYYLD MILES — Official Model Context Protocol (MCP) Server
 * 
 * Exposes Himalayan tour discovery, motorcycle fleet rental, 4x4 vehicles,
 * Dal Lake cedar houseboats, destination guides, and live booking enquiry management
 * to AI models and agent workflows via the Model Context Protocol (MCP).
 */

const path = require('path');
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');
const { PrismaClient } = require('@prisma/client');

// Initialize Prisma
const prisma = new PrismaClient({
  log: ['error'],
});

// Format Indian Rupee (INR)
function formatINR(val) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}

// Generate unique booking reference WM-YYYY-NNNN
function generateReference() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `WM-${year}-${rand}`;
}

// Initialize MCP Server
const server = new Server(
  {
    name: 'wyld-miles-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register Available Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_tour_packages',
        description:
          'Search curated Himalayan tour packages across Kashmir, Himachal, Uttarakhand, and Ladakh. Filter by region, travel style (Honeymoon, Adventure, Family), budget, and duration.',
        inputSchema: {
          type: 'object',
          properties: {
            region: {
              type: 'string',
              description: 'Himalayan region: Kashmir, Himachal, Uttarakhand, or Ladakh',
              enum: ['Kashmir', 'Himachal', 'Uttarakhand', 'Ladakh'],
            },
            travelStyle: {
              type: 'string',
              description: 'Travel category: Honeymoon, Adventure, Family, Road Trip, or Culture',
            },
            maxBudgetINR: {
              type: 'number',
              description: 'Maximum budget per person in INR (e.g. 35000)',
            },
            minDurationDays: {
              type: 'number',
              description: 'Minimum duration in days (e.g. 5)',
            },
          },
        },
      },
      {
        name: 'get_package_details',
        description:
          'Get comprehensive details for a specific tour package by slug or ID, including day-by-day itinerary, inclusions, exclusions, and starting rates.',
        inputSchema: {
          type: 'object',
          properties: {
            slugOrId: {
              type: 'string',
              description: 'Package slug (e.g., "kashmir-paradise-circuit", "kashmir-honeymoon-escape") or UUID',
            },
          },
          required: ['slugOrId'],
        },
      },
      {
        name: 'search_adventure_bikes',
        description:
          'Search verified adventure motorcycles available for rental in Srinagar, Leh, and Manali. Includes Royal Enfield Himalayan 450 (Sherpa), Classic 350, and KTM 390 Adventure with carrier racks and specs.',
        inputSchema: {
          type: 'object',
          properties: {
            brand: {
              type: 'string',
              description: 'Brand filter: Royal Enfield, KTM, BMW, or Bajaj',
            },
            maxDailyRateINR: {
              type: 'number',
              description: 'Maximum daily rental rate in INR (e.g. 2500)',
            },
          },
        },
      },
      {
        name: 'compare_adventure_bikes',
        description:
          'Compare technical specifications side-by-side for up to 3 adventure motorcycles (Engine displacement cc, power BHP, torque Nm, fuel tank, ABS type, security deposit, daily rate, and mountain route suitability).',
        inputSchema: {
          type: 'object',
          properties: {
            bikeSlugs: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of 2 to 3 bike slugs (e.g. ["royal-enfield-himalayan-450", "ktm-390-adventure"])',
            },
          },
          required: ['bikeSlugs'],
        },
      },
      {
        name: 'search_car_rentals',
        description:
          'Search 4x4 mountain vehicles and passenger transport for Himalayan road trips (Mahindra Thar 4x4, Scorpio-N, Toyota Innova Crysta, Force Urbania). Includes self-drive vs chauffeur rates.',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Vehicle category: 4x4 SUV, SUV, Luxury MUV, Van',
            },
            selfDriveOnly: {
              type: 'boolean',
              description: 'Filter for vehicles permitting self-drive',
            },
            minSeats: {
              type: 'number',
              description: 'Minimum passenger seat capacity',
            },
          },
        },
      },
      {
        name: 'search_stays_and_houseboats',
        description:
          'Search curated boutique accommodations, hand-carved cedarwood houseboats on Dal Lake, ski resorts in Gulmarg, and alpine chalets in Pahalgam.',
        inputSchema: {
          type: 'object',
          properties: {
            state: {
              type: 'string',
              description: 'Region: Kashmir, Himachal, Uttarakhand, or Ladakh',
            },
            propertyType: {
              type: 'string',
              description: 'Type: Heritage Houseboat, Boutique Hotel, Ski Resort, Alpine Glamping',
            },
            maxPricePerNightINR: {
              type: 'number',
              description: 'Maximum nightly rate in INR',
            },
          },
        },
      },
      {
        name: 'list_himalayan_destinations',
        description:
          'List Himalayan destinations with elevations, best travel seasons, weather summaries, and top activities across Kashmir (Srinagar, Gulmarg, Pahalgam, Sonamarg, Gurez), Ladakh, Himachal, and Uttarakhand.',
        inputSchema: {
          type: 'object',
          properties: {
            state: {
              type: 'string',
              description: 'Filter by state: Kashmir, Himachal, Uttarakhand, Ladakh, or All',
            },
          },
        },
      },
      {
        name: 'create_booking_enquiry',
        description:
          'Create a formal booking enquiry for a tour package, adventure bike, 4x4 car, or stay. Records request in the WYYLD MILES persistent database, calculates estimated cost, and returns a unique reference code (WM-2026-XXXX).',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['PACKAGE', 'BIKE', 'CAR', 'HOTEL', 'CUSTOM'],
              description: 'Type of booking item',
            },
            itemTitle: {
              type: 'string',
              description: 'Title of the selected package, bike model, vehicle, or hotel',
            },
            customerName: {
              type: 'string',
              description: 'Full name of the traveler',
            },
            customerEmail: {
              type: 'string',
              description: 'Email address of the customer',
            },
            customerPhone: {
              type: 'string',
              description: 'Phone / WhatsApp number with country code (e.g. +919876543210)',
            },
            startDate: {
              type: 'string',
              description: 'Start date in YYYY-MM-DD format (e.g. 2026-11-25)',
            },
            endDate: {
              type: 'string',
              description: 'End date in YYYY-MM-DD format (e.g. 2026-11-30)',
            },
            guestsCount: {
              type: 'number',
              description: 'Number of travelers or riders',
            },
            pickupLocation: {
              type: 'string',
              description: 'Pickup hub (e.g., "Srinagar Airport", "Dal Lake Boulevard")',
            },
            dropoffLocation: {
              type: 'string',
              description: 'Dropoff hub',
            },
            specialRequests: {
              type: 'string',
              description: 'Special requests, dietary preferences, or gear requirements',
            },
          },
          required: [
            'type',
            'itemTitle',
            'customerName',
            'customerEmail',
            'customerPhone',
            'startDate',
            'endDate',
            'guestsCount',
          ],
        },
      },
      {
        name: 'track_enquiry_status',
        description:
          'Track the live status of an existing booking enquiry by unique reference code (e.g., "WM-2026-9340") or customer email.',
        inputSchema: {
          type: 'object',
          properties: {
            reference: {
              type: 'string',
              description: 'Enquiry reference code (e.g. "WM-2026-9340")',
            },
            customerEmail: {
              type: 'string',
              description: 'Customer email address',
            },
          },
        },
      },
    ],
  };
});

// Handle Tool Execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      // 1. Search Tour Packages
      case 'search_tour_packages': {
        const where = {};
        if (args?.region) where.region = args.region;
        if (args?.travelStyle) where.travelStyle = args.travelStyle;

        const packages = await prisma.tourPackage.findMany({
          where,
          include: { destination: true },
          orderBy: { pricePerPerson: 'asc' },
        });

        const filtered = packages.filter((p) => {
          const effectivePrice = p.discountedPrice || p.pricePerPerson;
          if (args?.maxBudgetINR && effectivePrice > args.maxBudgetINR) return false;
          if (args?.minDurationDays && p.durationDays < args.minDurationDays) return false;
          return true;
        });

        const results = filtered.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          region: p.region,
          destination: p.destination?.name,
          duration: `${p.durationNights} Nights / ${p.durationDays} Days`,
          startingPrice: formatINR(p.discountedPrice || p.pricePerPerson),
          regularPrice: formatINR(p.pricePerPerson),
          travelStyle: p.travelStyle,
          difficulty: p.difficulty,
          rating: p.rating,
          inclusions: JSON.parse(p.inclusions || '[]'),
        }));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ count: results.length, packages: results }, null, 2),
            },
          ],
        };
      }

      // 2. Get Package Details
      case 'get_package_details': {
        const pkg = await prisma.tourPackage.findFirst({
          where: {
            OR: [{ slug: args.slugOrId }, { id: args.slugOrId }],
          },
          include: { destination: true },
        });

        if (!pkg) {
          return {
            content: [{ type: 'text', text: `Package not found for "${args.slugOrId}"` }],
            isError: true,
          };
        }

        const details = {
          title: pkg.title,
          slug: pkg.slug,
          region: pkg.region,
          destination: pkg.destination?.name,
          duration: `${pkg.durationNights} Nights / ${pkg.durationDays} Days`,
          startingPriceINR: pkg.discountedPrice || pkg.pricePerPerson,
          formattedStartingPrice: formatINR(pkg.discountedPrice || pkg.pricePerPerson),
          travelStyle: pkg.travelStyle,
          difficulty: pkg.difficulty,
          rating: pkg.rating,
          inclusions: JSON.parse(pkg.inclusions || '[]'),
          exclusions: JSON.parse(pkg.exclusions || '[]'),
          itinerary: JSON.parse(pkg.itinerary || '[]'),
        };

        return {
          content: [{ type: 'text', text: JSON.stringify(details, null, 2) }],
        };
      }

      // 3. Search Adventure Bikes
      case 'search_adventure_bikes': {
        const where = {};
        if (args?.brand) where.brand = args.brand;

        const bikes = await prisma.bike.findMany({
          where,
          orderBy: { dailyRate: 'desc' },
        });

        const filtered = bikes.filter((b) => {
          if (args?.maxDailyRateINR && b.dailyRate > args.maxDailyRateINR) return false;
          return true;
        });

        const results = filtered.map((b) => ({
          id: b.id,
          slug: b.slug,
          name: b.name,
          brand: b.brand,
          category: b.category,
          engineCc: b.engineCc,
          powerBhp: b.powerBhp,
          torqueNm: b.torqueNm,
          fuelCapacityLitres: b.fuelCapacityLitres,
          absType: b.absType,
          luggageCarrier: b.luggageCarrier,
          dailyRateINR: b.dailyRate,
          formattedDailyRate: `${formatINR(b.dailyRate)} / day`,
          securityDepositINR: b.securityDeposit,
          formattedSecurityDeposit: formatINR(b.securityDeposit),
          isAvailable: b.isAvailable,
          inclusions: JSON.parse(b.inclusions || '[]'),
          suitableRoutes: JSON.parse(b.suitableRoutes || '[]'),
        }));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ count: results.length, fleet: results }, null, 2),
            },
          ],
        };
      }

      // 4. Compare Adventure Bikes
      case 'compare_adventure_bikes': {
        const slugs = args.bikeSlugs || [];
        const bikes = await prisma.bike.findMany({
          where: { slug: { in: slugs } },
        });

        const comparison = bikes.map((b) => ({
          model: b.name,
          slug: b.slug,
          brand: b.brand,
          engine: `${b.engineCc} cc`,
          power: `${b.powerBhp} BHP`,
          torque: `${b.torqueNm} Nm`,
          transmission: b.transmission,
          mileage: b.mileage,
          fuelTank: `${b.fuelCapacityLitres} Litres`,
          abs: b.absType,
          luggageCarrier: b.luggageCarrier ? 'Included (Pannier Racks)' : 'Not Included',
          dailyRate: formatINR(b.dailyRate),
          securityDeposit: formatINR(b.securityDeposit),
          suitableRoutes: JSON.parse(b.suitableRoutes || '[]'),
        }));

        return {
          content: [{ type: 'text', text: JSON.stringify(comparison, null, 2) }],
        };
      }

      // 5. Search Car Rentals
      case 'search_car_rentals': {
        const where = {};
        if (args?.category) where.category = args.category;
        if (args?.selfDriveOnly) where.selfDriveAllowed = true;

        const cars = await prisma.car.findMany({
          where,
          orderBy: { dailyRate: 'desc' },
        });

        const filtered = cars.filter((c) => {
          if (args?.minSeats && c.seats < args.minSeats) return false;
          return true;
        });

        const results = filtered.map((c) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          brand: c.brand,
          category: c.category,
          seats: c.seats,
          transmission: c.transmission,
          fuelType: c.fuelType,
          selfDriveAllowed: c.selfDriveAllowed,
          driverIncluded: c.driverIncluded,
          dailyRate: `${formatINR(c.dailyRate)} / day`,
          securityDeposit: formatINR(c.securityDeposit),
          inclusions: JSON.parse(c.inclusions || '[]'),
        }));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ count: results.length, cars: results }, null, 2),
            },
          ],
        };
      }

      // 6. Search Stays & Houseboats
      case 'search_stays_and_houseboats': {
        const where = {};
        if (args?.state) where.state = args.state;
        if (args?.propertyType) where.propertyType = args.propertyType;

        const hotels = await prisma.hotel.findMany({
          where,
          include: { destination: true },
          orderBy: { pricePerNight: 'asc' },
        });

        const filtered = hotels.filter((h) => {
          if (args?.maxPricePerNightINR && h.pricePerNight > args.maxPricePerNightINR) return false;
          return true;
        });

        const results = filtered.map((h) => ({
          id: h.id,
          slug: h.slug,
          name: h.name,
          destination: h.destination?.name,
          location: h.location,
          state: h.state,
          propertyType: h.propertyType,
          starRating: h.starRating,
          pricePerNight: `${formatINR(h.pricePerNight)} / night`,
          rating: h.rating,
          amenities: JSON.parse(h.amenities || '[]'),
          rooms: JSON.parse(h.rooms || '[]'),
        }));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ count: results.length, stays: results }, null, 2),
            },
          ],
        };
      }

      // 7. List Himalayan Destinations
      case 'list_destinations': {
        const where = {};
        if (args?.state && args.state !== 'All') where.state = args.state;

        const destinations = await prisma.destination.findMany({
          where,
          orderBy: { state: 'asc' },
        });

        const results = destinations.map((d) => ({
          name: d.name,
          slug: d.slug,
          state: d.state,
          tagline: d.tagline,
          altitude: d.altitude,
          bestSeason: d.bestSeason,
          weatherSummary: d.weatherSummary,
          permitRequired: d.permitRequired,
          popularActivities: JSON.parse(d.popularActivities || '[]'),
        }));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ count: results.length, destinations: results }, null, 2),
            },
          ],
        };
      }

      // 8. Create Booking Enquiry
      case 'create_booking_enquiry': {
        const reference = generateReference();

        // Calculate days between start and end
        const start = new Date(args.startDate);
        const end = new Date(args.endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

        // Estimate price
        let estimatedTotal = 25000;
        if (args.type === 'BIKE') estimatedTotal = 2200 * diffDays;
        else if (args.type === 'CAR') estimatedTotal = 3500 * diffDays;
        else if (args.type === 'HOTEL') estimatedTotal = 6500 * diffDays;
        else if (args.type === 'PACKAGE') estimatedTotal = 24500 * (args.guestsCount || 1);

        const newEnquiry = await prisma.enquiry.create({
          data: {
            reference,
            type: args.type,
            itemTitle: args.itemTitle,
            customerName: args.customerName,
            customerEmail: args.customerEmail,
            customerPhone: args.customerPhone,
            startDate: args.startDate,
            endDate: args.endDate,
            guestsCount: args.guestsCount || 1,
            pickupLocation: args.pickupLocation || 'Srinagar Base',
            dropoffLocation: args.dropoffLocation || 'Srinagar Base',
            specialRequests: args.specialRequests || '',
            estimatedTotal,
            status: 'PENDING',
          },
        });

        const confirmation = {
          success: true,
          reference: newEnquiry.reference,
          status: newEnquiry.status,
          message:
            'Booking enquiry successfully recorded in the WYYLD MILES persistent database. Srinagar dispatch will review slot availability.',
          bookingSummary: {
            item: newEnquiry.itemTitle,
            type: newEnquiry.type,
            traveler: newEnquiry.customerName,
            email: newEnquiry.customerEmail,
            phone: newEnquiry.customerPhone,
            dates: `${args.startDate} to ${args.endDate} (${diffDays} days)`,
            guests: newEnquiry.guestsCount,
            pickup: newEnquiry.pickupLocation,
            estimatedTotal: formatINR(newEnquiry.estimatedTotal),
          },
          trackingUrl: `http://localhost:3000/my-bookings?reference=${newEnquiry.reference}`,
          adminDeskUrl: `http://localhost:3000/admin`,
        };

        return {
          content: [{ type: 'text', text: JSON.stringify(confirmation, null, 2) }],
        };
      }

      // 9. Track Enquiry Status
      case 'track_enquiry_status': {
        const where = {};
        if (args?.reference) where.reference = args.reference;
        if (args?.customerEmail) where.customerEmail = args.customerEmail;

        if (!args?.reference && !args?.customerEmail) {
          return {
            content: [{ type: 'text', text: 'Please provide either a reference code or customerEmail' }],
            isError: true,
          };
        }

        const enquiries = await prisma.enquiry.findMany({
          where,
          orderBy: { createdAt: 'desc' },
        });

        if (enquiries.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: `No active enquiry found for reference="${args.reference || ''}" / email="${args.customerEmail || ''}".`,
              },
            ],
          };
        }

        const results = enquiries.map((e) => ({
          reference: e.reference,
          status: e.status,
          item: e.itemTitle,
          type: e.type,
          customerName: e.customerName,
          travelDates: `${e.startDate} to ${e.endDate || ''}`,
          guests: e.guestsCount,
          pickup: e.pickupLocation,
          estimatedTotal: formatINR(e.estimatedTotal || 0),
          submittedAt: e.createdAt.toISOString(),
          adminNotes: e.adminNotes || 'Under initial review by Srinagar operations desk.',
        }));

        return {
          content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown MCP tool: "${name}"`);
    }
  } catch (err) {
    return {
      content: [{ type: 'text', text: `Error executing MCP tool "${name}": ${err.message}` }],
      isError: true,
    };
  }
});

// Start Stdio Transport
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('🏔️ WYYLD MILES MCP Server running on stdio');
}

run().catch((err) => {
  console.error('Fatal error starting WYYLD MILES MCP Server:', err);
  process.exit(1);
});
