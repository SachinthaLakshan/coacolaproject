'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ onComplete, setSensorData }) {
  const [showLoader, setShowLoader] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [showMagicLoading, setShowMagicLoading] = useState(false);

  useEffect(() => {
    // Show button after text animation
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(buttonTimer);
  }, []);

  useEffect(() => {
    // Show continue button after second message appears
    if (showSecondMessage) {
      const continueButtonTimer = setTimeout(() => {
        setShowContinueButton(true);
      }, 1500);
      return () => clearTimeout(continueButtonTimer);
    }
  }, [showSecondMessage]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/sensor-data');
      const data = await res.json();
      if (data) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.message.read01);
        if(data.message.read01){
          handleStart();
        }
        if(data.message.read02 && data.message.read01){
          handleContinue();
          setSensorData(data.message);
        }

        // setTimeout(() => setShow(false), 5000); // hide after 5 seconds
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const haddleRest = async () => {
    const res = await fetch('/api/sensor-data', {
      method: 'PUT'
    });
    const data = await res.json();
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>',data.message);
  }

  const handleStart = () => {
    setShowButton(false);
    setShowSecondMessage(true);
  };

  const handleContinue = () => {
    setShowSecondMessage(false);
    setShowContinueButton(false);
    setShowMagicLoading(true);
    
    // Complete after magic loading
    setTimeout(() => {
      setShowLoader(false);
      onComplete();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50"
        >
          {/* Same background effects as home page */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#000000]" />
          <div className="absolute inset-0 bg-[#E41A1C] opacity-15" />
          <div className="absolute inset-0 bg-[url('/bubbles.svg')] opacity-25 scale-150" />
          <div className="absolute inset-0 bg-[url('/stripes.svg')] opacity-8 scale-125" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E41A1C]/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#E41A1C]/5 via-transparent to-[#E41A1C]/5" />
          
          {/* Animated floating bubbles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/25 animate-float"
                style={{
                  width: `${Math.random() * 30 + 15}px`,
                  height: `${Math.random() * 30 + 15}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                }}
              />
            ))}
          </div>

          {/* Loader content */}
          <div className="relative flex flex-col items-center justify-center h-full">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
              animate={{ 
                scale: 1,
                y: [0, -5, 0],
                rotate: -10,
                opacity: 1
              }}
              
              className="absolute top-20"
            >
              <img 
                src="/logo-loader.png" 
                alt="Coca-Cola Logo" 
                className="w-50 h-40 object-contain rounded-xl bg-white/10 p-2"
              />
            </motion.div>

            {/* Left Bottle */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                rotate: [-5, 5, -5]
              }}
              transition={{ 
                duration: 0.8,
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute left-8 h-full flex items-center"
            >
              <img 
                src="/bottle.png" 
                alt="Coca-Cola Bottle" 
                className="h-[80vh] object-contain"
              />
            </motion.div>

            {/* Right Bottle */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                rotate: [5, -5, 5]
              }}
              transition={{ 
                duration: 0.8,
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute right-8 h-full flex items-center"
            >
              <img 
                src="/bottle.png" 
                alt="Coca-Cola Bottle" 
                className="h-[80vh] object-contain"
              />
            </motion.div>
            {showMagicLoading ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: 1
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut"
                }}
                className="text-center"
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-wide"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }}
                >
                  Real Magic is Loading
                </motion.h1>
                <motion.div
                  className="w-48 h-1 bg-white/20 rounded-full mx-auto overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                >
                  <motion.div
                    className="h-full bg-[#E41A1C]"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </motion.div>
            ) : !showSecondMessage ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: 1
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  },
                  opacity: { duration: 0.5 }
                }}
                className="text-center"
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-white mt-10 mb-6 tracking-wide"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }}
                >
                  Keep Your Finger
                </motion.h1>
                
                <motion.h2
                  className="text-4xl md:text-6xl font-bold text-[#E41A1C] tracking-wider"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      delay: 0.3,
                      ease: "easeOut"
                    }
                  }}
                >
                  to see the real magic
                </motion.h2>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: 1
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut"
                }}
                className="text-center"
              >
                <motion.h1
                  className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-wide"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }}
                >
                  Hey !
                </motion.h1>
                
                <motion.h2
                  className="text-5xl md:text-7xl font-bold text-[#E41A1C] tracking-wider"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      delay: 0.3,
                      ease: "easeOut"
                    }
                  }}
                >
                  50% Completed
                </motion.h2>

                <motion.h3
                  className="text-4xl md:text-6xl font-bold text-white mt-6 tracking-wide"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      delay: 0.6,
                      ease: "easeOut"
                    }
                  }}
                >
                  We need one more partner
                </motion.h3>
              </motion.div>
            )}

            {/* Start Button */}
            {/* <AnimatePresence>
              {showButton && !showSecondMessage && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  className="mt-12 px-12 py-4 bg-[#E41A1C] text-white text-2xl font-bold rounded-full 
                           shadow-lg hover:shadow-xl transition-all duration-300
                           border-2 border-white/20 hover:border-white/40"
                >
                  Start
                </motion.button>
              )}
            </AnimatePresence> */}

            {/* Continue Button */}
            {/* <AnimatePresence>
              {showContinueButton && showSecondMessage && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinue}
                  className="mt-12 px-12 py-4 bg-white text-[#E41A1C] text-2xl font-bold rounded-full 
                           shadow-lg hover:shadow-xl transition-all duration-300
                           border-2 border-[#E41A1C]/20 hover:border-[#E41A1C]/40"
                >
                  Continue
                </motion.button>
              )}
            </AnimatePresence> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 