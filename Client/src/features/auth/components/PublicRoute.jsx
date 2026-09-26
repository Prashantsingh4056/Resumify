import React from 'react'
import { useAuth } from '../hooks/useAuth'
import Loader from '../../../pages/Loader';
import { Navigate } from 'react-router-dom';


function PublicRoute({children}) {

  const {user, loading} = useAuth();

  if(loading){
    return <Loader/>
  }

  if(user){
    return <Navigate to='/dashboard' replace/>
  }

  return children;
}

export default PublicRoute