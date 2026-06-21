"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "../providers/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    setDropdownOpen(false);
    setMobileOpen(false);
    router.push("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-bold text-red-600"
        >
          🩸 BloodLink
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm">

          <Link
            href="/"
            className="hover:text-red-600 transition"
          >
            Home
          </Link>

          <Link
            href="/donation-requests"
            className="hover:text-red-600 transition"
          >
            Donation Requests
          </Link>

          {user && (
            <Link
              href="/funding"
              className="hover:text-red-600 transition"
            >
              Funding
            </Link>
          )}

          {!user ? (
            <Link
              href="/login"
              className="btn btn-primary btn-sm"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() =>
                  setDropdownOpen(
                    !dropdownOpen
                  )
                }
                className="flex items-center gap-2"
              >
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-9 h-9 rounded-full border"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border py-1">

                  <p className="px-4 py-2 text-sm font-medium border-b truncate">
                    {user.displayName}
                  </p>

                  <Link
                    href="/dashboard"
                    onClick={() =>
                      setDropdownOpen(false)
                    }
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
        >
          {mobileOpen ? (
            <FaTimes size={20} />
          ) : (
            <FaBars size={20} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-3 flex flex-col gap-3 text-sm">

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
            <Link
              href="/funding"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Funding
            </Link>
          )}

          {!user ? (
            <Link
              href="/login"
              onClick={() =>
                setMobileOpen(false)
              }
              className="btn btn-primary btn-sm w-fit"
            >
              Login
            </Link>
          ) : (
            <>
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
                className="text-left text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;