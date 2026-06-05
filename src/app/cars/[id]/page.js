"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FaUsers, FaCog, FaMapMarkerAlt, FaArrowLeft, FaEdit, FaTrash, FaExclamationTriangle,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { apiFetch } from "@/lib/api";
import { fetchCarById } from "@/lib/fetchCars";
import BookingModal from "@/components/BookingModal";
import ConfirmModal from "@/components/ConfirmModal";
import {
  getCarName,
  getCarPrice,
  getCarImage,
  getCarType,
  getPickupLocation,
  isCarAvailable,
} from "@/lib/car-utils";

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchCar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCarById(params.id);
      setCar(data);
    } catch (err) {
      setError(err.message || "Failed to load car");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) fetchCar();
  }, [params.id, fetchCar]);

  const isOwner = user && car && (car.ownerEmail === user.email || car.addedBy === user.email);

  const handleBook = async ({ driverNeeded, specialNote }) => {
    setBookingLoading(true);
    try {
      await apiFetch("/bookings", {
        method: "POST",
        body: JSON.stringify({
          carId: params.id,
          driverNeeded,
          specialNote,
        }),
      });
      toast.success("Booking confirmed! View it in My Bookings.");
      setBookingOpen(false);
      router.push("/my-bookings");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiFetch(`/cars/${params.id}`, { method: "DELETE" });
      toast.success("Car deleted successfully.");
      router.push("/my-cars");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card overflow-hidden">
            <Skeleton height={400} borderRadius={0} baseColor="rgba(30,30,60,0.8)" highlightColor="rgba(0,240,255,0.08)" />
            <div className="p-8">
              <Skeleton width="60%" height={36} />
              <Skeleton count={3} className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <div className="glass-card p-16 text-center max-w-md">
          <FaExclamationTriangle className="text-4xl text-warning mx-auto mb-4" />
          <h2 className="text-2xl font-display mb-4">Car Not Found</h2>
          <p className="text-base-content/60 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={fetchCar} className="btn-neon px-6 py-3 rounded-xl text-sm">Try Again</button>
            <Link href="/cars" className="btn-neon-outline px-6 py-3 rounded-xl text-sm">Back to Cars</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/cars" className="inline-flex items-center gap-2 text-base-content/60 hover:text-primary text-sm">
            <FaArrowLeft /> Back to All Cars
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side: Car Image */}
          <div className="relative h-[400px] lg:h-auto lg:w-1/2 w-full shrink-0 overflow-hidden">
            <img
              src={car.image_url || car.image || "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=1200"}
              alt={car.car_name || car.name}
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="absolute top-6 right-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 py-2 rounded-xl text-lg font-bold shadow-lg shadow-cyan-500/20">
              ${car.daily_rent_price || car.price}/day
            </div>
            <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase shadow-lg
              ${isCarAvailable(car) ? "bg-green-500/90 text-white border border-green-400" : "bg-red-500/90 text-white border border-red-400"}`}>
              {isCarAvailable(car) ? "Available" : "Unavailable"}
            </div>
          </div>

          {/* Right Side: Details & Actions */}
          <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-black font-display mb-2">{getCarName(car)}</h1>
            <p className="text-sm text-primary mb-6">
              Booked by {car.booking_count || 0} person{(car.booking_count || 0) === 1 ? "" : "s"}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <FaCog />, label: "Type", value: car.car_type || car.type },
                { icon: <FaUsers />, label: "Seats", value: car.seat_capacity || car.seatCapacity },
                { icon: <FaMapMarkerAlt />, label: "Pickup", value: car.pickup_location || car.location },
                { icon: <FaCog />, label: "Fuel", value: car.fuelType || "N/A" },
              ].map((spec, i) => (
                <div key={i} className="glass-card !bg-white/[0.03] p-4 text-center">
                  <div className="text-primary mb-2 flex justify-center">{spec.icon}</div>
                  <p className="text-xs text-base-content/60 uppercase mb-1">{spec.label}</p>
                  <p className="font-semibold text-sm">{spec.value || "N/A"}</p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-display text-primary uppercase tracking-widest mb-3">Description</h3>
              <p className="text-base-content/70 leading-relaxed">{car.description || "No description available."}</p>
            </div>

            {isCarAvailable(car) && (
              <div className="mb-8">
                {user ? (
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="btn btn-primary w-full md:w-auto px-10 rounded-xl font-bold uppercase tracking-wider"
                  >
                    Book Now
                  </button>
                ) : (
                  <div className="text-center p-6 border border-primary/20 rounded-xl bg-base-200/30">
                    <p className="text-base-content/60 mb-4 text-sm">Please log in to book this vehicle.</p>
                    <Link
                      href={`/login?redirect=${encodeURIComponent(`/cars/${params.id}`)}`}
                      className="btn btn-primary btn-sm rounded-lg font-bold"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            )}

            {isOwner && (
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-base-content/5">
                <Link href={`/edit-car/${car._id}`} className="btn-neon-outline flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm">
                  <FaEdit /> Update
                </Link>
                <button
                  onClick={() => setDeleteOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm bg-red-500/10 text-red-400 border border-red-400/30"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <BookingModal
        open={bookingOpen}
        car={car}
        onClose={() => setBookingOpen(false)}
        onBook={handleBook}
        loading={bookingLoading}
      />

      <ConfirmModal
        open={deleteOpen}
        title="Delete Car"
        message={`Are you sure you want to delete "${getCarName(car)}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
        loading={deleting}
      />
    </div>
  );
}
