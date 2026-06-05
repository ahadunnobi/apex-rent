import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Flex Content: Image Left, Details Right */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 py-16">
        {/* Left — Car Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="relative rounded-2xl overflow-hidden border border-cyan-400/20 shadow-[0_0_60px_rgba(0,240,255,0.1)]">
            <img
              src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80"
              alt="Premium sports car"
              className="w-full h-[320px] md:h-[420px] object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-base-100/40 via-transparent to-transparent" />
            {/* Floating badge */}
            <div className="absolute bottom-5 left-5 bg-base-100/80 backdrop-blur-md border border-cyan-400/20 rounded-xl px-4 py-2.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm font-display">
                ★
              </div>
              <div>
                <p className="text-xs text-base-content/60 uppercase tracking-wider">
                  Trusted by
                </p>
                <p className="text-sm font-bold font-display text-base-content">
                  10,000+ Drivers
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — Details */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white border border-cyan-400/30 rounded-full bg-cyan-400/70">
              ✦ Premium Car Rental Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black font-display leading-tight mb-6"
          >
            Drive The <span className="text-gradient">Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-base-content/70 mb-8 max-w-xl leading-relaxed"
          >
            Experience premium mobility with our curated selection of luxury,
            sports, and family vehicles. Your journey starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
          >
            <Link
              href="/cars"
              className="btn-neon px-8 py-3.5 rounded-xl text-sm font-bold"
            >
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
  );
}
