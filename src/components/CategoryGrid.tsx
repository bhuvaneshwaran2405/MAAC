import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Category } from '../types.ts';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (id: string, subCategory?: string) => void;
  isLocked?: boolean;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory,
  isLocked = false,
}) => {
  const handleCardClick = (catId: string, subCategory?: string) => {
    if (isLocked) return;
    onSelectCategory(catId, subCategory);
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Ensure 4 sectors so mobile renders in a balanced 2x2 grid (2 columns x 2 rows)
  const displaySectors = React.useMemo(() => {
    const list = [...categories];
    const hasAll = list.some(c => c.id === 'all');
    if (!hasAll) {
      list.push({
        id: 'all',
        name: 'All Accessories',
        slug: 'all',
        tagline: 'Complete 23 Specs Inventory',
        description: 'Forged alloys, laser optics, Android screens, custom upholstery, and detailing armor for all car models.',
        image: '/images/hero-drift.jpg',
        itemCount: 23,
        mainType: 'accessories',
        subcategories: [
          { id: 'interior', name: 'Interior', count: 11 },
          { id: 'exterior', name: 'Exterior', count: 8 },
          { id: 'car-care', name: 'Car Care', count: 4 },
        ]
      });
    }
    return list;
  }, [categories]);

  return (
    <section
      id="category-section"
      className="py-8 sm:py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-opacity duration-700"
    >
      <div id="category-rack" className="sr-only" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-10 border-b border-slate-800 pb-4 sm:pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="font-label text-emerald-400 text-xs font-bold tracking-wider uppercase">
              Specialized Divisions
            </span>
            <span className="mx-2 text-slate-700 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label text-xs bg-slate-900 border border-slate-700/80 text-slate-300">
              Verified Fitments
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wide">
            Automotive <span className="text-emerald-400">Display Rack</span>
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-xs sm:text-sm text-slate-400 max-w-md font-body leading-relaxed">
          Select an accessory sector below to explore interior cockpits, exterior aerodynamics, detailing chemistry, or full inventory.
        </p>
      </div>

      {/* ========================================================
          AUTOMOTIVE DISPLAY RACK: 2x2 GRID LAYOUT ON MOBILE VIEW
          (grid-cols-2 on mobile = 2 columns x 2 rows = 2x2 grid!)
          (md:grid-cols-2 lg:grid-cols-4 on larger displays)
         ======================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
        {displaySectors.map((cat, index) => {
          return (
            <div
              key={cat.id}
              onClick={() => handleCardClick(cat.id)}
              className="group relative bg-[#0c1310] rounded-xl sm:rounded-2xl border border-slate-800 hover:border-emerald-500/70 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-black/80 cursor-pointer"
            >
              {/* Dedicated Visual Showcase Container */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] bg-black/80 flex items-center justify-center overflow-hidden border-b border-slate-800/80">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover p-0 transition-transform duration-500 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1310] via-black/25 to-transparent opacity-85" />

                {/* Sector Badge Overlay */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="font-mono-code text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 bg-black/80 border border-slate-700 text-slate-200 rounded backdrop-blur-xs font-bold tracking-wider">
                    SECTOR 0{index + 1}
                  </span>
                </div>

                {/* Specs Badge Overlay */}
                <div className="absolute top-2 right-2 z-10">
                  <span className="font-mono-code text-[8px] sm:text-[9px] text-emerald-400 bg-emerald-950/90 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-800/80 backdrop-blur-xs font-bold">
                    {cat.itemCount} SPECS
                  </span>
                </div>
              </div>

              {/* Content & Action Area (Responsive for 2x2 mobile layout) */}
              <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between gap-1.5 sm:gap-2">
                <div>
                  <p className="font-label text-[8px] sm:text-[9px] text-emerald-400 font-bold tracking-wider uppercase truncate">
                    {cat.tagline}
                  </p>
                  <h3 className="font-heading text-xs sm:text-base lg:text-lg text-white tracking-wide group-hover:text-emerald-400 transition-colors uppercase line-clamp-1 leading-tight font-bold">
                    {cat.name}
                  </h3>
                  
                  {/* Description hidden on mobile to maintain clean 2x2 grid tile proportion */}
                  <p className="hidden sm:block mt-1 text-[11px] text-slate-400 line-clamp-2 font-body leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Subcategories tags shown on desktop/tablet */}
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <div className="hidden sm:flex mt-3 pt-2.5 border-t border-slate-800/80 flex-wrap gap-1">
                      {cat.subcategories.slice(0, 3).map(sub => (
                        <span
                          key={sub.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(cat.id, sub.id);
                          }}
                          className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500 hover:bg-emerald-950/60 transition-colors"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-1 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="font-button text-[10px] sm:text-xs uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1 font-bold">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 transform transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[8px] sm:text-[10px] font-label text-slate-500 hidden sm:inline">
                    Kumbakonam Fitment
                  </span>
                </div>
              </div>

              {/* Accent hover rim */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 group-hover:w-full transition-all duration-500 ease-in-out" />
            </div>
          );
        })}
      </div>
    </section>
  );
};
