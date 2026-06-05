"use client";

import { useEffect, useState } from "react";
import HeroBanner from "@/components/home/HeroBanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AvailableCars from "@/components/home/AvailableCars";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("@/lib/fetchCars").then(({ fetchCars }) => fetchCars())
      .then((data) => setCars(data))
      .catch((err) => {
        console.error("Failed to load cars:", err.message);
        setCars([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const displayCars = cars.slice(0, 6);

  return (
    <div className="flex flex-col">
      <HeroBanner />
      <WhyChooseUs />
      <AvailableCars cars={cars} loading={loading} displayCars={displayCars} />
      <HowItWorks />
    </div>
  );
}
