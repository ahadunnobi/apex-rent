"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(pass)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(pass)) return "Password must contain at least one lowercase letter.";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    const passError = validatePassword(password);
    if (passError) {
      setPasswordError(passError);
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoURL,
      });

      if (error) {
        setError(error.message || "Registration failed");
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
      if (error) {
        setError(error.message || "Google login failed");
      }
    } catch (err) {
      setError("Google login failed.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold justify-center mb-6">Create an Account</h2>
          
          {error && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-control mb-4">
              <label className="label"><span className="label-text">Name</span></label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="input input-bordered w-full" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mb-4">
              <label className="label"><span className="label-text">Email</span></label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="input input-bordered w-full" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mb-4">
              <label className="label"><span className="label-text">Photo URL</span></label>
              <input 
                type="url" 
                placeholder="https://example.com/photo.jpg" 
                className="input input-bordered w-full" 
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label"><span className="label-text">Password</span></label>
              <input 
                type="password" 
                placeholder="********" 
                className={`input input-bordered w-full ${passwordError ? 'input-error' : ''}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(""); // clear error on type
                }}
                required
              />
              {passwordError && (
                <label className="label">
                  <span className="label-text-alt text-error">{passwordError}</span>
                </label>
              )}
            </div>
            
            <button type="submit" className="btn btn-primary w-full mb-4" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Register"}
            </button>
          </form>

          <div className="divider">OR</div>
          
          <button onClick={handleGoogleLogin} className="btn btn-outline w-full mb-4 flex items-center gap-2">
            <FcGoogle className="w-5 h-5" />
            Sign up with Google
          </button>
          
          <p className="text-center text-sm">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
