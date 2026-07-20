// src/components/SplashScreen.jsx
import { useState, useEffect, useRef } from "react";

export default function SplashScreen({ children }) {
  const [phase, setPhase] = useState("intro");
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  const letters = ["S", "P", "A", "T"];

  const hasSeenSplash = typeof window !== "undefined" && sessionStorage.getItem("splashSeen") === "true";

  useEffect(() => {
    if (hasSeenSplash) {
      setPhase("done");
      return;
    }

    const timers = [
      setTimeout(() => setPhase("lettersIn"), 300),
      setTimeout(() => setPhase("lettersOut"), 2400),
      setTimeout(() => setPhase("explosion"), 3200),
      setTimeout(() => setPhase("paintRoll"), 3800),
      // Rouleau fini vers ~6.5s (vitesse augmentée)
      setTimeout(() => setPhase("textBounce"), 7200),
      // Barre 1.8s après le texte
      setTimeout(() => setPhase("progressBar"), 9200),
      setTimeout(() => setPhase("fadeOut"), 12400),
      setTimeout(() => {
        setPhase("done");
        sessionStorage.setItem("splashSeen", "true");
      }, 13200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [hasSeenSplash]);

  useEffect(() => {
    if (phase !== "progressBar") return;
    let start = null;
    const duration = 2800;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(Math.floor(pct));
      if (elapsed < duration) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [phase]);

  useEffect(() => {
    if (phase !== "explosion" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const drops = [];
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 10 + Math.random() * 20;
      drops.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        size: 6 + Math.random() * 20,
        color: ['#C9A84C', '#E8D070', '#F5E6A0', '#D4A830', '#B89020'][Math.floor(Math.random() * 5)],
        life: 1,
      });
    }

    const splats = [];
    for (let i = 0; i < 30; i++) {
      splats.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 20 + Math.random() * 80,
        opacity: 0,
        targetOpacity: 0.15 + Math.random() * 0.25,
        delay: Math.random() * 30,
      });
    }

    let frame = 0;
    const animate = () => {
      const paintCoverage = Math.min(1, frame / 60);
      ctx.fillStyle = `rgba(201, 168, 76, ${paintCoverage * 0.85})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      splats.forEach(s => {
        if (frame > s.delay) {
          s.opacity = Math.min(s.targetOpacity, s.opacity + 0.02);
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 208, 112, ${s.opacity})`;
        ctx.fill();
      });

      drops.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.4;
        d.life -= 0.008;
        d.vx *= 0.98;

        if (d.y > canvas.height - 40) {
          d.vy *= -0.2;
          d.vx *= 0.5;
          ctx.beginPath();
          ctx.arc(d.x, canvas.height - 20, d.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = d.color;
          ctx.globalAlpha = d.life * 0.6;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size * d.life, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.life;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(d.x - d.vx * 3, d.y - d.vy * 3);
        ctx.lineTo(d.x, d.y);
        ctx.strokeStyle = d.color;
        ctx.lineWidth = d.size * 0.4;
        ctx.globalAlpha = d.life * 0.4;
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      frame++;
      if (frame < 120) requestAnimationFrame(animate);
    };
    animate();
  }, [phase]);

  useEffect(() => {
    if (phase !== "paintRoll" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    let y = -100;
    const speed = 7; // ← VITESSE AUGMENTÉE (était 4)
    const rollWidth = 130;
    const rollHeight = 75;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = '#0F2D56';
      ctx.fillRect(0, 0, w, y + rollHeight);

      const gradient = ctx.createLinearGradient(0, y - 30, 0, y + rollHeight + 50);
      gradient.addColorStop(0, '#0F2D56');
      gradient.addColorStop(0.35, '#1a3a5a');
      gradient.addColorStop(0.65, '#2a4a6a');
      gradient.addColorStop(1, 'rgba(201,168,76,0.2)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, y - 30, w, rollHeight + 80);

      ctx.fillStyle = 'rgba(201, 168, 76, 0.85)';
      ctx.fillRect(0, y + rollHeight + 50, w, h - (y + rollHeight + 50));

      const rx = w / 2 - rollWidth / 2;

      ctx.fillStyle = '#2a4a6a';
      ctx.fillRect(w / 2 - 6, y - 55, 12, 60);

      ctx.strokeStyle = '#C9A84C';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(w / 2 - 32, y - 12);
      ctx.quadraticCurveTo(w / 2, y - 24, w / 2 + 32, y - 12);
      ctx.stroke();
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(w / 2 - 32, y - 12);
      ctx.lineTo(w / 2 - 32, y + 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(w / 2 + 32, y - 12);
      ctx.lineTo(w / 2 + 32, y + 5);
      ctx.stroke();

      const rollGrad = ctx.createLinearGradient(rx, y, rx + rollWidth, y + rollHeight);
      rollGrad.addColorStop(0, '#A08030');
      rollGrad.addColorStop(0.3, '#C9A84C');
      rollGrad.addColorStop(0.7, '#E8D070');
      rollGrad.addColorStop(1, '#A08030');
      ctx.fillStyle = rollGrad;

      ctx.beginPath();
      ctx.moveTo(rx + 10, y);
      ctx.lineTo(rx + rollWidth - 10, y);
      ctx.quadraticCurveTo(rx + rollWidth, y, rx + rollWidth, y + 10);
      ctx.lineTo(rx + rollWidth, y + rollHeight - 10);
      ctx.quadraticCurveTo(rx + rollWidth, y + rollHeight, rx + rollWidth - 10, y + rollHeight);
      ctx.lineTo(rx + 10, y + rollHeight);
      ctx.quadraticCurveTo(rx, y + rollHeight, rx, y + rollHeight - 10);
      ctx.lineTo(rx, y + 10);
      ctx.quadraticCurveTo(rx, y, rx + 10, y);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.moveTo(rx + 15 + i * 14, y + 8);
        ctx.lineTo(rx + 15 + i * 14, y + rollHeight - 8);
        ctx.stroke();
      }

      if (Math.random() > 0.5) {
        const gx = rx + 20 + Math.random() * (rollWidth - 40);
        const gy = y + rollHeight + 20 + Math.random() * 40;
        ctx.beginPath();
        ctx.arc(gx, gy, 3 + Math.random() * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#C9A84C';
        ctx.fill();
      }

      y += speed;
      if (y < h + 100) {
        requestAnimationFrame(animate);
      } else {
        ctx.fillStyle = '#0F2D56';
        ctx.fillRect(0, 0, w, h);
      }
    };
    animate();
  }, [phase]);

  if (phase === "done") return children;

  const isYellowBg = phase === "explosion";
  const isOriginalBg = phase === "paintRoll" || phase === "textBounce" || phase === "progressBar" || phase === "fadeOut";

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${
        phase === "fadeOut" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: isYellowBg
          ? '#C9A84C'
          : isOriginalBg
            ? '#0F2D56'
            : '#0F2D56',
      }}
    >
      {(phase === "explosion" || phase === "paintRoll") && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-20"
        />
      )}

      {phase === "intro" && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1929] via-[#0F2D56] to-[#1a4a7a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-3xl animate-pulse" />
        </div>
      )}

      {phase === "lettersIn" && (
        <div className="relative flex flex-col items-center justify-center z-10">
          <div className="flex items-center justify-center gap-2">
            {letters.map((letter, idx) => (
              <span
                key={idx}
                className="text-8xl md:text-[10rem] font-black inline-block"
                style={{
                  color: idx % 2 === 0 ? '#C9A84C' : '#ffffff',
                  textShadow: '0 0 50px rgba(201,168,76,0.5), 0 8px 30px rgba(0,0,0,0.4)',
                  animation: 'letterUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                  animationDelay: `${idx * 120}ms`,
                  opacity: 0,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          <span
            className="text-2xl md:text-4xl font-bold tracking-[0.5em] uppercase mt-2"
            style={{
              color: '#C9A84C',
              textShadow: '0 0 20px rgba(201,168,76,0.4)',
              animation: 'logeUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              animationDelay: '600ms',
              opacity: 0,
            }}
          >
            Loge
          </span>
        </div>
      )}

      {phase === "lettersOut" && (
        <div className="relative flex flex-col items-center justify-center z-10">
          <div className="flex items-center justify-center gap-2">
            {letters.map((letter, idx) => (
              <span
                key={idx}
                className="text-8xl md:text-[10rem] font-black inline-block"
                style={{
                  color: idx % 2 === 0 ? '#C9A84C' : '#ffffff',
                  textShadow: '0 0 50px rgba(201,168,76,0.5)',
                  animation: 'letterDown 0.5s cubic-bezier(0.55, 0, 1, 0.45) forwards',
                  animationDelay: `${idx * 60}ms`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          <span
            className="text-2xl md:text-4xl font-bold tracking-[0.5em] uppercase mt-2"
            style={{
              color: '#C9A84C',
              animation: 'logeDown 0.5s cubic-bezier(0.55, 0, 1, 0.45) forwards',
              animationDelay: '300ms',
            }}
          >
            Loge
          </span>
        </div>
      )}

      {(phase === "explosion" || phase === "paintRoll" || phase === "textBounce" || phase === "progressBar") && (
        <div
          className="absolute flex flex-col items-center justify-center z-30"
          style={{
            top: '30%',
            animation: phase === "explosion" ? 'logoPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
            opacity: phase === "explosion" ? 0 : 1,
          }}
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <img
              src="/SpatLogelogo.png"
              alt="Spat Loge"
              className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(201,168,76,0.7)]"
            />
            <div className="absolute -inset-4 rounded-full border-2 border-[#C9A84C]/30 animate-spin-slow" />
          </div>
        </div>
      )}

      {(phase === "textBounce" || phase === "progressBar") && (
        <div
          className="absolute flex flex-col items-center z-30"
          style={{ top: '52%' }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold text-white tracking-wide"
            style={{
              animation: phase === "textBounce" ? 'textBounceIn 1.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
              opacity: phase === "textBounce" ? 0 : 1,
            }}
          >
            <span className="text-[#C9A84C]">Préparation</span>{' '}
            <span className="text-white">de votre espace</span>
          </h2>
        </div>
      )}

      {phase === "progressBar" && (
        <div
          className="absolute flex flex-col items-center z-30"
          style={{ top: '65%' }}
        >
          <div className="relative w-72 h-3 bg-[#0a1929] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C9A84C] via-[#E8D070] to-[#C9A84C] rounded-full relative"
              style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="miniRoll" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C9A84C" />
                      <stop offset="100%" stopColor="#E8D070" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="4" width="20" height="16" rx="4" fill="url(#miniRoll)" />
                  <ellipse cx="12" cy="4" rx="10" ry="2" fill="#E8D070" />
                  <ellipse cx="12" cy="20" rx="10" ry="2" fill="#A08030" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[#C9A84C] font-mono text-xl font-bold">
            {progress}%
          </div>

          <div className="absolute -z-10 w-40 h-40 rounded-full border border-dashed border-[#1a4a7a]/30 animate-spin-slow" />
          <div className="absolute -z-10 w-48 h-48 rounded-full border border-dotted border-[#0F2D56]/20 animate-spin-reverse-slower" />
        </div>
      )}

      <style>{`
        @keyframes letterUp {
          0% { opacity: 0; transform: translateY(120px) scale(0.5); }
          60% { opacity: 1; transform: translateY(-10px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes logeUp {
          0% { opacity: 0; transform: translateY(80px) scale(0.6); }
          60% { opacity: 1; transform: translateY(-6px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes letterDown {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(150px) scale(0.6); }
        }
        @keyframes logeDown {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(100px) scale(0.6); }
        }
        @keyframes logoPop {
          0% { opacity: 0; transform: scale(0) rotate(-180deg); }
          70% { opacity: 1; transform: scale(1.1) rotate(10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes textBounceIn {
          0% { opacity: 0; transform: translateX(400px); }
          20% { opacity: 1; transform: translateX(-40px); }
          35% { transform: translateX(25px); }
          50% { transform: translateX(-15px); }
          65% { transform: translateX(8px); }
          80% { transform: translateX(-4px); }
          90% { transform: translateX(2px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slower {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-spin-reverse-slower { animation: spin-reverse-slower 14s linear infinite; }
      `}</style>
    </div>
  );
}