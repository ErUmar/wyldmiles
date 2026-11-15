'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Compass,
  ShieldCheck,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Tour Packages');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  const handleWhatsApp = () => {
    const text = `Hi WYLD MILES! Contacting you from the website regarding: ${category}.\nName: ${name || 'Traveller'}\nMessage: ${message || 'Need assistance planning a Himalayan journey.'}`;
    window.open(getWhatsAppUrl({ text }), '_blank');
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header with Logo */}
      <section className="relative bg-[#0E1513] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-400/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-amber-400/40 shadow-xl mx-auto bg-black">
            <img src="/logo.jpg" alt="WYYLD MILES" className="w-full h-full object-cover" />
          </div>
          <span className="inline-block text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            24/7 Srinagar Base Camp Helpline
          </span>
          <h1 className="font-sans text-3xl sm:text-5xl font-black text-white leading-tight uppercase tracking-tight">
            Connect with Our Kashmir Team
          </h1>
          <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Have questions regarding weather, high-altitude passes, bike rentals, or customized itineraries? Our local Kashmiri concierge team is at your service.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-wyld-orange uppercase tracking-wider">
                Direct Contact
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wyld-forest">
                Headquarters & Dispatch Desks
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Whether you are touching down at Srinagar Airport, preparing for Khardung La in Leh, or arriving in Manali, our desks are staffed seven days a week.
              </p>
            </div>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="bg-white p-4 rounded-2xl shadow-subtle border border-gray-100 flex items-start gap-3.5">
                <div className="p-2.5 bg-wyld-orange/15 text-wyld-orange rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-wyld-forest">Srinagar Head Office (Base Camp)</h4>
                  <p className="text-gray-500 mt-0.5">
                    Boulevard Road, Gate 1, Dal Lake, Srinagar, Jammu & Kashmir 190001, India
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-subtle border border-gray-100 flex items-start gap-3.5">
                <div className="p-2.5 bg-emerald-500/15 text-emerald-600 rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-wyld-forest">24/7 Mountain Helpline & Bookings</h4>
                  <p className="text-gray-500 mt-0.5">+91 98765 43210 (Demo Contact Number)</p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Available for WhatsApp & Urgent Trip Support</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-subtle border border-gray-100 flex items-start gap-3.5">
                <div className="p-2.5 bg-cyan-500/15 text-cyan-600 rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-wyld-forest">Email Communications</h4>
                  <p className="text-gray-500 mt-0.5">reservations@wyldmiles.com / support@wyldmiles.com</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-subtle border border-gray-100 flex items-start gap-3.5">
                <div className="p-2.5 bg-amber-500/15 text-amber-600 rounded-xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-wyld-forest">Operating Hours</h4>
                  <p className="text-gray-500 mt-0.5">
                    Concierge: 07:00 AM to 10:00 PM IST (Daily)
                    <br />
                    Emergency Highway Breakdown Rescue: 24/7 on Active Circuits
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect Immediately on WhatsApp (+91 98765 43210)</span>
            </button>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-gray-100">
            {isSent ? (
              <div className="text-center py-12 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-wyld-forest">
                  Message Sent to Srinagar Base!
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A dedicated mountain coordinator will review your request and contact you within 2 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="bg-wyld-orange text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-serif text-xl font-bold text-wyld-forest mb-2">
                  Send Us an Inquiry
                </h3>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Meera Nambiar"
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. meera@example.com"
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Subject / Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange font-medium"
                  >
                    <option value="Tour Packages">Himalayan Tour Packages</option>
                    <option value="Bike Rentals">Bike Rental (Himalayan 450 / KTM 390)</option>
                    <option value="Car Rentals">Car & 4x4 Rental</option>
                    <option value="Hotels & Stays">Houseboats & Boutique Stays</option>
                    <option value="Custom Itinerary">Bespoke Himalayan Expedition</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Your Message or Dates</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Tell us your approximate travel dates, preferred route, group size, or questions..."
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange text-xs"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-wyld-forest hover:bg-wyld-forestDark text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Send Enquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
