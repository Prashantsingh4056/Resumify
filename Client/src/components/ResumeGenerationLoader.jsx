import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  FileText,
  WandSparkles,
  LayoutTemplate,
  ScanSearch,
  FileCheck2,
  LoaderIcon,
  Loader2,
} from "lucide-react";

const steps = [
  {
    label: "Reading your details",
    description:
      "Collecting your education, skills, projects and experience.",
    icon: Loader2,
  },
  {
    label: "Crafting your content",
    description:
      "Turning your information into clear, professional resume content.",
    icon: Loader2,
  },
  {
    label: "Structuring your resume",
    description:
      "Organizing everything into a clean ATS-friendly layout.",
    icon: Loader2,
  },
  {
    label: "Optimizing your resume",
    description:
      "Refining your content for clarity, relevance and impact.",
    icon: Loader2,
  },
  {
    label: "Generating your resume",
    description:
      "Preparing your polished resume for the final preview.",
    icon: Loader2,
  },
];

const ResumeGenerationLoader = ({ isComplete = false }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        // Stay on the final step until the API actually finishes
        if (prev >= steps.length - 1) {
          return prev;
        }

        return prev + 1;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [isComplete]);

  const activeStep = isComplete ? steps.length - 1 : currentStep;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="absolute left-[15%] top-[20%] h-40 w-40 rounded-full bg-purple-500/5 blur-[100px]" />

        <div className="absolute bottom-[10%] right-[15%] h-40 w-40 rounded-full bg-orange-500/5 blur-[100px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* AI Icon */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            {/* Outer pulse */}
            <motion.div
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.35, 0, 0.35],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-2xl bg-orange-500/20"
            />

            {/* Icon container */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 rgba(249,115,22,0)",
                  "0 0 45px rgba(249,115,22,0.25)",
                  "0 0 0 rgba(249,115,22,0)",
                ],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
              }}
              className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10"
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              >
                <Sparkles
                  size={34}
                  strokeWidth={1.7}
                  className="text-orange-400"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-10 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isComplete ? "complete" : "generating"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {isComplete
                  ? "Your resume is ready"
                  : "Building your resume"}
              </h1>

              <p className="mt-3 text-sm text-white/40 sm:text-base">
                {isComplete
                  ? "Taking you to your resume preview..."
                  : "AI is turning your details into a polished resume."}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress line */}
        <div className="mb-10">
          <div className="relative h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={{ width: "0%" }}
              animate={{
                width: isComplete
                  ? "100%"
                  : `${((activeStep + 1) / steps.length) * 100}%`,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="absolute left-0 top-0 h-full rounded-full bg-orange-500"
            />

            {!isComplete && (
              <motion.div
                animate={{ x: ["-100%", "500%"] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-0 h-full w-1/3 bg-white/20 blur-sm"
              />
            )}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, index) => {
            const Icon = step.icon;

            const completed = isComplete || index < activeStep;
            const active = !isComplete && index === activeStep;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: index <= activeStep || isComplete ? 1 : 0.35,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 transition-colors ${
                  active
                    ? "border-orange-500/20 bg-orange-500/[0.06]"
                    : "border-transparent"
                }`}
              >
                {/* Status icon */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    completed
                      ? "bg-orange-500/10 text-orange-400"
                      : active
                        ? "bg-orange-500/10 text-orange-400"
                        : "bg-white/[0.04] text-white/20"
                  }`}
                >
                  {completed ? (
                    <Check size={17} strokeWidth={2.5} />
                  ) : active ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Icon size={17} />
                    </motion.div>
                  ) : (
                    <Icon size={17} />
                  )}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      completed || active
                        ? "text-white"
                        : "text-white/30"
                    }`}
                  >
                    {step.label}
                  </p>

                  {active && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-1 text-xs text-white/35"
                    >
                      {step.description}
                    </motion.p>
                  )}
                </div>

                {/* Active indicator */}
                {active && (
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-orange-400"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom text */}
        <p className="mt-8 text-center text-[11px] text-white/20">
          This may take a few moments while we generate your resume.
        </p>
      </div>
    </motion.div>
  );
};

export default ResumeGenerationLoader;