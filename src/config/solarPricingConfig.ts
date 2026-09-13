/**
 * PARAS ENTERPRISES - INTERNAL SOLAR PRICING & CONFIGURATION ENGINE
 * 
 * NOTE FOR DEVELOPER / BUSINESS OWNER (Vajhat Ali):
 * ----------------------------------------------------
 * You can configure and update all base charges, percentage variables, and rates below.
 * The calculator recalculates all estimates dynamically without hardcoded assumptions.
 * 
 * SENSITIVITY NOTICE:
 * "profitMargin" (10%) is an internal business setting.
 * It is integrated internally into calculation logic and is NEVER displayed or labeled
 * as "profit" to the customer in the customer-facing interface.
 */

export type SolarBrandKey = 'waaree' | 'utl' | 'tata';

export interface SolarBrandConfig {
  name: string;
  badge: string;
  tier: string;
  description: string;
  warrantyYears: string;
  pricePerKw: number; // Brand-specific selling base rate per kW for equipment
  isRecommended?: boolean; // Owner toggle
}

export interface SolarPricingConfig {
  // Internal Business Setting (Never labeled or shown to customers)
  profitMargin: number; // e.g., 0.10 for 10%

  // Configurable GST Rate (e.g., 0.138 for 13.8% composite or 0.18 for 18% or 0.12, configurable)
  gstRate: number; // e.g. 0.138 (13.8% standard solar rooftop composite tax) or configurable

  // Brand-specific equipment pricing per kW (Editable by Paras Enterprises)
  waareePricePerKw: number;
  utlPricePerKw: number;
  tataPricePerKw: number;

  // Which brand is flagged as recommended (Owner can select 'waaree' | 'utl' | 'tata' | null)
  recommendedBrand: SolarBrandKey | null;

  // Base Solar Equipment & Module Rates per kW (PV panels, inverter, DC cabling) - general baseline
  pricePerKw: {
    residential: number; // base equipment cost per kW
    commercial: number;
    industrial: number;
    agricultural: number;
  };

  // Installation & Fitting Charges per kW
  installationChargePerKw: number;

  // Structure / Mounting Hardware Charges per kW (GI elevated, rooftop mounts)
  structureChargePerKw: number;

  // Electrical Work Charges per kW (AC/DC DB, earthing kits, lightning arrester, wiring)
  electricalChargePerKw: number;

  // Paperwork / Documentation & Liaisoning Charges (Discom sanction, net-metering liaison)
  paperworkChargeBase: number;
  paperworkChargePerKw: number;

  // Comprehensive Maintenance & Service Charges (1-Year inspection & tuning)
  maintenanceChargePerKw: number;

  // Regional Location Dispatch Charges from Latur Headquarters
  locationCharges: Record<string, number>;

  // System type factor (on-grid, hybrid with battery, off-grid)
  systemTypeMultiplier: {
    'on-grid': number;
    'hybrid': number;
    'off-grid': number;
  };
}

export const DEFAULT_SOLAR_CONFIG: SolarPricingConfig = {
  // Profit margin: 10% (internal business configuration)
  profitMargin: 0.10,

  // Configurable GST Rate (standard 13.8% composite solar tax / 18% configurable)
  gstRate: 0.138,

  // Brand-Specific Equipment Selling Rates per kW (Configurable by Paras Enterprises)
  waareePricePerKw: 41500, // Standard / Value Option
  utlPricePerKw: 44000,    // Value / Performance Option
  tataPricePerKw: 48500,   // Premium Option

  // Recommended brand toggle (null or 'waaree' | 'utl' | 'tata')
  recommendedBrand: 'utl', // Set by business owner

  // Base equipment cost per kW (Modules, inverters, core balance of systems)
  pricePerKw: {
    residential: 42000,
    commercial: 39000,
    industrial: 37000,
    agricultural: 40000,
  },

  // Installation & fitting charges per kW
  installationChargePerKw: 4500,

  // Structure & mounting charges per kW
  structureChargePerKw: 3800,

  // Electrical work charges per kW
  electricalChargePerKw: 3200,

  // Paperwork/documentation charges
  paperworkChargeBase: 3500,
  paperworkChargePerKw: 500,

  // Maintenance & routine monitoring service charges per kW
  maintenanceChargePerKw: 1500,

  // Location charges by work area (from Latur HQ)
  locationCharges: {
    'Latur': 0, // Main Office HQ
    'Renapur': 1200,
    'Ausa': 1500,
    'Nilanga': 2200,
    'Ambajogai': 2500,
    'Omerga': 3000,
    'Parbhani': 3800,
    'Other Area': 4500,
  },

  // System type modifiers
  systemTypeMultiplier: {
    'on-grid': 1.0,
    'hybrid': 1.28, // Includes solar hybrid inverter + energy storage readiness
    'off-grid': 1.35, // Includes dedicated battery bank & charge controller
  },
};

