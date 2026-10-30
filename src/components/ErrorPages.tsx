import React, { useState, useEffect } from 'react';
import { AlertOctagon, RotateCcw, WifiOff, RefreshCw } from 'lucide-react';

export const NotFoundPage: React.FC<{ onReturnHome: () => void }> = ({ onReturnHome }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-sm shadow-2xl space-y-4">
        <div className="w-16 h-16 bg-red-950/60 border border-red-800/80 rounded-full flex items-center justify-center mx-auto text-red-500">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono-code text-red-500 uppercase tracking-widest block font-bold">
          404 STATUS CODE • SECTOR NOT FOUND
        </span>
        <h2 className="font-display font-black text-4xl text-white uppercase tracking-wider">
          WRONG TURN — OFF TRACK
        </h2>
        <p className="text-xs text-neutral-400 font-mono-code leading-relaxed">
          The trajectory or part specification you attempted to reach has been repositioned or retired from our paddock.
        </p>
        <div className="pt-4">
          <button
            onClick={onReturnHome}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RETURN TO PIT LANE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-red-600 text-white px-4 py-2 text-xs font-mono-code flex items-center justify-between shadow-xl">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span>TELEMETRY CONNECTION LOST. BROWSING IN LOCAL CACHED MODE.</span>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-2 py-0.5 bg-black/40 hover:bg-black/60 rounded text-[10px] uppercase font-bold flex items-center gap-1"
      >
        <RefreshCw className="w-3 h-3" />
        RETRY
      </button>
    </div>
  );
};
