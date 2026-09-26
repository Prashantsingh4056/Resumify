import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import React from 'react'
import Loader from "../../../pages/Loader";

function ProtectedRoute({children}) {

    const {loading, user} = useAuth();
    const navigate = useNavigate();

    if(loading){

        return <Loader/>
    }

    if(!user){
        return <Navigate to="/login"/>
    }


    return children;
}

export default ProtectedRoute;