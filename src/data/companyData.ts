import { ServiceItem, ProjectItem, ServiceLocation } from '../types';
import { REAL_SOLAR_IMAGES } from './solarImages';

export const COMPANY = {
  name: 'PARAS ENTERPRISES',
  legalTitle: 'Government Contractor • Solar Installation • Solar Fitting • Paperwork',
  tagline: 'Powering Projects. Delivering Excellence.',
  subtitle: 'Professional solar installation, fitting, government contract work, and complete paperwork services across Latur and surrounding areas.',
  owner: 'Vajhat Ali',
  ownerTitle: 'Owner',
  mainOffice: 'Latur, Maharashtra, India',
  phoneDisplay: '+91 91753 49753',
  phoneRaw: '+919175349753',
  whatsappRaw: '919175349753',
  whatsappLink: 'https://wa.me/919175349753',
  email: 'contact@parasenterprises.in',
  headingAbout: 'Reliable Work. Professional Execution.',
  aboutText:
    'Paras Enterprises, led by Vajhat Ali, provides professional solar installation, solar fitting, government contract work, and complete paperwork services. Based in Latur, the business serves projects across multiple locations with a focus on fast execution, reliable workmanship, and professional service.',
  contactCtaHeading: 'Let’s Get Your Project Started.',
  contactCtaSubheading: 'Speak directly with Paras Enterprises.',
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'solar-installation',
    number: '01',
    title: 'Solar Installation',
    shortDesc: 'Professional solar system installation.',
    fullDesc:
      'Complete end-to-end solar system installation engineered for optimal energy capture, durable electrical connections, and seamless integration for residential, commercial, and institutional projects.',
    features: [
      'Precision rooftop and ground solar system deployment',
      'High-grade solar modules & inverter synchronization',
      'Grid-connected and backup solar power setup',
      'Safety testing and commissioning protocol',
    ],
    scope: [
      'Site layout and roof orientation assessment',
      'Module mounting and secure cabling execution',
      'Inverter wiring and electrical distribution setup',
      'System startup and energy output testing',
    ],
    imageUrl: REAL_SOLAR_IMAGES.rooftopElevatedTerrace.path,
  },
  {
    id: 'solar-fitting',
    number: '02',
    title: 'Solar Fitting',
    shortDesc: 'Reliable solar fitting and setup.',
    fullDesc:
      'Robust structural fitting, heavy-duty mounting hardware, precision clamping, and secure cable routing built to withstand weather fluctuations and deliver long-term mechanical stability.',
    features: [
      'Heavy-duty mounting rails and corrosion-resistant clamps',
      'Structural fitting engineered for wind resistance',
      'Weatherproof conduit routing and DC/AC junction fittings',
      'Dedicated earthing and surge protection connections',
    ],
    scope: [
      'Mechanical anchor bolt and clamp torque inspection',
      'Elevated frame and sheet fitting without roof damage',
      'Chemical earthing and ground bonding verification',
      'Cable protection and junction terminal sealing',
    ],
    imageUrl: REAL_SOLAR_IMAGES.industrialShedFitting.path,
  },
  {
    id: 'government-contract-work',
    number: '03',
    title: 'Government Contract Work',
    shortDesc: 'Professional government project execution.',
    fullDesc:
      'Registered contractor execution for government facilities, public infrastructure, and municipal institutions. We ensure full compliance with official tender specifications, safety standards, and project schedules.',
    features: [
      'Execution aligned with official departmental specifications',
      'Professional on-site supervision and workforce management',
      'Quality material verification and milestone documentation',
      'Strict adherence to compliance and safety guidelines',
    ],
    scope: [
      'Contract specification review and on-site alignment',
      'Timely material mobilization and structural works',
      'Progress tracking and technical documentation handover',
      'Official departmental inspection coordination',
    ],
    imageUrl: REAL_SOLAR_IMAGES.groundMountedArray.path,
  },
  {
    id: 'complete-paperwork',
    number: '04',
    title: 'Complete Paperwork',
    shortDesc: 'Documentation and paperwork support.',
    fullDesc:
      'End-to-end documentation assistance to ensure smooth administrative clearance, net-metering applications, sanction files, and official department paperwork without delays or complications.',
    features: [
      'Complete application preparation and dossier filing',
      'Net-metering and load sanction documentation assistance',
      'Liaison and follow-up with relevant authorities',
      'Clear compliance records and handover files',
    ],
    scope: [
      'Initial document verification and load requirement review',
      'Government and utility portal submission filing',
      'Official inspection clearance support',
      'Final completion and sanction document delivery',
    ],
    imageUrl: REAL_SOLAR_IMAGES.rooftopElevatedTerrace.path,
  },
  {
    id: 'fast-work-execution',
    number: '05',
    title: 'Fast Work Execution',
    shortDesc: 'Quick and organized project execution.',
    fullDesc:
      'Structured planning, proactive material staging, and disciplined execution teams ensure projects progress smoothly from initial site preparation to final handover within targeted timelines.',
    features: [
      'Systematic phase-wise execution schedule',
      'Experienced on-site technical crew',
      'Pre-assembled fittings for rapid site deployment',
      'Direct owner supervision by Vajhat Ali',
    ],
    scope: [
      'Streamlined site mobilization and material delivery',
      'Rapid structural erection and electrical assembly',
      'Daily milestone tracking and proactive resolution',
      'Prompt project commissioning and client walkthrough',
    ],
    imageUrl: REAL_SOLAR_IMAGES.solarEngineeringHero.path,
  },
];

