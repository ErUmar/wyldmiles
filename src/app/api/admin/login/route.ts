import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || 'admin@wyldmiles.com';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'wyldmiles_admin_2026';

    if (
      email?.toLowerCase().trim() === expectedEmail.toLowerCase().trim() &&
      password === expectedPassword
    ) {
      return NextResponse.json({
        success: true,
        user: { email: expectedEmail, name: 'WYLD MILES Admin', role: 'ADMIN' },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid admin credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
