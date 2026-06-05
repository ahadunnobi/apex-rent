"use server";

const API = (process.env.SERVER_URL || "http://localhost:5000").replace(/\/$/, "");

// Fetch all cars
export async function fetchCars() {
  try {
    const res = await fetch(`${API}/cars`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch cars");
    return await res.json();
  } catch (error) {
    console.error("fetchCars error:", error);
    return [];
  }
}

// Fetch a single car by ID
export async function fetchCar(id) {
  try {
    const res = await fetch(`${API}/cars/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch car");
    return await res.json();
  } catch (error) {
    console.error("fetchCar error:", error);
    return null;
  }
}

// Create a new car
export async function createCar(carData) {
  try {
    const res = await fetch(`${API}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carData),
    });
    if (!res.ok) throw new Error("Failed to create car");
    return await res.json();
  } catch (error) {
    console.error("createCar error:", error);
    return { error: error.message };
  }
}

// Update a car
export async function updateCar(id, carData) {
  try {
    const res = await fetch(`${API}/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carData),
    });
    if (!res.ok) throw new Error("Failed to update car");
    return await res.json();
  } catch (error) {
    console.error("updateCar error:", error);
    return { error: error.message };
  }
}

// Delete a car
export async function deleteCar(id) {
  try {
    const res = await fetch(`${API}/cars/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete car");
    return await res.json();
  } catch (error) {
    console.error("deleteCar error:", error);
    return { error: error.message };
  }
}
