"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({ open, title, message, onConfirm, onCancel, loading }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="card bg-base-100 border border-primary/20 shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-display font-bold text-base-content mb-2">{title}</h3>
            <p className="text-base-content/70 text-sm mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={onCancel} className="btn btn-ghost rounded-lg" disabled={loading}>
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="btn btn-error rounded-lg"
              >
                {loading ? <span className="loading loading-spinner loading-sm" /> : "Confirm"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
