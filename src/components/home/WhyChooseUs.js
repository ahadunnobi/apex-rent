import { motion } from "framer-motion";
import { FaRocket, FaShieldAlt, FaHeadset } from "react-icons/fa";

export default function WhyChooseUs() {
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
            Why Choose <span className="text-gradient">Apex Rent</span>?
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto">
            WE redefine car rental with cutting-edge technology and unmatched
            service.
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
  );
}
