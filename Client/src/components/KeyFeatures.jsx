import React from 'react'
import Title from './Title'
import { Brain, BriefcaseBusiness, Sparkles, Terminal, FileCheck, Layers } from 'lucide-react'

function KeyFeatures() {
    const features = [
        {
            title: "AI Resume Analysis",
            description: "Get a detailed breakdown of how your resume aligns with your target role.",
            icon: Brain
        },
        {
            title: "Understand Your Job Fit",
            description: "See how your skills, experience and projects align with the job you're targeting.",
            icon: BriefcaseBusiness
        },
        {
            title: "AI Interview Preparation",
            description: "Turn your resume analysis into technical and behavioral questions you can actually practice.",
            icon: Sparkles
        },
        {
            title: "ATS-Friendly Resumes",
            description: "Generate a clean, structured resume designed to be easy for both recruiters and applicant tracking systems to read.",
            icon: FileCheck
        },
        {
            title: "Build From Scratch",
            description: "Create your resume from the ground up using your education, skills, projects, experience and achievements.",
            icon: Terminal
        },
        {
            title: "Enhance Your Existing Resume",
            description: "Upload your current resume and let AI improve its content, structure and relevance without changing the facts.",
            icon: Layers
        },
    ]

  return (
    <div className="w-full py-16 px-4 relative z-10 selection:bg-[#ff5500]/30 select-none bg-transparent">
        {/* Universal Section Header Block */}
        <Title 
            title="Everything you need to get interview-ready" 
            description="From understanding your resume to building a stronger one, get the tools you need at every stage of your job search."
        />

        {/* Cohesive 3-Column Features Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 max-w-6xl mx-auto">
            {
                features.map((feature, index) => {
                    const IconComponent = feature.icon;

                    return (
                        <div 
                            key={index} 
                            className="flex flex-col items-center text-center p-6 sm:p-8 backdrop-blur-2xl border border-white/[0.06] hover:border-[#ff6a00]/40 bg-white/[0.02] hover:bg-[#160c05]/20 rounded-[24px] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(255,85,0,0.04)] transition-all duration-300 group cursor-pointer"
                        >
                            {/* Glowing Icon Framework Container */}
                            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-[#ff6a00]/50 group-hover:bg-[#ff5500]/10 text-stone-300 group-hover:text-[#ff7300] flex items-center justify-center mb-5 transition-all duration-300 shadow-[0_0_15px_transparent] group-hover:shadow-[0_0_20px_rgba(255,85,0,0.2)] group-hover:scale-105">
                                <IconComponent className="w-5 h-5 transition-transform duration-300" />
                            </div>
                            
                            {/* Feature Text Layer Details */}
                            <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#ff7300] transition-colors duration-200">
                                {feature.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-stone-400 group-hover:text-stone-300 transition-colors duration-200 leading-relaxed max-w-[260px] mx-auto opacity-90">
                                {feature.description}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default KeyFeatures
