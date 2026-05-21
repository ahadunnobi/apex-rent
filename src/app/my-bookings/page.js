"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { FaCalendarAlt, FaTrash, FaCar } from "react-icons/fa";

export default function MyBookingsPage() {
  const { user, bookings, cancelBooking, mounted } = useAuth();

  if (!mounted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="card max-w-md bg-base-100 border border-primary/20 p-8 text-center shadow-xl">
          <div className="card-body p-0">
            <h2 className="text-2xl font-display font-black text-error mb-4">Authentication Required</h2>
            <p className="text-base-content/60 mb-6">You must be logged in to view your bookings portal.</p>
            <Link href="/login" className="btn btn-primary rounded-xl uppercase font-bold tracking-wider">
              Log In Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary mb-2 block">
          Client Dashboard
        </span>
        <h1 className="text-3xl md:text-5xl font-black font-display text-base-content">
          My <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">Bookings</span>
        </h1>
      </div>

      <AnimatePresence mode="popLayout">
        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card bg-base-200/30 border border-base-content/10 p-12 text-center shadow-md"
          >
            <div className="card-body p-0 items-center">
              <FaCar className="text-6xl text-primary/40 mb-4 animate-bounce" />
              <h2 className="text-xl font-display font-bold text-base-content mb-2">No Active Bookings</h2>
              <p className="text-base-content/60 max-w-md mb-8 text-sm">
                You haven't reserved any vehicles yet. Explore our high-tech fleet and book your premium experience today!
              </p>
              <Link href="/cars" className="btn btn-primary rounded-xl uppercase tracking-wider font-bold">
                Explore Cars
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card card-side bg-base-100/50 backdrop-blur-md border border-primary/10 hover:border-primary/30 shadow-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300"
              >
                {/* Car Image */}
                <figure className="relative w-full md:w-80 h-48 md:h-auto overflow-hidden flex-shrink-0">
                  <img
                    src={booking.car.image || "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600"}
                    alt={booking.car.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {booking.status}
                  </div>
                </figure>

                {/* Booking Details */}
                <div className="card-body p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h2 className="card-title text-xl font-display font-extrabold text-base-content tracking-wide">
                        {booking.car.name}
                      </h2>
                      <span className="text-lg font-black text-primary font-display">
                        ${booking.car.price}/day
                      </span>
                    </div>

                    <p className="text-xs text-base-content/50 uppercase tracking-widest mb-4">
                      Reg: {booking.car.registrationNumber || "APX-RENT"} | Location: {booking.car.location || "Default"}
                    </p>

                    {/* Booking Dates Grid */}
                    <div className="grid grid-cols-2 gap-4 py-3 px-4 bg-base-200/50 border border-base-content/5 rounded-xl text-sm mb-4">
                      <div>
                        <span className="text-xs text-base-content/40 uppercase tracking-wider block mb-0.5">Start Trip</span>
                        <span className="font-semibold text-base-content flex items-center gap-1.5">
                          <FaCalendarAlt className="text-primary text-xs" /> {booking.startDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-base-content/40 uppercase tracking-wider block mb-0.5">End Trip</span>
                        <span className="font-semibold text-base-content flex items-center gap-1.5">
                          <FaCalendarAlt className="text-primary text-xs" /> {booking.endDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions flex flex-wrap justify-between items-center gap-4 mt-4 pt-4 border-t border-base-content/5">
                    <span className="text-xs text-base-content/50">
                      Reserved on: {new Date(booking.bookingDate).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to cancel your booking for the ${booking.car.name}?`)) {
                          cancelBooking(booking.id);
                        }
                      }}
                      className="btn btn-error btn-sm btn-outline rounded-lg flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(255,50,50,0.25)] transition-all"
                    >
                      <FaTrash className="text-xs" /> Cancel Trip
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
