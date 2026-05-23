"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGasPump, FaUsers, FaCog } from "react-icons/fa";
import { MdSpeed } from "react-icons/md";

export default function CarCard({ car, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass-card overflow-hidden group cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={car.image_url || car.image || "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600"}
          alt={car.car_name || car.name || "Car"}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
        />
        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-primary-content px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          ${car.daily_rent_price || car.price}/day
        </div>
        {/* Availability overlay */}
        {(car.availability_status === false || car.availability === "Unavailable") && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <span className="text-red-400 text-xl font-bold font-display tracking-widest rotate-[-10deg] border-2 border-red-400/50 px-4 py-2 rounded">
              UNAVAILABLE
            </span>
          </div>
        )}
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-base-100/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold font-display text-base-content mb-2 tracking-wide">
          {car.car_name || car.name}
        </h3>

        {/* Specs row */}
        <div className="flex items-center gap-4 text-xs text-base-content/60 mb-3">
          {(car.car_type || car.type) && (
            <span className="flex items-center gap-1">
              <FaCog className="text-primary" />
              {car.car_type || car.type}
            </span>
          )}
          {(car.seat_capacity || car.seatCapacity) && (
            <span className="flex items-center gap-1">
              <FaUsers className="text-primary" />
              {car.seat_capacity || car.seatCapacity} seats
            </span>
          )}
          {car.fuelType && (
            <span className="flex items-center gap-1">
              <FaGasPump className="text-primary" />
              {car.fuelType}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-base-content/70 text-sm line-clamp-2 mb-4 leading-relaxed">
          {car.description || "Experience the thrill of driving this premium vehicle."}
        </p>


        {/* Action */}
        <Link
          href={`/cars/${car._id}`}
          className="btn-neon w-full py-2.5 rounded-lg text-center text-sm block"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
