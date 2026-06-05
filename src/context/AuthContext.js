"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authClient } from "@/lib/auth-client";
import { normalizeUser } from "@/lib/car-utils";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await authClient.getSession();
      setUser(data?.user ? normalizeUser(data.user) : null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setMounted(true));
  }, [refreshUser]);

  const login = async (email, password) => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message || "Login failed");
    }
    setUser(normalizeUser(data.user));
    return { success: true };
  };

  const register = async (name, email, photo, password) => {
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      image: photo || undefined,
    });
    if (error) {
      throw new Error(error.message || "Registration failed");
    }
    return { success: true };
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch {
      /* ignore */
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        mounted,
        refreshUser,
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
