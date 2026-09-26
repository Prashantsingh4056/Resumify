// import React from "react";

// function BackDrop() {
//   return (
//     <>
//       <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none bg-[#0e0703]">
//         {/* Enhanced Ambient Orange Glows */}
//         <div className="absolute rounded-full -top-20 left-1/4 size-160 bg-[#ff5500]/15 blur-[120px]" />
//         <div className="absolute rounded-full top-1/3 right-[-10%] size-140 bg-[#ff6a00]/10 blur-[100px]" />
//         <div className="absolute rounded-full bottom-[-10%] left-[10%] size-130 bg-[#3a1a05]/40 blur-[90px]" />

//         {/* Crisp Cyber Grid Lines & Tech Accents */}
//         <svg
//           className="absolute inset-0 w-full h-full opacity-35"
//           xmlns="http://w3.org"
//         >
//           {/* Angular background accent lines */}
//           <path
//             d="M 0 100 L 300 100 L 450 250 L 1200 250"
//             fill="none"
//             stroke="#ff7300"
//             strokeWidth="1.5"
//           />
//           <path
//             d="M 200 0 L 200 500 L 800 1200"
//             fill="none"
//             stroke="#ff5500"
//             strokeWidth="1"
//             strokeDasharray="3 3"
//           />

//           {/* Tech Dot Matrix Pattern */}
//           <defs>
//             <pattern
//               id="dot-matrix"
//               width="16"
//               height="16"
//               patternUnits="userSpaceOnUse"
//             >
//               <circle cx="2" cy="2" r="1.2" fill="#ff7300" opacity="0.6" />
//             </pattern>
//           </defs>
//           <rect
//             x="60"
//             y="120"
//             width="180"
//             height="120"
//             fill="url(#dot-matrix)"
//           />
//         </svg>

//         {/* Stronger Bottom Interface Border Glow */}
//         <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff6a00]/40 to-transparent" />
//       </div>
//     </>
//   );
// }

// export default BackDrop;


// const BackDrop = () => {
//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden bg-[#09090B]">
      
//       <div className="absolute top-[-350px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/[0.07] blur-[140px]" />

    
//       <div className="absolute top-[150px] right-[-250px] h-[500px] w-[500px] rounded-full bg-violet-500/[0.035] blur-[150px]" />

    
//       <div className="absolute bottom-[-300px] left-[10%] h-[600px] w-[600px] rounded-full bg-orange-500/[0.035] blur-[160px]" />

      
//       <div
//         className="
//           absolute inset-0 opacity-[0.025]
//           [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)]
//           [background-size:64px_64px]
//         "
//       />
//     </div>
//   );
// };

// export default BackDrop;


// const BackDrop = () => {
//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0B0B0E]">
//       {/* Main warm center glow */}
//       <div
//         className="
//           absolute
//           top-[-15%]
//           left-1/2
//           h-[850px]
//           w-[1100px]
//           -translate-x-1/2
//           rounded-full
//           bg-orange-500/[0.10]
//           blur-[180px]
//         "
//       />

//       {/* Left warm glow behind hero */}
//       <div
//         className="
//           absolute
//           top-[120px]
//           left-[-250px]
//           h-[700px]
//           w-[700px]
//           rounded-full
//           bg-[#7C2D12]/[0.22]
//           blur-[150px]
//         "
//       />

//       {/* Right orange glow behind upload card */}
//       <div
//         className="
//           absolute
//           top-[100px]
//           right-[-250px]
//           h-[650px]
//           w-[650px]
//           rounded-full
//           bg-orange-600/[0.07]
//           blur-[160px]
//         "
//       />

//       {/* Bottom warm glow */}
//       <div
//         className="
//           absolute
//           bottom-[-400px]
//           left-[25%]
//           h-[750px]
//           w-[900px]
//           rounded-full
//           bg-[#4A1D0C]/[0.20]
//           blur-[180px]
//         "
//       />

//       {/* Deep violet/blue balancing glow */}
//       <div
//         className="
//           absolute
//           top-[300px]
//           right-[10%]
//           h-[500px]
//           w-[500px]
//           rounded-full
//           bg-violet-600/[0.035]
//           blur-[180px]
//         "
//       />

