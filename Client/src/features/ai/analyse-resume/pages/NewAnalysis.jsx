import { useState, useRef, useContext } from "react";
import {
  Sparkles,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  ChevronRight,
  UploadCloud,
  FileText,
  CheckCircle2,
  Shield,
  Settings,
  Target,
  Wand2,
  User,
  Briefcase,
  CheckSquare,
  ArrowLeftIcon,
} from "lucide-react";
import BackDrop from "../../../../components/BackDrop";
import TopBar from "../../../../pages/TopBar";
import Loader from "../../../../pages/Loader";
import useInterview from "../hooks/useInterview";
import { Link, useNavigate } from "react-router-dom";
import ResumeLoader from "../../../../pages/ResumeLoader";

export default function NewAnalysis() {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("1.24 MB");
  const [isDragging, setIsDragging] = useState(false);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);

  const { loading, generateReport } = useInterview();

  const navigate = useNavigate();

  const canSubmit = !selfDescription || !fileName;

  const handleFileSelect = (file) => {
    if (!file) return;
    setFileName(file.name);

    setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
  };

  const handleGenerateReport = async () => {
    const resumeFile = fileInputRef.current?.files[0];
    try {

      setIsGenerating(true);

      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      navigate(`/interview/${data._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return <ResumeLoader/>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased">
      <TopBar />

      <main className="mx-auto max-w-7xl px-8 py-8">
        {/* Breadcrumb */}

        <div className="mb-6 flex items-center gap-2 text-sm text-white/50">
          <Link to="/dashboard">
            <div className="flex items-center gap-1 group py-1 px-3 rounded-4xl cursor-pointer">
              <ArrowLeftIcon
                size={14}
                className="group-hover:text-orange-500 group-hover:-translate-x-1 transition duration-500"
              />
              <span className="group-hover:text-orange-500">Dashboard</span>
            </div>
          </Link>
          <ChevronRight size={14} />
          <span className="text-orange-500">New Analysis</span>
        </div>

        {/* Hero */}
        <div className="relative mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Start a New Analysis
            </h1>
            <p className="mt-3 max-w-xl text-white/50">
              Upload your resume, add your details and target job description.
              Our AI will analyze and generate personalized insights for you.
            </p>
          </div>

          {/* Decorative icon chain (hidden on small screens) */}
          <div className="relative hidden h-40 w-72 shrink-0 lg:block">
            <div className="absolute left-0 top-10 flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/5 text-orange-400">
              <User size={20} />
            </div>
            <div className="absolute left-28 top-0 flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/40 bg-orange-500/10 text-orange-400 shadow-[0_0_40px_-10px_rgba(249,115,22,0.6)]">
              <FileText size={26} />
            </div>
            <div className="absolute right-8 top-2 flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-500/10 text-indigo-300">
              <Target size={18} />
            </div>
            <div className="absolute right-0 top-20 flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/5 text-orange-400">
              <Briefcase size={18} />
            </div>
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 288 160"
              fill="none"
            >
              <path
                d="M24 40 C 80 40, 100 30, 150 30"
                stroke="#f97316"
                strokeOpacity="0.35"
                strokeWidth="1.5"
                strokeDasharray="3 4"
              />
              <path
                d="M180 25 C 220 15, 240 20, 260 20"
                stroke="#f97316"
                strokeOpacity="0.25"
                strokeWidth="1.5"
                strokeDasharray="3 4"
              />
              <path
                d="M180 40 C 210 60, 230 80, 250 92"
                stroke="#f97316"
                strokeOpacity="0.25"
                strokeWidth="1.5"
                strokeDasharray="3 4"
              />
            </svg>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Step 1: Upload Resume */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-1 flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/15 text-sm font-semibold text-orange-400">
                1
              </div>
              <h2 className="text-lg font-semibold">Upload Resume</h2>
            </div>
            <p className="mb-4 pl-10 text-sm text-white/45">
              Upload your latest resume in PDF format.
            </p>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFileSelect(e.dataTransfer.files?.[0]);
              }}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
                isDragging
                  ? "border-orange-400 bg-orange-500/5"
                  : "border-orange-500/30 bg-black/20"
              }`}
            >
              <UploadCloud className="mb-4 text-orange-500" size={36} />
              <p className="mb-1 text-white/90">
                Drag &amp; drop your resume here
              </p>
              <p className="mb-4 text-sm text-white/40">or</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg bg-orange-600 px-5 py-2 text-sm font-medium text-white hover:bg-orange-500 transition-colors"
              >
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />
              <p className="mt-5 text-xs text-white/35">
                Supported formats: PDF, &nbsp; Max size: 10MB
              </p>
            </div>

            {fileName && (
              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-white/90">{fileName}</p>
                    <p className="text-xs text-white/40">{fileSize}</p>
                  </div>
                </div>
                <CheckCircle2 size={18} className="text-green-500" />
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-xs text-white/35">
              <Shield size={13} />
              <span>
                Your file is secure and will only be used for analysis.
              </span>
            </div>
          </section>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Step 2: Self Description */}
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/15 text-sm font-semibold text-purple-400">
                    2
                  </div>
                  <h2 className="text-lg font-semibold">Self Description</h2>
                </div>
                <span className="text-xs text-white/35">
                  {selfDescription.length} / 1500
                </span>
              </div>
              <p className="mb-4 pl-10 text-sm text-white/45">
                Tell us about yourself, your experience, skills and
                achievements.
              </p>

              <textarea
                value={selfDescription}
                onChange={(e) =>
                  setSelfDescription(e.target.value.slice(0, 1500))
                }
                placeholder="Write a short description about yourself..."
                rows={5}
                className="w-full resize-none rounded-xl border border-indigo-500/40 bg-black/20 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-400"
              />

              <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
                <Wand2 size={13} className="text-purple-400" />
                <span>
                  Tip: Include your experience, skills, achievements and career
                  goals.
                </span>
              </div>
            </section>

            {/* Step 3: Job Description */}
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/15 text-sm font-semibold text-blue-400">
                    3
                  </div>
                  <h2 className="text-lg font-semibold">
                    Job Description (Target Role)
                  </h2>
                </div>
                <span className="text-xs text-white/35">
                  {jobDescription.length} / 4000
                </span>
              </div>
              <p className="mb-4 pl-10 text-sm text-white/45">
                Paste the job description or key responsibilities of the role
                you are targeting.
              </p>

              <textarea
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value.slice(0, 4000))
                }
                placeholder="Paste job description here..."
                rows={5}
                className="w-full resize-none rounded-xl border border-blue-500/30 bg-black/20 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-blue-400"
              />

              <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
                <Target size={13} className="text-blue-400" />
                <span>
                  Tip: The more details, the better and accurate insights we can
                  provide.
                </span>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom preferences bar */}
        <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3 lg:w-64 lg:shrink-0">
            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 p-2">
              <Sparkles size={16} />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">AI Analysis</p>

              <p className="text-xs leading-relaxed text-white/40">
                Your resume is analyzed against the provided job description.
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-wrap items-end gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/45">Includes</label>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: "technical", label: "Technical Questions" },
                  { key: "behavioral", label: "Behavioral Questions" },
                  { key: "skillGap", label: "Skill Gap Analysis" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80"
                  >
                    <CheckSquare className="h-4 w-4 rounded text-orange-500" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 lg:items-end">
            <button
              disabled={canSubmit}
              onClick={handleGenerateReport}
              className={`flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/30  transition-colors ${canSubmit ? "opacity-50" : "hover:from-orange-500 hover:to-orange-400"}`}
            >
              <Sparkles size={16} />
              Start Analysis
              <ChevronRight size={16} />
            </button>
            <p className="flex items-center gap-1 text-xs text-white/35">
              <Shield size={11} />
              Takes ~30-60 seconds
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
