import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, User, MapPin, ArrowRight, Wrench, FileText, Zap, Award, Phone } from 'lucide-react';
import { COMPANY } from '../data/companyData';
import { REAL_SOLAR_IMAGES, onSolarImageError } from '../data/solarImages';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  const pillars = [
    {
      icon: Zap,
      title: 'Fast Execution',
      desc: 'Organized scheduling, prompt site mobilization, and punctual project handovers.',
    },
    {
      icon: Wrench,
      title: 'Reliable Workmanship',
      desc: 'Engineered solar fitting, durable structural mounting, and safe electrical connections.',
    },
    {
      icon: FileText,
      title: 'Complete Paperwork',
      desc: 'Seamless documentation support, net-metering assistance, and official compliance files.',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 bg-[#070D18] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Background Accent Grids */}
      <div className="absolute inset-0 bg-solar-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Cinematic Visual Composition */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src={REAL_SOLAR_IMAGES.rooftopTerracePortrait.path}
                  alt="Elevated rooftop solar terrace installation by Paras Enterprises"
                  referrerPolicy="no-referrer"
                  onError={(e) => onSolarImageError(e)}
                  className="w-full h-[400px] sm:h-[440px] object-cover object-[center_35%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-[#070D18]/40 to-transparent opacity-85" />

                {/* Floating Bottom Card: Owner & Leadership */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B1325]/90 backdrop-blur-md border border-white/15 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-base shadow-md shadow-amber-500/20">
                      <User className="w-5 h-5 text-slate-950" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white tracking-wide">
                        {COMPANY.owner}
                      </div>
                      <div className="text-xs text-amber-400 font-medium">
                        Owner & Project Director • Paras Enterprises
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>Latur, Maharashtra</span>
                    </div>
                    <span className="text-emerald-400 font-medium flex items-center gap-1 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active On-Site
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-amber-400/40 rounded-tr-2xl pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-blue-400/30 rounded-bl-2xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Column: Exact Heading, Paragraph & Principles */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>About Paras Enterprises</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {COMPANY.headingAbout}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {COMPANY.aboutText}
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-400/30 transition-all space-y-1.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-white">{pillar.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Consultation CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-400/20 cursor-pointer"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-semibold border border-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Vajhat Ali: {COMPANY.phoneDisplay}</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
