import { useContext } from "react";
import { ResumeWithAIContext } from "../resumeWithAI.context.jsx";
import api from "../../../../config/api.js";

const useResumeWithAI = () => {

    const context = useContext(ResumeWithAIContext);

    const { loading, setLoading, isDownloading, setIsDownloading } = context;

  if (!context) {
    throw new Error("useResumeWithAI must be used within ResumeWithAIProvider");
  }

  //$ ================================ Enhance Resume with AI ================================

  const enhanceResumeWithAI = async (
    resumeFile,
    jobDescription,
    selfDescription,
  ) => {
    try {
      setLoading(true);

      // 1. create a FormData object to send the file and other data
      const formData = new FormData();
      formData.append("jobDescription", jobDescription);
      formData.append("selfDescription", selfDescription);
      formData.append("resume", resumeFile);

      // 2. Send the FormData to the server
      const response = await api.post('/api/interview/enhance-resume/pdf', formData, {
        headers: {
            'Content-Type': "multipart/form-data"
        },
        responseType: "blob", // Expecting a binary response (PDF)
      }); 
      
      return response.data;

    } catch (error) {
      console.log("Error: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  //$ ================================ Build Resume from Scratch with AI =====================

  const buildResumeFromScratchWithAI = async (candidateDetails) => {
  try {
    setLoading(true);

    const response = await api.post(
      '/api/interview/build-from-scratch/pdf',
      candidateDetails,
      {
        responseType: 'blob'
      }
    );

    return response.data;

  } catch (error) {
    console.error("Error building resume:", error);
    throw error; 
  } finally {
    setLoading(false);
  }
};

  //$ ================================ Download Resume as PDF ================================

  const createResumePdfUrl = async (apiResponseData) => {
    try {
      setIsDownloading(true);

      const pdfBuffer = apiResponseData;

      // 2. Extract the raw data array from the Node Buffer object structure
      const rawData = pdfBuffer?.data || pdfBuffer;

      // 3. Convert the byte array into a format the browser can understand
      const byteArray = new Uint8Array(rawData);
      const blob = new Blob([rawData], { type: "application/pdf" });

      // 4. Trigger the download sequence
      const url = window.URL.createObjectURL(blob);
      
      return url;

    } catch (error) {
      console.log("Error: ", error);
      throw new Error("Failed to download resume as PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  return { loading, isDownloading, createResumePdfUrl, enhanceResumeWithAI, buildResumeFromScratchWithAI };
};

export default useResumeWithAI;
