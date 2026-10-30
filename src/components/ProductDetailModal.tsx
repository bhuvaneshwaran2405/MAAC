import React, { useState } from 'react';
import { X, Star, ShieldCheck, MessageSquare, PhoneCall, Check, Car } from 'lucide-react';
import { Product } from '../types.ts';
import { getProductWhatsAppUrl, WORKSHOP_DETAILS } from '../data/catalog.ts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [vehicleInfo, setVehicleInfo] = useState('');

  if (!product) return null;

  const whatsappUrl = getProductWhatsAppUrl(product, vehicleInfo);

  const isRedBadge = product.badge?.includes('F1') || 
                     product.badge?.includes('SPEC') || 
                     product.badge?.includes('MOTORSPORT') ||
                     product.badge?.includes('DOWNFORCE');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0c1310] border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-2xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2.5 bg-slate-100 dark:bg-black/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative aspect-square md:aspect-auto bg-slate-950 flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-white font-label text-xs rounded-md shadow-lg font-bold tracking-wider ${
                  isRedBadge ? 'bg-red-600' : 'bg-emerald-600'
                }`}>
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs mb-2 font-label">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  {product.categoryName} • {product.subCategoryName}
                </span>
                <span className="text-slate-500 font-mono-code font-semibold">SKU: {product.sku}</span>
              </div>

              {/* Product Subheading / Name */}
              <h2 className="font-heading text-xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs font-label">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="ml-1 font-bold tabular-nums text-slate-800 dark:text-amber-300">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span className="text-slate-600 dark:text-slate-400">{product.reviewsCount} Fitment Verified Reviews</span>
              </div>

              {/* Pricing */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-price text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-wide leading-none tabular-nums font-bold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="font-price text-base sm:text-lg text-slate-400 dark:text-slate-500 line-through tracking-wide leading-none tabular-nums">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-label text-slate-500">MRP incl. GST</span>
              </div>

              {/* Workshop Availability Status */}
              <div className="mt-2 text-xs font-label text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Available at Kumbakonam Workshop · Custom Fitment Consultation Included</span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-body leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                {product.shortDesc}
              </p>

              {/* Specifications Table */}
              <div className="mt-5 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 text-xs font-label text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-bold">
                  Engineering Specifications
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs bg-white dark:bg-slate-900/60">
                  {Object.entries(product.specs || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2.5 px-4">
                      <span className="text-slate-500 font-label text-[11px] uppercase tracking-wider font-semibold">{key}</span>
                      <span className="text-slate-800 dark:text-slate-200 text-right font-body text-[12px] font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fitment Guarantee Box */}
              <div className="mt-4 p-3.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-body">
                  <strong className="text-slate-900 dark:text-white font-semibold">MAAC Fitment Assurance:</strong> Every inquiry is cross-checked against your vehicle chassis year, bolt PCD, and offset prior to dispatch.
                </span>
              </div>
            </div>

            {/* Actions: Vehicle specification input & WhatsApp CTA */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              {/* Optional Vehicle Input */}
              <div>
                <label className="block text-[11px] font-label text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1 font-semibold">
                  <Car className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Specify your car make & model (Optional):</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Porsche 911 / BMW 3-Series / Swift / Creta / Thar"
                  value={vehicleInfo}
                  onChange={(e) => setVehicleInfo(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                {/* Primary WhatsApp Action */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-button text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                  <span>Enquire Fitment on WhatsApp</span>
                </a>

                {/* Secondary Direct Call Button */}
                <a
                  href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9+]/g, '')}`}
                  className="py-3 px-4 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-button text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 shrink-0" />
                  <span>Call Store</span>
                </a>
              </div>

              <p className="text-[10px] text-center text-slate-500 font-label">
                Workshop Location: NH 36 Bypass, Koranattukkaruppur, Kumbakonam
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
