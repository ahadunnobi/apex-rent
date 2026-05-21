"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaGasPump, FaUsers, FaCog, FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { MdSpeed } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";


export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, addBooking } = useAuth();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) return;
    setBookingLoading(true);
    setTimeout(() => {
      addBooking(car, startDate, endDate);
      setBookingLoading(false);
      alert("Booking successfully confirmed! Visit 'My Bookings' to manage your trips.");
      router.push("/my-bookings");
    }, 800);
  };


  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${API}/cars/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    setDeleting(true);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API}/cars/${params.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/cars");
      } else {
        alert("Failed to delete car.");
        setDeleting(false);
      }
    } catch {
      alert("Error deleting car.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card overflow-hidden">
            <Skeleton
              height={400}
              borderRadius={0}
              baseColor="rgba(30, 30, 60, 0.8)"
              highlightColor="rgba(0, 240, 255, 0.08)"
            />
            <div className="p-8">
              <Skeleton width="60%" height={36} borderRadius={8} baseColor="rgba(30, 30, 60, 0.8)" highlightColor="rgba(0, 240, 255, 0.08)" />
              <div className="mt-6 flex gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <Skeleton key={n} width={100} height={60} borderRadius={12} baseColor="rgba(30, 30, 60, 0.8)" highlightColor="rgba(0, 240, 255, 0.08)" />
                ))}
              </div>
              <div className="mt-6">
                <Skeleton count={4} height={16} borderRadius={8} baseColor="rgba(30, 30, 60, 0.8)" highlightColor="rgba(0, 240, 255, 0.08)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <div className="glass-card p-16 text-center">
          <h2 className="text-2xl font-display text-white mb-4">Car Not Found</h2>
          <p className="text-gray-500 mb-6">The car you are looking for does not exist.</p>
          <Link href="/cars" className="btn-neon px-6 py-3 rounded-xl text-sm">
            Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-300 transition-colors text-sm"
          >
            <FaArrowLeft /> Back to All Cars
          </Link>
        </motion.div>

        {/* Car Detail Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-[400px] w-full overflow-hidden">
            <img
              src={car.image || "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=1200"}
              alt={car.name}
              className="object-cover w-full h-full"
            />
            {/* Price badge */}
            <div className="absolute top-6 right-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 py-2 rounded-xl text-lg font-bold shadow-lg">
              ${car.price}/day
            </div>
            {/* Availability badge */}
            <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
              ${car.availability === "Available"
                ? "bg-green-500/20 text-green-300 border border-green-400/30"
                : "bg-red-500/20 text-red-300 border border-red-400/30"
              }`}>
              {car.availability || "Available"}
            </div>
            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-black font-display text-white mb-6">
              {car.name}
            </h1>

            {/* Specs grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <FaCog className="text-xl" />, label: "Type", value: car.type || "N/A" },
                { icon: <FaUsers className="text-xl" />, label: "Seats", value: car.seatCapacity || "N/A" },
                { icon: <FaGasPump className="text-xl" />, label: "Fuel", value: car.fuelType || "N/A" },
                { icon: <MdSpeed className="text-xl" />, label: "Year", value: car.year || "N/A" },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="glass-card !bg-white/[0.03] p-4 text-center"
                >
                  <div className="text-cyan-400 mb-2 flex justify-center">
                    {spec.icon}
                  </div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className="text-white font-semibold text-sm">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Additional details */}
            {(car.location || car.features || car.registrationNumber || car.datePosted) && (
              <div className="glass-card !bg-white/[0.03] p-6 mb-8">
                <h3 className="text-sm font-display text-cyan-300 uppercase tracking-widest mb-4">
                  Additional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {car.location && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <FaMapMarkerAlt className="text-cyan-400" />
                      <span>Location: <span className="text-white">{car.location}</span></span>
                    </div>
                  )}
                  {car.registrationNumber && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <span>Reg #: <span className="text-white">{car.registrationNumber}</span></span>
                    </div>
                  )}
                  {car.datePosted && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <FaCalendarAlt className="text-cyan-400" />
                      <span>Posted: <span className="text-white">{new Date(car.datePosted).toLocaleDateString()}</span></span>
                    </div>
                  )}
                  {car.features && (
                    <div className="flex items-center gap-2 text-gray-400 col-span-full">
                      <span>Features: <span className="text-white">{car.features}</span></span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-sm font-display text-cyan-300 uppercase tracking-widest mb-4">
                Description
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {car.description || "No description available for this vehicle."}
              </p>
            </div>

            {/* Booking Form (Conditional) */}
            {car.availability !== "Unavailable" && (
              <div className="card bg-base-200/40 border border-primary/20 p-6 mb-8 shadow-xl">
                <h3 className="text-sm font-display text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" /> Book This Vehicle
                </h3>
                {user ? (
                  <form onSubmit={handleBook} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">Start Date</span>
                      </label>
                      <input
                        type="date"
                        className="input input-bordered w-full bg-base-300/50 border-primary/20 focus:border-primary rounded-xl text-sm"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-xs uppercase tracking-wider text-base-content/60 font-semibold">End Date</span>
                      </label>
                      <input
                        type="date"
                        className="input input-bordered w-full bg-base-300/50 border-primary/20 focus:border-primary rounded-xl text-sm"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        min={startDate || new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="btn btn-primary w-full rounded-xl font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all text-sm"
                    >
                      {bookingLoading ? <span className="loading loading-spinner"></span> : "Confirm Booking"}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-400 mb-4 text-sm">Please log in to book this premium vehicle.</p>
                    <Link href="/login" className="btn btn-primary btn-sm rounded-lg font-bold uppercase tracking-wider px-6">
                      Log In Now
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
              <Link
                href={`/edit-car/${car._id}`}
                className="btn-neon-outline flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm flex-1"
              >
                <FaEdit /> Edit Car
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm flex-1 bg-red-500/10 text-red-400 border border-red-400/30 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(255,50,50,0.2)] transition-all disabled:opacity-50"
              >
                <FaTrash /> {deleting ? "Deleting..." : "Delete Car"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
