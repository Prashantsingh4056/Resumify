import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./app/router.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/ai/analyse-resume/interview.context.jsx";
import { ResumeWithAIProvider } from "./features/ai/build-with-ai/resumeWithAI.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ResumeWithAIProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
      </ResumeWithAIProvider>
    </AuthProvider>
  </StrictMode>,
);
