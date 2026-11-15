'use client';

import React from 'react';
import { X, Check, Minus, ShieldCheck, Fuel, Gauge, Zap } from 'lucide-react';
import { Bike } from '@/types';
import { formatINR } from '@/lib/utils';

interface BikeCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  bikes: Bike[];
  onBookBike: (bike: Bike) => void;
}

export default function BikeCompareModal({
  isOpen,
  onClose,
  bikes,
  onBookBike,
}: BikeCompareModalProps) {
  if (!isOpen || bikes.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-wyld-forest text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
              Himalayan Motorcycle Benchmarking
            </span>
            <h3 className="font-serif text-xl font-bold text-white">
              Compare Himalayan Adventure Machines
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-wyld-ivory transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="p-6 overflow-x-auto overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-3 bg-gray-50 text-gray-500 font-bold uppercase tracking-wider w-1/4">
                  Specification
                </th>
                {bikes.map((bike) => (
                  <th key={bike.id} className="p-3 text-center bg-wyld-ivory/60 min-w-[200px]">
                    <img
                      src={bike.heroImage}
                      alt={bike.name}
                      className="w-full h-28 object-cover rounded-xl shadow-sm mb-2"
                    />
                    <h4 className="font-bold text-sm text-wyld-forest line-clamp-1">
                      {bike.name}
                    </h4>
                    <span className="text-wyld-orange font-bold text-xs">
                      {formatINR(bike.dailyRate)} / day
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="p-3 font-semibold bg-gray-50 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-wyld-orange" />
                  Displacement (cc)
                </td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-3 text-center font-bold text-gray-900">
                    {bike.engineCc} cc
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold bg-gray-50 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Power & Torque
                </td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-3 text-center">
                    <span className="font-semibold text-gray-900">{bike.powerBhp} bhp</span> @ {bike.torqueNm} Nm
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold bg-gray-50">Transmission</td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-3 text-center">
                    {bike.transmission}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold bg-gray-50 flex items-center gap-1.5">
                  <Fuel className="w-4 h-4 text-emerald-600" />
                  Fuel Tank & Mileage
                </td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-3 text-center">
                    {bike.fuelCapacityLitres} L ({bike.mileage})
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold bg-gray-50 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-600" />
                  Braking / ABS System
                </td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-3 text-center">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium text-[11px]">
                      {bike.absType}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold bg-gray-50">Luggage Carrier & Stays</td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-3 text-center">
                    {bike.luggageCarrier ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <Check className="w-4 h-4" /> Ready for Panniers
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        <Minus className="w-4 h-4" /> Tail Pack Only
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold bg-gray-50">Refundable Security Deposit</td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-3 text-center font-bold text-gray-800">
                    {formatINR(bike.securityDeposit)}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold bg-gray-50">Best Suited Himalayan Terrain</td>
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-3 text-center text-[11px] text-gray-600">
                    {bike.suitableRoutes?.slice(0, 2).join(' • ') || 'All Himalayan Passes'}
                  </td>
                ))}
              </tr>

              {/* Action row */}
              <tr>
                <td className="p-3 bg-gray-50" />
                {bikes.map((bike) => (
                  <td key={bike.id} className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onBookBike(bike);
                      }}
                      className="w-full bg-wyld-orange hover:bg-wyld-orangeHover text-white font-bold text-xs py-2 px-3 rounded-xl shadow transition"
                    >
                      Book This Bike
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
