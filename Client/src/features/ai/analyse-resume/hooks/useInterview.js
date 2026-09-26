import { useContext } from "react";
import {
  generateInterviewReportFunc,
  getInterviewReportById,
  getAllInterviewReports,
  deleteInterviewReportById,
} from "../services/resumeAnalysis.api.js";
import { InterviewContext } from "../interview.context.jsx";
import { generateResumePDFFunc } from "../services/resumeAnalysis.api.js";

const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    let res = null;

    try {
      setLoading(true);
      res = await generateInterviewReportFunc({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      setReport(res.interviewReport);

      return res.interviewReport;
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }

    return res.interviewReport;
  };

  const getReportById = async (interviewId) => {
    try {
      setLoading(true);

      const res = await getInterviewReportById(interviewId);

      const interviewReport = res?.interviewReport ?? null;

      setReport(interviewReport);

      return interviewReport;
    } catch (error) {
      console.log("Error: ", error);

      setReport(null);

      return null;
    } finally {
      setLoading(false);
    }
  };

const getReports = async () => {
  try {
    setLoading(true);

    const res = await getAllInterviewReports();

    setReports(res.InterviewReports);

    return res.InterviewReports;

  } catch (error) {
    console.log("Error: ", error);
    throw error;
  } finally {
    setLoading(false);
  }
};

const deleteReportById = async (interviewId) => {

  try {

    const res = await deleteInterviewReportById(interviewId);

    return res;
    
  } catch (error) {
    console.log(error);

    throw error;
    
  }
}

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    deleteReportById,
    setReports
  };
};

export default useInterview;
