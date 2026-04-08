import { useState, useEffect } from 'react';
import { Clock, Trophy, ArrowRight, Star, Share2, RotateCcw, Info } from 'lucide-react';
import { motion } from 'motion/react';
import confettiModule from 'canvas-confetti';
const confetti = (confettiModule as any).default || confettiModule;
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export function GamesPage() {
  const { language } = useApp();
  const t = translations[language].games;
  const aria = translations[language].aria.games;

  const [activeQuizId, setActiveQuizId] = useState('especies');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleShare = async () => {
    // Determine title lazily using activeQuiz based on language later, or we can use the localized current one
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Human & Ocean - Juegos',
          text: `¡He comprobado mis conocimientos sobre fauna marina! ¿Me superas?`,
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

  const finalMessages = {
    es: {
      0: "¡Sigue explorando! El mar tiene muchos secretos por enseñarte.",
      1: "¡Buen comienzo! Has encontrado tu primera caracola en la orilla.",
      2: "¡Vas por buen camino! Estás empezando a bucear como un pro.",
      3: "¡Buen trabajo! Conoces muy bien a nuestros amigos marinos.",
      4: "¡Increíble! Tienes alma de auténtico biólogo marino.",
      5: "¡ERES UNA LEYENDA! ¡El océano no tiene secretos para ti!"
    },
    en: {
      0: "Keep exploring! The sea has many secrets to show you.",
      1: "Good start! You've found your first seashell on the shore.",
      2: "On the right track! You're starting to dive like a pro.",
      3: "Good job! You know our marine friends very well.",
      4: "Incredible! You have the soul of a marine biologist.",
      5: "YOU ARE A LEGEND! The ocean has no secrets from you!"
    }
  };

  const currentMessage = finalMessages[language as 'es' | 'en'][score as keyof typeof finalMessages['es']] || t.goodScore;

  const getQuizzesData = (lang: 'es' | 'en') => ({
    especies: {
      id: 'especies',
      icon: '🐢',
      title: lang === 'es' ? 'Especies en peligro' : 'Endangered species',
      players: '2.3k',
      questions: [
        {
          image: 'https://images.unsplash.com/photo-1557911619-440e0f4fe81f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWxseWZpc2glMjBvY2VhbiUyMHVuZGVyd2F0ZXJ8ZW58MXx8fHwxNzcyMDc3ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Cuánto tiempo puede vivir una medusa?' : 'How long can a jellyfish live?',
          options: lang === 'es' ? ['1-2 años', '5-10 años', '20-30 años', 'Más de 100 años'] : ['1-2 years', '5-10 years', '20-30 years', 'More than 100 years'],
          correctAnswer: 1
        },
        {
          image: 'https://images.unsplash.com/photo-1520197399711-cb9407f3e551?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2xwaGluJTIwc3dpbW1pbmclMjBvY2VhbnxlbnwxfHx8fDE3NzIwODM3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Qué velocidad máxima pueden alcanzar los delfines?' : 'What maximum speed can dolphins reach?',
          options: ['10 km/h', '30 km/h', '50 km/h', '70 km/h'],
          correctAnswer: 2
        },
        {
          image: 'https://images.unsplash.com/photo-1753740080202-f3e4c9c47b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGFsZSUyMG9jZWFuJTIwYmx1ZSUyMHdhdGVyfGVufDF8fHx8MTc3MjE4ODY3MXww&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Cuál es el animal más grande del planeta?' : 'Which is the largest animal on the planet?',
          options: lang === 'es' ? ['Elefante africano', 'Tiburón ballena', 'Ballena azul', 'Calamar gigante'] : ['African elephant', 'Whale shark', 'Blue whale', 'Giant squid'],
          correctAnswer: 2
        },
        {
          image: 'https://images.unsplash.com/photo-1615708639617-342a7f590131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjB0dXJ0bGUlMjBzd2ltbWluZyUyMHVuZGVyd2F0ZXJ8ZW58MXx8fHwxNzc0OTUzMTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Cuántas especies de tortugas marinas existen?' : 'How many species of sea turtles exist?',
          options: ['3', '5', '7', '12'],
          correctAnswer: 2
        },
        {
          image: 'https://images.unsplash.com/photo-1628371380526-cd13d545819d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFyayUyMHN3aW1taW5nJTIwZGVlcCUyMGJsdWUlMjBvY2VhbnxlbnwxfHx8fDE3NzQ5NjAzNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Los tiburones tienen huesos?' : 'Do sharks have bones?',
          options: lang === 'es' ? ['Sí, como nosotros', 'No, son de cartílago', 'Solo en la mandíbula', 'Solo en la aleta'] : ['Yes, like us', 'No, they are cartilage', 'Only in the jaw', 'Only in the fin'],
          correctAnswer: 1
        }
      ]
    },
    oceanos: {
      id: 'oceanos',
      icon: '🌊',
      title: lang === 'es' ? 'Océanos del mundo' : 'World oceans',
      players: '1.8k',
      questions: [
        {
          image: 'https://images.unsplash.com/photo-1560716614-de679915e1be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNpZmljJTIwb2NlYW4lMjBhZXJpYWwlMjB2aWV3JTIwd2F2ZXN8ZW58MXx8fHwxNzc0OTYwMzc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Qué porcentaje de la Tierra está cubierto por océanos?' : 'What percentage of the Earth is covered by oceans?',
          options: ['50%', '60%', '71%', '85%'],
          correctAnswer: 2
        },
        {
          image: 'https://images.unsplash.com/photo-1551244852-d66e6c5fbd13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpYW5hJTIwdHJlbmNoJTIwZGVlcCUyMG9jZWFuJTIwZGFya3xlbnwxfHx8fDE3NzQ5NjAzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Cuál es la parte más profunda del océano?' : 'What is the deepest part of the ocean?',
          options: lang === 'es' ? ['Fosa de Tonga', 'Fosa de las Marianas', 'Fosa de Puerto Rico', 'Abismo Challenger'] : ['Tonga Trench', 'Mariana Trench', 'Puerto Rico Trench', 'Challenger Deep'],
          correctAnswer: 1
        },
        {
          image: 'https://images.unsplash.com/photo-1536926272468-cbd90ef4c553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2ViZXJnJTIwZmxvYXRpbmclMjBhcmN0aWMlMjBvY2VhbnxlbnwxfHx8fDE3NzQ5NjAzODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Cuál es el océano más frío?' : 'Which is the coldest ocean?',
          options: lang === 'es' ? ['Atlántico', 'Índico', 'Antártico', 'Ártico'] : ['Atlantic', 'Indian', 'Southern', 'Arctic'],
          correctAnswer: 3
        },
        {
          image: 'https://images.unsplash.com/photo-1771002382315-9be24abde4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBjbGVhciUyMHR1cnF1b2lzZSUyMG9jZWFuJTIwd2F2ZXN8ZW58MXx8fHwxNzc0OTYwMzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Por qué el océano es azul?' : 'Why is the ocean blue?',
          options: lang === 'es' ? ['Refleja el cielo', 'Absorbe la luz roja', 'Contiene minerales', 'Es transparente'] : ['Reflects the sky', 'Absorbs red light', 'Contains minerals', 'It is transparent'],
          correctAnswer: 1
        },
        {
          image: 'https://images.unsplash.com/photo-1694661641480-d4e76d6bead3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHVuZGVyd2F0ZXIlMjBjb3JhbCUyMHJlZWYlMjBmdWxsJTIwZnJhbWV8ZW58MXx8fHwxNzc0OTYwMzk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Dónde se encuentra el mayor arrecife de coral?' : 'Where is the largest coral reef located?',
          options: lang === 'es' ? ['Mar Caribe', 'Mar Rojo', 'Hawái', 'Gran Barrera de Coral'] : ['Caribbean Sea', 'Red Sea', 'Hawaii', 'Great Barrier Reef'],
          correctAnswer: 3
        }
      ]
    },
    reciclaje: {
      id: 'reciclaje',
      icon: '♻️',
      title: lang === 'es' ? 'Reciclaje marino' : 'Marine recycling',
      players: '1.2k',
      questions: [
        {
          image: 'https://images.unsplash.com/photo-1768719791701-5ac17daabec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFzdGljJTIwYm90dGxlJTIwZmxvYXRpbmclMjBvY2VhbiUyMHBvbGx1dGlvbnxlbnwxfHx8fDE3NzQ5NjAzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Cuánto tarda una botella de plástico en degradarse?' : 'How long does it take for a plastic bottle to degrade?',
          options: lang === 'es' ? ['10-50 años', '100-200 años', '400-500 años', 'Nunca se degrada'] : ['10-50 years', '100-200 years', '400-500 years', 'Never degrades'],
          correctAnswer: 2
        },
        {
          image: 'https://images.unsplash.com/photo-1758547343136-19d27f9cb57f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBiaW5zJTIwZ2FyYmFnZSUyMHNvcnRpbmclMjB3YXN0ZXxlbnwxfHx8fDE3NzQ5NjA0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Qué porcentaje del plástico se recicla a nivel mundial?' : 'What percentage of plastic is recycled globally?',
          options: lang === 'es' ? ['Menos del 10%', 'Alrededor del 30%', 'Más del 50%', 'Casi el 80%'] : ['Less than 10%', 'Around 30%', 'More than 50%', 'Almost 80%'],
          correctAnswer: 0
        },
        {
          image: 'https://images.unsplash.com/photo-1734777556016-f7917f7d1b91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3BsYXN0aWNzJTIwc2FuZCUyMG1hY3JvJTIwcG9sbHV0aW9uJTIwbWFjcm98ZW58MXx8fHwxNzc0OTYwNDExfDA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Qué son los microplásticos?' : 'What are microplastics?',
          options: lang === 'es' ? ['Bacterias de plástico', 'Piezas menores a 5mm', 'Bolsas muy finas', 'Plásticos invisibles'] : ['Plastic bacteria', 'Pieces smaller than 5mm', 'Very thin bags', 'Invisible plastics'],
          correctAnswer: 1
        },
        {
          image: 'https://images.unsplash.com/photo-1767785517369-ff7ea26e0672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdoaXRlJTIwc2FuZCUyMHRyb3BpY2FsJTIwYmVhY2h8ZW58MXx8fHwxNzc0OTYwNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Cuál de estos residuos es más común en las playas?' : 'Which of these items is most common on beaches?',
          options: lang === 'es' ? ['Colillas de cigarro', 'Botellas de vidrio', 'Zapatos', 'Latas de aluminio'] : ['Cigarette butts', 'Glass bottles', 'Shoes', 'Aluminum cans'],
          correctAnswer: 0
        },
        {
          image: 'https://images.unsplash.com/photo-1605933353319-31ea576f2d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVzYWJsZSUyMGNsb3RoJTIwYmFncyUyMGdyb2NlcnklMjB6ZXJvJTIwd2FzdGV8ZW58MXx8fHwxNzc0OTYwNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          question: lang === 'es' ? '¿Qué acción individual tiene mayor impacto?' : 'Which individual action has the biggest impact?',
          options: lang === 'es' ? ['Usar popotes de metal', 'Reducir un solo uso', 'Comprar agua embotellada', 'Quemar la basura'] : ['Using metal straws', 'Reducing single-use', 'Buying bottled water', 'Burning trash'],
          correctAnswer: 1
        }
      ]
    }
  });

  const allQuizzes = getQuizzesData(language as 'es' | 'en');
  const activeQuiz = allQuizzes[activeQuizId as keyof typeof allQuizzes];
  const questions = activeQuiz.questions;

  const playSound = (type: 'correct' | 'incorrect' | 'complete') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'incorrect') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'complete') {
        const playNote = (freq: number, start: number) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'sine';
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.2, ctx.currentTime + start);
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + 0.3);
          o.start(ctx.currentTime + start);
          o.stop(ctx.currentTime + start + 0.3);
        };
        playNote(440, 0);
        playNote(554.37, 0.1);
        playNote(659.25, 0.2);
        playNote(880, 0.3);
      }
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  useEffect(() => {
    if (isFinished || showResult) return;
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else {
      handleAnswerSelect(-1);
    }
  }, [timeLeft, isFinished, showResult]);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(20);
    } else {
      setIsFinished(true);
      playSound('complete');
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(20);
    setIsFinished(false);
  };

  const handleQuizChange = (id: string) => {
    if (id === activeQuizId) return;
    setActiveQuizId(id);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(20);
    setIsFinished(false);
  };

  const getButtonStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index
        ? 'bg-[var(--ocean-blue-accent)] text-white border-transparent'
        : 'bg-transparent border-border hover:border-[var(--ocean-blue-accent)] hover:bg-[var(--ocean-blue-accent)]/5 text-foreground';
    }
    if (index === questions[currentQuestion].correctAnswer) {
      return 'bg-[var(--ocean-accent-success)] text-white border-transparent shadow-[0_0_15px_rgba(34,197,94,0.3)]';
    }
    if (selectedAnswer === index && index !== questions[currentQuestion].correctAnswer) {
      return 'bg-red-500 text-white border-transparent';
    }
    return 'bg-muted text-muted-foreground border-transparent opacity-50';
  };

  useEffect(() => {
    if (isFinished && score > 0) {
      const count = score === questions.length ? 200 : 100;
      const defaults = { origin: { y: 0.5, x: 0.5 }, colors: ['#FFD700', '#FDB931', '#FF8C00', '#FFFFFF', '#F59E0B'] };
      function fire(particleRatio: number, opts: any) {
        try { confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) }); } catch (e) {}
      }
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
      if (score === questions.length) {
        setTimeout(() => {
          try {
            confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: defaults.colors });
            confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: defaults.colors });
          } catch (e) {}
        }, 400);
      }
    }
  }, [isFinished, score, questions.length]);

  return (
    <div className="min-h-[100dvh] pt-[4.5rem] pb-4 flex flex-col bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-4 flex-1 flex flex-col max-w-6xl">
        {!isFinished && (
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-[var(--ocean-blue-accent)] to-cyan-400 text-transparent bg-clip-text"
          >
            {t.title}
          </motion.h1>
        )}

        {isFinished ? (
          <div className="flex-1 flex items-center justify-center py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 sm:gap-6 w-full max-w-5xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full relative bg-card border border-border shadow-xl rounded-3xl p-6 sm:p-10 text-center overflow-hidden flex flex-col items-center justify-center min-h-[50vh]"
              >
              {score > 0 && <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-purple-500/10 pointer-events-none" />}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: score > 0 ? [0, -10, 10, -5, 5, 0] : 0 }}
                transition={{ delay: 0.2, scale: { type: "spring", duration: 0.6 } }}
                className="relative"
              >
                {score > 0 ? (
                  <>
                    <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full" />
                    <Trophy className="w-24 h-24 mx-auto text-yellow-500 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)] relative z-10" />
                  </>
                ) : (
                  <div className="w-24 h-24 mx-auto flex items-center justify-center bg-muted rounded-full mb-4">
                    <RotateCcw className="w-12 h-12 text-muted-foreground opacity-50" />
                  </div>
                )}
              </motion.div>
              <motion.h2 className={`text-2xl sm:text-4xl font-black mt-6 mb-2 drop-shadow-sm tracking-tight px-4 ${
                  score === questions.length ? 'bg-gradient-to-b from-yellow-400 to-yellow-600 text-transparent bg-clip-text' : 'text-foreground'
                }`}>
                {currentMessage}
              </motion.h2>
              {score < questions.length && <motion.p className="text-lg text-muted-foreground font-medium mb-2">{score} / {questions.length}</motion.p>}
              <motion.div className="flex flex-col items-center mt-3 mb-6 w-full max-w-sm">
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden relative shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / questions.length) * 100}%` }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    className="absolute left-0 top-0 bottom-0 bg-[var(--ocean-accent-success)]"
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-2 font-semibold">+{score * 250} {t.xpGained}</span>
              </motion.div>
              <motion.div className="w-full max-w-sm space-y-3 relative z-20">
                <motion.button
                  title={score > 0 ? aria.next : aria.playAgain}
                  aria-label={score > 0 ? aria.next : aria.playAgain}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetGame}
                  className="w-full py-3 rounded-xl text-white font-bold text-lg transition-all bg-[var(--ocean-blue-accent)] hover:opacity-90 shadow-[0_5px_15px_rgba(0,119,255,0.3)]"
                >
                  {score > 0 ? t.continueBtn : t.keepTrying}
                </motion.button>
                <div className="flex gap-3">
                  <motion.button
                    title={aria.playAgain}
                    aria-label={aria.playAgain}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetGame}
                    className="flex-1 py-2.5 flex items-center justify-center gap-2 rounded-xl bg-card hover:bg-muted text-sm font-bold border border-border"
                  >
                    <RotateCcw className="w-4 h-4" /> {t.playAgain}
                  </motion.button>
                  <motion.button
                    title={aria.share}
                    aria-label={aria.share}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                    className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-xl text-sm font-bold border transition-colors ${
                      isShared
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-card hover:bg-muted border-border'
                    }`}
                  >
                    <Share2 className="w-4 h-4" /> {isShared ? '¡Listo!' : t.share}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full bg-card border border-border shadow-xl rounded-3xl p-6 flex flex-col h-full max-h-[50vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4 text-center text-[var(--ocean-blue-accent)]">{t.highScores}</h3>
              <div className="space-y-3 flex-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border hover:scale-[1.01] transition-transform">
                    <div className="w-8 h-8 rounded-full bg-[var(--ocean-blue-accent)] flex items-center justify-center font-bold text-sm text-white shadow-sm shrink-0">#{i}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">Player {i}</p>
                      <p className="text-xs font-medium text-[var(--ocean-blue-accent)] opacity-80">{score === questions.length ? 1500 - (i * 100) : 1000 - (i * 50)} pts</p>
                    </div>
                    {i === 1 && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                  </div>
                ))}
              </div>
            </motion.div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 sm:gap-6 flex-1 min-h-0">
            <div className="flex flex-col min-h-0 overflow-hidden bg-card rounded-3xl border border-border shadow-sm">
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-card/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-full text-sm">
                    <Clock className={`w-3.5 h-3.5 ${timeLeft <= 5 ? 'text-[var(--ocean-accent-warning)] animate-pulse' : 'text-[var(--ocean-blue-accent)]'}`} />
                    <span className={`font-semibold ${timeLeft <= 5 ? 'text-[var(--ocean-accent-warning)]' : ''}`}>{timeLeft}s</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-full text-sm">
                    <Trophy className="w-3.5 h-3.5 text-[var(--ocean-accent-success)]" />
                    <span className="font-semibold">{score} pts</span>
                  </div>
                </div>
                <div className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                  {t.question} {currentQuestion + 1}/{questions.length}
                </div>
              </div>
              <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
                <div className="relative h-32 sm:h-full sm:w-2/5 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-border">
                  <ImageWithFallback src={questions[currentQuestion].image} alt={questions[currentQuestion].question} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent sm:bg-gradient-to-r"></div>
                  <div className="absolute top-2 left-2 bg-background/90 backdrop-blur px-2.5 py-1 rounded-full border border-border flex items-center gap-1.5 text-xs font-bold shadow-sm">
                    <span>{activeQuiz.icon}</span>
                    <span>{activeQuiz.title}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-6 flex-1 flex flex-col min-h-0 overflow-y-auto">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 text-foreground leading-tight">{questions[currentQuestion].question}</h3>
                  <div className="space-y-2.5 flex-1">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        title={`${aria.answer}: ${option}`}
                        aria-label={`${aria.answer}: ${option}`}
                        key={index}
                        whileHover={{ scale: showResult ? 1 : 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full p-3 rounded-xl text-left transition-all border flex items-center gap-3 ${getButtonStyle(index)}`}
                      >
                        <div className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 font-bold text-sm ${!showResult && selectedAnswer !== index ? 'border-border bg-background' : 'border-transparent bg-white/20'}`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-medium text-sm sm:text-[15px]">{option}</span>
                      </motion.button>
                    ))}
                  </div>
                  {showResult && selectedAnswer !== -1 && selectedAnswer !== questions[currentQuestion].correctAnswer && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-2">
                      <Info className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-orange-700 dark:text-orange-400 font-medium">{language === 'es' ? '¡Casi lo tienes! El océano está lleno de sorpresas, sigamos aprendiendo.' : 'Almost got it! The ocean is full of surprises, let\'s keep learning.'}</p>
                    </motion.div>
                  )}
                  {showResult && selectedAnswer === -1 && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">{language === 'es' ? '¡Se acabó el tiempo! Tómate tu tiempo para la siguiente.' : 'Time is up! Take your time for the next one.'}</p>
                    </motion.div>
                  )}
                  {showResult && (
                    <motion.button
                      title={currentQuestion < questions.length - 1 ? aria.next : aria.viewResults}
                      aria-label={currentQuestion < questions.length - 1 ? aria.next : aria.viewResults}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleNext}
                      className="w-full mt-4 px-4 py-3 bg-[var(--ocean-blue-accent)] text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      {currentQuestion < questions.length - 1 ? t.nextQuestion : t.viewResults}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 min-h-0">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-2xl p-4 sm:p-5 border border-border shadow-sm">
                <h4 className="font-bold text-sm mb-3 text-foreground">{t.yourProgress}</h4>
                <div className="space-y-3">
                  {questions.map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                        isFinished || index < currentQuestion ? 'bg-[var(--ocean-accent-success)] text-white' : index === currentQuestion ? 'bg-[var(--ocean-blue-accent)] text-white ring-2 ring-[var(--ocean-blue-accent)]/20' : 'bg-muted text-muted-foreground border border-border'
                      }`}>{index + 1}</div>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        {(isFinished || index <= currentQuestion) && (
                          <motion.div initial={{ width: 0 }} animate={{ width: index < currentQuestion ? '100%' : showResult ? '100%' : '50%' }} className={`h-full rounded-full ${index < currentQuestion ? 'bg-[var(--ocean-accent-success)]' : 'bg-[var(--ocean-blue-accent)]'}`}></motion.div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-4 sm:p-5 border border-border shadow-sm flex flex-col flex-1 min-h-0 overflow-y-auto">
                <h4 className="font-bold text-sm mb-3 text-foreground">{t.suggested}</h4>
                <div className="space-y-2.5">
                  {Object.values(allQuizzes).map((quiz) => (
                    <button
                      title={`${aria.selectQuiz} ${quiz.title}`}
                      aria-label={`${aria.selectQuiz} ${quiz.title}`}
                      key={quiz.id}
                      onClick={() => handleQuizChange(quiz.id)}
                      className={`w-full p-2.5 transition-all rounded-xl text-left flex items-center gap-3 border ${activeQuizId === quiz.id ? 'bg-[var(--ocean-blue-accent)]/10 border-[var(--ocean-blue-accent)]/50 shadow-sm' : 'bg-background border-border hover:bg-muted'}`}
                    >
                      <div className="text-xl bg-card p-1.5 rounded-lg shadow-sm border border-border flex-shrink-0">{quiz.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm truncate ${activeQuizId === quiz.id ? 'text-[var(--ocean-blue-accent)]' : 'text-foreground'}`}>{quiz.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{quiz.players} {language === 'es' ? 'jugadores' : 'players'}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}