"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaPlus, FaLock } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function AddCarPage() {
  const router = useRouter();
  const { user, mounted } = useAuth();
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to add a vehicle.");
      return;
    }

    setSubmitting(true);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const payload = {
        ...form,
        price: Number(form.price),
        seatCapacity: Number(form.seatCapacity),
        year: Number(form.year),
        datePosted: new Date().toISOString(),
        addedBy: user.email, // Link this car to the logged-in user
      };

      const res = await fetch(`${API}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Car successfully listed on Apex Rent!");
        router.push("/cars");
      } else {
        alert("Failed to add car. Please try again.");
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Error listing car:", error);
      alert("Error adding car.");
      setSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Route protection
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
              You must be logged in as an authorized provider to list vehicles on the Apex platform.
            </p>
            <Link href="/login" className="btn btn-primary w-full rounded-xl uppercase font-bold tracking-wider hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
              Log In Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 text-center md:text-left"
      >
        <Link
          href="/cars"
          className="inline-flex items-center gap-2 text-base-content/60 hover:text-primary transition-colors text-sm font-semibold"
        >
          <FaArrowLeft /> Back to Explore
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card bg-base-100/60 backdrop-blur-md border border-primary/20 shadow-2xl p-6 md:p-10"
      >
        <div className="card-body p-0">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary mb-2 block">
              <FaPlus className="inline mr-2 text-xs" /> Platform Listing
            </span>
            <h1 className="text-3xl md:text-4xl font-black font-display text-base-content">
              Add <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">New Car</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Car Name *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Tesla Model S"
                  className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                />
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Image URL *</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/car.jpg"
                  className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Price ($/day) *</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="99"
                  className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                />
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Type *</span>
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="select select-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
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
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Seats *</span>
                </label>
                <input
                  type="number"
                  name="seatCapacity"
                  value={form.seatCapacity}
                  onChange={handleChange}
                  required
                  min="1"
                  max="20"
                  placeholder="5"
                  className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Fuel Type</span>
                </label>
                <select
                  name="fuelType"
                  value={form.fuelType}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                >
                  <option value="">Select Fuel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Year</span>
                </label>
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  min="1990"
                  max="2030"
                  placeholder="2024"
                  className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                />
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Availability</span>
                </label>
                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. New York, NY"
                  className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                />
              </div>
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Registration Number</span>
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  placeholder="e.g. ABC-1234"
                  className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
                />
              </div>
            </div>

            {/* Features */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Features</span>
              </label>
              <input
                type="text"
                name="features"
                value={form.features}
                onChange={handleChange}
                placeholder="e.g. GPS, Bluetooth, Sunroof"
                className="input input-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Description *</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe the vehicle characteristics..."
                className="textarea textarea-bordered w-full bg-base-200/50 border-primary/20 focus:border-primary focus:outline-none rounded-xl"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full rounded-xl font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all mt-4"
            >
              {submitting ? <span className="loading loading-spinner"></span> : "List Vehicle on Platform"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
