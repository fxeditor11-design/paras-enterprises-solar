import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Shield, Award, MapPin, Zap, ChevronDown } from 'lucide-react';
import { COMPANY } from '../data/companyData';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onScrollToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onScrollToContact }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#070D18] text-white"
    >
      {/* Cinematic Background Image Layer with Gradient Masks */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=2000&q=85')`,
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography and CTAs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Top Badge Strip: Government Contractor & Regional Presence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-medium tracking-wide uppercase text-slate-300">
                Government Contractor • Maharashtra
              </span>
            </motion.div>

            {/* Main Brand Title & Headings */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-amber-400 uppercase block mb-2">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
              >
                {COMPANY.subtitle}
              </motion.p>
            </div>

            {/* Subtle Owner Attribution Tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 pt-1"
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

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                id="hero-get-quote-btn"
                onClick={onOpenQuoteModal}
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-semibold text-sm tracking-wide shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 transform active:scale-98 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                id="hero-whatsapp-btn"
                href={`${COMPANY.whatsappLink}?text=${encodeURIComponent(
                  'Hello Vajhat Ali, I am reaching out through the Paras Enterprises website to discuss a solar / contract project.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white font-medium text-sm transition-all duration-300 backdrop-blur-md"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            </motion.div>

            {/* Quick Pillars List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10"
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

          {/* Right Column: Cinematic Engineering Visual & Feature Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Engineering Showcase Visual Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0F1C38]/80 to-[#070D18]/90 p-2 shadow-2xl shadow-black/60 backdrop-blur-md">
                <div className="relative h-96 sm:h-[430px] rounded-xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1000&q=80"
                    alt="Paras Enterprises Solar Engineering"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-transparent to-transparent" />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Infrastructure & Energy
                    </span>
                    <span className="bg-amber-400 text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Latur Hub
                    </span>
                  </div>

                  {/* Card Bottom Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#070D18]/85 backdrop-blur-md border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                        Precision Execution
                      </span>
                      <span className="text-[11px] text-slate-400">Maharashtra</span>
                    </div>
                    <p className="text-sm font-medium text-white">
                      Rooftop & Ground Solar Fitting, Government Infrastructure, and End-to-End Liaison
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Glow Behind Card */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/10 to-blue-500/10 rounded-3xl -z-10 blur-xl opacity-75" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <a
          href="#about"
          className="text-slate-500 hover:text-amber-400 transition-colors flex flex-col items-center gap-1 text-[11px] tracking-wider uppercase"
        >
          <span>Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
