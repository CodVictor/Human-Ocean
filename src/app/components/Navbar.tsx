import { Waves, Heart, Sun, Moon, Settings, User, ArrowLeft, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link, useLocation } from 'react-router';
import { translations } from '../data/translations';

export function Navbar() {
  const { theme, toggleTheme, language, setLanguage } = useApp();
  const location = useLocation();
  const aria = translations[language].aria.nav;
  const t = translations[language].nav;

  const handleLanguageToggle = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-50 dark:bg-[var(--ocean-surface)] border-b border-black/5 dark:border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          title={aria.logo}
          aria-label={aria.logo}
          className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <Waves className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--ocean-blue-accent)]" />
          <span className="font-semibold text-sm sm:text-lg hidden xs:inline sm:inline">Human & Ocean</span>
          {!isHomePage && (
            <Home className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 text-muted-foreground hidden sm:block" />
          )}
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink">
          {/* Back Button */}
          {!isHomePage && (
            <Link 
              to="/" 
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={aria.back}
              title={aria.back}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden md:inline text-sm">{t.back}</span>
            </Link>
          )}

          {/* Donate Button */}
          <Link 
            to="/donar" 
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--ocean-blue-accent)] text-white rounded-full hover:opacity-90 transition-opacity shadow-sm"
            aria-label={t.donate}
            title={t.donate}
          >
            <Heart className="w-4 h-4 fill-white/20" />
            <span className="hidden md:inline font-medium text-sm">{t.donate}</span>
          </Link>

          {/* Language Toggle */}
          <button
            onClick={handleLanguageToggle}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full hover:bg-white/10 transition-colors font-semibold text-xs sm:text-sm border border-transparent dark:border-white/10"
            aria-label={aria.languageToggle}
            title={aria.languageToggle}
          >
            <span>{language.toUpperCase()}</span>
          </button>

           {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={aria.toggleTheme}
            title={aria.toggleTheme}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Settings */}
          <Link 
            to="/configuracion" 
            className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={t.settings}
            title={t.settings}
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
          
          {/* Profile */}
          <Link 
            to="/perfil" 
            className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={aria.userProfile}
            title={aria.userProfile}
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}