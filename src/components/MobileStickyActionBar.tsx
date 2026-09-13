import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { COMPANY } from '../data/companyData';

export const MobileStickyActionBar: React.FC = () => {
  const generalEnquiryMessage =
    'Hello Paras Enterprises, I would like to enquire about your solar services.';
  const whatsappUrl = `${COMPANY.whatsappLink}?text=${encodeURIComponent(generalEnquiryMessage)}`;

  return (
    <nav
      aria-label="Mobile quick contact bar"
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-[#070D18]/95 backdrop-blur-xl border-t border-amber-400/20 px-3 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.7)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
        {/* Call Now Button */}
        <a
          id="mobile-sticky-call-btn"
          href={`tel:${COMPANY.phoneRaw}`}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 active:from-amber-300 active:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all duration-200 text-center"
        >
          <Phone className="w-4 h-4 fill-slate-950 stroke-none" />
          <span>📞 Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          id="mobile-sticky-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 active:from-emerald-400 active:to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all duration-200 text-center"
        >
          <MessageSquare className="w-4 h-4 fill-slate-950 stroke-none" />
          <span>💬 WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
