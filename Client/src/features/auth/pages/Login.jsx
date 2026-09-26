import React, { useState } from 'react';
import BackDrop from '../../../components/BackDrop';
import {Link} from "react-router-dom"
import axios from 'axios';
import api from '../../../config/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../pages/Loader';

export default function Login() {

  const navigate = useNavigate();
  const {loading, handleLogin} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {

      e.preventDefault();

      await handleLogin({email, password});

      navigate('/dashboard')

  };

  if(loading) {

    return <Loader/>
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10 font-sans selection:bg-[#ff5500]/30 selection:text-white">

        <BackDrop/>

      {/* Refined Glassmorphic Card Container with a touch more edge definition */}
      <div className="w-full max-w-md bg-[#160c05]/60 backdrop-blur-2xl border border-[#ff6a00]/25 border-dashed rounded-2xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_50px_rgba(255,85,0,0.03)] relative overflow-hidden">
        
        {/* Top brand gradient accent border line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-[#ff6a00] to-orange-600" />

        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Brighter Document Icon Container */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff5500]/25 to-[#ff7300]/10 border border-[#ff6a00]/40 mb-4 shadow-[0_0_15px_rgba(255,106,0,0.1)]">
            <svg className="w-6 h-6 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://w3.org">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Welcome Back
          </h2>
          <p className="text-sm text-stone-300/80 mt-2">
            Log in to analyze, optimize, and score your resume
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold tracking-wide text-stone-200 mb-2 uppercase">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#24140a]/40 border border-[#ff6a00]/20 focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none transition-all duration-200 text-sm"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold tracking-wide text-stone-200 mb-2 uppercase">
                Password
              </label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#24140a]/40 border border-[#ff6a00]/20 focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none transition-all duration-200 text-sm"
              placeholder="••••••••"
            />
          </div>

          

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-[#ff5500] to-[#ff7300] text-stone-950 font-bold text-md py-3 rounded-xl hover:from-[#ff6a00] hover:to-[#ff8800] focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:ring-offset-2 focus:ring-offset-[#0a0502] transition-all duration-200 shadow-[0_4px_25px_rgba(255,85,0,0.2)] transform active:scale-[0.985] cursor-pointer"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer Section */}
        <p className="text-center text-xs text-stone-300 mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#ff6a00] hover:text-[#ff8800] hover:underline font-semibold ml-1">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
