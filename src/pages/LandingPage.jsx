// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useInView, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Home, Users, KeyRound, Package, Wallet, Bot, Bell,
  ArrowRight, Sparkles, Shield, Brain, Building2, TrendingUp, Anchor,
  Database, Landmark, Settings, Search, CheckCircle2
} from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";

// Le logo est servi depuis public/ (voir note ci-dessous) : /SpatLogelogo.png
// correspond au fichier public/SpatLogelogo.png, pas a un import src/.
const logoUrl = "/SpatLogelogo.png";

const modules = [
  {
    id: "logements",
    title: "Gestion des Logements",
    subtitle: "Parc immobilier complet",
    desc: "Centralisez tous vos logements de fonction. Suivez leur etat, leur disponibilite et leur historique d'occupation en temps reel.",
    features: ["Types : F2, F3, F4, villas, studios","Etats : Neuf, bon, a renover, en maintenance","Photos et documents attaches","Historique complet des occupants"],
    icon: Home,
    color: "#10b981",
    colorClass: "emerald",
    position: "left",
    branchPath: "M 0 -80 Q -80 -120 -200 -140",
    labelPos: { x: -200, y: -165 },
  },
  {
    id: "employes",
    title: "Gestion des Employes",
    subtitle: "Profils et eligibilite",
    desc: "Gerez les fiches employes, leurs categories, anciennete et situation familiale pour une attribution equitable.",
    features: ["Categories : Cadre, Agent de maitrise, Execution","Verification automatique d'eligibilite","Situation familiale et nombre d'enfants","Historique des demandes de logement"],
    icon: Users,
    color: "#06b6d4",
    colorClass: "cyan",
    position: "right",
    branchPath: "M 0 -40 Q 90 -80 200 -100",
    labelPos: { x: 200, y: -125 },
  },
  {
    id: "attributions",
    title: "Attributions & Resiliations",
    subtitle: "Attribution intelligente",
    desc: "Attribuez automatiquement les logements selon le profil de l'employe. Generez les documents officiels en un clic.",
    features: ["Attribution selon categorie et anciennete","Generation de documents officiels","Resiliation avec motifs et dates","Alertes de fin de contrat"],
    icon: KeyRound,
    color: "#3b82f6",
    colorClass: "blue",
    position: "left",
    branchPath: "M 0 20 Q -100 60 -200 40",
    labelPos: { x: -200, y: 15 },
  },
  {
    id: "materiaux",
    title: "Gestion des Materiaux",
    subtitle: "Stock et approvisionnement",
    desc: "Suivez le stock de materiaux de construction et maintenance. Recevez des alertes avant la rupture de stock.",
    features: ["Catalogue : Tole, ciment, peinture, carreaux","Entrees et sorties de stock","Alertes automatiques de seuil minimum","Gestion des fournisseurs"],
    icon: Package,
    color: "#f59e0b",
    colorClass: "amber",
    position: "right",
    branchPath: "M 0 80 Q 110 120 200 100",
    labelPos: { x: 200, y: 75 },
  },
  {
    id: "depenses",
    title: "Depenses & Budget",
    subtitle: "Controle financier",
    desc: "Suivez les depenses par logement et globalement. Gerez les budgets avec des alertes a 80% et 100%.",
    features: ["Budget alloue vs depenses reelles","Alertes a 80% et 100% du budget","Validation par le responsable financier","Rapports PDF et Excel"],
    icon: Wallet,
    color: "#a855f7",
    colorClass: "purple",
    position: "left",
    branchPath: "M 0 160 Q -90 200 -200 220",
    labelPos: { x: -200, y: 195 },
  },
];

const colorStyles = {
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", glow: "shadow-emerald-500/20", from: "from-emerald-500", ring: "ring-emerald-500/30" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400", glow: "shadow-cyan-500/20", from: "from-cyan-500", ring: "ring-cyan-500/30" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", glow: "shadow-blue-500/20", from: "from-blue-500", ring: "ring-blue-500/30" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", glow: "shadow-amber-500/20", from: "from-amber-500", ring: "ring-amber-500/30" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", glow: "shadow-purple-500/20", from: "from-purple-500", ring: "ring-purple-500/30" },
};

// En dessous de 1024px (breakpoint `lg`, celui deja utilise partout dans le fichier pour les
// grandes icones), on desactive les animations 3D lourdes pensees pour desktop (essaim d'icones
// flottantes qui "dockent", cartes 3D du Hero) au profit de versions plus simples et legeres —
// meilleur pour la lisibilite sur petit ecran ET pour la performance de scroll sur telephone.
function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < breakpoint);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);
  return isMobile;
}

// ═══════════════════════════════════════════════════════════════
//  VAGUES LUMINEUSES
// ═══════════════════════════════════════════════════════════════
function LightWaves() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="30%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d="M -200 500 Q 200 300 500 450 T 1000 400 T 1600 500" fill="none" stroke="url(#waveGrad1)" strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 3, ease: "easeInOut" }} />
        <motion.path d="M -200 600 Q 300 400 600 550 T 1100 480 T 1600 600" fill="none" stroke="url(#waveGrad2)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 3.5, delay: 0.3, ease: "easeInOut" }} />
        <motion.path d="M -200 400 Q 250 600 550 450 T 1050 520 T 1600 400" fill="none" stroke="url(#waveGrad1)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.6 }} transition={{ duration: 4, delay: 0.6, ease: "easeInOut" }} />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PARTICULES
// ═══════════════════════════════════════════════════════════════
const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

function SparkleParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: p.id % 3 === 0 ? "#10b981" : p.id % 3 === 1 ? "#06b6d4" : "#3b82f6",
            boxShadow: `0 0 ${p.size * 4}px ${p.id % 3 === 0 ? "#10b981" : p.id % 3 === 1 ? "#06b6d4" : "#3b82f6"}`,
          }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CARTE 3D FLOTTANTE
