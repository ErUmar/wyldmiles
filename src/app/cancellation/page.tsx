import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | WYLD MILES',
  description: 'Cancellation, weather postponement, and security deposit refund guidelines.',
};

export default function CancellationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-gray-700 leading-relaxed">
      <div className="space-y-2">
        <span className="text-xs font-bold text-wyld-orange uppercase tracking-wider">
          Fair Mountain Terms
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-wyld-forest">
          Cancellation & Refund Policy
        </h1>
        <p className="text-gray-500 text-xs">
          Effective Date: November 2026 • WYLD MILES Himalayan Expeditions
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-subtle border border-gray-100 space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-wyld-forest">
            1. Tour Package Cancellations
          </h2>
          <p>
            Mountain journeys involve advance logistics, hotel hold guarantees, and dedicated vehicle pilot allocations. The following cancellation slabs apply for package bookings:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>30+ Days Prior to Departure:</strong> 90% refund of deposit amount (10% administrative processing fee withheld).</li>
            <li><strong>15 to 29 Days Prior to Departure:</strong> 50% refund of total package value.</li>
            <li><strong>0 to 14 Days Prior to Departure:</strong> Non-refundable due to non-recoverable hotel and permit allocations.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-wyld-forest">
            2. Weather Postponements & Act of God (Force Majeure)
          </h2>
          <p>
            High Himalayan passes (e.g. Zojila, Rohtang, Kunzum) are subject to sudden heavy snowfall, landslides, or cloudbursts. If a pass or valley is officially closed by the Border Roads Organisation (BRO) or civil authorities:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We offer full travel credit vouchers valid for 18 months at no rescheduling fee.</li>
            <li>Whenever possible, our concierge will re-route the itinerary to accessible valley circuits (e.g. Doodhpathri, Yusmarg, Pahalgam) without additional operational surcharges.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-wyld-forest">
            3. Motorcycle & Vehicle Rental Cancellations
          </h2>
          <p>
            For individual bike and car rentals, full refund is granted if cancellation request is received at least 72 hours before the scheduled pickup time. Cancellations within 72 hours incur a 1-day rental charge.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-wyld-forest">
            4. Security Deposit Release
          </h2>
          <p>
            Vehicle security deposits are completely segregated from rental fees. Upon returning the vehicle in good order with normal road wear-and-tear, the full deposit is released within 60 minutes via instant UPI or IMPS transfer.
          </p>
        </section>
      </div>
    </div>
  );
}
