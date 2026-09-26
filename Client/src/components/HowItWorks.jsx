import React from "react";
import { motion } from "framer-motion";

import {
  User,
  LogIn,
  Sparkles,
  FileText,
  Upload,
  PlusCircle,
  Wrench,
  FileCheck2,
  ArrowRight,
  BarChart3,
  MessageSquare,
  CheckCircle2,
  FileSearch,
  ArrowBigDown,
} from "lucide-react";

import Title from "./Title";

function HowItWorks() {
  return (
    <section className=" relative w-full overflow-hidden px-4 py-24 select-none">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[20%] -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/[0.035] blur-[150px]" />

      <Title
        title="How it Works?"
        description="Choose your path and let AI guide you from your profile to a stronger resume and better interview preparation."
      />

      <div className="mx-auto mt-20 w-full max-w-6xl">

        {/* ===================================================== */}
        {/* STEP 01 */}
        {/* ===================================================== */}

        <StepCard
          step="01"
          title="Get Started"
          description="Create an account or log in to access your personalized workspace."
        >
          <div className="mx-auto w-full max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:border-orange-500/25 hover:bg-orange-500/[0.03]">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
                <User size={22} />
              </div>

              <div className="flex-1">

                <p className="text-sm font-semibold text-white">
                  Welcome back
                </p>

                <p className="mt-1 text-xs text-stone-500">
                  Access your personalized resume workspace.
                </p>

              </div>

              <div className="hidden items-center gap-2 rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-2 text-xs font-medium text-orange-400 sm:flex">
                <LogIn size={14} />
                Login
              </div>

            </div>

          </div>
        </StepCard>


        {/* ===================================================== */}
        {/* STEP 02 */}
        {/* ===================================================== */}

        <StepCard
          step="02"
          title="Choose Your Path"
          description="Start by analyzing your existing resume or create and improve one with AI."
        >

          <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">

            {/* ANALYZE RESUME */}

            <div className="backdrop-blur-xl group relative overflow-hidden rounded-3xl border border-orange-500/20 bg-orange-500/[0.025] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40">

              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/10 blur-[70px]" />

              <div className="relative flex items-start justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
                    <FileSearch size={22} />
                  </div>

                  <div>

                    <h4 className="text-lg font-semibold text-white">
                      Analyze Resume
                    </h4>

                    <p className="mt-1 text-xs text-stone-500">
                      Understand your job fit
                    </p>

                  </div>

                </div>

                <ArrowRight
                  size={18}
                  className="text-orange-400/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-400"
                />

              </div>


              {/* MINI ANALYSIS UI */}

              <div className="relative mt-7 rounded-2xl border border-white/[0.07] bg-[#0d0d0f] p-4">

                <div className="mb-4 flex items-center justify-between">

                  <span className="text-xs font-semibold text-white">
                    Resume Analysis
                  </span>

                  <span className="rounded-full bg-orange-500/10 px-2 py-1 text-[9px] font-medium text-orange-400">
                    AI Powered
                  </span>

                </div>

                <MiniInput
                  icon={Upload}
                  title="Resume.pdf"
                  description="Upload your current resume"
                  checked
                />

                <MiniInput
                  icon={FileText}
                  title="Job Description"
                  description="Add the role you're targeting"
                  checked
                />

                <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-orange-500/10 py-2.5 text-[11px] font-semibold text-orange-400">
                  <Sparkles size={14} />
                  Analyze with AI
                </div>

              </div>

            </div>


            {/* BUILD WITH AI */}

            <div className="backdrop-blur-xl group relative overflow-hidden rounded-3xl border border-purple-500/20 bg-purple-500/[0.025] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/40">

              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/10 blur-[70px]" />

              <div className="relative flex items-start justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                    <Sparkles size={22} />
                  </div>

                  <div>

                    <h4 className="text-lg font-semibold text-white">
                      Build with AI
                    </h4>

                    <p className="mt-1 text-xs text-stone-500">
                      Create or improve your resume
                    </p>

                  </div>

                </div>

                <ArrowRight
                  size={18}
                  className="text-purple-400/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-purple-400"
                />

              </div>


              {/* BUILD OPTIONS */}

              <div className="relative mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <BuildOption
                  icon={Wrench}
                  title="Enhance Existing"
                  description="Improve your current resume with AI."
                  footer="Upload resume"
                  footerIcon={Upload}
                />

                <BuildOption
                  icon={PlusCircle}
                  title="Build From Scratch"
                  description="Create a new resume from your details."
                  footer="Enter your details"
                  footerIcon={PlusCircle}
                />

              </div>

            </div>

          </div>

        </StepCard>


        {/* ===================================================== */}
        {/* STEP 03 */}
        {/* ===================================================== */}

        <StepCard
          step="03"
          title="Get Your Results"
          description="Your selected workflow turns your information into actionable insights or a polished resume."
          last
        >

          <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">

            {/* INTERVIEW REPORT */}

            <div className="backdrop-blur-xl rounded-3xl border border-orange-500/15 bg-orange-500/[0.02] p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <BarChart3 size={19} />
                </div>

                <div>

                  <p className="text-xs font-medium text-orange-400">
                    ANALYSIS RESULT
                  </p>

                  <h4 className="mt-1 text-base font-semibold text-white">
                    Interview Report
                  </h4>

                </div>

              </div>


              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-[#0d0d0f] p-4">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] text-stone-500">
                      Resume Match
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                      78%
                    </p>

                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-orange-500/20 border-t-orange-400 text-xs font-bold text-orange-400">
                    78
                  </div>

                </div>


                <div className="mt-5 space-y-2">

                  <ResultRow
                    icon={CheckCircle2}
                    title="Strengths"
                    value="3 areas"
                  />

                  <ResultRow
                    icon={FileCheck2}
                    title="Areas to Improve"
                    value="5 areas"
                  />

                  <ResultRow
                    icon={MessageSquare}
                    title="Interview Questions"
                    value="20+ questions"
                  />

                </div>

              </div>

            </div>


            {/* OPTIMIZED RESUME */}

            <div className="backdrop-blur-xl rounded-3xl border border-purple-500/15 bg-purple-500/[0.02] p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <FileCheck2 size={19} />
                </div>

                <div>

                  <p className="text-xs font-medium text-purple-400">
                    BUILD RESULT
                  </p>

                  <h4 className="mt-1 text-base font-semibold text-white">
                    Optimized Resume
                  </h4>

                </div>

              </div>


              {/* RESUME MOCKUP */}

              <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d0f] p-4">

                <div className="rounded-xl border border-black/10 bg-white p-4 text-black">

                  <div className="border-b border-black/10 pb-3">

                    <p className="text-base font-bold">
                      Your Name
                    </p>

                    <p className="mt-0.5 text-[9px] text-black/50">
                      Full Stack Developer
                    </p>

                  </div>

                  <div className="mt-3 space-y-2">

                    <ResumeLine title="Experience" />
                    <ResumeLine title="Skills" />
                    <ResumeLine title="Projects" />

                  </div>

                </div>


                <div className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1.5 text-[9px] font-medium text-emerald-400">

                  <CheckCircle2 size={11} />

                  ATS-Friendly

                </div>

              </div>

            </div>

          </div>

        </StepCard>


        {/* FINAL CTA */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-16 flex justify-center"
        >

          <div className="backdrop-blur-xl flex items-center gap-3 rounded-full border border-orange-500/20 bg-orange-500/[0.05] px-6 py-3">

            <Sparkles
              size={16}
              className="text-orange-400"
            />

            <span className="text-sm font-medium text-white">
              Ready to take the next step?
            </span>

          </div>

        </motion.div>

      </div>
    </section>
  );
}


/* ============================================================= */
/* STEP CARD */
/* ============================================================= */

function StepCard({
  step,
  title,
  description,
  children,
  last = false,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 70,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${last ? "" : "mb-28"} relative`}
    >

      {/* Step Number */}

      <div className="flex justify-center">

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-xs font-bold text-orange-400 shadow-[0_0_25px_rgba(255,85,0,0.12)]"
        >
          {step}
        </motion.div>

      </div>


      {/* Heading */}

      <div className="mt-5 text-center">

        <h3 className="text-xl font-semibold tracking-tight text-white">
          {title}
        </h3>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-stone-400">
          {description}
        </p>

      </div>


      {/* Content */}

      <div className="relative z-10 mt-8">
        {children}
      </div>

    </motion.div>
  );
}


/* ============================================================= */
/* MINI INPUT */
/* ============================================================= */

function MiniInput({
  icon: Icon,
  title,
  description,
  checked,
}) {
  return (
    <div className="mb-2 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
        <Icon size={16} />
      </div>

      <div className="flex-1">

        <p className="text-[11px] font-medium text-white">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] text-stone-500">
          {description}
        </p>

      </div>

      {checked && (
        <CheckCircle2
          size={15}
          className="text-emerald-400"
        />
      )}

    </div>
  );
}


/* ============================================================= */
/* BUILD OPTION */
/* ============================================================= */

function BuildOption({
  icon: Icon,
  title,
  description,
  footer,
  footerIcon: FooterIcon,
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d0f] p-4 transition-colors duration-300 hover:border-purple-500/20">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
        <Icon size={18} />
      </div>

      <h5 className="mt-4 text-sm font-semibold text-white">
        {title}
      </h5>

      <p className="mt-1.5 text-[10px] leading-5 text-stone-500">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-[10px] font-medium text-purple-400">
        <FooterIcon size={12} />
        {footer}
      </div>

    </div>
  );
}


/* ============================================================= */
/* RESULT ROW */
/* ============================================================= */

function ResultRow({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">

      <Icon
        size={14}
        className="text-orange-400"
      />

      <span className="flex-1 text-[10px] text-stone-300">
        {title}
      </span>

      <span className="text-[9px] text-stone-500">
        {value}
      </span>

    </div>
  );
}


/* ============================================================= */
/* RESUME LINE */
/* ============================================================= */

function ResumeLine({ title }) {
  return (
    <div>

      <p className="text-[8px] font-bold uppercase tracking-wider text-black/60">
        {title}
      </p>

      <div className="mt-1 h-1.5 w-full rounded bg-black/10" />

      <div className="mt-1 h-1.5 w-4/5 rounded bg-black/10" />

    </div>
  );
}


export default HowItWorks;