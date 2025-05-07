'use client';

import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1.5,
        transition: {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 },
          scale: { duration: 1 }
        }
      }}
      className="w-full h-48 mb-6 px-0 mb-[20%] left-0 z-50"
    >
      {/* Logo image with effects */}
      <motion.div 
        className="relative w-full h-full max-w-2xl mx-auto"
        initial={{ filter: "blur(10px)" }}
        animate={{ 
          filter: "blur(0px)",
          transition: {
            duration: 1,
            delay: 0.3
          }
        }}
      >
        <img
          src="/logo-loader1.png"
          alt="Coca-Cola Logo"
          className="w-full h-full object-contain filter drop-shadow-xl"
        />
      </motion.div>
    </motion.div>
  );
} 