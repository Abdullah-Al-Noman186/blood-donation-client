"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useRole from '../../hooks/useRole';
import PrivateRoute from '../../components/PrivateRoute';
import { FaUserCircle, FaPlus, FaList, FaUsers, FaTint, FaBars } from 'react-icons/fa';

const DashboardLayout = ({ children }) => {
  const { role, roleLoading } = useRole();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return `flex items-center gap-2 px-4 py-2 rounded-lg ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'}`;
  };

  return (
    <PrivateRoute>
      {roleLoading ? (
        <span className="loading loading-spinner mx-auto block mt-20"></span>
      ) : (
        <div className="flex min-h-screen">
          <button className="md:hidden p-4" onClick={() => setOpen(!open)}>
            <FaBars />
          </button>

          <aside className={`fixed md:static z-20 bg-white w-64 min-h-screen shadow-lg p-4 transition-transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <h2 className="text-xl font-bold mb-6 text-red-600">Blood Donation</h2>
            <nav className="flex flex-col gap-2">
              <Link href="/dashboard" className={linkClass('/dashboard', true)}>
                <FaUserCircle /> Dashboard Home
              </Link>
              <Link href="/dashboard/profile" className={linkClass('/dashboard/profile')}>
                <FaUserCircle /> Profile
              </Link>

              {role === 'donor' && (
                <>
                  <Link href="/dashboard/create-donation-request" className={linkClass('/dashboard/create-donation-request')}>
                    <FaPlus /> Create Request
                  </Link>
                  <Link href="/dashboard/my-donation-requests" className={linkClass('/dashboard/my-donation-requests')}>
                    <FaList /> My Requests
                  </Link>
                </>
              )}

              {(role === 'admin' || role === 'volunteer') && (
                <Link href="/dashboard/all-blood-donation-request" className={linkClass('/dashboard/all-blood-donation-request')}>
                  <FaTint /> All Requests
                </Link>
              )}

              {role === 'admin' && (
                <Link href="/dashboard/all-users" className={linkClass('/dashboard/all-users')}>
                  <FaUsers /> All Users
                </Link>
              )}
            </nav>
          </aside>

          <main className="flex-1 p-6">{children}</main>
        </div>
      )}
    </PrivateRoute>
  );
};

export default DashboardLayout;