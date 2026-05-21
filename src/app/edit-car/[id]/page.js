"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaArrowLeft, FaSave } from "react-icons/fa";

export default function EditCarPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    type: "",
    seatCapacity: "",
    fuelType: "",
    year: "",
    location: "",
    registrationNumber: "",
    features: "",
    availability: "Available",
    description: "",
  });

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${API}/cars/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          image: data.image || "",
          price: data.price || "",
          type: data.type || "",
          seatCapacity: data.seatCapacity || "",
          fuelType: data.fuelType || "",
          year: data.year || "",
          location: data.location || "",
          registrationNumber: data.registrationNumber || "",
          features: data.features || "",
          availability: data.availability || "Available",
          description: data.description || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const payload = {
        ...form,
        price: Number(form.price),
        seatCapacity: Number(form.seatCapacity),
        year: Number(form.year),
      };
      const res = await fetch(`${API}/cars/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push(`/cars/${params.id}`);
      } else {
        alert("Failed to update car.");
        setSubmitting(false);
      }
    } catch {
      alert("Error updating car.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="glass-card p-10">
            <Skeleton width="40%" height={36} borderRadius={8} baseColor="rgba(30, 30, 60, 0.8)" highlightColor="rgba(0, 240, 255, 0.08)" />
            <div className="mt-8 space-y-6">
              {[1, 2, 3, 4, 5].map((n) => (
                <Skeleton key={n} height={48} borderRadius={12} baseColor="rgba(30, 30, 60, 0.8)" highlightColor="rgba(0, 240, 255, 0.08)" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href={`/cars/${params.id}`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-300 transition-colors text-sm"
          >
            <FaArrowLeft /> Back to Car Details
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10"
        >
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 border border-cyan-400/30 rounded-full bg-cyan-400/5">
              <FaSave className="inline mr-2" /> Edit Listing
            </span>
            <h1 className="text-3xl font-black font-display">
              Update <span className="text-gradient">Car Details</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                  Car Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="input-futuristic"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  required
                  className="input-futuristic"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                  Price ($/day) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="input-futuristic"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                  Type *
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="select-futuristic"
                >
                  <option value="">Select Type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Sports">Sports</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Electric">Electric</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                  Seats *
                </label>
                <input
                  type="number"
                  name="seatCapacity"
                  value={form.seatCapacity}
                  onChange={handleChange}
                  required
                  min="1"
                  max="20"
                  className="input-futuristic"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                  Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={form.fuelType}
                  onChange={handleChange}
                  className="select-futuristic"
                >
                  <option value="">Select Fuel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  min="1990"
                  max="2030"
                  className="input-futuristic"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                  Availability
                </label>
                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  className="select-futuristic"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="input-futuristic"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  className="input-futuristic"
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                Features
              </label>
              <input
                type="text"
                name="features"
                value={form.features}
                onChange={handleChange}
                className="input-futuristic"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="textarea-futuristic"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-neon w-full py-3.5 rounded-xl text-sm font-bold disabled:opacity-50"
            >
              {submitting ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
