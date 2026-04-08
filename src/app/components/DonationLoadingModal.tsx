import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

interface DonationLoadingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function DonationLoadingModal({ isOpen, onComplete }: DonationLoadingModalProps) {
  const { language } = useApp();
  const t = translations[language].donate;
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    let currentProgress = 0;
    const duration = 2000; // 2 seconds total loading time
    const interval = 20; // update every 20ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      currentProgress += step;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 400); // Wait a bit at 100% before completing
      } else {
        // Add a little randomness to make it feel more real
        const jitter = Math.random() * 2;
        setProgress(Math.min(99, currentProgress + jitter));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, onComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 dark:bg-[#030b1c]/80 backdrop-blur-sm"
          />

          {/* Minimalist Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm mx-4 bg-white dark:bg-[#0d1527] border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Subtle glow behind the card content */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--ocean-blue-accent)]/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Top text: White, sans-serif */}
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-900 dark:text-white font-sans text-lg font-medium tracking-wide text-center mb-8"
              >
                {t.preparing || 'Preparando donación...'}
              </motion.p>

              {/* Large Numeric Text */}
              <motion.div 
                className="mb-6 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums drop-shadow-md">
                  {Math.floor(progress)}
                </span>
                <span className="text-3xl font-bold text-slate-500 dark:text-white/50 ml-1">%</span>
                
                {/* Glow behind numbers */}
                <div className="absolute inset-0 bg-[var(--ocean-blue-accent)]/20 blur-xl rounded-full scale-150 -z-10" />
              </motion.div>

              {/* Wide Horizontal Progress Bar */}
              <div className="w-full relative mt-2">
                {/* Track */}
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-white/5">
                  {/* Indicator: Bright blue */}
                  <div
                    className="h-full bg-[var(--ocean-blue-accent)] rounded-full relative transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  >
                    {/* Inner highlight for a polished "eco-tech" look */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