export interface CalculatorInput {
  capacityKw: number;
  systemType: 'on-grid' | 'hybrid' | 'off-grid';
  propertyType: 'residential' | 'commercial' | 'industrial' | 'agricultural';
  location: string;
}

export interface CustomerPriceBreakdown {
  baseCost: number;             // Equipment & modules (including internal configuration)
  serviceAndInstallation: number; // Installation, fitting, structure, electrical, paperwork, location, maintenance
  subtotal: number;             // Sum of Base Cost + Service & Installation
  gst: number;                  // Subtotal * gstRate
  estimatedTotal: number;       // Subtotal + GST
  gstPercentageDisplay: number; // for display e.g. 13.8%
}

/**
 * Calculates customer pricing transparently following business rules:
 * - Internal profit margin (10%) is accounted for in the core rate engine without ever displaying the word "profit"
 * - Output provides the exact required customer breakdown:
 *   Base Cost
 *   Service & Installation
 *   Subtotal
 *   GST
 *   ━━━━━━━━━━━━
 *   ESTIMATED TOTAL
 */
export function calculateSolarEstimate(
  input: CalculatorInput,
  config: SolarPricingConfig = DEFAULT_SOLAR_CONFIG
): CustomerPriceBreakdown {
  const { capacityKw, systemType, propertyType, location } = input;

  const multiplier = config.systemTypeMultiplier[systemType] || 1.0;
  const internalFactor = 1 + (config.profitMargin || 0);

  // 1. Raw Base Solar / Equipment cost
  const rawBaseEquipment =
    (config.pricePerKw[propertyType] || config.pricePerKw.residential) *
    capacityKw *
    multiplier;

  // 2. Services & Engineering breakdown
  const rawInstallation = config.installationChargePerKw * capacityKw;
  const rawStructure = config.structureChargePerKw * capacityKw;
  const rawElectrical = config.electricalChargePerKw * capacityKw;
  const rawPaperwork = config.paperworkChargeBase + config.paperworkChargePerKw * capacityKw;
  const rawMaintenance = config.maintenanceChargePerKw * capacityKw;
  const rawLocationCharge = config.locationCharges[location] ?? config.locationCharges['Other Area'] ?? 3000;

  const rawServicesTotal =
    rawInstallation +
    rawStructure +
    rawElectrical +
    rawPaperwork +
    rawMaintenance +
    rawLocationCharge;

  // Apply internal business factor to both components smoothly
  const baseCost = Math.round(rawBaseEquipment * internalFactor);
  const serviceAndInstallation = Math.round(rawServicesTotal * internalFactor);

  const subtotal = baseCost + serviceAndInstallation;
  const gst = Math.round(subtotal * (config.gstRate || 0));
  const estimatedTotal = subtotal + gst;

  return {
    baseCost,
    serviceAndInstallation,
    subtotal,
    gst,
    estimatedTotal,
    gstPercentageDisplay: Number(((config.gstRate || 0) * 100).toFixed(1)),
  };
}

