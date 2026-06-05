"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState("/");
  const { login, user, mounted } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");
      if (redirect?.startsWith("/")) setRedirectTo(redirect);
    }
  }, []);
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mounted && user) router.replace("/");
  }, [mounted, user, router]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("error=google_failed")) {
      toast.error("Google login failed. Please try again.");
    }
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back to Apex Rent!");
      router.push(redirectTo.startsWith("/") ? redirectTo : "/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch {
      toast.error("Google login failed");
    }
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
              Welcome Back
            </span>
            <h2 className="text-3xl font-black font-display text-base-content">
              User <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">Login</span>
            </h2>
          </div>

          {error && (
            <div className="alert alert-error mb-6 py-3 rounded-lg text-sm border border-error/20 bg-error/10">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="driver@apex.rent"
                className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-xl text-sm font-bold uppercase tracking-widest mt-2"
            >
              {loading ? <span className="loading loading-spinner" /> : "Login"}
            </button>
          </form>

          <div className="divider text-xs text-base-content/40 my-6">OR</div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn btn-outline w-full rounded-xl gap-2 border-primary/30 hover:border-primary hover:bg-primary/5"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          <p className="text-center text-sm text-base-content/60 mt-8">
            New to Apex Rent?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
