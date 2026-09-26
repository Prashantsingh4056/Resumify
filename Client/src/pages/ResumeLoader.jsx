import React, { useState, useEffect } from 'react';
import BackDrop from '../components/BackDrop';

export default function ResumeLoader() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    'Establishing secure terminal connection...',
    'Parsing document layout rules and typography...',
    'Extracting core semantic hard skills...',
    'Cross-referencing keyword weight against target database...',
    'Calculating deep ATS compatibility metrics...',
    'Finalizing optimization performance scorecard...'
  ];

  // Cycle through tech log messages smoothly to simulate active AI parsing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2200);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="min-h-screen  w-full flex items-center justify-center p-4 relative z-50 selection:bg-[#ff5500]/30 selection:text-white  bg-[#0a0a0a]">
      

      {/* <BackDrop/> */}
      {/* Centered Glassmorphic Processing Box Container */}
      <div className="w-full max-w-md bg-white/[0.05] backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-8 md:p-10 text-center shadow-[0_24px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.03)] relative overflow-hidden">
        
        {/* Subtle top subtle orange accent line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#ff6a00]/40 to-transparent" />

        {/* 1. CENTRAL GLOWING RADIAL RING LOADER LOOP */}
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          {/* Pulsing Back Ambient Orange Aura */}
          <div className="absolute inset-0 rounded-full bg-[#ff5500]/10 blur-xl animate-pulse" />
          
          {/* Animated Spinner Track */}
          <div className="absolute inset-0 rounded-full border-2 border-white/[0.03]" />
          <div className="absolute inset-0 rounded-full border-2 border-t-[#ff5500] border-r-amber-500 border-b-transparent border-l-transparent animate-spin [animation-duration:1.2s]" />

          {/* Document Tech Icon Centerpiece */}
          <div className="relative z-10 w-12 h-12 bg-stone-900/90 rounded-xl border border-white/[0.05] flex items-center justify-center shadow-inner">
            <svg className="w-6 h-6 text-[#ff7300] animate-pulse [animation-duration:2s]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://w3.org">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        {/* 2. LOADING STATE MESSAGES */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-center gap-2">
            Analyzing Document 
            <span className="flex gap-0.5 items-center pt-1">
              <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:200ms]" />
              <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:400ms]" />
            </span>
          </h3>
          <p className="text-xs text-stone-400 font-medium tracking-wide max-w-xs mx-auto min-h-[32px] flex items-center justify-center">
            Please keep this browser page open
          </p>
        </div>

        {/* 3. SIMULATED TECHNICAL LIVE TERMINAL FEED */}
        <div className="mt-8 bg-stone-950/40 border border-white/[0.04] rounded-xl p-4 text-left font-mono text-[14px] text-stone-500 space-y-2 min-h-[108px] relative">
          {/* Custom micro scanner accent beam effect */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff7300]/20 to-transparent animate-pulse" />
          
          <div className="opacity-30">&gt; initialising engine framework... verified</div>
          <div className="opacity-50">&gt; payload size parameters check... pass</div>
          
          {/* Active Log Highlight Rule */}
          <div className="text-[#ff7300] font-semibold flex items-start gap-1.5 transition-all duration-300">
            <span className="animate-pulse">●</span>
            <span>&gt; {steps[currentStep]}</span>
          </div>

          {currentStep === steps.length - 1 && (
            <div className="text-emerald-500 font-bold text-right pt-1 animate-pulse">
              [PROCESSING COMPLETED]
            </div>
          )}
        </div>

        {/* 4. BRAND FOOTER COMPONENT ACCENT */}
        <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-stone-500 uppercase tracking-widest font-semibold">
          <span>Resumify AI Engine</span>
        </div>

      </div>
    </div>
  );
}
