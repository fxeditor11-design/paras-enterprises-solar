import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Sparkles, Sun, Wrench, Landmark, FileText, Zap } from 'lucide-react';
import { SERVICES_LIST, COMPANY } from '../data/companyData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onOpenQuoteModal: (serviceId?: string) => void;
}

const serviceIcons: Record<string, React.ElementType> = {
  'solar-installation': Sun,
  'solar-fitting': Wrench,
  'government-contract-work': Landmark,
  'complete-paperwork': FileText,
  'fast-work-execution': Zap,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuoteModal }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES_LIST[0].id);

  const activeService = SERVICES_LIST.find((s) => s.id === activeServiceId) || SERVICES_LIST[0];

  return (
    <section
      id="services"
      className="relative py-28 bg-[#091020] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Subtle grid and ambient illumination */}
      <div className="absolute inset-0 bg-solar-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Comprehensive Services.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              End-to-End Delivery.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From complete solar energy installations and specialized mounting fittings to registered
            government contract execution and administrative paperwork liaison.
          </p>
        </div>

        {/* 5 Core Services List + Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: The 5 Ordered Service Cards */}
          <div className="lg:col-span-6 space-y-3">
            {SERVICES_LIST.map((service) => {
              const isSelected = service.id === activeServiceId;
              const IconComponent = serviceIcons[service.id] || Sun;

              return (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`group relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 border text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0F1D38] to-[#0D182E] border-amber-400/50 shadow-xl shadow-amber-500/5 ring-1 ring-amber-400/30'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Number Identifier */}
                      <span
                        className={`font-mono text-sm sm:text-base font-bold transition-colors ${
                          isSelected ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      >
                        {service.number}
                      </span>

                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                            : 'bg-white/5 text-slate-300 group-hover:text-amber-400 group-hover:bg-white/10'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Titles & Description */}
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                          {service.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 pt-1">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-400 rotate-45'
                            : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Preview Panel for Selected Service */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl bg-gradient-to-b from-[#0F1C36] to-[#070D18] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden relative"
              >
                {/* Visual Preview Image */}
                <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden mb-6 border border-white/10">
                  <img
                    src={activeService.imageUrl}
                    alt={activeService.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 bg-[#070D18]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-400 border border-white/10">
                    Service {activeService.number} — Paras Enterprises
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {activeService.title}
                    </h3>
                    <span className="text-xs text-amber-400 font-mono tracking-wider font-semibold uppercase">
                      Latur & Surrounding
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeService.fullDesc}
                  </p>

                  {/* Highlights / Features */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                      Execution Highlights:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {activeService.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Work Scope Details */}
                  <div className="pt-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                      Technical Scope:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeService.scope.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA inside Panel */}
                  <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-white/10">
                    <button
                      id={`quote-btn-for-${activeService.id}`}
                      onClick={() => onOpenQuoteModal(activeService.id)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs transition-colors shadow-lg shadow-amber-400/20 cursor-pointer"
                    >
                      <span>Inquire About {activeService.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`${COMPANY.whatsappLink}?text=${encodeURIComponent(
                        `Hello Vajhat Ali, I would like to inquire about ${activeService.title} by Paras Enterprises.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-colors"
                    >
                      <span>WhatsApp Inquiries</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
