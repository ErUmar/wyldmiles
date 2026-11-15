import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { formatINR, generateBookingReference } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const TOOLS = [
  {
    name: 'search_tour_packages',
    description: 'Search curated Himalayan tour packages across Kashmir, Himachal, Uttarakhand, and Ladakh.',
    inputSchema: {
      type: 'object',
      properties: {
        region: { type: 'string', enum: ['Kashmir', 'Himachal', 'Uttarakhand', 'Ladakh'] },
        travelStyle: { type: 'string' },
        maxBudgetINR: { type: 'number' },
        minDurationDays: { type: 'number' },
      },
    },
  },
  {
    name: 'get_package_details',
    description: 'Get comprehensive details for a specific tour package by slug or ID.',
    inputSchema: {
      type: 'object',
      properties: { slugOrId: { type: 'string' } },
      required: ['slugOrId'],
    },
  },
  {
    name: 'search_adventure_bikes',
    description: 'Search verified adventure motorcycles available for rental in Srinagar, Leh, and Manali.',
    inputSchema: {
      type: 'object',
      properties: { brand: { type: 'string' }, maxDailyRateINR: { type: 'number' } },
    },
  },
  {
    name: 'compare_adventure_bikes',
    description: 'Compare technical specs side-by-side for up to 3 adventure motorcycles.',
    inputSchema: {
      type: 'object',
      properties: { bikeSlugs: { type: 'array', items: { type: 'string' } } },
      required: ['bikeSlugs'],
    },
  },
  {
    name: 'search_car_rentals',
    description: 'Search 4x4 mountain vehicles and passenger transport for Himalayan road trips.',
    inputSchema: {
      type: 'object',
      properties: { category: { type: 'string' }, selfDriveOnly: { type: 'boolean' }, minSeats: { type: 'number' } },
    },
  },
  {
    name: 'search_stays_and_houseboats',
    description: 'Search curated boutique accommodations, Dal Lake cedar houseboats, and alpine chalets.',
    inputSchema: {
      type: 'object',
      properties: { state: { type: 'string' }, propertyType: { type: 'string' }, maxPricePerNightINR: { type: 'number' } },
    },
  },
  {
    name: 'list_himalayan_destinations',
    description: 'List Himalayan destinations with elevations, best seasons, and activities.',
    inputSchema: {
      type: 'object',
      properties: { state: { type: 'string' } },
    },
  },
  {
    name: 'create_booking_enquiry',
    description: 'Create a formal booking enquiry for a package, bike, car, or stay.',
    inputSchema: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['PACKAGE', 'BIKE', 'CAR', 'HOTEL', 'CUSTOM'] },
        itemTitle: { type: 'string' },
        customerName: { type: 'string' },
        customerEmail: { type: 'string' },
        customerPhone: { type: 'string' },
        startDate: { type: 'string' },
        endDate: { type: 'string' },
        guestsCount: { type: 'number' },
        pickupLocation: { type: 'string' },
        specialRequests: { type: 'string' },
      },
      required: ['type', 'itemTitle', 'customerName', 'customerEmail', 'customerPhone', 'startDate', 'endDate', 'guestsCount'],
    },
  },
  {
    name: 'track_enquiry_status',
    description: 'Track the live status of an existing booking enquiry by reference code or email.',
    inputSchema: {
      type: 'object',
      properties: { reference: { type: 'string' }, customerEmail: { type: 'string' } },
    },
  },
];

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    server: 'wyld-miles-mcp-server',
    version: '1.0.0',
    description: 'WYYLD MILES Model Context Protocol (MCP) HTTP Endpoint',
    protocol: 'jsonrpc-2.0',
    toolsCount: TOOLS.length,
    tools: TOOLS,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jsonrpc, id, method, params } = body;

    if (jsonrpc !== '2.0') {
      return NextResponse.json({ jsonrpc: '2.0', id: id || null, error: { code: -32600, message: 'Invalid Request: jsonrpc must be 2.0' } });
    }

    // 1. Initialize
    if (method === 'initialize') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'wyld-miles-mcp-server', version: '1.0.0' },
        },
      });
    }

    // 2. Tools List
    if (method === 'tools/list') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id,
        result: { tools: TOOLS },
      });
    }

    // 3. Tools Call
    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      switch (toolName) {
        case 'search_tour_packages': {
          const where: any = {};
          if (args.region) where.region = args.region;
          if (args.travelStyle) where.travelStyle = args.travelStyle;

          const packages = await prisma.tourPackage.findMany({
            where,
            include: { destination: true },
            orderBy: { pricePerPerson: 'asc' },
          });

          const results = packages.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            region: p.region,
            destination: p.destination?.name,
            duration: `${p.durationNights}N / ${p.durationDays}D`,
            startingPrice: formatINR(p.discountedPrice || p.pricePerPerson),
            rating: p.rating,
          }));

          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            result: { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] },
          });
        }

        case 'search_adventure_bikes': {
          const where: any = {};
          if (args.brand) where.brand = args.brand;

          const bikes = await prisma.bike.findMany({ where, orderBy: { dailyRate: 'desc' } });
          const results = bikes.map((b) => ({
            id: b.id,
            slug: b.slug,
            name: b.name,
            brand: b.brand,
            engineCc: b.engineCc,
            powerBhp: b.powerBhp,
            torqueNm: b.torqueNm,
            dailyRate: `${formatINR(b.dailyRate)} / day`,
            deposit: formatINR(b.securityDeposit),
            luggageCarrier: b.luggageCarrier,
          }));

          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            result: { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] },
          });
        }

        case 'create_booking_enquiry': {
          const reference = generateBookingReference();
          const start = new Date(args.startDate);
          const end = new Date(args.endDate);
          const diffDays = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

          let estimatedTotal = 25000;
          if (args.type === 'BIKE') estimatedTotal = 2200 * diffDays;
          else if (args.type === 'CAR') estimatedTotal = 3500 * diffDays;
          else if (args.type === 'HOTEL') estimatedTotal = 6500 * diffDays;
          else if (args.type === 'PACKAGE') estimatedTotal = 24500 * (args.guestsCount || 1);

          const enquiry = await prisma.enquiry.create({
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
              estimatedTotal,
              status: 'PENDING',
            },
          });

          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    {
                      success: true,
                      reference: enquiry.reference,
                      status: enquiry.status,
                      trackingUrl: `http://localhost:3000/my-bookings?reference=${enquiry.reference}`,
                    },
                    null,
                    2
                  ),
                },
              ],
            },
          });
        }

        case 'track_enquiry_status': {
          const where: any = {};
          if (args.reference) where.reference = args.reference;
          if (args.customerEmail) where.customerEmail = args.customerEmail;

          const enquiries = await prisma.enquiry.findMany({ where, orderBy: { createdAt: 'desc' } });
          const results = enquiries.map((e) => ({
            reference: e.reference,
            status: e.status,
            item: e.itemTitle,
            type: e.type,
            traveler: e.customerName,
            estimatedTotal: formatINR(e.estimatedTotal || 0),
            submittedAt: e.createdAt.toISOString(),
          }));

          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            result: { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] },
          });
        }

        default: {
          return NextResponse.json({
            jsonrpc: '2.0',
            id,
            error: { code: -32601, message: `Method not found: ${toolName}` },
          });
        }
      }
    }

    return NextResponse.json({
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Unknown method: ${method}` },
    });
  } catch (err: any) {
    return NextResponse.json(
      { jsonrpc: '2.0', id: null, error: { code: -32603, message: err.message || 'Internal error' } },
      { status: 500 }
    );
  }
}
