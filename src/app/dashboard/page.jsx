"use client";

import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import {
  Users,
  DollarSign,
  HeartPulse,
  Droplets,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { AuthContext } from "../../providers/AuthProvider";
import useRole from "../../hooks/useRole";
import StatusBadge from "../../components/StatusBadge";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosSecure = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const { role, roleLoading } = useRole();
  const queryClient = useQueryClient();

  const { data: recentRequests = [], isLoading: requestLoading } =
    useQuery({
      queryKey: ["recent-requests", user?.email],
      enabled:
        !roleLoading &&
        role === "donor" &&
        !!user?.email,
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/donation-requests/recent/${user.email}`
        );
        return res.data;
      },
    });

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    enabled:
      !roleLoading &&
      (role === "admin" ||
        role === "volunteer"),
    queryFn: async () => {
      const res =
        await axiosSecure.get("/stats");
      return res.data;
    },
  });

  const updateStatus = async (
    id,
    donationStatus
  ) => {
    try {
      await axiosSecure.patch(
        `/donation-requests/${id}`,
        { donationStatus }
      );

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["recent-requests"],
      });
    } catch {
      Swal.fire(
        "Error",
        "Failed to update request",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(
        `/donation-requests/${id}`
      );

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["recent-requests"],
      });
    } catch {
      Swal.fire(
        "Error",
        "Failed to delete request",
        "error"
      );
    }
  };

  if (roleLoading || requestLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-red-500"></span>
          <p className="mt-3 text-gray-500">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Hero Section */}

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-red-600 via-red-500 to-pink-500 rounded-3xl shadow-xl p-8 text-white"
      >
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="mt-3 text-red-100 text-lg">
              {user?.displayName}
            </p>

            <p className="text-red-200 capitalize mt-1">
              {role} Dashboard
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
            <Droplets size={60} />
          </div>
        </div>
      </motion.div>

      {/* Admin / Volunteer Stats */}

      {(role === "admin" ||
        role === "volunteer") &&
        stats && (
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <Users
                className="text-blue-500 mb-3"
                size={35}
              />

              <h3 className="text-4xl font-bold">
                {stats.totalUsers}
              </h3>

              <p className="text-gray-500 mt-1">
                Total Donors
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <DollarSign
                className="text-green-500 mb-3"
                size={35}
              />

              <h3 className="text-4xl font-bold">
                ${stats.totalFunding}
              </h3>

              <p className="text-gray-500 mt-1">
                Total Funding
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <HeartPulse
                className="text-red-500 mb-3"
                size={35}
              />

              <h3 className="text-4xl font-bold">
                {stats.totalRequests}
              </h3>

              <p className="text-gray-500 mt-1">
                Donation Requests
              </p>
            </motion.div>
          </div>
        )}

      {/* Donor Recent Requests */}

      {role === "donor" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Recent Donation Requests
              </h2>

              <Link
                href="/dashboard/my-donation-requests"
                className="btn btn-error btn-sm"
              >
                View All
              </Link>
            </div>
          </div>

          {recentRequests.length > 0 ? (
            <div className="overflow-x-auto">
  <table className="table w-full table-fixed">
    <thead className="bg-gray-50">
      <tr>
        <th className="w-40">Recipient</th>
        <th className="w-52">Location</th>
        <th className="w-40">Date</th>
        <th className="w-24">Blood</th>
        <th className="w-32">Status</th>
        <th className="w-48">Donor</th>
        <th className="w-60">Actions</th>
      </tr>
    </thead>

    <tbody>
      {recentRequests.map((req, index) => (
        <motion.tr
          key={req._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          className="hover:bg-gray-50"
        >
          <td className="align-middle font-medium truncate">
            {req.recipientName}
          </td>

          <td className="align-middle truncate">
            {req.recipientDistrict}, {req.recipientUpazila}
          </td>

          <td className="align-middle">
            <div className="flex flex-col">
              <span>{req.donationDate}</span>
              <span className="text-xs text-gray-500">
                {req.donationTime}
              </span>
            </div>
          </td>

          <td className="align-middle">
            <span className="badge badge-error badge-outline">
              {req.bloodGroup}
            </span>
          </td>

          <td className="align-middle">
            <StatusBadge status={req.donationStatus} />
          </td>

          <td className="align-middle">
            {req.donationStatus === "inprogress" && req.donorInfo ? (
              <div className="truncate">
                <p className="font-medium truncate">
                  {req.donorInfo.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {req.donorInfo.email}
                </p>
              </div>
            ) : (
              "-"
            )}
          </td>

          <td className="align-middle">
            <div className="flex flex-wrap gap-1">
              {req.donationStatus === "inprogress" && (
                <>
                  <button
                    onClick={() => updateStatus(req._id, "done")}
                    className="btn btn-success btn-xs flex items-center gap-1"
                  >
                    <CheckCircle size={14} />
                    Done
                  </button>

                  <button
                    onClick={() => updateStatus(req._id, "canceled")}
                    className="btn btn-error btn-xs flex items-center gap-1"
                  >
                    <XCircle size={14} />
                    Cancel
                  </button>
                </>
              )}

              <Link
                href={`/dashboard/edit-donation-request/${req._id}`}
                className="btn btn-outline btn-xs"
              >
                <Edit size={14} />
              </Link>

              <button className="btn btn-outline btn-error btn-xs">
                <Trash2 size={14} />
              </button>

              <Link
                href={`/donation-requests/${req._id}`}
                className="btn btn-outline btn-xs"
              >
                <Eye size={14} />
              </Link>
            </div>
          </td>
        </motion.tr>
      ))}
    </tbody>
  </table>
</div>
          ) : (
            <div className="py-16 text-center">
              <Droplets
                size={60}
                className="mx-auto text-red-400 mb-4"
              />

              <h3 className="text-2xl font-bold">
                No Donation Requests
              </h3>

              <p className="text-gray-500 mt-2">
                Create your first donation
                request.
              </p>

              <Link
                href="/dashboard/create-donation-request"
                className="btn btn-error mt-5"
              >
                Create Request
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardHome;