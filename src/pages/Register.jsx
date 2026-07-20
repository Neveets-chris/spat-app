// src/pages/Register.jsx
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Sparkles,
  UserPlus,
  CheckCircle2,
  Hexagon,
  Circle,
  Triangle,
  Square,
  Waves
} from "lucide-react";

// ============================================
// COMPOSANT D'ANIMATION BACKGROUND BLEU
// ============================================
function AnimatedBackground({ isDark }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.3;
        const rand = Math.random();
        if (rand < 0.7) {
          this.color = '#0F2D56';
        } else if (rand < 0.9) {
          this.color = '#1a4a7a';
        } else {
          this.color = '#C9A84C';
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    const init = () => {
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
      }
    };
    
    const animate = () => {
      const gradient = isDark 
        ? 'rgba(15, 45, 86, 0.15)' 
        : 'rgba(230, 240, 255, 0.3)';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            ctx.beginPath();
            ctx.strokeStyle = '#0F2D56';
            ctx.globalAlpha = 0.15 * (1 - distance / 200);
            ctx.lineWidth = 1.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    resize();
    init();
    animate();
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: isDark 
          ? 'linear-gradient(135deg, #0a1929 0%, #0F2D56 30%, #1a4a7a 70%, #0F2D56 100%)' 
          : 'linear-gradient(135deg, #e6f0ff 0%, #d4e4f7 30%, #c8dcf0 70%, #e6f0ff 100%)' 
      }}
    />
  );
}

// ============================================
// FORMES GÉOMÉTRIQUES BLEUES ANIMÉES
// ============================================
function FloatingShapes({ isDark }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 right-10 w-64 h-64 animate-float-slow">
        <div className={`w-full h-full rounded-3xl ${isDark ? 'bg-[#0F2D56]/30' : 'bg-[#0F2D56]/10'} backdrop-blur-xl border-2 ${isDark ? 'border-[#1a4a7a]/50' : 'border-[#0F2D56]/20'}`} />
      </div>
      
      <div className="absolute top-1/3 left-10 w-48 h-48 animate-float-medium delay-500">
        <div className={`w-full h-full rounded-2xl ${isDark ? 'bg-[#1a4a7a]/25' : 'bg-[#1a4a7a]/15'} backdrop-blur-lg border ${isDark ? 'border-[#0F2D56]/40' : 'border-[#1a4a7a]/30'}`} />
      </div>
      
      <div className="absolute bottom-20 right-1/4 w-56 h-56 animate-float-slow delay-1000">
        <div className={`w-full h-full rounded-full ${isDark ? 'bg-[#0F2D56]/20' : 'bg-[#0F2D56]/8'} backdrop-blur-xl border-2 ${isDark ? 'border-[#C9A84C]/20' : 'border-[#0F2D56]/15'}`} />
      </div>
      
      <div className="absolute top-20 left-1/3 w-32 h-32 animate-float-medium">
        <Hexagon className={`w-full h-full ${isDark ? 'text-[#1a4a7a]/40' : 'text-[#0F2D56]/20'} fill-current`} />
      </div>
      
      <div className="absolute bottom-1/3 left-20 w-24 h-24 animate-float-fast">
        <Circle className={`w-full h-full ${isDark ? 'text-[#0F2D56]/50' : 'text-[#1a4a7a]/25'} stroke-current`} strokeWidth={1} />
      </div>
      
      <div className="absolute top-1/2 right-20 w-20 h-20 animate-float-slow delay-700">
        <Triangle className={`w-full h-full ${isDark ? 'text-[#1a4a7a]/30' : 'text-[#0F2D56]/15'} fill-current`} />
      </div>
      
      <div className="absolute bottom-40 left-1/3 w-16 h-16 animate-float-medium delay-300">
        <Square className={`w-full h-full ${isDark ? 'text-[#0F2D56]/40' : 'text-[#1a4a7a]/20'} fill-current`} />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-40">
        <Waves className={`w-full h-full ${isDark ? 'text-[#1a4a7a]' : 'text-[#0F2D56]'} animate-wave`} />
      </div>
    </div>
  );
}

