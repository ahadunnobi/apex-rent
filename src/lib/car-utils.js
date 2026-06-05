export function getCarName(car) {
  return car?.car_name || car?.name || "Vehicle";
}

export function getCarPrice(car) {
  return car?.daily_rent_price ?? car?.price ?? 0;
}

export function getCarImage(car) {
  return car?.image_url || car?.image || "";
}

export function getCarType(car) {
  return car?.car_type || car?.type || "";
}

export function getPickupLocation(car) {
  return car?.pickup_location || car?.pickupLocation || car?.location || "N/A";
}

export function isCarAvailable(car) {
  if (!car) return false;
  if (car.availability === "Unavailable") return false;
  if (car.availability_status === false) return false;
  return true;
}

export function normalizeUser(sessionUser) {
  if (!sessionUser) return null;
  return {
    name: sessionUser.name || sessionUser.email?.split("@")[0] || "User",
    email: sessionUser.email,
    avatar:
      sessionUser.image ||
      sessionUser.photo ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${sessionUser.email}`,
  };
}
