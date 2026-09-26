import { ChevronRightCircle } from 'lucide-react'
import React from 'react'

function CTA() {
  return (
    <div className="w-full py-16 px-4 relative z-10 selection:bg-[#ff5500]/30 select-none bg-transparent">
      {/* Centered Premium Glass Container */}
      <div className="max-w-4xl mx-auto backdrop-blur-2xl py-12 px-6 sm:px-12 border border-white/[0.06] rounded-[32px] bg-white/[0.02] text-center shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        
        {/* Subtle top brand orange light leak */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#ff6a00]/40 to-transparent" />

        {/* Optimized Typography Stack */}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.15] text-white max-w-2xl mx-auto">
          Ready to optimize your resume and land your dream job?
        </h2>
        
        <p className="mt-4 text-xs sm:text-sm leading-relaxed text-stone-300 max-w-xl mx-auto opacity-90">
          Get started with our AI-powered analyzer and builder tool to take the definitive first step towards your next career breakthrough.
        </p>

        {/* Enhanced High-Contrast Interactive Button */}
        <div className="mt-8 flex justify-center">
          <a
            href="/login"
            className="inline-flex items-center gap-2 justify-center px-8 py-4 bg-gradient-to-r from-[#ff5500] to-[#ff7300] text-white font-bold text-sm sm:text-base rounded-xl hover:from-[#ff6a00] hover:to-[#ff8800] transition-all duration-200 shadow-[0_4px_25px_rgba(255,85,0,0.25)] hover:shadow-[0_4px_30px_rgba(255,85,0,0.4)] transform active:scale-[0.98]"
          >
            Get Started For Free 
            <ChevronRightCircle/>
          </a>
        </div>

      </div>
    </div>
  )
}

export default CTA
