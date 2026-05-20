import Link from "next/link";
import CarCard from "@/components/CarCard";

// Helper to fetch cars
async function getCars() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/cars`, {
      cache: "no-store", // We can use revalidate for production, but no-store ensures fresh data during dev
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return [];
  }
}

export default async function Home() {
  const cars = await getCars();
  // Ensure we only show available cars or all cars based on requirements? 
  // "Available Cars Section... using database data. Show a minimum 6 cards."
  const displayCars = cars.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Banner Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502877338535-766e1452684a')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
            Drive Your <span className="text-primary">Dreams</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 drop-shadow-md">
            Experience premium mobility with our vast selection of luxury, sports, and family vehicles. Your journey begins here.
          </p>
          <Link href="/cars" className="btn btn-primary btn-lg rounded-full shadow-xl hover:scale-105 transition-transform">
            Explore Cars
          </Link>
        </div>
      </section>

      {/* Why Choose Us (Extra Static Section 1) */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose Apex Rent?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-base-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🏷️</div>
              <h3 className="text-xl font-bold mb-4">Best Price Guarantee</h3>
              <p className="text-gray-600">We offer competitive pricing with no hidden fees. What you see is what you pay.</p>
            </div>
            <div className="p-8 bg-base-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🛡️</div>
              <h3 className="text-xl font-bold mb-4">Premium Insurance</h3>
              <p className="text-gray-600">Drive with peace of mind knowing you are fully covered by our comprehensive insurance.</p>
            </div>
            <div className="p-8 bg-base-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">⏱️</div>
              <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
              <p className="text-gray-600">Our dedicated support team is available around the clock to assist you with any inquiries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Cars Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Available Cars</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Browse our collection of premium vehicles ready for your next adventure.</p>
          </div>
          
          {displayCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayCars.map(car => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 bg-base-100 rounded-3xl shadow-inner">
              <p className="text-xl">No cars currently available. Please check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works (Extra Static Section 2) */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent -z-10 -translate-y-1/2"></div>
            
            <div className="relative z-10 flex flex-col items-center max-w-xs bg-base-100 p-6 rounded-3xl shadow-lg border border-base-200">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-md shadow-primary/40">1</div>
              <h3 className="text-xl font-bold mb-3">Choose A Car</h3>
              <p className="text-gray-500 text-sm">Browse our wide selection and find the perfect vehicle for your needs.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center max-w-xs bg-base-100 p-6 rounded-3xl shadow-lg border border-base-200">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-md shadow-primary/40">2</div>
              <h3 className="text-xl font-bold mb-3">Make A Booking</h3>
              <p className="text-gray-500 text-sm">Select your dates, add any special requirements, and confirm your booking securely.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center max-w-xs bg-base-100 p-6 rounded-3xl shadow-lg border border-base-200">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-md shadow-primary/40">3</div>
              <h3 className="text-xl font-bold mb-3">Enjoy The Ride</h3>
              <p className="text-gray-500 text-sm">Pick up your keys and enjoy a seamless driving experience.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
