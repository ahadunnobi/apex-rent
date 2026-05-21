"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, mounted } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("apex");

  // Load and apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("apex_theme") || "apex";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "apex" ? "apex-light" : "apex";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("apex_theme", newTheme);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/cars", label: "Explore Cars" },
    { href: "/add-car", label: "Add Car" },
    { href: "/my-bookings", label: "My Bookings" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 border-b border-primary/10 shadow-lg"
    >
      {/* ── Left Side: Logo & Brand ── */}
      <div className="navbar-start">
        {/* Mobile Hamburger toggle */}
        <button
          className="btn btn-ghost btn-circle lg:hidden text-primary mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
        </button>

        <Link href="/" className="flex items-center gap-3 group">
          <div className="avatar ring ring-primary/30 ring-offset-base-100 ring-offset-2 rounded-full overflow-hidden transition-all duration-300 group-hover:ring-primary/80">
            <div className="w-9 h-9 relative">
              <Image
                src="/favicon.ico"
                alt="Apex Rent Logo"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <span className="text-lg md:text-xl font-black font-display tracking-widest bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            APEX RENT
          </span>
        </Link>
      </div>

      {/* ── Center: Navigation Links ── */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-2 font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 relative
                  ${
                    pathname === link.href
                      ? "text-primary bg-primary/10 font-bold"
                      : "text-base-content/70 hover:text-primary hover:bg-base-200"
                  }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="active-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Right Side: Conditional User Profile & Theme Toggle ── */}
      <div className="navbar-end gap-3">
        {/* User Auth (conditional, safe-guarded by mounted state to prevent hydration mismatches) */}
        {mounted && (
          <>
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar border border-primary/20 hover:border-primary/60 transition-all duration-300"
                >
                  <div className="w-9 rounded-full">
                    <img src={user.avatar} alt="Profile" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-200 border border-primary/10 rounded-box w-52"
                >
                  <li className="menu-title border-b border-base-content/5 pb-2 mb-1">
                    <span className="text-primary font-bold text-xs uppercase tracking-wider block">
                      Welcome,
                    </span>
                    <span className="text-base-content font-extrabold text-sm block truncate">
                      {user.name}
                    </span>
                  </li>
                  <li>
                    <Link href="/add-car" className="py-2.5 hover:text-primary">
                      Add Car
                    </Link>
                  </li>
                  <li>
                    <Link href="/my-bookings" className="py-2.5 hover:text-primary">
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <Link href="/my-cars" className="py-2.5 hover:text-primary">
                      My Added Cars
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="py-2.5 text-error hover:bg-error/10 hover:text-error-content transition-all"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn btn-primary btn-sm rounded-lg hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all font-bold px-5"
              >
                Login
              </Link>
            )}
          </>
        )}

        {/* Color Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-primary hover:bg-base-200 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "apex" ? (
            <FiSun className="text-xl animate-spin-slow" />
          ) : (
            <FiMoon className="text-xl" />
          )}
        </button>
      </div>

      {/* ── Mobile Expandable Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute top-[73px] left-0 right-0 bg-base-100 border-b border-primary/10 overflow-hidden shadow-2xl"
          >
            <ul className="menu p-4 gap-2 font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base transition-all
                      ${
                        pathname === link.href
                          ? "bg-primary/10 text-primary font-bold border-l-4 border-primary"
                          : "text-base-content/70 hover:bg-base-200 hover:text-primary"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
