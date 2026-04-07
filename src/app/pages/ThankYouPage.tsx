import { Link, useNavigate, useSearchParams } from 'react-router';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { Home, ArrowLeft, Settings, User, Moon, Sun } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { motion } from 'motion/react';

export function ThankYouPage() {
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const t = translations[language];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get the donation amount from URL params
  const amount = searchParams.get('amount') || '5';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1589363794163-c428490365c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWxseWZpc2glMjBkZWVwJTIwb2NlYW4lMjB1bmRlcndhdGVyJTIwZGFyayUyMGJsdWV8ZW58MXx8fHwxNzczMzk5NzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Header Bar */}
      <header className="relative z-10 bg-[#001F3F]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Logo */}
            <div className="text-2xl font-bold text-white">Human&Ocean</div>
            
            {/* Navigation */}
            <nav className="flex items-center gap-3 md:gap-6 flex-wrap">
              {/* Back Button */}
              <Link 
                to="/" 
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{t.nav.back}</span>
              </Link>

              {/* Settings */}
              <Link 
                to="/configuracion" 
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline">{t.nav.settings}</span>
              </Link>

              {/* Profile */}
              <Link 
                to="/profile" 
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{t.nav.profile}</span>
              </Link>

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <span className="text-xl">{language === 'es' ? '🇪🇸' : '🇬🇧'}</span>
                <span className="hidden sm:inline">{t.nav.language}</span>
              </button>

              {/* Theme Toggle */}
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-white/90" />
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={toggleTheme}
                />
                <Moon className="w-4 h-4 text-white/90" />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-4 md:px-6 py-8 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl w-full bg-[#001F3F]/90 backdrop-blur-md rounded-[20px] p-6 md:p-12 shadow-2xl border border-white/10"
        >
          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6 md:mb-8"
          >
            {t.thankYou.title}
          </motion.h1>

          {/* Donation Summary */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-[#042940]/80 rounded-[20px] p-4 md:p-6 mb-6 md:mb-8 text-center border border-white/20"
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              {t.thankYou.donated} <span className="text-[#0074D9]">{amount}€</span>
            </p>
          </motion.div>

          {/* Emotional Message */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-base md:text-lg lg:text-xl text-white/90 text-center leading-relaxed mb-6 md:mb-8"
          >
            {t.thankYou.message}
          </motion.p>

          {/* Action Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-center"
          >
            <Button
              onClick={() => navigate('/')}
              className="bg-[#0074D9] hover:bg-[#0062B8] text-white rounded-[20px] h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 md:gap-3"
            >
              <Home className="w-5 h-5 md:w-6 md:h-6" />
              {t.thankYou.backToHome}
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}