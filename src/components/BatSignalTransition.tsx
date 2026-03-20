import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface BatSignalTransitionProps {
  onComplete: () => void;
}

export default function BatSignalTransition({ onComplete }: BatSignalTransitionProps) {
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    // Play transition for 3 seconds then complete
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Spotlight Effect */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 0.8, 0.5] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-white/20 blur-3xl"
      />
      
      {/* Bat Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.5 }}
        className="relative z-10"
      >
        {!logoError ? (
          <img 
            src={`${import.meta.env.BASE_URL}batman.png`}
            alt="Bat Signal"
            className="w-64 h-64 md:w-96 md:h-96 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
            onError={() => setLogoError(true)}
          />
        ) : (
          <img src={`${import.meta.env.BASE_URL}batman.png`} alt="Bat Signal" className="w-64 h-64 md:w-96 md:h-96 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
        )}
      </motion.div>

      {/* Scanning Line */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-white/30 shadow-[0_0_20px_rgba(255,255,255,0.8)] z-20"
      />
    </motion.div>
  );
}
