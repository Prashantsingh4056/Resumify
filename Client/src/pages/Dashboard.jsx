import React from "react";
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  FileText,
  Wand2,
  ArrowRight,
  Lock,
  Briefcase,
  TrendingUp,
  MessageSquare,
  ArrowUp,
  Eye,
  MoreVertical,
  ChevronDown as DownIcon,
  Trash,
  SparklesIcon,
  Sparkles,
  FileSearch,
} from "lucide-react";
import BackDrop from "../components/BackDrop";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";

import useInterview from "../features/ai/analyse-resume/hooks/useInterview";
import { useEffect } from "react";
import Loader from "./Loader";
import { login } from "../features/auth/service/auth.api";
import { deleteInterviewReportById } from "../features/ai/analyse-resume/services/resumeAnalysis.api";
import ResumeLoader from "./ResumeLoader";
import ResumeGenerationLoader from "../components/ResumeGenerationLoader";
import { useNavigate } from "react-router-dom";

const analyses = [
  {
    company: "Google",
    role: "Software Engineer",
    subtitle: "Full Stack Developer",
    logo: "G",
    logoBg: "bg-white",
    logoText: "text-[#4285F4]",
    score: 78,
    scoreColor: "#F0623D",
    questions: 7,
    date: "Aug 27, 2026",
    time: "07:30 PM",
  },
  {
    company: "Microsoft",
    role: "Frontend Developer",
    subtitle: "React Developer",
    logo: "MS",
    logoBg: "bg-white",
    score: 85,
    scoreColor: "#22C55E",
    questions: 8,
    date: "Aug 24, 2026",
    time: "03:45 PM",
  },
  {
    company: "Amazon",
    role: "Full Stack Engineer",
    subtitle: "MERN Stack Developer",
    logo: "a",
    logoBg: "bg-black",
    logoText: "text-orange-400",
    score: 72,
    scoreColor: "#F5A623",
    questions: 6,
    date: "Aug 20, 2026",
    time: "11:20 AM",
  },
];

