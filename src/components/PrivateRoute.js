"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaLock } from "react-icons/fa";

export default function PrivateRoute({ children }) {
  const { user, mounted } = useAuth();

  if (!mounted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4">
        <div className="card max-w-md bg-base-100 border border-primary/20 p-8 text-center shadow-xl">
          <div className="card-body p-0 items-center">
            <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mb-4 border border-error/20">
              <FaLock className="text-2xl" />
            </div>
            <h2 className="text-2xl font-display font-black text-error mb-2">Access Denied</h2>
            <p className="text-base-content/60 mb-6 text-sm">
              Please log in to access this page.
            </p>
            <Link
              href="/login"
              className="btn btn-primary w-full rounded-xl uppercase font-bold tracking-wider"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
