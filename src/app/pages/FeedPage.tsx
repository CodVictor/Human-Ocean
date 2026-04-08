import { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, Volume2, VolumeX, ChevronUp, ChevronDown, X, Plus, Music2, Subtitles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

// Import video assets
import video1 from '../assets/video1.MP4';
import video2 from '../assets/video2.MP4';
import video3 from '../assets/video3.MP4';
import video4 from '../assets/video4.MP4';
import video5 from '../assets/video5.MP4';
import video6 from '../assets/video6.MP4';
import video7 from '../assets/video7.MP4';

interface Comment {
  name: string;
  text: string;
  time: string;
  likes: number;
  avatar: string;
}

interface Video {
  id: string;
  videoUrl: string;
  poster: string;
  title: string;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  shares: number;
  description: string;
  audio: string;
  caption: string;
  commentsList: Comment[];
}

function SideAction({
  icon,
  label,
  onClick,
  active = false,
  'aria-label': ariaLabel,
}: {
  icon: React.ReactNode;
  label: string | number;
  onClick: () => void;
  active?: boolean;
  'aria-label'?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex flex-col items-center gap-1 group"
    >
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-white/10
          ${active ? 'bg-white/25 scale-105' : 'bg-black/40 group-hover:bg-black/60'}`}
      >
        {icon}
      </div>
      <span className="text-white text-[10px] font-bold drop-shadow-md">
        {typeof label === 'number' ? label.toLocaleString() : label}
      </span>
    </button>
  );
}

export function FeedPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [showComments, setShowComments] = useState(false);
  const [volumeEnabled, setVolumeEnabled] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [shareFlash, setShareFlash] = useState(false);

  const isLocked = useRef(false);
  const lastTap = useRef(0);
  const { language } = useApp();

  const t: any = translations[language as keyof typeof translations]?.feed || {};

  // Updated videos array with local imports
  const videos: Video[] = [
    {
      id: 'video-1',
      videoUrl: video1,
      poster: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f',
      title: 'Ocean Conservation Efforts',
      author: 'EcoWatch',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      likes: 34219,
      comments: 842,
      shares: 2154,
      description: 'Join us in our mission to clean the beaches and protect marine life.',
      audio: 'Nature - Ambient Waves',
      caption: 'Every piece of plastic removed counts. 🌊',
      commentsList: [
        { name: 'ana_verde', text: 'Esto tiene que parar ya. 😢', time: '1h', likes: 450, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { name: 'carlos_sea', text: 'Increíble labor, gracias por compartir.', time: '2h', likes: 212, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
        { name: 'marianna', text: '¿Dónde es esto? Me gustaría ser voluntaria.', time: '3h', likes: 89, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      ]
    },
    {
      id: 'video-2',
      videoUrl: video2,
      poster: 'https://images.unsplash.com/photo-1551244852-d66e6c5fbd13',
      title: 'Deep Sea Exploration',
      author: 'DeepBlue',
      authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
      likes: 89342,
      comments: 1104,
      shares: 5320,
      description: 'Discovering the unknown depths of our blue planet.',
      audio: 'Deep Ocean Melodies',
      caption: 'The ocean is the lungs of our planet.',
      commentsList: [
        { name: 'juan_explora', text: 'Da un poco de miedo pero es fascinante.', time: '4h', likes: 1302, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
        { name: 'scuba_pro', text: 'Las profundidades siempre esconden los mejores secretos.', time: '5h', likes: 432, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
      ]
    },
    {
      id: 'video-3',
      videoUrl: video3,
      poster: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
      title: 'The Life of Sea Turtles',
      author: 'MarineLife',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      likes: 12453,
      comments: 231,
      shares: 941,
      description: 'Witness the journey of these ancient navigators.',
      audio: 'Under The Sea - Instrumental',
      caption: 'Protecting nesting grounds for future generations.',
      commentsList: [
        { name: 'tortuga_fan', text: '¡Qué bonitas son! 🐢', time: '5h', likes: 88, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { name: 'ocean_lover99', text: 'Ojalá podamos protegerlas a todas.', time: '6h', likes: 45, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
      ]
    },
    {
      id: 'video-4',
      videoUrl: video4,
      poster: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7',
      title: 'Coral Reef Vitality',
      author: 'CoralGuard',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      likes: 45192,
      comments: 541,
      shares: 2130,
      description: 'The vibrant cities of the underwater world.',
      audio: 'Coral Rhythms',
      caption: 'Corals are living organisms, not just rocks.',
      commentsList: [
        { name: 'diving_diary', text: 'El blanqueamiento de los corales es triste, qué bueno ver estos tan sanos.', time: '1d', likes: 320, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
        { name: 'bio_marina', text: 'Puro arte bajo el agua.', time: '1d', likes: 112, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      ]
    },
    {
      id: 'video-5',
      videoUrl: video5,
      poster: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031',
      title: 'Plastic Free Journey',
      author: 'GreenLiving',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      likes: 98453,
      comments: 1432,
      shares: 11245,
      description: 'Small changes in your daily life lead to big results.',
      audio: 'Minimalist Life - LoFi',
      caption: 'Refuse, Reuse, Recycle.',
      commentsList: [
        { name: 'zero_waste', text: 'Yo ya llevo 2 años sin usar plásticos de un solo uso.', time: '2d', likes: 890, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
        { name: 'pablo_rs', text: 'Es difícil empezar pero vale la pena.', time: '2d', likes: 254, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
      ]
    },
    {
      id: 'video-6',
      videoUrl: video6,
      poster: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      title: 'Mountain Echoes',
      author: 'PeakExplorer',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      likes: 21089,
      comments: 184,
      shares: 432,
      description: 'The connection between high peaks and water cycles.',
      audio: 'Mountain Breeze',
      caption: 'Where the clouds touch the earth.',
      commentsList: [
        { name: 'hiker_life', text: 'Qué vistas tan espectaculares, de locos.', time: '3d', likes: 95, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { name: 'montaña_magica', text: 'El agua más limpia nace ahí arriba.', time: '3d', likes: 41, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      ]
    },
    {
      id: 'video-7',
      videoUrl: video7,
      poster: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      title: 'Ancient Forests',
      author: 'WildRoots',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      likes: 54201,
      comments: 631,
      shares: 3201,
      description: 'Walking through the history of nature.',
      audio: 'Forest Whispers',
      caption: 'Trees are the silence that speaks.',
      commentsList: [
        { name: 'bosque_eterno', text: 'Siento mucha paz solo con mirar el video.', time: '4d', likes: 211, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
        { name: 'senderista_pro', text: 'Ese lugar debe oler a tierra mojada maravillosamente.', time: '4d', likes: 118, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      ]
    }
  ];

  const currentVideo = videos[currentIndex];
  const isLiked = liked[currentVideo.id] || false;

  const lockScroll = () => {
    isLocked.current = true;
    setTimeout(() => { isLocked.current = false; }, 800);
  };

  const handleNext = () => {
    if (isLocked.current) return;
    setDirection('down');
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setShowComments(false);
    lockScroll();
  };

  const handlePrev = () => {
    if (isLocked.current) return;
    setDirection('up');
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setShowComments(false);
    lockScroll();
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!isLiked) {
        setLiked((prev) => ({ ...prev, [currentVideo.id]: true }));
        triggerHeartPop();
      }
    }
    lastTap.current = now;
  };

  const triggerHeartPop = () => {
    setShowHeartPop(true);
    setTimeout(() => setShowHeartPop(false), 900);
  };

  const handleShare = () => {
    setShareFlash(true);
    setTimeout(() => setShareFlash(false), 1500);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isLocked.current || Math.abs(e.deltaY) < 30) return;
      if (e.deltaY > 0) handleNext();
      else handlePrev();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked.current) return;
      if (e.key === 'ArrowDown') handleNext();
      if (e.key === 'ArrowUp') handlePrev();
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  const touchStartY = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 50) {
      if (dy > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <div
      className="h-[100dvh] w-full bg-background flex flex-col overflow-hidden relative touch-none transition-colors duration-300"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex-1 relative flex items-center justify-center pt-16">
        <div className="relative w-full h-full max-w-[450px] bg-secondary mx-auto overflow-hidden shadow-2xl sm:border-x sm:border-border transition-colors duration-300">

          <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-center gap-6 pt-3 pb-2 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
            <span className="text-white text-sm font-bold border-b-2 border-white pb-0.5">Para ti</span>
          </div>

          <AnimatePresence>
            {captionsEnabled && (
              <motion.div
                key={currentVideo.id + '-caption'}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="absolute top-14 left-4 right-4 z-30 pointer-events-none"
              >
                <div className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-2.5">
                  <p className="text-white text-xs text-center leading-relaxed font-medium">
                    {currentVideo.caption}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentVideo.id}
              custom={direction}
              initial={{ y: direction === 'down' ? '100%' : '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: direction === 'down' ? '-100%' : '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full"
              onClick={handleDoubleTap}
            >
              <div className="relative w-full h-full">
                <video
                  key={currentVideo.videoUrl}
                  src={currentVideo.videoUrl}
                  poster={currentVideo.poster}
                  autoPlay
                  loop
                  muted={!volumeEnabled}
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 pointer-events-none" />
              </div>

              {/* Interaction icons and metadata same as original... */}
              <AnimatePresence>
                {showHeartPop && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0, scale: 1.4 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                  >
                    <Heart className="text-red-500 fill-red-500 w-24 h-24 drop-shadow-2xl" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-20 left-4 right-20 z-20 pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={currentVideo.authorAvatar}
                    className="w-8 h-8 rounded-full object-cover border border-white/30"
                  />
                  <span className="text-white text-sm font-bold drop-shadow">@{currentVideo.author}</span>
                </div>
                <h3 className="text-white font-bold text-base drop-shadow leading-tight mb-1">
                  {currentVideo.title}
                </h3>
                <p className="text-white/80 text-xs leading-relaxed line-clamp-2 mb-2">
                  {currentVideo.description}
                </p>
                <div className="flex items-center gap-1.5">
                  <Music2 className="w-3 h-3 text-white/70 animate-spin [animation-duration:4s]" />
                  <span className="text-white/70 text-[10px]">{currentVideo.audio}</span>
                </div>
              </div>

              <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5 z-30">
                <div className="relative mb-1">
                  <img
                    src={currentVideo.authorAvatar}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white"
                  />
                </div>

                <SideAction
                  icon={<Heart className={`w-6 h-6 transition-all duration-200 ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-white'}`} />}
                  label={isLiked ? currentVideo.likes + 1 : currentVideo.likes}
                  active={isLiked}
                  onClick={() => {
                    const next = !isLiked;
                    setLiked((prev) => ({ ...prev, [currentVideo.id]: next }));
                    if (next) triggerHeartPop();
                  }}
                  aria-label="Like"
                />

                <SideAction
                  icon={<MessageCircle className="w-6 h-6 text-white" />}
                  label={currentVideo.comments}
                  onClick={() => setShowComments(true)}
                  aria-label="Comentarios"
                />

                <SideAction
                  icon={<Share2 className={`w-6 h-6 ${shareFlash ? 'text-green-400' : 'text-white'}`} />}
                  label={shareFlash ? '¡Listo!' : currentVideo.shares}
                  active={shareFlash}
                  onClick={handleShare}
                  aria-label="Compartir"
                />

                <SideAction
                  icon={<Subtitles className={`w-6 h-6 ${captionsEnabled ? 'text-cyan-400' : 'text-white'}`} />}
                  label="CC"
                  active={captionsEnabled}
                  onClick={() => setCaptionsEnabled((prev) => !prev)}
                  aria-label="Subtítulos"
                />

                <SideAction
                  icon={volumeEnabled ? <Volume2 className="w-6 h-6 text-blue-400" /> : <VolumeX className="w-6 h-6 text-white" />}
                  label={volumeEnabled ? 'ON' : 'OFF'}
                  active={volumeEnabled}
                  onClick={() => setVolumeEnabled((prev) => !prev)}
                  aria-label="Volumen"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-40">
            <motion.div
              className="h-full bg-white/60"
              animate={{ width: `${((currentIndex + 1) / videos.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 flex-col gap-3 z-40">
            <button onClick={handlePrev} className="p-2.5 rounded-full bg-black/40 hover:bg-black/65 text-white border border-white/10 backdrop-blur-md transition-all"><ChevronUp className="w-5 h-5" /></button>
            <button onClick={handleNext} className="p-2.5 rounded-full bg-black/40 hover:bg-black/65 text-white border border-white/10 backdrop-blur-md transition-all"><ChevronDown className="w-5 h-5" /></button>
          </div>

          {/* Comments section same as original... */}
          <AnimatePresence>
            {showComments && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/20" onClick={() => setShowComments(false)} />
                <motion.div
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[70%] bg-zinc-900/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl z-[60] flex flex-col"
                >
                  <div className="flex justify-center pt-3 pb-1"><div className="w-9 h-1 rounded-full bg-white/25" /></div>
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                    <h4 className="text-white font-bold text-base">Comentarios · {currentVideo.comments.toLocaleString()}</h4>
                    <button onClick={() => setShowComments(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                    {currentVideo.commentsList.map((c, i) => (
                      <div key={i} className="flex gap-3">
                        <img src={c.avatar} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-bold">{c.name}</p>
                          <p className="text-white/80 text-sm mt-0.5 leading-relaxed">{c.text}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-white/40 text-[10px]">{c.time}</span>
                            <span className="text-white/40 text-[10px]">❤️ {c.likes}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}