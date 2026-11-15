'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  MapPin,
  Sparkles,
  Compass,
  Mountain,
  Sun,
  ShieldCheck,
} from 'lucide-react';

export interface KashmirSlide {
  id: string;
  step: string;
  title: string;
  region: string;
  altitude: string;
  tagline: string;
  description: string;
  heroImage: string;
  ctaText: string;
  ctaHref: string;
  cardThumbnail: string;
  cardHighlight: string;
  ratingStars: number;
}

export const KASHMIR_SLIDES: KashmirSlide[] = [
  {
    id: 'kashmir',
    step: '01',
    title: 'KASHMIR',
    region: 'The Jewel of the Himalayas',
    altitude: '5,200 FT',
    tagline: 'Timeless Dal Lake, Cedar Houseboats & Sacred Mountain Horizons',
    description:
      'Immerse yourself in the paradise of earth. Gliding silently on a sunrise Shikara, stepping into hand-carved heritage cedar houseboats, and gazing at the snow-crowned Pir Panjal peaks that embrace the valley.',
    heroImage:
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2400&q=90',
    ctaText: 'Explore Kashmir Circuits',
    ctaHref: '/packages?region=Kashmir',
    cardThumbnail:
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80',
    cardHighlight: 'Dal Lake & Houseboats',
    ratingStars: 5,
  },
  {
    id: 'gulmarg',
    step: '02',
    title: 'GULMARG',
    region: 'The Alpine Skiing Capital',
    altitude: '13,780 FT',
    tagline: 'Apharwat Peak, World-Class Powder Snow & High-Altitude Gondola',
    description:
      'Ascend the world-famous Gulmarg Gondola Phase II to 13,780 feet. Carve through untouched Himalayan powder in winter, or ride sweeping green alpine meadows framed by towering deodar forests in summer.',
    heroImage:
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2400&q=90',
    ctaText: 'Discover Gulmarg Tours',
    ctaHref: '/destinations/gulmarg',
    cardThumbnail:
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80',
    cardHighlight: 'Gondola Phase II & Ski',
    ratingStars: 5,
  },
  {
    id: 'gurez',
    step: '03',
    title: 'GUREZ',
    region: 'The Secret Frontier Valley',
    altitude: '7,874 FT',
    tagline: 'Habba Khatoon Pyramid Peak, Turquoise Kishanganga & 4x4 Trails',
    description:
      'Cross the thrilling Razdan Pass at 11,672 ft into the remote realm of the Dard-Shin tribe. Dominated by the soaring pyramid mountain of Habba Khatoon, Gurez is the ultimate wild Himalayan overland road trip.',
    heroImage:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=90',
    ctaText: 'Plan Gurez Expedition',
    ctaHref: '/destinations/gurez-valley',
    cardThumbnail:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    cardHighlight: 'Habba Khatoon Frontier',
    ratingStars: 5,
  },
  {
    id: 'pahalgam',
    step: '04',
    title: 'PAHALGAM',
    region: 'Valley of Shepherds & Rapids',
    altitude: '7,200 FT',
    tagline: 'Betaab Valley, Rushing Lidder River & Whispering Cedar Trails',
    description:
      'Where the glacial Lidder River roars through fragrant pine and fir woodlands. Ride horses across emerald Baisaran meadow, raft through thrilling mountain rapids, or camp under crystal Himalayan starlight.',
    heroImage:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=90',
    ctaText: 'Explore Valley Stays',
    ctaHref: '/destinations/pahalgam',
    cardThumbnail:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    cardHighlight: 'Betaab Valley & Rapids',
    ratingStars: 5,
  },
  {
    id: 'sonamarg',
    step: '05',
    title: 'SONAMARG',
    region: 'Meadow of Gold & Zojila Pass',
    altitude: '8,960 FT',
    tagline: 'Thajiwas Glacier & Gateway to The Great Himalayan Motorcycle Trail',
    description:
      'Witness dramatic ice cliffs at Thajiwas Glacier and prepare your motorcycle for the legendary ascent of Zojila Pass. Sonamarg marks the dramatic transition from lush Kashmir into the high mountain desert of Ladakh.',
    heroImage:
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=2400&q=90',
    ctaText: 'Rent Himalayan 450',
    ctaHref: '/bike-rentals',
    cardThumbnail:
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=600&q=80',
    cardHighlight: 'Thajiwas & Zojila Pass',
    ratingStars: 5,
  },
];

