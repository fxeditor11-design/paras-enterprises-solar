import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowRight, X, Check, Eye, CheckCircle2, Camera } from 'lucide-react';
import { PROJECTS_DATA, COMPANY } from '../data/companyData';
import { ProjectItem } from '../types';
import { onSolarImageError } from '../data/solarImages';

interface ProjectsShowcaseProps {
  onOpenQuoteModal: (serviceId?: string) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onOpenQuoteModal }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'solar-installation' | 'solar-fitting' | 'government-projects'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalPhotoTab, setModalPhotoTab] = useState<'site' | 'overview'>('site');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'solar-installation', label: 'Solar Installation' },
    { id: 'solar-fitting', label: 'Solar Fitting' },
    { id: 'government-projects', label: 'Government Projects' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 bg-[#070D18] text-white border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-solar-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-5">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Project Execution Portfolio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Demonstrated Work.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Rigorous Standards.
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Showcasing solar installations, structural fittings, and government contract delivery
              across Latur and regional centers in Maharashtra.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-white/[0.03] p-1.5 rounded-xl border border-white/10 backdrop-blur-sm self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-tab-${cat.id}`}
                onClick={() => setActiveFilter(cat.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Large Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0F1C36] to-[#070D18] border border-white/10 hover:border-amber-400/50 transition-all duration-500 flex flex-col shadow-xl"
              >
                {/* Responsive Project Image Container (16:10 mobile, 16:9 sm+) */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => onSolarImageError(e)}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-[#070D18]/40 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                    <span className="bg-[#070D18]/85 backdrop-blur-md border border-white/20 text-amber-400 text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Real Site Photo Badge */}
                  {project.realSitePhotoUrl && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                        <Camera className="w-3 h-3" /> Real Site Photo
                      </span>
                    </div>
                  )}

                  {/* Location Pin */}
                  <div className="absolute bottom-3 left-3 sm:left-4 z-10 flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-200 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-medium truncate max-w-[200px]">{project.location}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Scope bullets */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                      Scope of Work:
                    </span>
                    {project.scopeItems.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      id={`view-details-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-semibold border border-white/10 hover:border-transparent transition-all duration-300 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Project Specs</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox / Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-2xl w-full rounded-2xl bg-[#0B1325] border border-white/20 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <button
                  id="close-project-modal"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  {selectedProject.realSitePhotoUrl ? (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.06] border border-white/10">
                          <button
                            id="tab-site-photo"
                            onClick={() => setModalPhotoTab('site')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              modalPhotoTab === 'site'
                                ? 'bg-amber-400 text-slate-950 shadow-sm'
                                : 'text-slate-300 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>On-Site Worksite Photo</span>
                          </button>
                          <button
                            id="tab-overview-photo"
                            onClick={() => setModalPhotoTab('overview')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              modalPhotoTab === 'overview'
                                ? 'bg-amber-400 text-slate-950 shadow-sm'
                                : 'text-slate-300 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>System Overview</span>
                          </button>
                        </div>
                        <span className="text-[11px] text-amber-400 font-medium hidden sm:inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Authentic Site Installation
                        </span>
                      </div>

                      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[380px] rounded-xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center">
                        <img
                          src={modalPhotoTab === 'site' ? selectedProject.realSitePhotoUrl : selectedProject.imageUrl}
                          alt={selectedProject.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => onSolarImageError(e)}
                          className={`w-full h-full ${
                            modalPhotoTab === 'site'
                              ? 'object-contain sm:object-cover sm:object-[center_35%]'
                              : 'object-cover object-center'
                          }`}
                        />
                        <div className="absolute top-3 left-3 bg-[#070D18]/85 backdrop-blur-md text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-white/20 shadow-sm">
                          {selectedProject.categoryLabel}
                        </div>
                        {modalPhotoTab === 'site' && (
                          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/15">
                            Elevated 6-Panel Concrete Terrace Mount
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                      <img
                        src={selectedProject.imageUrl}
                        alt={selectedProject.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => onSolarImageError(e)}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-3 left-3 bg-[#070D18]/85 backdrop-blur-md text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-white/20 shadow-sm">
                        {selectedProject.categoryLabel}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{selectedProject.location}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {selectedProject.title}
                    </h3>
                    {selectedProject.structureType && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-medium mt-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{selectedProject.structureType}</span>
                      </div>
                    )}
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                      Executed Technical Scope:
                    </span>
                    <ul className="space-y-2">
                      {selectedProject.scopeItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-slate-400">
                      Executed by Paras Enterprises • Vajhat Ali
                    </span>
                    <button
                      id="modal-inquire-project"
                      onClick={() => {
                        setSelectedProject(null);
                        onOpenQuoteModal(selectedProject.category);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      <span>Inquire Similar Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
