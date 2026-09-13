/**
 * PARAS ENTERPRISES — Real Solar Project Image Assets Registry
 * 
 * Central registry for authentic project site photographs taken at
 * rooftop installations, industrial sheds, ground-mount sites, and engineering worksites.
 * 
 * Easily drop new real photos into /public/images/projects/ and register them below.
 */

import type React from 'react';

export interface SolarPhotoAsset {
  id: string;
  title: string;
  category: 'rooftop' | 'fitting' | 'engineering' | 'ground-mount' | 'government';
  path: string;
  hashFile: string;
  alt: string;
  aspectRatio: string; // e.g. '16:9' | '4:3'
}

export const REAL_SOLAR_IMAGES = {
  // 1. Concrete Terrace Elevated Rooftop Solar Installation (Latur & Regional)
  rooftopElevatedTerrace: {
    id: 'rooftop-elevated-terrace',
    title: 'Rooftop Solar Installation — Terrace Structural Mounting',
    category: 'rooftop',
    path: '/images/projects/rooftop-solar.jpg',
    hashFile: '/images/projects/e7c91184dc44be146f91cb50913a8af6.jpg',
    alt: 'Real Paras Enterprises elevated rooftop solar installation on concrete terrace with heavy-duty galvanized structure',
    aspectRatio: '16:9',
  },

  // Real 6-Panel Elevated Rooftop Solar on Concrete Terrace (Portrait from user e7c91184dc44be146f91cb50913a8af6.jpg)
  rooftopTerracePortrait: {
    id: 'rooftop-terrace-portrait',
    title: 'Rooftop Solar Installation — Elevated Frame on Concrete Terrace',
    category: 'rooftop',
    path: '/images/projects/rooftop-terrace-solar-portrait.jpg',
    hashFile: '/images/projects/e7c91184dc44be146f91cb50913a8af6.jpg',
    alt: 'Real Paras Enterprises 6-panel elevated rooftop solar installation with square steel legs anchored in concrete pedestals on a sunny terrace',
    aspectRatio: '3:4',
  },

  // 2. Heavy-Duty Solar Fitting & Mounting Rails under Clear Sky
  industrialShedFitting: {
    id: 'industrial-shed-fitting',
    title: 'Industrial Shed Solar Fitting & Mounting',
    category: 'fitting',
    path: '/images/projects/industrial-shed-solar.jpg',
    hashFile: '/images/projects/ceedcfb94e0afa0c49e5351911cb59ea.jpg',
    alt: 'Precision solar mounting structure, heavy-duty rails, and clamp fitting by Paras Enterprises',
    aspectRatio: '16:9',
  },

  // 3. High-Yield Solar Engineering Array at Sunset / Golden Hour
  solarEngineeringHero: {
    id: 'solar-engineering-hero',
    title: 'Paras Enterprises Solar Engineering Worksite',
    category: 'engineering',
    path: '/images/projects/solar-engineering-hero.jpg',
    hashFile: '/images/projects/2155cdb5eac44c470067e0aaec7a7ea3.jpg',
    alt: 'Paras Enterprises high-efficiency solar module engineering and rooftop photovoltaic arrays at golden hour',
    aspectRatio: '16:9',
  },

  // 4. Large-Scale Ground-Mounted Array & Public Facility Solar
  groundMountedArray: {
    id: 'ground-mounted-array',
    title: 'Public Facility & Ground-Mounted Solar Execution',
    category: 'ground-mount',
    path: '/images/projects/ground-mounted-solar.jpg',
    hashFile: '/images/projects/911c4a4b931e043207e6a2389ac53e89.jpg',
    alt: 'Large-scale ground solar plant project execution and structural foundations by Paras Enterprises',
    aspectRatio: '16:9',
  },
} as const;

// Guaranteed reliable local fallback image
export const DEFAULT_SOLAR_FALLBACK_IMAGE = REAL_SOLAR_IMAGES.rooftopElevatedTerrace.path;

/**
 * Universal error fallback handler to guarantee no broken image icons or blank empty spaces appear
 */
export const onSolarImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackPath: string = DEFAULT_SOLAR_FALLBACK_IMAGE
) => {
  const target = event.currentTarget;
  if (target.src !== fallbackPath && !target.src.endsWith(fallbackPath)) {
    target.src = fallbackPath;
  }
};
