import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Shield, Award, MapPin, Zap, ChevronDown, Phone, CheckCircle2, Sun, Building2 } from 'lucide-react';
import { COMPANY } from '../data/companyData';
import { REAL_SOLAR_IMAGES, onSolarImageError } from '../data/solarImages';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onScrollToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onScrollToContact }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#070D18] text-white"
    >
      {/* Cinematic Background Image Layer with Gradient Masks */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('${REAL_SOLAR_IMAGES.solarEngineeringHero.path}')`,
          }}
        />
        {/* Cinematic dark navy overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-[#070D18]/85 to-[#070D18]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070D18] via-[#070D18]/90 to-transparent" />
        <div className="absolute inset-0 bg-solar-grid opacity-30" />
        {/* Subtle warm amber radial light glow */}
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Typography and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badges: Government Contractor & "Based in Latur • Serving Multiple Locations" */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
                  Government Contractor • Maharashtra
                </span>
              </div>

              {/* Exact Requested Badge: Based in Latur • Serving Multiple Locations */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 backdrop-blur-md text-amber-300 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Based in Latur • Serving Multiple Locations</span>
              </div>
            </motion.div>

            {/* Main Brand Title & Headings */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-amber-400 uppercase block mb-1.5">
                  {COMPANY.name}
                </span>
                <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                  Powering Projects.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200">
                    Delivering Excellence.
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
              >
                {COMPANY.subtitle}
              </motion.p>
            </div>

            {/* Subtle Owner Attribution Tag */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 pt-0.5"
            >
              <div className="w-1.5 h-8 bg-amber-400 rounded-full" />
              <div>
                <div className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
                  <span>{COMPANY.owner}</span>
                  <span className="text-xs text-amber-400/80 font-normal">({COMPANY.ownerTitle})</span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>Main Office: Latur, Maharashtra</span>
                </div>
              </div>
            </motion.div>

            {/* Hero CTAs: Call Now, WhatsApp, and Get a Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              {/* Primary Call Now Button */}
              <a
                id="hero-call-now-btn"
                href={`tel:${COMPANY.phoneRaw}`}
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 transition-all duration-300 transform active:scale-98 text-center"
              >
                <Phone className="w-4 h-4 fill-slate-950 stroke-none" />
                <span>Call Now: {COMPANY.phoneDisplay}</span>
              </a>

              {/* WhatsApp Button */}
              <a
                id="hero-whatsapp-btn"
                href={`${COMPANY.whatsappLink}?text=${encodeURIComponent(
                  'Hello Paras Enterprises, I would like to enquire about your solar services.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 font-semibold text-sm transition-all duration-300 backdrop-blur-md text-center"
              >
                <MessageSquare className="w-4 h-4 fill-emerald-400 stroke-none" />
                <span>WhatsApp Us</span>
              </a>

              {/* Get a Quote secondary button */}
              <button
                id="hero-get-quote-btn"
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white font-medium text-sm transition-all duration-300 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Quick Pillars List - Rich and Well Spaced */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-3 border-t border-white/10"
            >
              <div>
                <span className="text-xs text-amber-400/90 font-medium block">Specialization</span>
                <span className="text-xs sm:text-sm text-slate-200 font-semibold mt-0.5 block">
                  Solar Installation & Fitting
                </span>
              </div>
              <div>
                <span className="text-xs text-amber-400/90 font-medium block">Contracting</span>
                <span className="text-xs sm:text-sm text-slate-200 font-semibold mt-0.5 block">
                  Government Contract Work
                </span>
              </div>
              <div>
                <span className="text-xs text-amber-400/90 font-medium block">Documentation</span>
                <span className="text-xs sm:text-sm text-slate-200 font-semibold mt-0.5 block">
                  Complete Paperwork
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Impact Cinematic Engineering Composition with Floating Information Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Engineering Showcase Visual Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0F1C38]/90 to-[#070D18]/95 p-2 shadow-2xl shadow-black/80 backdrop-blur-md">
                <div className="relative h-[380px] sm:h-[420px] rounded-xl overflow-hidden group bg-slate-900">
                  <img
                    src={REAL_SOLAR_IMAGES.solarEngineeringHero.path}
                    alt="Paras Enterprises Solar Engineering Worksite"
                    referrerPolicy="no-referrer"
                    onError={(e) => onSolarImageError(e)}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-[#070D18]/25 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Infrastructure & Energy
                    </span>
                    <span className="bg-amber-400 text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      Latur Hub
                    </span>
                  </div>

                  {/* Primary Card Bottom Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#070D18]/90 backdrop-blur-md border border-white/15 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                        Precision Execution
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">Maharashtra</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                      Rooftop & Ground Solar Fitting, Government Infrastructure, and End-to-End Liaison
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Information Card - Solar Energy Visual Details */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 -left-4 sm:-left-6 p-4 rounded-2xl bg-[#0C1527]/95 backdrop-blur-xl border border-amber-400/30 shadow-2xl shadow-black/80 max-w-[260px] sm:max-w-[280px] z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                      Solar Fitting & Paperwork
                    </span>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      On-Site Reliability
                    </h4>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                  <span>Fast Mobilization</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Active Team
                  </span>
                </div>
              </motion.div>

              {/* Floating Engineering Quality Tag (Top-Right) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="hidden sm:flex absolute -top-4 -right-4 px-3.5 py-2 rounded-xl bg-[#091122]/90 backdrop-blur-md border border-white/15 text-xs text-white items-center gap-2 shadow-xl"
              >
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-[11px]">Direct Contractor Supervision</span>
              </motion.div>

              {/* Animated Light Glow Behind Card */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/15 via-blue-500/10 to-transparent rounded-3xl -z-10 blur-2xl opacity-75 pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
