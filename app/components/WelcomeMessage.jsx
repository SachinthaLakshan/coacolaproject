'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

export default function WelcomeMessage({ sensorData,onComplete }) {
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
    return Math.abs(rate01 - rate02) <= 5;
  }
  

  const haddleRest = async () => {
    const res = await fetch('/api/sensor-data', {
      method: 'PUT'
    });
    const data = await res.json();
    if(data){
      onComplete();
    }
  }

  const handleWinClick = () => {
    setShowWinConfetti(true);
    setMessage('Congratulations, you matched your ranges!');
    setShowMessage(true);
    
    // First message for 3 seconds
    setTimeout(() => {
      setMessage('You won one bottle of cocacola!');
    }, 3000);

    // After 6 seconds, reset everything
    setTimeout(() => {
      setShowWinConfetti(false);
      //setShowMessage(false);
      haddleRest();
    }, 6000);
  };

  const handleLostClick = () => {
    setShowLostConfetti(true);
    setMessage('Try to calm down you both need the same heartbeat range to enjoy the magic.');
    setShowMessage(true);
    setShowTimer(true);
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
        {!showMessage ? (
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
            Feel the Pulse of Connection
          </h1>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {message}
            </h2>
            {showTimer && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-[#E41A1C]"
              >
                {formatTime(timeLeft)}
              </motion.div>
            )}
          </motion.div>
        )}
        {/* <div className="flex justify-center gap-4">
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
        </div> */}
      </div>
    </>
  );
} 