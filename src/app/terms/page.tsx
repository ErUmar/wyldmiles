import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | WYLD MILES',
  description: 'Terms of service, vehicle rental agreements, and guest guidelines.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-xs text-gray-700 leading-relaxed">
      <div className="space-y-2">
        <span className="text-xs font-bold text-wyld-orange uppercase tracking-wider">
          Legal Agreement
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-wyld-forest">
          Terms & Conditions of Service
        </h1>
        <p className="text-gray-500 text-xs">
          Last Updated: November 2026 • WYLD MILES (Kashmir, India)
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-subtle border border-gray-100 space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-wyld-forest">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using the WYLD MILES website, submitting booking enquiries, or entering into rental agreements, you acknowledge and agree to be bound by these Terms and Conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-wyld-forest">
            2. Nature of Platform & Demo Notice
          </h2>
          <p>
            This website serves as a functional digital demonstration platform. All sample pricing, availability calendars, vehicle inventories, and reviews are illustrative. Submitting an enquiry generates a reference code in our test database and prompts our concierge to follow up; no binding confirmation is created until confirmed by our authorized representative.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-wyld-forest">
            3. Vehicle Operation & Mountain Laws
          </h2>
          <p>
            Riders and drivers are required to obey all Indian Motor Vehicles Act laws, carry valid driving licences, wear certified helmets, observe pass timings established by traffic police on Zojila and Khardung La, and refrain from driving under the influence of intoxicants.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-wyld-forest">
            4. Limitation of Liability
          </h2>
          <p>
            High-altitude adventure travel entails inherent environmental risks including weather shifts, rockfalls, and Acute Mountain Sickness. Travellers are advised to obtain comprehensive domestic or international travel insurance.
          </p>
        </section>
      </div>
    </div>
  );
}
