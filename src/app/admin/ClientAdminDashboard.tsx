'use client';

import React, { useState } from 'react';
import {
  Shield,
  Key,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Bike,
  Car,
  Hotel,
  Compass,
  DollarSign,
  AlertCircle,
  FileText,
  Save,
  MessageCircle,
  LogOut,
  Sparkles,
  Search,
} from 'lucide-react';
import { formatINR, getWhatsAppUrl } from '@/lib/utils';
import { Enquiry, Bike as BikeType, Car as CarType, TourPackage, Hotel as HotelType, Destination } from '@/types';

interface ClientAdminDashboardProps {
  initialEnquiries: Enquiry[];
  initialBikes: BikeType[];
  initialCars: CarType[];
  initialPackages: TourPackage[];
  initialHotels: HotelType[];
  initialDestinations: Destination[];
}

export default function ClientAdminDashboard({
  initialEnquiries,
  initialBikes,
  initialCars,
  initialPackages,
  initialHotels,
  initialDestinations,
}: ClientAdminDashboardProps) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('admin@wyldmiles.com');
  const [passwordInput, setPasswordInput] = useState('wyldmiles_admin_2026');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'enquiries' | 'bikes' | 'cars' | 'packages' | 'hotels'>('enquiries');

  // Enquiries list & status updater
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [enquirySearch, setEnquirySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Authentication failed. Check credentials.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Error communicating with server.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string, adminNotes?: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, adminNotes }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus as any, adminNotes: adminNotes || item.adminNotes } : item
          )
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Pipeline metrics
  const totalPipeline = enquiries.reduce((sum, e) => sum + (e.estimatedTotal || 0), 0);
  const pendingCount = enquiries.filter((e) => e.status === 'PENDING').length;
  const confirmedCount = enquiries.filter((e) => e.status === 'CONFIRMED').length;

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter !== 'ALL' && e.status !== statusFilter) return false;
    if (
      enquirySearch.trim() &&
      !e.reference.toLowerCase().includes(enquirySearch.toLowerCase()) &&
      !e.customerName.toLowerCase().includes(enquirySearch.toLowerCase()) &&
      !e.itemTitle.toLowerCase().includes(enquirySearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // If not logged in, show secure login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-card border border-gray-100 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-amber-400/50 shadow-md mx-auto bg-black">
              <img src="/logo.jpg" alt="WYYLD MILES" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-sans text-2xl font-black text-gray-950 uppercase tracking-wide">
                WYYLD<span className="text-amber-500"> MILES</span>
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mt-0.5">
                Srinagar HQ Admin Dispatch Portal
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Fleet Operations & Real-Time Booking Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="font-bold text-gray-700 block mb-1">Admin Email</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
                required
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wyld-orange"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-wyld-forest hover:bg-wyld-forestDark text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4 text-amber-400" />
              <span>{isLoggingIn ? 'Authenticating...' : 'Sign In to Operations Desk'}</span>
            </button>
          </form>

          <div className="bg-wyld-ivory p-3.5 rounded-xl border border-gray-200 text-[11px] text-gray-600 space-y-1">
            <span className="font-bold text-wyld-forest block">Demo Credentials:</span>
            <p>Email: <code className="bg-white px-1.5 py-0.5 rounded border">admin@wyldmiles.com</code></p>
            <p>Password: <code className="bg-white px-1.5 py-0.5 rounded border">wyldmiles_admin_2026</code></p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-amber-400/40 shadow bg-black shrink-0">
            <img src="/logo.jpg" alt="WYYLD MILES" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="bg-amber-400/20 text-amber-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Srinagar HQ Command Desk
            </span>
            <h1 className="font-sans text-xl sm:text-2xl font-black text-gray-950 mt-0.5">
              WYYLD MILES Dispatch & Operations
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAuthenticated(false)}
          className="self-start sm:self-auto flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl shadow-subtle border border-gray-100 space-y-1">
          <span className="text-gray-400 font-bold uppercase text-[10px] block">Total Enquiries</span>
          <span className="font-serif text-2xl font-bold text-wyld-forest">{enquiries.length}</span>
          <span className="text-gray-500 text-[11px] block">{pendingCount} awaiting review</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-subtle border border-gray-100 space-y-1">
          <span className="text-gray-400 font-bold uppercase text-[10px] block">Confirmed Bookings</span>
          <span className="font-serif text-2xl font-bold text-emerald-600">{confirmedCount}</span>
          <span className="text-emerald-700 text-[11px] block">Vouchers issued</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-subtle border border-gray-100 space-y-1">
          <span className="text-gray-400 font-bold uppercase text-[10px] block">Estimated Pipeline</span>
          <span className="font-serif text-2xl font-bold text-wyld-orange">{formatINR(totalPipeline)}</span>
          <span className="text-gray-500 text-[11px] block">All logged requests</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-subtle border border-gray-100 space-y-1">
          <span className="text-gray-400 font-bold uppercase text-[10px] block">Active Fleet</span>
          <span className="font-serif text-2xl font-bold text-cyan-700">
            {initialBikes.length + initialCars.length}
          </span>
          <span className="text-gray-500 text-[11px] block">
            {initialBikes.length} Bikes • {initialCars.length} Vehicles
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2 text-xs font-bold">
        {[
          { id: 'enquiries', label: `Booking Enquiries (${enquiries.length})`, icon: FileText },
          { id: 'bikes', label: `Bike Fleet (${initialBikes.length})`, icon: Bike },
          { id: 'cars', label: `Car & 4x4 Fleet (${initialCars.length})`, icon: Car },
          { id: 'packages', label: `Tour Packages (${initialPackages.length})`, icon: Compass },
          { id: 'hotels', label: `Stays & Houseboats (${initialHotels.length})`, icon: Hotel },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
                isActive
                  ? 'bg-wyld-forest text-white shadow'
                  : 'text-gray-600 hover:text-wyld-forest hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ENQUIRIES MANAGEMENT */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">
                Filter Status:
              </span>
              {['ALL', 'PENDING', 'UNDER_REVIEW', 'CONFIRMED', 'CANCELLED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                    statusFilter === st
                      ? 'bg-wyld-orange text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                value={enquirySearch}
                onChange={(e) => setEnquirySearch(e.target.value)}
                placeholder="Search reference, customer..."
                className="w-full p-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-wyld-orange"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredEnquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white p-5 rounded-2xl shadow-subtle border border-gray-100 space-y-4 text-xs text-gray-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-base font-bold text-wyld-forest">
                      {enq.reference}
                    </span>
                    <span className="bg-wyld-ivory px-2 py-0.5 rounded text-[10px] font-bold text-gray-600 uppercase">
                      {enq.type}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      {new Date(enq.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-semibold text-[11px]">Status:</span>
                    <select
                      value={enq.status}
                      disabled={updatingId === enq.id}
                      onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                      className={`font-bold text-xs p-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                        enq.status === 'CONFIRMED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : enq.status === 'UNDER_REVIEW'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : enq.status === 'CANCELLED'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-blue-50 text-blue-800 border-blue-300'
                      }`}
                    >
                      <option value="PENDING">PENDING (Submitted)</option>
                      <option value="UNDER_REVIEW">UNDER_REVIEW (Concierge Checking)</option>
                      <option value="CONFIRMED">CONFIRMED (Voucher Issued)</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">Customer Info</span>
                    <strong className="text-gray-900 block mt-0.5">{enq.customerName}</strong>
                    <span className="text-gray-500 block">{enq.customerPhone}</span>
                    <span className="text-gray-500 block truncate">{enq.customerEmail}</span>
                  </div>

                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">Product & Dates</span>
                    <strong className="text-gray-900 block mt-0.5">{enq.itemTitle}</strong>
                    <span className="text-gray-500 block">
                      {enq.startDate} {enq.endDate ? `to ${enq.endDate}` : ''}
                    </span>
                    <span className="text-gray-500 block">{enq.guestsCount} Guests / Riders</span>
                  </div>

                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">Hub & Locations</span>
                    <span className="text-gray-800 block mt-0.5">Pickup: {enq.pickupLocation || 'Srinagar'}</span>
                    <span className="text-gray-800 block">Dropoff: {enq.dropoffLocation || 'Srinagar'}</span>
                  </div>

                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">Estimated Value</span>
                    <span className="font-serif text-lg font-bold text-wyld-forest block mt-0.5">
                      {formatINR(enq.estimatedTotal)}
                    </span>
                  </div>
                </div>

                {enq.specialRequests && (
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-[11px]">
                    <strong>Client Request:</strong> {enq.specialRequests}
                  </div>
                )}

                {/* Concierge Notes Editor */}
                <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                  <input
                    type="text"
                    defaultValue={enq.adminNotes || ''}
                    placeholder="Add internal concierge note..."
                    onBlur={(e) => {
                      if (e.target.value !== (enq.adminNotes || '')) {
                        handleUpdateStatus(enq.id, enq.status, e.target.value);
                      }
                    }}
                    className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-wyld-orange"
                  />
                  <a
                    href={getWhatsAppUrl({
                      number: enq.customerPhone,
                      text: `Hello ${enq.customerName}! WYLD MILES Concierge here regarding your enquiry ${enq.reference} for ${enq.itemTitle}.`,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Client</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BIKES INVENTORY */}
      {activeTab === 'bikes' && (
        <div className="bg-white rounded-2xl shadow-subtle border border-gray-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-wyld-ivory border-b border-gray-200 text-gray-600 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Motorcycle</th>
                <th className="p-3">Category</th>
                <th className="p-3">Engine</th>
                <th className="p-3">Daily Rate</th>
                <th className="p-3">Deposit</th>
                <th className="p-3">Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialBikes.map((bike) => (
                <tr key={bike.id} className="hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-3">
                    <img src={bike.heroImage} alt="" className="w-12 h-10 object-cover rounded-lg" />
                    <span className="font-bold text-gray-900">{bike.name}</span>
                  </td>
                  <td className="p-3">{bike.category}</td>
                  <td className="p-3">{bike.engineCc} cc ({bike.powerBhp} bhp)</td>
                  <td className="p-3 font-bold text-wyld-forest">{formatINR(bike.dailyRate)}</td>
                  <td className="p-3 font-semibold text-gray-700">{formatINR(bike.securityDeposit)}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Ready for Ride
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: CARS INVENTORY */}
      {activeTab === 'cars' && (
        <div className="bg-white rounded-2xl shadow-subtle border border-gray-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-wyld-ivory border-b border-gray-200 text-gray-600 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Category</th>
                <th className="p-3">Seats / Luggage</th>
                <th className="p-3">Mode</th>
                <th className="p-3">Daily Rate</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialCars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-3">
                    <img src={car.heroImage} alt="" className="w-12 h-10 object-cover rounded-lg" />
                    <span className="font-bold text-gray-900">{car.name}</span>
                  </td>
                  <td className="p-3">{car.category}</td>
                  <td className="p-3">{car.seats} Seats • {car.luggageBags} Bags</td>
                  <td className="p-3">
                    <span className="font-semibold text-gray-700">
                      {car.selfDriveAllowed ? 'Self-Drive' : 'Chauffeur Driven'}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-wyld-forest">{formatINR(car.dailyRate)}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Operational
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: TOUR PACKAGES */}
      {activeTab === 'packages' && (
        <div className="bg-white rounded-2xl shadow-subtle border border-gray-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-wyld-ivory border-b border-gray-200 text-gray-600 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Package Title</th>
                <th className="p-3">Region</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Style</th>
                <th className="p-3">Price / Person</th>
                <th className="p-3">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-3 font-bold text-gray-900">
                    <img src={pkg.heroImage} alt="" className="w-12 h-10 object-cover rounded-lg" />
                    <span>{pkg.title}</span>
                  </td>
                  <td className="p-3">{pkg.region}</td>
                  <td className="p-3">{pkg.durationNights}N / {pkg.durationDays}D</td>
                  <td className="p-3">{pkg.travelStyle}</td>
                  <td className="p-3 font-bold text-wyld-forest">{formatINR(pkg.discountedPrice || pkg.pricePerPerson)}</td>
                  <td className="p-3">{pkg.rating} ({pkg.reviewsCount})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: HOTELS */}
      {activeTab === 'hotels' && (
        <div className="bg-white rounded-2xl shadow-subtle border border-gray-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-wyld-ivory border-b border-gray-200 text-gray-600 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Property Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Location</th>
                <th className="p-3">Nightly Rate</th>
                <th className="p-3">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initialHotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-3 font-bold text-gray-900">
                    <img src={hotel.heroImage} alt="" className="w-12 h-10 object-cover rounded-lg" />
                    <span>{hotel.name}</span>
                  </td>
                  <td className="p-3">{hotel.propertyType}</td>
                  <td className="p-3">{hotel.location}</td>
                  <td className="p-3 font-bold text-wyld-forest">{formatINR(hotel.pricePerNight)}</td>
                  <td className="p-3">{hotel.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
