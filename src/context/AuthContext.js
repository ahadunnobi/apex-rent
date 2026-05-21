"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    const savedUser = localStorage.getItem("apex_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing saved user", e);
      }
    }

    const savedBookings = localStorage.getItem("apex_bookings");
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (e) {
        console.error("Error parsing saved bookings", e);
      }
    }

    setMounted(true);
  }, []);

  const login = (email, password) => {
    // Simulating login: Create a mock user
    const mockUser = {
      name: email.split("@")[0].toUpperCase(),
      email: email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
    };
    setUser(mockUser);
    localStorage.setItem("apex_user", JSON.stringify(mockUser));
    return { success: true };
  };

  const register = (name, email, password) => {
    // Simulating registration: Create a mock user with registered name
    const mockUser = {
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
    };
    setUser(mockUser);
    localStorage.setItem("apex_user", JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("apex_user");
  };

  const addBooking = (car, startDate, endDate) => {
    const newBooking = {
      id: `booking-${Date.now()}`,
      car: car,
      startDate: startDate,
      endDate: endDate,
      bookingDate: new Date().toISOString(),
      status: "Confirmed",
    };
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem("apex_bookings", JSON.stringify(updated));
    return { success: true };
  };

  const cancelBooking = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("apex_bookings", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        bookings,
        login,
        register,
        logout,
        addBooking,
        cancelBooking,
        mounted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
