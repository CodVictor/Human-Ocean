import { Flame, Gamepad2, Video, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

import darkMapImage from '../assets/darkmodemap.png';
import lightMapImage from '../assets/lightmodemap.png';

export function Home() {
  const navigate = useNavigate();
  const { language, theme } = useApp();
  const t = translations[language].home;
  const aria = translations[language].aria.home;

  const menuItems = [
    {
      icon: Flame,
      title: t.menu.streak,
      description: t.menu.streakDesc,
      color: 'var(--ocean-accent-warning)',
      path: '/streak',
      ariaLabel: aria.menuStreak
    },
    {
      icon: Gamepad2,
      title: t.menu.games,
      description: t.menu.gamesDesc,
      color: 'var(--ocean-blue-accent)',
      path: '/games',
      ariaLabel: aria.menuGames
    },
    {
      icon: Video,
      title: t.menu.foryou,
      description: t.menu.foryouDesc,
      color: 'var(--ocean-accent-success)',
      path: '/feed',
      ariaLabel: aria.menuFeed
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">{t.welcome}</h1>
            <p className="text-muted-foreground text-lg">
              {t.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
          {/* Map Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            role="button"
            tabIndex={0}
            aria-label={aria.explore}
            title={aria.explore}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/map');
              }
            }}
            className="relative h-[500px] rounded-2xl overflow-hidden bg-blue-50 dark:bg-gradient-to-br dark:from-[#1e3a5f] dark:to-[#0f2942] shadow-2xl border border-black/5 dark:border-white/10 cursor-pointer group"
            onClick={(e) => {
              e.preventDefault();
              navigate('/map');
            }}
          >
            {/* Background image preview */}
            <div className="absolute inset-0">
              <img 
                src={theme === 'dark' ? darkMapImage : lightMapImage}
                alt="Ocean Impact Map"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Animated dots overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[var(--ocean-accent-critical)] rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[var(--ocean-accent-warning)] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-2/3 left-1/4 w-24 h-24 bg-[var(--ocean-accent-success)] rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6 relative z-10">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-[var(--ocean-blue-accent)] drop-shadow-lg" />
                <h2 className="text-2xl font-semibold mb-2 text-white drop-shadow-md">{t.impactMap}</h2>
                <p className="text-white/90 mb-6 drop-shadow-sm">
                  {t.impactMapDesc}
                </p>
                <span
                  className="inline-block px-6 py-3 bg-[var(--ocean-blue-accent)] text-white rounded-full hover:opacity-90 transition-opacity shadow-lg group-hover:scale-105 transition-transform duration-300"
                >
                  {t.exploreMap}
                </span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-3 h-3 bg-[var(--ocean-accent-success)] rounded-full animate-pulse"></div>
            <div className="absolute bottom-12 left-12 w-2 h-2 bg-[var(--ocean-accent-warning)] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-[var(--ocean-accent-critical)] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-[var(--ocean-blue-accent)] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </motion.div>

          {/* Menu Items */}
          <div className="flex flex-col h-auto lg:h-[500px] gap-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                className="flex-1 flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Link
                  to={item.path}
                  aria-label={item.ariaLabel}
                  title={item.ariaLabel}
                  className="group flex-1 w-full px-6 py-4 sm:p-6 rounded-xl bg-blue-50 dark:bg-gradient-to-br dark:from-[#1e3a5f] dark:to-[#0f2942] hover:bg-blue-100 dark:hover:from-[#2a4a75] dark:hover:to-[#15324e] transition-all duration-300 shadow-lg hover:shadow-xl border border-black/5 dark:border-white/10 flex items-center"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-3 rounded-xl bg-white/10 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <item.icon 
                        className="w-6 h-6 shrink-0" 
                        style={{ color: item.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 sm:line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}