export const SERVICE_LOCATIONS: ServiceLocation[] = [
  {
    id: 'latur',
    name: 'Latur',
    district: 'Latur District',
    isMainOffice: true,
    distanceFromLatur: 'Main Office Hub',
    x: 48,
    y: 52,
    description: 'Central operations base and management headquarters for Paras Enterprises.',
  },
  {
    id: 'nilanga',
    name: 'Nilanga',
    district: 'Latur District',
    isMainOffice: false,
    distanceFromLatur: '~48 km South of Latur',
    x: 54,
    y: 72,
    description: 'Active service coverage for solar installations, fitting, and contract work.',
  },
  {
    id: 'omerga',
    name: 'Omerga',
    district: 'Dharashiv District',
    isMainOffice: false,
    distanceFromLatur: '~85 km South-East of Latur',
    x: 72,
    y: 82,
    description: 'Comprehensive solar and documentation support for commercial and public sites.',
  },
  {
    id: 'ausa',
    name: 'Ausa',
    district: 'Latur District',
    isMainOffice: false,
    distanceFromLatur: '~22 km South of Latur',
    x: 42,
    y: 65,
    description: 'Rapid on-site deployment for solar installation and mechanical fitting.',
  },
  {
    id: 'parbhani',
    name: 'Parbhani',
    district: 'Parbhani District',
    isMainOffice: false,
    distanceFromLatur: '~115 km North-East of Latur',
    x: 70,
    y: 18,
    description: 'Solar infrastructure and government contract execution across the region.',
  },
  {
    id: 'ambajogai',
    name: 'Ambajogai',
    district: 'Beed District',
    isMainOffice: false,
    distanceFromLatur: '~48 km North-West of Latur',
    x: 28,
    y: 35,
    description: 'Institutional and rooftop solar fitting with complete paperwork processing.',
  },
  {
    id: 'renapur',
    name: 'Renapur',
    district: 'Latur District',
    isMainOffice: false,
    distanceFromLatur: '~24 km North of Latur',
    x: 49,
    y: 36,
    description: 'Fast project execution, solar system mounting, and maintenance service.',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'solar-latur-rooftop',
    title: 'Rooftop Solar Installation',
    category: 'solar-installation',
    categoryLabel: 'Solar Installation',
    location: 'Latur, Maharashtra',
    description:
      'High-efficiency rooftop solar photovoltaic setup engineered with elevated galvanized steel mounting structure on concrete pedestals for unshaded solar yield on residential terrace.',
    structureType: 'Elevated 4-Post Steel Frame with Concrete Footings',
    scopeItems: [
      'Elevated galvanized steel structural mounting',
      'Tier-1 mono-PERC solar module alignment (6-panel array)',
      'Concrete pedestal foundation anchoring on terrace floor',
      'Inverter setup, surge protection, and net-metering commissioning',
    ],
    imageUrl: REAL_SOLAR_IMAGES.rooftopElevatedTerrace.path,
    realSitePhotoUrl: REAL_SOLAR_IMAGES.rooftopTerracePortrait.path,
  },
  {
    id: 'solar-fitting-nilanga',
    title: 'Industrial Shed Solar Fitting & Mounting',
    category: 'solar-fitting',
    categoryLabel: 'Solar Fitting',
    location: 'Nilanga, Maharashtra',
    description:
      'Precision mounting rail installation with leak-proof clamps, heavy-gauge steel framing, and UV-stabilized cable containment.',
    scopeItems: [
      'Zero-penetration roof clamp mounting',
      'Heavy-duty hot-dip galvanized rails',
      'Surge protection device integration',
      'Dedicated earthing resistance bonding',
    ],
    imageUrl: REAL_SOLAR_IMAGES.industrialShedFitting.path,
  },
  {
    id: 'solar-engineering-paras',
    title: 'Paras Enterprises Solar Engineering',
    category: 'solar-installation',
    categoryLabel: 'Solar Installation',
    location: 'Renapur & Omerga, Maharashtra',
    description:
      'Fast-track commercial solar engineering with rapid structural deployment, automated generation monitoring, and robust operational performance.',
    scopeItems: [
      'High-performance photovoltaic array assembly',
      'Grid synchronization and meter coordination',
      'Quality assurance and wiring insulation test',
      'System handover and operational walkthrough',
    ],
    imageUrl: REAL_SOLAR_IMAGES.solarEngineeringHero.path,
  },
  {
    id: 'govt-contract-parbhani',
    title: 'Public Facility Solar Project Execution',
    category: 'government-projects',
    categoryLabel: 'Government Projects',
    location: 'Parbhani, Maharashtra',
    description:
      'Execution of government contract requirements for institutional and ground-mounted power systems with thorough paperwork and technical compliance.',
    scopeItems: [
      'Official departmental specification adherence',
      'Standardized civil foundation and framing',
      'Milestone-based progress reporting',
      'Inspection coordination and handover',
    ],
    imageUrl: REAL_SOLAR_IMAGES.groundMountedArray.path,
  },
  {
    id: 'solar-fitting-ausa',
    title: 'Structural Solar Fitting & Precision Earthing',
    category: 'solar-fitting',
    categoryLabel: 'Solar Fitting',
    location: 'Ausa, Maharashtra',
    description:
      'Engineered structural fitting designed for high wind resilience, accompanied by chemical earthing and clean conduit distribution.',
    scopeItems: [
      'Elevated galvanized super-structure erection',
      'Corrosion-resistant fastening and torque checks',
      'Dual-copper bonded earthing network',
      'AC/DC distribution box mounting',
    ],
    imageUrl: REAL_SOLAR_IMAGES.industrialShedFitting.path,
  },
  {
    id: 'govt-contract-ambajogai',
    title: 'Administrative Building Solar Power Setup',
    category: 'government-projects',
    categoryLabel: 'Government Projects',
    location: 'Ambajogai, Maharashtra',
    description:
      'Government contract solar setup with end-to-end documentation, structural installation, and electrical distribution compliance.',
    scopeItems: [
      'Civil structure stability checks',
      'Tender-compliant electrical component wiring',
      'Complete sanction and net-metering paperwork',
      'Departmental verification and final sign-off',
    ],
    imageUrl: REAL_SOLAR_IMAGES.rooftopElevatedTerrace.path,
  },
];
