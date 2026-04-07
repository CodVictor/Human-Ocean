import { MapPin, ShoppingBag, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

const donationHistory = {
  es: [
    { id: '1', amount: 121, location: 'Costa de Marruecos', date: '15 Feb 2026', status: 'Usado para bolsas de reciclaje', icon: '🌊' },
    { id: '2', amount: 89, location: 'Mediterráneo', date: '8 Feb 2026', status: 'Limpieza de playas completada', icon: '🏖️' },
    { id: '3', amount: 156, location: 'Reserva Marina Atlántica', date: '1 Feb 2026', status: 'Protección de especies', icon: '🐢' },
    { id: '4', amount: 87, location: 'Proyecto Coral', date: '25 Ene 2026', status: 'Restauración en progreso', icon: '🪸' }
  ],
  en: [
    { id: '1', amount: 121, location: 'Morocco Coast', date: '15 Feb 2026', status: 'Used for recycling bags', icon: '🌊' },
    { id: '2', amount: 89, location: 'Mediterranean', date: '8 Feb 2026', status: 'Beach cleanup completed', icon: '🏖️' },
    { id: '3', amount: 156, location: 'Atlantic Marine Reserve', date: '1 Feb 2026', status: 'Species protection', icon: '🐢' },
    { id: '4', amount: 87, location: 'Coral Project', date: '25 Jan 2026', status: 'Restoration in progress', icon: '🪸' }
  ]
};

const achievements = {
  es: [
    { title: 'Primera donación', icon: '🎖️', unlocked: true },
    { title: 'Racha de 30 días', icon: '🔥', unlocked: true },
    { title: 'Donador frecuente', icon: '⭐', unlocked: true },
    { title: 'Embajador oceánico', icon: '🌊', unlocked: false }
  ],
  en: [
    { title: 'First donation', icon: '🎖️', unlocked: true },
    { title: '30-day streak', icon: '🔥', unlocked: true },
    { title: 'Frequent donator', icon: '⭐', unlocked: true },
    { title: 'Ocean Ambassador', icon: '🌊', unlocked: false }
  ]
};

const t = {
  es: {
    title: 'Mi Perfil',
    memberSince: 'Miembro desde Enero 2025',
    donated: 'Donado',
    streak: 'Días racha',
    projects: 'Proyectos',
    history: 'Historial de Donaciones',
    achievements: 'Logros',
    impactTitle: 'Tu impacto',
    impactDesc: 'Tus donaciones han contribuido a:',
    impactList: [
      '12 toneladas de plástico retiradas',
      '3 áreas marinas protegidas',
      '47 especies monitoreadas'
    ]
  },
  en: {
    title: 'My Profile',
    memberSince: 'Member since January 2025',
    donated: 'Donated',
    streak: 'Day streak',
    projects: 'Projects',
    history: 'Donation History',
    achievements: 'Achievements',
    impactTitle: 'Your impact',
    impactDesc: 'Your donations have contributed to:',
    impactList: [
      '12 tons of plastic removed',
      '3 protected marine areas',
      '47 monitored species'
    ]
  }
};

export function ProfilePage() {
  const { user, language } = useApp();
  const dict = t[language];
  const currentHistory = donationHistory[language];
  const currentAchievements = achievements[language];

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold mb-8"
          >
            {dict.title}
          </motion.h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Profile & Donations */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 dark:bg-gradient-to-br dark:from-[#1e3a5f] dark:to-[#0f2942] rounded-2xl p-6 border border-black/5 dark:border-white/10 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full border-4 border-[var(--ocean-blue-accent)] object-cover bg-black/10 dark:bg-white/10"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <p className="text-muted-foreground">
                      {dict.memberSince}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors rounded-xl p-4 text-center">
                    <div className="text-2xl font-semibold text-[var(--ocean-accent-success)] mb-1">
                      {user.totalDonated}€
                    </div>
                    <p className="text-xs text-muted-foreground">{dict.donated}</p>
                  </div>
                  <div className="bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors rounded-xl p-4 text-center">
                    <div className="text-2xl font-semibold text-[var(--ocean-accent-warning)] mb-1">
                      {user.streak}
                    </div>
                    <p className="text-xs text-muted-foreground">{dict.streak}</p>
                  </div>
                  <div className="bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors rounded-xl p-4 text-center">
                    <div className="text-2xl font-semibold text-[var(--ocean-blue-accent)] mb-1">
                      12
                    </div>
                    <p className="text-xs text-muted-foreground">{dict.projects}</p>
                  </div>
                </div>
              </motion.div>

              {/* Donation History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-50 dark:bg-gradient-to-br dark:from-[#1e3a5f] dark:to-[#0f2942] rounded-2xl p-6 border border-black/5 dark:border-white/10 shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[var(--ocean-blue-accent)]" />
                  {dict.history}
                </h3>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {currentHistory.map((donation, index) => (
                    <motion.div
                      key={donation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{donation.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold">{donation.location}</h4>
                            <span className="text-[var(--ocean-accent-success)] font-semibold">
                              {donation.amount}€
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{donation.date}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <ShoppingBag className="w-3 h-3" />
                            <span className="text-muted-foreground">{donation.status}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Achievements */}
            <div className="space-y-6">
              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-50 dark:bg-gradient-to-br dark:from-[#1e3a5f] dark:to-[#0f2942] rounded-2xl p-6 border border-black/5 dark:border-white/10 shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[var(--ocean-accent-warning)]" />
                  {dict.achievements}
                </h3>

                <div className="space-y-3">
                  {currentAchievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className={`p-3 rounded-xl flex items-center gap-3 ${
                        achievement.unlocked
                          ? 'bg-[var(--ocean-accent-warning)]/20 border border-[var(--ocean-accent-warning)]/30'
                          : 'bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors opacity-50'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <p className="font-semibold text-sm">{achievement.title}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Impact Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[var(--ocean-accent-success)]/20 to-[var(--ocean-blue-accent)]/20 rounded-2xl p-6 border border-[var(--ocean-accent-success)]/30"
              >
                <h4 className="font-semibold mb-2">{dict.impactTitle}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {dict.impactDesc}
                </p>
                <ul className="space-y-2 text-sm">
                  {dict.impactList.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--ocean-accent-success)] shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
