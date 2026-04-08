import { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  X,
  Thermometer,
  BarChart3,
  HelpCircle,
  RefreshCcw,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { useApp } from "../context/AppContext";
import { translations } from "../data/translations";

// Importación de las imágenes cargadas
import mapDark from "../assets/darkmodemap.png";
import mapLight from "../assets/lightmodemap.png";

interface MapPoint {
  id: string;
  x: number;
  y: number;
  type: "critical" | "warning" | "success";
  title: string;
  description: string;
  temperature?: number;
  pollutionLevel?: number;
  species?: number;
  lastUpdated?: string;
  trend?: "up" | "down" | "stable";
}

export function MapPage() {
  const [zoom, setZoom] = useState(1);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const controls = useAnimation();
  const { language, theme } = useApp();
  const t = translations[language].map;
  const aria = translations[language].aria.map;

  // Actualizar los límites de drag cuando cambia el zoom
  const updateDragConstraints = (newZoom: number) => {
    const maxDragDistance = 1000; // Aumentado para más libertad de movimiento
    const scaledDistance = maxDragDistance * (newZoom - 1);
    setDragConstraints({
      left: -scaledDistance,
      right: scaledDistance,
      top: -scaledDistance,
      bottom: scaledDistance,
    });
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 0.5, 3);
    setZoom(newZoom);
    updateDragConstraints(newZoom);
    controls.start({ scale: newZoom });
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 0.5, 1);
    setZoom(newZoom);
    updateDragConstraints(newZoom);
    controls.start({ scale: newZoom });
  };

  const handleZoomReset = () => {
    setZoom(1);
    updateDragConstraints(1);
    controls.start({ scale: 1, x: 0, y: 0 });
  };

  const mapPoints: MapPoint[] = [
    {
      id: "pacific-garbage",
      x: 10, y: 70, // Pacífico Central (entre América y Oceanía)
      type: "critical",
      title: t.mapPoints.pacificGarbage.title,
      description: t.mapPoints.pacificGarbage.description,
      temperature: 22.5, pollutionLevel: 94, species: 12, trend: "up",
    },
    {
      id: "arctic-melting",
      x: 30, y: 13, // Océano Ártico (arriba de Escandinavia/Rusia)
      type: "critical",
      title: t.mapPoints.arcticMelting.title,
      description: t.mapPoints.arcticMelting.description,
      temperature: 4.2, pollutionLevel: 15, species: 34, trend: "up",
    },
    {
      id: "gbr-bleaching",
      x: 88, y: 75, // Mar del Coral (Noreste de Australia)
      type: "warning",
      title: t.mapPoints.gbrBleaching.title,
      description: t.mapPoints.gbrBleaching.description,
      temperature: 28.1, pollutionLevel: 25, species: 1500, trend: "stable",
    },
    {
      id: "mediterranean-recovery",
      x: 48, y: 27, // Mar Mediterráneo (entre Europa y África)
      type: "warning",
      title: t.mapPoints.mediterraneanRecovery.title,
      description: t.mapPoints.mediterraneanRecovery.description,
      temperature: 20.4, pollutionLevel: 65, species: 210, trend: "down",
    },
    {
      id: "african-recovery",
      x: 40, y: 60,
      type: "critical",
      title: t.mapPoints.africanRecovery.title,
      description: t.mapPoints.africanRecovery.description,
      temperature: 20.4, pollutionLevel: 95, species: 210, trend: "down",
    },
    {
      id: "galapagos-success",
      x: 10, y: 55, // Pacífico Sur (Cerca de Galápagos/Chile)
      type: "success",
      title: t.mapPoints.galapagosSuccess.title,
      description: t.mapPoints.galapagosSuccess.description,
      temperature: 23.2, pollutionLevel: 5, species: 2900, trend: "up",
    },
    {
    id: "gulf-dead-zone",
    x: 18, y: 38,
    type: "critical",
    title: t.mapPoints.gulfDeadZone.title,
    description: t.mapPoints.gulfDeadZone.description,
    temperature: 27.2, pollutionLevel: 92, species: 40, trend: "up",
  },
  {
    id: "sargasso-sea",
    x: 28, y: 45,
    type: "warning",
    title: t.mapPoints.sargassoSea.title,
    description: t.mapPoints.sargassoSea.description,
    temperature: 24.5, pollutionLevel: 58, species: 110, trend: "up",
  },
  {
    id: "coral-triangle",
    x: 78, y: 60,
    type: "warning",
    title: t.mapPoints.coralTriangle.title,
    description: t.mapPoints.coralTriangle.description,
    temperature: 29.1, pollutionLevel: 45, species: 3000, trend: "down",
  },
  {
    id: "cabo-pulmo",
    x: 12, y: 42,
    type: "success",
    title: t.mapPoints.caboPulmo.title,
    description: t.mapPoints.caboPulmo.description,
    temperature: 25.8, pollutionLevel: 3, species: 800, trend: "up",
  },
  {
    id: "southern-ocean",
    x: 50, y: 92,
    type: "critical",
    title: t.mapPoints.southernOcean.title,
    description: t.mapPoints.southernOcean.description,
    temperature: -1.5, pollutionLevel: 7, species: 20, trend: "up",
  },
  {
    id: "chagos-success",
    x: 64, y: 68,
    type: "success",
    title: t.mapPoints.chagosSuccess.title,
    description: t.mapPoints.chagosSuccess.description,
    temperature: 28.3, pollutionLevel: 2, species: 1150, trend: "stable",
  }
  ];

  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const getPointColor = (type: MapPoint["type"]) => {
    switch (type) {
      case "critical": return "#ef4444";
      case "warning": return "#f59e0b";
      case "success": return "#22c55e";
    }
  };

  const MarkerShape = ({ type, color }: { type: MapPoint["type"]; color: string }) => {
    const baseStyle = { backgroundColor: color };
    if (type === "critical") return <div className="w-4 h-4 border border-white/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]" style={baseStyle} />;
    if (type === "warning") return <div className="w-5 h-5 shadow-[0_0_15px_rgba(245,158,11,0.5)]" style={{ ...baseStyle, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />;
    return <div className="w-4 h-4 rounded-full border border-white/50 shadow-[0_0_15px_rgba(34,197,94,0.5)]" style={baseStyle} />;
  };

  return (
    <div className={`min-h-screen pt-16 relative overflow-hidden transition-colors duration-700 ${theme === "dark" ? "bg-[#020617]" : "bg-slate-200"}`}>
      
      {/* ÁREA DE NAVEGACIÓN */}
      <div className="h-[calc(100vh-4rem)] w-full relative overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div
          className="relative w-full h-full"
          drag
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          animate={controls}
          initial={{ scale: 1, x: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* MAPA */}
          <img
            key={theme}
            src={theme === "dark" ? mapDark : mapLight}
            alt="Global Heatmap"
            className="w-full h-full object-cover select-none pointer-events-none"
            style={{ minWidth: '100%', minHeight: '100%' }}
            draggable={false}
          />

          {/* CAPA DE PUNTOS */}
          <div className="absolute inset-0 pointer-events-none">
            {mapPoints.map((point) => (
              <div
                key={point.id}
                className="absolute flex items-center justify-center"
                style={{ left: `${point.x}%`, top: `${point.y}%`, transform: "translate(-50%, -50%)", width: "40px", height: "40px" }}
              >
                <motion.button
                  className="pointer-events-auto relative flex items-center justify-center w-full h-full"
                  whileHover={{ scale: 1.5 }}
                  onClick={() => setSelectedPoint(point)}
                  title={`${aria.pointInfo}: ${point.title}`}
                  aria-label={`${aria.pointInfo}: ${point.title}`}
                >
                  <div 
                    className="absolute inset-0 animate-ping opacity-30"
                    style={{ 
                      backgroundColor: getPointColor(point.type),
                      borderRadius: point.type === "success" ? "100%" : "0%",
                      clipPath: point.type === "warning" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none"
                    }}
                  />
                  <MarkerShape type={point.type} color={getPointColor(point.type)} />
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* LEYENDA TIPO MENÚ / HAMBURGUESA */}
      <div className="absolute top-20 left-4 z-40">
        <button
          onClick={() => setShowLegend(!showLegend)}
          title={t.globalMonitor}
          aria-label={t.globalMonitor}
          className={`p-3 rounded-2xl border backdrop-blur-xl shadow-lg transition-all flex items-center gap-2 hover:scale-105 ${theme === "dark" ? "bg-[#0a192f]/90 border-white/20 text-white" : "bg-white/95 border-black/10 text-[var(--ocean-blue-accent)] hover:bg-blue-50"}`}
        >
          <Menu className="w-6 h-6" />
          <span className="text-sm font-bold hidden sm:inline">{t.globalMonitor}</span>
        </button>

        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`mt-2 p-5 rounded-3xl border backdrop-blur-xl shadow-2xl transition-colors min-w-[220px] origin-top-left ${theme === "dark" ? "bg-[#0a192f]/95 border-white/20" : "bg-white/95 border-slate-200"}`}
            >
              <h3 className={`text-[10px] uppercase font-black tracking-[0.25em] mb-4 ${theme === "dark" ? "text-cyan-400/80" : "text-[var(--ocean-blue-accent)]"}`}>{t.globalMonitor}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-[#ef4444] rounded-sm shadow-sm border border-red-300"></div>
                  <span className={`text-[12px] font-bold ${theme === "dark" ? "text-white/90" : "text-slate-700"}`}>{t.criticalZone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#f59e0b] shadow-sm border border-amber-300" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}></div>
                  <span className={`text-[12px] font-bold ${theme === "dark" ? "text-white/90" : "text-slate-700"}`}>{t.highRisk}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#22c55e] shadow-sm border border-green-300"></div>
                  <span className={`text-[12px] font-bold ${theme === "dark" ? "text-white/90" : "text-slate-700"}`}>{t.successProtected}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTÓN DE AYUDA */}
      <button
        onClick={() => setShowVideoModal(true)}
        title={aria.help}
        aria-label={aria.help}
        className={`absolute top-20 right-4 p-3 rounded-2xl border backdrop-blur-xl z-30 shadow-lg hover:scale-105 transition-all flex items-center gap-2 ${theme === "dark" ? "bg-[#0a192f]/90 border-white/20 text-white hover:bg-white/10" : "bg-white/95 border-black/10 text-[var(--ocean-blue-accent)] hover:bg-blue-50"}`}
      >
        <HelpCircle className="w-6 h-6" />
        <span className="text-sm font-bold hidden sm:inline">{t.helpButton}</span>
      </button>

      {/* CONTROLES */}
      <div className="absolute bottom-10 right-10 flex flex-col gap-3 z-30">
        <button 
          onClick={handleZoomIn} 
          title="Zoom In"
          aria-label="Zoom In"
          className={`p-4 rounded-2xl border transition-all shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl hover:scale-105 ${
            theme === "dark" 
              ? "bg-[#0a192f]/90 border-white/20 text-white hover:bg-white/10" 
              : "bg-white/95 border-black/10 text-[var(--ocean-blue-accent)] hover:bg-blue-50"
          }`}
        >
          <ZoomIn className="w-6 h-6" />
        </button>
        <button 
          onClick={handleZoomReset} 
          title="Reset Zoom"
          aria-label="Reset Zoom"
          className={`p-4 rounded-2xl border transition-all shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl hover:scale-105 ${
            theme === "dark" 
              ? "bg-[#0a192f]/90 border-white/20 text-white hover:bg-white/10" 
              : "bg-white/95 border-black/10 text-[var(--ocean-blue-accent)] hover:bg-blue-50"
          }`}
        >
          <RefreshCcw className="w-6 h-6" />
        </button>
        <button 
          onClick={handleZoomOut} 
          title="Zoom Out"
          aria-label="Zoom Out"
          className={`p-4 rounded-2xl border transition-all shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl hover:scale-105 ${
            theme === "dark" 
              ? "bg-[#0a192f]/90 border-white/20 text-white hover:bg-white/10" 
              : "bg-white/95 border-black/10 text-[var(--ocean-blue-accent)] hover:bg-blue-50"
          }`}
        >
          <ZoomOut className="w-6 h-6" />
        </button>
      </div>

      {/* MODAL DE INFO */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`absolute bottom-10 left-10 rounded-[2.5rem] w-80 shadow-2xl border overflow-hidden z-40 backdrop-blur-2xl ${theme === "dark" ? "bg-[#0a192f]/90 border-white/10" : "bg-white/95 border-slate-200"}`}>
            <div className="p-8">
              <button onClick={() => setSelectedPoint(null)} title={aria.closeInfo} aria-label={aria.closeInfo} className="absolute top-6 right-6 opacity-30 hover:opacity-100 transition-opacity">
                <X className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-slate-900"}`} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getPointColor(selectedPoint.type), boxShadow: `0 0 10px ${getPointColor(selectedPoint.type)}` }} />
                 <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${theme === "dark" ? "text-cyan-400" : "text-blue-600"}`}>{t.realTimeData}</span>
              </div>
              <h4 className={`font-bold text-xl mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{selectedPoint.title}</h4>
              <p className={`text-xs leading-relaxed mb-6 ${theme === "dark" ? "text-blue-100/60" : "text-slate-500"}`}>{selectedPoint.description}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className={`${theme === "dark" ? "bg-white/5" : "bg-slate-100"} p-4 rounded-2xl`}>
                  <div className="flex items-center gap-2 mb-1 opacity-50">
                    <Thermometer className="w-3 h-3" />
                    <span className="text-[8px] uppercase font-bold">{t.temp}</span>
                  </div>
                  <div className="text-lg font-bold">{selectedPoint.temperature}°C</div>
                </div>
                <div className={`${theme === "dark" ? "bg-white/5" : "bg-slate-100"} p-4 rounded-2xl`}>
                  <div className="flex items-center gap-2 mb-1 opacity-50">
                    <BarChart3 className="w-3 h-3" />
                    <span className="text-[8px] uppercase font-bold">{t.pollution}</span>
                  </div>
                  <div className="text-lg font-bold">{selectedPoint.pollutionLevel}%</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE VIDEO DE AYUDA */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl ${theme === "dark" ? "bg-[#0a192f]" : "bg-white"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideoModal(false)}
                title={aria.closeInfo}
                aria-label={aria.closeInfo}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all ${theme === "dark" ? "bg-white/10 hover:bg-white/20 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-900"}`}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/PXWec3gKoAk"
                  title="Video explicativo del mapa"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}