'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Compass, Bike, Car, Hotel, Palmtree } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<'bike' | 'tour' | 'hotel' | 'car' | 'custom'>('tour');
  const [userQuery, setUserQuery] = useState('');

  const topics = [
    { id: 'tour', label: 'Tour Packages', icon: Palmtree, prefill: 'Hi WYLD MILES team! I would like to enquire about Himalayan tour packages.' },
    { id: 'bike', label: 'Himalayan Bike Rental', icon: Bike, prefill: 'Hi! I am interested in renting a Himalayan adventure bike (Royal Enfield / KTM).' },
    { id: 'car', label: 'Car / 4x4 Rental', icon: Car, prefill: 'Hello! I am looking for car / 4x4 rental in Kashmir / Himachal.' },
    { id: 'hotel', label: 'Stays & Houseboats', icon: Hotel, prefill: 'Hi! I want to check rates and availability for houseboats and mountain resorts.' },
    { id: 'custom', label: 'Custom Itinerary', icon: Compass, prefill: 'Hello! Can you help curate a customized Himalayan road-trip itinerary for my group?' },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const active = topics.find((t) => t.id === selectedTopic);
    const message = userQuery.trim()
      ? `${active?.prefill}\n\nAdditional notes: ${userQuery.trim()}`
      : active?.prefill || 'Hello WYLD MILES!';
    window.open(getWhatsAppUrl({ text: message }), '_blank');
    setIsOpen(false);
    setUserQuery('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden transform transition-all animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#0E1513] border-b border-amber-400/20 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/40 bg-black">
                  <img src="/logo.jpg" alt="WYYLD MILES" className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
              </div>
              <div>
                <h4 className="font-sans font-black text-xs uppercase tracking-wide text-white">
                  WYYLD<span className="text-amber-400"> MILES</span> Concierge
                </h4>
                <p className="text-[10px] text-emerald-400 font-medium">Srinagar Operations • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-emerald-50/40 text-xs text-wyld-charcoal space-y-3">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm border border-emerald-100 text-xs leading-relaxed text-gray-700">
              👋 Salam & Greetings from Kashmir! What Himalayan experience can we help you plan today?
            </div>

            {/* Quick Topic Buttons */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                Select Enquiry Topic:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {topics.map((t) => {
                  const Icon = t.icon;
                  const isSelected = selectedTopic === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTopic(t.id as any)}
                      className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] font-medium text-left transition border ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white hover:bg-emerald-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                      <span className="truncate">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional message input */}
            <form onSubmit={handleSend} className="pt-2">
              <textarea
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Dates, group size, specific route? (optional)"
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-2 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Chat (+91 98765 43210)</span>
              </button>
            </form>

            <p className="text-[10px] text-gray-500 text-center">
              Illustrative demo concierge service for WYLD MILES.
            </p>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105"
        aria-label="Open WhatsApp live chat"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          {isOpen ? 'Close Concierge' : 'WhatsApp Concierge'}
        </span>
      </button>
    </div>
  );
}