// ============================================
// HOOK POUR DÉTECTION DU THÈME
// ============================================
function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const isDark = useDarkMode();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { 
      setError("Les mots de passe ne correspondent pas."); 
      return; 
    }
    setError("");
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  // const getFieldIcon = (field) => {
  //   switch(field) {
  //     case 'username': return User;
  //     case 'email': return Mail;
  //     case 'password': return Lock;
  //     case 'confirm': return CheckCircle2;
  //     default: return User;
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <AnimatedBackground isDark={isDark} />
      <FloatingShapes isDark={isDark} />

      <div 
        className="relative z-10 w-full max-w-md mx-4 perspective-1000"
        style={{
          transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div 
          className="absolute -inset-3 rounded-3xl blur-2xl opacity-40"
          style={{
            background: `linear-gradient(135deg, #0F2D56 0%, #1a4a7a 50%, #0F2D56 100%)`,
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        
        <div className={`relative ${isDark ? 'bg-[#0F2D56]/70' : 'bg-[#0F2D56]/85'} backdrop-blur-2xl rounded-3xl border-2 ${isDark ? 'border-[#1a4a7a]/60' : 'border-[#1a4a7a]/40'} shadow-2xl overflow-hidden`}>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-80" />
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#1a4a7a]/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#0F2D56]/50 to-transparent rounded-full blur-2xl" />
          
          <div className="relative p-8 text-center">
            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#1a4a7a]/50 animate-spin-slow" />
              <div className="absolute inset-2 rounded-full border border-[#C9A84C]/30 animate-spin-reverse" />
              
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#0F2D56] to-[#1a4a7a] p-3 shadow-xl border border-[#C9A84C]/30">
                <UserPlus className="w-full h-full text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
              Créer un compte
            </h1>
            <p className="text-blue-200/80 text-sm font-medium">
              Rejoignez-nous dès maintenant
            </p>
          </div>

          <div className="px-8 pb-8 space-y-5">
            {error && (
              <div className="relative overflow-hidden rounded-xl bg-rose-500/20 border border-rose-500/40 p-3 animate-shake backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-400" />
                  <p className="text-sm text-rose-200 font-medium">
                    {error}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#1a4a7a] to-[#C9A84C] rounded-xl opacity-0 group-focus-within:opacity-50 blur transition duration-500 ${focusedField === 'username' ? 'opacity-50' : ''}`} />
                
                <div className="relative flex items-center">
                  <div className={`absolute left-3 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 z-10 ${
                    focusedField === 'username' 
                      ? 'bg-gradient-to-br from-[#C9A84C] to-[#1a4a7a] text-white shadow-lg' 
                      : 'bg-[#1a4a7a]/50 text-blue-200'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  
                  <input
                    type="text"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Nom d'utilisateur"
                    className="w-full bg-[#0F2D56]/50 border-2 border-[#1a4a7a]/50 rounded-xl pl-16 pr-4 py-3.5 text-white placeholder:text-blue-300/50 focus:border-[#C9A84C] focus:bg-[#0F2D56]/70 focus:outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#1a4a7a] to-[#C9A84C] rounded-xl opacity-0 group-focus-within:opacity-50 blur transition duration-500 ${focusedField === 'email' ? 'opacity-50' : ''}`} />
                
                <div className="relative flex items-center">
                  <div className={`absolute left-3 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 z-10 ${
                    focusedField === 'email' 
                      ? 'bg-gradient-to-br from-[#C9A84C] to-[#1a4a7a] text-white shadow-lg' 
                      : 'bg-[#1a4a7a]/50 text-blue-200'
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Email"
                    className="w-full bg-[#0F2D56]/50 border-2 border-[#1a4a7a]/50 rounded-xl pl-16 pr-4 py-3.5 text-white placeholder:text-blue-300/50 focus:border-[#C9A84C] focus:bg-[#0F2D56]/70 focus:outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#1a4a7a] to-[#C9A84C] rounded-xl opacity-0 group-focus-within:opacity-50 blur transition duration-500 ${focusedField === 'password' ? 'opacity-50' : ''}`} />
                
                <div className="relative flex items-center">
                  <div className={`absolute left-3 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 z-10 ${
                    focusedField === 'password' 
                      ? 'bg-gradient-to-br from-[#C9A84C] to-[#1a4a7a] text-white shadow-lg' 
                      : 'bg-[#1a4a7a]/50 text-blue-200'
                  }`}>
                    <Lock className="w-5 h-5" />
                  </div>
                  
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Mot de passe"
                    className="w-full bg-[#0F2D56]/50 border-2 border-[#1a4a7a]/50 rounded-xl pl-16 pr-12 py-3.5 text-white placeholder:text-blue-300/50 focus:border-[#C9A84C] focus:bg-[#0F2D56]/70 focus:outline-none transition-all duration-300"
                    required
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#1a4a7a]/50 transition-colors text-blue-300 hover:text-[#C9A84C]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#1a4a7a] to-[#C9A84C] rounded-xl opacity-0 group-focus-within:opacity-50 blur transition duration-500 ${focusedField === 'confirm' ? 'opacity-50' : ''}`} />
                
                <div className="relative flex items-center">
                  <div className={`absolute left-3 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 z-10 ${
                    focusedField === 'confirm' 
                      ? 'bg-gradient-to-br from-[#C9A84C] to-[#1a4a7a] text-white shadow-lg' 
                      : 'bg-[#1a4a7a]/50 text-blue-200'
                  }`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={form.confirm}
                    onChange={e => setForm({ ...form, confirm: e.target.value })}
                    onFocus={() => setFocusedField('confirm')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Confirmer le mot de passe"
                    className="w-full bg-[#0F2D56]/50 border-2 border-[#1a4a7a]/50 rounded-xl pl-16 pr-12 py-3.5 text-white placeholder:text-blue-300/50 focus:border-[#C9A84C] focus:bg-[#0F2D56]/70 focus:outline-none transition-all duration-300"
                    required
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#1a4a7a]/50 transition-colors text-blue-300 hover:text-[#C9A84C]"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Bouton d'inscription */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#0F2D56] via-[#1a4a7a] to-[#0F2D56] p-3.5 font-bold text-white shadow-xl border border-[#C9A84C]/30 hover:border-[#C9A84C]/60 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 mt-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
                      Inscription...
                    </>
                  ) : (
                    <>
                      S'inscrire
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Lien de connexion */}
            <div className="relative text-center pt-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1a4a7a] to-transparent" />
              </div>
              
              <span className="relative inline-block px-4 bg-transparent">
                <p className="text-sm text-blue-200/70">
                  Déjà un compte ?{' '}
                  <Link 
                    to="/login" 
                    className="text-[#C9A84C] font-bold hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    Se connecter
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </span>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-30px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 20s linear infinite; }
        .animate-wave { animation: wave 10s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
}