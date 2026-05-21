"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = register(name, email, password);
      if (res.success) {
        router.push("/");
      } else {
        setError("Failed to register account.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card w-full max-w-md bg-base-100/60 backdrop-blur-md border border-primary/20 shadow-2xl p-8 z-10"
      >
        <div className="card-body p-0">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-2 block">
              Initialization
            </span>
            <h2 className="text-3xl font-black font-display text-base-content">
              Create <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">Account</span>
            </h2>
          </div>

          {error && (
            <div className="alert alert-error mb-6 py-3 rounded-lg text-sm border border-error/20 bg-error/10 text-error-content flex items-center">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">
                  Driver Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Alex Mercer"
                className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                placeholder="driver@apex.rent"
                className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">
                  Secure Password
                </span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-xl text-sm font-bold uppercase tracking-widest mt-4 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Initialize Session"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/60 mt-8">
            Already registered?{" "}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              Authenticate Portal
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
