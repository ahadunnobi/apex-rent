import { motion } from "framer-motion";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import CarSkeleton from "@/components/CarSkeleton";

export default function AvailableCars({ cars, loading, displayCars }) {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Available <span className="text-gradient">Cars</span>
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto">
            Browse our premium fleet and find your perfect ride.
          </p>
        </motion.div>

        {loading ? (
          <CarSkeleton count={6} />
        ) : displayCars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayCars.map((car, i) => (
                <CarCard key={car._id} car={car} index={i} ctaLabel="View Details" />
              ))}
            </div>
            {cars.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Link
                  href="/cars"
                  className="btn-neon-outline px-8 py-3 rounded-xl text-sm"
                >
                  View All Cars →
                </Link>
              </motion.div>
            )}
          </>
        ) : (
          <div className="glass-card p-16 text-center">
            <p className="text-base-content/60 text-lg font-display">
              No cars currently available. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
