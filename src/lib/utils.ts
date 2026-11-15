import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getWhatsAppUrl({
  number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210',
  text = 'Hello WYLD MILES! I want to plan a trip to the Himalayas.',
}: {
  number?: string;
  text?: string;
}): string {
  const cleanNumber = number.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

export function generateBookingReference(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `WM-${year}-${randomNum}`;
}
