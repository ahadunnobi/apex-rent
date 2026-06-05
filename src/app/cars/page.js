"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import CarCard from "@/components/CarCard";
import CarSkeleton from "@/components/CarSkeleton";
import { fetchCars as fetchCarsApi } from "@/lib/fetchCars";


const CAR_TYPES = ["", "Sedan", "SUV", "Sports", "Luxury", "Electric", "Hatchback", "Truck", "Van"];

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const loadCars = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (typeFilter) params.set("type", typeFilter);
    const query = params.toString();

    fetchCarsApi(query)
      .then(setCars)
      .catch((err) => {
        console.error(err.message);
        setCars([]);
      })
      .finally(() => setLoading(false));
  }, [search, typeFilter]);

  useEffect(() => {
    const timer = setTimeout(loadCars, 300);
    return () => clearTimeout(timer);
  }, [loadCars]);

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 border border-cyan-400/30 rounded-full bg-cyan-400/5">
            Our Fleet
          </span>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">
            Explore <span className="text-gradient">All Cars</span>
          </h1>
          <p className="text-base-content/60 max-w-xl mx-auto">
            Search and filter our complete collection — including unavailable vehicles.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
            <input
              type="text"
              placeholder="Search by car name..."
              className="input input-bordered w-full pl-11 bg-base-200/50 border-primary/20 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="select select-bordered md:w-56 bg-base-200/50 border-primary/20 rounded-xl"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {CAR_TYPES.filter(Boolean).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <CarSkeleton count={9} />
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, i) => (
              <CarCard key={car._id} car={car} index={i} />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-16 text-center">
            <p className="text-base-content/60 text-lg font-display">No cars match your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
