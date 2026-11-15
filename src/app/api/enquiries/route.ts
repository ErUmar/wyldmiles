import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateBookingReference } from '@/lib/utils';
import { z } from 'zod';

const enquirySchema = z.object({
  type: z.enum(['PACKAGE', 'HOTEL', 'BIKE', 'CAR', 'CUSTOM']),
  itemId: z.string().optional().nullable(),
  itemTitle: z.string().min(2),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(7),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  guestsCount: z.number().int().positive().default(1),
  pickupLocation: z.string().optional().nullable(),
  dropoffLocation: z.string().optional().nullable(),
  specialRequests: z.string().optional().nullable(),
  estimatedTotal: z.number().nonnegative().default(0),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validated = enquirySchema.parse(json);

    const reference = generateBookingReference();

    const enquiry = await prisma.enquiry.create({
      data: {
        reference,
        type: validated.type,
        itemId: validated.itemId || null,
        itemTitle: validated.itemTitle,
        customerName: validated.customerName,
        customerEmail: validated.customerEmail,
        customerPhone: validated.customerPhone,
        startDate: validated.startDate,
        endDate: validated.endDate || null,
        guestsCount: validated.guestsCount,
        pickupLocation: validated.pickupLocation || null,
        dropoffLocation: validated.dropoffLocation || null,
        specialRequests: validated.specialRequests || null,
        estimatedTotal: validated.estimatedTotal,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      reference: enquiry.reference,
      enquiryId: enquiry.id,
      message: 'Enquiry received successfully. A local concierge will review and contact you.',
    });
  } catch (error: any) {
    console.error('Error creating enquiry:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors[0]?.message || 'Validation error' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');
    const email = searchParams.get('email');

    const where: any = {};
    if (reference) {
      where.reference = { equals: reference.trim().toUpperCase() };
    }
    if (email) {
      where.customerEmail = { equals: email.trim().toLowerCase() };
    }

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ success: true, enquiries });
  } catch (error: any) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}
