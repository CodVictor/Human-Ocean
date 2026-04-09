import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { ArrowLeft, Settings, User, Moon, Sun, Heart, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { motion } from 'motion/react';
import { DonationLoadingModal } from '../components/DonationLoadingModal';

export function DonatePage() {
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const t = translations[language];
  const aria = translations[language].aria;
  const navigate = useNavigate();

  const [donationOption, setDonationOption] = useState('5');
  const [customAmount, setCustomAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Validación dinámica
  const isCustomOption = donationOption === 'custom';
  const isValidAmount = customAmount.trim() !== '' && Number(customAmount) > 0;
  const isButtonDisabled = isCustomOption && !isValidAmount;

  const handleDonate = () => {
    if (isButtonDisabled) return;
    setIsModalOpen(true);
  };

  const handleModalComplete = () => {
    // Get the donation amount
    const amount = isCustomOption ? customAmount : donationOption;

    // Navigate to thank you page with the amount
    navigate(`/thank-you?amount=${amount}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background transition-colors duration-300">
      {/* Background Image - Vibrant Coral Reef */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1651871756929-09d7bde4e97d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwY29sb3JmdWwlMjBjb3JhbCUyMHJlZWYlMjBmdWxsJTIwb2YlMjB0cm9waWNhbCUyMGZpc2glMjB1bmRlcndhdGVyfGVufDF8fHx8MTc3NDk2MDIxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dynamic gradient overlay that adapts to Light/Dark mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/40 to-background/95 backdrop-blur-[2px] transition-colors duration-300"></div>
      </motion.div>

      {/* Header Bar */}
      <header className="relative z-10 bg-background/60 backdrop-blur-xl border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Logo */}
            <Link to="/" title={aria.nav.logo} aria-label={aria.nav.logo} className="text-2xl font-bold text-foreground hover:text-[var(--ocean-blue-accent)] transition-colors">
              Human&Ocean
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-3 md:gap-6 flex-wrap">
              {/* Back Button */}
              <Link
                to="/"
                title={aria.nav.back}
                aria-label={aria.nav.back}
                className="flex items-center gap-2 text-foreground/80 hover:text-[var(--ocean-blue-accent)] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{t.nav.back}</span>
              </Link>

              {/* Settings */}
              <Link
                to="/configuracion"
                title={t.nav.settings}
                aria-label={t.nav.settings}
                className="flex items-center gap-2 text-foreground/80 hover:text-[var(--ocean-blue-accent)] transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline">{t.nav.settings}</span>
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                title={aria.nav.userProfile}
                aria-label={aria.nav.userProfile}
                className="flex items-center gap-2 text-foreground/80 hover:text-[var(--ocean-blue-accent)] transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{t.nav.profile}</span>
              </Link>

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                title={aria.nav.languageToggle}
                aria-label={aria.nav.languageToggle}
                className="flex items-center gap-2 text-foreground/80 hover:text-[var(--ocean-blue-accent)] transition-colors"
              >
                <span className="text-xl">{language === 'es' ? '🇪🇸' : '🇬🇧'}</span>
                <span className="hidden sm:inline">{t.nav.language}</span>
              </button>

              {/* Theme Toggle */}
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-foreground/80" />
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                  title={aria.nav.toggleTheme}
                  aria-label={aria.nav.toggleTheme}
                />
                <Moon className="w-4 h-4 text-foreground/80" />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >

          {/* Left Card - Information */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-card/80 backdrop-blur-xl rounded-[24px] p-8 shadow-xl border border-border transition-colors duration-300">
            <h1 className="text-4xl font-extrabold text-foreground mb-8">
              {t.donate.title}
            </h1>

            <div className="space-y-10">
              {/* Section A - Beach Cleaning */}
              <div className="flex flex-col md:flex-row gap-8 items-center group">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--ocean-blue-accent)]/10 flex items-center justify-center border border-[var(--ocean-blue-accent)]/20 transition-colors">
                      <Heart className="w-5 h-5 text-[var(--ocean-blue-accent)]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {language === 'es' ? 'Playas más limpias' : 'Cleaner beaches'}
                    </h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed ml-[52px]">
                    {t.donate.beachCleaning}
                  </p>
                </div>
                <div className="w-full md:w-64 h-48 rounded-[20px] overflow-hidden shadow-lg flex-shrink-0 border border-border group-hover:border-[var(--ocean-blue-accent)]/50 transition-colors duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJzJTIwY2xlYW5pbmclMjBiZWFjaCUyMG9jZWFuJTIwcGxhc3RpY3xlbnwxfHx8fDE3NzMzOTk3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Beach cleaning volunteers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Section B - River Control */}
              <div className="flex flex-col md:flex-row gap-8 items-center group">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--ocean-blue-accent)]/10 flex items-center justify-center border border-[var(--ocean-blue-accent)]/20 transition-colors">
                      <Info className="w-5 h-5 text-[var(--ocean-blue-accent)]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {language === 'es' ? 'Ríos bajo control' : 'Rivers under control'}
                    </h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed ml-[52px]">
                    {t.donate.riverControl}
                  </p>
                </div>
                <div className="w-full md:w-64 h-48 rounded-[20px] overflow-hidden shadow-lg flex-shrink-0 border border-border group-hover:border-[var(--ocean-blue-accent)]/50 transition-colors duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1753423002512-dcef99db892a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcml2ZXIlMjB3YXRlciUyMHBvbGx1dGlvbiUyMHBpcGVzfGVufDF8fHx8MTc3MzM5OTcyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="River pollution control"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card - Donation Form */}
          <motion.div variants={itemVariants} className="lg:col-span-1 bg-card/80 backdrop-blur-xl rounded-[24px] p-6 shadow-xl border border-border h-fit flex flex-col relative overflow-hidden transition-colors duration-300">
            {/* Subtle glow effect using app color */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--ocean-blue-accent)]/10 blur-3xl rounded-full pointer-events-none"></div>

            <h2 className="text-2xl font-bold text-foreground mb-6 relative z-10">{t.donate.donateHere}</h2>

            <div className="relative z-10 flex-1">
              <RadioGroup
                value={donationOption}
                onValueChange={(val) => setDonationOption(val)}
                title={aria.donate.inputAmount}
                aria-label={aria.donate.inputAmount}
              >
                <div className="space-y-4">
                  {/* 1€ Option */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div title={aria.donate.amount1} aria-label={aria.donate.amount1} className={`flex items-center space-x-3 p-4 rounded-[16px] transition-all cursor-pointer border ${donationOption === '1' ? 'bg-[var(--ocean-blue-accent)]/10 border-[var(--ocean-blue-accent)]' : 'bg-background/50 border-transparent hover:bg-background hover:border-border'}`}>
                      <RadioGroupItem value="1" id="option-1" className="border-[var(--ocean-blue-accent)] text-[var(--ocean-blue-accent)]" />
                      <Label htmlFor="option-1" className="text-foreground cursor-pointer flex-1 text-lg font-medium">
                        {t.donate.donate1}
                      </Label>
                    </div>
                  </motion.div>

                  {/* 5€ Option */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div title={aria.donate.amount5} aria-label={aria.donate.amount5} className={`flex items-center space-x-3 p-4 rounded-[16px] transition-all cursor-pointer border ${donationOption === '5' ? 'bg-[var(--ocean-blue-accent)]/10 border-[var(--ocean-blue-accent)]' : 'bg-background/50 border-transparent hover:bg-background hover:border-border'}`}>
                      <RadioGroupItem value="5" id="option-5" className="border-[var(--ocean-blue-accent)] text-[var(--ocean-blue-accent)]" />
                      <Label htmlFor="option-5" className="text-foreground cursor-pointer flex-1 text-lg font-medium">
                        {t.donate.donate5}
                      </Label>
                    </div>
                  </motion.div>

                  {/* 10€ Option */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div title={aria.donate.amount10} aria-label={aria.donate.amount10} className={`flex items-center space-x-3 p-4 rounded-[16px] transition-all cursor-pointer border ${donationOption === '10' ? 'bg-[var(--ocean-blue-accent)]/10 border-[var(--ocean-blue-accent)]' : 'bg-background/50 border-transparent hover:bg-background hover:border-border'}`}>
                      <RadioGroupItem value="10" id="option-10" className="border-[var(--ocean-blue-accent)] text-[var(--ocean-blue-accent)]" />
                      <Label htmlFor="option-10" className="text-foreground cursor-pointer flex-1 text-lg font-medium">
                        {t.donate.donate10}
                      </Label>
                    </div>
                  </motion.div>

                  {/* Custom Amount Option */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div title={aria.donate.amountOther} aria-label={aria.donate.amountOther} className={`flex items-center space-x-3 p-4 rounded-[16px] transition-all cursor-pointer border ${donationOption === 'custom' ? 'bg-[var(--ocean-blue-accent)]/10 border-[var(--ocean-blue-accent)]' : 'bg-background/50 border-transparent hover:bg-background hover:border-border'}`}>
                      <RadioGroupItem value="custom" id="option-custom" className="border-[var(--ocean-blue-accent)] text-[var(--ocean-blue-accent)]" />
                      <Label htmlFor="option-custom" className="text-foreground cursor-pointer flex-1 text-lg font-medium">
                        {t.donate.donateOther}
                      </Label>
                    </div>
                  </motion.div>
                </div>
              </RadioGroup>

              {/* Custom Amount Input & Dynamic Validation */}
              {isCustomOption && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 overflow-hidden"
                >
                  <Input
                    type="number"
                    title={aria.donate.inputAmount}
                    aria-label={aria.donate.inputAmount}
                    placeholder={t.donate.placeholder}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className={`bg-background/50 text-foreground placeholder:text-muted-foreground rounded-[16px] h-14 text-lg focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-[var(--ocean-blue-accent)] transition-colors ${isButtonDisabled ? 'border-[var(--destructive)]/60 focus-visible:ring-[var(--destructive)]' : 'border-border'
                      }`}
                    min="1"
                  />
                  {/* Mensaje amable dinámico en lugar de un "error" */}
                  {isButtonDisabled && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[var(--destructive)] text-sm mt-3 ml-2 font-medium flex items-center gap-1.5"
                    >
                      <Info className="w-4 h-4" />
                      {language === 'es' ? 'Por favor, cuéntanos con cuánto te gustaría apoyar.' : 'Please let us know how much you would like to help with.'}
                    </motion.p>
                  )}
                </motion.div>
              )}

              {/* Donate Button - Using App's primary accent color */}
              <Button
                onClick={handleDonate}
                disabled={isButtonDisabled}
                title={aria.donate.submit}
                aria-label={aria.donate.submit}
                className={`w-full mt-8 rounded-[16px] h-14 text-lg font-semibold shadow-lg transition-colors ${isButtonDisabled
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-[var(--ocean-blue-accent)] hover:opacity-90 text-white hover:shadow-[var(--ocean-blue-accent)]/25'
                  }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${!isButtonDisabled && 'fill-white'}`} />
                {t.donate.donateButton}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Loading Modal */}
      <DonationLoadingModal
        isOpen={isModalOpen}
        onComplete={handleModalComplete}
      />
    </div>
  );
}
