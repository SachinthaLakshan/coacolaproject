'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

export default function WelcomeMessage({ sensorData,onComplete }) {
  const beatGap = 30;
  const [showWinConfetti, setShowWinConfetti] = useState(false);
  const [showLostConfetti, setShowLostConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    console.log('sensorData:',sensorData);
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timer;
    if (showTimer && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      haddleRest();
      setShowTimer(false);
      setShowMessage(false);
      setShowLostConfetti(false);
      // setTimeLeft(60);
      
    }
    return () => clearInterval(timer);
  }, [showTimer, timeLeft]);

  useEffect(() => {
    // Show continue button after second message appears
    if(heartRateMatched(sensorData.ratePerson01, sensorData.ratePerson02)){
      handleWinClick();
      // setTimeout(() => {
      //   haddleRest();
      // }, 3000);
    }else{
      handleLostClick();
    //   setTimeout(() => {
    //     haddleRest();
    //   }, 5000);
     }
    
  }, [sensorData]);

  function heartRateMatched(rate01, rate02) {
    return Math.abs(rate01 - rate02) <= beatGap;
  }
  

  const haddleRest = async () => {
    const res = await fetch('/api/sensor-data', {
      method: 'PUT'
    });
    const data = await res.json();
    // if(data){
    //   onComplete();
    // }
  }

  const handleWinClick = () => {
    setShowWinConfetti(true);
    setMessage('Congratulations, Your Heart Beats Syncs!');
    setShowMessage(true);
    
    // First message for 3 seconds
    setTimeout(() => {
      setMessage('Share a Coke on us!');
    }, 5000);

    // After 6 seconds, reset everything
    setTimeout(() => {
      //setShowWinConfetti(false);
      //setShowMessage(false);
      haddleRest();
    }, 6000);
  };

  const handleLostClick = () => {
    setShowLostConfetti(true);
    setMessage('Calm down, both of you. magic happens when your hearts beat in sync.');
    setShowMessage(true);
    haddleRest();
    // setShowTimer(true);
  };

  // Sad emojis array
  const sadEmojis = ['😢', '😭', '😔', '😞', '😟', '😕', '🙁', '☹️', '😥', '😓'];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {showWinConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={1600}
          gravity={0.2}
          colors={['#E41A1C', '#FFFFFF', '#FFD700']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
        />
      )}
      {showLostConfetti && (
        <div className="fixed inset-0 z-1000">
          {[...Array(160)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ 
                x: Math.random() * windowSize.width,
                y: -50,
                opacity: 0,
                scale: 1.3
              }}
              animate={{ 
                y: windowSize.height + 50,
                opacity: [0, 1, 1, 0],
                scale: [1.3, 2.2, 2.2, 1.3],
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
              className="absolute text-8xl"
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
      <div className="w-full max-w-6xl min-w-6xl mx-auto mb-20 p-16 rounded-[2rem] backdrop-blur-2xl bg-white/25 border border-white/40 shadow-2xl">
        {!showMessage ? (
          <h1 className="text-7xl md:text-8xl font-bold text-center text-white mb-20">
            Feel the Pulse of Connection
          </h1>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-12">
              {message}
            </h2>
            {showTimer && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-8xl md:text-9xl font-bold text-[#E41A1C] mb-12"
              >
                {formatTime(timeLeft)}
              </motion.div>
            )}
          </motion.div>
        )}
        <div className="flex justify-center gap-12 mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-16 py-8 bg-[#E41A1C] text-white text-3xl font-bold rounded-full 
                     shadow-2xl hover:shadow-2xl transition-all duration-300
                     border-2 border-white/40 hover:border-white/60"
          >
            Begin Again
          </motion.button>
        </div>
      </div>
    </>
  );
} 