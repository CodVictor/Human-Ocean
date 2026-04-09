import { useState } from 'react';
import { Flame, TrendingUp, TrendingDown, Share2, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

const leaderboard = [
  { rank: 1, name: 'Jorge García', points: 2847, trend: 'up', avatar: '🔥' },
  { rank: 2, name: 'Laura Hernández', points: 2756, trend: 'up', avatar: '⭐' },
  { rank: 3, name: 'Carlos Ruiz', points: 2634, trend: 'down', avatar: '💎' },
  { rank: 4, name: 'Ana Martínez', points: 2521, trend: 'up', avatar: '🌟' },
  { rank: 5, name: 'Pedro Sánchez', points: 2398, trend: 'same', avatar: '✨' },
  { rank: 6, name: 'María López', points: 2287, trend: 'up', avatar: '🎯' },
  { rank: 7, name: 'David Torres', points: 2156, trend: 'down', avatar: '🏆' },
  { rank: 8, name: 'Sofía Jiménez', points: 2043, trend: 'up', avatar: '💫' }
];

const weekDays = [
  { day: 'L', completed: true },
  { day: 'M', completed: true },
  { day: 'X', completed: true },
  { day: 'J', completed: true },
  { day: 'V', completed: true },
  { day: 'S', completed: false },
  { day: 'D', completed: false }
];

export function StreakPage() {
  const { language } = useApp();
  const t = translations[language].streak;
  const [isShared, setIsShared] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Human & Ocean - Racha',
          text: '¡Mira mi racha y únete a la liga en Human & Ocean!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    } catch (err) {
      console.log('Compartir cancelado o error:', err);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold mb-8"
          >
            {t.title}
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Streak Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-blue-50 dark:bg-gradient-to-br dark:from-[#1e3a5f] dark:to-[#0f2942] rounded-2xl p-4 sm:p-6 border border-black/5 dark:border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[var(--ocean-accent-warning)]/20 rounded-xl">
                  <Flame className="w-8 h-8 text-[var(--ocean-accent-warning)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">39 {t.daysInRow}</h2>
                  <p className="text-sm text-muted-foreground">{t.keepGoing}</p>
                </div>
              </div>

              {/* Week Progress */}
              <div className="bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors rounded-xl p-3 sm:p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-3">{t.thisWeek}</p>
                <div className="flex justify-between gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {weekDays.map((day, index) => (
                    <motion.div
                      key={day.day}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="flex flex-col items-center gap-1 sm:gap-2 shrink-0"
                    >
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${
                        day.completed
                          ? 'bg-[var(--ocean-accent-success)] text-white'
                          : 'bg-white/10 text-muted-foreground'
                      }`}>
                        {day.completed ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : day.day}
                      </div>
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors rounded-xl p-3 sm:p-4">
                  <p className="text-sm text-muted-foreground mb-1">{t.bestStreak}</p>
                  <p className="text-xl sm:text-2xl font-semibold">52 {t.days}</p>
                </div>
                <div className="bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors rounded-xl p-3 sm:p-4">
                  <p className="text-sm text-muted-foreground mb-1">{t.totalDays}</p>
                  <p className="text-xl sm:text-2xl font-semibold">187 {t.days}</p>
                </div>
              </div>

              {/* Motivational message */}
              <div className="mt-6 p-4 bg-[var(--ocean-blue-accent)]/20 rounded-xl border border-[var(--ocean-blue-accent)]/30">
                <p className="text-sm">
                  💪 {t.motivational}
                </p>
              </div>
            </motion.div>

            {/* League Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 dark:bg-gradient-to-br dark:from-[#1e3a5f] dark:to-[#0f2942] rounded-2xl p-4 sm:p-6 border border-black/5 dark:border-white/10 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{t.division}</h2>
                  <p className="text-sm text-muted-foreground">{t.topThisWeek}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-2xl">
                  💎
                </div>
              </div>

              {/* Leaderboard */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {leaderboard.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      player.rank === 1
                        ? 'bg-[var(--ocean-accent-warning)]/20 border border-[var(--ocean-accent-warning)]/30'
                        : 'bg-transparent border border-black/10 hover:bg-black/5 dark:bg-black/20 dark:border-transparent dark:hover:bg-black/20 transition-colors'
                    }`}
                  >
                    {/* Rank */}
                    <div className="w-8 h-8 flex items-center justify-center font-semibold text-sm">
                      {player.rank}
                    </div>

                    {/* Avatar */}
                    <div className="text-2xl">{player.avatar}</div>

                    {/* Name & Points */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{player.name}</p>
                      <p className="text-sm text-muted-foreground">{player.points} {t.pts}</p>
                    </div>

                    {/* Trend */}
                    <div>
                      {player.trend === 'up' && (
                        <TrendingUp className="w-5 h-5 text-[var(--ocean-accent-success)]" />
                      )}
                      {player.trend === 'down' && (
                        <TrendingDown className="w-5 h-5 text-[var(--ocean-accent-critical)]" />
                      )}
                      {player.trend === 'same' && (
                        <div className="w-5 h-0.5 bg-muted-foreground rounded"></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Share button */}
              <button 
                onClick={handleShare}
                className={`w-full mt-6 px-4 py-3 rounded-xl transition-opacity flex items-center justify-center gap-2 ${
                  isShared 
                    ? 'bg-green-500 text-white hover:opacity-100' 
                    : 'bg-[var(--ocean-blue-accent)] text-white hover:opacity-90'
                }`}
              >
                <Share2 className="w-5 h-5" />
                {isShared ? '¡Listo!' : t.shareLogs}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}