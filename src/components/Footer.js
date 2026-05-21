import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative bg-[#060610] border-t border-cyan-400/10">
      {/* Glow line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-cyan-400/30 group-hover:ring-cyan-400/70 transition-all">
                <Image
                  src="/favicon.ico"
                  alt="Apex Rent Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold font-display text-gradient tracking-wider">
                APEX RENT
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
              Premium car rentals for the modern driver. Experience the future of mobility.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h6 className="font-display text-sm font-bold text-cyan-300 uppercase tracking-widest mb-2">
              Quick Links
            </h6>
            <Link href="/" className="text-gray-400 hover:text-cyan-300 transition-colors text-sm">
              Home
            </Link>
            <Link href="/cars" className="text-gray-400 hover:text-cyan-300 transition-colors text-sm">
              Explore Cars
            </Link>
            <Link href="/add-car" className="text-gray-400 hover:text-cyan-300 transition-colors text-sm">
              Add Car
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h6 className="font-display text-sm font-bold text-cyan-300 uppercase tracking-widest mb-2">
              Contact
            </h6>
            <p className="text-gray-400 text-sm">123 Apex Road, Tech City</p>
            <p className="text-gray-400 text-sm">info@apexrent.com</p>
            <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
            <div className="flex gap-4 mt-3">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-cyan-300 transition-colors text-lg">
                <FaFacebook />
              </a>
              <a href="#" aria-label="X Twitter" className="text-gray-500 hover:text-cyan-300 transition-colors text-lg">
                <FaXTwitter />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-cyan-300 transition-colors text-lg">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-cyan-300 transition-colors text-lg">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="GitHub" className="text-gray-500 hover:text-cyan-300 transition-colors text-lg">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-600 text-xs tracking-wider">
            © {new Date().getFullYear()} <span className="text-gradient font-semibold">APEX RENT</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