export default function FoxicoHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({
    gulmarg: true,
    gurez: true,
  });

  const currentSlide = KASHMIR_SLIDES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % KASHMIR_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + KASHMIR_SLIDES.length) % KASHMIR_SLIDES.length);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Auto slide timer (pause on hover can be natural)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % KASHMIR_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[720px] lg:min-h-[820px] flex items-center overflow-hidden bg-black text-white select-none">
      {/* Background Cinematic Images with Smooth Crossfade */}
      {KASHMIR_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            idx === currentIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
          } transition-transform duration-1000`}
        >
          <img
            src={slide.heroImage}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Film Grain & Dark Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1513] via-transparent to-black/40" />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Vertical Timeline + Bold Typography & Description (Inspired by Foxico design) */}
          <div className="lg:col-span-7 flex gap-6 sm:gap-8 items-start">
            
            {/* Vertical Timeline / Step Indicator Bar */}
            <div className="hidden sm:flex flex-col items-center pt-3 select-none">
              <div className="w-8 h-8 rounded-full border border-amber-400 bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-mono font-bold shadow-lg shadow-amber-500/20">
                {currentSlide.step}
              </div>
              <div className="w-[1.5px] h-20 bg-gradient-to-b from-amber-400/80 via-white/30 to-white/10 my-2" />
              {KASHMIR_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 my-1.5 rounded-full transition-all ${
                    i === currentIndex
                      ? 'bg-amber-400 ring-4 ring-amber-400/30 scale-125'
                      : 'bg-white/40 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
              <div className="w-[1.5px] h-12 bg-white/10 mt-2" />
            </div>

            {/* Main Destination Text Content */}
            <div className="space-y-4 sm:space-y-5">
              {/* Region & Altitude Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-semibold tracking-wider text-amber-300 uppercase">
                <Mountain className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentSlide.region}</span>
                <span className="text-white/40">•</span>
                <span className="text-white font-mono">{currentSlide.altitude}</span>
              </div>

              {/* Giant Bold Headline */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.95] drop-shadow-2xl">
                {currentSlide.title}
              </h1>

              {/* Tagline */}
              <p className="text-amber-200/90 font-medium text-sm sm:text-base tracking-wide max-w-xl">
                {currentSlide.tagline}
              </p>

              {/* Evocative Description */}
              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed max-w-lg font-normal drop-shadow">
                {currentSlide.description}
              </p>

              {/* Pill CTA Button with Circle Arrow */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={currentSlide.ctaHref}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-extrabold text-xs sm:text-sm pl-6 pr-2 py-2.5 rounded-full shadow-2xl shadow-amber-500/30 transition-all group"
                >
                  <span className="tracking-wide">{currentSlide.ctaText}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-950 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>

                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Custom Trip Planner</span>
                </Link>
              </div>

              {/* Kashmir Basecamp Trust Bar */}
              <div className="pt-4 flex items-center gap-4 text-[11px] text-gray-300">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Srinagar HQ Local Operators</span>
                </div>
                <span className="text-white/30">•</span>
                <span>Self-Drive Bikes & 4x4s</span>
                <span className="text-white/30">•</span>
                <span>Zero Middlemen</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Destination Cards Carousel (Exact Foxico Layout) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
            
            {/* Floating Horizontal Cards Row */}
            <div className="w-full flex items-center gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar lg:justify-end">
              {KASHMIR_SLIDES.map((slide, idx) => {
                const isActive = idx === currentIndex;
                const isSaved = !!bookmarked[slide.id];
                return (
                  <div
                    key={slide.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative flex-shrink-0 cursor-pointer rounded-[24px] sm:rounded-[28px] overflow-hidden transition-all duration-500 shadow-2xl border ${
                      isActive
                        ? 'w-48 sm:w-56 h-64 sm:h-76 ring-2 ring-amber-400 border-white/40 scale-105 z-20'
                        : 'w-36 sm:w-44 h-52 sm:h-64 border-white/20 opacity-70 hover:opacity-100 hover:scale-100 z-10'
                    }`}
                  >
                    {/* Card Background Image */}
                    <img
                      src={slide.cardThumbnail}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                    {/* Bookmark Badge (White Circle Icon as in Foxico design) */}
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(slide.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-900 shadow-md hover:bg-white hover:scale-110 transition z-30"
                      aria-label="Save destination"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-amber-500 text-amber-500' : 'text-gray-700'
                        }`}
                      />
                    </button>

                    {/* Card Content Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 text-white">
                      {/* Rating / Dots Indicator */}
                      <div className="flex items-center gap-1 mb-1 text-amber-400 text-[10px]">
                        <span>•••••</span>
                        <span className="text-[10px] text-gray-300 ml-1 font-mono">5.0</span>
                      </div>
                      
                      <h4 className="font-extrabold text-sm sm:text-base text-white tracking-wide uppercase leading-tight drop-shadow">
                        {slide.title}
                      </h4>
                      <p className="text-[11px] text-amber-200/90 font-medium line-clamp-1 mt-0.5">
                        {slide.cardHighlight}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Bottom Navigation Controls & Counter */}
            <div className="mt-4 flex items-center justify-between w-full max-w-sm pt-2 border-t border-white/10">
              {/* Progress Slider */}
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-24 sm:w-32 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${((currentIndex + 1) / KASHMIR_SLIDES.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-amber-300 tracking-wider">
                  0{currentIndex + 1} / 0{KASHMIR_SLIDES.length}
                </span>
              </div>

              {/* Prev / Next Circular Arrow Buttons (Foxico style) */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
