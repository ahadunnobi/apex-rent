"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCar } from "react-icons/fa";

export default function BookingModal({ open, car, onClose, onBook, loading }) {
  const [driverNeeded, setDriverNeeded] = useState("No");
  const [specialNote, setSpecialNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook({ driverNeeded, specialNote });
  };

  return (
    <AnimatePresence>
      {open && car && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="card bg-base-100 border border-primary/20 shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-base-content/5">
              <div className="flex items-center gap-3">
                <FaCar className="text-primary text-xl" />
                <div>
                  <h3 className="text-lg font-display font-bold">Book Vehicle</h3>
                  <p className="text-sm text-base-content/60">{car.name}</p>
                </div>
              </div>
              <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="flex items-center justify-between p-4 rounded-xl bg-base-200/50 border border-primary/10">
                <span className="text-sm text-base-content/70">Daily Rate</span>
                <span className="text-xl font-bold text-primary font-display">${car.price}/day</span>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider font-semibold text-base-content/60">
                    Driver Needed
                  </span>
                </label>
                <select
                  className="select select-bordered w-full bg-base-200/50 border-primary/20 rounded-xl"
                  value={driverNeeded}
                  onChange={(e) => setDriverNeeded(e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs uppercase tracking-wider font-semibold text-base-content/60">
                    Special Note
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full bg-base-200/50 border-primary/20 rounded-xl"
                  rows={3}
                  placeholder="Any special requests for your trip..."
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full rounded-xl font-bold uppercase tracking-wider"
              >
                {loading ? <span className="loading loading-spinner" /> : "Book Now"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