//       {/* Grid */}
//       <div
//         className="
//           absolute inset-0
//           opacity-[0.055]
//           [background-image:linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)]
//           [background-size:72px_72px]
//         "
//       />

//       {/* Top dark overlay for contrast */}
//       <div
//         className="
//           absolute inset-0
//           bg-gradient-to-b
//           from-black/20
//           via-transparent
//           to-black/30
//           pointer-events-none
//         "
//       />

//       {/* Subtle noise-like radial texture */}
//       <div
//         className="
//           absolute inset-0
//           opacity-[0.025]
//           [background-image:radial-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)]
//           [background-size:4px_4px]
//           pointer-events-none
//         "
//       />
//     </div>
//   );
// };

// export default BackDrop;


// import React from "react";

// export default function BackDrop() {
//   return (
//     <div className="fixed pointer-events-none inset-0 overflow-hidden bg-[#3d0f03]">
//       {/* Base warm radial glow, brightest lower-left, fading to black */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(120% 90% at 10% 100%, rgba(160,60,25,0.65) 0%, rgba(90,35,15,0.45) 35%, rgba(0,0,0,0) 70%)",
//         }}
//       />

//       {/* Secondary soft glow, upper-right, cooler/darker */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(80% 60% at 85% 10%, rgba(130,50,20,0.35) 0%, rgba(0,0,0,0) 60%)",
//         }}
//       />

//       {/* Subtle top-to-bottom vignette to keep edges dark */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%)",
//         }}
//       />

//       {/* Outer edge vignette (left/right) */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(0,0,0,0.5) 100%)",
//         }}
//       />
//     </div>
//   );
// }



// import React from "react";

// export default function BackDrop() {
//   return (
//     <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none bg-black">
      
//         <div className="absolute rounded-full top-40 left-120 size-100 bg-[#cc3502]/30 blur-[100px]" />
//          <div className="absolute rounded-full top-1/3 right-[-10%] size-140 bg-[#b63300]/40 blur-[100px]" />
//          <div className="absolute rounded-full bottom-[-10%] left-[10%] size-130 bg-[#2f1708]/40 blur-[100px]" />

//     </div>
//   );
// }


import React from "react";

/**
 * BackDrop
 * Premium dark hero background for "Resumify" — near-black base,
 * warm ember glow rising from the bottom-left, a soft accent glow behind
 * the upload card area, an even dotted grid across the whole canvas, and
 * a fine noise layer for a polished, non-flat look.
 *
 * Usage:
 *   <div className="relative min-h-screen bg-black overflow-hidden">
 *     <BackDrop />
 *     <div className="relative z-10"> ...your content... </div>
 *   </div>
 */
export default function BackDrop() {
  return (
    <div className="pointer-events-none -z-10 fixed inset-0 overflow-hidden bg-[#18100c]">
      {/* Base warm ember glow, bottom-left, deep and rich */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 8% 105%, rgba(255,110,40,0.35) 0%, rgba(150,55,20,0.22) 30%, rgba(0,0,0,0) 65%)",
        }}
      />

      {/* Secondary glow, sits behind the card on the right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 55% at 78% 45%, rgba(255,130,50,0.16) 0%, rgba(0,0,0,0) 65%)",
        }}
      />

      {/* Tertiary faint glow, top-left, keeps the header area from being flat black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 35% at 12% 0%, rgba(180,70,25,0.12) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Brownish glow, centered */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 50%, rgba(120,70,40,0.35) 0%, rgba(80,45,25,0.18) 40%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* Even dotted grid across the full canvas */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,160,110,0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          backgroundPosition: "0 0",
          maskImage:
            "radial-gradient(130% 100% at 30% 60%, black 0%, black 55%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(130% 100% at 30% 60%, black 0%, black 55%, transparent 92%)",
        }}
      />

      {/* Fine noise/grain for a premium, non-flat texture */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Top-to-bottom vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 72%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Left/right edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 14%, rgba(0,0,0,0) 86%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

// blur-[120px]
// blur-[100px]
// blur-[90px]