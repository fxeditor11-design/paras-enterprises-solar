import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileCheck, Award, Zap } from 'lucide-react';
import { COMPANY } from '../data/companyData';
import { REAL_SOLAR_IMAGES } from '../data/solarImages';

interface VisualBannerStripProps {
  onOpenQuoteModal: () => void;
}

export const VisualBannerStrip: React.FC<VisualBannerStripProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="relative w-full overflow-hidden bg-[#070D18] py-8 sm:py-12 border-y border-white/10">
      {/* Background panoramic worksite image with cinematic overlays */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${REAL_SOLAR_IMAGES.groundMountedArray.path}')`,
          }}
        />
        <div className="absolute inset-0 bg-[#070D18]/90 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070D18] via-[#070D18]/85 to-[#070D18]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Statement */}
          <div className="lg:col-span-8 space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5" />
              <span>Rigorous Engineering Standards</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
              Every solar panel installed with structural resilience and certified paperwork.
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Serving government infrastructure, commercial facilities, and residential rooftops with direct project oversight by {COMPANY.owner}.
            </p>
          </div>

          {/* Action CTA & Quick Badges */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              Request Project Consultation →
            </button>
            <span className="text-[11px] text-slate-400 font-mono">
              Direct hotline: {COMPANY.phoneDisplay}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
