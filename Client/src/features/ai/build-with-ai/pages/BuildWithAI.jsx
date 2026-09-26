import React, { useState, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileEdit,
  FilePlus2,
  UploadCloud,
  X as XIcon,
  Bell,
  Moon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  User,
  GraduationCap,
  Code2,
  Briefcase,
  FolderGit2,
  FileText,
  Plus,
  X,
  Pencil,
  Trash2,
  Globe,
  Sparkles,
  Lock,
  Menu,
  ArrowLeftIcon,
  BriefcaseBusiness,
  InfoIcon,
} from "lucide-react";

import useResumeWithAI from "../hooks/useResumeWithAI";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../../../../pages/TopBar";
import ResumeGenerationLoader from "../../../../components/ResumeGenerationLoader";

/* lucide-react dropped brand/logo icons (Github, Linkedin, etc.) from its
   core export, so these are small local replacements sized to match. */
function GithubIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

/* ================================================================== */
/*  Shared config                                                      */
/* ================================================================== */

const STEPS = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "About", icon: InfoIcon },
  { id: 3, label: "Education", icon: GraduationCap },
  { id: 4, label: "Skills", icon: Code2 },
  { id: 5, label: "Experience", icon: Briefcase },
  { id: 6, label: "Projects", icon: FolderGit2 },
  { id: 7, label: "Additional Info", icon: FileText },
  { id: 8, label: "Review", icon: CheckCircle2 },

];

const SKILL_CATEGORIES = [
  { key: "languages", label: "Programming Languages", placeholder: "e.g. C++, Python" },
  { key: "frontend", label: "Frontend", placeholder: "e.g. React, Tailwind CSS" },
  { key: "backend", label: "Backend", placeholder: "e.g. Node.js, Express" },
  { key: "databases", label: "Databases", placeholder: "e.g. MongoDB, PostgreSQL" },
  { key: "ai", label: "AI / ML", placeholder: "e.g. TensorFlow, Gemini AI" },
  { key: "tools", label: "Tools & Technologies", placeholder: "e.g. Git, Docker" },
  { key: "other", label: "Other", placeholder: "e.g. Agile, Public Speaking" },
];

const ADDITIONAL_FIELDS = [
  { key: "certifications", label: "Certifications", hint: "Licenses, online courses, professional certifications" },
  { key: "achievements", label: "Achievements", hint: "Competition wins, recognitions, milestones" },
  { key: "coursework", label: "Relevant Coursework", hint: "Courses that support your target role" },
  { key: "publications", label: "Publications", hint: "Papers, articles, or research you've published" },
  { key: "awards", label: "Awards", hint: "Honors and awards you've received" },
  { key: "careerGoals", label: "Career Goals", hint: "What you're looking to do next" },
  { key: "additionalInfo", label: "Additional Information", hint: "Anything else worth including" },
];

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// const emptyFormData = () => ({
//   personalInfo: {
//     fullName: "",
//     title: "",
//     email: "",
//     phone: "",
//     location: "",
//     github: "",
//     linkedin: "",
//     portfolio: "",
//   },

//   aboutAndTarget: {
//     introduction: "",
//     jobDescription: "",
//   },

//   education: [],

//   skills: {
//     languages: [],
//     frontend: [],
//     backend: [],
//     databases: [],
//     ai: [],
//     tools: [],
//     other: [],
//   },

//   experience: [],

//   projects: [],

//   additionalInfo: {
//     certifications: "",
//     achievements: "",
//     coursework: "",
//     publications: "",
//     awards: "",
//     careerGoals: "",
//     additionalNotes: "",
//   },
// });

