'use client';

import Bottle from './Bottle';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#000000]" />
      
      {/* Coca-Cola red overlay with enhanced opacity */}
      <div className="absolute inset-0 bg-[#E41A1C] opacity-15" />
      
      {/* Large scale bubbles pattern */}
      <div className="absolute inset-0 bg-[url('/bubbles.svg')] opacity-25 scale-150" />
      
      {/* Enhanced diagonal stripes */}
      <div className="absolute inset-0 bg-[url('/stripes.svg')] opacity-8 scale-125" />
      
      {/* Stronger glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E41A1C]/10 to-transparent" />
      
      {/* Larger animated floating bubbles */}
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

      {/* Additional light effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#E41A1C]/5 via-transparent to-[#E41A1C]/5" />

      {/* Coca-Cola bottle */}
      {/* <Bottle /> */}
    </div>
  );
} 