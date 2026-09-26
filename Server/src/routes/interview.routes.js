import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { generateInterviewReportController, generateResumePDFController, getAllInterviews, getInterviewReportById, generateResumePDFFromScratch, deleteInterviewReportById } from "../controllers/interview.controller.js";
import upload from "../middlewares/multer.middleware.js";

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description generate interview report on the basis of user self description , resume pdf and job description
 * @access private
 */
interviewRouter.post("/", authUser, upload.single("resume"), generateInterviewReportController);


/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */
interviewRouter.get("/report/:interviewId", authUser, getInterviewReportById);

/**
 * @route GET /api/interview/all-interviews
 * @description get all interview reports of the logged in user 
 * @access private
 */
interviewRouter.get("/all-interviews", authUser, getAllInterviews);


/**
 * @route DELETE /api/interview/:interviewId
 * @description delete the interview report based on the interview Id
 * @access private
 */
interviewRouter.delete("/:interviewId", authUser, deleteInterviewReportById);


/**
 * @route POST /api/interview/enhance-resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content, and job description
 * @access private
 */
interviewRouter.post('/enhance-resume/pdf', authUser, upload.single("resume"), generateResumePDFController);


/**
 * @route POST /api/interview/build-from-scratch/pdf
 * @description generate resume on the basis of user personal details, skills, experience, education, and achievements
 * @access private
 */
interviewRouter.post('/build-from-scratch/pdf', authUser, generateResumePDFFromScratch);
 

export default interviewRouter;
