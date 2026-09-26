import api from "../../../../config/api";


/** 
 * @description  Function to generate interview report based on user self description, resume and job description
 */
const generateInterviewReportFunc = async ({jobDescription, selfDescription, resumeFile}) => {

    const formData = new FormData();
    formData.append('jobDescription' , jobDescription);
    formData.append('selfDescription' , selfDescription);
    formData.append('resume' , resumeFile);
    
    const response = await api.post('/api/interview', formData, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    });

    return response.data;
}


/** 
 * @description Function to get interview report based on interviewId
 */
const getInterviewReportById = async (interviewId) => {

    const response = await api.get(`/api/interview/report/${interviewId}`);

    return response.data;
}


/** 
 * @description Function to get all interview reports based on User id of logged in user
 */
const getAllInterviewReports = async () => {

    const response = await api.get('/api/interview/all-interviews');

    return response.data;
}


/**
 * @description Function to delete the interview Report by interviewId 
 */
const deleteInterviewReportById = async (interviewId) => {

    try {
        const response = await api.delete(`/api/interview/${interviewId}`);
        
        return response.data;
    } catch (error) {
        console.log(error);

        throw error;
    }

}

/**
 * @description Function to generate resume pdf based on user self description, resume content and job description
 */
const generateResumePDFFunc = async ({selfDescription, jobDescription, resumeFile}) => {

    const formData = new FormData();
    formData.append('jobDescription' , jobDescription);
    formData.append('selfDescription' , selfDescription);
    formData.append('resume' , resumeFile);

    const response = await api.post('/api/interview/enhance-resume/pdf', formData , {
        responseType: "blob"
    })

    return response.data;
}



export {
    generateInterviewReportFunc,
    getInterviewReportById,
    getAllInterviewReports,
    generateResumePDFFunc,
    deleteInterviewReportById
}