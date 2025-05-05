'use client';

import { motion } from 'framer-motion';

export default function Heart({ bpm, position }) {
  return (
    <div className={`flex flex-col items-center ${position === 'left' ? 'mr-4' : 'ml-4'}`}>
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="#E41A1C"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 60 / bpm,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </motion.svg>
      <div className="mt-4 text-2xl font-bold text-white">{bpm} bpm</div>
    </div>
  );
} 