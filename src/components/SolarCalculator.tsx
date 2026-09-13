import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator,
  Sun,
  Zap,
  Building,
  Home,
  Factory,
  Tractor,
  MapPin,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Info,
  Sliders,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { COMPANY, SERVICE_LOCATIONS } from '../data/companyData';
import {
  DEFAULT_SOLAR_CONFIG,
  SolarPricingConfig,
  CalculatorInput,
  calculateSolarEstimate,
  calculateBrandComparison,
  SolarBrandKey,
} from '../config/solarPricingConfig';
import { BrandComparisonSection } from './BrandComparisonSection';

interface SolarCalculatorProps {
  onOpenQuoteModal?: (prefilledNote?: string) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onOpenQuoteModal }) => {
  // Configurable rates state (can be adjusted by owner/developer)
  const [config, setConfig] = useState<SolarPricingConfig>(DEFAULT_SOLAR_CONFIG);
  const [showConfigDrawer, setShowConfigDrawer] = useState<boolean>(false);
  const [showOwnerContactModal, setShowOwnerContactModal] = useState<boolean>(false);
  const [selectedBrandForModal, setSelectedBrandForModal] = useState<{
    name: string;
    estimatedTotal: number;
  } | null>(null);

  // Customer selections
  const [capacityKw, setCapacityKw] = useState<number>(5);
  const [systemType, setSystemType] = useState<'on-grid' | 'hybrid' | 'off-grid'>('on-grid');
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial' | 'industrial' | 'agricultural'>('residential');
  const [location, setLocation] = useState<string>('Latur');

  // Calculation output
  const calculation = calculateSolarEstimate(
    { capacityKw, systemType, propertyType, location },
    config
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const systemTypeLabels: Record<'on-grid' | 'hybrid' | 'off-grid', string> = {
    'on-grid': 'On-Grid Net-Metered Solar',
    'hybrid': 'Hybrid Solar (with Battery Storage)',
    'off-grid': 'Off-Grid Standalone System',
  };

  const propertyTypeLabels: Record<'residential' | 'commercial' | 'industrial' | 'agricultural', string> = {
    residential: 'Residential Rooftop',
    commercial: 'Commercial Establishment',
    industrial: 'Industrial Facility',
    agricultural: 'Agricultural / Farm Pump',
  };

  // WhatsApp Enquiry Text (Exact prompt requirement)
  const whatsappMessage = `Hello Vajhat Ali, I would like a quotation for a solar installation.

Solar Capacity: ${capacityKw} kW
System Type: ${systemTypeLabels[systemType]}
Property Type: ${propertyTypeLabels[propertyType]}
Location: ${location}
Estimated Price: ₹${formatCurrency(calculation.estimatedTotal)}

I would like to discuss the final price.`;

  const whatsappUrl = `${COMPANY.whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section
      id="solar-calculator"
      className="relative py-16 sm:py-20 bg-[#070D18] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-solar-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5">
          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              <Calculator className="w-3.5 h-3.5" />
              <span>Solar Cost Estimator</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Plan Your Project.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-100">
                Instant Solar Estimate.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Configure system size, installation tier, and work location across Maharashtra. Receive an instant itemized breakdown.
            </p>
          </div>

          {/* Owner / Developer Settings Toggle */}
          <div className="flex items-center gap-2">
            <button
              id="toggle-pricing-settings-btn"
              onClick={() => setShowConfigDrawer(!showConfigDrawer)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-amber-400 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer"
              title="Open Internal Business Configuration"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Internal Settings</span>
            </button>
          </div>
        </div>

        {/* DEVELOPER / OWNER INTERNAL CONFIGURATION DRAWER */}
        <AnimatePresence>
          {showConfigDrawer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 overflow-hidden"
            >
              <div className="p-6 rounded-2xl bg-[#050B16] border border-amber-500/30 text-xs space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="font-mono font-bold text-amber-400 uppercase tracking-wider text-sm">
                      Developer / Business Configuration Settings
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Owner: Vajhat Ali • Internal Use Only
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                  {/* profitMargin = 10% */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <label className="text-slate-400 font-mono block mb-1">
                      profitMargin = {(config.profitMargin * 100).toFixed(0)}%
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0.05"
                        max="0.25"
                        step="0.01"
                        value={config.profitMargin}
                        onChange={(e) =>
                          setConfig({ ...config, profitMargin: parseFloat(e.target.value) })
                        }
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                      <span className="font-mono text-white font-bold">
                        {(config.profitMargin * 100).toFixed(0)}%
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Internal margin (hidden from customer breakdown)
                    </span>
                  </div>

                  {/* gstRate = configurable */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <label className="text-slate-400 font-mono block mb-1">
                      gstRate = {(config.gstRate * 100).toFixed(1)}%
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0.05"
                        max="0.28"
                        step="0.001"
                        value={config.gstRate}
                        onChange={(e) =>
                          setConfig({ ...config, gstRate: parseFloat(e.target.value) })
                        }
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                      <span className="font-mono text-white font-bold">
                        {(config.gstRate * 100).toFixed(1)}%
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Configurable composite solar GST percentage
                    </span>
                  </div>

                  {/* BRAND PRICING VARIABLES (Configurable by Paras Enterprises) */}
                  <div className="p-3 rounded-xl bg-black/40 border border-amber-400/20 col-span-1 sm:col-span-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-amber-400 font-mono text-xs font-bold block">
                        Solar Brand Selling Rates (Per kW Equipment Base)
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Brand Comparison Engine
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      {/* Waaree */}
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                        <label className="text-[11px] text-slate-300 font-mono block">
                          01 • Waaree Solar (₹/kW)
                        </label>
                        <input
                          type="number"
                          step="500"
                          value={config.waareePricePerKw}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              waareePricePerKw: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white font-mono text-xs mt-1"
                        />
                        <span className="text-[9px] text-slate-400 block mt-0.5">Standard / Value</span>
                      </div>

                      {/* UTL */}
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                        <label className="text-[11px] text-slate-300 font-mono block">
                          02 • UTL Solar (₹/kW)
                        </label>
                        <input
                          type="number"
                          step="500"
                          value={config.utlPricePerKw}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              utlPricePerKw: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white font-mono text-xs mt-1"
                        />
                        <span className="text-[9px] text-slate-400 block mt-0.5">Value / Performance</span>
                      </div>

                      {/* Tata Power */}
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                        <label className="text-[11px] text-slate-300 font-mono block">
                          03 • Tata Power Solar (₹/kW)
                        </label>
                        <input
                          type="number"
                          step="500"
                          value={config.tataPricePerKw}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              tataPricePerKw: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white font-mono text-xs mt-1"
                        />
                        <span className="text-[9px] text-slate-400 block mt-0.5">Premium Option</span>
                      </div>
                    </div>

                    {/* Recommended Brand Toggle */}
                    <div className="flex flex-wrap items-center justify-between pt-1 gap-2 border-t border-white/5 text-xs">
                      <span className="text-slate-400">Featured &apos;Recommended&apos; Badge:</span>
                      <div className="flex items-center gap-1.5">
                        {[
                          { key: 'waaree', label: 'Waaree' },
                          { key: 'utl', label: 'UTL' },
                          { key: 'tata', label: 'Tata Power' },
                          { key: null, label: 'None' },
                        ].map((opt) => (
                          <button
                            key={opt.label}
                            onClick={() =>
                              setConfig({
                                ...config,
                                recommendedBrand: opt.key as SolarBrandKey | null,
                              })
                            }
                            className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                              config.recommendedBrand === opt.key
                                ? 'bg-amber-400 text-slate-950 font-bold'
                                : 'bg-white/5 text-slate-300 hover:bg-white/10'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* pricePerKw = configurable */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <label className="text-slate-400 font-mono block mb-1">
                      General pricePerKw (Residential)
                    </label>
                    <input
                      type="number"
                      step="500"
                      value={config.pricePerKw.residential}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          pricePerKw: {
                            ...config.pricePerKw,
                            residential: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-white font-mono"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Base modules & inverter per kW
                    </span>
                  </div>

                  {/* installationCharge = configurable */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <label className="text-slate-400 font-mono block mb-1">
                      installationCharge (Per kW)
                    </label>
                    <input
                      type="number"
                      step="100"
                      value={config.installationChargePerKw}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          installationChargePerKw: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-white font-mono"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Mounting and module fitting labor
                    </span>
                  </div>

                  {/* structureCharge = configurable */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <label className="text-slate-400 font-mono block mb-1">
                      structureCharge (Per kW)
                    </label>
                    <input
                      type="number"
                      step="100"
                      value={config.structureChargePerKw}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          structureChargePerKw: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-white font-mono"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Hot-dip GI frames & civil hardware
                    </span>
                  </div>

                  {/* electricalCharge = configurable */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <label className="text-slate-400 font-mono block mb-1">
                      electricalCharge (Per kW)
                    </label>
                    <input
                      type="number"
                      step="100"
                      value={config.electricalChargePerKw}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          electricalChargePerKw: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-white font-mono"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Earthing, distribution box & cabling
                    </span>
                  </div>

                  {/* paperworkCharge = configurable */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <label className="text-slate-400 font-mono block mb-1">
                      paperworkCharge (Base + Rate)
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="number"
                        step="500"
                        title="Base paperwork charge"
                        value={config.paperworkChargeBase}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            paperworkChargeBase: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-1/2 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white font-mono text-[11px]"
                      />
                      <input
                        type="number"
                        step="100"
                        title="Per kW paperwork charge"
                        value={config.paperworkChargePerKw}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            paperworkChargePerKw: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-1/2 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white font-mono text-[11px]"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Discom net-metering & sanction paperwork
                    </span>
                  </div>

                  {/* maintenanceCharge = configurable */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <label className="text-slate-400 font-mono block mb-1">
                      maintenanceCharge (Per kW)
                    </label>
                    <input
                      type="number"
                      step="100"
                      value={config.maintenanceChargePerKw}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          maintenanceChargePerKw: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-white font-mono"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Routine checkups & service support
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-slate-400 text-[11px] border-t border-white/5">
                  <span>Changes reflect immediately in real-time customer calculations.</span>
                  <button
                    onClick={() => setConfig(DEFAULT_SOLAR_CONFIG)}
                    className="text-amber-400 hover:underline cursor-pointer"
                  >
                    Reset to Default Rates
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN CALCULATOR INTERFACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Customer Selection Inputs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Input 1: Solar Capacity (kW) Slider & Quick Chips */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="capacity-slider" className="text-sm font-semibold text-white flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Solar System Capacity</span>
                  </label>
                  <span className="text-xs text-slate-400">
                    Estimated monthly generation: ~{capacityKw * 120} to {capacityKw * 135} Units (kWh)
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-display text-3xl font-bold text-amber-400">
                    {capacityKw}
                  </span>
                  <span className="text-sm font-medium text-slate-300 ml-1">kW</span>
                </div>
              </div>

              {/* Slider */}
              <input
                id="capacity-slider"
                type="range"
                min="1"
                max="50"
                step="1"
                value={capacityKw}
                onChange={(e) => setCapacityKw(parseInt(e.target.value) || 1)}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              {/* Quick Capacity Presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[2, 3, 5, 10, 15, 25, 40].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setCapacityKw(kw)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      capacityKw === kw
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-300'
                    }`}
                  >
                    {kw} kW
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: System Type */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <label className="text-sm font-semibold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>System Architecture</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'on-grid', title: 'On-Grid Net Meter', desc: 'Direct grid tie-in with MSEDCL net-metering' },
                  { id: 'hybrid', title: 'Hybrid Solar', desc: 'Grid synchronized + battery backup assurance' },
                  { id: 'off-grid', title: 'Off-Grid Standalone', desc: 'Complete independent storage for rural/remote sites' },
                ].map((item) => {
                  const isSelected = systemType === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSystemType(item.id as any)}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 text-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold block text-white mb-1">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-400 leading-tight block">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input 3: Property Type & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Property Type */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-amber-400" />
                  <span>Property Type</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'residential', label: 'Residential', icon: Home },
                    { id: 'commercial', label: 'Commercial', icon: Building },
                    { id: 'industrial', label: 'Industrial', icon: Factory },
                    { id: 'agricultural', label: 'Agricultural', icon: Tractor },
                  ].map((p) => {
                    const isSelected = propertyType === p.id;
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPropertyType(p.id as any)}
                        className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                            : 'bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 border-white/5'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Service Location in Maharashtra */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Installation Location</span>
                </label>
                <select
                  id="calc-location-select"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B1325] border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                >
                  {SERVICE_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name} {loc.isMainOffice ? '(Main Office - Latur)' : ''}
                    </option>
                  ))}
                  <option value="Other Area">Other Area in Maharashtra</option>
                </select>
                <span className="text-[10px] text-slate-400 block pt-1">
                  Dispatched from Paras Enterprises Latur HQ.
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT: Customer Price Breakdown & Final Quote Box (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* EXACT CUSTOMER PRICE BREAKDOWN CARD */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0D1830] to-[#070D18] border border-amber-400/40 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Customer Price Breakdown
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {capacityKw} kW • {propertyTypeLabels[propertyType]}
                </span>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-4 text-sm">
                
                {/* Base Cost */}
                <div className="flex items-center justify-between">
                  <div className="text-slate-300">
                    <span className="font-semibold block">Base Cost</span>
                    <span className="text-[11px] text-slate-400">
                      High-efficiency solar modules, inverter & DC infrastructure
                    </span>
                  </div>
                  <span className="font-mono font-bold text-white text-base">
                    ₹{formatCurrency(calculation.baseCost)}
                  </span>
                </div>

                {/* Service & Installation */}
                <div className="flex items-center justify-between">
                  <div className="text-slate-300">
                    <span className="font-semibold block">Service &amp; Installation</span>
                    <span className="text-[11px] text-slate-400">
                      Fitting, GI structure, electrical earthing, paperwork &amp; logistics
                    </span>
                  </div>
                  <span className="font-mono font-bold text-white text-base">
                    ₹{formatCurrency(calculation.serviceAndInstallation)}
                  </span>
                </div>

                {/* Subtotal */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Subtotal</span>
                  <span className="font-mono font-bold text-slate-100 text-lg">
                    ₹{formatCurrency(calculation.subtotal)}
                  </span>
                </div>

                {/* GST */}
                <div className="flex items-center justify-between">
                  <div className="text-slate-300">
                    <span className="font-semibold block">
                      GST ({calculation.gstPercentageDisplay}%)
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Statutory tax applied on equipment &amp; EPC works
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-300 text-base">
                    ₹{formatCurrency(calculation.gst)}
                  </span>
                </div>

                {/* Divider Line */}
                <div className="pt-2 border-t border-dashed border-amber-400/40"></div>

                {/* ESTIMATED TOTAL (Visually Prominent) */}
                <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase block">
                      ESTIMATED TOTAL
                    </span>
                    <span className="text-[11px] text-slate-300">
                      Complete turnkey system estimate
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                      ₹{formatCurrency(calculation.estimatedTotal)}
                    </span>
                  </div>
                </div>

              </div>

              {/* FINAL QUOTE MESSAGE */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div>
                  <h4 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Need the Final Price?</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Every project is different. For the exact final price, site requirements, equipment selection, and applicable charges, talk directly with our owner.
                  </p>
                </div>

                {/* Talk to Owner for Final Price CTA */}
                <button
                  id="talk-to-owner-btn"
                  onClick={() => setShowOwnerContactModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm transition-all duration-300 shadow-xl shadow-amber-400/20 cursor-pointer"
                >
                  <span>Talk to Owner for Final Price →</span>
                </button>

                {/* Direct quick action buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <a
                    id="call-owner-calc-btn"
                    href={`tel:${COMPANY.phoneRaw}`}
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-400/20 text-center"
                  >
                    <Phone className="w-3.5 h-3.5 fill-slate-950 stroke-none" />
                    <span>📞 Call Now: {COMPANY.phoneDisplay}</span>
                  </a>

                  <a
                    id="whatsapp-owner-calc-btn"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-bold text-emerald-300 transition-colors text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-emerald-400 stroke-none" />
                    <span>💬 WhatsApp Owner</span>
                  </a>
                </div>

                {/* EXACT REQUIRED DISCLAIMER */}
                <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-2">
                  Estimated price only. Final pricing will be confirmed by Paras Enterprises after discussing project requirements and applicable site/equipment details.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* SOLAR BRAND & BUDGET COMPARISON SECTION (Waaree, UTL, Tata Power) */}
        <BrandComparisonSection
          comparisonData={calculateBrandComparison(
            { capacityKw, systemType, propertyType, location },
            config
          )}
          capacityKw={capacityKw}
          systemTypeLabel={systemTypeLabels[systemType]}
          propertyTypeLabel={propertyTypeLabels[propertyType]}
          location={location}
          formatCurrency={formatCurrency}
          onTalkToOwner={(brandName, estimatedTotal) => {
            setSelectedBrandForModal({ name: brandName, estimatedTotal });
            setShowOwnerContactModal(true);
          }}
        />

      </div>

      {/* MODAL: Talk to Owner for Final Price */}
      <AnimatePresence>
        {showOwnerContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-md w-full rounded-3xl bg-[#0A1224] border border-white/20 p-6 sm:p-7 shadow-2xl text-white space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block">
                    Direct Contact
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">
                    Talk to Owner for Final Price
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowOwnerContactModal(false);
                    setSelectedBrandForModal(null);
                  }}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Owner Info Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-display font-bold text-lg">
                  VA
                </div>
                <div>
                  <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block">
                    Owner • Paras Enterprises
                  </span>
                  <h4 className="font-display text-lg font-bold text-white">
                    {COMPANY.owner}
                  </h4>
                  <span className="text-xs text-slate-300 font-mono">
                    {COMPANY.phoneDisplay}
                  </span>
                </div>
              </div>

              {/* Estimate Summary Details */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">System:</span>
                  <span className="font-semibold text-white">{capacityKw} kW • {systemTypeLabels[systemType]}</span>
                </div>
                {selectedBrandForModal && (
                  <div className="flex justify-between text-amber-400">
                    <span>Preferred Brand:</span>
                    <span className="font-bold">{selectedBrandForModal.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-white">{location}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10 font-bold text-amber-400 text-sm">
                  <span>Estimated Total:</span>
                  <span>
                    ₹{formatCurrency(selectedBrandForModal ? selectedBrandForModal.estimatedTotal : calculation.estimatedTotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons: 📞 Call Owner / 💬 WhatsApp Owner */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>📞 Call Owner ({COMPANY.phoneDisplay})</span>
                </a>

                <a
                  href={
                    selectedBrandForModal
                      ? `${COMPANY.whatsappLink}?text=${encodeURIComponent(
                          `Hello Vajhat Ali, I am enquiring from Paras Enterprises Solar Calculator.

System: ${capacityKw} kW • ${systemTypeLabels[systemType]}
Location: ${location}
Equipment Selected: ${selectedBrandForModal.name}
Estimated Budget: ₹${formatCurrency(selectedBrandForModal.estimatedTotal)}

I would like to discuss final equipment availability and quotation.`
                        )}`
                      : whatsappUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>💬 WhatsApp Owner with Enquiry</span>
                </a>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-400">
                  Direct connection with Vajhat Ali for site assessment, equipment selection &amp; finalized quotation.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
