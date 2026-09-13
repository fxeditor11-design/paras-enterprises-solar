import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { COMPANY } from '../data/companyData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = 'Hello Paras Enterprises, I would like to enquire about your solar services.';
  const whatsappUrl = `${COMPANY.whatsappLink}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="Quick Communication"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 hidden sm:flex items-center gap-3"
    >
      {/* Tooltip badge */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0B1325]/95 backdrop-blur-md text-white border border-white/15 px-3 py-1.5 rounded-xl text-xs shadow-2xl shadow-black/50 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">Direct WhatsApp with Vajhat Ali</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1 p-0.5"
            aria-label="Close message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* WhatsApp Button with pulse */}
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Paras Enterprises on WhatsApp"
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 animate-ping pointer-events-none" />
        <MessageSquare className="w-7 h-7" />
      </a>
    </aside>
  );
};
