import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import Loader from "../pages/Loader";
import { ChevronDown, LogOut, User } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { loading, user, Logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }

    window.addEventListener("scroll", () => handleScroll());

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

  const handleLogout = async () => {
    try {
      const res = Logout();
      navigate("/login");

      // navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? "bg-white/[0.1] backdrop-blur-xl" : "bg-transparent"} `}>
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
        {/* Website logo and Name */}
        <div className="flex gap-3 items-center group cursor-pointer relative z-50">
          <div className="w-10 h-10 border border-[#ff6a00]/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(255,106,0,0.15)] transition-all duration-300 group-hover:border-[#ff6a00]/60">
            <img
              src="./logo.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight">
            Resumify 
          </h1>
        </div>

        {/* Desktop Navigation Items and Action Buttons */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8 text-md font-medium text-stone-300">
            <li>
              <a
                href="#"
                className="hover:text-[#ff7300] transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#ff7300] hover:after:w-full after:transition-all after:duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#ff7300] transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#ff7300] hover:after:w-full after:transition-all after:duration-300"
              >
                How it Works
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#ff7300] transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#ff7300] hover:after:w-full after:transition-all after:duration-300"
              >
                Features
              </a>
            </li>
          </ul>

          {user ? (
            <div className="hidden items-center gap-3 md:flex">

              <Link to="/dashboard"><div className="text-md font-bold cursor-pointer bg-gradient-to-r from-[#ff5500] to-[#ff7300] text-stone-950 px-5 py-2 rounded-xl hover:from-[#ff6a00] hover:to-[#ff8800] transition-all duration-200 shadow-[0_4px_20px_rgba(255,85,0,0.2)] transform active:scale-[0.97]">Dashboard</div></Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 transition hover:border-white/15 hover:bg-white/[0.07]"
                >
                  {/* Avatar */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-semibold text-black">
                    {user.username?.charAt(0)}
                  </div>

                  <div className="hidden text-left lg:block">
                    <p className="max-w-[130px] truncate text-sm font-medium text-white">
                      {user.username}
                    </p>
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-zinc-500 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-white/10 bg-[#15151a] shadow-2xl shadow-black/40">
                    {/* User Info */}
                    <div className="border-b border-white/10 px-4 py-3">
                      <p className="truncate text-sm font-medium text-white">
                        {user.username}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-zinc-500">
                        {user.email}
                      </p>
                    </div>

                    {/* Profile */}
                    <div className="p-1.5">
                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <button className="text-md font-semibold border border-white/40  cursor-pointer text-stone-200 hover:text-white hover:bg-white/5 px-4 py-2 rounded-xl transition-all duration-200">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="text-md font-bold cursor-pointer bg-gradient-to-r from-[#ff5500] to-[#ff7300] text-stone-950 px-5 py-2 rounded-xl hover:from-[#ff6a00] hover:to-[#ff8800] transition-all duration-200 shadow-[0_4px_20px_rgba(255,85,0,0.2)] transform active:scale-[0.97]">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Button Trigger */}
        <div className="md:hidden flex items-center relative z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-stone-300 hover:text-white focus:outline-none p-2"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between items-end">
              <span
                className={`h-[2px] bg-current rounded-full transition-all duration-300 ease-out-in ${isOpen ? "w-6 rotate-45 translate-y-[9px]" : "w-6"}`}
              />
              <span
                className={`h-[2px] bg-current rounded-full transition-all duration-200 ${isOpen ? "w-0 opacity-0" : "w-4"}`}
              />
              <span
                className={`h-[2px] bg-current rounded-full transition-all duration-300 ease-out-in ${isOpen ? "w-6 -rotate-45 -translate-y-[9px]" : "w-5"}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphic Overlay Drawer Menu */}
      <div
        className={`md:hidden fixed inset-0 h-screen w-screen bg-[#0e0703]/95 backdrop-blur-2xl transition-all duration-300 ease-in-out z-40 flex flex-col justify-center items-center ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center gap-8 text-xl font-semibold text-stone-200">
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#ff7300] transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#ff7300] transition-colors duration-200"
          >
            How it works
          </a>
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#ff7300] transition-colors duration-200"
          >
            Features
          </a>

          {/* Action separator line */}
          <div className="w-16 h-[1px] bg-[#ff6a00]/30 my-2" />

          {user ? (
             <div className="items-center gap-3 md:flex">

              <Link to="/dashboard"><div className="flex justify-center text-md mb-5 font-bold cursor-pointer bg-gradient-to-r from-[#ff5500] to-[#ff7300] text-stone-950 px-5 py-2 rounded-xl hover:from-[#ff6a00] hover:to-[#ff8800] transition-all duration-200 shadow-[0_4px_20px_rgba(255,85,0,0.2)] transform active:scale-[0.97]">Dashboard</div></Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 transition hover:border-white/15 hover:bg-white/[0.07]"
                >
                  {/* Avatar */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-semibold text-black">
                    {user.username?.charAt(0)}
                  </div>

                  <div className=" text-left lg:block">
                    <p className="max-w-[130px] truncate text-sm font-medium text-white">
                      {user.username}
                    </p>
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-zinc-500 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-white/10 bg-[#15151a] shadow-2xl shadow-black/40">
                    {/* User Info */}
                    <div className="border-b border-white/10 px-4 py-3">
                      <p className="truncate text-sm font-medium text-white">
                        {user.username}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-zinc-500">
                        {user.email}
                      </p>
                    </div>

                    {/* Profile */}
                    <div className="p-1.5">
                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (<div className="flex flex-col gap-4">
            <button
            onClick={() => setIsOpen(false)}
            className="text-base font-semibold text-stone-300 hover:text-white py-2 px-6 rounded-xl transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-base font-bold bg-gradient-to-r from-[#ff5500] to-[#ff7300] text-stone-950 px-8 py-3 rounded-xl shadow-[0_4px_20px_rgba(255,85,0,0.2)]"
          >
            Sign Up
          </button>
          </div>)}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
