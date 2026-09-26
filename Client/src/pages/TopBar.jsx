import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FileText,
  LayoutDashboard,
  ScanSearch,
  Sparkles,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../features/auth/hooks/useAuth";


const TopBar = () => {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Replace this with your actual auth/user data

  const {user, Logout} = useAuth();

  const handleLogout = async () => {
    try {

      const res = Logout();
      navigate('/login');

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Analyze",
      path: "/analyze",
      icon: ScanSearch,
    },
    {
      label: "Build Resume",
      path: "/build-with-ai",
      icon: Sparkles,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0f]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="flex items-center gap-2.5"
        >
          <div className="w-10 h-10 border border-[#ff6a00]/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(255,106,0,0.15)] transition-all duration-300 group-hover:border-[#ff6a00]/60">
            <img
              src="/logo.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="font-semibold tracking-tight text-white text-xl">
            Resumify
          </span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={16}
                      className={
                        isActive
                          ? "text-orange-400"
                          : "text-zinc-500 group-hover:text-zinc-300"
                      }
                    />

                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Profile Dropdown */}
          <div className="relative">

            <button
              onClick={() =>
                setIsProfileOpen((prev) => !prev)
              }
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

        {/* ================= MOBILE BUTTON ================= */}
        <button
          onClick={() =>
            setIsMobileMenuOpen((prev) => !prev)
          }
          className="rounded-lg border border-white/10 p-2 text-zinc-300 md:hidden"
        >
          {isMobileMenuOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0d0d11] px-5 py-4 md:hidden">

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${
                      isActive
                        ? "bg-white/[0.08] text-white"
                        : "text-zinc-400"
                    }`
                  }
                >
                  <Icon size={17} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="my-3 h-px bg-white/10" />

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default TopBar;