export interface BrandPriceBreakdown {
  brandKey: SolarBrandKey;
  brandName: string;
  badgeNumber: string;
  badgeTag: string;
  tierLabel: string;
  description: string;
  isRecommended: boolean;
  equipmentCost: number; // Estimated equipment cost
  installationFitting: number; // Installation/fitting
  applicableCharges: number; // Structure, electrical, paperwork, maintenance, location charges
  subtotal: number;
  gst: number;
  estimatedTotal: number;
  gstPercentageDisplay: number;
}

/**
 * Calculates comparative estimates for WAAREE SOLAR, UTL SOLAR, and TATA POWER SOLAR
 * based on the user's selected system capacity, type, and location.
 */
export function calculateBrandComparison(
  input: CalculatorInput,
  config: SolarPricingConfig = DEFAULT_SOLAR_CONFIG
): BrandPriceBreakdown[] {
  const { capacityKw, systemType, location } = input;
  const multiplier = config.systemTypeMultiplier[systemType] || 1.0;
  const internalFactor = 1 + (config.profitMargin || 0);

  // Common service components
  const rawInstallation = config.installationChargePerKw * capacityKw;
  const rawStructure = config.structureChargePerKw * capacityKw;
  const rawElectrical = config.electricalChargePerKw * capacityKw;
  const rawPaperwork = config.paperworkChargeBase + config.paperworkChargePerKw * capacityKw;
  const rawMaintenance = config.maintenanceChargePerKw * capacityKw;
  const rawLocationCharge = config.locationCharges[location] ?? config.locationCharges['Other Area'] ?? 3000;

  // Applicable charges = Structure + Electrical + Paperwork + Maintenance + Location
  const rawApplicableCharges =
    rawStructure + rawElectrical + rawPaperwork + rawMaintenance + rawLocationCharge;

  const installationFitting = Math.round(rawInstallation * internalFactor);
  const applicableCharges = Math.round(rawApplicableCharges * internalFactor);

  const brandDefinitions: {
    key: SolarBrandKey;
    name: string;
    badgeNumber: string;
    badgeTag: string;
    tierLabel: string;
    description: string;
    pricePerKw: number;
  }[] = [
    {
      key: 'waaree',
      name: 'WAAREE SOLAR',
      badgeNumber: '01',
      badgeTag: 'Standard / Value Option',
      tierLabel: 'High-Efficiency Monocrystalline / Poly Modules',
      description: 'Reliable benchmark domestic solar performance with robust tier-1 field stability.',
      pricePerKw: config.waareePricePerKw || 41500,
    },
    {
      key: 'utl',
      name: 'UTL SOLAR',
      badgeNumber: '02',
      badgeTag: 'Value / Performance Option',
      tierLabel: 'Advanced MPPT & High-Yield Solar Engineering',
      description: 'Optimized generation yield for regional climates with enhanced inverter responsiveness.',
      pricePerKw: config.utlPricePerKw || 44000,
    },
    {
      key: 'tata',
      name: 'TATA POWER SOLAR',
      badgeNumber: '03',
      badgeTag: 'Premium Option',
      tierLabel: 'Flagship Grade Reliability & Proven Longevity',
      description: 'Engineered for enduring durability, heavy-duty industrial grade components, and elite output.',
      pricePerKw: config.tataPricePerKw || 48500,
    },
  ];

  return brandDefinitions.map((b) => {
    const rawEquipment = b.pricePerKw * capacityKw * multiplier;
    const equipmentCost = Math.round(rawEquipment * internalFactor);
    const subtotal = equipmentCost + installationFitting + applicableCharges;
    const gst = Math.round(subtotal * (config.gstRate || 0));
    const estimatedTotal = subtotal + gst;

    return {
      brandKey: b.key,
      brandName: b.name,
      badgeNumber: b.badgeNumber,
      badgeTag: b.badgeTag,
      tierLabel: b.tierLabel,
      description: b.description,
      isRecommended: config.recommendedBrand === b.key,
      equipmentCost,
      installationFitting,
      applicableCharges,
      subtotal,
      gst,
      estimatedTotal,
      gstPercentageDisplay: Number(((config.gstRate || 0) * 100).toFixed(1)),
    };
  });
}
