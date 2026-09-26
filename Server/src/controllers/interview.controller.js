import { PDFParse } from 'pdf-parse';
import { generateInterviewReport, generateResumeFromScratch } from "../services/ai.service.js";
import InterviewReport from "../models/interviewReport.model.js";
import { generateResumePDF } from '../services/ai.service.js';

/**
 * @name generateInterviewReportController
 * @description generate interview report based on user self description , resume and job description
 * @access private
 */
const generateInterviewReportController = async (req, res) => {
    try {
        const resumeFile = req.file;

        // Ensure a file was actually uploaded before parsing
        if (!resumeFile) {
            return res.status(400).json({ message: "Please upload a resume file." });
        }
    
        const parser = new PDFParse({
            data: resumeFile.buffer
        })

        const parsedPdfData = await parser.getText();

        const resumeTextContent = parsedPdfData.text;

        await parser.destroy();
        
        const { selfDescription, jobDescription } = req.body;
        
        const interviewReportByAI = await generateInterviewReport({
            resume: resumeTextContent, 
            selfDescription,
            jobDescription,
        });

        console.log(interviewReportByAI);
        
    
        const interviewReport = await InterviewReport.create({
            userId: req.user.id,
            resume: resumeTextContent,
            selfDescription: selfDescription,
            jobDescription: jobDescription,
            matchScore: interviewReportByAI.matchScore,
            technicalQuestions: interviewReportByAI.technicalQuestions,
            behavioralQuestions: interviewReportByAI.behavioralQuestions,
            skillGaps: interviewReportByAI.skillGaps,
            preparationPlan: interviewReportByAI.preparationPlan,
            title: interviewReportByAI.title,
            strengths: interviewReportByAI.strengths,
            areasToImprove: interviewReportByAI.areasToImprove
        });
    
        return res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        });
        
    } catch (error) {
        console.log("Error in generateInterviewReportController: ", error);
        return res.status(500).json({
            message: error.message
        });
    }
};


/**
 * @name getInterviewReportById
 * @description returns the interview report based on interviewId
 * @access private
 */
const getInterviewReportById = async(req, res) => {

    
    try {
        const {interviewId} = req.params;
    
        const interviewReport = await InterviewReport.findOne({_id: interviewId, userId: req.user.id})
    
        if(!interviewReport){
            return res.status(404).json({
                message: "Interview report not found"
            })
        }
    
        res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReport
        });
        
    } catch (error) {
        console.log("Error in getInterviewReportById Controller: ", error);
        
        return res.status(500).json({
            message: error.message
        })
    }

};


const getAllInterviews = async(req, res) => {

    try {

        const InterviewReports = await InterviewReport.find({userId: req.user.id}).sort({updatedAt: -1}).select("-resume -selfDescription -skillGaps -preparationPlan -jobDescription");

        res.status(200).json({
            message: "Interviews fetched successfully",
            InterviewReports
        })
        
    } catch (error) {
        
        console.log("Error in getAllInterviews Controller: ", error);
        
        return res.status(500).json({
            message: error.message
        })
    }
}


/**
 * @name deleteInterviewReportById
 * @description Deletes the interview report based on interviewId
 * @access private
 */
const deleteInterviewReportById = async (req, res) => {

    
    try {
        const {interviewId} = req.params;
    
        const interviewReport = await InterviewReport.findByIdAndDelete(interviewId);
    
        if(!interviewReport){
            return res.status(404).json({
                message: "Interview Report not found"
            })
        }
    
        return res.status(200).json({
            message: "Interview Report deleted successfully"
        })
        
    } catch (error) {
        console.error("Error in deleteInterviewReportById: ", error);
        
        return res.status(500).json({
            message: "Internal server error occurred while deleting the report"
        });
    }
}


/**
 * @name generateResumePDFController
 * @description Controller that generate resume pdf based on user self description, personal details, job description
 * @access private
 */
const generateResumePDFController = async (req, res) => {

    
    try {

        const resumeFile = req.file;

        if(!resumeFile){
            return res.status(404).json({
                message: "Please upload a resume file"
            })
        }

        const parser = new PDFParse({
            data: resumeFile.buffer
        }) 

        const parsedPdfData = await parser.getText();

        const resumeTextContent = parsedPdfData.text;

        await parser.destroy();

        const {selfDescription, jobDescription} = req.body; 
    
        const pdfBuffer = await generateResumePDF({resume: resumeTextContent, selfDescription, jobDescription});

        res.set({
            "Content-Type": "application/pdf",
            // "Content-Disposition": `attachment; filename=resume_${req.user.id}.pdf`
            "Content-Disposition": `inline; filename=resume_${req.user.id}.pdf`
        })
    
        res.send(pdfBuffer);
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        })
    }
} 


/**
 * @name generateResumePDFFromScratch
 * @description Controller that generate resume pdf based on user personal details, skills, experience, education, and achievements
 * @access private
 */
const generateResumePDFFromScratch = async (req, res) => {

    try {

        const {personalInfo, aboutAndTarget, education, skills, experience, projects, additionalInfo } = req.body;

        if(!personalInfo.fullName || !personalInfo.email || !aboutAndTarget.introduction){
            return res.status(400).json({
                message: "Full name, email and self introduction are required",
            })
        }

        const jobDescription = aboutAndTarget?.jobDescription || "";

        const resumeData = {
            personalInfo,
            aboutAndTarget,
            education,
            skills,
            experience,
            projects,
            additionalInfo
        };

        const pdfBuffer = await generateResumeFromScratch(resumeData);

        res.set({
            "Content-Type": "application/pdf",
            // "Content-Disposition": `attachment; filename=resume_${req.user.id}.pdf`
            "Content-Disposition": `inline; filename=resume_${req.user.id}.pdf`
        })
    
        res.send(pdfBuffer);
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        })
    }
}

    

export {
    generateInterviewReportController,
    getInterviewReportById,
    getAllInterviews,
    generateResumePDFController,
    generateResumePDFFromScratch,
    deleteInterviewReportById
};
