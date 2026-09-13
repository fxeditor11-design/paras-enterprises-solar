import React from 'react';
import { motion } from 'motion/react';
import { Sun, Shield, Award, Landmark, MapPin, Zap, CheckCircle2 } from 'lucide-react';

export const BrandMarquee: React.FC = () => {
  const items = [
    { icon: Sun, label: 'Precision Solar Installation' },
    { icon: Landmark, label: 'Government Registered Contractor' },
    { icon: Shield, label: 'Certified Structural Solar Fitting' },
    { icon: Zap, label: 'End-to-End Net Metering & Paperwork' },
    { icon: MapPin, label: 'Latur • Nilanga • Omerga • Ausa • Parbhani • Ambajogai • Renapur' },
    { icon: Award, label: 'Professional Supervision by Vajhat Ali' },
    { icon: CheckCircle2, label: 'Prompt Execution & Safe Commissioning' },
  ];

  return (
    <div className="relative w-full bg-[#050A14] border-y border-white/10 py-3.5 overflow-hidden select-none z-20">
      {/* Edge gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050A14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050A14] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-6 text-xs sm:text-sm font-medium tracking-wide text-slate-300 whitespace-nowrap"
            >
              <Icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{item.label}</span>
              <span className="text-amber-400/40 ml-4 font-mono">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
