import { useEffect, useState } from "react";
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  ChevronRight,
  Calendar,
  Hash,
  Copy,
  Download,
  Share2,
  Code2,
  MessageCircle,
  Target,
  CalendarCheck,
  Star,
  AlertTriangle,
  Check,
  CircleAlert,
  ArrowLeftIcon
} from "lucide-react";

import useInterview from "../hooks/useInterview";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../../pages/Loader";
import TopBar from "../../../../pages/TopBar";

// Sample data (as returned by the API)
const report = {
  matchScore: 78,
  technicalQuestions: [
    {
      question:
        "How do you securely handle JWT authentication in a MERN stack application, and how would you implement token refresh mechanism to prevent session hijacks?",
      intention:
        "To evaluate the candidate's understanding of backend security, authentication flows, and HTTP-only cookie vs. local storage trade-offs.",
      answer:
        "The candidate should explain storing access tokens (short-lived) in memory/state and refresh tokens (long-lived) in HttpOnly, SameSite cookies. They should describe setting up an Express middleware to verify access tokens and creating a dedicated `/refresh-token` endpoint that validates the refresh token stored in the database or cookie to issue a new access token.",
    },
    {
      question:
        "In React, how do you optimize rendering performance when dealing with dynamic, data-heavy components like real-time AI responses or large lists?",
      intention:
        "To test candidate's knowledge of React performance optimization strategies beyond basic component creation.",
      answer:
        "The response should cover using React hooks like `useMemo` and `useCallback` to prevent unnecessary re-computations/re-renders, using windowing/virtualization (e.g., react-window) for large lists, dynamic imports/code splitting using `React.lazy`, and debouncing/throttling state updates during streaming/real-time API responses.",
    },
    {
      question:
        "How do you approach schema design in MongoDB for applications requiring relations (e.g., users and their AI-generated resumes/roadmaps), and when would you choose embedding over referencing?",
      intention:
        "To check MongoDB data modeling skills, performance indexing, and understanding of Document DB trade-offs.",
      answer:
        "The candidate should explain the criteria: Embed when data is bounded, tightly coupled, and queried together (e.g., basic resume sections inside a single resume document). Reference (using ObjectIds/populate) when data can grow indefinitely or is shared across entities (e.g., Users to multiple AI Roadmaps). They should also mention adding indexes on frequently queried fields like `userId`.",
    },
    {
      question:
        "How do you handle error states, rate limits, and asynchronous timeouts when integrating third-party AI APIs like Google Gemini in Node.js?",
      intention:
        "To assess backend resilience, error handling, and experience with external API integrations.",
      answer:
        "The answer should outline using `try-catch` blocks, implementing retry mechanisms with exponential backoff for rate-limit errors (429 HTTP status), setting request timeouts, gracefully fallback messages to the client, and using middleware to handle standard error responses without crashing the server.",
    },
  ],
  behavioralQuestions: [
    {
      question:
        "As someone building primarily personal and academic projects, how do you ensure your code adheres to production-grade standards and maintainability?",
      intention:
        "To assess self-awareness, coding standards, and readiness to transition to an enterprise development environment.",
      answer:
        "Focus on practices like writing clean code, modular architecture, adhering to DRY principles, writing meaningful commit messages in Git, setting up ESLint/Prettier, writing unit/integration tests, and documenting API endpoints using tools like Postman/Swagger.",
    },
    {
      question:
        "Describe a scenario where you had to integrate a complex requirement (like real-time PDF generation or AI roadmap dynamic routing) and encountered unexpected technical blockers. How did you resolve it?",
      intention: "To evaluate problem-solving skills, persistence, and resourcefulness under friction.",
      answer:
        "Use the STAR method (Situation, Task, Action, Result). State the specific technical bottleneck (e.g., handling PDF styling rendering errors across browsers), how you debugged it (reading docs, checking browser engine quirks, isolating components), and the successful outcome/metrics achieved.",
    },
    {
      question:
        "How do you prioritize features when developing an end-to-end full-stack application within tight deadlines?",
      intention: "To gauge product sense, time management, and ability to deliver Minimum Viable Products (MVPs).",
      answer:
        "Explain prioritizing core functional workflows (authentication, database schema, primary feature) first using MoSCoW prioritization (Must-haves vs Nice-to-haves), building a working MVP before adding secondary polish (e.g., advanced dynamic animations or extra themes).",
    },
  ],
  skillGaps: [
    { skill: "TypeScript", severity: "medium" },
    { skill: "Docker & Containerization", severity: "high" },
    { skill: "Cloud Infrastructure (AWS) & CI/CD Pipelines", severity: "high" },
    { skill: "Caching Strategies (Redis)", severity: "medium" },
    { skill: "Professional Enterprise Industry Experience", severity: "medium" },
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "MERN Architecture & Advanced Security",
      tasks: [
        "Review Node.js/Express middleware execution order and custom error handlers.",
        "Implement short-lived JWT access token and HTTP-only cookie refresh token mechanism in Node.js.",
        "Practice security best practices: CORS, Helmet.js, rate-limiting, and input sanitization.",
      ],
    },
    {
      day: 2,
      focus: "React Performance & Next.js Essentials",
      tasks: [
        "Study React reconciliation, Fiber architecture, `useMemo`, `useCallback`, and `React.memo`.",
        "Review Next.js routing paradigms (App Router vs Pages Router), SSR, SSG, and ISR.",
        "Refactor an existing component to reduce re-renders and lazy load sub-components.",
      ],
    },
    {
      day: 3,
      focus: "MongoDB & Data Modeling Deep Dive",
      tasks: [
        "Practice schema design patterns: Embedding vs Referencing, Subset pattern.",
        "Study MongoDB indexing (single field, compound, text index) and analyze queries using `explain()`.",
        "Write complex aggregation pipeline queries using `$lookup`, `$unwind`, and `$group`.",
      ],
    },
    {
      day: 4,
      focus: "TypeScript Integration",
      tasks: [
        "Learn core TypeScript types, interfaces, generics, type assertions, and union types.",
        "Convert an existing React component and Node.js route module to TypeScript.",
        "Understand typing Express request/response handlers and React props/state.",
      ],
    },
    {
      day: 5,
      focus: "DevOps, Docker & Cloud Basics",
      tasks: [
        "Learn basic Docker concepts: Images, Containers, Dockerfile commands, and `docker-compose`.",
        "Write a Dockerfile for a Node.js Express backend and React frontend.",
        "Study CI/CD basics with GitHub Actions for automated linting and deployment to Vercel/Render/AWS.",
      ],
    },
    {
      day: 6,
      focus: "System Design, Redis & AI Integration Patterns",
      tasks: [
        "Study caching fundamentals using Redis (In-memory caching for API endpoints).",
        "Understand basic system design principles: Load Balancing, Horizontal vs Vertical scaling, Rate limiting.",
        "Review resilient API patterns when connecting to external LLMs (handling streams, timeouts, and fallbacks).",
      ],
    },
    {
      day: 7,
      focus: "Behavioral Preparation & Mock Interview",
      tasks: [
        "Prepare STAR method answers for key projects (AI Resume Builder, AlgoPilot, LynkUp).",
        "Practice explaining system architecture decisions clearly for key projects.",
        "Conduct a full mock technical interview focusing on full-stack coding and system design.",
      ],
    },
  ],
  _id: "6a90038feefb92b86ba11559",
  createdAt: "2026-08-27T09:29:51.143Z",
};

