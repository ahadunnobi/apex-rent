"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Nav link for private routes — sends guests to login instead of the protected page.
 */
export default function ProtectedNavLink({ href, children, className, onNavigate }) {
  const { user, mounted } = useAuth();
  const router = useRouter();

  const handleClick = (e) => {
    if (!mounted) {
      e.preventDefault();
      return;
    }
    if (!user) {
      e.preventDefault();
      router.push(`/login?redirect=${encodeURIComponent(href)}`);
      return;
    }
    onNavigate?.();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
