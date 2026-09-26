import React from 'react';
import BackDrop from '../components/BackDrop';

export default function Loader() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative z-50 selection:bg-[#ff5500]/30 select-none bg-transparent">
      
        <BackDrop/>

        {/* 1. MINIMAL DUAL-RING ACCELERATOR LOADER */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          {/* Central Ambient Glow */}
          {/* <div className="absolute w-8 h-8 rounded-full bg-[#ff5500]/50 blur-md animate-pulse" /> */}
          
          {/* Outer Ring: Fast Orange Accent Spinner */}
          <div className="absolute inset-0 rounded-full border-2 border-white/[0.02]" />
          <div className="absolute inset-0 rounded-full border-2 border-t-[#ff5500] border-r-amber-500 border-b-transparent border-l-transparent animate-spin [animation-duration:0.8s]" />

          {/* Inner Counter-Ring: Slower Translucent Ring */}
          <div className="absolute inset-2 rounded-full border-2 border-white/[0.02]" />
          <div className="absolute inset-2 rounded-full border-2 border-b-[#ff6a00]/40 border-l-white/20 border-t-transparent border-r-transparent animate-spin [animation-duration:1.4s] [animation-direction:reverse]" />
      
      </div>
    </div>
  );
}
