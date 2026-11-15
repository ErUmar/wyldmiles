import React from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, Compass, Bike, Car, Hotel, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Himalayan FAQs & Travel Guidelines | WYLD MILES',
  description:
    'Frequently asked questions regarding Himalayan bike rentals, high mountain pass permits, AMS acclimatization, security deposits, and booking procedures.',
};

export default function FAQsPage() {
  const faqs = [
    {
      q: 'What driving licence and documents are required to rent an adventure motorcycle?',
      a: 'To rent any motorcycle with WYLD MILES, riders must present an original valid Indian Driving Licence (MCWG - Motorcycle with Gear) or an International Driving Permit (IDP) with motorcycle endorsement. In addition, an original government-issued photo ID (Aadhaar card or Passport) and minimum rider age of 21 years is required at key handover.',
    },
    {
      q: 'How does the refundable security deposit work for bike and car rentals?',
      a: 'A refundable security deposit (ranging from ₹5,000 for standard bikes to ₹12,000 for premium ADV motorcycles, and ₹10,000 for 4x4 self-drive vehicles) is collected at pickup. Upon vehicle return and completion of a physical inspection, the full deposit is immediately released to your original UPI or bank account.',
    },
    {
      q: 'Do I need special inner-line permits to travel to Gurez Valley, Pangong Tso, or Nubra Valley?',
      a: 'Yes, certain frontier and high-altitude circuits (such as Gurez Valley near the Line of Control in Kashmir, and Pangong Lake, Nubra Valley, and Hanle in Ladakh) require official Inner Line Permits (ILP) or Protected Area Permits. WYLD MILES assists with all documentation and permit clearance for our tour package and rental guests.',
    },
    {
      q: 'What is Acute Mountain Sickness (AMS) and how should I acclimatize in Ladakh or Spiti?',
      a: 'When ascending above 8,000 ft (such as arriving in Leh at 11,500 ft or Kaza in Spiti at 12,500 ft), your body needs time to adapt to lower oxygen levels. We mandate 48 hours of rest with zero intense physical exertion upon landing in Leh. Stay well hydrated, avoid alcohol, and carry our recommended portable oxygen cylinders over high passes like Khardung La (17,982 ft).',
    },
    {
      q: 'What happens if a motorcycle experiences a breakdown on a remote Himalayan pass?',
      a: 'All our adventure motorcycles (Royal Enfield Himalayan 450, KTM 390 Adventure, etc.) are issued with emergency tool kits, spare clutch cables, spark plugs, and puncture repair kits. For organized group expeditions, a dedicated 4x4 backup vehicle carrying a certified mechanic and spare parts follows the convoy.',
    },
    {
      q: 'Are your Dal Lake houseboats heated during winter?',
      a: 'Yes! Our handpicked heritage cedarwood houseboats on Dal Lake and Nigeen Lake are equipped with central heating radiators, hot water geysers, heated electric blankets, and traditional Kashmiri bukharis (wood-burning stoves) for cozy stays even during snowfall.',
    },
    {
      q: 'Is this website live or demonstration inventory?',
      a: 'This website is a production-quality demonstration platform for WYLD MILES. All tour packages, vehicle listings, hotel rooms, and customer ratings are illustrative demo data. Enquiries submitted on this site are stored in our demo database and do not initiate real credit card charges.',
    },
  ];

  return (
    <div className="space-y-12 pb-24">
      <section className="bg-wyld-forestDark text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Clear Answers for Mountain Travellers
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-wyld-sage max-w-xl mx-auto leading-relaxed">
            Everything you need to know about Himalayan motorcycle rentals, pass permits, weather safety, and our booking process.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-subtle border border-gray-100 space-y-2 text-xs text-gray-700"
          >
            <h3 className="font-bold text-sm text-wyld-forest flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-wyld-orange shrink-0 mt-0.5" />
              <span>{faq.q}</span>
            </h3>
            <p className="text-gray-600 leading-relaxed pl-6 text-xs">{faq.a}</p>
          </div>
        ))}

        <div className="bg-wyld-ivory p-6 rounded-2xl border border-gray-200 text-center space-y-3 mt-8">
          <h4 className="font-serif text-lg font-bold text-wyld-forest">
            Still have questions about your upcoming Himalayan expedition?
          </h4>
          <p className="text-xs text-gray-600">
            Our Srinagar concierge is available on WhatsApp daily from 07:00 AM to 10:00 PM IST.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-wyld-orange hover:bg-wyld-orangeHover text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition"
          >
            Contact Base Camp Desk
          </Link>
        </div>
      </section>
    </div>
  );
}
