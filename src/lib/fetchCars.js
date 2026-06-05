/**
 * Fetch cars from the API proxy with safe array handling.
 */
export async function fetchCars(query = "") {
  const path = query ? `/api/proxy/cars?${query}` : "/api/proxy/cars";
  const res = await fetch(path, { credentials: "include", cache: "no-store" });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid response from server");
  }

  if (!res.ok) {
    throw new Error(data?.message || data?.error || `Failed to load cars (${res.status})`);
  }

  if (!Array.isArray(data)) {
    console.error("Expected car array, got:", data);
    return [];
  }

  return data;
}

/** Public — single car details (no login required) */
export async function fetchCarById(id) {
  const res = await fetch(`/api/proxy/cars/${id}`, { cache: "no-store" });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid response from server");
  }

  if (!res.ok || !data?._id) {
    throw new Error(data?.message || "Car not found");
  }

  return data;
}