// ═══════════════════════════════════════════════════════════════
function FloatingCard({ icon: Icon, label, color, className = "", delay = 0, rotateX = 10, rotateY = -10, width = 160 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${className}`} style={{ perspective: 1000 }}>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }} className="relative">
        <div className="relative rounded-2xl backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center gap-2"
          style={{ width, minHeight: 90, background: `linear-gradient(145deg, ${color}12, rgba(255,255,255,0.02))`,
            boxShadow: `0 20px 40px -10px ${color}30, 0 0 0 1px ${color}20, inset 0 1px 0 rgba(255,255,255,0.08)` }}>
          <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 45%)` }} />
          <Icon size={22} strokeWidth={1.5} style={{ color }} />
          <span className="text-[10px] text-gray-300 font-medium text-center px-2 leading-tight whitespace-pre-line">{label}</span>
          <div className="absolute -inset-px rounded-2xl pointer-events-none opacity-40"
            style={{ background: `linear-gradient(135deg, ${color}50, transparent 60%)`, mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "xor", padding: "1px" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Version compacte de la carte 3D, pensee pour tenir dans le flux normal de la page sur mobile
// (pas de position absolute, pas de "docking" au scroll) — juste un joli petit flottement continu.
function MiniCard3D({ icon: Icon, label, color, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800 }}>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", transform: "rotateX(8deg) rotateY(-10deg)" }} className="relative">
        <div className="relative rounded-xl backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center gap-1.5 w-[92px] h-[80px] sm:w-[108px] sm:h-[92px]"
          style={{ background: `linear-gradient(145deg, ${color}16, rgba(255,255,255,0.02))`,
            boxShadow: `0 14px 28px -8px ${color}35, 0 0 0 1px ${color}22, inset 0 1px 0 rgba(255,255,255,0.08)` }}>
          <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 45%)` }} />
          <Icon size={19} strokeWidth={1.5} style={{ color }} />
          <span className="text-[9px] text-gray-300 font-medium text-center px-1 leading-tight">{label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  DASHBOARD CENTRAL
// ═══════════════════════════════════════════════════════════════
function CentralDashboard() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.7, rotateX: 20 }} animate={{ opacity: 1, scale: 1, rotateX: 5 }} transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-[58%] top-[32%] z-20" style={{ perspective: 1200 }}>
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", transform: "rotateX(8deg) rotateY(-12deg)" }} className="relative">
        <div className="relative rounded-3xl backdrop-blur-2xl border border-white/10 p-5"
          style={{ width: 320,
            background: "linear-gradient(165deg, rgba(16,185,129,0.08), rgba(6,182,212,0.04), rgba(0,0,0,0.4))",
            boxShadow: `0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(16,185,129,0.15), 0 0 60px -10px rgba(16,185,129,0.2), inset 0 1px 0 rgba(255,255,255,0.06)` }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-gray-400 font-medium">Taux d&apos;Occupation</span>
            <div className="flex gap-1.5"><Settings size={10} className="text-gray-500" /><Search size={10} className="text-gray-500" /></div>
          </div>
          <div className="flex gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <motion.circle cx="50" cy="50" r="42" fill="none" stroke="url(#circleGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264"
                  initial={{ strokeDashoffset: 264 }} animate={{ strokeDashoffset: 264 - (264 * 0.85) }} transition={{ delay: 1, duration: 1.5, ease: "easeOut" }} />
                <defs><linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-white">85%</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-1.5 mb-1"><Bell size={9} className="text-amber-400" /><span className="text-[9px] text-gray-300 font-medium">Alertes Stocks</span></div>
                <div className="text-[8px] text-gray-500">Cables electriques — Bas</div>
                <CheckCircle2 size={10} className="text-emerald-400 mt-1" />
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[9px] text-gray-300 font-medium mb-1">Courbe d&apos;occupation</div>
                <svg viewBox="0 0 100 30" className="w-full h-6">
                  <motion.path d="M 0 25 Q 15 20 25 22 T 50 12 T 75 18 T 100 5" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 1.5 }} />
                  <defs><linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <div className="flex-1 p-2 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="text-[8px] text-gray-500">Disponibles</div>
              <div className="text-xs text-emerald-400 font-semibold">12</div>
            </div>
            <div className="flex-1 p-2 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="text-[8px] text-gray-500">Occupes</div>
              <div className="text-xs text-cyan-400 font-semibold">8</div>
            </div>
          </div>
        </div>
        <div className="absolute -inset-6 bg-emerald-500/10 rounded-[2rem] blur-3xl -z-10" />
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  HERO
// ═══════════════════════════════════════════════════════════════
function HeroSection() {
  const heroChips = [
    { icon: Building2, color: "#10b981", label: "Logements" },
    { icon: Users, color: "#06b6d4", label: "Employes" },
    { icon: KeyRound, color: "#3b82f6", label: "Attributions" },
    { icon: Package, color: "#f59e0b", label: "Materiaux" },
    { icon: Wallet, color: "#a855f7", label: "Depenses" },
  ];
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#070b10]">
      <LightWaves />
      <SparkleParticles />
      <ParticleBackground />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[350px] h-[350px] md:w-[700px] md:h-[700px] bg-emerald-900/10 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[280px] h-[280px] md:w-[500px] md:h-[500px] bg-cyan-900/8 rounded-full blur-[90px] md:blur-[120px]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center py-28 lg:py-0">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto lg:mx-0 px-6 sm:px-8 lg:px-0 lg:pl-20 xl:pl-28 text-center lg:text-left">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-4">SpatLoge</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light mb-8 md:mb-10 leading-relaxed">Gestion intelligente des<br />logements de fonction</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <button onClick={() => document.getElementById("logi-section")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-lg border border-emerald-500/40 text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all">
              Decouvrir
            </button>
          </motion.div>

          {/* Version mobile/tablette : mini cartes 3D (meme esprit que les grandes cartes desktop,
              en petit format) a la place des cartes 3D pleine taille qui debordent de l'ecran */}
          <div className="flex lg:hidden flex-wrap justify-center gap-3 mt-10">
            {heroChips.map((chip, i) => (
              <MiniCard3D key={chip.label} icon={chip.icon} label={chip.label} color={chip.color} delay={0.5 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {/* Version desktop : la scene 3D complete (cachee sur mobile/tablette, trop large et lourde) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{ perspective: 1200 }}>
        <FloatingCard icon={Building2} label="Gestion Logements" color="#10b981" className="left-[52%] top-[18%]" delay={0.2} rotateX={8} rotateY={-15} width={150} />
        <FloatingCard icon={TrendingUp} label="Suivi des Stocks" color="#06b6d4" className="left-[74%] top-[14%]" delay={0.35} rotateX={5} rotateY={-20} width={150} />
        <FloatingCard icon={Anchor} label="Attribution Employes" color="#3b82f6" className="left-[46%] top-[40%]" delay={0.5} rotateX={12} rotateY={-8} width={155} />
        <CentralDashboard />
        <FloatingCard icon={Database} label="Tableau de Bord
Temps Reel" color="#f59e0b" className="left-[78%] top-[42%]" delay={0.65} rotateX={6} rotateY={-18} width={155} />
        <FloatingCard icon={Landmark} label="Depenses & Budget" color="#a855f7" className="left-[50%] top-[66%]" delay={0.8} rotateX={10} rotateY={-12} width={155} />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CONFIG ICÔNES SCROLL
// ═══════════════════════════════════════════════════════════════
const floatingIconsConfig = [
  { id: "logi", Icon: Bot, color: "#C9A84C", size: 72, fromX: 10, fromY: 20, toX: 85, toY: 45, phaseIn: 0.06, phaseStart: 0.12, phaseEnd: 0.24, phaseStay: 0.30, phaseOut: 0.36, rotateDir: -1, floatDuration: 5 },
  { id: "logements", Icon: Home, color: "#10b981", size: 68, fromX: 88, fromY: 15, toX: 8, toY: 50, phaseIn: 0.22, phaseStart: 0.28, phaseEnd: 0.40, phaseStay: 0.46, phaseOut: 0.52, rotateDir: 1, floatDuration: 4.5 },
  { id: "employes", Icon: Users, color: "#06b6d4", size: 64, fromX: 5, fromY: 70, toX: 90, toY: 50, phaseIn: 0.38, phaseStart: 0.44, phaseEnd: 0.56, phaseStay: 0.62, phaseOut: 0.68, rotateDir: -1, floatDuration: 5.5 },
  { id: "attributions", Icon: KeyRound, color: "#3b82f6", size: 66, fromX: 90, fromY: 28, toX: 6, toY: 50, phaseIn: 0.54, phaseStart: 0.60, phaseEnd: 0.72, phaseStay: 0.78, phaseOut: 0.84, rotateDir: 1, floatDuration: 4 },
  { id: "materiaux", Icon: Package, color: "#f59e0b", size: 62, fromX: 12, fromY: 82, toX: 92, toY: 50, phaseIn: 0.70, phaseStart: 0.76, phaseEnd: 0.88, phaseStay: 0.94, phaseOut: 1.00, rotateDir: -1, floatDuration: 6 },
  { id: "depenses", Icon: Wallet, color: "#a855f7", size: 70, fromX: 86, fromY: 78, toX: 5, toY: 50, phaseIn: 0.86, phaseStart: 0.92, phaseEnd: 1.04, phaseStay: 1.10, phaseOut: 1.16, rotateDir: 1, floatDuration: 5 },
];

// petites fonctions de "rebond" (bounce) — un ressort amorti autour de 1
const clamp01 = (t) => Math.min(1, Math.max(0, t));
const lerp = (a, b, t) => a + (b - a) * t;
const bounceIn = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.exp(-5 * t) * Math.cos(t * 8));
const bounceLand = (t) => (t <= 0 ? 1 : t >= 1 ? 1 : 1 + 0.3 * Math.exp(-6 * t) * Math.cos(t * 9));

// Le timing n'est plus base sur des fractions de scroll devinees a l'avance : il est calcule
// EN DIRECT sur la position reelle a l'ecran de la grande icone cible. On "vise" des qu'elle est
// a ~1.05 hauteur d'ecran plus bas (donc encore hors champ), et on est deja "pose" quand elle
// atteint 55% de la hauteur d'ecran depuis le haut — donc bien avant que la section soit passee
// ou meme totalement centree. Diminuer l'ecart entre les deux rend le trajet plus rapide.
const APPEAR_VH = 1.05;
const LAND_VH = 0.55;
const approachOf = (rect) => {
  if (!rect) return null;
  const vh = window.innerHeight;
  const span = (APPEAR_VH - LAND_VH) * vh;
  const tRaw = (APPEAR_VH * vh - rect.top) / span;
  return { tRaw, t: clamp01(tRaw) };
};

// L'icone flottante grandit progressivement et va se "poser" exactement sur la
// position reelle de la grande icone de sa section (mesuree en direct via getTargetRect),
// puis rebondit legerement au moment de l'atterrissage avant de disparaitre :
// c'est a cet instant precis que la grande icone (dans ModuleSection) prend le relais.
// Hook partage : calcule la trajectoire (position, taille — largeur ET hauteur separement pour
// pouvoir viser un rectangle comme une carte de conversation, pas seulement un carre —,
// opacite et rebonds) en fonction de la position reelle de la cible a l'ecran.
function useDockingMotion(config, scrollProgress, getTargetRect) {
  const { size, fromX, fromY, toX, toY, phaseStart, phaseEnd, rotateDir } = config;

  const left = useMotionValue(0);
  const top = useMotionValue(0);
  const width = useMotionValue(size);
  const height = useMotionValue(size);
  const scale = useMotionValue(0);
  const opacity = useMotionValue(0);
  const rotateZ = useMotionValue(0);
  const rotateX = useMotionValue(22);
  const rotateY = useMotionValue(-18);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = getTargetRect ? getTargetRect() : null;
      const approach = approachOf(rect);

      const startPx = (fromX / 100) * vw;
      const startPy = (fromY / 100) * vh;

      let px, py, w, h, t, tRaw;
      if (approach) {
        ({ t, tRaw } = approach);
        const targetCx = rect.left + rect.width / 2;
        const targetCy = rect.top + rect.height / 2;
        px = lerp(startPx, targetCx, t);
        py = lerp(startPy, targetCy, t);
        w = lerp(size, rect.width, t);
        h = lerp(size, rect.height, t);
      } else {
        // secours si aucune grande icone/carte n'est enregistree pour cette cible :
        // on retombe sur l'ancien systeme base sur la progression globale du scroll.
        const v = scrollProgress.get();
        t = clamp01((v - phaseStart) / Math.max(0.0001, phaseEnd - phaseStart));
        tRaw = t;
        px = lerp(startPx, (toX / 100) * vw, t);
        py = lerp(startPy, (toY / 100) * vh, t);
        w = lerp(size, size * 1.15, t);
        h = w;
      }
      left.set(px);
      top.set(py);
      width.set(w);
      height.set(h);

      // opacite : invisible tant qu'on n'a pas commence a "viser" la cible,
      // disparait juste apres l'atterrissage (elle "devient" la grande version)
      const opIn = clamp01((tRaw + 0.06) / 0.06);
      const opOut = 1 - clamp01((tRaw - 1) / 0.05);
      opacity.set(tRaw < -0.06 ? 0 : Math.min(opIn, opOut));

      // rebond a l'entree (petit "pop" au coin) puis rebond a l'atterrissage
      const enterBounceT = clamp01((tRaw + 0.06) / 0.14);
      const landBounceT = clamp01((tRaw - 0.95) / 0.14);
      let s;
      if (tRaw < 0.05) s = 0.6 + 0.5 * bounceIn(enterBounceT);
      else if (tRaw >= 0.95) s = bounceLand(landBounceT);
      else s = lerp(0.95, 1, t);
      scale.set(tRaw > 1.12 ? 0 : s);

      const travelRot = lerp(0, 22 * rotateDir, t);
      const landRot = tRaw >= 0.95 ? -22 * rotateDir * Math.exp(-6 * landBounceT) * Math.cos(landBounceT * 9) : 0;
      rotateZ.set(tRaw < 0.05 ? 6 * rotateDir * (1 - enterBounceT) : travelRot + landRot);
      rotateX.set(lerp(22, -8, t));
      rotateY.set(lerp(-18, 12 * rotateDir, t));
    };

    compute();
    const unsub = scrollProgress.on("change", compute);
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { left, top, width, height, scale, opacity, rotateZ, rotateX, rotateY };
}

function FloatingIcon({ config, scrollProgress, getTargetRect }) {
  const { Icon, color, rotateDir, floatDuration } = config;
  const { left, top, width, height, scale, opacity, rotateZ, rotateX, rotateY } = useDockingMotion(config, scrollProgress, getTargetRect);
  const leftPx = useMotionTemplate`${left}px`;
  const topPx = useMotionTemplate`${top}px`;

  return (
    <motion.div className="fixed pointer-events-none"
      style={{ left: leftPx, top: topPx, width, height, x: "-50%", y: "-50%", rotateX, rotateY, rotateZ, scale, opacity, zIndex: 15, transformStyle: "preserve-3d", perspective: 1200 }}>
      <motion.div animate={{ y: [0, -14, 0], rotateZ: [0, 3 * rotateDir, 0] }} transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }} className="relative w-full h-full">
        <div className="absolute inset-0 rounded-2xl backdrop-blur-xl border border-white/15"
          style={{ background: `linear-gradient(145deg, ${color}22, ${color}06)`, boxShadow: `0 25px 50px -12px ${color}50, 0 0 0 1px ${color}25, inset 0 1px 1px rgba(255,255,255,0.08)` }} />
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 45%, transparent 50%)` }} />
        <div className="absolute -inset-px rounded-2xl pointer-events-none opacity-50"
          style={{ background: `linear-gradient(135deg, ${color}60, transparent 60%)`, mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "xor", padding: "1px" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ width: "55%", height: "55%" }}>
            <Icon style={{ width: "100%", height: "100%", color, filter: `drop-shadow(0 4px 10px ${color}70)` }} strokeWidth={1.3} />
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl -z-10 blur-xl opacity-30" style={{ background: color }} />
      </motion.div>
    </motion.div>
  );
}

