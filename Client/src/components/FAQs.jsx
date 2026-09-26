import React from "react";
import Title from "./Title";
import { ChevronDownIcon } from "lucide-react";

export const faqData = [
  {
    question: "How does the AI Resume Analyzer evaluate my score?",
    answer:
      "Our AI parses your resume using the exact parsing algorithms standard applicant tracking systems (ATS) employ. It cross-references your structural formatting, layout hierarchy, and industry-specific keywords against job listings to provide an instant optimization benchmark.",
  },
  {
    question: "Will my generated resume bypass modern ATS platforms?",
    answer:
      "Absolutely. Our built-in templates are carefully built from the ground up to eliminate non-parsable structural elements like columns, non-standard visual blocks, tables, and unreadable graphics, guaranteeing a maximum parsing rate.",
  },
  {
    question: "Can I tailor one resume to multiple target job descriptions?",
    answer:
      "Yes. The platform allows you to feed in different job descriptions. The AI analyzer will automatically isolate missing keyword clusters, missing tech accents, and core skill sets distinct to each listing.",
  },
  {
    question: "What document formats are supported for file upload?",
    answer:
      "You can upload your current resumes in PDF, DOCX, or pure TXT formats. For exporting highly optimized new variations from our builder tool, we support high-fidelity PDF formats.",
  },
  {
    question: "How fast is the analysis and restructuring pipeline?",
    answer:
      "The entire diagnostic scoring, keyword matrix scanning, and structural layout variation adjustment cycle takes under 10 seconds from document upload to full interface presentation.",
  },
];

function FAQs() {
  return (
    <div className="w-full py-16 px-4 select-none relative z-10">
      {/* Platform Level Section Title */}
      <Title
        title="Frequently Asked Questions"
        description="Everything you need to know about optimizing your resume with Resumify"
      />

      {/* Accordion Layout Grid Wrapper */}
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl space-y-4">
          {faqData.map((faq, i) => (
            <details 
              key={i}
              className="group bg-white/[0.02] backdrop-blur-2xl border border-white/[0.06] open:border-[#ff6a00]/30 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all duration-300"
            >
              {/* Accordion Question Header */}
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-white/[0.02] transition-colors duration-200">
                <h4 className="font-semibold text-sm sm:text-base text-stone-100 group-open:text-[#ff7300] transition-colors duration-200">
                  {faq.question}
                </h4>
                <div className="text-stone-400 group-open:text-[#ff7300] transition-colors duration-200">
                  <ChevronDownIcon className="w-5 h-5 group-open:rotate-180 transition-transform duration-300" />
                </div>
              </summary>
              
              {/* Accordion Answer Body */}
              <div className="p-5 pt-0 border-t border-white/[0.03] mt-2">
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-4">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQs;
