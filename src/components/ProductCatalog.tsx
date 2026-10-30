import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ArrowUpDown, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Columns, 
  Filter, 
  Sparkles,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { Product, Category } from '../types.ts';
import { ProductCard } from './ProductCard.tsx';

interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string, subCategory?: string) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
  onQuickView: (product: Product) => void;
  isLocked?: boolean;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  onQuickView,
  isLocked = false,
}) => {
  // Primary options: 'all' | 'interior-exterior' | 'car-care'
  const [mainOption, setMainOption] = useState<'all' | 'interior-exterior' | 'car-care'>('all');
  // Secondary sub-tab when 'interior-exterior' is active: 'both' | 'interior' | 'exterior'
  const [accessoryTab, setAccessoryTab] = useState<'both' | 'interior' | 'exterior'>('both');
  // Specific subcategory filter
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  
  const [inStockOnly, setInStockOnly] = useState(false);
  const [specFilter, setSpecFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  
  // View mode: 'rack' (horizontal scrolling shelf with active scroll tool) vs 'grid' (compact grid)
  const [viewMode, setViewMode] = useState<'rack' | 'grid'>('rack');

  // Carousel scroll state and progress tracking
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentVisibleItem, setCurrentVisibleItem] = useState(1);

  // Sync external selectedCategory if triggered from Navbar or CategoryGrid
  useEffect(() => {
    if (selectedCategory === 'all') {
      setMainOption('all');
      setActiveSubCategory('all');
    } else if (selectedCategory === 'car-care') {
      setMainOption('car-care');
      setActiveSubCategory('all');
    } else if (selectedCategory === 'interior') {
      setMainOption('interior-exterior');
      setAccessoryTab('interior');
      setActiveSubCategory('all');
    } else if (selectedCategory === 'exterior') {
      setMainOption('interior-exterior');
      setAccessoryTab('exterior');
      setActiveSubCategory('all');
    } else if (selectedCategory === 'accessories') {
      setMainOption('interior-exterior');
      setAccessoryTab('both');
      setActiveSubCategory('all');
    }
  }, [selectedCategory]);

  // Filter products strictly based on active category and subcategory
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Primary category filtering: All Category vs Interior and Exterior vs Car Care
    if (mainOption === 'car-care') {
      list = list.filter(p => p.mainCategory === 'car-care');
    } else if (mainOption === 'interior-exterior') {
      if (accessoryTab === 'interior') {
        list = list.filter(p => p.mainCategory === 'interior');
      } else if (accessoryTab === 'exterior') {
        list = list.filter(p => p.mainCategory === 'exterior');
      } else {
        list = list.filter(p => p.mainCategory === 'interior' || p.mainCategory === 'exterior');
      }
    }

    // Subcategory specific filter
    if (activeSubCategory !== 'all') {
      list = list.filter(p => p.subCategory === activeSubCategory);
    }

    // Spec filter
    if (specFilter === 'featured') {
      list = list.filter(p => p.featured);
    } else if (specFilter === 'motorsport') {
      list = list.filter(p => p.badge?.includes('SPEC') || p.badge?.includes('MOTORSPORT') || p.badge?.includes('FLAGSHIP') || p.badge?.includes('TRACK'));
    }

    // In stock filter
    if (inStockOnly) {
      list = list.filter(p => p.stock > 0);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, mainOption, accessoryTab, activeSubCategory, specFilter, inStockOnly, sortBy]);

  // Update carousel scroll state & calculate progress percentage
  const updateScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const pct = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
      setScrollProgress(pct);

      // Estimate current item index
      const itemWidth = 260;
      const index = Math.min(filteredProducts.length, Math.max(1, Math.round(scrollLeft / itemWidth) + 1));
      setCurrentVisibleItem(index);
    } else {
      setScrollProgress(0);
      setCurrentVisibleItem(1);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [filteredProducts, viewMode]);

  // Scroll tool action: smooth scroll by card width or viewport
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const clientWidth = carouselRef.current.clientWidth;
    const scrollAmount = direction === 'left' 
      ? -Math.max(240, clientWidth * 0.75) 
      : Math.max(240, clientWidth * 0.75);
    
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      id="product-catalog"
      className={`py-8 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-700 ${
        isLocked
          ? 'opacity-35 pointer-events-none select-none filter grayscale-[30%]'
          : 'opacity-100 pointer-events-auto filter-none'
      }`}
    >
      {/* Catalog Title & Header */}
      <div className="mb-5 sm:mb-7 border-b border-slate-800 pb-4 sm:pb-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="font-label text-xs text-emerald-400 font-bold tracking-wider uppercase">
                Kumbakonam Automotive Inventory
              </span>
              <span className="text-slate-700">•</span>
              <span className="font-label text-xs text-slate-400 uppercase">
                Genuine Fitments
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wide">
              Verified <span className="text-emerald-400">Parts</span> & <span className="text-slate-300">Catalog</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-body max-w-2xl leading-relaxed">
              Explore reduced-footprint cards with horizontal scroll rack or compact grid views across All Categories, Accessories, and Car Care.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="font-label text-xs text-slate-300 bg-slate-900 px-3.5 py-1.5 rounded-lg border border-slate-800 shadow-xs">
              Showing <strong className="text-emerald-400 font-bold">{filteredProducts.length}</strong> Products
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          THREE CORE CATEGORY OPTIONS
          1. All Category
          2. Interior and Exterior
          3. Car Care
         ======================================================== */}
      <div className="mb-5 p-2 sm:p-2.5 bg-[#0c1310] border border-slate-800 rounded-xl sm:rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* OPTION 1: ALL CATEGORY */}
          <button
            onClick={() => {
              setMainOption('all');
              setActiveSubCategory('all');
              onSelectCategory('all');
            }}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mainOption === 'all'
                ? 'bg-emerald-600 text-white font-button uppercase shadow-md shadow-emerald-950/80 border border-emerald-500'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-button uppercase border border-slate-800 hover:text-white'
            }`}
          >
            <span className="text-xs sm:text-sm tracking-wider font-bold">All Category</span>
            <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full ${
              mainOption === 'all' ? 'bg-emerald-800 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {products.length}
            </span>
          </button>

          {/* OPTION 2: INTERIOR AND EXTERIOR */}
          <button
            onClick={() => {
              setMainOption('interior-exterior');
              setActiveSubCategory('all');
              onSelectCategory('accessories');
            }}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mainOption === 'interior-exterior'
                ? 'bg-emerald-600 text-white font-button uppercase shadow-md shadow-emerald-950/80 border border-emerald-500'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-button uppercase border border-slate-800 hover:text-white'
            }`}
          >
            <span className="text-xs sm:text-sm tracking-wider font-bold">Interior & Exterior</span>
            <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full ${
              mainOption === 'interior-exterior' ? 'bg-emerald-800 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {products.filter(p => p.mainCategory === 'interior' || p.mainCategory === 'exterior').length}
            </span>
          </button>

          {/* OPTION 3: CAR CARE */}
          <button
            onClick={() => {
              setMainOption('car-care');
              setActiveSubCategory('all');
              onSelectCategory('car-care');
            }}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mainOption === 'car-care'
                ? 'bg-emerald-600 text-white font-button uppercase shadow-md shadow-emerald-950/80 border border-emerald-500'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-button uppercase border border-slate-800 hover:text-white'
            }`}
          >
            <span className="text-xs sm:text-sm tracking-wider font-bold">Car Care</span>
            <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full ${
              mainOption === 'car-care' ? 'bg-emerald-800 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {products.filter(p => p.mainCategory === 'car-care').length}
            </span>
          </button>
        </div>

        {/* SUBCATEGORY CONTROLS UNDER 'INTERIOR AND EXTERIOR' */}
        {mainOption === 'interior-exterior' && (
          <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1">
              <span className="font-label text-[10px] text-slate-400 uppercase tracking-wider shrink-0 mr-1 font-semibold">
                Sector:
              </span>
              <button
                onClick={() => {
                  setAccessoryTab('both');
                  setActiveSubCategory('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-button uppercase tracking-wider transition-all cursor-pointer ${
                  accessoryTab === 'both'
                    ? 'bg-emerald-500 text-white border border-emerald-400 shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                All Accessories ({products.filter(p => p.mainCategory === 'interior' || p.mainCategory === 'exterior').length})
              </button>
              <button
                onClick={() => {
                  setAccessoryTab('interior');
                  setActiveSubCategory('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-button uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  accessoryTab === 'interior'
                    ? 'bg-emerald-500 text-white border border-emerald-400 shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Interior ({products.filter(p => p.mainCategory === 'interior').length})</span>
              </button>
              <button
                onClick={() => {
                  setAccessoryTab('exterior');
                  setActiveSubCategory('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-button uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  accessoryTab === 'exterior'
                    ? 'bg-red-600 text-white border border-red-500 shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span>Exterior ({products.filter(p => p.mainCategory === 'exterior').length})</span>
              </button>
            </div>
          </div>
        )}

        {/* DYNAMIC SUB-FILTERS FOR INTERIOR */}
        {mainOption === 'interior-exterior' && accessoryTab === 'interior' && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none px-1">
            <span className="font-label text-[10px] text-emerald-400 uppercase tracking-widest shrink-0 font-bold">
              Filters:
            </span>
            <button
              onClick={() => setActiveSubCategory('all')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'all'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              All Interior ({products.filter(p => p.mainCategory === 'interior').length})
            </button>
            <button
              onClick={() => setActiveSubCategory('seat-covers')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'seat-covers'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Seat Covers (3)
            </button>
            <button
              onClick={() => setActiveSubCategory('android-screens')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'android-screens'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Android Screens (3)
            </button>
            <button
              onClick={() => setActiveSubCategory('interior-trim')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'interior-trim'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Steering & Controls (3)
            </button>
            <button
              onClick={() => setActiveSubCategory('ambient-lighting')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'ambient-lighting'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Ambient Lighting (2)
            </button>
          </div>
        )}

        {/* DYNAMIC SUB-FILTERS FOR EXTERIOR */}
        {mainOption === 'interior-exterior' && accessoryTab === 'exterior' && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none px-1">
            <span className="font-label text-[10px] text-red-400 uppercase tracking-widest shrink-0 font-bold">
              Filters:
            </span>
            <button
              onClick={() => setActiveSubCategory('all')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'all'
                  ? 'bg-red-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              All Exterior ({products.filter(p => p.mainCategory === 'exterior').length})
            </button>
            <button
              onClick={() => setActiveSubCategory('lighting')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'lighting'
                  ? 'bg-red-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Bi-LED Optics (4)
            </button>
            <button
              onClick={() => setActiveSubCategory('aero-kits')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'aero-kits'
                  ? 'bg-red-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Carbon Splitters (2)
            </button>
            <button
              onClick={() => setActiveSubCategory('spoilers')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'spoilers'
                  ? 'bg-red-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              GT3 Spoilers (1)
            </button>
            <button
              onClick={() => setActiveSubCategory('wheels')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'wheels'
                  ? 'bg-red-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Forged Alloys (1)
            </button>
          </div>
        )}

        {/* DYNAMIC SUB-FILTERS FOR CAR CARE */}
        {mainOption === 'car-care' && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none px-1">
            <span className="font-label text-[10px] text-emerald-400 uppercase tracking-widest shrink-0 font-bold">
              Filters:
            </span>
            <button
              onClick={() => setActiveSubCategory('all')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'all'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              All Car Care (4)
            </button>
            <button
              onClick={() => setActiveSubCategory('ceramic')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'ceramic'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Ceramic & Graphene (1)
            </button>
            <button
              onClick={() => setActiveSubCategory('cleaners')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'cleaners'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Iron & Wheel Cleaners (1)
            </button>
            <button
              onClick={() => setActiveSubCategory('wash-towels')}
              className={`px-2.5 py-1 rounded text-xs font-label uppercase transition-all cursor-pointer ${
                activeSubCategory === 'wash-towels'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Citrus Foam & Towels (2)
            </button>
          </div>
        )}
      </div>

      {/* ========================================================
          SCROLL TOOL & CONTROLS TOOLBAR
          Contains the scrolling tool, layout switcher, in-stock toggle, and spec filter
         ======================================================== */}
      <div className="mb-4 sm:mb-6 p-2.5 sm:p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl sm:rounded-2xl flex flex-wrap items-center justify-between gap-2.5 text-xs shadow-md">
        {/* Left Side: Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* In-Stock Toggle */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg font-button uppercase tracking-wider border transition-all cursor-pointer text-[11px] sm:text-xs ${
              inStockOnly
                ? 'bg-emerald-950 border-emerald-600 text-emerald-400'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs border flex items-center justify-center ${
                inStockOnly ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-700'
              }`}
            >
              {inStockOnly && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>IN STOCK ONLY</span>
          </button>

          {/* Spec Tier Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-slate-300">
            <Filter className="w-3 h-3 text-slate-500" />
            <select
              value={specFilter}
              onChange={e => setSpecFilter(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-[10px] sm:text-xs font-label uppercase"
            >
              <option value="all" className="bg-slate-900 text-white">ALL GRADES</option>
              <option value="featured" className="bg-slate-900 text-white">FEATURED APEX</option>
              <option value="motorsport" className="bg-slate-900 text-white">MOTORSPORT SPEC</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-slate-300">
            <ArrowUpDown className="w-3 h-3 text-slate-500" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-[10px] sm:text-xs font-label uppercase"
            >
              <option value="featured" className="bg-slate-900 text-white">FEATURED</option>
              <option value="price-asc" className="bg-slate-900 text-white">PRICE: LOW-HIGH</option>
              <option value="price-desc" className="bg-slate-900 text-white">PRICE: HIGH-LOW</option>
              <option value="rating" className="bg-slate-900 text-white">TOP RATED</option>
            </select>
          </div>
        </div>

        {/* Right Side: THE DEDICATED PRODUCT SCROLLING TOOL & VIEW SWITCHER */}
        <div className="flex items-center gap-2 self-end sm:self-auto ml-auto">
          {/* View Mode Switcher: Scroll Rack vs Compact Grid */}
          <div className="flex items-center bg-slate-950 border border-slate-800 p-0.5 rounded-lg">
            <button
              onClick={() => setViewMode('rack')}
              className={`px-2.5 py-1 rounded text-[11px] font-label transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'rack'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Horizontal Scroll Rack"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Scroll Rack</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded text-[11px] font-label transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'grid'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Compact Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>

          {/* Dedicated Scrolling Tool: Prev/Next Buttons & Item Counter */}
          {viewMode === 'rack' && (
            <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2">
              <span className="text-[10px] font-mono-code text-slate-400 hidden sm:inline tabular-nums">
                {currentVisibleItem}/{filteredProducts.length}
              </span>
              
              <button
                onClick={() => scrollCarousel('left')}
                disabled={!canScrollLeft}
                className={`p-1.5 sm:p-2 rounded-lg border transition-all ${
                  canScrollLeft 
                    ? 'bg-slate-900 text-white border-slate-700 hover:bg-emerald-600 hover:border-emerald-500 cursor-pointer shadow-sm' 
                    : 'bg-slate-950/60 text-slate-700 border-slate-800/80 cursor-not-allowed'
                }`}
                title="Scroll rack left"
                aria-label="Scroll products left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollCarousel('right')}
                disabled={!canScrollRight}
                className={`p-1.5 sm:p-2 rounded-lg border transition-all ${
                  canScrollRight 
                    ? 'bg-slate-900 text-white border-slate-700 hover:bg-emerald-600 hover:border-emerald-500 cursor-pointer shadow-sm' 
                    : 'bg-slate-950/60 text-slate-700 border-slate-800/80 cursor-not-allowed'
                }`}
                title="Scroll rack right"
                aria-label="Scroll products right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Rack Scroll Progress Track (Only in Rack View) */}
      {viewMode === 'rack' && filteredProducts.length > 0 && (
        <div className="mb-3 px-1 flex items-center gap-3">
          <div className="flex-1 h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-150"
              style={{ width: `${Math.max(12, scrollProgress)}%` }}
            />
          </div>
          <span className="text-[9px] font-mono-code text-emerald-400/80 uppercase tracking-widest shrink-0">
            Swipe or use arrows to scroll
          </span>
        </div>
      )}

      {/* ========================================================
          PRODUCTS DISPLAY: SCROLL RACK OR COMPACT GRID
         ======================================================== */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 sm:py-16 text-center bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <p className="font-heading text-lg sm:text-xl text-white mb-2">No items match current filters</p>
          <p className="text-xs text-slate-400 font-body mb-4">
            Try resetting your subcategory or stock filter to view all accessories.
          </p>
          <button
            onClick={() => {
              setMainOption('all');
              setActiveSubCategory('all');
              setInStockOnly(false);
              setSpecFilter('all');
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-button uppercase tracking-wider cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'rack' ? (
        /* HORIZONTAL SCROLL RACK WITH REDUCED-FOOTPRINT COMPACT CARDS */
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex items-stretch overflow-x-auto gap-3 sm:gap-4 pb-4 pt-1 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent focus:outline-none"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') scrollCarousel('left');
              if (e.key === 'ArrowRight') scrollCarousel('right');
            }}
          >
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="w-[200px] sm:w-[240px] md:w-[260px] shrink-0 snap-start"
              >
                <ProductCard
                  product={product}
                  onQuickView={onQuickView}
                  compact
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* COMPACT RESPONSIVE GRID (2 cols on mobile, 3 on tablet, 4 on desktop) */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              compact
            />
          ))}
        </div>
      )}
    </section>
  );
};
