"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { authClient } from "@/lib/auth-client";

function validatePassword(password) {
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter.";
  return "";
}

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const pwErr = validatePassword(password);
    if (pwErr) {
      setPasswordError(pwErr);
      return;
    }
    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, photo, password);
      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
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
        className="card w-full max-w-md bg-base-100/60 backdrop-blur-md border border-primary/20 shadow-2xl p-8 z-10"
      >
        <div className="card-body p-0">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-2 block">
              Join Apex Rent
            </span>
            <h2 className="text-3xl font-black font-display text-base-content">
              User <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">Registration</span>
            </h2>
          </div>

          {error && (
            <div className="alert alert-error mb-6 py-3 rounded-lg text-sm border border-error/20 bg-error/10">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs uppercase tracking-wider font-semibold text-base-content/60">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="input input-bordered w-full bg-base-200/50 border-primary/20 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs uppercase tracking-wider font-semibold text-base-content/60">Email</span>
              </label>
              <input
                type="email"
                placeholder="driver@apex.rent"
                className="input input-bordered w-full bg-base-200/50 border-primary/20 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs uppercase tracking-wider font-semibold text-base-content/60">Photo URL</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full bg-base-200/50 border-primary/20 rounded-xl"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs uppercase tracking-wider font-semibold text-base-content/60">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full bg-base-200/50 rounded-xl ${passwordError ? "border-error" : "border-primary/20"}`}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
              />
              {passwordError && (
                <p className="text-error text-xs mt-1">{passwordError}</p>
              )}
              <p className="text-xs text-base-content/40 mt-1">
                Min 6 chars, one uppercase and one lowercase letter.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !!passwordError}
              className="btn btn-primary w-full rounded-xl font-bold uppercase tracking-widest mt-2"
            >
              {loading ? <span className="loading loading-spinner" /> : "Register"}
            </button>
          </form>

          <div className="divider text-xs text-base-content/40 my-6">OR</div>

          <button
            type="button"
            onClick={async () => {
              try {
                await authClient.signIn.social({ provider: "google", callbackURL: "/" });
              } catch {
                toast.error("Google login failed");
              }
            }}
            className="btn btn-outline w-full rounded-xl gap-2 border-primary/30"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          <p className="text-center text-sm text-base-content/60 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
