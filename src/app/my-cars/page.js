"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaCar, FaPlus, FaMapMarkerAlt } from "react-icons/fa";
import PrivateRoute from "@/components/PrivateRoute";
import ConfirmModal from "@/components/ConfirmModal";
import { useToast } from "@/context/ToastContext";
import { apiFetch } from "@/lib/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MyCarsPage() {
  return (
    <PrivateRoute>
      <MyCarsContent />
    </PrivateRoute>
  );
}

function MyCarsContent() {
  const { toast } = useToast();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCars = () => {
    setLoading(true);
    apiFetch("/cars/my")
      .then((data) => setCars(Array.isArray(data) ? data : []))
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiFetch(`/cars/${deleteTarget.id}`, { method: "DELETE" });
      setCars((prev) => prev.filter((c) => c._id !== deleteTarget.id));
      toast.success("Listing removed.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-[80vh] py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div className="text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary mb-2 block">Partner Dashboard</span>
          <h1 className="text-3xl md:text-5xl font-black font-display">
            My Added <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">Cars</span>
          </h1>
        </div>
        <Link href="/add-car" className="btn btn-primary rounded-xl font-bold gap-2">
          <FaPlus /> Add New Car
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} height={320} borderRadius={16} />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {cars.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center">
              <FaCar className="text-6xl text-primary/40 mx-auto mb-4" />
              <h2 className="text-xl font-display font-bold mb-2">No Listed Vehicles</h2>
              <p className="text-base-content/60 mb-8 text-sm">Add your first car to start earning on Apex Rent.</p>
              <Link href="/add-car" className="btn btn-primary rounded-xl font-bold">List Your Car</Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card bg-base-100/50 border border-primary/10 shadow-xl overflow-hidden"
                >
                  <figure className="relative h-48 overflow-hidden">
                    <img src={car.image} alt={car.name} className="object-cover w-full h-full" />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-primary-content px-3 py-1 rounded-full text-xs font-bold">
                      ${car.price}/day
                    </div>
                  </figure>
                  <div className="card-body p-5">
                    <h2 className="font-display font-black text-lg">{car.name}</h2>
                    <p className="text-xs text-base-content/60 flex items-center gap-1 mb-4">
                      <FaMapMarkerAlt className="text-primary" />
                      {car.pickupLocation || car.location || "N/A"}
                    </p>
                    <div className="flex gap-2">
                      <Link href={`/edit-car/${car._id}`} className="btn btn-outline btn-sm btn-primary flex-1 gap-1">
                        <FaEdit className="text-xs" /> Update
                      </Link>
                      <button
                        onClick={() => setDeleteTarget({ id: car._id, name: car.name })}
                        className="btn btn-outline btn-sm btn-error flex-1 gap-1"
                      >
                        <FaTrash className="text-xs" /> Delete
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
        open={!!deleteTarget}
        title="Delete Car"
        message={deleteTarget ? `Remove "${deleteTarget.name}" from your listings?` : ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
