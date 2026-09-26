import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  MessageSquare,
  FileText,
  ArrowRight,
} from "lucide-react";

import Title from "./Title";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Creates the sequential 'one-by-one' card delay layout
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 }
  }
};

function QuickValues() {
  const values = [
    {
      number: "01",
      title: "Analyze",
      description: "Understand how well your resume fits the role you're targeting.",
      icon: Search,
    },
    {
      number: "02",
      title: "Improve",
      description: "Identify skill gaps and discover where your profile can improve.",
      icon: TrendingUp,
    },
    {
      number: "03",
      title: "Prepare",
      description: "Practice technical and behavioral questions tailored to you.",
      icon: MessageSquare,
    },
    {
      number: "04",
      title: "Build",
      description: "Create a polished, professional and ATS-friendly resume.",
      icon: FileText,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.04] blur-[120px]" />


      <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 space-y-4"
        >    
            <Title
              title="From resume to interview-ready"
              description="One simple workflow to understand your profile, improve your gaps, prepare for interviews, and build a stronger resume."
            />
        </motion.div>


      <div className="relative mx-auto mt-8 w-full max-w-6xl px-6">
        {/* Connecting line */}

        {/* <div className="absolute left-[12%] right-[12%] top-[52px] hidden h-px bg-gradient-to-r from-orange-500/10 via-orange-500/30 to-orange-500/10 lg:block" /> */}

        <motion.div 
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.number}
                className="group relative"
                variants={cardVariants}
              >
                {/* Step */}
                <div className="mb-5 flex items-center gap-2 justify-between px-2">
                  <span className="text-xs font-medium tracking-[0.2em] text-orange-400/70">
                    {value.number}
                  </span>

                   <div className="w-[90%] h-px bg-orange-400"></div> 
                  <ArrowRight
                    size={16}
                    className={`text-white/10 transition-all duration-300 ${
                      index === values.length - 1
                        ? "hidden"
                        : "lg:hidden"
                    } group-hover:text-orange-400/60`}
                  />
                </div>

                {/* Card */}
                <div className="relative h-full overflow-hidden backdrop-blur-2xl rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-orange-400/30 group-hover:bg-orange-500/[0.04]">
                  {/* Top glow */}
                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="relative mb-7 flex h-12 w-12 items-center justify-center rounded-xl border border-orange-400/15 bg-orange-500/[0.08] text-orange-400 transition-all duration-300 group-hover:border-orange-400/30 group-hover:bg-orange-500/[0.12]">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {value.title}
                    </h3>

                    <p className="text-sm leading-6 text-stone-400">
                      {value.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default QuickValues;