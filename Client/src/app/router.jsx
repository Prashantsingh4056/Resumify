import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../pages/Home";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import ResumeLoader from "../pages/ResumeLoader";
import Loader from "../pages/Loader";
import NewAnalysis from "../features/ai/analyse-resume/pages/NewAnalysis";
import InterviewReport from "../features/ai/analyse-resume/pages/InterviewReport";
import BuildWithAI from "../features/ai/build-with-ai/pages/BuildWithAI";
import ResumePreview from "../features/ai/analyse-resume/pages/ResumePreview";
import PublicRoute from "../features/auth/components/PublicRoute";
import ResumeGenerationLoader from "../components/ResumeGenerationLoader";

const router = createBrowserRouter(

    createRoutesFromElements(

        <Route path="/" element={<App/>}>
            <Route index element={<Home/>}/>
            <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
            <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path="/resumeLoader" element={<ResumeLoader/>}/>
            <Route path="/loader" element={<Loader/>}/>
            <Route path="/resumeGenLoader" element={<ResumeGenerationLoader/>}/>
            <Route path="/build-with-ai" element={<ProtectedRoute><BuildWithAI/></ProtectedRoute>}/>
            <Route path="/resume-preview" element={<ResumePreview/>}/>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path="/analyze" element={<ProtectedRoute><NewAnalysis/></ProtectedRoute>}/>
            <Route path="/interview/:interviewId" element={<ProtectedRoute><InterviewReport/></ProtectedRoute>}/>
        </Route>
    )
)

export default router;