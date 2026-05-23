"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import PrivateRoute from "@/components/PrivateRoute";
import { useToast } from "@/context/ToastContext";
import { apiFetch } from "@/lib/api";

export default function AddCarPage() {
  return (
    <PrivateRoute>
      <AddCarForm />
    </PrivateRoute>
  );
}

function AddCarForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    seatCapacity: "",
    pickupLocation: "",
    description: "",
    availability: "Available",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiFetch("/cars", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          daily_rent_price: Number(form.price),
          seatCapacity: Number(form.seatCapacity),
          seat_capacity: Number(form.seatCapacity),
          location: form.pickupLocation,
          pickup_location: form.pickupLocation,
          availability_status: form.availability === "Available",
          car_type: form.type,
          image_url: form.image,
          car_name: form.name
        }),
      });
      toast.success("Car listed successfully!");
      router.push("/my-cars");
    } catch (err) {
      toast.error(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
        <Link href="/my-cars" className="inline-flex items-center gap-2 text-base-content/60 hover:text-primary text-sm font-semibold">
          <FaArrowLeft /> Back to My Cars
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="card bg-base-100/60 border border-primary/20 shadow-2xl p-6 md:p-10">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary mb-2 block">
            <FaPlus className="inline mr-2" /> Add Car
          </span>
          <h1 className="text-3xl md:text-4xl font-black font-display">
            List a <span className="text-gradient">New Vehicle</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label text-xs uppercase font-semibold text-base-content/60">Car Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required className="input input-bordered rounded-xl bg-base-200/50 border-primary/20" placeholder="Tesla Model S" />
            </div>
            <div className="form-control">
              <label className="label text-xs uppercase font-semibold text-base-content/60">Daily Rent Price ($) *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} required min="1" className="input input-bordered rounded-xl bg-base-200/50 border-primary/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-control">
              <label className="label text-xs uppercase font-semibold text-base-content/60">Car Type *</label>
              <select name="type" value={form.type} onChange={handleChange} required className="select select-bordered rounded-xl bg-base-200/50 border-primary/20">
                <option value="">Select</option>
                {["Sedan", "SUV", "Hatchback", "Luxury", "Sports", "Electric", "Truck", "Van"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label text-xs uppercase font-semibold text-base-content/60">Seat Capacity *</label>
              <input type="number" name="seatCapacity" value={form.seatCapacity} onChange={handleChange} required min="1" className="input input-bordered rounded-xl bg-base-200/50 border-primary/20" />
            </div>
            <div className="form-control">
              <label className="label text-xs uppercase font-semibold text-base-content/60">Availability *</label>
              <select name="availability" value={form.availability} onChange={handleChange} className="select select-bordered rounded-xl bg-base-200/50 border-primary/20">
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label text-xs uppercase font-semibold text-base-content/60">Image URL *</label>
            <input type="url" name="image" value={form.image} onChange={handleChange} required className="input input-bordered rounded-xl bg-base-200/50 border-primary/20" placeholder="https://i.ibb.co/..." />
          </div>

          <div className="form-control">
            <label className="label text-xs uppercase font-semibold text-base-content/60">Pickup Location *</label>
            <input name="pickupLocation" value={form.pickupLocation} onChange={handleChange} required className="input input-bordered rounded-xl bg-base-200/50 border-primary/20" placeholder="New York, NY" />
          </div>

          <div className="form-control">
            <label className="label text-xs uppercase font-semibold text-base-content/60">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className="textarea textarea-bordered rounded-xl bg-base-200/50 border-primary/20" />
          </div>

          <button type="submit" disabled={submitting} className="btn btn-primary w-full rounded-xl font-bold uppercase tracking-wider">
            {submitting ? <span className="loading loading-spinner" /> : "Add Car"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
