'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

export default function WelcomeMessage() {
  const [showWinConfetti, setShowWinConfetti] = useState(false);
  const [showLostConfetti, setShowLostConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWinClick = () => {
    setShowWinConfetti(true);
    setTimeout(() => setShowWinConfetti(false), 5000);
  };

  const handleLostClick = () => {
    setShowLostConfetti(true);
    setTimeout(() => setShowLostConfetti(false), 5000);
  };

  // Sad emojis array
  const sadEmojis = ['😢', '😭', '😔', '😞', '😟', '😕', '🙁', '☹️', '😥', '😓'];

  return (
    <>
      {showWinConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          colors={['#E41A1C', '#FFFFFF', '#FFD700']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
        />
      )}
      {showLostConfetti && (
        <div className="fixed inset-0 z-1000">
          {[...Array(50)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ 
                x: Math.random() * windowSize.width,
                y: -50,
                opacity: 0,
                scale: 0.5
              }}
              animate={{ 
                y: windowSize.height + 50,
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5],
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {sadEmojis[Math.floor(Math.random() * sadEmojis.length)]}
            </motion.div>
          ))}
        </div>
      )}
      <div className="w-full max-w-2xl mx-auto mb-8 p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
          Feel the Pulse of Connection
        </h1>
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWinClick}
            className="px-6 py-3 bg-[#E41A1C] text-white font-bold rounded-full 
                     shadow-lg hover:shadow-xl transition-all duration-300
                     border-2 border-white/20 hover:border-white/40"
          >
            win
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLostClick}
            className="px-6 py-3 bg-white text-[#E41A1C] font-bold rounded-full 
                     shadow-lg hover:shadow-xl transition-all duration-300
                     border-2 border-[#E41A1C]/20 hover:border-[#E41A1C]/40"
          >
            lost
          </motion.button>
        </div>
      </div>
    </>
  );
} 