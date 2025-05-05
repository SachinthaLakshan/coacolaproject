'use client';

import { motion } from 'framer-motion';

export default function Bottle() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-[600px]"
    >
      {/* Bottle shadow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-black/40 blur-xl rounded-full" />
      
      {/* Bottle image with glass effect */}
      <div className="relative w-full h-full">
        <img
          src="/coca-cola-bottle.png"
          alt="Coca-Cola Bottle"
          className="w-full h-full object-contain filter drop-shadow-2xl"
        />
        
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-[#E41A1C]/10 blur-lg" />
        
        {/* Additional light effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E41A1C]/5 to-transparent" />
      </div>
    </motion.div>
  );
} 