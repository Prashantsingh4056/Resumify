import { createContext, useState } from "react";

export const ResumeWithAIContext = createContext();

export const ResumeWithAIProvider = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    return (
    <ResumeWithAIContext.Provider value={{loading, setLoading, isDownloading, setIsDownloading}}>
        {children}
    </ResumeWithAIContext.Provider>
    ) 
        
}