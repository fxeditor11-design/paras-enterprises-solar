export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  scope: string[];
  imageUrl: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'solar-installation' | 'solar-fitting' | 'government-projects';
  categoryLabel: string;
  location: string;
  description: string;
  scopeItems: string[];
  imageUrl: string;
  realSitePhotoUrl?: string;
  structureType?: string;
}

export interface ServiceLocation {
  id: string;
  name: string;
  district?: string;
  isMainOffice?: boolean;
  distanceFromLatur?: string;
  x: number; // Percentage coordinate for map visual (0-100)
  y: number; // Percentage coordinate for map visual (0-100)
  description: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  service: string;
  location: string;
  projectDetails: string;
}

