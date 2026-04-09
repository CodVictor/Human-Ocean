import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Heart, MessageCircle, Share2, Volume2, VolumeX, ChevronUp, ChevronDown, X, Music2, Subtitles, Play } from 'lucide-react';
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
import video8 from '../assets/video8.MP4';
import video9 from '../assets/video9.MP4';
import video10 from '../assets/video10.MP4';
import video11 from '../assets/video11.MP4';
import video12 from '../assets/video12.MP4';
import video13 from '../assets/video13.MP4';
import video14 from '../assets/video14.MP4';
import video15 from '../assets/video15.MP4';
import video16 from '../assets/video16.MP4';
import video17 from '../assets/video17.MP4';
import video18 from '../assets/video18.MP4';

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

const SideAction = React.memo(function SideAction({
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
});

// Self-contained video player that owns its own ref and handles autoplay/pause correctly
const VideoItem = React.memo(function VideoItem({
  src,
  poster,
  muted,
  onTogglePlay,
  onDoubleTap,
}: {
  src: string;
  poster: string;
  muted: boolean;
  onTogglePlay: (playing: boolean) => void;
  onDoubleTap: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const lastTap = useRef(0);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  // Autoplay on mount, pause and clean up on unmount
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
    return () => {
      video.pause();
      video.currentTime = 0;
    };
  }, []);

  // Sync muted prop
  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      // Double tap
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
      }
      onDoubleTap();
    } else {
      clickTimeout.current = setTimeout(() => {
        const video = ref.current;
        if (!video) return;
        if (video.paused) {
          video.play().then(() => { setIsPlaying(true); onTogglePlay(true); }).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
          onTogglePlay(false);
        }
      }, 300);
    }
    lastTap.current = now;
  }, [onDoubleTap, onTogglePlay]);

  return (
    <div className="relative w-full h-full" onClick={handleClick}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        loop
        muted={muted}
        playsInline
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 pointer-events-none" />
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
          >
            <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-10 h-10 text-white fill-white ml-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

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
  const { language } = useApp();

  const t: any = translations[language as keyof typeof translations]?.feed || {};

  // Updated videos array with local imports
  const videos: Video[] = useMemo(() => [
    {
      id: 'video-1',
      videoUrl: video1,
      poster: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&q=80',
      title: 'Tecnología contra el plástico',
      author: 'OceanCleanup_ES',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      likes: 54102,
      comments: 1104,
      shares: 3410,
      description: 'Esta mega-máquina está limpiando la superficie del mar, recolectando toneladas de plástico al día. La tecnología al rescate de nuestros océanos.',
      audio: 'Sonido Original - Motor',
      caption: 'Un océano limpio es posible. 🌊🏭',
      commentsList: [
        { name: 'marcos_ingeniero', text: '¡Ojalá hubiera miles de barcos maquinarias como este en todos los océanos!', time: '1h', likes: 2130, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
        { name: 'ana_ecologia', text: 'Es un alivio ver esto, pero sigue siendo muy triste que lleguemos al punto de necesitarlo...', time: '2h', likes: 850, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { name: 'juan1995', text: '¿A dónde llevan todo ese plástico después de sacarlo?', time: '3h', likes: 112, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
      ]
    },
    {
      id: 'video-2',
      videoUrl: video2,
      poster: 'https://images.unsplash.com/photo-1551244852-d66e6c5fbd13?w=600&q=80',
      title: 'Nadando entre basura',
      author: 'MarineGuardians',
      authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
      likes: 124500,
      comments: 3201,
      shares: 15400,
      description: 'Una pobre tortuga marina nadando a través de una enorme sopa de plásticos. Las bolsas se confunden fácilmente con medusas (su alimento).',
      audio: 'Sonido ambiente - Submarino',
      caption: 'Di NO al plástico de un solo uso. 🐢💔',
      commentsList: [
        { name: 'carmela_sea', text: 'Se me rompe el corazón viendo cómo intenta apartar las bolsas con sus aletitas 😭', time: '4h', likes: 5410, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
        { name: 'scuba_master', text: 'Lamentablemente veo esto muy a menudo cuando buceo. Tenemos que despertar YA.', time: '5h', likes: 2100, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
      ]
    },
    {
      id: 'video-3',
      videoUrl: video3,
      poster: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&q=80',
      title: 'El reverso oscuro',
      author: 'DeepScubaDivers',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      likes: 45210,
      comments: 890,
      shares: 2100,
      description: 'Buceando bajo una auténtica isla de basura. Pese a la enorme contaminación, pequeños peces siguen intentando sobrevivir en este nuevo ecosistema artificial.',
      audio: 'Música Dramática - Tensión',
      caption: 'Lo que no vemos desde la playa no significa que no exista.',
      commentsList: [
        { name: 'diving_diary', text: 'Impresionante video. Qué agobio me ha entrado al ver al buceador abrirse paso.', time: '5h', likes: 450, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { name: 'ocean_lover99', text: 'Pobrecitos los peces pequeños buscando refugio entre nuestros desechos...', time: '6h', likes: 321, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
      ]
    },
    {
      id: 'video-4',
      videoUrl: video4,
      poster: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&q=80',
      title: 'El precio del agua',
      author: 'PlasticFreeWorld',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      likes: 76000,
      comments: 1120,
      shares: 9801,
      description: 'Miles de botellas de agua de plástico vacías flotando a la deriva y llegando a nuestras costas. Tardan hasta 500 años en descomponerse.',
      audio: 'Sonido Original - Olas',
      caption: 'Usa una cantimplora o botella reutilizable. Es muy fácil 💧',
      commentsList: [
        { name: 'sara_healthy', text: 'Qué locura... Yo ya uso un termo de acero inoxidable para todos lados.', time: '1d', likes: 1240, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
        { name: 'bio_marina', text: 'Ese plano de las botellas chocando entre sí es aterrador.', time: '1d', likes: 890, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      ]
    },
    {
      id: 'video-5',
      videoUrl: video5,
      poster: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=600&q=80',
      title: 'Nuestro único hogar',
      author: 'EarthLoversEdit',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      likes: 219800,
      comments: 4320,
      shares: 51200,
      description: 'Una pequeña pausa para recordarte lo increíble, vasto y perfecto que es nuestro planeta visto desde fuera. Tratemos de cuidarlo.',
      audio: 'Interstellar - Hans Zimmer Edits',
      caption: 'No existe el Planeta B. 🌍✨ #EarthEdit',
      commentsList: [
        { name: 'maria_astronomy', text: 'Me ha puesto los pelos de punta la transición con la música. Maravilloso edit.', time: '2d', likes: 6500, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
        { name: 'pablo_rs', text: 'A veces olvidamos lo diminutos que somos.', time: '2d', likes: 3100, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
      ]
    },
    {
      id: 'video-6',
      videoUrl: video6,
      poster: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
      title: 'Un rescate a tiempo',
      author: 'RescueSeaLife',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      likes: 315400,
      comments: 8900,
      shares: 41200,
      description: 'Encontramos a esta tortuga atrapada en plásticos y cuerdas fantasma, exhausta y casi sin poder respirar. Afortunadamente le salvamos la vida.',
      audio: 'Música Emotiva - Piano',
      caption: 'Todo el mundo puede ser un héroe si no mira hacia otro lado ❤️🐢',
      commentsList: [
        { name: 'lucia_vet', text: '¡Qué angustia al principio! Menos mal que llegasteis a tiempo. Sois unos héroes.', time: '3d', likes: 11200, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { name: 'sam_rescues', text: 'Lloré cuando cortan el plástico y finalmente puede huir libre hacia el coral 🥺', time: '3d', likes: 8940, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      ]
    },
    {
      id: 'video-7',
      videoUrl: video7,
      poster: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80',
      title: 'Caminando sobre deshechos',
      author: 'WildNatureBirds',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      likes: 85200,
      comments: 1120,
      shares: 3410,
      description: 'Una hermosa garza intentando buscar alimento en su charca habitual, hoy completamente invadida por envases, latas y residuos plásticos de la ciudad.',
      audio: 'Sonido Ambiente - Pájaros tristes',
      caption: 'Nuestros lagos y ríos sufren tanto como el mar. 🛑',
      commentsList: [
        { name: 'bosque_eterno', text: 'Qué indignante ver un animal tan bello rodeado de nuestra asquerosidad.', time: '4d', likes: 2110, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
        { name: 'senderista_pro', text: '¿Dónde está grabado esto? Yo mismo voy allí a limpiar este fin de semana.', time: '4d', likes: 1180, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      ]
    },
    {
      id: 'video-8',
      videoUrl: video8,
      poster: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
      title: 'Corales en peligro',
      author: 'ReefWatchers',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      likes: 67200,
      comments: 1120,
      shares: 4300,
      description: 'La barrera de coral se está blanqueando debido al aumento de las temperaturas. Necesitamos acción climática urgente.',
      audio: 'Sonido Ambiente - Burbujas',
      caption: 'Protejamos nuestros corales 🪸',
      commentsList: [
        { name: 'ocean_fan', text: 'Es muy triste ver esto en tiempo real.', time: '1d', likes: 800, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
      ]
    },
    {
      id: 'video-9',
      videoUrl: video9,
      poster: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?w=600&q=80',
      title: 'Delfines libres',
      author: 'OceanLife',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      likes: 154000,
      comments: 4500,
      shares: 12000,
      description: 'Una manada de delfines nadando libremente en mar abierto, lejos de la contaminación.',
      audio: 'Música Alegre - Naturaleza',
      caption: 'Libertad en el océano 🐬',
      commentsList: [
        { name: 'nature_lover', text: '¡Qué maravilla verlos en su hábitat natural!', time: '2d', likes: 2100, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
      ]
    },
    {
      id: 'video-10',
      videoUrl: video10,
      poster: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?w=600&q=80',
      title: 'Limpiando las playas',
      author: 'EcoWarriors',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      likes: 89000,
      comments: 2300,
      shares: 5600,
      description: 'Voluntarios trabajando duro para limpiar nuestras costas de plástico en las primeras horas de la mañana.',
      audio: 'Sonido Ambiente - Olas y trabajo',
      caption: 'Cada grano de arena cuenta 🏖️',
      commentsList: [
        { name: 'local_hero', text: 'Gracias a todos los que participaron hoy.', time: '5h', likes: 1500, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      ]
    },
    {
      id: 'video-11',
      videoUrl: video11,
      poster: 'https://images.unsplash.com/photo-1520286821217-06103135fd69?w=600&q=80',
      title: 'Misterios abisales',
      author: 'DeepDive',
      authorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
      likes: 112000,
      comments: 3400,
      shares: 8900,
      description: 'Criaturas extrañas que habitan en las profundidades del océano, un mundo apenas explorado pero que también necesita protección.',
      audio: 'Música Misteriosa - Profundidad',
      caption: 'Belleza en la oscuridad 🐙',
      commentsList: [
        { name: 'scifi_fan', text: 'Parecen alienígenas, es increíble lo poco que conocemos nuestro planeta.', time: '12h', likes: 3200, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      ]
    },
    {
      id: 'video-12',
      videoUrl: video12,
      poster: 'https://images.unsplash.com/photo-1555556275-68ff37895e7b?w=600&q=80',
      title: 'Rescate de ballena',
      author: 'WhaleRescue',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      likes: 245000,
      comments: 8900,
      shares: 21000,
      description: 'Equipo de rescate ayudando a una ballena atrapada en redes de pesca abandonadas. Su canto de agradecimiento nos puso los pelos de punta.',
      audio: 'Sonido Original - Canto de ballena',
      caption: 'Una segunda oportunidad 🐋',
      commentsList: [
        { name: 'animal_rights', text: 'No puedo dejar de llorar. Gracias por salvarla.', time: '1d', likes: 5400, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      ]
    },
    {
      id: 'video-13',
      videoUrl: video13,
      poster: 'https://images.unsplash.com/photo-1620055375427-4c12bb1bed32?w=600&q=80',
      title: 'Microplásticos',
      author: 'ScienceNow',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      likes: 67000,
      comments: 1500,
      shares: 9800,
      description: 'Lo que no vemos: el agua del océano está llena de microplásticos que los peces ingieren, contaminando la cadena alimenticia.',
      audio: 'Música Tensa - Documental',
      caption: 'Peligro invisible 🔍',
      commentsList: [
        { name: 'eco_student', text: 'Esto es algo que deberíamos enseñar en todas las escuelas.', time: '3d', likes: 1200, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      ]
    },
    {
      id: 'video-14',
      videoUrl: video14,
      poster: 'https://images.unsplash.com/photo-1518012674264-b0d5c8ebcd33?w=600&q=80',
      title: 'Tortuga bebé',
      author: 'TurtleHatch',
      authorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
      likes: 189000,
      comments: 4100,
      shares: 11000,
      description: 'El primer viaje de una tortuga bebé hacia el mar enfentando múltiples desafíos, agravados por la contaminación visual y la basura en las playas.',
      audio: 'Música Inspiradora - Nacimiento',
      caption: 'Pequeños pero valientes 🐢',
      commentsList: [
        { name: 'sea_breeze', text: '¡Vamos pequeña, tú puedes!', time: '2d', likes: 3100, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      ]
    },
    {
      id: 'video-15',
      videoUrl: video15,
      poster: 'https://images.unsplash.com/photo-1550993049-7c18c0c16b60?w=600&q=80',
      title: 'Aves marinas',
      author: 'BirdWatch',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      likes: 54000,
      comments: 800,
      shares: 3400,
      description: 'Las aves marinas también sufren las consecuencias de la basura en la superficie, confundiéndola con sus presas.',
      audio: 'Sonido Ambiente - Gaviotas',
      caption: 'Cuidado con lo que tiramos 🦅',
      commentsList: [
        { name: 'bird_lover', text: 'Duele mucho ver su hábitat así.', time: '5d', likes: 600, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
      ]
    },
    {
      id: 'video-16',
      videoUrl: video16,
      poster: 'https://images.unsplash.com/photo-1508670570624-91696df44ca6?w=600&q=80',
      title: 'Manglares vitales',
      author: 'MangroveSave',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      likes: 72000,
      comments: 950,
      shares: 4100,
      description: 'Los manglares son esenciales para proteger las costas y albergar vida marina. Su preservación es clave.',
      audio: 'Sonido Relajante - Bosque de manglares',
      caption: 'Salvar los manglares 🌱',
      commentsList: [
        { name: 'green_earth', text: 'Los grandes olvidados del ecosistema marino.', time: '1w', likes: 850, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      ]
    },
    {
      id: 'video-17',
      videoUrl: video17,
      poster: 'https://images.unsplash.com/photo-1532073994348-e8cb9a6ceb80?w=600&q=80',
      title: 'Reducir el consumo',
      author: 'ZeroWaste',
      authorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
      likes: 135000,
      comments: 2100,
      shares: 18000,
      description: 'Pequeños cambios diarios pueden reducir enormemente tu huella de plástico. Empieza hoy mismo reduciendo plásticos de un solo uso.',
      audio: 'Música Motivacional - Upbeat',
      caption: 'Cambia tus hábitos ♻️',
      commentsList: [
        { name: 'sustainable_life', text: 'Llevo 3 años sin bolsas de plástico. Es posible.', time: '2d', likes: 4500, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      ]
    },
    {
      id: 'video-18',
      videoUrl: video18,
      poster: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&q=80',
      title: 'El gigante azul',
      author: 'BluePlanet',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      likes: 298000,
      comments: 5400,
      shares: 32000,
      description: 'Nuestro planeta es mayoritariamente agua. Cuidar de él es cuidar de nosotros mismos y de las futuras generaciones.',
      audio: 'Música Épica - Cinematic',
      caption: 'Agua es vida 🌊',
      commentsList: [
        { name: 'deep_blue', text: 'Imágenes espectaculares. Necesitamos protegerlo a toda costa.', time: '1d', likes: 7200, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
      ]
    }
  ], []);

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

  const triggerHeartPop = () => {
    setShowHeartPop(true);
    setTimeout(() => setShowHeartPop(false), 900);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: currentVideo.title,
          text: `¡Mira esto en Human & Ocean! - ${currentVideo.title}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setShareFlash(true);
      setTimeout(() => setShareFlash(false), 1500);
    } catch (err) {
      console.log('Compartir cancelado o error:', err);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isLocked.current || Math.abs(e.deltaY) < 30) return;
      if (e.deltaY > 0) handleNext();
      else handlePrev();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked.current) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); handleNext(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); handlePrev(); }
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
            >
              <VideoItem
                src={currentVideo.videoUrl}
                poster={currentVideo.poster}
                muted={!volumeEnabled}
                onTogglePlay={() => {}}
                onDoubleTap={() => {
                  if (!isLiked) {
                    setLiked((prev) => ({ ...prev, [currentVideo.id]: true }));
                    triggerHeartPop();
                  }
                }}
              />

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