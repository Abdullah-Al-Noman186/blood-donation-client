"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEllipsisV } from "react-icons/fa";
import AdminRoute from "../../../components/AdminRoute";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Shield,
  UserCheck,
  UserX,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosSecure = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const LIMIT = 10;

const AllUsers = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [openMenuId, setOpenMenuId] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["all-users", statusFilter, page],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: {
          status: statusFilter,
          page,
          limit: LIMIT,
        },
      });

      return res.data;
    },
  });

  const refresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["all-users"],
    });
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/users/status/${id}`, {
        status,
      });

      setOpenMenuId(null);

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: `User ${status}`,
        timer: 1500,
        showConfirmButton: false,
      });

      refresh();
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await axiosSecure.patch(`/users/role/${id}`, {
        role,
      });

      setOpenMenuId(null);

      Swal.fire({
        icon: "success",
        title: "Role Updated",
        text: `User is now ${role}`,
        timer: 1500,
        showConfirmButton: false,
      });

      refresh();
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (isLoading) {
    return (
      <AdminRoute>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-red-500"></span>
            <p className="mt-4 text-gray-500">
              Loading users...
            </p>
          </div>
        </div>
      </AdminRoute>
    );
  }

  const totalPages = Math.ceil(
    (data?.total || 0) / LIMIT
  );

  const activeUsers =
    data?.users?.filter(
      (u) => u.status === "active"
    ).length || 0;

  const blockedUsers =
    data?.users?.filter(
      (u) => u.status === "blocked"
    ).length || 0;

  const adminUsers =
    data?.users?.filter(
      (u) => u.role === "admin"
    ).length || 0;

  return (
    <AdminRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-3xl p-8 text-white shadow-xl"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                User Management
              </h1>

              <p className="text-red-100 mt-2">
                Manage donors, volunteers and
                administrators
              </p>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              className="select bg-white text-black border-none"
            >
              <option value="">
                All Status
              </option>
              <option value="active">
                Active
              </option>
              <option value="blocked">
                Blocked
              </option>
            </select>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <p className="text-gray-500 text-sm">
              Total Users
            </p>
            <h3 className="text-3xl font-bold">
              {data?.total || 0}
            </h3>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <UserCheck className="w-8 h-8 text-green-500 mb-2" />
            <p className="text-gray-500 text-sm">
              Active Users
            </p>
            <h3 className="text-3xl font-bold">
              {activeUsers}
            </h3>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <UserX className="w-8 h-8 text-red-500 mb-2" />
            <p className="text-gray-500 text-sm">
              Blocked Users
            </p>
            <h3 className="text-3xl font-bold">
              {blockedUsers}
            </h3>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <Shield className="w-8 h-8 text-purple-500 mb-2" />
            <p className="text-gray-500 text-sm">
              Admins
            </p>
            <h3 className="text-3xl font-bold">
              {adminUsers}
            </h3>
          </motion.div>
        </div>

        {/* Table */}
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-3xl bg-base-100 shadow-2xl border border-base-300 overflow-hidden"
>
  <div className="overflow-x-auto">
    <table className="table table-zebra table-pin-rows">

      <thead>
        <tr className="bg-base-200 text-base-content">
          <th>#</th>
          <th>User</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>

      <tbody>

        {data?.users?.length > 0 ? (

          data.users.map((u, index) => (

            <motion.tr
              key={u._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="hover"
            >

              <td className="font-semibold">
                {(page * LIMIT) + index + 1}
              </td>

              <td>

                <div className="flex items-center gap-3">

                  <div className="avatar">

                    <div className="w-12 rounded-full ring ring-error ring-offset-base-100 ring-offset-2">

                      <img
                        src={
                          u.avatar ||
                          "https://i.pravatar.cc/150"
                        }
                        alt={u.name}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="font-bold">
                      {u.name}
                    </div>

                    <div className="text-xs opacity-60">
                      ID :
                      {u._id.slice(-6)}
                    </div>

                  </div>

                </div>

              </td>

              <td>

                <span className="text-sm">
                  {u.email}
                </span>

              </td>

              <td>

                <div
                  className={`badge badge-lg capitalize

                  ${
                    u.role === "admin"

                      ? "badge-error"

                      : u.role === "volunteer"

                      ? "badge-warning"

                      : "badge-info"

                  }`}
                >
                  {u.role}
                </div>

              </td>

              <td>

                <div
                  className={`badge badge-lg capitalize

                  ${
                    u.status === "active"

                      ? "badge-success"

                      : "badge-error"

                  }`}
                >
                  {u.status}
                </div>

              </td>

              <td>

                <div className="dropdown dropdown-end">

                  <label
                    tabIndex={0}
                    className="btn btn-sm btn-circle btn-ghost"
                  >
                    <FaEllipsisV />
                  </label>

                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[100] menu p-2 shadow-xl bg-base-100 rounded-box w-56 border"
                  >

                    {u.status === "active" ? (

                      <li>

                        <button
                          onClick={() =>
                            handleStatusChange(
                              u._id,
                              "blocked"
                            )
                          }
                        >
                          🚫 Block User
                        </button>

                      </li>

                    ) : (

                      <li>

                        <button
                          onClick={() =>
                            handleStatusChange(
                              u._id,
                              "active"
                            )
                          }
                        >
                          ✅ Unblock User
                        </button>

                      </li>

                    )}

                    {u.role === "donor" && (

                      <li>

                        <button
                          onClick={() =>
                            handleRoleChange(
                              u._id,
                              "volunteer"
                            )
                          }
                        >
                          👨‍⚕️ Make Volunteer
                        </button>

                      </li>

                    )}

                    {u.role !== "admin" && (

                      <li>

                        <button
                          onClick={() =>
                            handleRoleChange(
                              u._id,
                              "admin"
                            )
                          }
                        >
                          👑 Make Admin
                        </button>

                      </li>

                    )}

                  </ul>

                </div>

              </td>

            </motion.tr>

          ))

        ) : (

          <tr>

            <td
              colSpan={6}
              className="text-center py-16"
            >

              <div className="space-y-3">

                <div className="text-5xl">
                  👥
                </div>

                <h3 className="text-2xl font-bold">
                  No Users Found
                </h3>

                <p className="text-base-content/60">
                  No users match the selected filter.
                </p>

              </div>

            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>

</motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 flex-wrap">
            {[...Array(totalPages).keys()].map(
              (p) => (
                <motion.button
                  key={p}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() =>
                    setPage(p)
                  }
                  className={`btn ${
                    page === p
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                >
                  {p + 1}
                </motion.button>
              )
            )}
          </div>
        )}
      </motion.div>
    </AdminRoute>
  );
};

export default AllUsers;