import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Building2, CheckCircle2, ArrowRight, Shield, Phone, Sparkles } from 'lucide-react';
import { COMPANY } from '../data/companyData';
import { MaharashtraMap, MAHARASHTRA_LOCATIONS, MapLocation } from './MaharashtraMap';

interface ServiceAreaSectionProps {
  onOpenQuoteModal: (locationName?: string) => void;
}

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ onOpenQuoteModal }) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>(
    MAHARASHTRA_LOCATIONS.find((l) => l.isMainOffice) || MAHARASHTRA_LOCATIONS[0]
  );

  const mainOffice = MAHARASHTRA_LOCATIONS.find((l) => l.isMainOffice)!;
  const serviceLocations = MAHARASHTRA_LOCATIONS.filter((l) => !l.isMainOffice);

  return (
    <section
      id="service-areas"
      className="relative py-28 bg-[#091020] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-solar-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with exact requested copy */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>Where We Work</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Serving Projects Across{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Maharashtra
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Based in Latur, Paras Enterprises provides professional services across multiple locations.
          </p>
        </div>

        {/* Main Grid: Cinematic Map (Left) + Locations Directory & Status (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Cinematic Interactive Maharashtra Map */}
          <div className="lg:col-span-7 xl:col-span-8">
            <MaharashtraMap
              selectedLocationId={selectedLocation.id}
              onSelectLocation={(loc) => setSelectedLocation(loc)}
              onOpenQuoteModal={(locName) => onOpenQuoteModal(locName)}
            />
          </div>

          {/* Right: Operational Hub & Location Directory Cards */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-5">
            
            {/* Highlight Card: Latur — Main Office */}
            <div
              className={`p-6 rounded-2xl transition-all duration-300 border ${
                selectedLocation.isMainOffice
                  ? 'bg-gradient-to-br from-[#101F3E] to-[#070D18] border-amber-400/60 shadow-xl shadow-amber-500/10'
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  📍 Main Office
                </span>
                <span className="text-[11px] bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  HQ Base
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Latur, Maharashtra
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Central headquarters for Paras Enterprises. Coordinates equipment mobilization, engineering workforce, government contractor compliance, and customer consultations.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                <span className="text-slate-400">Owner Contact:</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  {COMPANY.phoneDisplay}
                </span>
              </div>
            </div>

            {/* Service Locations List */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Service Locations
                </span>
                <span className="text-xs text-amber-400 font-medium">
                  {serviceLocations.length} Regional Work Areas
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {serviceLocations.map((loc) => {
                  const isCurrent = selectedLocation.id === loc.id;

                  return (
                    <button
                      key={loc.id}
                      id={`location-select-btn-${loc.id}`}
                      onClick={() => setSelectedLocation(loc)}
                      className={`p-3 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                          : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/5 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1">
                          <span className="text-amber-400">📍</span>
                          <span>{loc.name}</span>
                        </span>
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            isCurrent ? 'text-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        {loc.district}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action Banner for Currently Selected Location */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px]">Selected Area</span>
                  <span className="font-bold text-white">
                    {selectedLocation.name}{' '}
                    <span className="text-slate-400 font-normal">
                      ({selectedLocation.isMainOffice ? 'Main Office' : 'Service Location'})
                    </span>
                  </span>
                </div>

                <button
                  id="service-area-inquire-btn"
                  onClick={() => onOpenQuoteModal(selectedLocation.name)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <span>Inquire for {selectedLocation.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
