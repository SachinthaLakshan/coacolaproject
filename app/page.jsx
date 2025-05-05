'use client';

import { useState } from 'react';
import WelcomeMessage from './components/WelcomeMessage';
import Heart from './components/Heart';
import Background from './components/Background';
import Logo from './components/Logo';
import Loader from './components/Loader';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [sensorData, setSensorData] = useState({});
  const [loaderKey, setLoaderKey] = useState(0); // step 1

  const handleComplete = () => {
    setShowContent(false);         // hide content
    setLoaderKey(prev => prev + 1); // step 2: change key to remount Loader
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <Loader key={loaderKey} setSensorData={setSensorData} onComplete={() => setShowContent(true)} />
      
      {showContent && (
        <>
          <Background />
          
          <div className="relative z-10 flex flex-col items-center">
            <Logo />
            
            <WelcomeMessage sensorData={sensorData} onComplete={()=>handleComplete()} />
            
            <div className="flex items-center justify-center gap-8 mt-8">
              <Heart bpm={72} position="left" />
              <div className="w-1 h-24 bg-white/20 rounded-full" />
              <Heart bpm={76} position="right" />
            </div>
          </div>
        </>
      )}
    </main>
  );
} 