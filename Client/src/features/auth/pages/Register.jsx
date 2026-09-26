import React, { useState } from 'react';
import BackDrop from '../../../components/BackDrop';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {loading, handleRegister} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({username, email, password})
    navigate('/login')
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10 font-sans selection:bg-[#ff5500]/30 selection:text-white">


        <BackDrop/>

      {/* Refined Glassmorphic Card Container */}
      <div className="w-full max-w-md bg-[#160c05]/60 backdrop-blur-2xl border border-[#ff6a00]/25 border-dashed rounded-2xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_50px_rgba(255,85,0,0.03)] relative overflow-hidden">
        
        {/* Top brand gradient accent border line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-[#ff6a00] to-orange-600" />

        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Brighter Document Icon Container with Add Badge */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff5500]/25 to-[#ff7300]/10 border border-[#ff6a00]/40 mb-4 shadow-[0_0_15px_rgba(255,106,0,0.1)] relative">
            <svg className="w-6 h-6 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://w3.org">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5H4a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-5M9 11h3m-3 4h6" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Create Your Account
          </h2>
          <p className="text-sm text-stone-300/80 mt-2">
            Join now to optimize your resume and land your dream job
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Two Column Grid for Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-semibold tracking-wide text-stone-200 mb-2 uppercase">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#24140a]/40 border border-[#ff6a00]/20 focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none transition-all duration-200 text-sm"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold tracking-wide text-stone-200 mb-2 uppercase">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#24140a]/40 border border-[#ff6a00]/20 focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none transition-all duration-200 text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Two Column Grid for Password Validation */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold tracking-wide text-stone-200 mb-2 uppercase">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#24140a]/40 border border-[#ff6a00]/20 focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none transition-all duration-200 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-[#ff5500] to-[#ff7300] text-stone-950 font-bold text-sm py-3.5 rounded-xl hover:from-[#ff6a00] hover:to-[#ff8800] focus:outline-none focus:ring-2 focus:ring-[#ff5500] focus:ring-offset-2 focus:ring-offset-[#0a0502] transition-all duration-200 shadow-[0_4px_25px_rgba(255,85,0,0.2)] transform active:scale-[0.985]"
          >
            Get Started
          </button>
        </form>

        {/* Footer Section */}
        <p className="text-center text-xs text-stone-300 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-[#ff6a00] hover:text-[#ff8800] hover:underline font-semibold ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
