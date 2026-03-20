import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Shield,
  Crosshair,
  Briefcase,
  Lock,
  ChevronRight,
  Github,
  Mail,
  Activity,
  Database,
  Brain,
  Code,
  Award,
  GraduationCap,
  FileText,
  Phone,
  Linkedin,
  Check,
  Sun
} from 'lucide-react';

interface BatmanThemeProps {
  toggleTheme: () => void;
}

export default function BatmanTheme({ toggleTheme }: BatmanThemeProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToast(`${label} copied to clipboard!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-bat-red selection:text-white relative bg-bat-black">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-bat-red text-white px-6 py-3 font-mono text-xs tracking-widest uppercase border border-white/20 shadow-lg shadow-bat-red/20 flex items-center gap-3"
          >
            <Check className="w-4 h-4" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar - Tactical HUD style */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-bat-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            {/* Custom Logo Placeholder */}
            <button onClick={toggleTheme} className="w-12 h-12 flex items-center justify-center bg-bat-gray border border-white/10 relative overflow-hidden group cursor-pointer" title="Switch to Professional Theme">
              <div className="absolute inset-0 border-l-2 border-bat-red transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              {!logoError ? (
                <img 
                  src="/batman-logo.png" 
                  alt="Logo" 
                  className="w-8 h-8 object-contain opacity-90 group-hover:opacity-100 relative z-10 logo-red-hue"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <img src="/batman.png" alt="Logo" className="w-8 h-8 object-contain relative z-10 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] logo-red-hue" />
              )}
            </button>
            <span className="font-display font-bold tracking-widest text-lg uppercase text-white">
              SG_Terminal
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
            <button onClick={() => document.getElementById('core-directives')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/60 hover:text-white transition-colors">Skills</button>
            <button onClick={() => document.getElementById('service-records')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/60 hover:text-white transition-colors">Experience</button>
            <button onClick={() => document.getElementById('case-files')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/60 hover:text-white transition-colors">Projects</button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/60 hover:text-white transition-colors">Contact</button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 border border-white/20 bg-white/5 text-white/70 hover:text-white hover:border-white/40 px-4 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300"
            >
              <Sun className="w-4 h-4" />
              Light
            </button>
            <a href="/resume.pdf" download className="hidden md:flex items-center gap-2 border border-bat-red/50 bg-bat-red/10 text-bat-red hover:bg-bat-red hover:text-white px-4 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300">
              <FileText className="w-4 h-4" /> Resume
            </a>
            <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] text-white/70 tracking-widest ml-4 border-l border-white/10 pl-4">
              <span className="flex items-center gap-2 text-bat-red"><Activity className="w-3 h-3" /> SYS.ONLINE</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-8"
            >
              <div className="font-mono text-bat-red text-xs tracking-widest mb-6 flex items-center gap-3">
                <Terminal className="w-4 h-4" />
                <span>/// IDENTITY_CONFIRMED: SUHAS_GAJANANA</span>
              </div>
              
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter mb-8 uppercase text-white">
                Suhas <br />
                <span className="text-white/40">Gajanana.</span>
              </h1>
              
              <div className="tech-border mb-12">
                <p className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed">
                  AIML Engineer specializing in Generative AI, scalable RAG pipelines, and predictive modeling to neutralize complex data challenges.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={() => document.getElementById('case-files')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hud-panel text-white font-mono text-xs px-8 py-4 uppercase tracking-widest flex items-center gap-3 group"
                >
                  <span className="text-bat-red group-hover:translate-x-1 transition-transform">Access Case Files</span>
                  <ChevronRight className="w-4 h-4 text-bat-red opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
                <button 
                  onClick={() => document.getElementById('service-records')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-white/10 bg-bat-gray text-white/60 hover:text-white hover:border-white/30 font-mono text-xs px-8 py-4 uppercase tracking-widest transition-all duration-300 flex items-center gap-3"
                >
                  <Briefcase className="w-4 h-4" /> Service Records
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-white/10 bg-bat-gray text-white/60 hover:text-white hover:border-white/30 font-mono text-xs px-8 py-4 uppercase tracking-widest transition-all duration-300 flex items-center gap-3"
                >
                  <Lock className="w-4 h-4" /> Secure Comms
                </button>
                <a 
                  href="/resume.pdf" download
                  className="border border-bat-red/50 bg-bat-red/10 text-bat-red hover:bg-bat-red hover:text-white font-mono text-xs px-8 py-4 uppercase tracking-widest transition-all duration-300 flex items-center gap-3"
                >
                  <FileText className="w-4 h-4" /> Download Resume
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:block lg:col-span-4"
            >
              <div className="hud-panel p-8 scanline">
                <div className="w-32 h-32 mx-auto mb-8 border border-white/10 flex items-center justify-center bg-bat-black relative group">
                  <div className="absolute inset-0 bg-bat-red/5 group-hover:bg-bat-red/10 transition-colors"></div>
                  {!logoError ? (
                    <img 
                      src="/batman-logo.png" 
                      className="w-24 h-24 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 logo-red-hue" 
                      alt="Logo"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <img src="/batman.png" alt="Logo" className="w-24 h-24 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] transition-transform duration-500 group-hover:scale-110 logo-red-hue" />
                  )}
                </div>
                <div className="space-y-4 font-mono text-[10px] text-white/40 tracking-widest uppercase">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>System Status:</span>
                    <span className="text-bat-red">Active</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Designation:</span>
                    <span className="text-white/80">AIML_Engineer</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Clearance:</span>
                    <span className="text-white/80">Level_09</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span>Uplink:</span>
                    <span className="text-white/80">Established</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Arsenal / Skills Section */}
        <section id="core-directives" className="py-24 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="font-mono text-bat-red text-xs tracking-widest">01 //</span>
            <h2 className="font-display text-2xl uppercase tracking-widest text-white">Tactical Arsenal</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Machine Learning & AI", desc: "TensorFlow, Deep Learning, Generative AI (RAG, LLMs, Prompt Engineering), LLM APIs (OpenAI, Mistral, Qwen).", icon: Brain },
              { title: "Data Engineering", desc: "Vector Databases (Qdrant), Apache Kafka, Flink, SQL, Data Wrangling, Pandas, NumPy.", icon: Database },
              { title: "Software & Ops", desc: "Python, JavaScript, React, CI/CD (GitHub Actions), Docker, Playwright QA Automation.", icon: Code }
            ].map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="hud-panel p-8 group"
              >
                <div className="flex justify-between items-start mb-8">
                  <skill.icon className="w-6 h-6 text-white/60 group-hover:text-bat-red transition-colors duration-300" />
                  <span className="font-mono text-[10px] text-white/20 tracking-widest">MOD_0{i+1}</span>
                </div>
                <h3 className="font-display text-lg tracking-wide mb-4 text-white uppercase">{skill.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Service Records / Work Experience */}
        <section id="service-records" className="py-24 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="font-mono text-bat-red text-xs tracking-widest">02 //</span>
            <h2 className="font-display text-2xl uppercase tracking-widest text-white">Service Records</h2>
          </motion.div>

          {/* Technical Timeline */}
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[19px] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-white/10">
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
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-none border border-white/20 bg-bat-black text-white/40 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-bat-red group-hover:text-bat-red transition-colors duration-300">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] hud-panel p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                    <div>
                      <h3 className="font-display font-medium text-lg tracking-wide text-white uppercase mb-1">{job.role}</h3>
                      <h4 className="font-mono text-xs tracking-widest text-white/40 uppercase">{job.company}</h4>
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-bat-red border border-bat-red/20 px-3 py-1 bg-bat-red/5 shrink-0">{job.date}</span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed font-light">{job.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Case Files / Projects Section */}
        <section id="case-files" className="py-24 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="font-mono text-bat-red text-xs tracking-widest">03 //</span>
            <h2 className="font-display text-2xl uppercase tracking-widest text-white">Case Files</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { 
                id: "CSF-001", 
                name: "Vector F1 Decision Support", 
                type: "Predictive Analytics & Streaming",
                tech: ["Random Forest", "XGBoost", "Apache Kafka"],
                status: "EXHIBITED"
              },
              { 
                id: "CSF-002", 
                name: "Customer Churn Prediction", 
                type: "Classification Model (~92% Acc)",
                tech: ["Logistic Regression", "KNN", "ROC/AUC"],
                status: "EVALUATED"
              },
              { 
                id: "CSF-003", 
                name: "Taxi Operations Insights", 
                type: "Statistical Analysis (R² = 0.86)",
                tech: ["Linear Regression", "Pandas", "SciPy"],
                status: "ARCHIVED"
              },
              { 
                id: "CSF-004", 
                name: "ANPR System", 
                type: "Computer Vision",
                tech: ["OpenCV", "Python"],
                status: "ACTIVE"
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-bat-gray border border-white/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-bat-red scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono text-[10px] tracking-widest text-white/30">{project.id}</span>
                    <span className={`font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border ${project.status === 'ACTIVE' ? 'border-green-500/30 text-green-500' : project.status === 'EXHIBITED' ? 'border-bat-red/30 text-bat-red' : 'border-white/20 text-white/40'}`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl mb-1 text-white uppercase tracking-wide">{project.name}</h3>
                  <p className="font-mono text-xs text-white/40">{project.type}</p>
                </div>

                <div className="flex flex-wrap gap-2 md:justify-end max-w-md">
                  {project.tech.map((t, j) => (
                    <span key={j} className="font-mono text-[10px] tracking-widest uppercase border border-white/10 px-3 py-1.5 text-white/50 group-hover:border-white/20 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Clearances / Education & Certs */}
        <section className="py-24 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="font-mono text-bat-red text-xs tracking-widest">04 //</span>
            <h2 className="font-display text-2xl uppercase tracking-widest text-white">Clearances</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h3 className="font-mono text-white/40 tracking-widest text-xs mb-6 flex items-center gap-3 uppercase">
                <GraduationCap className="w-4 h-4 text-bat-red" /> Academic_Records
              </h3>
              <div className="space-y-4">
                {[
                  { degree: "BE in Artificial Intelligence & Machine Learning", school: "City Engineering College", year: "2020 - 2024", details: "CGPA: 8.5/10" }
                ].map((edu, i) => (
                  <div key={i} className="hud-panel p-6 group">
                    <h4 className="font-display text-base tracking-wide text-white mb-2 uppercase">{edu.degree}</h4>
                    <p className="font-mono text-xs text-white/40 mb-4 uppercase tracking-wider">{edu.school}</p>
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest">
                      <span className="text-white/30">{edu.year}</span>
                      <span className="text-bat-red">{edu.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-mono text-white/40 tracking-widest text-xs mb-6 flex items-center gap-3 uppercase">
                <Award className="w-4 h-4 text-bat-red" /> Certifications
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  "Fundamentals of AI Agents Using RAG and LangChain (IBM)",
                  "Deep Learning with TensorFlow (IBM)",
                  "SQL for Data Science (UC Davis)",
                  "Google Advanced Data Analytics (Google)",
                  "AI Product Management (Duke University)",
                  "Excel Skills Job Simulation (JPMorgan Chase)"
                ].map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-bat-gray border border-white/5 hover:border-white/20 transition-all duration-300 group">
                    <FileText className="w-3 h-3 text-bat-red opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-mono tracking-wide text-white/60 group-hover:text-white transition-colors">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="font-mono text-bat-red text-xs tracking-widest">05 //</span>
            <h2 className="font-display text-2xl uppercase tracking-widest text-white">Secure Comms</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button onClick={() => copyToClipboard('suhasgajanana08@gmail.com', 'Email')} className="hud-panel p-8 flex flex-col items-center justify-center gap-4 group hover:border-bat-red/50 transition-colors w-full">
              <Mail className="w-8 h-8 text-white/40 group-hover:text-bat-red transition-colors" />
              <span className="font-mono text-xs tracking-widest text-white/60 group-hover:text-white uppercase">Email</span>
              <span className="text-sm text-white/40">suhasgajanana08@gmail.com</span>
            </button>
            
            <button onClick={() => copyToClipboard('9113079924', 'Phone')} className="hud-panel p-8 flex flex-col items-center justify-center gap-4 group hover:border-bat-red/50 transition-colors w-full">
              <Phone className="w-8 h-8 text-white/40 group-hover:text-bat-red transition-colors" />
              <span className="font-mono text-xs tracking-widest text-white/60 group-hover:text-white uppercase">Phone</span>
              <span className="text-sm text-white/40">9113079924</span>
            </button>

            <a href="https://www.linkedin.com/in/suhas-gajanana" target="_blank" rel="noreferrer" className="hud-panel p-8 flex flex-col items-center justify-center gap-4 group hover:border-bat-red/50 transition-colors w-full">
              <Linkedin className="w-8 h-8 text-white/40 group-hover:text-bat-red transition-colors" />
              <span className="font-mono text-xs tracking-widest text-white/60 group-hover:text-white uppercase">LinkedIn</span>
              <span className="text-sm text-white/40">/in/suhas-gajanana</span>
            </a>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="py-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-white/30 uppercase">
            <Lock className="w-3 h-3 text-bat-red" />
            <span>Connection Secure // End of Transmission</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/30 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <button onClick={() => copyToClipboard('suhasgajanana08@gmail.com', 'Email')} className="text-white/30 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </footer>

      </main>
    </div>
  );
}
