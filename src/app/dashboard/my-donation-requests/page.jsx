"use client";

import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Clock, CheckCircle, AlertCircle, Eye, Edit, Trash2 } from "lucide-react";

import { AuthContext } from "../../../providers/AuthProvider";
import StatusBadge from "../../../components/StatusBadge";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosSecure = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const LIMIT = 10;

const MyDonationRequests = () => {
  const { user } = useContext(AuthContext);

  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["my-requests", user?.email, statusFilter, page],
    enabled: !!user?.email,
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests", {
        params: {
          email: user.email,
          scope: "mine",
          status: statusFilter,
          page,
          limit: LIMIT,
        },
      });

      return res.data;
    },
  });

  // ✅ FIXED refresh
  const refresh = () =>
    queryClient.invalidateQueries({
      queryKey: ["my-requests", user?.email],
    });

  const updateStatus = async (id, donationStatus) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, {
        donationStatus,
      });

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      refresh();
    } catch {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/donation-requests/${id}`);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      refresh();
    } catch {
      Swal.fire("Error", "Failed to delete request", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }

  const totalPages = Math.ceil((data?.total || 0) / LIMIT);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* HEADER */}
      <div className="bg-gradient-to-r from-red-600 to-red-400 rounded-3xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h1 className="text-2xl font-bold">
            My Donation Requests
          </h1>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
            className="select bg-white text-black"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <AlertCircle className="text-yellow-500" />
          <p>Pending</p>
          <h2 className="text-2xl font-bold">
            {data?.requests?.filter((r) => r.donationStatus === "pending").length || 0}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <Clock className="text-blue-500" />
          <p>In Progress</p>
          <h2 className="text-2xl font-bold">
            {data?.requests?.filter((r) => r.donationStatus === "inprogress").length || 0}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <CheckCircle className="text-green-500" />
          <p>Completed</p>
          <h2 className="text-2xl font-bold">
            {data?.requests?.filter((r) => r.donationStatus === "done").length || 0}
          </h2>
        </div>
      </div>

      {/* TABLE (DESKTOP) */}
      <div className="bg-white rounded-3xl shadow-xl overflow-x-auto">
  <table className="table w-full table-fixed">
    <thead className="bg-gray-50">
      <tr>
        <th className="w-40">Recipient</th>
        <th className="w-48">Location</th>
        <th className="w-40">Date</th>
        <th className="w-24">Blood</th>
        <th className="w-32">Status</th>
        <th className="w-48">Donor</th>
        <th className="w-56">Actions</th>
      </tr>
    </thead>

    <tbody>
      <AnimatePresence>
        {data?.requests?.length > 0 ? (
          data.requests.map((req, index) => (
            <motion.tr
              key={req._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="hover:bg-gray-50"
            >
              {/* Recipient */}
              <td className="align-middle font-medium truncate">
                {req.recipientName}
              </td>

              {/* Location */}
              <td className="align-middle truncate">
                {req.recipientDistrict}, {req.recipientUpazila}
              </td>

              {/* Date */}
              <td className="align-middle">
                <div className="flex flex-col">
                  <span>{req.donationDate}</span>
                  <span className="text-xs text-gray-500">
                    {req.donationTime}
                  </span>
                </div>
              </td>

              {/* Blood */}
              <td className="align-middle">
                <span className="badge badge-error badge-outline">
                  {req.bloodGroup}
                </span>
              </td>

              {/* Status */}
              <td className="align-middle">
                <StatusBadge status={req.donationStatus} />
              </td>

              {/* Donor */}
              <td className="align-middle">
                {req.donationStatus === "inprogress" &&
                req.donorInfo ? (
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

              {/* Actions */}
              <td className="align-middle">
                <div className="flex flex-wrap gap-1">
                  {req.donationStatus === "inprogress" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(req._id, "done")
                        }
                        className="btn btn-success btn-xs"
                      >
                        Done
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(req._id, "canceled")
                        }
                        className="btn btn-error btn-xs"
                      >
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

                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-outline btn-error btn-xs"
                  >
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
          ))
        ) : (
          <tr>
            <td colSpan={7} className="text-center py-12">
              <Droplets
                size={50}
                className="mx-auto text-red-400 mb-3"
              />
              <h3 className="font-bold text-xl">
                No Requests Found
              </h3>
              <p className="text-gray-500">
                Create your first donation request.
              </p>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </tbody>
  </table>
</div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {data?.requests?.map((req) => (
          <div key={req._id} className="bg-white p-4 rounded-xl shadow">
            <p className="font-bold">{req.recipientName}</p>
            <p className="text-sm text-gray-500">
              {req.recipientDistrict}, {req.recipientUpazila}
            </p>

            <StatusBadge status={req.donationStatus} />

            <div className="flex gap-2 mt-3">
              <Link
                href={`/donation-requests/${req._id}`}
                className="btn btn-xs btn-outline"
              >
                View
              </Link>

              <Link
                href={`/dashboard/edit-donation-request/${req._id}`}
                className="btn btn-xs btn-outline bg-amber-300"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(req._id)}
                className="btn btn-xs btn-error bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 flex-wrap">
          {[...Array(totalPages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`btn btn-sm ${
                page === p ? "btn-primary" : "btn-outline"
              }`}
            >
              {p + 1}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyDonationRequests;