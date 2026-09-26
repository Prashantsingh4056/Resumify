import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-white/[0.05] backdrop-blur-xl border-t border-orange-500 mt-20 relative z-10 font-sans select-none">
      {/* Structural Inner Grid Frame */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        
        {/* COLUMN 1 (4 Span): Brand Identity Portfolio */}
        <div className="lg:col-span-4 space-y-5">
          <div className="flex gap-3 items-center group cursor-pointer">
            <div className="w-10 h-10 border border-[#ff6a00]/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(255,106,0,0.15)] transition-all duration-300 group-hover:border-[#ff6a00]/60">
            <img
              src="./logo.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
            <h1 className="text-white text-lg font-bold tracking-tight">
              Resumify
            </h1>
          </div>
          <p className="text-sm sm:text-sm text-stone-400 leading-relaxed max-w-sm">
            Empowering professionals with precision AI scoring analytics, advanced ATS structural patterns, and real-time template optimization layouts to accelerate modern application workflows.
          </p>
        </div>

        {/* COLUMN 2 (2 Span): App Features Routing */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Platform</h4>
          <ul className="space-y-2.5 text-sm font-medium text-stone-400">
            <li><a href="#" className="hover:text-[#ff7300] transition-colors duration-200">AI Analyzer</a></li>
            <li><a href="#" className="hover:text-[#ff7300] transition-colors duration-200">Smart Builder</a></li>
            <li><a href="#" className="hover:text-[#ff7300] transition-colors duration-200">ATS Inspector</a></li>
            <li><a href="#" className="hover:text-[#ff7300] transition-colors duration-200">Premium Tiers</a></li>
          </ul>
        </div>

        {/* COLUMN 3 (2 Span): Support Knowledge Database */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Resources</h4>
          <ul className="space-y-2.5 text-sm font-medium text-stone-400">
            <li><a href="#" className="hover:text-[#ff7300] transition-colors duration-200">Documentation</a></li>
            <li><a href="#" className="hover:text-[#ff7300] transition-colors duration-200">Resume Guides</a></li>
            <li><a href="#" className="hover:text-[#ff7300] transition-colors duration-200">System Logs</a></li>
            <li><a href="#" className="hover:text-[#ff7300] transition-colors duration-200">Help Terminal</a></li>
          </ul>
        </div>

        {/* COLUMN 4 (4 Span): Interactive Updates Capture Field */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Stay Tuned</h4>
          <p className="text-sm text-stone-400 max-w-xs leading-relaxed">
            Subscribe to acquire modern resume metrics insights, layout update versions, and feature releases directly.
          </p>
          <div className="flex gap-2 max-w-sm pt-1">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] rounded-xl px-4 py-2.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none transition-all"
            />
            <button className="bg-gradient-to-r from-[#ff5500] to-[#ff7300] hover:from-[#ff6a00] hover:to-[#ff8800] text-stone-950 font-bold text-xs px-4 rounded-xl transition-all shadow-[0_2px_15px_rgba(255,85,0,0.15)] active:scale-[0.97]">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* LOWER BOTTOM SUB-BAR COMPONENT CLOSURE */}
      <div className="border-t border-white/[0.04] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-medium">
          <div>
            &copy; {new Date().getFullYear()} ResumeAI Platform. All terminal connections protected.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Framework</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Security Rules</a>
          </div>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer