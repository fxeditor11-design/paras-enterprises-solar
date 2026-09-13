import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Award,
  Zap,
  Phone,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Info,
  Sun,
  Layers,
} from 'lucide-react';
import { COMPANY } from '../data/companyData';
import {
  BrandPriceBreakdown,
  SolarBrandKey,
  SolarPricingConfig,
} from '../config/solarPricingConfig';

interface BrandComparisonSectionProps {
  comparisonData: BrandPriceBreakdown[];
  capacityKw: number;
  systemTypeLabel: string;
  propertyTypeLabel: string;
  location: string;
  onTalkToOwner: (brandName: string, estimatedTotal: number) => void;
  formatCurrency: (val: number) => string;
}

export const BrandComparisonSection: React.FC<BrandComparisonSectionProps> = ({
  comparisonData,
  capacityKw,
  systemTypeLabel,
  propertyTypeLabel,
  location,
  onTalkToOwner,
  formatCurrency,
}) => {
  // Currently expanded brand card for detailed view (starts with recommended brand or first one)
  const [expandedBrand, setExpandedBrand] = useState<SolarBrandKey | null>(
    comparisonData.find((b) => b.isRecommended)?.brandKey || 'utl'
  );

  const brandVisuals: Record<
    SolarBrandKey,
    {
      logoAccent: string;
      brandHighlight: string;
      gradientBg: string;
      borderAccent: string;
      glowColor: string;
    }
  > = {
    waaree: {
      logoAccent: 'from-amber-400 to-orange-500',
      brandHighlight: 'text-amber-400',
      gradientBg: 'from-[#0C172E] via-[#091122] to-[#070D18]',
      borderAccent: 'hover:border-amber-400/50',
      glowColor: 'rgba(245, 158, 11, 0.15)',
    },
    utl: {
      logoAccent: 'from-emerald-400 to-teal-500',
      brandHighlight: 'text-emerald-400',
      gradientBg: 'from-[#0A1B28] via-[#081520] to-[#070D18]',
      borderAccent: 'hover:border-emerald-400/50',
      glowColor: 'rgba(16, 185, 129, 0.15)',
    },
    tata: {
      logoAccent: 'from-blue-400 to-indigo-500',
      brandHighlight: 'text-blue-400',
      gradientBg: 'from-[#0E1A38] via-[#0A1228] to-[#070D18]',
      borderAccent: 'hover:border-blue-400/50',
      glowColor: 'rgba(59, 130, 246, 0.15)',
    },
  };

  const getBrandWhatsAppUrl = (brandName: string, estimatedTotal: number) => {
    const text = `Hello Vajhat Ali, I am reviewing solar estimates from Paras Enterprises.

System: ${capacityKw} kW • ${systemTypeLabel} (${propertyTypeLabel})
Location: ${location}
Preferred Equipment Option: ${brandName}
Estimated Budget: ₹${formatCurrency(estimatedTotal)}

I would like to discuss final equipment availability, site requirements, and final pricing.`;
    return `${COMPANY.whatsappLink}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="mt-14 pt-10 border-t border-white/10 space-y-8">
      {/* SECTION INTRO */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          <Layers className="w-3.5 h-3.5" />
          <span>Brand &amp; Budget Comparison</span>
        </div>
        <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
          Choose Your Solar Package
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Compare estimated budgets from different equipment options. Final pricing depends on the selected equipment, site requirements, and final quotation.
        </p>

        {/* Selected Config Breadcrumb */}
        <div className="inline-flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300">
            {capacityKw} kW
          </span>
          <span className="text-slate-500 font-mono">•</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
            {systemTypeLabel}
          </span>
          <span className="text-slate-500 font-mono">•</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
            {propertyTypeLabel}
          </span>
          <span className="text-slate-500 font-mono">•</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
            {location}
          </span>
        </div>
      </div>

      {/* 3 COMPARISON CARDS - Desktop Grid / Mobile Horizontal Swipe Carousel */}
      <div className="relative">
        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
          {comparisonData.map((brand) => {
            const isExpanded = expandedBrand === brand.brandKey;
            const visual = brandVisuals[brand.brandKey];
            const isRecommended = brand.isRecommended;

            return (
              <motion.div
                key={brand.brandKey}
                layout
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col justify-between rounded-3xl border transition-all duration-300 min-w-[290px] sm:min-w-[320px] md:min-w-0 snap-center select-none overflow-hidden ${
                  isRecommended
                    ? 'border-amber-400/60 bg-gradient-to-b from-[#122244] via-[#0C172E] to-[#070D18] shadow-2xl shadow-amber-500/10 ring-1 ring-amber-400/40'
                    : isExpanded
                    ? 'border-white/30 bg-gradient-to-b from-[#0F1B35] via-[#0A1326] to-[#070D18] shadow-xl'
                    : 'border-white/10 bg-gradient-to-b from-[#0B1426] to-[#070D18] hover:border-white/20'
                }`}
              >
                {/* Visual Top Glow for Recommended Card */}
                {isRecommended && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />
                )}

                {/* CARD HEADER & BADGES */}
                <div className="p-6 pb-4 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {brand.badgeNumber}
                    </span>

                    {/* Recommended badge ONLY if configured by business owner */}
                    {isRecommended ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] tracking-wider uppercase shadow-md shadow-amber-500/20">
                        <Sparkles className="w-3 h-3 fill-slate-950" />
                        <span>Recommended</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                        {brand.badgeTag}
                      </span>
                    )}
                  </div>

                  {/* BRAND TITLE & TIER */}
                  <div>
                    <h4 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                      <span>{brand.brandName}</span>
                    </h4>
                    <span className={`text-xs font-medium block mt-0.5 ${visual.brandHighlight}`}>
                      {brand.tierLabel}
                    </span>
                    <p className="text-[11px] text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                      {brand.description}
                    </p>
                  </div>

                  {/* ESTIMATED TOTAL PRICE TAG */}
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                      Estimated Package Budget
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        ₹{formatCurrency(brand.estimatedTotal)}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">est. total</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Includes Equipment + Installation + Charges + {brand.gstPercentageDisplay}% GST
                    </span>
                  </div>

                  {/* ACCORDION / TOGGLE: VIEW DETAILS → */}
                  <div className="pt-2">
                    <button
                      onClick={() =>
                        setExpandedBrand(isExpanded ? null : brand.brandKey)
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Details →'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : 'group-hover:translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* DETAILED COST BREAKDOWN (Smoothly Animated) */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-2"
                      >
                        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5 text-xs">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block border-b border-white/5 pb-1.5">
                            Standard Itemized Estimate
                          </span>

                          {/* 1. Estimated equipment cost */}
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300">Estimated equipment cost:</span>
                            <span className="font-mono font-semibold text-white">
                              ₹{formatCurrency(brand.equipmentCost)}
                            </span>
                          </div>

                          {/* 2. Installation / fitting */}
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300">Installation / fitting:</span>
                            <span className="font-mono font-semibold text-white">
                              ₹{formatCurrency(brand.installationFitting)}
                            </span>
                          </div>

                          {/* 3. Applicable charges */}
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300">Applicable charges:</span>
                            <span className="font-mono font-semibold text-white">
                              ₹{formatCurrency(brand.applicableCharges)}
                            </span>
                          </div>

                          {/* Subtotal */}
                          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-slate-300">
                            <span>Subtotal:</span>
                            <span className="font-mono font-semibold text-slate-200">
                              ₹{formatCurrency(brand.subtotal)}
                            </span>
                          </div>

                          {/* 4. GST */}
                          <div className="flex items-center justify-between text-slate-300">
                            <span>GST ({brand.gstPercentageDisplay}%):</span>
                            <span className="font-mono font-semibold text-slate-300">
                              ₹{formatCurrency(brand.gst)}
                            </span>
                          </div>

                          {/* 5. Estimated total */}
                          <div className="flex items-center justify-between pt-1.5 border-t border-amber-400/30 text-amber-400 font-bold">
                            <span className="uppercase text-[10px] font-mono tracking-wider">
                              Estimated total:
                            </span>
                            <span className="font-mono text-sm">
                              ₹{formatCurrency(brand.estimatedTotal)}
                            </span>
                          </div>

                          <div className="pt-1 text-[10px] text-slate-400 leading-tight">
                            Includes mounting structure, electrical balance of systems, and paperwork liaisoning from Latur HQ.
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CARD FOOTER & ACTIONS */}
                <div className="p-6 pt-3 border-t border-white/10 bg-black/20 space-y-2">
                  <button
                    onClick={() =>
                      onTalkToOwner(brand.brandName, brand.estimatedTotal)
                    }
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isRecommended
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                    }`}
                  >
                    <span>Talk to Owner →</span>
                  </button>

                  <a
                    href={getBrandWhatsAppUrl(brand.brandName, brand.estimatedTotal)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold transition-colors text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-emerald-400 stroke-none" />
                    <span>WhatsApp Inquiry for {brand.brandName}</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FINAL CTA & OWNER ADVISORY */}
      <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#0E1A33] via-[#0A1326] to-[#070D18] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Contractor Consultation</span>
            </div>
            <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Want the Best Option for Your Project?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Talk directly with Vajhat Ali for the final price and equipment recommendation based on your rooftop dimensions, structural orientation, and exact load requirements.
            </p>
            <div className="text-xs text-slate-400 flex items-center gap-2 pt-1 font-mono">
              <span>Direct Owner Line:</span>
              <span className="text-white font-bold">{COMPANY.phoneDisplay}</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-2.5">
            <a
              id="brand-compare-call-owner-btn"
              href={`tel:${COMPANY.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/20 text-center"
            >
              <Phone className="w-4 h-4 fill-slate-950 stroke-none" />
              <span>📞 Call Owner</span>
            </a>

            <a
              id="brand-compare-whatsapp-owner-btn"
              href={`${COMPANY.whatsappLink}?text=${encodeURIComponent(
                `Hello Vajhat Ali, I am using the Paras Enterprises Solar Calculator (${capacityKw} kW, ${location}) and want your direct recommendation on the best brand/equipment option for my site.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 text-center"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950 stroke-none" />
              <span>💬 WhatsApp Owner</span>
            </a>
          </div>

        </div>
      </div>

      {/* REQUIRED ACCREDITATION & ESTIMATE DISCLAIMER */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
        <p className="text-[11px] text-slate-400 max-w-4xl mx-auto leading-relaxed">
          “Prices shown are estimates for comparison only. Final pricing may vary based on equipment selection, site conditions, installation requirements, applicable taxes, and other project-specific factors. Contact Paras Enterprises for the final quotation.”
        </p>
      </div>
    </div>
  );
};
