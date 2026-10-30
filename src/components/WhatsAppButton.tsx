import React, { useState } from 'react';
import { MessageCircle, ShieldCheck } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const defaultMessage = encodeURIComponent(
    "Hello MAAC Wheels & Accessories Kumbakonam team, I'd like an inquiry on wheels, fitment, and accessories for my vehicle."
  );

  return (
    <div className="fixed bottom-20 sm:bottom-22 lg:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover */}
      {hovered && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-900/95 border border-neutral-700 text-white text-xs font-mono-code rounded-lg shadow-xl backdrop-blur-md animate-fade-in">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>KUMBAKONAM WORKSHOP • +91 63698 58746</span>
        </div>
      )}

      {/* Button */}
      <a
        href={`https://wa.me/916369858746?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        id="floating-whatsapp-btn"
        className="relative group p-3.5 sm:p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-950/60 transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer border-2 border-emerald-400/30"
        aria-label="Direct WhatsApp Consultation"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-40 animate-ping"></span>
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
      </a>
    </div>
  );
};
