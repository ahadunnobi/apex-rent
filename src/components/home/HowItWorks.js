import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
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
            {
              step: "01",
              title: "Choose A Car",
              desc: "Browse our wide selection and find the perfect vehicle for your needs.",
            },
            {
              step: "02",
              title: "Make A Booking",
              desc: "Select your dates, add any requirements, and confirm your booking.",
            },
            {
              step: "03",
              title: "Enjoy The Ride",
              desc: "Pick up your keys and enjoy a seamless premium driving experience.",
            },
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
  );
}
