'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ onComplete, setSensorData }) {
  const [showLoader, setShowLoader] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [showMagicLoading, setShowMagicLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    // Show button after text animation
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 7000);

    return () => clearTimeout(buttonTimer);
  }, []);

  useEffect(() => {
    // Show continue button after second message appears
    if (showSecondMessage) {
      const continueButtonTimer = setTimeout(() => {
        setShowContinueButton(true);
      }, 7000);
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

  useEffect(() => {
    let timer;
    if (showMagicLoading && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimeout(() => {
              setShowLoader(false);
              //onComplete();
            }, 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showMagicLoading, timeLeft, onComplete]);

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
    }, 7000);
  };

  const formatTime = (seconds) => {
    return `00:${seconds.toString().padStart(2, '0')}`;
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
                scale: 1.2,
                y: [0, -5, 0],
                rotate: [-3, 3, -3],
                opacity: 1
              }}
              transition={{
                duration: 0.8,
                rotate: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute top-60"
            >
              <img 
                src="/logo-loader.png" 
                alt="Coca-Cola Logo" 
                className="w-64 h-52 md:w-80 md:h-64 object-contain rounded-xl bg-white/10 p-2"
              />
            </motion.div>

            {/* Bottles Container */}
            <div className="absolute bottom-0 w-full flex items-center justify-center gap-8 pb-8">
              {/* Horizontal View Bottles */}
              <div className="hidden md:flex items-center justify-center gap-8">
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
                  className="h-[40vh] flex items-center"
                >
                  <img 
                    src="/bottle.png" 
                    alt="Coca-Cola Bottle" 
                    className="h-full object-contain"
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
                  className="h-[40vh] flex items-center"
                >
                  <img 
                    src="/bottle.png" 
                    alt="Coca-Cola Bottle" 
                    className="h-full object-contain"
                  />
                </motion.div>
              </div>

              {/* Vertical View Single Bottle */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
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
                className="md:hidden h-[40vh] flex items-center"
              >
                <img 
                  src="/bottle.png" 
                  alt="Coca-Cola Bottle" 
                  className="h-full object-contain"
                />
              </motion.div>
            </div>

            {showMagicLoading ? (
              <div className="absolute inset-0 flex flex-col justify-center items-center">
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
                    className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-wide"
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
                    className="relative w-48 h-48 mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {/* Circular Progress */}
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background Circle */}
                      <circle
                        className="stroke-white"
                        strokeWidth="10"
                        fill="none"
                        cx="50"
                        cy="50"
                        r="45"
                      />
                      {/* Progress Circle */}
                      <motion.circle
                        className="stroke-[#E41A1C]"
                        strokeWidth="10"
                        fill="none"
                        cx="50"
                        cy="50"
                        r="45"
                        strokeLinecap="round"
                        initial={{ pathLength: 1 }}
                        animate={{ 
                          pathLength: timeLeft / 5,
                          transition: { duration: 1, ease: "linear" }
                        }}
                        style={{
                          transformOrigin: "center",
                          transform: "rotate(-90deg)"
                        }}
                      />
                    </svg>
                    {/* Timer Text */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                    >
                      <span className="text-4xl font-bold text-white">
                        {formatTime(timeLeft)}
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            ) : !showSecondMessage ? (
              <div className="absolute inset-0 flex flex-col justify-center items-center">
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
                    className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-wide"
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
                    className="text-5xl md:text-7xl font-bold text-[#E41A1C] tracking-wider mb-32"
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
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col justify-center items-center">
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
              </div>
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