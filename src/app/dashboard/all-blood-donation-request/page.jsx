"use client";

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import useRole from '../../../hooks/useRole';
import StatusBadge from '../../../components/StatusBadge';
import AdminOrVolunteerRoute from '../../../components/AdminOrVolunteerRoute';
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosSecure = axios.create({ baseURL: API_URL, withCredentials: true });
const LIMIT = 10;

const AllBloodDonationRequests = () => {
  const { role, roleLoading } = useRole();
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['all-requests', statusFilter, page],
    enabled: !roleLoading,
    queryFn: async () => {
      const res = await axiosSecure.get('/donation-requests', {
        params: { status: statusFilter, page, limit: LIMIT }
        // no scope param -> server returns every user's requests
      });
      return res.data;
    }
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['all-requests'] });

  const updateStatus = async (id, donationStatus) => {
    const endpoint = role === 'volunteer'
      ? `/donation-requests/status/${id}`
      : `/donation-requests/${id}`;
    await axiosSecure.patch(endpoint, { donationStatus });
    refresh();
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this request?',
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it'
    });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/donation-requests/${id}`);
      Swal.fire('Deleted', '', 'success');
      refresh();
    }
  };

  const totalPages = Math.ceil((data?.total || 0) / LIMIT);

  return (
  <AdminOrVolunteerRoute>
    {isLoading || roleLoading ? (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Blood Donation Requests
              </h1>
              <p className="text-red-100 mt-1">
                Manage and monitor all donation requests
              </p>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              className="select select-bordered bg-white text-black"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>

        {/* Table Card */}
        {/* Table Card */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-2xl"
>
  <div className="overflow-x-auto">
    <table className="table table-zebra table-pin-rows">
      <thead>
        <tr className="bg-base-200 text-base-content">
          <th>#</th>
          <th>Requester</th>
          <th>Recipient</th>
          <th>Location</th>
          <th>Schedule</th>
          <th>Blood</th>
          <th>Status</th>
          <th>Donor</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <AnimatePresence>
          {data?.requests?.length > 0 ? (
            data.requests.map((req, index) => (
              <motion.tr
                key={req._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.04 }}
                className="hover"
              >
                <td className="font-semibold">
                  {(page * LIMIT) + index + 1}
                </td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-error text-white rounded-full w-10">
                        <span className="text-sm">
                          {req.requesterName?.charAt(0)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">
                        {req.requesterName}
                      </div>

                      <div className="text-xs opacity-60">
                        {req.requesterEmail}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="font-semibold">
                  {req.recipientName}
                </td>

                <td>
                  <div>
                    <div>{req.recipientDistrict}</div>

                    <div className="text-xs opacity-60">
                      {req.recipientUpazila}
                    </div>
                  </div>
                </td>

                <td>
                  <div>
                    <div>{req.donationDate}</div>

                    <div className="text-xs opacity-60">
                      {req.donationTime}
                    </div>
                  </div>
                </td>

                <td>
                  <div className="badge badge-error badge-outline badge-lg font-bold">
                    {req.bloodGroup}
                  </div>
                </td>

                <td>
                  <StatusBadge
                    status={req.donationStatus}
                  />
                </td>

                <td>
                  {req.donationStatus === "inprogress" &&
                  req.donorInfo ? (
                    <div>
                      <div className="font-semibold text-sm">
                        {req.donorInfo.name}
                      </div>

                      <div className="text-xs opacity-60">
                        {req.donorInfo.email}
                      </div>
                    </div>
                  ) : (
                    <span className="badge badge-ghost">
                      Not Assigned
                    </span>
                  )}
                </td>

                <td>
                  <div className="flex flex-wrap justify-center gap-2">

                    {req.donationStatus === "inprogress" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(
                              req._id,
                              "done"
                            )
                          }
                          className="btn btn-success btn-xs"
                        >
                          ✓ Done
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              req._id,
                              "canceled"
                            )
                          }
                          className="btn btn-error btn-xs"
                        >
                          ✕ Cancel
                        </button>
                      </>
                    )}

                    {role === "admin" && (
                      <>
                        <Link
                          href={`/dashboard/edit-donation-request/${req._id}`}
                          className="btn btn-warning btn-outline btn-xs"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(req._id)
                          }
                          className="btn btn-error btn-outline btn-xs"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    <Link
                      href={`/donation-requests/${req._id}`}
                      className="btn btn-primary btn-xs"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={9}
                className="text-center py-16"
              >
                <div className="space-y-3">
                  <div className="text-5xl">
                    🩸
                  </div>

                  <h3 className="text-2xl font-bold">
                    No Donation Requests
                  </h3>

                  <p className="text-base-content/60">
                    There are no requests matching the selected filter.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </AnimatePresence>
      </tbody>
    </table>
  </div>
</motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 flex-wrap">
            {[...Array(totalPages).keys()].map((p) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={p}
                onClick={() => setPage(p)}
                className={`btn btn-sm ${
                  page === p
                    ? "btn-primary"
                    : "btn-outline"
                }`}
              >
                {p + 1}
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    )}
  </AdminOrVolunteerRoute>
);
};

export default AllBloodDonationRequests;