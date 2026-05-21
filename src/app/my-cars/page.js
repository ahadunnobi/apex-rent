"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { FaEdit, FaTrash, FaCar, FaPlus, FaMapMarkerAlt, FaLock } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MyCarsPage() {
  const { user, mounted } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchUserCars = () => {
    if (!user) return;
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${API}/cars`)
      .then((res) => res.json())
      .then((data) => {
        // Filter cars that were added by the current user's email
        const userListings = data.filter((car) => car.addedBy === user.email);
        setCars(userListings);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (mounted && user) {
      fetchUserCars();
    }
  }, [mounted, user]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to remove the ${name} from your listings?`)) return;
    setDeletingId(id);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API}/cars/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Listing removed successfully!");
        setCars(cars.filter((car) => car._id !== id));
      } else {
        alert("Failed to delete the listing.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting listing.");
    } finally {
      setDeletingId(null);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Auth gate
  if (!user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4">
        <div className="card max-w-md bg-base-100 border border-primary/20 p-8 text-center shadow-xl">
          <div className="card-body p-0 items-center">
            <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mb-4 border border-error/20">
              <FaLock className="text-2xl" />
            </div>
            <h2 className="text-2xl font-display font-black text-error mb-2">Authentication Required</h2>
            <p className="text-base-content/60 mb-6 text-sm">
              You must be logged in to access your listed vehicle assets.
            </p>
            <Link href="/login" className="btn btn-primary w-full rounded-xl uppercase font-bold tracking-wider hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
              Log In Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div className="text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary mb-2 block">
            Partner Dashboard
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-display text-base-content">
            My Added <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">Cars</span>
          </h1>
        </div>

        <Link
          href="/add-car"
          className="btn btn-primary rounded-xl font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,240,255,0.35)] transition-all flex items-center gap-2"
        >
          <FaPlus /> Add New Car
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="card bg-base-100 border border-base-content/5 p-4 rounded-2xl">
              <Skeleton height={200} borderRadius={16} />
              <div className="mt-4">
                <Skeleton width="60%" height={24} />
                <Skeleton width="40%" height={16} className="mt-2" />
                <Skeleton height={36} className="mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {cars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card bg-base-200/30 border border-base-content/10 p-12 text-center shadow-md"
            >
              <div className="card-body p-0 items-center">
                <FaCar className="text-6xl text-primary/40 mb-4 animate-pulse" />
                <h2 className="text-xl font-display font-bold text-base-content mb-2">No Listed Vehicles</h2>
                <p className="text-base-content/60 max-w-md mb-8 text-sm">
                  You haven't listed any vehicles for rent on our platform yet. Add your car to our catalog and start earning!
                </p>
                <Link href="/add-car" className="btn btn-primary rounded-xl uppercase tracking-wider font-bold">
                  List Your Car
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="card bg-base-100/50 backdrop-blur-md border border-primary/10 hover:border-primary/30 shadow-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group"
                >
                  <figure className="relative h-48 w-full overflow-hidden">
                    <img
                      src={car.image || "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600"}
                      alt={car.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-primary-content px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      ${car.price}/day
                    </div>
                  </figure>

                  <div className="card-body p-5 justify-between">
                    <div>
                      <h2 className="card-title text-lg font-display font-black text-base-content mb-1 tracking-wide">
                        {car.name}
                      </h2>
                      <p className="text-xs text-base-content/60 flex items-center gap-1 mb-4">
                        <FaMapMarkerAlt className="text-primary text-xs" /> {car.location || "Default Location"}
                      </p>
                    </div>

                    <div className="card-actions flex justify-between items-center gap-2 pt-4 border-t border-base-content/5 mt-4">
                      <Link
                        href={`/edit-car/${car._id}`}
                        className="btn btn-outline btn-sm btn-primary flex-1 rounded-lg flex items-center gap-1.5"
                      >
                        <FaEdit className="text-xs" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(car._id, car.name)}
                        disabled={deletingId === car._id}
                        className="btn btn-outline btn-sm btn-error flex-1 rounded-lg flex items-center gap-1.5"
                      >
                        {deletingId === car._id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <>
                            <FaTrash className="text-xs" /> Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