const emptyFormData = () => ({
  personalInfo: {
    fullName: "Prashant Singh",
    title: "Full Stack Developer | SDE Aspirant",
    email: "prashantsingh97393535@gmail.com",
    phone: "6388413576",
    location: "Kanpur, Uttar Pradesh",
    github: "https://github.com/Prashantsingh4056",
    linkedin: "https://www.linkedin.com/in/prashant-singh-636982324/",
    portfolio: "https://endearing-pithivier-e97900.netlify.app/",
  },

  aboutAndTarget: {
    introduction:
      "B.Tech Electronics Engineering student at IIIT Kota with a strong foundation in Data Structures and Algorithms and full-stack web development. Experienced in building modern web applications using the MERN stack and integrating AI solutions with Gemini AI. Passionate about solving complex problems, learning modern technologies, and building scalable applications with clean and efficient code.",

    jobDescription:
      "",
  },

  education: [
    {
      institution: "Indian Institute of Information Technology (IIIT), Kota",
      degree: "B.Tech",
      field: "Electronics Engineering",
      startYear: "2024",
      endYear: "2028",
      cgpa: "8.5/10",
    },
  ],

  skills: {
    languages: [
      "C++",
      "Java",
      "JavaScript",
      "Python",
    ],

    frontend: [
      "React.js",
      "Redux Toolkit",
      "Tailwind CSS",
    ],

    backend: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
    ],

    databases: [
      "MongoDB",
      "ImageKit",
    ],

    ai: [
      "Gemini AI",
    ],

    tools: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code"
    ],

    other: [
      "Data Structures & Algorithms",
      "Responsive Design",
    ],
  },

  experience: [],

  projects: [
    {
      name: "AI Resume Builder",
      technologies: [
        "MERN Stack",
        "JWT",
        "ImageKit",
        "PDF Export",
        "Redux Toolkit",
      ],
      github: "https://github.com/Prashantsingh4056/AI-Powered-Resume-Builder",
      liveDemo: "",
      description:
        "Full-stack application that enables users to generate professional resumes using AI-driven content suggestions and customizable templates.",
      contributions: [
        "Implemented secure user authentication using JWT.",
        "Integrated ImageKit for cloud-based profile image management.",
        "Implemented professional resume templates with customizable layouts.",
        "Added PDF generation and resume sharing functionality.",
      ],
    },

    {
      name: "AlgoPilot AI",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Gemini AI",
        "Express.js",
        "Tailwind CSS"
      ],
      github: "https://github.com/Prashantsingh4056/AlgoPilot",
      liveDemo: "https://algo-pilot-ruddy.vercel.app/",
      description:
        "AI-powered DSA learning platform designed to help students prepare for technical interviews through personalized learning and progress tracking.",
      contributions: [
        "Integrated Gemini AI for automated code reviews.",
        "Implemented dynamic coding challenges based on user progress.",
        "Developed personalized interview roadmaps for students.",
        "Designed a tracking system to monitor learning progress and interview readiness.",
      ],
    },

    {
      name: "LynkUp",
      technologies: [
        "React.js",
        "Node.js",
        "MongoDB",
        "Imagekit",
        "Tailwind CSS",
      ],
      github: "https://github.com/Prashantsingh4056/LynkUp",
      liveDemo: "https://lynk-up-psi.vercel.app/",
      description:
        "Modern responsive e-commerce storefront focused on performance and intuitive user experience.",
      contributions: [
        "Implemented product filtering and shopping cart management.",
        "Built modular React components for scalable UI development.",
        "Optimized layouts for both mobile and desktop devices.",
        "Implemented seamless navigation using reusable frontend components.",
      ],
    },
  ],

  additionalInfo: {
    certifications: "",

    achievements:
      "",

    coursework:
      "Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks",

    publications: "",

    awards: "",

    careerGoals:
      "Seeking a Software Development Engineer or Full Stack Development internship where I can apply my problem-solving and software development skills while gaining experience building real-world products.",

    additionalNotes:
      "Actively exploring modern web frameworks, AI integration, and software engineering practices. Interested in building practical applications that combine full-stack development with Generative AI.",
  },
});

/* ================================================================== */
/*  Small UI atoms (shared by both panels)                             */
/* ================================================================== */

function Field({ label, required, className = "", children }) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-300">
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      )}
      {children}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-gray-100 placeholder:text-gray-600 outline-none transition-colors duration-150 focus:border-orange-500/60 focus:bg-white/[0.05]";

function TextInput({ icon: Icon, className = "", ...props }) {
  if (Icon) {
    return (
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
        <input className={`${inputBase} pl-9 ${className}`} {...props} />
      </div>
    );
  }
  return <input className={`${inputBase} ${className}`} {...props} />;
}

function TextArea({ className = "", ...props }) {
  return <textarea className={`${inputBase} resize-none ${className}`} {...props} />;
}

