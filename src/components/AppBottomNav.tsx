import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Layers, 
  ShoppingBag, 
  MapPin, 
  MessageSquare 
} from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/catalog.ts';

interface AppBottomNavProps {
  activeTab?: string;
  onSelectCategory?: (id: string) => void;
}

export const AppBottomNav: React.FC<AppBottomNavProps> = ({ onSelectCategory }) => {
  const [activeItem, setActiveItem] = useState<'home' | 'rack' | 'catalog' | 'workshop'>('home');

  // Monitor scroll position to update active bottom nav tab
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const contactEl = document.getElementById('contact-section');
      const catalogEl = document.getElementById('product-catalog');
      const rackEl = document.getElementById('category-section');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveItem('workshop');
      } else if (catalogEl && scrollPos >= catalogEl.offsetTop) {
        setActiveItem('catalog');
      } else if (rackEl && scrollPos >= rackEl.offsetTop) {
        setActiveItem('rack');
      } else {
        setActiveItem('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string, item: 'home' | 'rack' | 'catalog' | 'workshop') => {
    setActiveItem(item);
    if (item === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openWhatsApp = () => {
    const defaultMessage = encodeURIComponent(
      "Hello MAAC Wheels & Accessories Kumbakonam team, I would like to consult on parts & fitment for my car."
    );
    window.open(`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${defaultMessage}`, '_blank');
  };

  return (
    <nav 
      aria-label="Mobile App Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0a0f0d]/95 backdrop-blur-xl border-t border-slate-800/90 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] pb-safe"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1 sm:px-4 max-w-lg mx-auto">
        {/* 1. Home */}
        <button
          onClick={() => scrollTo('root', 'home')}
          className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeItem === 'home'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Home className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            {activeItem === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] font-label uppercase tracking-wider">Home</span>
        </button>

        {/* 2. Display Rack */}
        <button
          onClick={() => scrollTo('category-section', 'rack')}
          className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeItem === 'rack'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Layers className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            {activeItem === 'rack' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] font-label uppercase tracking-wider">Rack</span>
        </button>

        {/* 3. Catalog & Scrolling Shelf */}
        <button
          onClick={() => {
            scrollTo('product-catalog', 'catalog');
            if (onSelectCategory) onSelectCategory('all');
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeItem === 'catalog'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            {activeItem === 'catalog' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] font-label uppercase tracking-wider">Parts</span>
        </button>

        {/* 4. Kumbakonam Workshop Desk */}
        <button
          onClick={() => scrollTo('contact-section', 'workshop')}
          className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all cursor-pointer ${
            activeItem === 'workshop'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <MapPin className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            {activeItem === 'workshop' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] font-label uppercase tracking-wider">Workshop</span>
        </button>

        {/* 5. Direct WhatsApp Chat */}
        <button
          onClick={openWhatsApp}
          className="flex flex-col items-center justify-center gap-1 py-1 text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer"
        >
          <div className="relative p-1.5 bg-emerald-600/30 rounded-xl border border-emerald-500/40">
            <MessageSquare className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-label uppercase tracking-wider text-emerald-300 font-bold">Chat</span>
        </button>
      </div>
    </nav>
  );
};
