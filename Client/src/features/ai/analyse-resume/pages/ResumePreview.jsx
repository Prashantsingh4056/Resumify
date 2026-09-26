import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  FileText,
  CheckCircle2,
  Sparkles,
  Loader2,
} from "lucide-react";
import TopBar from "../../../../pages/TopBar";

const ResumePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pdfUrl = location.state?.pdfUrl;
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!location.state?.pdfUrl) {
      navigate("/build-with-ai");
    }
  }, [location.state, navigate]);


  const handleDownload = () => {
    if (!pdfUrl) return;
    
    try{

    setIsDownloading(true);

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "resume.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
    catch(error){
      console.log("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!pdfUrl) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

        <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">

        {/* Navbar */}
        <TopBar/>

        {/* Page */}
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mx-auto mb-10 max-w-2xl text-center">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/15 bg-orange-500/[0.07] px-3 py-1.5 text-xs font-medium text-orange-300">
              <Sparkles size={13} />
              AI Generated Resume
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your resume is ready.
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
              Review your resume below before downloading your final PDF.
            </p>
          </div>

          {/* Status */}
          <div className="mx-auto mb-6 flex max-w-[794px] items-center justify-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-500/[0.05] px-4 py-3 text-sm text-emerald-300">
            <CheckCircle2 size={17} />

            <span>
              Resume generated successfully
            </span>
          </div>

          {/* Resume Preview */}
          <div className="mx-auto max-w-[850px]">

            <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/60 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:p-4">

              <div className="overflow-hidden rounded-lg bg-white">
                <iframe
                  src={pdfUrl}
                  title="Resume Preview"
                  className="block h-[1050px] w-full border-0 sm:h-[1123px]"
                />
              </div>

            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mx-auto mt-10 max-w-xl text-center">

            <div className="mb-5">
              <h2 className="text-lg font-semibold">
                Looks good?
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Download your ATS-friendly resume and start applying.
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-black shadow-lg shadow-orange-500/10 transition hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDownloading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Download
                  size={18}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              )}

              {isDownloading
                ? "Downloading..."
                : "Download Resume"}
            </button>

          </div>

        </main>
      </div>
    </div>
  );
};

export default ResumePreview;