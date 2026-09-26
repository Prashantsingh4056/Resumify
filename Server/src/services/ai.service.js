import { GoogleGenAI } from "@google/genai";
import puppeteer from "puppeteer";

// Initialize the Gemini client exactly like the documentation example
const geminiAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// 1. Define your pure JSON Schema format exactly like 'recipeJsonSchema'
const interviewReportJsonSchema = {
  type: "object",
  properties: {
    title: {
      type: "string", // resume title (like Full-stack engineer , Backend developer)
      description:
        "A title of the job for which the interview report is generated",
    },
    matchScore: {
      type: "integer", // Using integer since it's a score from 0-100
      description:
        "A number between 0 to 100 indicating how well the candidate's profile matches the job description.",
    },
    technicalQuestions: {
      type: "array",
      description:
        "Technical questions that can be asked in an interview along with their intention and how to answer them.",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "The technical question that can be asked.",
          },
          intention: {
            type: "string",
            description:
              "The intention of the interviewer behind asking this question.",
          },
          answer: {
            type: "string",
            description:
              "How to answer this question, what points to cover or approach to take.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: "array",
      description:
        "Behavioral questions that can be asked in an interview along with their intention and how to answer them.",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "The behavioral question that can be asked.",
          },
          intention: {
            type: "string",
            description:
              "The intention of the interviewer behind asking this question.",
          },
          answer: {
            type: "string",
            description:
              "How to answer this question with appropriate approach points.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: "array",
      description:
        "The list of skill gaps in the candidate's profile along with the severity.",
      items: {
        type: "object",
        properties: {
          skill: {
            type: "string",
            description: "The skill which the candidate is lacking.",
          },
          severity: {
            type: "string",
            description: "The severity of the skill gap: low, medium, or high.",
          }, // Using string since enum wraps as string in pure schema
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "array",
      description:
        "A day-wise preparation plan for candidate to follow in order to prepare effectively.",
      items: {
        type: "object",
        properties: {
          day: {
            type: "integer",
            description:
              "The day number in the preparation plan, starting from 1.",
          },
          focus: {
            type: "string",
            description:
              "Main focus of the day in preparation plan i.e. DSA, MERN, etc.",
          },
          tasks: {
            type: "array",
            items: { type: "string" },
            description: "List of tasks to be done on this day.",
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
    strengths: {
      type: "array",
      description: "List of strengths of the candidate based on the resume and self-description.",
      items: {
        type: "string",
      },
    },
    areasToImprove: {
      type: "array",
      description: "List of areas where the candidate can improve based on the resume and self-description.",
      items: {
        type: "string",
      },
    }
  },
  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
};

const generateInterviewReport = async ({
  resume,
  jobDescription,
  selfDescription,
}) => {
  const prompt = `
    Generate a highly accurate interview evaluation report for a candidate with the following details:
    
    Resume content: ${resume}
    Self description: ${selfDescription}
    Job Description: ${jobDescription || "Not Provided"}
    
    Analyze the documents, identify key technical skill alignment, calculate the match percentage score, list required tech questions, flag weaknesses, and output a structured timeline.
  `;

  // 2. Execute the modern interaction method from your documentation reference
  const interaction = await geminiAI.interactions.create({
    model: "gemini-3.6-flash", // Running the advanced framework model
    input: prompt, // Changed from 'contents' to 'input' per the documentation snippet
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: interviewReportJsonSchema, // Passes our clean schema structure directly
    },
  });

  // 3. Parse the clean output text string into a native JSON object
  return JSON.parse(interaction.output_text);
};

const resumePDFSchema = {
  type: "object",
  properties: {
    html: {
      type: "string",
      description:
        "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
    },
  },
};

const generatePdfFromHTML = async (htmlContent) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  return pdfBuffer;
};

const generateResumePDF = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const prompt = `
You are an ATS resume optimization assistant.

Improve and restructure the candidate's existing resume using ONLY the information explicitly provided below.

EXISTING RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription || "Not provided."}

TARGET JOB DESCRIPTION:
${jobDescription || "Not provided."}

STRICT FACTUAL RULES:

- Use ONLY facts explicitly mentioned in the Existing Resume or Self Description.
- NEVER invent, assume, infer, or guess information.
- Do NOT add new skills, technologies, experience, companies, job titles, projects, education, certifications, achievements, responsibilities, dates, or metrics.
- If information is missing, omit it. Never fill gaps with assumed or generic information.
- You may rewrite existing information for grammar, clarity, and professional tone, but the factual meaning must remain unchanged.
- You may prioritize existing skills and experience relevant to the Target Job Description.
- Do NOT add a job requirement just because it appears in the Target Job Description.

MANDATORY PERSONAL INFORMATION:

The resume MUST begin with a professional header containing the candidate's identity and contact information.

If available in the Existing Resume, you MUST preserve and display:

- Full Name
- Professional Title or Headline
- Phone Number
- Email Address
- Location
- GitHub
- LinkedIn
- Portfolio or other professional links

IMPORTANT:

- Never remove the candidate's name.
- Never remove available contact information.
- Never replace the candidate's name with a generic title.
- Do not start the resume directly with Summary, Education, Skills, or any other section.
- The candidate's Full Name must be the most prominent text at the top of the resume.

The header must follow this structure:

FULL NAME
Professional Title
Phone | Email | Location | GitHub | LinkedIn | Portfolio

Only display fields that are actually provided.

LAYOUT RULES:

- Generate a complete valid HTML5 document.
- Include all CSS inside one <style> tag.
- Use a clean, professional, ATS-friendly single-column resume.
- Use natural document flow.
- Do NOT use fixed heights or min-heights.
- Avoid unnecessary blank space.
- Keep section headings and their content close together.
- Use consistent spacing throughout the resume.
- Use standard fonts such as Arial or Helvetica.
- Do not use JavaScript, external CSS, images, icons, SVGs, tables, charts, progress bars, or multiple columns.
- Use semantic HTML and bullet points where appropriate.
- Make the layout suitable for A4 PDF generation.
- The HTML must work with Puppeteer PDF generation.

REQUIRED ORDER:

1. Candidate Header
2. Professional Summary
3. Education
4. Technical Skills
5. Projects
6. Experience, if provided
7. Additional relevant sections, if provided

OUTPUT:

Return ONLY valid JSON with exactly this structure:

{
  "html": "complete HTML document here"
}

Do not include markdown, explanations, or additional fields.
`;

  const interaction = await geminiAI.interactions.create({
    model: "gemini-3.7-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: resumePDFSchema,
    },
  });

  const jsonContent = JSON.parse(interaction.output_text);

  const pdfBuffer = await generatePdfFromHTML(jsonContent.html);

  return pdfBuffer;
};




const generateResumeFromScratch = async (resumeData) => {

    // 1. Cleanly map multi-dimensional skills into clear, flat text lines
    const flatSkills = resumeData.skills 
      ? Object.entries(resumeData.skills)
          .map(([category, list]) => `${category.toUpperCase()}: ${Array.isArray(list) ? list.join(', ') : list}`)
          .join('\n')
      : "Not provided.";

    // 2. 💡 FIXED: Clean project mapping that joins array elements directly without breaking string literals
    const flatProjects = (resumeData.projects || []).map((p, index) => {
      const tech = Array.isArray(p.technologies) ? p.technologies.join(', ') : (p.technologies || 'None');
      const links = `${p.github || ''} ${p.liveDemo || ''}`.trim();
      
      // Map bullet points safely by avoiding raw nested template variables
      const bullets = Array.isArray(p.contributions) 
        ? p.contributions.map(bullet => `  * ${bullet}`).join('\n')
        : "  * No specific contributions provided.";

      return `PROJECT ${index + 1}: ${p.name || 'Unnamed Project'}\n- Technologies: ${tech}\n- Links: ${links}\n- Description: ${p.description || ''}\n- Contributions:\n${bullets}`;
    }).join('\n\n');

    // 3. Format education details into clear blocks
    const flatEducation = (resumeData.education || []).map(e => `
- Institution: ${e.institution}
  Degree: ${e.degree} ${e.field ? `in \${e.field}` : ''}
  Duration: ${e.startYear} - ${e.endYear}
  Performance: ${e.cgpa || e.percentage || ''}
`).join('\n');

    // 4. Assemble clean, markdown-style prompt text
    const prompt = `
You are an expert professional resume writer.
Generate a professional, clean, single-column ATS-friendly resume in HTML using ONLY the candidate data provided below.

IMPORTANT RULES:
1. NEVER invent, assume, or guess facts. Do not add fake metrics, companies, dates, or skills.
2. If a field or section is empty or missing, omit it completely.
3. Improve wording, grammar, and professional sentence flow.
4. Output a valid standalone HTML5 document. Embed all CSS styles cleanly inside a single <style> block in the <head>.
5. Do not use external fonts, images, SVGs, charts, icons, JavaScript, or multi-column layouts. The document must render beautifully via Puppeteer on standard A4 layout boundaries.

CANDIDATE PROFILE DATA:
- Name: ${resumeData.personalInfo?.fullName || ''}
- Headline: ${resumeData.personalInfo?.title || ''}
- Contact: ${resumeData.personalInfo?.email || ''} | ${resumeData.personalInfo?.phone || ''} | ${resumeData.personalInfo?.location || ''}
- Links: GitHub: ${resumeData.personalInfo?.github || ''} | LinkedIn: ${resumeData.personalInfo?.linkedin || ''} | Portfolio: ${resumeData.personalInfo?.portfolio || ''}

SUMMARY/INTRODUCTION:
${resumeData.aboutAndTarget?.introduction || 'Not provided.'}

TARGET JOB DESCRIPTION:
${resumeData.aboutAndTarget?.jobDescription || 'General Purpose Resume Request.'}

EDUCATION HISTORY:
${flatEducation || 'Not provided.'}

SKILLS GRID:
${flatSkills}

PROJECTS BUILT:
${flatProjects || 'Not provided.'}

ADDITIONAL HIGHLIGHTS:
- Coursework: ${resumeData.additionalInfo?.coursework || ''}
- Goals: ${resumeData.additionalInfo?.careerGoals || ''}
- Notes: ${resumeData.additionalInfo?.additionalNotes || ''}

Return ONLY a JSON object string with this exact mapping format:
{
  "html": "<complete HTML document starting with <!DOCTYPE html>>"
}
Do not wrap your output markdown blocks with generic explanatory text.
`;  

    const interaction = await geminiAI.interactions.create({
      model: "gemini-3.6-flash",
      input: prompt,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: resumePDFSchema,
      }
    })

    const jsonContent = JSON.parse(interaction.output_text);

    const pdfBuffer = await generatePdfFromHTML(jsonContent.html);

    return pdfBuffer;
}

export { generateInterviewReport, generateResumePDF, generateResumeFromScratch };
