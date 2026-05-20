import Link from "next/link";
import Image from "next/image";

export default function CarCard({ car, showActions, onDelete }) {
  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden group">
      <figure className="relative h-56 w-full">
        {/* We use standard img to avoid Next Image strict domain constraints for now */}
        <img 
          src={car.image || "https://images.unsplash.com/photo-1542282088-fe8426682b8f"} 
          alt={car.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-content px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          ${car.price}/day
        </div>
        {car.availability === "Unavailable" && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-2xl font-bold rotate-[-15deg]">UNAVAILABLE</span>
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{car.name}</h2>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <span>Type: <span className="font-semibold text-gray-700">{car.type}</span></span>
          <span>Seats: <span className="font-semibold text-gray-700">{car.seatCapacity}</span></span>
        </div>
        <p className="mt-3 text-gray-600 line-clamp-2">{car.description}</p>
        
        <div className="card-actions justify-end mt-4">
          {showActions ? (
             <div className="flex gap-2">
               <Link href={`/update-car/${car._id}`} className="btn btn-sm btn-outline btn-info">Update</Link>
               <button onClick={() => onDelete(car._id)} className="btn btn-sm btn-outline btn-error">Delete</button>
               <Link href={`/cars/${car._id}`} className="btn btn-sm btn-primary">Details</Link>
             </div>
          ) : (
            <Link href={`/cars/${car._id}`} className="btn btn-primary w-full">View Details</Link>
          )}
        </div>
      </div>
    </div>
  );
}
