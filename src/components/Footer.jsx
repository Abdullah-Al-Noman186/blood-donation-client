"use client";

import Link from "next/link";
import { Mail, Phone, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
            <Heart className="text-red-500" />
            BloodLink
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed">
            Connecting blood donors with people in need, saving lives one request at a time.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:text-white transition" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" href="/donation-requests">
                Donation Requests
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" href="/search">
                Search Donors
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" href="/register">
                Join as Donor
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>

          <div className="space-y-2 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <Mail size={16} /> support@bloodlink.org
            </p>

            <p className="flex items-center gap-2">
              <Phone size={16} /> +880 1XXX-XXXXXX
            </p>
          </div>
        </div>

        {/* NEWSLETTER (NEW FEATURE) */}
        <div>
          <h4 className="font-semibold text-white mb-3">
            Stay Updated
          </h4>

          <p className="text-sm text-gray-400 mb-3">
            Get urgent donation alerts.
          </p>

          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full text-sm"
            />

            <button className="btn btn-error btn-sm text-white w-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="text-center text-xs py-5 border-t border-gray-800 text-gray-500">
        © {new Date().getFullYear()} BloodLink. Built with ❤️ to save lives.
      </div>
    </footer>
  );
};

export default Footer;