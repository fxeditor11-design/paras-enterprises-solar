import React from 'react';
import { Sun, Phone, MapPin, ArrowUp, MessageSquare } from 'lucide-react';
import { COMPANY, SERVICE_LOCATIONS } from '../data/companyData';

interface FooterProps {
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceAreasFormatted = 'Latur • Nilanga • Omerga • Ausa • Parbhani • Ambajogai • Renapur';

  return (
    <footer id="main-footer" className="bg-[#050912] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 p-[1px] shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-[#070D18] rounded-[7px] flex items-center justify-center">
                  <Sun className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-white">
                  {COMPANY.name}
                </h3>
                <span className="text-[11px] uppercase tracking-widest text-slate-400">
                  Government Contractor • Maharashtra
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 font-medium">
              Solar Installation • Solar Fitting • Government Contract Work • Paperwork
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Latur, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COMPANY.phoneDisplay}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  About Paras Enterprises
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Services (01 to 05)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors">
                  Project Portfolio
                </a>
              </li>
              <li>
                <a href="#service-areas" className="hover:text-amber-400 transition-colors">
                  Service Areas
                </a>
              </li>
              <li>
                <a href="#solar-calculator" className="hover:text-amber-400 transition-colors">
                  Solar Price Calculator
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  Contact Owner
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Actions */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
              Direct Contact
            </span>
            <div className="space-y-2">
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="block text-xs text-slate-300 hover:text-white p-2.5 rounded-lg bg-white/[0.04] border border-white/5"
              >
                <span className="text-slate-400 block text-[10px]">Direct Call</span>
                <span className="font-semibold text-white">{COMPANY.phoneDisplay}</span>
              </a>

              <a
                href={`${COMPANY.whatsappLink}?text=${encodeURIComponent(
                  'Hello Vajhat Ali, I am contacting Paras Enterprises from your website.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-emerald-300 hover:text-emerald-200 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: {COMPANY.phoneDisplay}</span>
              </a>

              <button
                onClick={onOpenQuoteModal}
                className="w-full text-xs font-semibold py-2.5 px-3 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors cursor-pointer"
              >
                Get a Quote
              </button>
            </div>
          </div>

        </div>

        {/* Required Service Areas Row */}
        <div className="py-6 border-b border-white/10 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Service Areas:
            </span>
            <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
              {serviceAreasFormatted}
            </p>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} {COMPANY.name}. All Rights Reserved. • Led by {COMPANY.owner}
          </div>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer p-1.5 rounded-md hover:bg-white/5"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
