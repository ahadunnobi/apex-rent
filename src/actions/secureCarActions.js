"use server";

import { secureBackendFetch } from "@/lib/secure-backend";

export async function fetchMyCars() {
  return secureBackendFetch("/cars/my");
}

export async function createCarAction(carData) {
  return secureBackendFetch("/cars", {
    method: "POST",
    body: JSON.stringify(carData),
  });
}

export async function updateCarAction(id, carData) {
  return secureBackendFetch(`/cars/${id}`, {
    method: "PUT",
    body: JSON.stringify(carData),
  });
}

export async function deleteCarAction(id) {
  return secureBackendFetch(`/cars/${id}`, { method: "DELETE" });
}

export async function fetchMyBookings() {
  return secureBackendFetch("/bookings/my");
}

export async function createBookingAction(body) {
  return secureBackendFetch("/bookings", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function cancelBookingAction(id) {
  return secureBackendFetch(`/bookings/${id}`, { method: "DELETE" });
}
