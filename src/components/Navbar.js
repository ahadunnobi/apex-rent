"use client";

import Link from "next/link";

export default function Navbar() {
  const navLinks = (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/cars">Explore Cars</Link></li>
      <li><Link href="/add-car">Add Car</Link></li>
      <li><Link href="/my-cars">My Cars</Link></li>
      <li><Link href="/my-bookings">My Bookings</Link></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Apex Rent</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end">
        {/* Auth removed as requested */}
      </div>
    </div>
  );
}
