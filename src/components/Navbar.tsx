import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  PhoneCall,
  MapPin,
  MessageSquare,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Category } from '../types.ts';
import { WORKSHOP_DETAILS } from '../data/catalog.ts';

interface NavbarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string, subCategory?: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessoriesMenuOpen, setAccessoriesMenuOpen] = useState(false);
  const [mobileAccessoriesOpen, setMobileAccessoriesOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAccessoriesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleCategoryClick = (categoryId: string, subCategory?: string) => {
    onSelectCategory(categoryId, subCategory);
    setMobileMenuOpen(false);
    setAccessoriesMenuOpen(false);
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setAccessoriesMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const interiorCat = categories.find(c => c.id === 'interior');
  const exteriorCat = categories.find(c => c.id === 'exterior');

  const isAccessoriesActive = selectedCategory === 'accessories' || selectedCategory === 'interior' || selectedCategory === 'exterior';

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0a0f0d]/95 backdrop-blur-md border-b border-slate-800/90 shadow-xl shadow-black/50">
        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 relative">
          {/* Brand Logo & Title */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => {
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer focus:outline-none"
              title="MAAC Wheels & Accessories Kumbakonam"
            >
              <div className="relative p-1 bg-white rounded-lg border border-slate-700/80 shadow-md group-hover:border-emerald-500 transition-colors flex items-center justify-center">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Wheels & Accessories Logo"
                  className="h-8 sm:h-11 w-auto object-contain"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="font-title text-xl sm:text-2xl lg:text-3xl text-white tracking-wider font-extrabold group-hover:text-emerald-400 transition-colors leading-none">
                    MAAC
                  </span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                </div>
                <p className="font-button text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-widest text-slate-400 font-semibold leading-tight mt-0.5">
                  WHEELS & ACCESSORIES
                </p>
              </div>
            </button>
          </div>

          {/* ========================================================
              DESKTOP & TABLET INLINE NAVBAR (md:flex)
              1. All Category Accessories
              2. Accessories (Dropdown)
              3. Car Care
              4. Contact Us
             ======================================================== */}
          <nav 
            ref={dropdownRef}
            className="hidden md:flex items-center gap-1 lg:gap-2.5" 
            aria-label="Main navigation"
          >
            {/* 1. All Category Accessories */}
            <button
              onClick={() => handleCategoryClick('all')}
              className={`px-2.5 lg:px-3.5 py-1.5 lg:py-2 rounded-lg text-[11px] lg:text-xs font-button uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/70 shadow-sm shadow-emerald-950/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              All Category Accessories
            </button>

            {/* 2. Accessories (Dropdown with Interior & Exterior) */}
            <div className="relative">
              <button
                onClick={() => setAccessoriesMenuOpen(!accessoriesMenuOpen)}
                className={`px-2.5 lg:px-3.5 py-1.5 lg:py-2 rounded-lg text-[11px] lg:text-xs font-button uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isAccessoriesActive
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/70 shadow-sm shadow-emerald-950/60'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <span>Accessories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${accessoriesMenuOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
              </button>

              {/* Dropdown Menu showing Interior and Exterior Subcategories */}
              {accessoriesMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-[460px] lg:w-[520px] bg-[#0c1410] border border-slate-700/80 rounded-xl p-3.5 lg:p-4 shadow-2xl shadow-black/90 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    {/* INTERIOR SUBCATEGORY COLUMN */}
                    <div className="bg-[#111c16]/80 p-3 rounded-lg border border-slate-800 hover:border-emerald-600/50 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <h4 className="font-heading text-sm lg:text-base text-white uppercase tracking-wide">
                              Interior Items
                            </h4>
                          </div>
                          <span className="text-[9px] font-mono-code bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800/60">
                            {interiorCat?.itemCount || 11}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-body mb-2 leading-relaxed">
                          Cockpit styling, luxury bolsters, QLED displays.
                        </p>

                        <ul className="space-y-1">
                          {interiorCat?.subcategories?.map(sub => (
                            <li key={sub.id}>
                              <button
                                onClick={() => handleCategoryClick('interior', sub.id)}
                                className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-300 hover:text-white hover:bg-emerald-900/30 flex items-center justify-between group transition-colors cursor-pointer"
                              >
                                <span className="truncate">{sub.name}</span>
                                <span className="text-[9px] font-mono-code text-slate-500 group-hover:text-emerald-400 shrink-0 ml-1">
                                  {sub.count}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => handleCategoryClick('interior')}
                        className="mt-2.5 pt-2 border-t border-slate-800/80 w-full text-left text-[11px] font-button text-emerald-400 hover:text-emerald-300 flex items-center justify-between cursor-pointer"
                      >
                        <span>Explore Interior</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* EXTERIOR SUBCATEGORY COLUMN */}
                    <div className="bg-[#111c16]/80 p-3 rounded-lg border border-slate-800 hover:border-emerald-600/50 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <h4 className="font-heading text-sm lg:text-base text-white uppercase tracking-wide">
                              Exterior Items
                            </h4>
                          </div>
                          <span className="text-[9px] font-mono-code bg-red-950/80 text-red-400 px-1.5 py-0.5 rounded border border-red-800/60">
                            {exteriorCat?.itemCount || 8}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-body mb-2 leading-relaxed">
                          Bi-LED optics, downforce aerodynamics & wings.
                        </p>

                        <ul className="space-y-1">
                          {exteriorCat?.subcategories?.map(sub => (
                            <li key={sub.id}>
                              <button
                                onClick={() => handleCategoryClick('exterior', sub.id)}
                                className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-300 hover:text-white hover:bg-red-950/30 flex items-center justify-between group transition-colors cursor-pointer"
                              >
                                <span className="truncate">{sub.name}</span>
                                <span className="text-[9px] font-mono-code text-slate-500 group-hover:text-red-400 shrink-0 ml-1">
                                  {sub.count}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => handleCategoryClick('exterior')}
                        className="mt-2.5 pt-2 border-t border-slate-800/80 w-full text-left text-[11px] font-button text-red-400 hover:text-red-300 flex items-center justify-between cursor-pointer"
                      >
                        <span>Explore Exterior</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Car Care */}
            <button
              onClick={() => handleCategoryClick('car-care')}
              className={`px-2.5 lg:px-3.5 py-1.5 lg:py-2 rounded-lg text-[11px] lg:text-xs font-button uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'car-care'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600/70 shadow-sm shadow-emerald-950/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              Car Care
            </button>

            {/* 4. Contact Us */}
            <button
              onClick={() => scrollToSection('contact-section')}
              className="px-2.5 lg:px-3.5 py-1.5 lg:py-2 rounded-lg text-[11px] lg:text-xs font-button uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent transition-all cursor-pointer whitespace-nowrap"
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action: Browse Catalog on Desktop/Tablet, Hamburger on Mobile */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Hidden on mobile, shown on md+ screens */}
            <button
              onClick={() => scrollToSection('product-catalog')}
              className="hidden md:inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg text-[11px] sm:text-xs font-button uppercase tracking-wider transition-all shadow-md shadow-emerald-950/60 cursor-pointer"
              title="Browse Automotive Catalog"
            >
              <span>Browse Catalog</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-slate-200 hover:text-white bg-slate-900 active:bg-slate-800 rounded-xl border border-slate-700 transition-colors cursor-pointer"
              title="Open Navigation Menu"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-emerald-400" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          FULL-SCREEN MOBILE MENU PORTAL
          Rendered directly at document.body with z-[9999] so NOTHING
          in the HeroSection, video, or main can EVER overlay it!
         ======================================================== */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div 
          id="mobile-navigation-modal"
          className="fixed inset-0 z-[9999] bg-[#080d0a] text-slate-100 flex flex-col overflow-hidden animate-in fade-in duration-150"
        >
          {/* Mobile Menu Top Header Bar */}
          <div className="h-16 px-4 bg-[#0a0f0d] border-b border-slate-800 flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center gap-2.5">
              <div className="p-1 bg-white rounded-lg border border-slate-700 flex items-center justify-center">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-title text-xl text-white font-extrabold tracking-wider">MAAC</span>
                <p className="font-button text-[8px] uppercase tracking-widest text-slate-400 font-semibold leading-none mt-0.5">
                  WHEELS & ACCESSORIES
                </p>
              </div>
            </div>

            {/* Prominent Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-slate-200 hover:text-white bg-slate-900 active:bg-slate-800 rounded-xl border border-slate-700 transition-colors cursor-pointer"
              title="Close Navigation Menu"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 text-red-500" />
            </button>
          </div>

          {/* Full Scrollable Menu Content */}
          <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-3">
            {/* Workshop Location Badge */}
            <div className="p-3 bg-[#111a15] rounded-xl border border-slate-800 flex items-center justify-between shadow-sm">
              <div>
                <p className="font-heading text-base text-white leading-tight">MAAC WHEELS & ACCESSORIES</p>
                <p className="text-[10px] text-emerald-400 font-mono-code">Kumbakonam • NH 36 Bypass</p>
              </div>
              <span className="text-[9px] font-mono-code bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/80 uppercase font-bold">
                Workshop Ready
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              <p className="text-[10px] font-mono-code text-slate-400 uppercase tracking-widest px-1 font-semibold">
                Navigation Menu:
              </p>

              {/* 1. All Category Accessories */}
              <button
                onClick={() => handleCategoryClick('all')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-button uppercase tracking-wider flex items-center justify-between border transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md font-bold'
                    : 'bg-slate-900/90 text-slate-200 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>All Category Accessories</span>
                </span>
                <span className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-black/40 text-emerald-300">
                  23 Parts
                </span>
              </button>

              {/* 2. Accessories & Subcategories */}
              <div className="p-3 bg-[#111c16] rounded-xl border border-emerald-900/50 space-y-2.5">
                <div 
                  onClick={() => setMobileAccessoriesOpen(!mobileAccessoriesOpen)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-heading text-sm text-white uppercase tracking-wide">
                      Accessories
                    </span>
                    <span className="text-[10px] font-mono-code text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800/80">
                      19 Specs
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileAccessoriesOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                </div>

                {mobileAccessoriesOpen && (
                  <div className="space-y-2.5 pt-1 border-t border-slate-800/80">
                    {/* Interior Accessories */}
                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <button
                          onClick={() => handleCategoryClick('interior')}
                          className="text-xs font-button text-emerald-400 hover:text-emerald-300 uppercase font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <span>Interior Accessories</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                        <span className="text-[9px] font-mono-code text-slate-500">11 Specs</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {interiorCat?.subcategories?.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => handleCategoryClick('interior', sub.id)}
                            className="text-left px-2 py-1.5 rounded text-[11px] text-slate-300 hover:text-white bg-slate-900/90 hover:bg-emerald-950/60 truncate cursor-pointer border border-slate-800/60"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Exterior Accessories */}
                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <button
                          onClick={() => handleCategoryClick('exterior')}
                          className="text-xs font-button text-red-400 hover:text-red-300 uppercase font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <span>Exterior Accessories</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                        <span className="text-[9px] font-mono-code text-slate-500">8 Specs</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {exteriorCat?.subcategories?.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => handleCategoryClick('exterior', sub.id)}
                            className="text-left px-2 py-1.5 rounded text-[11px] text-slate-300 hover:text-white bg-slate-900/90 hover:bg-red-950/60 truncate cursor-pointer border border-slate-800/60"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Car Care */}
              <button
                onClick={() => handleCategoryClick('car-care')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-button uppercase tracking-wider flex items-center justify-between border transition-all cursor-pointer ${
                  selectedCategory === 'car-care'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md font-bold'
                    : 'bg-slate-900/90 text-slate-200 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Car Care</span>
                </span>
                <span className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-black/40 text-emerald-300">
                  4 Items
                </span>
              </button>

              {/* 4. Contact Us */}
              <button
                onClick={() => scrollToSection('contact-section')}
                className="w-full text-left px-4 py-3 rounded-xl text-xs font-button uppercase tracking-wider flex items-center justify-between border bg-slate-900/90 text-slate-200 border-slate-800 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Contact Us</span>
                </span>
                <span className="font-mono-code text-[10px] text-emerald-400">
                  NH 36 Bypass
                </span>
              </button>

              {/* 5. Direct Jump to Catalog */}
              <button
                onClick={() => scrollToSection('product-catalog')}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-button uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/60 cursor-pointer font-bold mt-2"
              >
                <span>Browse Complete Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Action Contact Links */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${WORKSHOP_DETAILS.phone}`}
                  className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white rounded-xl text-xs font-button uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Workshop</span>
                </a>

                <a
                  href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent("Hello MAAC Wheels Kumbakonam, I would like to consult on accessories.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-button uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/60"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
