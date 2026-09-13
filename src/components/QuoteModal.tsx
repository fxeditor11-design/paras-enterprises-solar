import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageSquare, CheckCircle2, Phone, Shield, MapPin } from 'lucide-react';
import { COMPANY, SERVICES_LIST, SERVICE_LOCATIONS } from '../data/companyData';

interface QuoteModalProps {
  isOpen: boolean;
  initialServiceId?: string;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, initialServiceId, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    serviceId: initialServiceId || 'solar-installation',
    location: 'Latur',
    details: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: initialServiceId }));
    }
  }, [initialServiceId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedServiceObj = SERVICES_LIST.find((s) => s.id === formData.serviceId) || SERVICES_LIST[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const text = `Hello Vajhat Ali, I would like to request a quote from Paras Enterprises:\n\nClient: ${
      formData.fullName || 'Not specified'
    }\nPhone: ${formData.phone || 'Not specified'}\nService: ${
      selectedServiceObj.title
    }\nLocation: ${formData.location}\nDetails: ${formData.details || 'General inquiry'}`;

    window.open(`${COMPANY.whatsappLink}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-xl w-full rounded-3xl bg-[#091122] border border-white/20 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            id="close-quote-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Direct Project Quote</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Request a Project Quote
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with <strong className="text-white">Vajhat Ali</strong>, Owner of Paras
              Enterprises. Quick turnaround for solar and contract works.
            </p>
          </div>

          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-white">Request Received</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you, {formData.fullName || 'Sir/Ma’am'}. Vajhat Ali will contact you directly on{' '}
                {formData.phone || COMPANY.phoneDisplay} to discuss your requirements.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Also Open in WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Full Name / Organization *
                </label>
                <input
                  id="modal-name-input"
                  type="text"
                  required
                  placeholder="e.g. Vajhat Ali / Firm Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Phone Number (Call / WhatsApp) *
                </label>
                <input
                  id="modal-phone-input"
                  type="tel"
                  required
                  placeholder="+91 91753 49753"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Select Service
                  </label>
                  <select
                    id="modal-service-select"
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#060B14] border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.number} — {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Work Location
                  </label>
                  <select
                    id="modal-location-select"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#060B14] border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    {SERVICE_LOCATIONS.map((l) => (
                      <option key={l.id} value={l.name}>
                        {l.name} {l.isMainOffice ? '(Main Office)' : ''}
                      </option>
                    ))}
                    <option value="Other Area">Other Area in Maharashtra</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Brief Project Requirements
                </label>
                <textarea
                  id="modal-details-input"
                  rows={3}
                  placeholder="Estimated solar capacity, government contract scope, site condition, or paperwork needed..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-3 space-y-2">
                <button
                  id="modal-submit-btn"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm transition-all duration-300 shadow-lg shadow-amber-400/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Quote Request</span>
                </button>

                <button
                  id="modal-whatsapp-direct-btn"
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Inquiry to +91 91753 49753</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>Direct hotline: {COMPANY.phoneDisplay} (Vajhat Ali)</span>
                </span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
