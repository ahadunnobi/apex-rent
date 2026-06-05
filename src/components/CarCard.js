"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGasPump, FaUsers, FaCog, FaMapMarkerAlt } from "react-icons/fa";
import {
  getCarName,
  getCarPrice,
  getCarImage,
  getCarType,
  getPickupLocation,
  isCarAvailable,
} from "@/lib/car-utils";

export default function CarCard({ car, index = 0, ctaLabel = "Details" }) {
  const detailHref = `/cars/${car._id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass-card overflow-hidden group h-full flex flex-col"
    >
      <Link href={detailHref} className="block relative h-52 w-full overflow-hidden shrink-0">
        <img
          src={getCarImage(car) || "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600"}
          alt={getCarName(car)}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-primary-content px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          ${getCarPrice(car)}/day
        </div>
        {!isCarAvailable(car) && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <span className="text-red-400 text-xl font-bold font-display tracking-widest rotate-[-10deg] border-2 border-red-400/50 px-4 py-2 rounded">
              UNAVAILABLE
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-base-100/80 to-transparent" />
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link href={detailHref} className="block group/title">
          <h3 className="text-lg font-bold font-display text-base-content mb-1 tracking-wide group-hover/title:text-primary transition-colors">
            {getCarName(car)}
          </h3>
        </Link>
        <p className="text-xs text-base-content/50 flex items-center gap-1 mb-3">
          <FaMapMarkerAlt className="text-primary" />
          {getPickupLocation(car)}
        </p>

        <div className="flex items-center gap-4 text-xs text-base-content/60 mb-3 flex-wrap">
          {getCarType(car) && (
            <span className="flex items-center gap-1">
              <FaCog className="text-primary" />
              {getCarType(car)}
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

        <p className="text-base-content/70 text-sm line-clamp-2 mb-4 leading-relaxed flex-grow">
          {car.description || "Experience the thrill of driving this premium vehicle."}
        </p>

        <Link
          href={detailHref}
          className="btn-neon w-full py-2.5 rounded-lg text-center text-sm block mt-auto"
        >
          {ctaLabel}
        </Link>
      </div>
    </motion.div>
  );
}
