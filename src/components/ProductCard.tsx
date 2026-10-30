import React from 'react';
import { Eye, Star, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Product } from '../types.ts';
import { getProductWhatsAppUrl } from '../data/catalog.ts';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onQuickView, 
  compact = true 
}) => {
  const isAvailable = product.stock > 0;
  const whatsappUrl = getProductWhatsAppUrl(product);

  const isRedBadge = product.badge?.includes('F1') || 
                     product.badge?.includes('SPEC') || 
                     product.badge?.includes('MOTORSPORT') ||
                     product.badge?.includes('DOWNFORCE');

  return (
    <div className="product-card group relative bg-[#0c1310] border border-slate-800 hover:border-emerald-500/70 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/80 h-full">
      {/* Streamlined Image Container with Reduced Height */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] max-h-40 sm:max-h-44 w-full overflow-hidden bg-black/90">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 brightness-95 group-hover:brightness-100"
          loading="lazy"
        />

        {/* Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1310] via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className={`px-2 py-0.5 text-white font-label text-[8px] sm:text-[9px] uppercase rounded shadow-md tracking-wider font-bold ${
              isRedBadge ? 'bg-red-600' : 'bg-emerald-600'
            }`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick View and SKU tag */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
          <span className="hidden sm:inline-block px-1.5 py-0.5 bg-black/80 border border-slate-700/80 text-slate-300 font-label text-[8px] rounded backdrop-blur-xs font-semibold">
            {product.sku}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-1 sm:p-1.5 bg-black/80 hover:bg-emerald-950 text-slate-300 hover:text-emerald-400 rounded backdrop-blur-xs border border-slate-700/80 hover:border-emerald-600 transition-colors cursor-pointer"
            title="View Specifications"
            aria-label={`View specs for ${product.name}`}
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>

      {/* Reduced Card Body */}
      <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-1 gap-1 text-[10px] sm:text-xs">
            <span className="font-label text-emerald-400 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase truncate">
              {product.subCategoryName || product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-400 shrink-0 font-medium">
              <Star className="w-2.5 h-2.5 fill-amber-400" />
              <span className="font-subheading text-[10px] tabular-nums text-amber-300">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Product Title - Clean 1-2 lines */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-subheading text-xs sm:text-sm text-white hover:text-emerald-400 cursor-pointer transition-colors line-clamp-1 sm:line-clamp-2 leading-tight font-bold"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Compact 1-line key specs chip */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-1.5 flex items-center gap-1.5 text-[9px] sm:text-[10px] text-slate-400 overflow-hidden truncate">
              {Object.entries(product.specs).slice(0, 2).map(([key, value], idx) => (
                <span key={key} className="inline-flex items-center gap-1 truncate shrink-0">
                  {idx > 0 && <span className="text-slate-600">•</span>}
                  <span className="text-slate-500 font-semibold uppercase">{key}:</span>
                  <span className="text-slate-300 truncate">{value}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & WhatsApp Inquiry Button */}
        <div className="mt-1 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          {/* Price */}
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="font-price text-base sm:text-lg text-white tracking-wide truncate leading-none tabular-nums font-bold">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && (
                <span className="font-price text-[10px] sm:text-xs text-slate-500 line-through tracking-wide leading-none tabular-nums">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div className="text-[8px] sm:text-[9px] text-emerald-400 flex items-center gap-0.5 font-label font-medium truncate mt-0.5">
              <CheckCircle2 className="w-2 h-2 text-emerald-400 shrink-0" />
              <span className="truncate">{isAvailable ? 'In Stock • Kumbakonam' : 'Custom Fit'}</span>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-button text-[10px] sm:text-xs rounded-lg shadow-sm shadow-emerald-950/60 transition-all flex items-center justify-center gap-1 shrink-0 uppercase tracking-wider whitespace-nowrap cursor-pointer"
            title="Enquire on WhatsApp"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
          >
            <MessageSquare className="w-3 h-3 fill-current shrink-0" />
            <span className="font-bold">Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
};
