import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, User, MapPin, ArrowRight, Wrench, FileText, Zap } from 'lucide-react';
import { COMPANY } from '../data/companyData';

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
      className="relative py-28 bg-[#070D18] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Background Accent Grids */}
      <div className="absolute inset-0 bg-solar-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Cinematic Visual Composition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1545209568-18e952674e2a?auto=format&fit=crop&w=1000&q=80"
                  alt="Solar engineering work by Paras Enterprises"
                  className="w-full h-[460px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-transparent to-transparent opacity-80" />

                {/* Floating Bottom Card: Owner & Leadership */}
                <div className="absolute bottom-5 left-5 right-5 p-5 rounded-xl bg-[#0B1325]/90 backdrop-blur-md border border-white/15 shadow-xl">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-lg shadow-md shadow-amber-500/20">
                      <User className="w-6 h-6 text-slate-950" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white tracking-wide">
                        {COMPANY.owner}
                      </div>
                      <div className="text-xs text-amber-400 font-medium">
                        Owner & Project Director • Paras Enterprises
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Latur, Maharashtra</span>
                    </div>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active On-Site
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-amber-400/40 rounded-tr-2xl pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-blue-400/30 rounded-bl-2xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Column: Exact Heading, Paragraph & Principles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Tagline */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>About Paras Enterprises</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                {COMPANY.headingAbout}
              </h2>
            </div>

            {/* Exact Required Body Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {COMPANY.aboutText}
            </p>

            {/* Core Values / Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-3">
                      <IconComponent className="w-4 h-4 text-amber-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1.5">{pillar.title}</h3>
                    <p className="text-xs text-slate-400 leading-normal">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              <button
                id="about-request-quote-btn"
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm transition-all duration-300 shadow-lg shadow-amber-400/20 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="about-contact-btn"
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-medium text-sm transition-colors"
              >
                <span>Call +91 91753 49753</span>
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
