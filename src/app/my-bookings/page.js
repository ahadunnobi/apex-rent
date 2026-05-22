"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaCar, FaTrash } from "react-icons/fa";
import PrivateRoute from "@/components/PrivateRoute";
import ConfirmModal from "@/components/ConfirmModal";
import { useToast } from "@/context/ToastContext";
import { apiFetch } from "@/lib/api";

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}

function MyBookingsContent() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const fetchBookings = () => {
    setLoading(true);
    apiFetch("/bookings/my")
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async () => {
    if (!cancelId) return;
    setCancelling(true);
    try {
      await apiFetch(`/bookings/${cancelId}`, { method: "DELETE" });
      setBookings((prev) => prev.filter((b) => b._id !== cancelId));
      toast.success("Booking cancelled.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCancelling(false);
      setCancelId(null);
    }
  };

  return (
    <div className="min-h-[80vh] py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary mb-2 block">Client Dashboard</span>
        <h1 className="text-3xl md:text-5xl font-black font-display">
          My <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">Bookings</span>
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {bookings.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center">
              <FaCar className="text-6xl text-primary/40 mx-auto mb-4" />
              <h2 className="text-xl font-display font-bold mb-2">No Active Bookings</h2>
              <p className="text-base-content/60 mb-8 text-sm">Explore our fleet and book your next ride.</p>
              <Link href="/cars" className="btn btn-primary rounded-xl font-bold">Explore Cars</Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card bg-base-100/50 border border-primary/10 shadow-xl overflow-hidden flex flex-col md:flex-row"
                >
                  <figure className="relative w-full md:w-72 h-48 md:h-auto shrink-0">
                    <img
                      src={booking.carImage || "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600"}
                      alt={booking.carName}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-bold">
                      {booking.status}
                    </div>
                  </figure>

                  <div className="card-body p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h2 className="text-xl font-display font-extrabold">{booking.carName}</h2>
                        <span className="text-lg font-black text-primary font-display">
                          ${booking.totalPrice}
                        </span>
                      </div>
                      <p className="text-xs text-base-content/50 mb-2">
                        Driver: {booking.driverNeeded} | Type: {booking.carType || "N/A"}
                      </p>
                      {booking.specialNote && (
                        <p className="text-sm text-base-content/60 mb-3">Note: {booking.specialNote}</p>
                      )}
                      <p className="text-sm text-base-content/70">
                        Booking Date:{" "}
                        <a
                          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-semibold"
                        >
                          {new Date(booking.bookingDate).toLocaleString()}
                        </a>
                      </p>
                      <p className="text-xs text-base-content/50 mt-1">
                        Location: {booking.location || "N/A"} | Daily: ${booking.dailyPrice}/day
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-base-content/5 flex justify-end">
                      <button
                        onClick={() => setCancelId(booking._id)}
                        className="btn btn-error btn-sm btn-outline rounded-lg gap-1.5"
                      >
                        <FaTrash className="text-xs" /> Cancel Booking
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      )}

      <ConfirmModal
        open={!!cancelId}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking?"
        onConfirm={handleCancel}
        onCancel={() => setCancelId(null)}
        loading={cancelling}
      />
    </div>
  );
}
