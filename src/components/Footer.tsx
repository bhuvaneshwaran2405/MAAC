import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Check, MapPin, PhoneCall, MessageSquare } from 'lucide-react';
import { Category } from '../types.ts';
import { WORKSHOP_DETAILS } from '../data/catalog.ts';

interface FooterProps {
  categories: Category[];
  onSelectCategory: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ categories, onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#070b09] border-t border-slate-800 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Philosophy & Real Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-white rounded-lg border border-slate-700 shadow-md flex items-center justify-center">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-title text-2xl text-white tracking-wider">MAAC</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <span className="font-label text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                  Wheels & Accessories
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 font-body leading-relaxed max-w-md">
              Your premier destination for high-performance automotive wheels, custom fitments,
              laser optics, cockpit electronics, and aerodynamic styling in Kumbakonam, Tamil Nadu.
            </p>

            <div className="flex items-center gap-2 pt-1 text-slate-300 text-xs font-body">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Authentic Performance & Bolt-On Fitment Assurance</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-subheading text-sm text-white mb-3.5 uppercase tracking-wider font-bold">
              Accessory Divisions
            </h4>
            <ul className="space-y-2 text-xs font-body text-slate-400">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      const el = document.getElementById('product-catalog');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    const el = document.getElementById('product-catalog');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left text-slate-300 font-semibold"
                >
                  View All Products (23)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Workshop Garage */}
          <div>
            <h4 className="font-subheading text-sm text-white mb-3.5 font-bold uppercase tracking-wider">
              Workshop Facility
            </h4>
            <div className="space-y-2.5 text-xs font-body text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <a
                  href={WORKSHOP_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {WORKSHOP_DETAILS.address}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {WORKSHOP_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp Fitment Hotline</span>
              </div>
            </div>
          </div>

          {/* Col 4: Performance Newsletter */}
          <div>
            <h4 className="font-subheading text-sm text-white mb-3.5 font-bold uppercase tracking-wider">
              Fitment Updates
            </h4>
            <p className="text-xs text-slate-400 font-body mb-3">
              Subscribe for new forged arrivals, laser headlight retrofits, and garage build releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-body"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-mono-code flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Subscribed to MAAC Updates!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-slate-500">
          <p>© {new Date().getFullYear()} MAAC Wheels & Accessories. Precision engineered in Kumbakonam, TN.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Green / Ash / Red Performance Spec</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">Universal Car Fitment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
