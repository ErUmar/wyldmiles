import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | WYLD MILES',
  description: 'How WYLD MILES safeguards customer personal and travel information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-gray-700 leading-relaxed">
      <div className="space-y-2">
        <span className="text-xs font-bold text-wyld-orange uppercase tracking-wider">
          Data Protection
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-wyld-forest">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-xs">
          Last Updated: November 2026 • WYLD MILES
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-subtle border border-gray-100 space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-wyld-forest">
            1. Information We Collect
          </h2>
          <p>
            When you submit a travel enquiry or rent a vehicle with WYLD MILES, we collect only necessary details to process your booking: full name, contact telephone number/WhatsApp, email address, travel dates, passenger count, and identification documents required by state authorities for high-pass permits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-wyld-forest">
            2. How We Use Your Information
          </h2>
          <p>
            Your details are used exclusively to coordinate your stay, allocate vehicles, assist with inner-line pass applications, and communicate status updates regarding your trip. We never sell or lease customer contact details to third-party telemarketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-wyld-forest">
            3. Security of Data
          </h2>
          <p>
            All submitted enquiries and identity copies are handled with strict privacy protocols and retained only for the duration required by local law enforcement and civil administration guidelines.
          </p>
        </section>
      </div>
    </div>
  );
}
