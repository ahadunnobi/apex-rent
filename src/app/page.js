"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CarCard from "@/components/CarCard";
import CarSkeleton from "@/components/CarSkeleton";
import { FaRocket, FaShieldAlt, FaHeadset } from "react-icons/fa";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${API}/cars`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayCars = cars.slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* ── Hero Banner ── */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white font-bold  border border-cyan-400/30 rounded-full bg-cyan-400/70">
              ✦ Premium Car Rental Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black font-display leading-tight mb-8"
          >
            Drive The{" "}
            <span className="text-gradient">Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-base-content/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience premium mobility with our curated selection of luxury,
            sports, and family vehicles. Your journey starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/cars" className="btn-neon px-8 py-3.5 rounded-xl text-sm font-bold">
              Explore Cars
            </Link>
            <Link
              href="/add-car"
              className="btn-neon-outline px-8 py-3.5 rounded-xl text-sm"
            >
              List Your Car
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400/30 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 relative section-glow">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Why Choose <span className="text-gradient">Apex Rent</span>?
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              We redefine car rental with cutting-edge technology and unmatched service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaRocket className="text-3xl" />,
                title: "Best Price Guarantee",
                desc: "Competitive pricing with zero hidden fees. What you see is what you pay — always.",
              },
              {
                icon: <FaShieldAlt className="text-3xl" />,
                title: "Premium Insurance",
                desc: "Drive with peace of mind knowing you are fully covered by our comprehensive insurance.",
              },
              {
                icon: <FaHeadset className="text-3xl" />,
                title: "24/7 Support",
                desc: "Our dedicated team is available around the clock to assist you with any inquiries.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card p-8 text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-6 text-cyan-300 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold font-display text-base-content mb-3">
                  {item.title}
                </h3>
                <p className="text-base-content/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Available Cars ── */}
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
                  <CarCard key={car._id} car={car} index={i} />
                ))}
              </div>
              {cars.length > 6 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <Link href="/cars" className="btn-neon-outline px-8 py-3 rounded-xl text-sm">
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

      {/* ── How It Works ── */}
      <section className="py-24 relative section-glow">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 -translate-y-1/2 z-0" />

            {[
              { step: "01", title: "Choose A Car", desc: "Browse our wide selection and find the perfect vehicle for your needs." },
              { step: "02", title: "Make A Booking", desc: "Select your dates, add any requirements, and confirm your booking." },
              { step: "03", title: "Enjoy The Ride", desc: "Pick up your keys and enjoy a seamless premium driving experience." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="glass-card p-8 text-center relative z-10"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
                  <span className="text-white text-xl font-bold font-display">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-base-content mb-3">
                  {item.title}
                </h3>
                <p className="text-base-content/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
