"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { apiFetch } from "@/lib/api";

export default function EditCarPage() {
  return (
    <PrivateRoute>
      <EditCarForm />
    </PrivateRoute>
  );
}

function EditCarForm() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    price: "",
    description: "",
    availability: "Available",
    image: "",
    type: "",
    location: "",
  });

  useEffect(() => {
    fetch(`/api/proxy/cars/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        const owner = data.ownerEmail || data.addedBy;
        if (user && owner && owner !== user.email) {
          setForbidden(true);
          setLoading(false);
          return;
        }
        setForm({
          price: data.daily_rent_price ?? data.price ?? "",
          description: data.description ?? "",
          availability: data.availability_status === false ? "Unavailable" : (data.availability ?? "Available"),
          image: data.image_url ?? data.image ?? "",
          type: data.car_type ?? data.type ?? "",
          location: data.pickup_location || data.pickupLocation || data.location || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiFetch(`/cars/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          daily_rent_price: Number(form.price),
          availability_status: form.availability === "Available",
          car_type: form.type,
          image_url: form.image,
          pickup_location: form.location,
          description: form.description,
          availability: form.availability,
          image: form.image,
          type: form.type,
          location: form.location,
          pickupLocation: form.location,
        }),
      });
      toast.success("Car updated successfully!");
      router.push(`/cars/${params.id}`);
    } catch (err) {
      toast.error(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 max-w-3xl mx-auto px-4">
        <Skeleton height={400} borderRadius={16} />
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="min-h-screen py-24 max-w-3xl mx-auto px-4 text-center">
        <p className="text-error font-display text-xl mb-4">You can only edit your own listings.</p>
        <Link href="/my-cars" className="btn btn-primary rounded-xl">Back to My Cars</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 max-w-3xl mx-auto px-4">
      <Link href={`/cars/${params.id}`} className="inline-flex items-center gap-2 text-base-content/60 hover:text-primary text-sm mb-8">
        <FaArrowLeft /> Back to Details
      </Link>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 md:p-10">
        <div className="text-center mb-10">
          <FaSave className="inline text-primary mr-2" />
          <h1 className="text-3xl font-black font-display">
            Update <span className="text-gradient">Car</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label text-xs uppercase font-semibold text-base-content/60">Daily Price ($)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} required min="1" className="input input-bordered rounded-xl bg-base-200/50 border-primary/20" />
          </div>
          <div className="form-control">
            <label className="label text-xs uppercase font-semibold text-base-content/60">Type</label>
            <select name="type" value={form.type} onChange={handleChange} required className="select select-bordered rounded-xl bg-base-200/50 border-primary/20">
              {["Sedan", "SUV", "Hatchback", "Luxury", "Sports", "Electric", "Truck", "Van"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label text-xs uppercase font-semibold text-base-content/60">Image URL</label>
            <input type="url" name="image" value={form.image} onChange={handleChange} required className="input input-bordered rounded-xl bg-base-200/50 border-primary/20" />
          </div>
          <div className="form-control">
            <label className="label text-xs uppercase font-semibold text-base-content/60">Pickup Location</label>
            <input name="location" value={form.location} onChange={handleChange} required className="input input-bordered rounded-xl bg-base-200/50 border-primary/20" />
          </div>
          <div className="form-control">
            <label className="label text-xs uppercase font-semibold text-base-content/60">Availability</label>
            <select name="availability" value={form.availability} onChange={handleChange} className="select select-bordered rounded-xl bg-base-200/50 border-primary/20">
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label text-xs uppercase font-semibold text-base-content/60">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className="textarea textarea-bordered rounded-xl bg-base-200/50 border-primary/20" />
          </div>
          <button type="submit" disabled={submitting} className="btn-neon w-full py-3.5 rounded-xl font-bold">
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