function IconButton({ icon: Icon, onClick, title, tone = "default", className = "" }) {
  const tones = {
    default: "text-gray-400 hover:text-gray-200 hover:bg-white/5",
    danger: "text-gray-400 hover:text-red-400 hover:bg-red-500/10",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 ${tones[tone]} ${className}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function GhostButton({ icon: Icon, children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-xl border border-dashed border-white/15 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors duration-150 hover:border-orange-500/50 hover:text-orange-400 ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

function ChipInput({ value = [], onChange, placeholder }) {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const v = draft.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setDraft("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const remove = (chip) => onChange(value.filter((c) => c !== chip));

  return (
    <div
      className={`${inputBase} flex flex-wrap items-center gap-1.5 py-2`}
      onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
    >
      {value.map((chip) => (
        <span
          key={chip}
          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-200"
        >
          {chip}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              remove(chip);
            }}
            className="text-gray-500 hover:text-red-400"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commit}
        placeholder={value.length === 0 ? placeholder || "Type a skill and press Enter" : ""}
        className="min-w-[120px] flex-1 bg-transparent text-sm text-gray-100 placeholder:text-gray-600 outline-none"
      />
    </div>
  );
}

function BulletList({ label, value = [], onChange, addLabel = "Add bullet", placeholder }) {
  const update = (i, v) => onChange(value.map((b, idx) => (idx === i ? v : b)));
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  const add = () => onChange([...value, ""]);

  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-medium text-gray-300">{label}</label>}
      <div className="space-y-2">
        {value.map((bullet, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            <input
              value={bullet}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className={`${inputBase} flex-1 py-2`}
            />
            <IconButton icon={X} tone="danger" onClick={() => remove(i)} title="Remove" />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-orange-400 hover:text-orange-300"
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>
    </div>
  );
}

function EntryCard({ title, subtitle, isEditing, onEdit, onDone, onRemove, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-150">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-100">{title}</p>
          {subtitle && <p className="truncate text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {isEditing ? (
            <button
              type="button"
              onClick={onDone}
              className="rounded-lg bg-orange-500/10 px-3 py-1.5 text-xs font-medium text-orange-400 hover:bg-orange-500/20"
            >
              Done
            </button>
          ) : (
            <IconButton icon={Pencil} onClick={onEdit} title="Edit" />
          )}
          <IconButton icon={Trash2} tone="danger" onClick={onRemove} title="Remove" />
        </div>
      </div>
      {isEditing && <div className="border-t border-white/10 px-5 py-5">{children}</div>}
    </div>
  );
}

function Accordion({ title, hint, isOpen, onToggle, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div>
          <p className="text-sm font-medium text-gray-100">{title}</p>
          <p className="text-xs text-gray-500">{hint}</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="border-t border-white/10 px-5 py-4">{children}</div>}
    </div>
  );
}


/* ================================================================== */
/*  Option toggle cards                                                */
/* ================================================================== */

function OptionCard({ active, icon: Icon, iconTone, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-1 items-start gap-4 rounded-2xl border p-5 text-left transition-colors duration-150 ${
        active
          ? "border-orange-500/60 bg-orange-500/[0.06]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          iconTone === "orange" ? "bg-orange-500/15 text-orange-400" : "bg-purple-500/15 text-purple-400"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-gray-100">{title}</p>
        <p className="mt-0.5 text-sm text-gray-500">{description}</p>
      </div>
      {active && (
        <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
          <Check className="h-3 w-3" />
        </span>
      )}
    </button>
  );
}

/* ================================================================== */
/*  Enhance Existing Resume panel                                      */
/* ================================================================== */

function EnhancePanel() { 
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const {enhanceResumeWithAI, createResumePdfUrl} = useResumeWithAI();

  const canSubmit = file && selfDescription.trim();

  const handleFiles = (files) => { 
    if (files && files[0]) setFile(files[0]);
  };

  const handleEnhanceResume = async () => {

    try {
      setIsGenerating(true);
      
      const response = await enhanceResumeWithAI(
        file,
        jobDescription,
        selfDescription
      )
      
      if(response){
        console.log("Response: " , response);
        const pdfUrl = await createResumePdfUrl(response);
        
        navigate('/resume-preview', {
          state: {
            pdfUrl,
          }
        })
      }
      
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-start gap-3">
        <FileEdit className="mt-0.5 h-5 w-5 text-orange-500" />
        <div>
          <h3 className="text-lg font-semibold text-white">Enhance Existing Resume</h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload your current resume, tell us about yourself, and paste the job description
            you're targeting. Our AI will optimize it for maximum impact.
          </p>
        </div>
      </div>

      <div className="space-y-7">
        <Field label="1. Upload Your Current Resume" required>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors duration-150 ${
              dragging ? "border-orange-500 bg-orange-500/5" : "border-orange-500/30 bg-white/[0.015]"
            }`}
          >
            {file ? (
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-orange-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-100">{file.name}</p>
                  <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
                </div>
                <IconButton icon={XIcon} tone="danger" onClick={() => setFile(null)} title="Remove file" />
              </div>
            ) : (
              <>
                <UploadCloud className="mb-3 h-8 w-8 text-orange-500" />
                <p className="text-sm font-medium text-gray-200">Drag & drop your resume here</p>
                <p className="my-2 text-xs text-gray-600">or</p>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-150 hover:brightness-110"
                >
                  Browse Files
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <p className="mt-3 text-xs text-gray-600">PDF or DOCX • Maximum file size 10MB</p>
              </>
            )}
          </div>
        </Field>

        <Field label="2. Tell Us About Yourself" required>
          <p className="mb-2 text-sm text-gray-500">
            Share your background, skills, experience, projects, achievements and career goals.
          </p>
          <div className="relative">
            <TextArea
              rows={5}
              maxLength={2000}
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              placeholder="Write your self description here..."
            />
            <span className="absolute bottom-3 right-3 text-xs text-gray-600">{selfDescription.length} / 2000</span>
          </div>
        </Field>

        <Field label="3. Target Job Description">
          <p className="mb-2 text-sm text-gray-500">Paste the job description of the role you are applying for.</p>
          <div className="relative">
            <TextArea
              rows={5}
              maxLength={5000}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
            />
            <span className="absolute bottom-3 right-3 text-xs text-gray-600">{jobDescription.length} / 5000</span>
          </div>
        </Field>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          type="button"
          disabled={!canSubmit || isGenerating}
          onClick={handleEnhanceResume}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-transform duration-150 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Sparkles className="h-4 w-4" />
          {isGenerating ? 
          "Enhancing your Resume..." 
          : 
          "Enhance Resume with AI"
          }
        </button>
        <p className="flex items-center gap-1.5 text-xs text-gray-600">
          <Lock className="h-3 w-3" />
          Your data is secure and will not be shared.
        </p>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Build From Scratch — step indicator                                */
/* ================================================================== */

function StepIndicator({ current, onJump }) {
  return (
    <div className="mb-8">
      <div className="hidden items-center sm:flex">
        {STEPS.map((step, i) => {
          const isDone = step.id < current;
          const isActive = step.id === current;
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                disabled={!isDone && !isActive}
                onClick={() => isDone && onJump(step.id)}
                className="group flex flex-col items-center gap-2"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors duration-150 ${
                    isActive
                      ? "border-orange-500 bg-orange-500/15 text-orange-400"
                      : isDone
                      ? "border-orange-500/40 bg-orange-500/10 text-orange-400"
                      : "border-white/10 bg-white/[0.03] text-gray-600"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span
                  className={`whitespace-nowrap text-[11px] font-medium ${
                    isActive ? "text-gray-100" : isDone ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {step.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <span className={`mx-2 mb-5 h-px flex-1 ${step.id < current ? "bg-orange-500/40" : "bg-white/10"}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="sm:hidden">
        <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
          <span>
            Step {current} of {STEPS.length}
          </span>
          <span className="font-medium text-orange-400">{STEPS[current - 1].label}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300"
            style={{ width: `${(current / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Build From Scratch — steps 1-7                                     */
/* ================================================================== */

function StepPersonalInfo({ data, update }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
      <Field label="Full Name" required>
        <TextInput value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Jordan Patel" />
      </Field>
      <Field label="Professional Title">
        <TextInput value={data.title} onChange={(e) => update("title", e.target.value)} placeholder="Full Stack Developer" />
      </Field>
      <Field label="Email" required>
        <TextInput type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
      </Field>
      <Field label="Phone">
        <TextInput value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 (555) 000-0000" />
      </Field>
      <Field label="Location">
        <TextInput value={data.location} onChange={(e) => update("location", e.target.value)} placeholder="San Francisco, CA" />
      </Field>
      <div className="hidden sm:block" />
      <Field label="GitHub URL">
        <TextInput icon={GithubIcon} value={data.github} onChange={(e) => update("github", e.target.value)} placeholder="github.com/username" />
      </Field>
      <Field label="LinkedIn URL">
        <TextInput icon={LinkedinIcon} value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="linkedin.com/in/username" />
      </Field>
      <Field label="Portfolio URL" className="sm:col-span-2">
        <TextInput icon={Globe} value={data.portfolio} onChange={(e) => update("portfolio", e.target.value)} placeholder="yourportfolio.com" />
      </Field>
    </div>
  );
}


function StepAboutAndTarget({formData, updateAboutAndTarget}) {


  // const canSubmit = formData.aboutAndTarget.introduction.trim();
  return (
    <section className="rounded-2xl">

      <div className="space-y-6">

        {/* Introduction */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-200">
            Self Introduction
            <span className="ml-1 text-orange-400">*</span>
          </label>

          <p className="text-xs leading-relaxed text-zinc-500">
            Tell us about your background, interests, strengths, experience,
            and career goals. Don't worry about writing it professionally.
          </p>

          <textarea
            value={formData.aboutAndTarget.introduction}
            onChange={(e) =>
              updateAboutAndTarget(
                "introduction",
                e.target.value
              )
            }
            placeholder="Example: I'm a second-year ECE student interested in software development. I enjoy building full-stack applications, solving DSA problems, and exploring AI..."
            rows={6}
            className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-zinc-600 hover:border-white/15 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
          />

          <div className="flex justify-end">
            <span className="text-xs text-zinc-600">
              {formData.aboutAndTarget.introduction.length}/1000
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Job Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-200">
              Target Job Description
            </label>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-500">
              Optional
            </span>
          </div>

          <p className="text-xs leading-relaxed text-zinc-500">
            Paste the job description you're applying for. AI will tailor
            your resume to highlight the most relevant skills and experience.
          </p>

          <textarea
            value={formData.aboutAndTarget.jobDescription}
            onChange={(e) =>
              updateAboutAndTarget(
                "jobDescription",
                e.target.value
              )
            }
            placeholder="Paste the job description here..."
            rows={8}
            className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-zinc-600 hover:border-white/15 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
          />

          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <FileText size={13} />
            <span>
              Providing a job description helps AI create a more targeted
              resume.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};


function StepEducation({ list, setList }) {
  const [editingId, setEditingId] = useState(null);

  const add = () => {
    const entry = { id: uid(), institution: "", degree: "", field: "", startYear: "", endYear: "", cgpa: "" };
    setList([...list, entry]);
    setEditingId(entry.id);
  };
  const patch = (id, key, value) => setList(list.map((e) => (e.id === id ? { ...e, [key]: value } : e)));
  const remove = (id) => {
    setList(list.filter((e) => e.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {list.length === 0 && <p className="text-sm text-gray-500">Add your schools, colleges, or universities.</p>}
      {list.map((edu) => (
        <EntryCard
          key={edu.id}
          title={edu.degree || edu.institution || "New education entry"}
          subtitle={[edu.institution, edu.field].filter(Boolean).join(" · ")}
          isEditing={editingId === edu.id}
          onEdit={() => setEditingId(edu.id)}
          onDone={() => setEditingId(null)}
          onRemove={() => remove(edu.id)}
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <Field label="Institution" required>
              <TextInput value={edu.institution} onChange={(e) => patch(edu.id, "institution", e.target.value)} placeholder="Stanford University" />
            </Field>
            <Field label="Degree" required>
              <TextInput value={edu.degree} onChange={(e) => patch(edu.id, "degree", e.target.value)} placeholder="B.S. Computer Science" />
            </Field>
            <Field label="Field of Study">
              <TextInput value={edu.field} onChange={(e) => patch(edu.id, "field", e.target.value)} placeholder="Computer Science" />
            </Field>
            <Field label="CGPA (optional)">
              <TextInput value={edu.cgpa} onChange={(e) => patch(edu.id, "cgpa", e.target.value)} placeholder="3.8 / 4.0" />
            </Field>
            <Field label="Start Year">
              <TextInput value={edu.startYear} onChange={(e) => patch(edu.id, "startYear", e.target.value)} placeholder="2021" />
            </Field>
            <Field label="Graduation Year / Expected">
              <TextInput value={edu.endYear} onChange={(e) => patch(edu.id, "endYear", e.target.value)} placeholder="2025" />
            </Field>
          </div>
        </EntryCard>
      ))}
      <GhostButton icon={Plus} onClick={add}>
        Add Education
      </GhostButton>
    </div>
  );
}

function StepSkills({ skills, setSkills }) {
  const update = (key, value) => setSkills({ ...skills, [key]: value });
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {SKILL_CATEGORIES.map((cat) => (
        <Field key={cat.key} label={cat.label}>
          <ChipInput value={skills[cat.key]} onChange={(v) => update(cat.key, v)} placeholder={cat.placeholder} />
        </Field>
      ))}
    </div>
  );
}

function StepExperience({ list, setList }) {
  const [editingId, setEditingId] = useState(null);

  const add = () => {
    const entry = {
      id: uid(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      responsibilities: [""],
    };
    setList([...list, entry]);
    setEditingId(entry.id);
  };
  const patch = (id, key, value) => setList(list.map((e) => (e.id === id ? { ...e, [key]: value } : e)));
  const remove = (id) => {
    setList(list.filter((e) => e.id !== id));
    if (editingId === id) setEditingId(null);
  };

  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-10 text-center">
        <Briefcase className="mx-auto mb-3 h-8 w-8 text-gray-600" />
        <p className="text-sm font-medium text-gray-200">No professional experience yet?</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
          You can skip this section and highlight your projects instead.
        </p>
        <GhostButton icon={Plus} onClick={add} className="mx-auto mt-5">
          Add Experience
        </GhostButton>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {list.map((exp) => (
        <EntryCard
          key={exp.id}
          title={exp.title || "New experience entry"}
          subtitle={[exp.company, exp.location].filter(Boolean).join(" · ")}
          isEditing={editingId === exp.id}
          onEdit={() => setEditingId(exp.id)}
          onDone={() => setEditingId(null)}
          onRemove={() => remove(exp.id)}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <Field label="Job Title">
                <TextInput value={exp.title} onChange={(e) => patch(exp.id, "title", e.target.value)} placeholder="Software Engineer Intern" />
              </Field>
              <Field label="Company">
                <TextInput value={exp.company} onChange={(e) => patch(exp.id, "company", e.target.value)} placeholder="Acme Inc." />
              </Field>
              <Field label="Location">
                <TextInput value={exp.location} onChange={(e) => patch(exp.id, "location", e.target.value)} placeholder="Remote" />
              </Field>
              <div className="flex items-end gap-3">
                <Field label="Start Date" className="flex-1">
                  <TextInput type="month" value={exp.startDate} onChange={(e) => patch(exp.id, "startDate", e.target.value)} />
                </Field>
                <Field label="End Date" className="flex-1">
                  <TextInput
                    type="month"
                    disabled={exp.current}
                    value={exp.current ? "" : exp.endDate}
                    onChange={(e) => patch(exp.id, "endDate", e.target.value)}
                    className={exp.current ? "opacity-40" : ""}
                  />
                </Field>
              </div>
            </div>
            <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => patch(exp.id, "current", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-orange-500 accent-orange-500"
              />
              Currently working here
            </label>
            <BulletList
              label="Description / Responsibilities"
              value={exp.responsibilities}
              onChange={(v) => patch(exp.id, "responsibilities", v)}
              addLabel="Add bullet point"
              placeholder="Led migration of..."
            />
          </div>
        </EntryCard>
      ))}
      <GhostButton icon={Plus} onClick={add}>
        Add Experience
      </GhostButton>
    </div>
  );
}

function StepProjects({ list, setList }) {
  const [editingId, setEditingId] = useState(null);

  const add = () => {
    const entry = { id: uid(), name: "", technologies: [], github: "", liveDemo: "", description: "", contributions: [""] };
    setList([...list, entry]);
    setEditingId(entry.id);
  };
  const patch = (id, key, value) => setList(list.map((e) => (e.id === id ? { ...e, [key]: value } : e)));
  const remove = (id) => {
    setList(list.filter((e) => e.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {list.length === 0 && (
        <p className="text-sm text-gray-500">
          Showcase what you've built — projects are often the strongest section for students.
        </p>
      )}
      {list.map((proj) => (
        <EntryCard
          key={proj.id}
          title={proj.name || "New project"}
          subtitle={proj.technologies.join(", ")}
          isEditing={editingId === proj.id}
          onEdit={() => setEditingId(proj.id)}
          onDone={() => setEditingId(null)}
          onRemove={() => remove(proj.id)}
        >
          <div className="space-y-4">
            <Field label="Project Name" required>
              <TextInput value={proj.name} onChange={(e) => patch(proj.id, "name", e.target.value)} placeholder="AI Resume Builder" />
            </Field>
            <Field label="Technologies">
              <ChipInput value={proj.technologies} onChange={(v) => patch(proj.id, "technologies", v)} placeholder="React, Node.js, MongoDB" />
            </Field>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <Field label="GitHub URL">
                <TextInput icon={GithubIcon} value={proj.github} onChange={(e) => patch(proj.id, "github", e.target.value)} placeholder="github.com/username/project" />
              </Field>
              <Field label="Live Demo URL">
                <TextInput icon={Globe} value={proj.liveDemo} onChange={(e) => patch(proj.id, "liveDemo", e.target.value)} placeholder="project.vercel.app" />
              </Field>
            </div>
            <Field label="Description">
              <TextArea rows={3} value={proj.description} onChange={(e) => patch(proj.id, "description", e.target.value)} placeholder="Describe what you built..." />
            </Field>
            <BulletList
              label="Key Contributions / Achievements"
              value={proj.contributions}
              onChange={(v) => patch(proj.id, "contributions", v)}
              addLabel="Add Contribution"
              placeholder="Implemented..."
            />
          </div>
        </EntryCard>
      ))}
      <GhostButton icon={Plus} onClick={add}>
        Add Project
      </GhostButton>
    </div>
  );
}

function StepAdditionalInfo({ data, update }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">Everything here is optional — add anything that strengthens your resume.</p>
      {ADDITIONAL_FIELDS.map((f) => (
        <Accordion key={f.key} title={f.label} hint={f.hint} isOpen={open === f.key} onToggle={() => setOpen(open === f.key ? null : f.key)}>
          <TextArea rows={3} value={data[f.key]} onChange={(e) => update(f.key, e.target.value)} placeholder={`Add ${f.label.toLowerCase()}...`} />
        </Accordion>
      ))}
    </div>
  );
}

function ReviewRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 py-1.5 sm:flex-row sm:gap-2">
      <span className="w-40 shrink-0 text-xs uppercase tracking-wide text-gray-600">{label}</span>
      <span className="text-sm text-gray-200">{value}</span>
    </div>
  );
}

function ReviewSection({ title, onEdit, children, empty }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-100">{title}</h4>
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-1 text-xs font-medium text-orange-400 hover:text-orange-300">
          <Pencil className="h-3 w-3" />
          Edit
        </button>
      </div>
      {empty ? <p className="text-sm text-gray-600">Nothing added yet.</p> : children}
    </div>
  );
}

function StepReview({ formData, goToStep }) {
  const { personalInfo, education, skills, experience, projects, additionalInfo } = formData;
  const allSkills = useMemo(() => Object.values(skills).flat().filter(Boolean), [skills]);
  const hasAdditional = Object.values(additionalInfo).some((v) => v && v.trim());

  return (
    <div className="space-y-4">
      <ReviewSection title="Personal Information" onEdit={() => goToStep(1)}>
        <ReviewRow label="Name" value={personalInfo.fullName} />
        <ReviewRow label="Title" value={personalInfo.title} />
        <ReviewRow label="Email" value={personalInfo.email} />
        <ReviewRow label="Phone" value={personalInfo.phone} />
        <ReviewRow label="Location" value={personalInfo.location} />
        <ReviewRow label="GitHub" value={personalInfo.github} />
        <ReviewRow label="LinkedIn" value={personalInfo.linkedin} />
        <ReviewRow label="Portfolio" value={personalInfo.portfolio} />
      </ReviewSection>

      <ReviewSection title="Education" onEdit={() => goToStep(2)} empty={education.length === 0}>
        <div className="space-y-2">
          {education.map((e) => (
            <p key={e.id} className="text-sm text-gray-300">
              <span className="text-gray-100">{e.degree}</span>
              {e.institution && ` — ${e.institution}`}
              {(e.startYear || e.endYear) && ` (${e.startYear || "?"} – ${e.endYear || "present"})`}
            </p>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection title="Skills" onEdit={() => goToStep(3)} empty={allSkills.length === 0}>
        <div className="flex flex-wrap gap-1.5">
          {allSkills.map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300">
              {s}
            </span>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection title="Experience" onEdit={() => goToStep(4)} empty={experience.length === 0}>
        <div className="space-y-2">
          {experience.map((e) => (
            <p key={e.id} className="text-sm text-gray-300">
              <span className="text-gray-100">{e.title}</span>
              {e.company && ` — ${e.company}`}
            </p>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection title="Projects" onEdit={() => goToStep(5)} empty={projects.length === 0}>
        <div className="space-y-2">
          {projects.map((p) => (
            <p key={p.id} className="text-sm text-gray-300">
              <span className="text-gray-100">{p.name}</span>
              {p.technologies.length > 0 && ` — ${p.technologies.join(", ")}`}
            </p>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection title="Additional Information" onEdit={() => goToStep(6)} empty={!hasAdditional}>
        <div className="space-y-1.5">
          {ADDITIONAL_FIELDS.filter((f) => additionalInfo[f.key]?.trim()).map((f) => (
            <ReviewRow key={f.key} label={f.label} value={additionalInfo[f.key]} />
          ))}
        </div>
      </ReviewSection>

      <p className="flex items-center justify-center gap-1.5 pt-2 text-center text-xs text-gray-600">
        <Lock className="h-3 w-3" />
        Your information will be used only to generate your resume.
      </p>
    </div>
  );
}

/* ================================================================== */
/*  Build From Scratch — panel wrapper (header + indicator + steps)    */
/* ================================================================== */

function ScratchPanel({ formData, setFormData, step, setStep, onGenerate }) {
  const updatePersonal = (key, value) => setFormData((f) => ({ ...f, personalInfo: { ...f.personalInfo, [key]: value } }));
  const updateAdditional = (key, value) => setFormData((f) => ({ ...f, additionalInfo: { ...f.additionalInfo, [key]: value } }));
  const setEducation = (list) => setFormData((f) => ({ ...f, education: list }));
  const setSkills = (skills) => setFormData((f) => ({ ...f, skills }));
  const setExperience = (list) => setFormData((f) => ({ ...f, experience: list }));
  const setProjects = (list) => setFormData((f) => ({ ...f, projects: list }));

  const updateAboutAndTarget = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      aboutAndTarget: {
        ...prev.aboutAndTarget,
        [field]: value,
      },
    }));
  };

  const goToStep = (n) => setStep(n);

  return (
    <div>
      <div className="mb-6 flex items-start gap-3">
        <FilePlus2 className="mt-0.5 h-5 w-5 text-purple-400" />
        <div>
          <h3 className="text-lg font-semibold text-white">Build From Scratch</h3>
          <p className="mt-1 text-sm text-gray-500">
            Answer a few focused questions, step by step, and we'll turn your real experience into a
            polished resume.
          </p>
        </div>
      </div>

      <StepIndicator current={step} onJump={goToStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {step === 1 && <StepPersonalInfo data={formData.personalInfo} update={updatePersonal} />}
          {step === 2 && <StepAboutAndTarget formData={formData} updateAboutAndTarget={updateAboutAndTarget} />}
          {step === 3 && <StepEducation list={formData.education} setList={setEducation} />}
          {step === 4 && <StepSkills skills={formData.skills} setSkills={setSkills} />}
          {step === 5 && <StepExperience list={formData.experience} setList={setExperience} />}
          {step === 6 && <StepProjects list={formData.projects} setList={setProjects} />}
          {step === 7 && <StepAdditionalInfo data={formData.additionalInfo} update={updateAdditional} />}
          {step === 8 && <StepReview formData={formData} goToStep={goToStep} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  Main page                                                          */
/* ================================================================== */

export default function BuildWithAI() {
  const [mode, setMode] = useState("enhance"); // "enhance" | "scratch"
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(emptyFormData());
  const [isGenerating, setIsGenerating] = useState(false);

  const navigate = useNavigate();

  const canGoNext = useMemo(() => {
    if (step === 1) return formData.personalInfo.fullName.trim() && formData.personalInfo.email.trim();
    if (step === 2) return formData.aboutAndTarget.introduction.trim();
    return true;
  }, [step, formData.personalInfo, formData.aboutAndTarget]);

  const next = () => step < STEPS.length && setStep(step + 1);
  const prev = () => step > 1 && setStep(step - 1);

  const {buildResumeFromScratchWithAI, createResumePdfUrl} = useResumeWithAI();

  const handleGenerate = async () => {

    try {

      setIsGenerating(true);
      
      const response = await buildResumeFromScratchWithAI(formData);
  
      if(response){
  
        const pdfUrl = await createResumePdfUrl(response);
        
        console.log("Response: " , response);
        navigate('/resume-preview', {
          state: {
            pdfUrl,
          }
        })

      }
    } catch (error) {
      console.error("Error: ", error);      
    } finally {
      setIsGenerating(false);
    }

  };

  const switchMode = (next) => {
    setMode(next);
    setStep(1);
  };

  if(isGenerating){
    return <ResumeGenerationLoader/>
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <TopBar/>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-center gap-2 text-sm text-white/50">

          <Link to='/dashboard'>
          <div className="flex items-center gap-1    group py-1 px-3 rounded-4xl cursor-pointer">
          <ArrowLeftIcon  size={14}  className="group-hover:text-orange-500 group-hover:-translate-x-1 transition duration-500"/>
          <span className="group-hover:text-orange-500">Dashboard</span>
          </div>
          </Link>
          <ChevronRight size={14} />
          <span className="text-orange-500">Build with AI</span>
        </div>

        <div className="mb-8 text-center">
          <h1 className="inline-flex items-center gap-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Create Your <span className="text-orange-500">Perfect Resume</span>
            <Sparkles className="h-6 w-6 text-orange-500" />
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500 sm:text-base">
            Choose how you want to build your resume and let AI craft it to perfection.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <OptionCard
            active={mode === "enhance"}
            icon={FileEdit}
            iconTone="orange"
            title="Enhance Existing Resume"
            description="Improve your current resume with AI optimization"
            onClick={() => switchMode("enhance")}
          />
          <OptionCard
            active={mode === "scratch"}
            icon={FilePlus2}
            iconTone="purple"
            title="Build From Scratch"
            description="Create a brand new resume from your details"
            onClick={() => switchMode("scratch")}
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.015] p-6 shadow-[0_0_60px_-25px_rgba(249,115,22,0.15)] sm:p-8">
          {mode === "enhance" ? (
            <EnhancePanel />
          ) : (
            <ScratchPanel
              formData={formData}
              setFormData={setFormData}
              step={step}
              setStep={setStep}
              onGenerate={handleGenerate}
            />
          )}
        </div>

        {mode === "scratch" && (
          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={prev}
              disabled={step === 1}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors duration-150 hover:text-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            {step < STEPS.length ? (
              <button
                type="button"
                onClick={next}
                disabled={!canGoNext}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-transform duration-150 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-transform duration-150 hover:brightness-110"
              >
                <Sparkles className="h-4 w-4" />
                {isGenerating ? "Generating your Resume" :  "Generate My Resume"}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}