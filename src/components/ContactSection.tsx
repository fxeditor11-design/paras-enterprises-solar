import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Send, CheckCircle2, MapPin, User, ArrowRight, Shield, Zap, Calculator } from 'lucide-react';
import { COMPANY, SERVICES_LIST, SERVICE_LOCATIONS } from '../data/companyData';
import { REAL_SOLAR_IMAGES } from '../data/solarImages';

interface ContactSectionProps {
  onOpenQuoteModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenQuoteModal }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    service: 'Solar Installation',
    location: 'Latur',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Vajhat Ali, I would like to get a quote from Paras Enterprises:\nName: ${
      formData.fullName || 'Not specified'
    }\nPhone: ${formData.phone || 'Not specified'}\nService: ${formData.service}\nLocation: ${
      formData.location
    }\nDetails: ${formData.message || 'General Inquiry'}`;
    window.open(`${COMPANY.whatsappLink}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleScrollToCalc = () => {
    const calcEl = document.getElementById('solar-calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 bg-[#070D18] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Cinematic Solar Engineering Worksite Background Visual Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${REAL_SOLAR_IMAGES.solarEngineeringHero.path}')`,
          }}
        />
        {/* Dark navy overlay to preserve high-contrast legibility */}
        <div className="absolute inset-0 bg-[#070D18]/92 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-[#070D18]/90 to-[#070D18]" />
        <div className="absolute inset-0 bg-solar-grid opacity-25" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dramatic Section Header with requested copy */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Ready to Start Your Project?</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Talk to Vajhat Ali
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-xl mx-auto">
            Direct contractor consultation for solar installations, fittings, government projects, and complete paperwork.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Direct Owner Profile Card & Instant Action Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0F1E3D]/95 via-[#0B1426]/95 to-[#070D18]/95 border border-white/15 shadow-2xl space-y-6 backdrop-blur-md">
            <div className="space-y-5">
              
              {/* Owner Badge */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-amber-500/20 flex-shrink-0">
                  <User className="w-7 h-7 text-slate-950" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                    {COMPANY.owner}
                  </h3>
                  <span className="text-xs sm:text-sm font-semibold text-amber-400 block">
                    {COMPANY.ownerTitle} • {COMPANY.name}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Government Contractor • Latur</span>
                  </div>
                </div>
              </div>

              {/* Contact Info Box */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                      Direct Phone / WhatsApp
                    </span>
                    <span className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
                      {COMPANY.phoneDisplay}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-amber-400/15 flex items-center justify-center text-amber-400">
                    <Phone className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                      Main Office Location
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      {COMPANY.mainOffice}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>

            {/* Exactly Specified Action Buttons: Call Now →, WhatsApp →, Get Final Price → */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Direct Communication Channels:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  id="contact-call-now-btn"
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-400/20 text-center"
                >
                  <Phone className="w-3.5 h-3.5 fill-slate-950 stroke-none" />
                  <span>Call Now →</span>
                </a>

                <a
                  id="contact-whatsapp-btn"
                  href={`${COMPANY.whatsappLink}?text=${encodeURIComponent(
                    'Hello Paras Enterprises, I would like to enquire about your solar services.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/20 text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-slate-950 stroke-none" />
                  <span>WhatsApp →</span>
                </a>
              </div>

              {/* Get Final Price CTA */}
              <button
                id="contact-get-final-price-btn"
                onClick={handleScrollToCalc}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-amber-300 hover:text-amber-200 font-bold text-xs uppercase tracking-wider border border-white/15 transition-colors cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span>Get Final Price →</span>
              </button>
            </div>

          </div>

          {/* Right Column: Direct Quote & Inquiry Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#081020]/90 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col justify-between">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4 my-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Inquiry Received
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you. Vajhat Ali and the Paras Enterprises technical team will review your
                  project requirements and contact you shortly at {formData.phone || COMPANY.phoneDisplay}.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-0.5">
                    Send Direct Project Inquiry
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fill in your project specs or submit via WhatsApp for immediate response.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Your Name / Entity *
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil / Firm Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Phone / Mobile Number *
                    </label>
                    <input
                      id="contact-phone-input"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Service Required
                    </label>
                    <select
                      id="contact-service-select"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#091020] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    >
                      {SERVICES_LIST.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.number} — {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Location
                    </label>
                    <select
                      id="contact-location-select"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#091020] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    >
                      {SERVICE_LOCATIONS.map((l) => (
                        <option key={l.id} value={l.name}>
                          {l.name} {l.isMainOffice ? '(Main Office)' : ''}
                        </option>
                      ))}
                      <option value="Other Location">Other Area</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Project Details / Requirements
                  </label>
                  <textarea
                    id="contact-message-input"
                    rows={3}
                    placeholder="Briefly describe your solar capacity, roof type, government tender specs, or paperwork required..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-400/20 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </button>

                  <button
                    id="contact-form-whatsapp-btn"
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
