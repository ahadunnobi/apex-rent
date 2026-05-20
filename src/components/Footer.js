import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // New X logo

export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <nav>
        <h6 className="footer-title">Useful Links</h6>
        <Link href="/" className="link link-hover">Home</Link>
        <Link href="/cars" className="link link-hover">Explore Cars</Link>
        <Link href="/login" className="link link-hover">Login</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Contact Info</h6>
        <p className="link link-hover">123 Apex Road, Tech City</p>
        <p className="link link-hover">info@apexrent.com</p>
        <p className="link link-hover">+1 (555) 123-4567</p>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="#" aria-label="Facebook">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href="#" aria-label="X (Twitter)">
            <FaXTwitter className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </nav>
      <aside className="mt-8 flex flex-col items-center col-span-full">
        {/* We will add the logo here later when they put it in public folder */}
        <p className="font-bold text-xl text-primary">Apex Rent</p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by Apex Rent Ltd</p>
      </aside>
    </footer>
  );
}
