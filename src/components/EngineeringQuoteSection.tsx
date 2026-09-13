import React from 'react';
import { motion } from 'motion/react';
import { Quote, Award, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { COMPANY } from '../data/companyData';

export const EngineeringQuoteSection: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 bg-[#060B14] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-solar-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0D182E] via-[#0A1224] to-[#080E1B] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle watermark quote icon */}
          <Quote className="absolute right-6 -bottom-6 w-40 h-40 text-white/[0.02] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Quote Content */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Contractor Commitment</span>
              </div>

              <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-snug tracking-tight">
                “In solar engineering and government contracting, real dependability comes from two things: <span className="text-amber-400">uncompromising physical workmanship</span> and <span className="text-amber-200">meticulous administrative execution</span>.”
              </blockquote>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-display font-bold text-lg shadow-md shadow-amber-400/20">
                  VA
                </div>
                <div>
                  <div className="text-base font-bold text-white tracking-wide">
                    {COMPANY.owner}
                  </div>
                  <div className="text-xs text-amber-400/90 font-medium">
                    Owner & Principal Contractor • Paras Enterprises
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>Latur, Maharashtra</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Commitments Card */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block border-b border-white/10 pb-2">
                Standard On Every Project
              </span>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Personal supervision by Vajhat Ali on critical milestones</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Hot-dip galvanized mounting structures with weatherproofing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Timely government documentation & net-metering liaison</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Direct phone line access with zero middleman delays</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
