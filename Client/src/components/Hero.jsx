import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden mt-10">
      {/* =========================
          BACKGROUND
      ========================== */}

      {/* Ambient orange glow */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute left-[20%] top-[-15%] h-[500px] w-[500px] rounded-full bg-[#ff5500]/[0.06] blur-[140px]" />

        <div className="absolute right-[5%] top-[15%] h-[450px] w-[450px] rounded-full bg-[#ff7300]/[0.04] blur-[140px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Decorative technical line */}
      {/* <div className="pointer-events-none absolute left-0 top-28 hidden h-px w-[20%] bg-gradient-to-r from-[#ff5500]/40 to-transparent lg:block" /> */}

      {/* <div className="pointer-events-none absolute right-0 top-[38%] hidden h-px w-[14%] bg-gradient-to-l from-[#ff5500]/20 to-transparent lg:block" /> */}

      {/* =========================
          HERO CONTENT
      ========================== */}

      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* =========================
              LEFT CONTENT
          ========================== */}

          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#ff5500]/20 bg-[#ff5500]/[0.07] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#ff7a32]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5500] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff650f]" />
              </span>
              AI-POWERED RESUME INTELLIGENCE
            </div>

            {/* Main heading */}
            <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.25rem]">
              Optimize your resume.
              <br />
              <span className="bg-gradient-to-r from-[#ff5a0a] via-[#ff7525] to-amber-400 bg-clip-text text-transparent">
                Land the interview.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-10 max-w-xl text-base leading-7 text-stone-400 sm:text-lg">
              Upload your resume and target job description to uncover skill
              gaps, improve your ATS score, and generate personalized interview
              questions tailored to your experience.
            </p>

            {/* CTA buttons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Primary CTA */}
              <Link to="/analyze">
                <button
                  type="button"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff650f] px-6 py-3.5 text-sm font-bold text-stone-950 shadow-[0_8px_30px_rgba(255,85,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff7626] hover:shadow-[0_12px_35px_rgba(255,85,0,0.3)] active:translate-y-0 sm:w-auto"
                >
                  Analyze My Resume
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-6-6 6 6-6 6"
                    />
                  </svg>
                </button>
              </Link>

              {/* Secondary CTA */}
              <Link to='/build-with-ai'>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] hover:bg-white/[0.07] active:translate-y-0 sm:w-auto"
                >
                  <span className="text-[#ff7525]">✦</span>
                  Build with AI
                </button>
              </Link>
            </div>

            {/* Trust / value indicators */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-stone-500">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                ATS focused
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                AI powered
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                PDF & DOCX
              </span>
            </div>
          </div>

          {/* =========================
              RIGHT UPLOAD CARD
          ========================== */}

          <div className="relative flex items-center justify-center">
            {/* Background glow */}
            <div className="pointer-events-none absolute h-[380px] w-[380px] " />

            <div className="relative w-full max-w-xl">
              {/* Decorative corner line */}
              <div className="pointer-events-none absolute -left-3 -top-3 hidden h-20 w-20 rounded-tl-[28px] border-l border-t border-[#ff5500]/30 sm:block" />

              <div className="pointer-events-none absolute -bottom-3 -right-3 hidden h-20 w-20 rounded-br-[28px] border-b border-r border-[#ff5500]/20 sm:block" />

              {/* Main card */}
              <div className="group relative overflow-hidden rounded-[30px] border border-dashed border-orange-700/80 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl bg-black/[0.20] sm:p-12">
                {/* Top orange radial glow */}
                {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,85,0,0.11),transparent_52%)]" /> */}

                {/* Dot pattern */}
                <div
                  className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ff6a00 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />

                {/* AI Ready badge */}
                <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[11px] font-medium text-stone-400 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  AI Ready
                </div>

                {/* Card content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Section label */}
                  <div className="mb-7 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-600">
                    <span className="h-px w-7 bg-white/[0.08]" />
                    Resume Analysis
                    <span className="h-px w-7 bg-white/[0.08]" />
                  </div>

                  {/* Document icon */}
                  <div className="relative mb-7">
                    {/* Glow */}
                    <div className="absolute inset-0 scale-125 rounded-full bg-[#ff5500]/10 blur-2xl" />

                    {/* Document */}
                    <div className="relative z-10 flex h-20 w-16 flex-col justify-end rounded-xl border border-stone-800 bg-[#18130f] p-3 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
                      {/* Document dots */}
                      <div className="absolute left-4 top-4 flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-stone-700" />
                        <span className="h-1.5 w-1.5 rounded-full bg-stone-700" />
                      </div>

                      {/* PDF badge */}
                      <span className="rounded-md border border-[#ff5500]/20 bg-[#ff5500]/[0.05] px-1.5 py-1 text-center text-[9px] font-extrabold tracking-wider text-[#ff6d1a]">
                        PDF
                      </span>
                    </div>

                    {/* Spark */}
                    <div className="absolute -right-4 -top-3 text-[#ff7525] drop-shadow-[0_0_10px_rgba(255,115,0,0.65)]">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" />
                      </svg>
                    </div>
                  </div>

                  {/* Upload heading */}
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Drop your resume here
                  </h2>

                  <p className="mt-2 text-sm text-stone-500">
                    or browse files from your device
                  </p>

                  {/* Upload area */}
                  <label
                    htmlFor="resume-upload"
                    className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-[#ff6a00]/35 bg-[#ff5500]/[0.035] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff6a00]/70 hover:bg-[#ff5500]/[0.08] hover:shadow-[0_10px_30px_rgba(255,85,0,0.12)] active:translate-y-0"
                  >
                    <svg
                      className="h-4 w-4 text-[#ff7525]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Upload Resume
                    <input
                      id="resume-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx"
                    />
                  </label>

                  {/* File information */}
                  <div className="mt-7 flex items-center gap-2 text-[11px] font-medium tracking-wide text-stone-600">
                    <span>PDF</span>
                    <span className="text-stone-600 text-2xl">•</span>
                    <span>MAX 10MB</span>
                  </div>

                  {/* Bottom divider */}
                  <div className="mt-8 flex w-full items-center gap-3">
                    <div className="h-px flex-1 bg-white/[0.05]" />

                    <span className="text-[10px] text-stone-600">
                      Secure processing
                    </span>

                    <div className="h-px flex-1 bg-white/[0.05]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
