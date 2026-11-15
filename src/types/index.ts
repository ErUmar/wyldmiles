export type StateRegion = 'Kashmir' | 'Himachal' | 'Uttarakhand' | 'Ladakh' | string;

export interface Destination {
  id: string;
  slug: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  heroImage: string;
  gallery: string[];
  bestSeason: string;
  altitude: string;
  weatherSummary: string;
  permitRequired: boolean;
  popularActivities: string[];
  featured: boolean;
  createdAt: any;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  stay: string;
  highlights: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  destinationId?: string | null;
  region: string;
  durationDays: number;
  durationNights: number;
  pricePerPerson: number;
  discountedPrice?: number | null;
  heroImage: string;
  gallery: string[];
  travelStyle: string;
  difficulty: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  featured: boolean;
  rating: number;
  reviewsCount: number;
}

export interface HotelRoom {
  type: string;
  price: number;
  bed: string;
  occupancy: string;
  features: string[];
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  destinationId?: string | null;
  location: string;
  state: string;
  propertyType: string;
  starRating: number;
  pricePerNight: number;
  heroImage: string;
  gallery: string[];
  description: string;
  amenities: string[];
  rooms: HotelRoom[];
  rating: number;
  reviewsCount: number;
  featured: boolean;
}

export interface Bike {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  engineCc: number;
  powerBhp: number;
  torqueNm: number;
  transmission: string;
  mileage: string;
  fuelCapacityLitres: number;
  absType: string;
  luggageCarrier: boolean;
  dailyRate: number;
  securityDeposit: number;
  heroImage: string;
  gallery: string[];
  featured: boolean;
  isAvailable: boolean;
  inclusions: string[];
  exclusions: string[];
  suitableRoutes: string[];
}

export interface Car {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  transmission: string;
  seats: number;
  luggageBags: number;
  acHeater: boolean;
  fuelType: string;
  dailyRate: number;
  selfDriveAllowed: boolean;
  driverIncluded: boolean;
  heroImage: string;
  gallery: string[];
  features: string[];
  featured: boolean;
  isAvailable: boolean;
  minDays: number;
}

export interface Enquiry {
  id: string;
  reference: string;
  type: 'PACKAGE' | 'HOTEL' | 'BIKE' | 'CAR' | 'CUSTOM' | string;
  itemId?: string | null;
  itemTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate?: string | null;
  guestsCount: number;
  pickupLocation?: string | null;
  dropoffLocation?: string | null;
  specialRequests?: string | null;
  estimatedTotal: number;
  status: 'PENDING' | 'UNDER_REVIEW' | 'CONFIRMED' | 'CANCELLED' | string;
  adminNotes?: string | null;
  createdAt: any;
  updatedAt?: any;
}
