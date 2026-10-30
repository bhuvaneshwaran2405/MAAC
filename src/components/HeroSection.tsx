import React, { useRef, useEffect } from 'react';

interface HeroSectionProps {
  onExploreRack?: () => void;
  onBrowseCatalog?: () => void;
  theme?: 'light' | 'dark';
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Reliable autoplay & uninterrupted continuous loop
  useEffect(() => {
    try {
      localStorage.removeItem('maac_custom_hero_video');
    } catch {
      // ignore
    }

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const startPlayback = () => {
      try {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay policy fallback: ensure muted and retry safely
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      } catch {
        // silent fallback
      }
    };

    startPlayback();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video.paused) {
        startPlayback();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Prevent interruption: if pause is fired by browser/OS, immediately resume
  const handlePreventPause = () => {
    if (videoRef.current) {
      try {
        const p = videoRef.current.play();
        if (p !== undefined) p.catch(() => {});
      } catch {
        // ignore
      }
    }
  };

  // Seamless loop restart guarantee
  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      try {
        const p = videoRef.current.play();
        if (p !== undefined) p.catch(() => {});
      } catch {
        // ignore
      }
    }
  };

  return (
    <section className="relative z-0 w-full bg-[#0a0f0d] border-b border-slate-800/80 overflow-hidden pt-4 sm:pt-7 pb-6 sm:pb-10">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-emerald-600/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-800/25 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Header Text - Kumbakonam #1 Automotive Hub */}
        <div className="text-center max-w-5xl mx-auto mb-8 sm:mb-12 flex flex-col items-center gap-4 sm:gap-6">

          <h1 
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-tight sm:leading-none drop-shadow-[0_4px_25px_rgba(16,185,129,0.3)] bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #a7f3d0 45%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            KUMBAKONAM'S BEST CAR ACCESSORIES & FITMENT HUB
          </h1>

          <p className="font-body text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed px-2 font-normal">
            The Delta region’s top-rated destination for forged alloys, laser optics, Android head units, custom interior upholstery & detailing armor—engineered for every car make and model.
          </p>

          {/* Quick trust metrics row */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 pt-1 text-xs sm:text-sm text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="text-amber-400 font-bold">★ 4.9/5</span> Rated Best in Area
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="text-emerald-400">✓</span> NH 36 Bypass, Koranattukkaruppur
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="text-emerald-400">⚡</span> Same-Day Professional Fitment
            </span>
          </div>
        </div>

        {/* ========================================================
            FULL-VIEW CINEMATIC VIDEO THEATER
           ======================================================== */}
        <div 
          onContextMenu={(e) => e.preventDefault()}
          className="relative w-full mx-auto rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl shadow-black/90 select-none"
        >
          {/* Subtle Green Accent Rim Light on Top */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent pointer-events-none z-10" />

          {/* Full-View Video Wrapper */}
          <div className="relative w-full h-[62vh] sm:h-[74vh] md:h-[82vh] lg:h-[88vh] min-h-[440px] max-h-[960px] bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onPause={handlePreventPause}
              onEnded={handleEnded}
              className="w-full h-full object-cover object-center pointer-events-none select-none"
            >
              <source src="/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