// Icone flottante specifique a Logi : au lieu d'une icone generique, c'est une MINIATURE de la
// vraie capture de conversation (meme entete + memes bulles) qui grandit et va se poser
// exactement sur la vraie carte de conversation de la section Logi.
function FloatingChatPreview({ config, scrollProgress, getTargetRect }) {
  const { color, floatDuration } = config;
  const { left, top, width, height, scale, opacity, rotateZ, rotateX, rotateY } = useDockingMotion(config, scrollProgress, getTargetRect);
  const leftPx = useMotionTemplate`${left}px`;
  const topPx = useMotionTemplate`${top}px`;

  return (
    <motion.div className="fixed pointer-events-none overflow-hidden rounded-2xl border border-white/10"
      style={{
        left: leftPx, top: topPx, width, height, x: "-50%", y: "-50%",
        rotateX, rotateY, rotateZ, scale, opacity, zIndex: 15, transformStyle: "preserve-3d", perspective: 1200,
        background: "linear-gradient(180deg, #0a1929 0%, #0F2D56 100%)",
        boxShadow: `0 25px 60px -15px ${color}40, 0 0 0 1px ${color}25`,
      }}>
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }} className="w-full h-full flex flex-col">
        <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-white/5 bg-[#0F2D56]/60 flex-shrink-0">
          <div className="w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, #0F2D56, ${color})` }}>
            <Bot size={9} className="text-white" />
          </div>
          <div className="text-white text-[8px] font-bold leading-none">Logi</div>
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 p-2.5 space-y-1.5 overflow-hidden">
          <div className="max-w-[80%] px-2 py-1.5 rounded-lg rounded-tl-sm text-[7px] leading-snug" style={{ background: "rgba(26,74,122,0.45)", border: "1px solid rgba(201,168,76,0.12)", color: "#bfdbfe" }}>
            Bonjour ! Je suis Logi.
          </div>
          <div className="max-w-[75%] ml-auto px-2 py-1.5 rounded-lg rounded-tr-sm text-[7px] text-white font-medium" style={{ background: `linear-gradient(135deg, ${color}, #b8942a)` }}>
            sortie 11 toles...
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION LOGI
// ═══════════════════════════════════════════════════════════════
const logiCommands = [
  { cmd: "stock", desc: "Voir l'inventaire complet", color: "#f59e0b" },
  { cmd: "sortie 11 toles logement 5", desc: "Sortir du stock pour maintenance", color: "#10b981" },
  { cmd: "logements disponibles", desc: "Filtrer par statut", color: "#3b82f6" },
  { cmd: "met logement 3 en maintenance avec 10 toles", desc: "Lancer une maintenance", color: "#ef4444" },
  { cmd: "terminer reparation logement 3", desc: "Cloturer une reparation", color: "#06b6d4" },
  { cmd: "creer depense 10 ciments a 30000 Ar", desc: "Enregistrer une depense", color: "#a855f7" },
  { cmd: "attribuer logement 5 au service RH", desc: "Attribuer un logement", color: "#ec4899" },
  { cmd: "stats", desc: "Resume global instantane", color: "#C9A84C" },
];

function LogiSection({ smoothProgress, registerTarget }) {
  const ref = useRef(null);
  const boxRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const boxOpacity = useMotionValue(0);
  const boxScale = useMotionValue(0.55);

  useEffect(() => {
    const compute = () => {
      const rect = boxRef.current?.getBoundingClientRect();
      const approach = approachOf(rect);
      if (!approach) return;
      const { tRaw } = approach;
      boxOpacity.set(clamp01((tRaw - 0.9) / 0.08));
      const landBounceT = clamp01((tRaw - 0.95) / 0.16);
      boxScale.set(tRaw < 0.9 ? 0.55 : bounceLand(landBounceT));
    };
    compute();
    const unsub = smoothProgress.on("change", compute);
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={ref} id="logi-section" className="relative z-20 py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-[#C9A84C]/5 rounded-full blur-[140px]" />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold mb-6">
              <Sparkles size={14} /> Intelligence Artificielle
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#C9A84C] via-amber-300 to-[#C9A84C] bg-clip-text text-transparent">Logi</span>
              <br /><span className="text-white">Votre Assistant Admin</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
              Logi est un assistant conversationnel propulse par l&apos;IA qui permet aux
              <strong className="text-white"> administrateurs </strong>
              de gerer l&apos;ensemble de l&apos;application SpatLoge uniquement par la voix ou le texte.
            </p>
            <div className="space-y-5 mb-10">
              {[
                { icon: Brain, title: "Commandes naturelles", desc: "Parlez comme a un humain. Logi comprend le contexte et l&apos;ordre libre des mots." },
                { icon: Shield, title: "Acces Administrateur", desc: "Reserve aux comptes admin pour securiser les actions critiques (stock, depenses, attributions)." },
                { icon: Sparkles, title: "Intelligence contextuelle", desc: "Logi verifie les stocks, les statuts et les eligibilites avant chaque action." },
              ].map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + i * 0.15 }}
                  className="flex gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#C9A84C]/20 transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A84C]/20 transition-colors">
                    <f.icon size={20} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{f.title}</div>
                    <div className="text-gray-500 text-sm mt-1 leading-relaxed">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Admin Only
              </span>
              <span className="text-gray-600 text-xs">Disponible dans le tableau de bord</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60, rotateY: -15 }} animate={isInView ? { opacity: 1, x: 0, rotateY: -5 } : {}} transition={{ duration: 0.9, delay: 0.2 }}
            className="relative" style={{ perspective: 1200 }}>
            <motion.div
              ref={(node) => { boxRef.current = node; registerTarget?.("logi", node); }}
              className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative"
              style={{ background: "linear-gradient(180deg, #0a1929 0%, #0F2D56 100%)", transform: "rotateY(-5deg) rotateX(3deg)", transformStyle: "preserve-3d",
                boxShadow: "0 50px 100px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.1), 0 0 80px -20px rgba(201,168,76,0.15)",
                opacity: boxOpacity, scale: boxScale }}>
              <div className="px-5 py-4 flex items-center gap-3 border-b border-white/5 bg-[#0F2D56]/60 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F2D56] to-[#C9A84C] flex items-center justify-center shadow-lg">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-bold">Logi</div>
                  <div className="text-emerald-400 text-[10px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> En ligne — Pret
                  </div>
                </div>
                <div className="ml-auto flex gap-1"><div className="w-2 h-2 rounded-full bg-gray-600" /><div className="w-2 h-2 rounded-full bg-gray-600" /></div>
              </div>
              <div className="p-5 space-y-4 h-[340px] overflow-hidden relative">
                <div className="flex justify-start">
                  <div className="max-w-[88%] px-4 py-3 rounded-2xl rounded-tl-sm text-xs leading-relaxed" style={{ background: "rgba(26,74,122,0.45)", border: "1px solid rgba(201,168,76,0.12)", color: "#bfdbfe" }}>
                    Bonjour ! Je suis <strong style={{color:"#fde68a"}}>Logi</strong>. Que puis-je faire pour vous aujourd&apos;hui ?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs text-white font-medium" style={{ background: "linear-gradient(135deg, #C9A84C, #b8942a)" }}>
                    sortie 11 toles logement 5
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[92%] px-4 py-3 rounded-2xl rounded-tl-sm text-xs leading-relaxed space-y-1" style={{ background: "rgba(26,74,122,0.45)", border: "1px solid rgba(201,168,76,0.12)", color: "#bfdbfe" }}>
                    <div>✅ <strong style={{color:"#fde68a"}}>Sortie effectuee</strong></div>
                    <div>• Materiau : <strong>tole ondulee</strong></div>
                    <div>• Quantite : <strong>11 unites</strong></div>
                    <div>• Logement : <strong>5 — F3</strong></div>
                    <div>• Stock restant : <strong>89 unites</strong></div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs text-white font-medium" style={{ background: "linear-gradient(135deg, #C9A84C, #b8942a)" }}>
                    stats
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[92%] px-4 py-3 rounded-2xl rounded-tl-sm text-xs leading-relaxed space-y-1" style={{ background: "rgba(26,74,122,0.45)", border: "1px solid rgba(201,168,76,0.12)", color: "#bfdbfe" }}>
                    <div>📊 <strong style={{color:"#fde68a"}}>Resume general</strong></div>
                    <div>🏠 Logements : 12 dispo · 8 occupes · 2 maintenance</div>
                    <div>📦 Stock : 3 materiaux en alerte</div>
                    <div>🔔 Alertes : 5 en attente</div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex gap-3 border-t border-white/5 bg-[#0a1929]/80">
                <div className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center px-4 text-xs text-gray-500">Ecrivez une commande...</div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#1a4a7a] flex items-center justify-center shadow-lg">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </div>
            </motion.div>
            <div className="absolute -inset-8 bg-[#C9A84C]/8 rounded-[3rem] blur-3xl -z-10" />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.7 }} className="mt-24">
          <h3 className="text-center text-gray-500 text-xs uppercase tracking-[0.2em] mb-10">Commandes disponibles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {logiCommands.map((lc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 + i * 0.06 }}
                className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-default overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${lc.color}08, transparent)` }} />
                <code className="text-[11px] font-mono block mb-3 font-medium" style={{ color: lc.color }}>{lc.cmd}</code>
                <p className="text-gray-600 text-xs leading-relaxed">{lc.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SECTION MODULE
// ═══════════════════════════════════════════════════════════════
function ModuleSection({ module, index, smoothProgress, registerTarget }) {
  const ref = useRef(null);
  const boxRef = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-30% 0px -30% 0px" });
  const isLeft = module.position === "left";
  const c = colorStyles[module.colorClass];
  const Icon = module.icon;

  // La grande icone reste invisible (opacity 0) mais bien presente dans le DOM des le debut :
  // ca permet a FloatingIcon de mesurer sa position reelle (getBoundingClientRect) en continu,
  // meme avant que la section soit atteinte. Elle se base sur EXACTEMENT la meme geometrie
  // (approachOf) que la petite icone : elle apparait avec un rebond pile quand celle-ci atterrit.
  const boxOpacity = useMotionValue(0);
  const boxScale = useMotionValue(0.55);

  useEffect(() => {
    const compute = () => {
      const rect = boxRef.current?.getBoundingClientRect();
      const approach = approachOf(rect);
      if (!approach) return;
      const { tRaw } = approach;
      boxOpacity.set(clamp01((tRaw - 0.9) / 0.08));
      const landBounceT = clamp01((tRaw - 0.95) / 0.16);
      boxScale.set(tRaw < 0.9 ? 0.55 : bounceLand(landBounceT));
    };
    compute();
    const unsub = smoothProgress.on("change", compute);
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id={module.id} ref={ref} className="relative z-20 min-h-screen flex items-center px-6 md:px-16 py-16 md:py-20 scroll-mt-0">
      <div className={`w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isLeft ? "" : "lg:flex-row-reverse"}`}>
        <div className={`${isLeft ? "lg:pr-20" : "lg:pl-20 lg:order-2"} text-center lg:text-left`}>
          <motion.div initial={{ opacity: 0, x: isLeft ? -60 : 60 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: isLeft ? -20 : 20 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {/* Mini carte 3D, visible uniquement sur mobile/tablette : sur desktop la grande
                icone (a droite/gauche) prend deja ce role de facon plus spectaculaire. */}
            <div className="flex lg:hidden justify-center mb-5">
              <MiniCard3D icon={Icon} label={module.title.split(" ")[0]} color={module.color} delay={0.1} />
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${c.bg} border ${c.border} ${c.text} text-xs font-medium mb-4`}>
              <Icon size={14} /> Module {index + 1}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{module.title}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-sm mx-auto lg:max-w-none lg:mx-0">{module.desc}</p>
            <div className="space-y-3 mb-8">
              {module.features.map((feat, i) => (
                <motion.div key={feat} initial={{ opacity: 0, x: isLeft ? -20 : 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }} className="flex items-center justify-center lg:justify-start gap-3">
                  <div className={`w-5 h-5 rounded-full ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
                    <svg className={`w-3 h-3 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-gray-300 text-sm">{feat}</span>
                </motion.div>
              ))}
            </div>
            <Link to="/login" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${c.from} to-transparent border ${c.border} text-white font-medium hover:scale-105 transition-transform`}>
              Explorer {module.title} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
        <div className={`hidden lg:flex items-center justify-center ${isLeft ? "" : "lg:order-1"}`}>
          <motion.div
            ref={(node) => { boxRef.current = node; registerTarget?.(module.id, node); }}
            animate={isInView ? { rotateY: [0, 5, 0], rotateX: [0, -3, 0] } : {}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`relative w-72 h-72 rounded-3xl ${c.bg} border ${c.border} flex items-center justify-center shadow-2xl ${c.glow}`}
            style={{ transformStyle: "preserve-3d", opacity: boxOpacity, scale: boxScale }}>
            <motion.div animate={isInView ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 2, repeat: Infinity }}>
              <Icon size={80} strokeWidth={1} className={c.text} />
            </motion.div>
            <div className={`absolute inset-0 rounded-3xl ring-2 ${c.ring} opacity-0 ${isInView ? 'animate-pulse' : ''}`} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ARBRE SVG
// ═══════════════════════════════════════════════════════════════
function BranchNode({ mod, index, smoothProgress, onClick }) {
  const start = 0.05 + index * 0.18;
  const end = start + 0.15;
  const pathLength = useTransform(smoothProgress, [start, end], [0, 1]);
  const opacity = useTransform(smoothProgress, [start, end], [0.3, 1]);
  const scale = useTransform(smoothProgress, [0.05 + index * 0.18, 0.12 + index * 0.18], [0, 1]);
  const ringOpacity = useTransform(smoothProgress, [0.08 + index * 0.18, 0.15 + index * 0.18], [0, 0.4]);
  const ringScale = useTransform(smoothProgress, [0.08 + index * 0.18, 0.15 + index * 0.18], [0.5, 1.2]);
  return (
    <motion.g className="cursor-pointer pointer-events-auto" onClick={onClick} style={{ opacity }}>
      <motion.path d={mod.branchPath} fill="none" stroke={mod.color} strokeWidth="3" strokeLinecap="round" style={{ pathLength }} />
      <motion.circle cx={mod.labelPos.x} cy={mod.labelPos.y + 25} r="10" fill={mod.color} style={{ scale, opacity }} />
      <motion.circle cx={mod.labelPos.x} cy={mod.labelPos.y + 25} r="18" fill="none" stroke={mod.color} strokeWidth="1" style={{ opacity: ringOpacity, scale: ringScale }} />
      <motion.foreignObject x={mod.labelPos.x - 70} y={mod.labelPos.y - 10} width="140" height="30" style={{ opacity }}>
        <div className="text-xs font-bold text-center flex items-center justify-center gap-1.5" style={{ color: mod.color }}>
          <mod.icon size={12} /><span className="hover:underline cursor-pointer">{mod.title.split(" ")[0]}</span>
        </div>
      </motion.foreignObject>
      <path d={mod.branchPath} stroke="transparent" strokeWidth="25" fill="none" className="cursor-pointer" />
    </motion.g>
  );
}

function LeafNode({ y, index, smoothProgress }) {
  const opacity = useTransform(smoothProgress, [0.02 + index * 0.02, 0.06 + index * 0.02], [0, 0.4]);
  return <motion.circle cx={index % 2 === 0 ? -15 : 15} cy={y} r={4} fill="#10b981" style={{ opacity }} />;
}

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════
export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const trunkPathLength = useTransform(smoothProgress, [0, 0.08], [0, 1]);
  const trunkOpacity = useTransform(smoothProgress, [0, 0.05], [0, 0.9]);
  const rootsPathLength = useTransform(smoothProgress, [0.02, 0.1], [0, 1]);
  const centerOpacity = useTransform(smoothProgress, [0.03, 0.08], [0, 1]);
  const scrollToSection = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" }); };
  const isMobile = useIsMobile();

  // Registre partage des grandes icones (une par section) : chaque ModuleSection y enregistre
  // son element DOM, et chaque FloatingIcon vient y lire sa position reelle en direct pour
  // savoir exactement ou grandir et atterrir.
  const targetRefs = useRef({});
  const registerTarget = (id, node) => { if (node) targetRefs.current[id] = node; };
  const getTargetRect = (id) => () => targetRefs.current[id]?.getBoundingClientRect() ?? null;

  return (
    <div ref={containerRef} className="relative w-full bg-[#030508] font-sans text-white overflow-x-hidden">
      <ParticleBackground />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-emerald-600/8 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-cyan-600/6 rounded-full blur-[90px] md:blur-[130px]" />
      </div>

      {/* L'essaim d'icones flottantes "docking" est pense pour un grand ecran (elles visent des
          grandes icones qui n'existent que sur desktop, "hidden lg:flex"). Sur mobile/tablette on
          le desactive completement : rien a viser, et ca economise du calcul JS a chaque scroll. */}
      {!isMobile && floatingIconsConfig.map((cfg) => (
        cfg.id === "logi"
          ? <FloatingChatPreview key={cfg.id} config={cfg} scrollProgress={smoothProgress} getTargetRect={getTargetRect(cfg.id)} />
          : <FloatingIcon key={cfg.id} config={cfg} scrollProgress={smoothProgress} getTargetRect={getTargetRect(cfg.id)} />
      ))}

      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-12 py-3 md:py-4 bg-[#030508]/80 backdrop-blur-md border-b border-white/5"
      >
        <Link to="/" className="flex items-center flex-shrink-0">
          <div className="rounded-xl md:rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-1.5 sm:p-2 md:p-2.5 shadow-lg shadow-emerald-500/25">
            <img src={logoUrl} alt="SpatLoge" className="h-8 sm:h-10 md:h-12 lg:h-10 w-auto filter brightness-0 invert" />
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-sm">
          <span className="text-gray-500 hidden lg:inline text-xs xl:text-sm">Port de Toamasina, Madagascar</span>
          <Link to="/login" className="px-3 sm:px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all text-[11px] sm:text-xs whitespace-nowrap">Se Connecter</Link>
          <Link to="/register" className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-[11px] sm:text-xs font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-105 whitespace-nowrap">S&apos;inscrire</Link>
        </div>
      </motion.nav>

      <HeroSection />
      <LogiSection smoothProgress={smoothProgress} registerTarget={registerTarget} />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none w-[420px] h-[420px] sm:w-[700px] sm:h-[700px] md:w-[900px] md:h-[900px] opacity-10 sm:opacity-15 md:opacity-30">
        <svg viewBox="-450 -400 900 800" className="w-full h-full overflow-visible">
          <defs>
            <filter id="glow-green"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#065f46" /></linearGradient>
          </defs>
          <motion.path d="M 0 350 Q -10 175 0 0 Q 10 -150 0 -280" fill="none" stroke="url(#trunkGrad)" strokeWidth="12" strokeLinecap="round" style={{ pathLength: trunkPathLength, opacity: trunkOpacity }} />
          <motion.path d="M 0 350 Q -40 380 -80 370 M 0 350 Q 40 380 80 370 M 0 350 Q -20 390 -40 400" fill="none" stroke="#065f46" strokeWidth="4" strokeLinecap="round" style={{ pathLength: rootsPathLength, opacity: 0.5 }} />
          <motion.g style={{ opacity: centerOpacity }}>
            <circle cx="0" cy="0" r="50" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="2" filter="url(#glow-green)" />
            <text x="0" y="8" textAnchor="middle" fill="#10b981" fontSize="18" fontWeight="bold" fontFamily="sans-serif">SPAT</text>
            <text x="0" y="26" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">LOGEMENTS</text>
          </motion.g>
          {modules.map((mod, i) => (
            <BranchNode key={mod.id} mod={mod} index={i} smoothProgress={smoothProgress} onClick={() => scrollToSection(mod.id)} />
          ))}
          {[-120, -50, 60, 140].map((y, i) => (
            <LeafNode key={i} y={y} index={i} smoothProgress={smoothProgress} />
          ))}
        </svg>
      </div>

      <div className="relative z-20">
        {modules.map((mod, i) => (
          <ModuleSection
            key={mod.id}
            module={mod}
            index={i}
            smoothProgress={smoothProgress}
            registerTarget={registerTarget}
          />
        ))}
        <section className="relative z-20 py-16 md:py-24 px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-8 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent border border-emerald-500/20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pret a digitaliser votre gestion ?</h2>
            <p className="text-gray-400 mb-8">Rejoignez le Port de Toamasina et optimisez l&apos;attribution des logements de fonction.</p>
            <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-xl hover:scale-105 transition-transform">
              Commencer maintenant <ArrowRight size={18} />
            </Link>
          </motion.div>
        </section>
        <footer className="relative z-20 py-8 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 shadow-lg shadow-emerald-500/25">
                <img src={logoUrl} alt="SpatLoge" className="h-8 sm:h-9 w-auto filter brightness-0 invert" />
              </div>
            </div>
            <p className="text-xs text-gray-600">© 2026 SPAT — Port de Toamasina, Madagascar</p>
          </div>
        </footer>
      </div>
    </div>
  );
}