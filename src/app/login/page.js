"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      if (error) {
        setError(error.message || "Login failed");
      } else {
        // Successful login, we also want to set the token for express backend
        // Wait, better-auth sets an HTTPOnly cookie if it's on the same domain.
        // For cross-domain (Next on 3000, Express on 5000), we should probably manually
        // fetch the express /jwt endpoint so Express knows who is logged in.
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/jwt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.user.email, id: data.user.id }),
        });
        
        router.push("/");
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
        callbackURL: "/", // Redirect to home on success
      });
      if (error) {
        setError(error.message || "Google login failed");
      }
    } catch (err) {
      setError("Google login failed.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold justify-center mb-6">Login to Apex Rent</h2>
          
          {error && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="input input-bordered w-full" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="********" 
                className="input input-bordered w-full" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary w-full mb-4" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>
          
          <button onClick={handleGoogleLogin} className="btn btn-outline w-full mb-4 flex items-center gap-2">
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>
          
          <p className="text-center text-sm">
            Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
