import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Building2, Sparkles, Navigation, ZoomIn, ZoomOut, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY } from '../data/companyData';

export interface MapLocation {
  id: string;
  name: string;
  district: string;
  isMainOffice: boolean;
  x: number; // SVG viewBox coordinates
  y: number;
  description: string;
  order: number; // for staggered animation
}

export const MAHARASHTRA_LOCATIONS: MapLocation[] = [
  {
    id: 'latur',
    name: 'Latur',
    district: 'Latur District',
    isMainOffice: true,
    x: 480,
    y: 460,
    description: 'Main Office and central operational headquarters for Paras Enterprises.',
    order: 0,
  },
  {
    id: 'renapur',
    name: 'Renapur',
    district: 'Latur District',
    isMainOffice: false,
    x: 478,
    y: 418,
    description: 'Active service location for solar installation, fitting, and paperwork.',
    order: 1,
  },
  {
    id: 'ausa',
    name: 'Ausa',
    district: 'Latur District',
    isMainOffice: false,
    x: 468,
    y: 504,
    description: 'Active service location for solar installation and government contract work.',
    order: 2,
  },
  {
    id: 'ambajogai',
    name: 'Ambajogai',
    district: 'Beed District',
    isMainOffice: false,
    x: 434,
    y: 394,
    description: 'Active service location with complete project execution and documentation.',
    order: 3,
  },
  {
    id: 'nilanga',
    name: 'Nilanga',
    district: 'Latur District',
    isMainOffice: false,
    x: 512,
    y: 524,
    description: 'Active service location for rooftop solar, structural fitting, and setup.',
    order: 4,
  },
  {
    id: 'parbhani',
    name: 'Parbhani',
    district: 'Parbhani District',
    isMainOffice: false,
    x: 520,
    y: 335,
    description: 'Active service location for government contracts and solar infrastructure.',
    order: 5,
  },
  {
    id: 'omerga',
    name: 'Omerga',
    district: 'Dharashiv District',
    isMainOffice: false,
    x: 538,
    y: 562,
    description: 'Active service location for solar fitting, project work, and paperwork support.',
    order: 6,
  },
];

interface MaharashtraMapProps {
  selectedLocationId?: string;
  onSelectLocation: (loc: MapLocation) => void;
  onOpenQuoteModal: (locationName: string) => void;
}

