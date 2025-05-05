'use client';

import WelcomeMessage from './components/WelcomeMessage';
import Heart from './components/Heart';
import Background from './components/Background';
import Logo from './components/Logo';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <Background />
      
      <div className="relative z-10 flex flex-col items-center">
        <Logo />
        
        <WelcomeMessage />
        
        <div className="flex items-center justify-center gap-8 mt-8">
          <Heart bpm={72} position="left" />
          <div className="w-1 h-24 bg-white/20 rounded-full" />
          <Heart bpm={76} position="right" />
        </div>
      </div>
    </main>
  );
} 