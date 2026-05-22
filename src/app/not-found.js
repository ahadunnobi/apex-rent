"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-12 text-center max-w-lg"
      >
        <p className="text-8xl font-black font-display text-gradient mb-4">404</p>
        <h1 className="text-2xl font-display font-bold text-base-content mb-3">
          Page Not Found
        </h1>
        <p className="text-base-content/60 mb-8 text-sm leading-relaxed">
          The page you are looking for does not exist or may have been moved.
          Let us get you back on the road.
        </p>
        <Link href="/" className="btn-neon px-8 py-3 rounded-xl text-sm font-bold inline-block">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
