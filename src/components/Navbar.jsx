"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "../providers/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";
import { Droplets, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutUser();
    setDropdownOpen(false);
    setMobileOpen(false);
    router.push("/");
  };

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Donation Requests",
      href: "/donation-requests",
    },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-lg">

            <Droplets
              size={22}
              className="text-white"
              fill="white"
            />

          </div>

          <div>

            <h2 className="font-extrabold text-2xl text-gray-800">

              Blood
              <span className="text-red-600">
                Link
              </span>

            </h2>

            <p className="text-xs text-gray-500 -mt-1">
              Donate • Save • Inspire
            </p>

          </div>

        </Link>

        {/* Desktop */}

        <nav className="hidden lg:flex items-center gap-8">

          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition ${
                pathname === item.href
                  ? "text-red-600"
                  : "text-gray-700 hover:text-red-600"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {user && (
            <Link
              href="/funding"
              className={`font-medium transition ${
                pathname === "/funding"
                  ? "text-red-600"
                  : "text-gray-700 hover:text-red-600"
              }`}
            >
              Funding
            </Link>
          )}

        </nav>

        {/* Right */}

        <div className="hidden lg:flex items-center gap-4">

          {!user ? (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-full border hover:border-red-600 hover:text-red-600 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition shadow-md"
              >
                Join Now
              </Link>
            </>
          ) : (
            <div className="relative">

              <button
                onClick={() =>
                  setDropdownOpen(
                    !dropdownOpen
                  )
                }
                className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1 transition"
              >

                <img
                  src={
                    user.photoURL ||
                    "https://i.pravatar.cc/100"
                  }
                  alt=""
                  className="w-11 h-11 rounded-full object-cover border-2 border-red-500"
                />

                <ChevronDown
                  size={18}
                />

              </button>

              <AnimatePresence>

                {dropdownOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border overflow-hidden"
                  >

                    <div className="p-4 border-b">

                      <p className="font-bold text-gray-800">
                        {user.displayName}
                      </p>

                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>

                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() =>
                        setDropdownOpen(false)
                      }
                      className="block px-4 py-3 hover:bg-red-50 transition"
                    >
                      Dashboard
                    </Link>

                    

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>

                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          )}

        </div>

        {/* Mobile Button */}

        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {mobileOpen ? (
            <FaTimes size={22} />
          ) : (
            <FaBars size={22} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      <AnimatePresence>

        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >

            <div className="flex flex-col p-5 gap-4">

              <Link
                href="/"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                Home
              </Link>

              <Link
                href="/donation-requests"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                Donation Requests
              </Link>

              {user && (
                <>
                  <Link
                    href="/funding"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                  >
                    Funding
                  </Link>

                  <Link
                    href="/dashboard"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}

              {!user && (
                <>
                  <Link
                    href="/login"
                    className="btn btn-outline"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="btn bg-red-600 text-white border-none"
                  >
                    Join Now
                  </Link>
                </>
              )}

            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </header>
  );
};

export default Navbar;