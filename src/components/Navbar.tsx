'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Compass,
  ArrowUpRight,
  Shield,
  Bike,
  Car,
  Hotel,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Tour Packages', href: '/packages' },
    {
      label: 'Bike Rentals',
      href: '/bike-rentals',
      badge: 'Flagship',
    },
    { label: 'Car & 4x4s', href: '/car-rentals' },
    { label: 'Hotels & Houseboats', href: '/hotels' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1311]/95 backdrop-blur-md shadow-card border-b border-amber-400/20 text-white'
          : 'bg-[#0E1513] text-white border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Authentic WYYLD MILES Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-amber-400/40 shadow-lg shadow-black/50 group-hover:border-amber-400 group-hover:shadow-amber-500/20 transition-all bg-black flex-shrink-0">
              <img
                src="/logo.jpg"
                alt="WYYLD MILES Himalayan Travel & Rentals Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-white font-sans uppercase leading-none">
                WYYLD<span className="text-amber-400"> MILES</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-amber-200/90 font-bold mt-1">
                Kashmir • Himalayas
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-white bg-white/15 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="text-[9px] bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 px-1.5 py-0.2 rounded-full font-extrabold uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/admin"
              className="text-xs font-medium text-gray-300 hover:text-white px-3 py-2 rounded-full hover:bg-white/10 transition flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin</span>
            </Link>

            <Link
              href="/my-bookings"
              className="text-xs font-medium text-gray-300 hover:text-white px-3 py-2 rounded-full hover:bg-white/10 transition"
            >
              My Bookings
            </Link>

            <Link
              href="/book"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 text-xs font-extrabold pl-4 pr-1.5 py-2 rounded-full transition-all shadow-md flex items-center gap-2 group"
            >
              <span className="tracking-wide">Book Now</span>
              <div className="w-6 h-6 rounded-full bg-gray-950 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/book"
              className="bg-amber-400 text-gray-950 text-xs font-extrabold px-3 py-1.5 rounded-full"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1311] text-white border-t border-amber-400/20 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            <Link
              href="/bike-rentals"
              className="bg-white/5 p-3 rounded-2xl flex items-center gap-2.5 text-xs font-semibold text-white border border-white/10 hover:border-amber-400/50 transition"
            >
              <Bike className="w-5 h-5 text-amber-400" />
              <div>
                <p>Bike Rentals</p>
                <span className="text-[10px] text-gray-400 font-normal">Himalayan 450 Fleet</span>
              </div>
            </Link>
            <Link
              href="/car-rentals"
              className="bg-white/5 p-3 rounded-2xl flex items-center gap-2.5 text-xs font-semibold text-white border border-white/10 hover:border-amber-400/50 transition"
            >
              <Car className="w-5 h-5 text-amber-400" />
              <div>
                <p>Car & 4x4s</p>
                <span className="text-[10px] text-gray-400 font-normal">Thar & Innova</span>
              </div>
            </Link>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                  pathname === link.href ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/my-bookings"
              className="w-full text-center bg-white/10 text-white text-xs font-medium py-2.5 rounded-full hover:bg-white/20 transition"
            >
              Track My Booking Reference
            </Link>
            <Link
              href="/admin"
              className="w-full text-center bg-transparent border border-white/15 text-gray-300 text-xs font-medium py-2 rounded-full hover:border-amber-400/50 transition"
            >
              Admin Dashboard Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