const severityStyles = {
  high: "text-red-400",
  medium: "text-orange-400",
  low: "text-yellow-400",
};

function QuestionAccordion({ items, colorClass }) {

  const [openIndex, setOpenIndex] = useState(null);


  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div className="divide-y divide-white/5">
      {items.map((item, i) => (
        <div key={i} className="py-4 first:pt-0 last:pb-0">
          <button
            onClick={() => toggle(i)}
            className="flex w-full items-start justify-between gap-4 text-left"
          >
            <div className="flex gap-4">
              <div
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${colorClass}`}
              >
                {i + 1}
              </div>
              <div>
                <p className="text-sm leading-relaxed text-white/90">{item.question}</p>
                <p className="mt-1.5 text-xs text-white/40">
                  <span className="font-medium text-purple-400">Intention: </span>
                  {item.intention}
                </p>
              </div>
            </div>
            <ChevronDown
              size={16}
              className={`mt-1 shrink-0 text-white/40 transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>

          {openIndex === i && (
            <div className="ml-10 mt-3 rounded-lg border border-white/10 bg-black/30 p-4">
              <p className="mb-1 text-xs font-medium text-orange-400">Suggested Answer</p>
              <p className="text-sm leading-relaxed text-white/70">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function InterviewReport() {
  const [activeTab, setActiveTab] = useState("technical");
  const {report, getReportById, loading} = useInterview();
  const {interviewId} = useParams();

  useEffect(() => {
    if(interviewId){
      getReportById(interviewId);
    }
  } , [interviewId])



  if(loading || !report){

    return <Loader/>;

  }

  const analyzedDate = new Date(report.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const analyzedTime = new Date(report.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const tabs = [
    {
      id: "technical",
      label: "Technical Questions",
      icon: Code2,
      count: report.technicalQuestions.length,
    },
    {
      id: "behavioral",
      label: "Behavioral Questions",
      icon: MessageCircle,
      count: report.behavioralQuestions.length,
    },
    {
      id: "skillGaps",
      label: "Skill Gaps",
      icon: Target,
      count: report.skillGaps.length,
    },
    {
      id: "prepPlan",
      label: "Preparation Plan",
      icon: CalendarCheck,
      count: report.preparationPlan.length,
    },
  ];

  
  

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased">
      {/* Top nav */}
      <TopBar/>

      <main className="mx-auto max-w-7xl px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Link to="/dashboard">
            <div className="flex items-center gap-1    group py-1 px-3 rounded-4xl cursor-pointer">
              <ArrowLeftIcon
                size={14}
                className="group-hover:text-orange-500 group-hover:-translate-x-1 transition duration-500"
              />
              <span className="group-hover:text-orange-500">Dashboard</span>
            </div>
          </Link>
            <ChevronRight size={14} />
            <span>New Analysis</span>
            <ChevronRight size={14} />
            <span className="text-orange-500">Analysis Report</span>
          </div>
        </div>

        {/* Report header card */}
        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-md bg-orange-500/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-orange-400">
                  ANALYSIS REPORT
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Good Match
                </span>
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight">Full Stack Developer</h1>

             

              <div className="mb-4 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs">
                  <Calendar size={14} className="text-white/40" />
                  <span className="text-white/40">Analyzed on</span>
                  <span className="text-white/80">
                    {analyzedDate} • {analyzedTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs">
                  <Hash size={14} className="text-white/40" />
                  <span className="text-white/40">Report ID</span>
                  <span className="text-white/80">{report._id}</span>
                  <button
                    onClick={() => navigator.clipboard?.writeText(report._id)}
                    className="text-white/40 hover:text-white"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>

              <p className="mb-5 max-w-xl text-sm text-white/45">
                We analyzed your resume and job description to evaluate your match, identify
                skill gaps, generate interview questions, and create a personalized 7-day
                preparation plan.
              </p>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-500">
                  <Download size={15} />
                  Download Report
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5">
                  <Share2 size={15} />
                  Share Report
                </button>
              </div>
            </div>

            {/* Match score ring */}
            <div className="flex justify-center lg:px-6">
              <div
                className="relative flex h-50 w-50 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#f97316 0% ${report.matchScore}%, rgba(255,255,255,0.08) ${report.matchScore}% 100%)`,
                }}
              >
                 <div className="w-50 h-50 bg-amber-600/50  rounded-full blur-3xl absolute top-0 left-0"/>
                <div className="relative flex h-45 w-45 flex-col items-center justify-center rounded-full z-10 bg-[#0a0a0a]">
                  <span className="text-5xl font-bold">{report.matchScore}%</span>
                  <span className="mt-1 text-sm text-white/40">Match Score</span>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="flex flex-col gap-3 lg:w-56">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400">
                  <Code2 size={18} />
                </div>
                <div>
                  <p className="text-lg font-semibold leading-none">
                    {report.technicalQuestions.length}
                  </p>
                  <p className="text-xs text-white/40">Technical Questions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="text-lg font-semibold leading-none">
                    {report.behavioralQuestions.length}
                  </p>
                  <p className="text-xs text-white/40">Behavioral Questions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15 text-green-400">
                  <Target size={18} />
                </div>
                <div>
                  <p className="text-lg font-semibold leading-none">
                    {report.skillGaps.length}
                  </p>
                  <p className="text-xs text-white/40">Skill Gaps Identified</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="mb-6 flex gap-6 border-b border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors ${
                  active
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-white/50 hover:text-white/80"
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {activeTab === "technical" && (
          <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400">
                  <Code2 size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Technical Questions</h2>
                  <p className="text-sm text-white/40">
                    Questions to assess your technical knowledge and problem-solving ability.
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                {report.technicalQuestions.length} Questions
              </span>
            </div>
            <QuestionAccordion
              items={report.technicalQuestions}
              colorClass="bg-purple-500/15 text-purple-300"
            />
          </section>
        )}

        {activeTab === "behavioral" && (
          <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Behavioral Questions</h2>
                  <p className="text-sm text-white/40">
                    Questions to understand your experience, mindset and approach to challenges.
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                {report.behavioralQuestions.length} Questions
              </span>
            </div>
            <QuestionAccordion
              items={report.behavioralQuestions}
              colorClass="bg-blue-500/15 text-blue-300"
            />
          </section>
        )}

        {activeTab === "skillGaps" && (
          <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15 text-green-400">
                  <Target size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Skill Gaps</h2>
                  <p className="text-sm text-white/40">
                    Areas identified for improvement based on the target role.
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
                {report.skillGaps.length} Gaps
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {report.skillGaps.map((gap, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <span className="text-sm text-white/85">{gap.skill}</span>
                  <span
                    className={`flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-xs font-medium capitalize ${
                      severityStyles[gap.severity] || "text-white/60"
                    }`}
                  >
                    <AlertTriangle size={12} />
                    {gap.severity}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "prepPlan" && (
          <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
                  <CalendarCheck size={18} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Preparation Plan</h2>
                  <p className="text-sm text-white/40">
                    A personalized Day-wise plan to help you get interview-ready.
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-300">
                {report.preparationPlan.length} Days
              </span>
            </div>
            <div className="space-y-4">
              {report.preparationPlan.map((day) => (
                <div
                  key={day.day}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/15 text-xs font-semibold text-orange-300">
                      {day.day}
                    </div>
                    <h3 className="text-sm font-semibold text-white/90">{day.focus}</h3>
                  </div>
                  <ul className="ml-10 list-disc space-y-1 text-sm text-white/60">
                    {day.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Strengths & Areas to improve */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15 text-green-400">
                <Star size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold">Strengths</h2>
                <p className="text-sm text-white/40">
                  Key areas where you demonstrate strong potential.
                </p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {report.strengths.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                  <Check size={15} className="shrink-0 text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
                <Target size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold">Areas to Improve</h2>
                <p className="text-sm text-white/40">
                  Focus on improving these areas to boost your overall match.
                </p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {report.areasToImprove.map((areaToImprove, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                  <CircleAlert
                    size={15}
                    className={`shrink-0 ${"text-orange-600" || "text-white/50"}`}
                  />
                  {areaToImprove}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}