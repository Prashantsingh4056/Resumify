import React from 'react';

export default function Title({title, description}) {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-16 text-center select-none bg-transparent">
      {/* Main Heading Text */}
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-[#ff6122] tracking-tight leading-[1.15] max-w-3xl mx-auto bg-gradient-to-r from-[#ff5a0a] via-[#ff7525] to-amber-400 bg-clip-text text-transparent">
        {title}
      </h2>

      {/* Subtitle Description */}
      <p className="mt-3 text-sm sm:text-base md:text-md text-white/75 font-normal max-w-2xl mx-auto leading-relaxed tracking-wide">
        {description}
      </p>
    </div>
  );
}
