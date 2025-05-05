'use client';

import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-64 mb-8 px-4"
    >
      {/* Logo image with effects */}
      <div className="relative w-full h-full max-w-6xl mx-auto">
        <img
          src="/logo1.png"
          alt="Coca-Cola Logo"
          className="w-full h-full object-contain filter drop-shadow-lg scale-125"
        />
      </div>
    </motion.div>
  );
} 