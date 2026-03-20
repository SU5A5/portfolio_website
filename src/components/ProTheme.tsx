import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Shield, 
  Briefcase, 
  ChevronRight, 
  Github, 
  Mail,
  Database,
  Brain,
  Code,
  Award,
  GraduationCap,
  FileText,
  Phone,
  Linkedin,
  Check,
  ExternalLink
} from 'lucide-react';

interface ProThemeProps {
  toggleTheme: () => void;
}

export default function ProTheme({ toggleTheme }: ProThemeProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [glitchState, setGlitchState] = useState<'idle' | 'warning' | 'bat'>('idle');
  const [glitchFrame, setGlitchFrame] = useState(0);

  // Joker Card State
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const peekStageRef = useRef(0);
  const [isJokerModalOpen, setIsJokerModalOpen] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Joker Card Scroll Logic
  useEffect(() => {
    const updateCardOnScroll = () => {
      if (isCollapsing || isJokerModalOpen) return;
      
      const scrollY = window.scrollY;
      const totalH = document.body.scrollHeight - window.innerHeight;
      if (totalH <= 0) return;
      
      const pct = scrollY / totalH;
      const cardWrap = cardWrapRef.current;
      if (!cardWrap) return;

      if (pct > 0.08 && peekStageRef.current < 1) {
        peekStageRef.current = 1;
        cardWrap.style.bottom = '-120px';
        cardWrap.style.transform = 'translateX(-50%) rotate(-12deg)';

        setTimeout(() => {
          if (peekStageRef.current === 1) {
            cardWrap.style.bottom = '-200px';
          }
        }, 2200);
      }

      if (pct > 0.30 && peekStageRef.current < 2) {
        peekStageRef.current = 2;
        cardWrap.style.bottom = '-50px';

        setTimeout(() => { cardWrap.style.transform = 'translateX(-50%) rotate(6deg)'; }, 0);
        setTimeout(() => { cardWrap.style.transform = 'translateX(-50%) rotate(-6deg)'; }, 600);
        setTimeout(() => { cardWrap.style.transform = 'translateX(-50%) rotate(3deg)'; }, 1000);
        setTimeout(() => {
          if (peekStageRef.current === 2) {
            cardWrap.style.bottom = '-200px';
          }
        }, 1600);
      }

      if (pct > 0.55 && peekStageRef.current < 3) {
        peekStageRef.current = 3;
        cardWrap.style.bottom = '20px';
        cardWrap.style.transform = 'translateX(-50%) rotate(-3deg)';

        setTimeout(() => { cardWrap.style.transform = 'translateX(-50%) rotate(3deg)'; }, 800);
        setTimeout(() => { cardWrap.style.transform = 'translateX(-50%) rotate(-2deg)'; }, 1400);
        setTimeout(() => { cardWrap.style.transform = 'translateX(-50%) rotate(0deg)'; }, 2000);
      }
    };

    window.addEventListener('scroll', updateCardOnScroll);
    return () => window.removeEventListener('scroll', updateCardOnScroll);
  }, [isCollapsing, isJokerModalOpen]);

  const openJokerModal = () => {
    if (peekStageRef.current < 3) return;
    setIsJokerModalOpen(true);
  };

  const acceptJoker = () => {
    setIsJokerModalOpen(false);
    
    const cardWrap = cardWrapRef.current;
    if (cardWrap) {
      cardWrap.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
      cardWrap.style.transform = 'translateX(-50%) rotate(720deg) scale(0) translateY(-200px)';
      cardWrap.style.opacity = '0';
    }

    setTimeout(triggerCollapse, 500);
  };

  const triggerCollapse = () => {
    setIsCollapsing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Offscreen canvas to draw the bat shape
    const offscreen = document.createElement('canvas');
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const octx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!octx) return;

    const fontSize = Math.min(canvas.width, canvas.height) * 0.8;
    octx.font = `${fontSize}px sans-serif`;
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.fillText('🦇', canvas.width / 2, canvas.height / 2);

    const imgData = octx.getImageData(0, 0, canvas.width, canvas.height).data;

    const pixelSize = 12;
    const cols = Math.ceil(canvas.width / pixelSize);
    const rows = Math.ceil(canvas.height / pixelSize);
    
    const pixels: any[] = [];
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = Math.floor(x * pixelSize + pixelSize / 2);
        const py = Math.floor(y * pixelSize + pixelSize / 2);
        const alphaIndex = (py * canvas.width + px) * 4 + 3;
        
        const isBat = imgData[alphaIndex] > 128;
        
        let color = '';
        if (isBat) {
          const rand = Math.random();
          color = rand > 0.7 ? '#000000' : (rand > 0.3 ? '#1e293b' : '#0f172a');
        } else {
          const rand = Math.random();
          color = rand > 0.8 ? '#e2e8f0' : (rand > 0.4 ? '#f1f5f9' : '#f8fafc');
        }
        
        pixels.push({
          x: x * pixelSize,
          y: y * pixelSize,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          gravity: 0.15 + Math.random() * 0.2,
          alpha: 0,
          targetAlpha: 1,
          color: color,
          isBat: isBat,
          appearDelay: Math.random() * 60, // 0 to 1s
          fallDelay: isBat ? 90 + Math.random() * 30 : 180 + Math.random() * 60, // Bat: 1.5s-2s, Bg: 3s-4s
          state: 'waiting'
        });
      }
    }

    let frame = 0;
    let bgAlpha = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fade in black background before background pixels fall
      if (frame > 150) {
        bgAlpha = Math.min(1, bgAlpha + 0.03);
      }
      if (bgAlpha > 0) {
        ctx.fillStyle = `rgba(10, 10, 10, ${bgAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      let allDead = true;
      
      pixels.forEach(p => {
        if (p.state === 'waiting' && frame > p.appearDelay) {
          p.state = 'appearing';
        }
        if (p.state === 'appearing') {
          p.alpha += 0.05;
          if (p.alpha >= p.targetAlpha) {
            p.alpha = p.targetAlpha;
            p.state = 'static';
          }
        }
        
        if ((p.state === 'static' || p.state === 'appearing') && frame > p.fallDelay) {
          p.state = 'falling';
        }
        
        if (p.state === 'falling') {
          p.vy += p.gravity;
          p.y += p.vy;
          p.x += p.vx;
          p.alpha = Math.max(0, p.alpha - 0.005);
        }
        
        if (p.alpha > 0 && p.y < canvas.height + 50) {
          allDead = false;
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          // Draw slightly larger to avoid subpixel gaps
          ctx.fillRect(p.x - 0.5, p.y - 0.5, pixelSize + 1, pixelSize + 1);
        }
      });
      
      ctx.globalAlpha = 1;
      frame++;
      
      if (!allDead && frame < 400) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();

    setTimeout(() => {
      toggleTheme();
    }, 5500);
  };

  // Random Cursor Glitch Easter Egg
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let warningId: NodeJS.Timeout;
    let batId: NodeJS.Timeout;

    const scheduleGlitch = () => {
      // Random time between 3s and 5s
      const timeUntilGlitch = Math.random() * 2000 + 3000;
      
      timeoutId = setTimeout(() => {
        setGlitchState('warning');
        
        // Warning glitch lasts for 0.4s
        warningId = setTimeout(() => {
          setGlitchState('bat');
          
          // Bat lasts for 0.6s
          batId = setTimeout(() => {
            setGlitchState('idle');
            scheduleGlitch(); // Schedule the next one
          }, 600);
        }, 400);
      }, timeUntilGlitch);
    };

    scheduleGlitch();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      clearTimeout(batId);
    };
  }, []);

  // Glitch animation frame cycler
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (glitchState === 'warning') {
      intervalId = setInterval(() => {
        setGlitchFrame(prev => (prev + 1) % 4);
      }, 50); // Change frame every 50ms
    }
    return () => clearInterval(intervalId);
  }, [glitchState]);

  const warningCursors = [
    `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><path d='M2 2L9.5 21L12.5 13.5L20 10.5L2 2Z' fill='black' stroke='white' stroke-width='1.5' style='filter: drop-shadow(3px 0 red) drop-shadow(-3px 0 cyan); transform: skew(-20deg);'/></svg>")`,
    `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><path d='M2 2L9.5 21L12.5 13.5L20 10.5L2 2Z' fill='black' stroke='white' stroke-width='1.5' style='filter: drop-shadow(-4px 0 magenta) drop-shadow(4px 0 lime); transform: skew(30deg) translate(2px, -2px);'/></svg>")`,
    `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><path d='M2 2L9.5 21L12.5 13.5L20 10.5L2 2Z' fill='black' stroke='white' stroke-width='1.5' style='filter: drop-shadow(0px 3px blue) drop-shadow(0px -3px yellow); transform: scale(1.2) translate(-2px, 2px);'/></svg>")`,
    `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><path d='M2 2L9.5 21L12.5 13.5L20 10.5L2 2Z' fill='black' stroke='white' stroke-width='1.5' style='filter: drop-shadow(5px 0 red); transform: skew(-10deg) scale(0.8);'/></svg>")`
  ];

  const handleNameClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      toggleTheme();
      setClickCount(0);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToast(`${label} copied to clipboard!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className={`min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white relative ${isCollapsing ? 'overflow-hidden' : ''}`}>
      {/* Canvas for Pixel Collapse */}
      <canvas 
        ref={canvasRef} 
        className={`fixed inset-0 z-[100] pointer-events-none transition-opacity duration-500 ${isCollapsing ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Joker Card */}
      <div 
        ref={cardWrapRef}
        id="card-wrap"
        className={`fixed left-1/2 z-40 cursor-pointer ${isCollapsing ? 'pointer-events-none' : ''}`}
        style={{
          bottom: '-200px',
          transform: 'translateX(-50%) rotate(-8deg)',
          transition: 'bottom 0.9s cubic-bezier(0.34, 1.3, 0.64, 1), transform 0.6s ease-in-out, opacity 0.5s',
          width: '120px',
          height: '180px',
        }}
        onClick={openJokerModal}
      >
        <div className="w-full h-full bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-4 border-white flex items-center justify-center overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-green-100 opacity-50"></div>
          <img 
            src="/joker.png" 
            alt="Joker" 
            className="w-full h-full object-cover relative z-10"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <span className="hidden text-6xl relative z-10 drop-shadow-md">🤡</span>
          <div className="absolute top-2 left-2 text-red-500 font-bold text-lg leading-none z-20">J</div>
          <div className="absolute bottom-2 right-2 text-red-500 font-bold text-lg leading-none rotate-180 z-20">J</div>
        </div>
      </div>

      {/* Joker Modal */}
      <AnimatePresence>
        {isJokerModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.7, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-green-500 to-purple-500"></div>
              
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                <img 
                  src="/joker.png" 
                  alt="Joker" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-5xl">🤡</span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">Why so serious?</h3>
              <p className="text-slate-600 mb-8">Ready to see the real world?</p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={acceptJoker}
                  className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-purple-600/20"
                >
                  Ha ha ha... Yes
                </button>
                <button 
                  onClick={() => setIsJokerModalOpen(false)}
                  className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-medium transition-colors"
                >
                  No, I like it here
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global style to force the cursor during a glitch */}
      {glitchState === 'warning' && (
        <style>{`
          * {
            cursor: ${warningCursors[glitchFrame]}, auto !important;
          }
        `}</style>
      )}
      {glitchState === 'bat' && (
        <style>{`
          * {
            cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' style='font-size:24px'><text y='24'>🦇</text></svg>"), auto !important;
          }
        `}</style>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-xl flex items-center gap-3"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleNameClick}
              className="font-semibold text-lg tracking-tight text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer select-none"
              title="Suhas Gajanana"
            >
              Suhas Gajanana
            </button>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-600 transition-colors">Skills</button>
            <button onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-600 transition-colors">Experience</button>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-600 transition-colors">Projects</button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-600 transition-colors">Contact</button>
          </div>
          <div className="flex items-center gap-4">
            <a href="/resume.pdf" download className="hidden md:flex items-center gap-2 bg-slate-900 text-white hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              <FileText className="w-4 h-4" /> Resume
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        
        {/* Hero Section */}
        <section className="min-h-[70vh] flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Available for new opportunities
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
              AI/ML Engineer building scalable intelligence.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-10 max-w-2xl">
              I specialize in Generative AI, scalable RAG pipelines, and predictive modeling. I turn complex data challenges into robust, production-ready solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                View Projects <ChevronRight className="w-4 h-4" />
              </button>
              <a 
                href="/resume.pdf" download
                className="bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" /> Download Resume
              </a>
              <div className="flex items-center gap-2 ml-4">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/suhasgajanana" target="_blank" rel="noreferrer" className="p-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 border-t border-slate-200">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Technical Expertise</h2>
            <p className="text-slate-600 max-w-2xl">Core competencies across the machine learning lifecycle and modern software engineering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Machine Learning & AI", desc: "TensorFlow, Deep Learning, Generative AI (RAG, LLMs, Prompt Engineering), LLM APIs (OpenAI, Mistral, Qwen).", icon: Brain },
              { title: "Data Engineering", desc: "Vector Databases (Qdrant), Apache Kafka, Flink, SQL, Data Wrangling, Pandas, NumPy.", icon: Database },
              { title: "Software & Ops", desc: "Python, JavaScript, React, CI/CD (GitHub Actions), Docker, Playwright QA Automation.", icon: Code }
            ].map((skill, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <skill.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{skill.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 border-t border-slate-200">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Work Experience</h2>
          </div>

          <div className="space-y-8">
            {[
              {
                role: "AIML Engineer",
                company: "Viamagus",
                date: "May 2024 - Present",
                desc: "Architected scalable RAG pipelines using open-source LLMs, Kafka, Flink, and Qdrant. Automated resume evaluation with Streamlit, reducing manual review time by 80%. Developed GitHub Actions CI/CD workflows and Playwright QA automation."
              },
              {
                role: "Industrial Trainer & PM",
                company: "TIE IT Consulting Services",
                date: "Aug 2024 - Jan 2025",
                desc: "Led training programs in Machine Learning and Deep Learning. Supervised project execution, mentored interns, and optimized solutions for real-world readiness."
              },
              {
                role: "Machine Learning Intern",
                company: "Varcons Technologies Pvt Ltd",
                date: "Aug 2023 - Sept 2023",
                desc: "Developed sentiment analysis models (Logistic Regression, Naive Bayes, Random Forest) achieving up to 86% accuracy. Enhanced performance through advanced data pre-processing techniques."
              }
            ].map((job, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h3 className="text-xl font-semibold text-slate-900">{job.role}</h3>
                    <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{job.date}</span>
                  </div>
                  <h4 className="text-indigo-600 font-medium mb-4">{job.company}</h4>
                  <p className="text-slate-600 leading-relaxed">{job.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 border-t border-slate-200">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-slate-600 max-w-2xl">A selection of recent work focusing on predictive analytics and machine learning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                name: "Vector F1 Decision Support", 
                type: "Predictive Analytics & Streaming",
                tech: ["Random Forest", "XGBoost", "Apache Kafka"],
                metrics: "Real-time telemetry processing"
              },
              { 
                name: "Customer Churn Prediction", 
                type: "Classification Model",
                tech: ["Logistic Regression", "KNN", "ROC/AUC"],
                metrics: "Achieved ~92% Accuracy"
              },
              { 
                name: "Taxi Operations Insights", 
                type: "Statistical Analysis",
                tech: ["Linear Regression", "Pandas", "SciPy"],
                metrics: "R² Score = 0.86"
              },
              { 
                name: "ANPR System", 
                type: "Computer Vision",
                tech: ["OpenCV", "Python"],
                metrics: "Automated license plate recognition"
              }
            ].map((project, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{project.name}</h3>
                  <ExternalLink className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm font-medium text-indigo-600 mb-2">{project.type}</p>
                <p className="text-slate-600 text-sm mb-6">{project.metrics}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, j) => (
                    <span key={j} className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certs */}
        <section className="py-20 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Education</h2>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-semibold text-slate-900 mb-1">BE in Artificial Intelligence & Machine Learning</h4>
                <p className="text-indigo-600 font-medium mb-4">City Engineering College</p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>2020 - 2024</span>
                  <span className="font-medium text-slate-900 bg-slate-100 px-3 py-1 rounded-full">CGPA: 8.5/10</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Certifications</h2>
              </div>
              
              <div className="flex flex-col gap-3">
                {[
                  "Fundamentals of AI Agents Using RAG and LangChain (IBM)",
                  "Deep Learning with TensorFlow (IBM)",
                  "SQL for Data Science (UC Davis)",
                  "Google Advanced Data Analytics (Google)",
                  "AI Product Management (Duke University)"
                ].map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 border-t border-slate-200">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Get in Touch</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Open to new opportunities and collaborations. Feel free to reach out.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <button onClick={() => copyToClipboard('suhasgajanana08@gmail.com', 'Email')} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col items-center justify-center gap-4 group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-center">
                <span className="block text-sm font-medium text-slate-900 mb-1">Email</span>
                <span className="text-sm text-slate-500">suhasgajanana08@gmail.com</span>
              </div>
            </button>
            
            <button onClick={() => copyToClipboard('+1 (234) 567-890', 'Phone')} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col items-center justify-center gap-4 group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-center">
                <span className="block text-sm font-medium text-slate-900 mb-1">Phone</span>
                <span className="text-sm text-slate-500">+1 (234) 567-890</span>
              </div>
            </button>

            <a href="https://linkedin.com/in/suhasgajanana" target="_blank" rel="noreferrer" className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col items-center justify-center gap-4 group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="text-center">
                <span className="block text-sm font-medium text-slate-900 mb-1">LinkedIn</span>
                <span className="text-sm text-slate-500">/in/suhasgajanana</span>
              </div>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Suhas Gajanana. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/suhasgajanana" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">LinkedIn</a>
          </div>
        </footer>

      </main>
    </div>
  );
}