export const MaharashtraMap: React.FC<MaharashtraMapProps> = ({
  selectedLocationId = 'latur',
  onSelectLocation,
  onOpenQuoteModal,
}) => {
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);
  const [zoomLevel, setZoomLevel] = useState<'state' | 'focus'>('state');

  const mainOffice = MAHARASHTRA_LOCATIONS.find((l) => l.isMainOffice)!;
  const activeLocation =
    MAHARASHTRA_LOCATIONS.find((l) => l.id === selectedLocationId) || mainOffice;

  // Authentic, geographically proportioned Maharashtra border SVG path (viewBox 0 0 950 720)
  const maharashtraPath = `
    M 155,275
    C 180,250 215,225 255,185
    C 285,165 330,150 375,148
    C 425,148 475,160 520,140
    C 560,122 610,125 660,132
    C 715,128 765,130 815,148
    C 845,160 870,185 885,215
    C 900,248 895,285 870,320
    C 850,345 838,375 815,410
    C 790,448 765,485 745,520
    C 720,535 680,515 640,490
    C 605,475 570,480 540,500
    C 505,525 465,550 425,570
    C 380,590 335,605 295,620
    C 260,632 235,652 215,675
    C 200,670 190,645 185,615
    C 172,565 158,515 145,465
    C 135,420 128,375 132,335
    C 136,305 145,285 155,275
    Z
  `;

  // Secondary regional context lines (Konkan, Khandesh, Vidarbha, Marathwada borders)
  const internalContextLines = [
    // Marathwada regional zone outline
    'M 390,360 C 420,320 480,300 550,310 C 600,320 620,380 610,460 C 600,510 550,560 480,565 C 430,550 395,490 390,440 Z',
    // Vidarbha connector
    'M 660,132 C 670,220 680,310 640,490',
    // Western Ghats / Konkan ridge line
    'M 195,645 C 190,560 175,470 165,370 C 160,330 170,290 185,260',
  ];

  // Dynamic viewBox depending on zoom level:
  // 'state' shows whole Maharashtra (0 0 950 720)
  // 'focus' smoothly cameras into Marathwada region (330 250 350 380)
  const currentViewBox =
    zoomLevel === 'state' ? '0 0 950 720' : '340 260 300 360';

  return (
    <div className="relative w-full rounded-3xl bg-[#060B16] border border-white/15 p-4 sm:p-7 shadow-2xl overflow-hidden">
      
      {/* Top Controls & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-2 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          <span className="font-mono text-slate-300 font-semibold tracking-wide uppercase text-[11px]">
            Maharashtra Infrastructure & Service Grid
          </span>
        </div>

        {/* View / Camera Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 hidden sm:inline">Camera View:</span>
          <div className="flex items-center bg-white/[0.05] p-1 rounded-lg border border-white/10">
            <button
              id="map-view-state-btn"
              onClick={() => setZoomLevel('state')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                zoomLevel === 'state'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ZoomOut className="w-3 h-3" />
              <span>State Overview</span>
            </button>
            <button
              id="map-view-focus-btn"
              onClick={() => setZoomLevel('focus')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                zoomLevel === 'focus'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ZoomIn className="w-3 h-3" />
              <span>Service Hub Focus</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main SVG Visualization Canvas */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#040812] rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center">
        
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-solar-grid opacity-15 pointer-events-none" />
        
        {/* Latur Centered Solar Radial Glow */}
        <div
          className="absolute w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none transition-all duration-1000"
          style={{
            left: `${((activeLocation.x - (zoomLevel === 'focus' ? 340 : 0)) / (zoomLevel === 'focus' ? 300 : 950)) * 100}%`,
            top: `${((activeLocation.y - (zoomLevel === 'focus' ? 260 : 0)) / (zoomLevel === 'focus' ? 360 : 720)) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Compass Heading Indicator */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[10px] font-mono text-slate-400 pointer-events-none">
          <Navigation className="w-3 h-3 text-amber-400" />
          <span>NORTH • 18°–19° N LAT</span>
        </div>

        {/* State Label Watermark */}
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
            TERRITORY
          </span>
          <span className="font-display text-sm sm:text-base font-bold text-white/40 tracking-wider">
            MAHARASHTRA STATE
          </span>
        </div>

        {/* Scalable Vector Graphics Visualization */}
        <svg
          viewBox={currentViewBox}
          className="w-full h-full transition-all duration-700 ease-out"
        >
          <defs>
            {/* Glow Filter for Maharashtra Outline & Routes */}
            <filter id="solarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Subtle Gradient for State Fill */}
            <linearGradient id="maharashtraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B152A" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#0D1D3A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#081020" stopOpacity="0.9" />
            </linearGradient>

            {/* Marathwada Hub Highlight Gradient */}
            <radialGradient id="marathwadaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Coordinate Gridlines */}
          <g opacity="0.15" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" strokeDasharray="3 6">
            <line x1="100" y1="200" x2="880" y2="200" />
            <line x1="100" y1="360" x2="880" y2="360" />
            <line x1="100" y1="520" x2="880" y2="520" />
            <line x1="300" y1="120" x2="300" y2="650" />
            <line x1="500" y1="120" x2="500" y2="650" />
            <line x1="700" y1="120" x2="700" y2="650" />
          </g>

          {/* Step 1: Maharashtra Outline Smoothly Draws Itself */}
          <motion.path
            d={maharashtraPath}
            fill="url(#maharashtraGradient)"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Golden Ambient Boundary Accent */}
          <motion.path
            d={maharashtraPath}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeOpacity="0.3"
            filter="url(#solarGlow)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />

          {/* Regional Reference Guidelines */}
          {internalContextLines.map((d, index) => (
            <motion.path
              key={index}
              d={d}
              fill={index === 0 ? 'url(#marathwadaGlow)' : 'none'}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              strokeDasharray="4 8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6 + index * 0.2 }}
            />
          ))}

          {/* Step 5: Very Subtle Connecting Lines Animating from Latur to Service Locations */}
          <g>
            {MAHARASHTRA_LOCATIONS.filter((l) => !l.isMainOffice).map((loc, idx) => {
              const isLocActive = activeLocation.id === loc.id;
              return (
                <g key={`conn-${loc.id}`}>
                  {/* Glowing under-line */}
                  <motion.line
                    x1={mainOffice.x}
                    y1={mainOffice.y}
                    x2={loc.x}
                    y2={loc.y}
                    stroke={isLocActive ? '#F59E0B' : 'rgba(245, 158, 11, 0.25)'}
                    strokeWidth={isLocActive ? 2.2 : 1.2}
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.9 + idx * 0.15,
                      ease: 'easeOut',
                    }}
                  />
                  {/* Animated traveling particle along route */}
                  <motion.circle
                    r={isLocActive ? 2.5 : 1.5}
                    fill="#FBBF24"
                    initial={{ cx: mainOffice.x, cy: mainOffice.y }}
                    animate={{
                      cx: [mainOffice.x, loc.x, mainOffice.x],
                      cy: [mainOffice.y, loc.y, mainOffice.y],
                    }}
                    transition={{
                      duration: 4 + idx,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1.5 + idx * 0.3,
                    }}
                  />
                </g>
              );
            })}
          </g>

          {/* Step 3 & 4: Location Markers with Soft Pulse & Staggered Animations */}
          {MAHARASHTRA_LOCATIONS.map((loc) => {
            const isMain = loc.isMainOffice;
            const isSelected = activeLocation.id === loc.id;
            const isHovered = hoveredLocation?.id === loc.id;

            return (
              <g
                key={`marker-${loc.id}`}
                className="cursor-pointer transition-transform"
                onClick={() => onSelectLocation(loc)}
                onMouseEnter={() => setHoveredLocation(loc)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Step 3: Latur marker appears first with soft pulse */}
                {isMain && (
                  <>
                    {/* Outer radar wave 1 */}
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r="22"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1"
                      strokeOpacity="0.4"
                      className="animate-ping origin-center pointer-events-none"
                    />
                    {/* Outer radar wave 2 */}
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r="14"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                      className="origin-center"
                    />
                  </>
                )}

                {/* Pin Halo on Selection or Hover */}
                {(isSelected || isHovered) && (
                  <motion.circle
                    cx={loc.x}
                    cy={loc.y}
                    r={isMain ? 18 : 14}
                    fill="rgba(245, 158, 11, 0.25)"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Location Node Circle */}
                <motion.circle
                  cx={loc.x}
                  cy={loc.y}
                  r={isMain ? 8 : 5.5}
                  fill={isMain ? '#F59E0B' : isSelected ? '#FFFFFF' : '#0B152A'}
                  stroke={isMain ? '#FFFFFF' : '#F59E0B'}
                  strokeWidth={isMain ? 2.5 : 2}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: isMain ? 0.6 : 0.8 + loc.order * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ scale: 1.4 }}
                />

                {/* Minimal Elegant Map Label */}
                <motion.text
                  x={loc.x}
                  y={loc.y + (isMain ? -14 : 16)}
                  textAnchor="middle"
                  fill={isMain ? '#F59E0B' : isSelected ? '#FFFFFF' : '#CBD5E1'}
                  fontSize={isMain ? '12px' : '10px'}
                  fontWeight={isMain || isSelected ? '700' : '500'}
                  fontFamily="system-ui, sans-serif"
                  letterSpacing="0.05em"
                  initial={{ opacity: 0, y: loc.y + (isMain ? -8 : 10) }}
                  whileInView={{ opacity: 1, y: loc.y + (isMain ? -14 : 16) }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: isMain ? 0.7 : 0.9 + loc.order * 0.15,
                  }}
                  className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  {loc.name} {isMain && '★ (Main Office)'}
                </motion.text>
              </g>
            );
          })}
        </svg>

        {/* Step 6: Interactive Floating Tooltip on Hover / Tap */}
        <AnimatePresence>
          {(hoveredLocation || activeLocation) && (
            <motion.div
              key="map-badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute top-4 left-4 z-20 hidden md:block max-w-xs bg-[#091122]/90 backdrop-blur-md p-3.5 rounded-xl border border-amber-400/30 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-1">
                {hoveredLocation?.isMainOffice || activeLocation?.isMainOffice ? (
                  <span className="p-1 rounded bg-amber-400 text-slate-950 font-bold text-[10px] uppercase">
                    HQ
                  </span>
                ) : (
                  <span className="p-1 rounded bg-white/10 text-amber-400 font-bold text-[10px] uppercase">
                    Work Area
                  </span>
                )}
                <span className="font-display font-bold text-white text-sm">
                  {hoveredLocation?.name || activeLocation?.name}
                </span>
                <span className="text-[11px] text-slate-400">
                  • {hoveredLocation?.district || activeLocation?.district}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                {hoveredLocation?.description || activeLocation?.description}
              </p>
              <button
                onClick={() => onOpenQuoteModal((hoveredLocation || activeLocation).name)}
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Request service for this area</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Interactive Location Chips for Mobile & Rapid Access */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Select Location to Inspect:
          </span>
          <span className="text-[11px] text-amber-400">
            Tap to highlight on map
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {MAHARASHTRA_LOCATIONS.map((loc) => {
            const isSelected = activeLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                id={`map-chip-${loc.id}`}
                onClick={() => {
                  onSelectLocation(loc);
                  if (loc.id !== 'latur') {
                    // Zoom into focus view on user interaction for great feel
                    setZoomLevel('focus');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20 ring-1 ring-white/50'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
                }`}
              >
                {loc.isMainOffice ? (
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <MapPin className="w-3 h-3 shrink-0 text-amber-400" />
                )}
                <span>{loc.name}</span>
                {loc.isMainOffice && (
                  <span className="text-[10px] bg-slate-950 text-amber-400 px-1.5 py-0.2 rounded font-bold ml-0.5">
                    HQ
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
