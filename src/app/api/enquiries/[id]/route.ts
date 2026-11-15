import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, adminNotes } = body;

    const data: any = {};
    if (status) data.status = status;
    if (adminNotes !== undefined) data.adminNotes = adminNotes;

    const updated = await prisma.enquiry.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error: any) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update enquiry' },
      { status: 500 }
    );
  }
}
