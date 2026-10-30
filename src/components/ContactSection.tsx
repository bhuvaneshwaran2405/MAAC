import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  MapPin, 
  CalendarX, 
  MessageSquare,
  ExternalLink,
  Navigation,
  Compass,
  Sparkles
} from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/catalog.ts';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [whatsAppRedirectUrl, setWhatsAppRedirectUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setStatus('submitting');

    const msg = [
      `*New Fitment & Product Inquiry:*`,
      `Name: *${formData.name}*`,
      formData.phone ? `Phone: ${formData.phone}` : null,
      formData.email ? `Email: ${formData.email}` : null,
      formData.vehicle ? `Vehicle: *${formData.vehicle}*` : null,
      ``,
      `*Requirements:*`,
      formData.message
    ].filter(Boolean).join('\n');

    const waUrl = `https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    setWhatsAppRedirectUrl(waUrl);

    setTimeout(() => {
      setStatus('success');
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  // Exact coordinates for MAAC Wheels & Accessories on NH 36 Bypass, Kumbakonam
  const { lat, lng } = WORKSHOP_DETAILS.coordinates; // 10.9829948, 79.3907444

  return (
    <section id="contact-section" className="relative py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Liquid Morphism Ambient Fluid Blobs & Dynamic Mesh Glow */}
      <div className="absolute top-1/4 left-1/5 w-[550px] h-[550px] bg-gradient-to-tr from-red-600/25 via-rose-500/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse duration-[7000ms]" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-purple-600/20 via-pink-600/12 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 -left-20 w-[420px] h-[420px] bg-gradient-to-r from-red-600/15 via-orange-600/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Master Glassmorphism Container with Specular Reflections */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.08] via-white/[0.035] to-white/[0.015] backdrop-blur-3xl p-4 sm:p-8 lg:p-12 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Specular Liquid Light Rim Highlight at Top */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/90 to-transparent pointer-events-none" />
        
        {/* Subtle Diagonal Glass Refraction Sheen */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none transform -rotate-12" />

        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-xl text-neutral-200 font-label text-xs mb-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
            <span>Kumbakonam Workshop & Fitment Desk</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wide mb-3 drop-shadow-sm">
            Technical Consultation & Workshop
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-body leading-relaxed">
            Visit our physical workshop located right on Kumbakonam Bypass (NH 36) or consult directly with our chassis & accessory specialists.
            Submit your vehicle details below for bespoke wheel offsets, laser headlights, and precision accessories.
          </p>
        </div>

        {/* 2-Column Grid inside the Glassmorphism Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10">
          {/* Left Column: Workshop Information & Mini Map */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
            
            {/* MINI MAP OF SHOP EXACT PINNED LOCATION - PERMANENT SATELLITE VIEW */}
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-950/90 shadow-[0_16px_36px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.25)] group/map flex flex-col backdrop-blur-2xl">
              
              {/* Map Header Toolbar */}
              <div className="px-3 py-2.5 bg-neutral-900/90 border-b border-white/10 flex items-center justify-between text-xs backdrop-blur-md z-20">
                <div className="flex items-center gap-1.5 text-neutral-200">
                  <MapPin className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  <span className="font-label text-[11px] tracking-wide uppercase text-neutral-200 font-semibold">
                    Shop Satellite View (NH 36 Bypass)
                  </span>
                </div>

                <a
                  href={WORKSHOP_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-label text-[10px] sm:text-[11px] text-neutral-200 hover:text-white px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all shadow-sm group/link"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-neutral-300 group-hover/link:text-red-400 transition-colors" />
                </a>
              </div>

              {/* Map Viewport - Permanent Satellite View */}
              <div className="relative w-full h-64 sm:h-72 bg-neutral-900">
                <iframe
                  title="MAAC Wheels & Accessories Kumbakonam Satellite View"
                  src={`https://maps.google.com/maps?q=${lat},${lng}&t=k&hl=en&z=17&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />

                {/* Overlaid Direct Directions Link */}
                <div className="absolute bottom-2.5 right-2.5 z-20">
                  <a
                    href={WORKSHOP_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-neutral-950/95 hover:bg-red-600 border border-white/30 text-white text-[11px] font-button uppercase tracking-wider backdrop-blur-md shadow-xl flex items-center gap-1.5 transition-all cursor-pointer group/btn"
                  >
                    <Navigation className="w-3.5 h-3.5 text-red-400 group-hover/btn:text-white transition-colors" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-80 group-hover/btn:opacity-100" />
                  </a>
                </div>
              </div>

              {/* Bottom Address Info Strip under Map */}
              <div className="p-3 bg-white/[0.04] border-t border-white/10 flex items-center justify-between text-xs font-body text-neutral-300 backdrop-blur-md">
                <div className="flex items-center gap-1.5 truncate pr-2 text-[11px] sm:text-xs">
                  <Compass className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span className="truncate">NH 36 Bypass, Koranattukkaruppur, Kumbakonam - 612501</span>
                </div>
                <span className="text-emerald-400 text-[10px] sm:text-[11px] shrink-0 font-label flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Open Today
                </span>
              </div>
            </div>

            {/* Direct Contact Glass Card */}
            <div className="p-4 sm:p-5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/18 rounded-2xl backdrop-blur-2xl transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_10px_25px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2 text-xs text-red-400 font-label mb-2.5">
                <div className="w-6 h-6 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                </div>
                <span>DIRECT FITMENT DESK</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-white text-2xl sm:text-3xl block font-price leading-none tracking-wide">
                    {WORKSHOP_DETAILS.phone}
                  </span>
                  <span className="font-label text-[11px] text-neutral-400 block mt-1">Direct line to shop technicians</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello MAAC Wheels & Accessories Kumbakonam, I would like to inquire regarding vehicle fitments.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-button uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-emerald-950/40"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Glass Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 sm:p-4 bg-white/[0.05] border border-white/18 rounded-2xl backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.18)]">
                <div className="flex items-center gap-1.5 text-neutral-300 text-xs font-label mb-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Working Hours</span>
                </div>
                <p className="text-white font-subheading text-sm">9:30 AM – 8:30 PM</p>
                <p className="text-xs text-neutral-400 mt-0.5 font-body">Monday to Saturday</p>
              </div>

              <div className="p-3.5 sm:p-4 bg-white/[0.05] border border-white/18 rounded-2xl backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.18)]">
                <div className="flex items-center gap-1.5 text-neutral-300 text-xs font-label mb-1">
                  <CalendarX className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sunday Hours</span>
                </div>
                <p className="text-white font-subheading text-sm">10:00 AM – 4:00 PM</p>
                <p className="text-xs text-neutral-400 mt-0.5 font-body">Active Service Bay</p>
              </div>
            </div>

            {/* Fitment Guarantee Pill */}
            <div className="flex items-center gap-3 p-3.5 bg-white/[0.05] border border-white/18 rounded-2xl backdrop-blur-2xl text-xs shadow-[inset_0_1px_2px_rgba(255,255,255,0.18)]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-neutral-300 font-body">
                100% Bolt-On Fitment Guarantee: Chassis clearance, hub bore, and PCD verified prior to purchase.
              </span>
            </div>
          </div>

          {/* Right Column: Liquid & Glassmorphism Interactive Consultation Form */}
          <div className="lg:col-span-7 bg-gradient-to-br from-white/[0.07] via-white/[0.04] to-white/[0.02] border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between shadow-[0_24px_50px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.3)] backdrop-blur-3xl relative overflow-hidden">
            {/* Top specular shimmer light */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-xs font-label text-neutral-200">
                  <div className="w-6 h-6 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    <Wrench className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <span className="uppercase tracking-wider">Submit Vehicle Fitment Inquiry</span>
                </div>
                <span className="text-[10px] font-label text-neutral-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                  Instant Response
                </span>
              </div>

              {status === 'success' && (
                <div className="mb-6 p-4 bg-emerald-950/70 border border-emerald-500/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-300 backdrop-blur-xl shadow-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-subheading block text-emerald-200">Inquiry Ready!</span>
                      <span className="font-body text-neutral-300">We have prepared your message for WhatsApp consultation with the workshop team.</span>
                    </div>
                  </div>
                  {whatsAppRedirectUrl && (
                    <a
                      href={whatsAppRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-button text-xs uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-md shadow-emerald-950/50 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Re-open WhatsApp</span>
                    </a>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-label text-neutral-300 mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/40 hover:bg-black/50 focus:bg-black/60 border border-white/18 focus:border-red-500 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all font-body shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label text-neutral-300 mb-1.5">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black/40 hover:bg-black/50 focus:bg-black/60 border border-white/18 focus:border-red-500 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all font-body shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-label text-neutral-300 mb-1.5">
                      Vehicle Make, Model & Year
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mahindra Thar Roxx / Creta 2024"
                      value={formData.vehicle}
                      onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                      className="w-full bg-black/40 hover:bg-black/50 focus:bg-black/60 border border-white/18 focus:border-red-500 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all font-body shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label text-neutral-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/40 hover:bg-black/50 focus:bg-black/60 border border-white/18 focus:border-red-500 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all font-body shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-label text-neutral-300 mb-1.5">
                    Modifications & Fitment Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe desired upgrades: e.g. 18-inch forged alloys with 114.3 PCD, Bi-LED projector retrofit, Alcantara seat covers, or DSP audio tuning..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/40 hover:bg-black/50 focus:bg-black/60 border border-white/18 focus:border-red-500 rounded-xl p-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all font-body shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-button text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 group/submit"
                >
                  <MessageSquare className="w-4 h-4 fill-current group-hover/submit:scale-110 transition-transform" />
                  <span>{status === 'submitting' ? 'Preparing Consultation...' : 'Send Inquiry via WhatsApp Consultation'}</span>
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-neutral-400 font-body">
              <span>* WhatsApp auto-populates with your full vehicle specification for instant engineering review.</span>
              <span className="text-neutral-300 font-label flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Workshop
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
