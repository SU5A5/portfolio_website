import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Sun } from 'lucide-react';

interface ProTransitionProps {
  onComplete: () => void;
}

export default function ProTransition({ onComplete }: ProTransitionProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] bg-slate-50 flex items-center justify-center overflow-hidden"
    >
      {/* Expanding indigo glow */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.5, 1.8], opacity: [0, 0.8, 0.3] }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute w-[60vw] h-[60vw] rounded-full bg-indigo-200 blur-3xl"
      />

      {/* Sun icon + label */}
      <motion.div
        initial={{ scale: 0, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.4 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <div className="w-36 h-36 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-indigo-100">
          <Sun className="w-20 h-20 text-indigo-500" strokeWidth={1.5} />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="font-mono text-xs tracking-widest uppercase text-slate-400"
        >
          Switching to Professional Mode
        </motion.p>
      </motion.div>

      {/* Light scanning line */}
      <motion.div
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-indigo-300/60 shadow-[0_0_15px_rgba(99,102,241,0.7)] z-20"
        style={{ position: 'absolute' }}
      />
    </motion.div>
  );
}