function ScoreRing({ value, color }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-12 h-12">
      <svg viewBox="0 0 48 48" className="w-12 h-12 -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#2A2A35"
          strokeWidth="4"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
        {value}%
      </span>
    </div>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div
      className="
        group
        bg-[#0A0A0A]
        border border-white/[0.06]
        rounded-2xl
        p-5
        flex items-center gap-4
        transition-all duration-200
        hover:bg-[#000000]
        hover:border-white/[0.1]
      "
    >
      <div
        className={`
          w-12 h-12
          rounded-xl
          flex items-center justify-center
          transition-transform duration-200
          group-hover:scale-105
          ${stat.iconWrap}
        `}
      >
        <Icon size={21} />
      </div>

      <div>
        <p className="text-2xl font-bold text-zinc-100 leading-tight">
          {stat.value}
        </p>

        <p className="text-sm text-zinc-400 mt-1">{stat.label}</p>
      </div>
    </div>
  );
}

// ---- Main component -----------------------------------------------------

export default function Dashboard() {
  const { reports, getReports, loading, deleteReportById, setReports } =
    useInterview();

    const navigate = useNavigate();

  useEffect(() => {
    getReports();
  }, []);

  console.log(reports);

  if (loading) {
    return <Loader />;
  }

  const findAvgMatchScore = () => {
    let totalScore = 0;

    for (let i = 0; i < reports.length; i++) {
      totalScore += reports[i].matchScore;
    }

    const avgScore = totalScore / reports.length;

    return avgScore;
  };

  const findTotalQuestions = () => {
    let totalQuestions = 0;

    for (let i = 0; i < reports.length; i++) {
      totalQuestions +=
        reports[i].technicalQuestions.length +
        reports[i].behavioralQuestions.length;
    }

    return totalQuestions;
  };

  const stats = [
    {
      label: "Analyses Done",
      value: reports.length,
      deltaColor: "text-orange-400",
      icon: Briefcase,
      iconWrap: "bg-orange-500/10 text-orange-400",
    },
    {
      label: "Average Match Score",
      value: findAvgMatchScore().toFixed(1) === "NaN" ? "no resumes Analyzed" : findAvgMatchScore().toFixed() + "%",
      deltaColor: "text-emerald-400",
      icon: TrendingUp,
      iconWrap: "bg-emerald-500/10 text-emerald-400",
    },
    {
      label: "Questions Generated",
      value: findTotalQuestions(),
      deltaColor: "text-yellow-400",
      icon: MessageSquare,
      iconWrap: "bg-yellow-500/10 text-yellow-400",
    },
  ];

  const handleDeleteReport = async (interviewId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this interview report? This action cannot be undone.",
    );

    if (!isConfirmed) return;

    try {
      const res = deleteReportById(interviewId);

      console.log(res.data);

      setReports(reports.filter((report) => report._id !== interviewId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen  text-white font-sans">
      <BackDrop />

      <TopBar />

      <main className="relative z-10 px-6 sm:px-8 py-10 max-w-7xl mx-auto">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-2">
            Good afternoon, Prashant <span>👋</span>
          </h1>
          <p className="text-zinc-400 mt-2">
            Let&apos;s help you land your next interview.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Analyze My Resume */}
          <div
            className="
    group relative overflow-hidden
    rounded-2xl
    border border-orange-500/20
    bg-[#0A0A0A]
    p-8
    transition-all duration-300
    hover:border-orange-500/35
    hover:-translate-y-1
    hover:shadow-[0_20px_60px_rgba(255,107,44,0.08)]
  "
          >
            {/* Subtle orange glow */}
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-orange-500/[0.08] blur-3xl pointer-events-none" />

            {/* Dot pattern */}
            <div
              className="
      absolute inset-0 pointer-events-none
      opacity-[0.12]
      [background-image:radial-gradient(circle,#FF6B2C_1px,transparent_1px)]
      [background-size:28px_28px]
    "
            />

            <div className="relative">
              {/* Icon */}
              <div
                className="
        w-14 h-14 rounded-xl
        bg-orange-500/10
        border border-orange-500/20
        flex items-center justify-center
        text-orange-400
        mb-6
        transition-transform duration-300
        group-hover:scale-105
      "
              >
                <FileText size={24} />
              </div>

              <h2 className="text-xl font-bold text-zinc-100 mb-2">
                Analyze My Resume
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed max-w-md mb-7">
                Upload your resume and target job description to get ATS match
                scores, identify skill gaps, generate personalized interview
                questions, and receive a customized preparation plan.
              </p>

              <Link to="/analyze">
                <button className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5F2C] to-[#FF7A3D] hover:from-[#FF6B38] hover:to-[#FF8A52] transition-all duration-200 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-[0_8px_25px_rgba(255,95,44,0.18)] hover:shadow-[0_10px_30px_rgba(255,95,44,0.28)] active:scale-[0.98]">
                  Start New Analysis
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>
              </Link>
            </div>
          </div>

          {/* Build with AI */}
          <div
            className="
    group relative overflow-hidden
    rounded-2xl
    border border-violet-500/20
    bg-[#0A0A0A]
    p-8
    transition-all duration-300
    hover:border-violet-500/35
    hover:-translate-y-1
  "
          >
            {/* Subtle violet glow */}
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-violet-500/[0.07] blur-3xl pointer-events-none" />

            {/* Dot pattern */}
            <div
              className="
      absolute inset-0 pointer-events-none
      opacity-[0.10]
      [background-image:radial-gradient(circle,#8B5CF6_1px,transparent_1px)]
      [background-size:28px_28px]
    "
            />

            <div className="relative">
              <div className=" w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6 ">
                <Wand2 size={24} />
              </div>

              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-zinc-100">
                  Build with AI
                </h2>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed max-w-md mb-7">
                Create a tailored, ATS-friendly resume from scratch with AI
                suggestions and professional templates.
              </p>

              <Link to="/build-with-ai">
                <button className="cursor-pointer inline-flex items-center gap-2 bg-[#7347eb]  text-white text-sm font-semibold px-5 py-3 rounded-xl">
                  <SparklesIcon size={14} />
                  Build with AI
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        {/* Recent analyses table */}
        <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15) ">
          <div className="flex items-center  px-6 py-5">
            <h3 className="font-bold text-lg">Recent Analyses</h3>
          </div>

          {reports.length === 0 && (
            <div className="w-full rounded-3xl border border-white/[0.07] bg-white/[0.025] px-6 py-12 text-center backdrop-blur-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
                <Sparkles size={24} />
              </div>

              <h1 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                Start your journey
              </h1>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-400">
                You haven't analyzed a resume yet. Upload your resume to get
                personalized insights and interview preparation.
              </p>

              <button
                onClick={() => navigate("/analyze")}
                className="mt-7 cursor-pointer inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-orange-400 hover:shadow-[0_0_25px_rgba(255,85,0,0.2)]"
              >
                <FileSearch size={16} />
                Analyze Your Resume
                <ArrowRight size={15} />
              </button>

              <p className="mt-5 text-xs text-stone-600">
                Your analysis reports will appear here once you get started.
              </p>
            </div>
          )}

          {reports.length != 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-500 text-[11px] uppercase tracking-[0.12em] bg-white/[0.015] border-y border-white/[0.05]">
                    <th className="text-left font-medium px-6 py-3">Role</th>
                    <th className="text-left font-medium px-6 py-3">
                      Match Score
                    </th>
                    <th className="text-left font-medium px-6 py-3">
                      Questions
                    </th>
                    <th className="text-left font-medium px-6 py-3">
                      Analyzed On
                    </th>
                    <th className="text-left font-medium px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-white/[0.05] transition-colors duration-150 hover:bg-white/[0.025]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold">{item.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <ScoreRing
                          value={item.matchScore}
                          color={
                            item.matchScore > 80
                              ? "green"
                              : item.matchScore > 50
                                ? "orange"
                                : "red"
                          }
                        />
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {item.technicalQuestions.length +
                          item.behavioralQuestions.length}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        <p>
                          {new Date(item.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "2-digit", year: "numeric" },
                          )}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(item.createdAt).toLocaleTimeString(
                            "en-US",
                            { hour: "2-digit", minute: "2-digit" },
                          )}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/interview/${item._id}`}>
                            <button className="w-9 h-9 cursor-pointer rounded-lg bg-white/[0.035] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all flex items-center justify-center text-zinc-400 hover:text-white">
                              <Eye size={16} />
                            </button>
                          </Link>

                          <button
                            onClick={() => handleDeleteReport(item._id)}
                            className=" w-9 h-9 cursor-pointer rounded-lg bg-white/[0.035] border border-white/[0.06] hover:bg-red-500/[0.08] hover:border-red-500/[0.12] transition-all flex items-center justify-center text-zinc-400 hover:text-red-600"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
