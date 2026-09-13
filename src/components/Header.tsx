import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowUpRight, Menu, X, Shield, Sun } from 'lucide-react';
import { COMPANY } from '../data/companyData';

interface HeaderProps {
  onOpenQuoteModal: (serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Service Areas', href: '#service-areas' },
    { name: 'Calculator', href: '#solar-calculator' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#070D18]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/40'
          : 'bg-gradient-to-b from-[#070D18]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            id="brand-logo-link"
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 p-[1px] shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#0B1325] rounded-[7px] flex items-center justify-center transition-all duration-300 group-hover:bg-[#0F1B36]">
                <Sun className="w-5 h-5 text-amber-400 transition-transform duration-500 group-hover:rotate-45" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  PARAS ENTERPRISES
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium block">
                Govt. Contractor • Solar Engineering
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-navbar" className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              id="header-phone-link"
              href={`tel:${COMPANY.phoneRaw}`}
              className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-amber-400 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-all border border-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Now: {COMPANY.phoneDisplay}</span>
            </a>

            <button
              id="header-quote-btn"
              onClick={() => onOpenQuoteModal()}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="header-quote-btn-mobile"
              onClick={() => onOpenQuoteModal()}
              className="bg-amber-400 text-slate-950 text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              Quote
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-b border-white/10 bg-[#070D18]/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
              <div className="px-4 py-2 bg-white/[0.03] rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Owner</span>
                  <span className="text-sm font-semibold text-white">{COMPANY.owner}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                  <Shield className="w-3 h-3" />
                  <span>Govt. Contractor</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  id="mobile-drawer-call-btn"
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-3 px-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Now</span>
                </a>
                <a
                  id="mobile-drawer-whatsapp-btn"
                  href={`${COMPANY.whatsappLink}?text=${encodeURIComponent(
                    'Hello Vajhat Ali, I would like to inquire about Paras Enterprises services.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-semibold transition-colors text-center"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
