"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CarCard from "@/components/CarCard";
import CarSkeleton from "@/components/CarSkeleton";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${API}/cars`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 border border-cyan-400/30 rounded-full bg-cyan-400/5">
            Our Fleet
          </span>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">
            Explore <span className="text-gradient">All Cars</span>
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto">
            Discover our complete collection of premium vehicles available for rent.
          </p>
        </motion.div>

        {/* Cars Grid */}
        {loading ? (
          <CarSkeleton count={9} />
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, i) => (
              <CarCard key={car._id} car={car} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-16 text-center"
          >
            <p className="text-base-content/60 text-lg font-display">
              No cars found. Try adding one!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
