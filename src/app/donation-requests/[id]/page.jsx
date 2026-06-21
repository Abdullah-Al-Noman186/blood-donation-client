"use client";

import { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

import {
  Droplets,
  Calendar,
  Clock,
  MapPin,
  Hospital,
  User,
  Mail,
  HeartHandshake,
  FileText,
  CheckCircle,
} from "lucide-react";

import { AuthContext } from "../../../providers/AuthProvider";
import StatusBadge from "../../../components/StatusBadge";
import PrivateRoute from "../../../components/PrivateRoute";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosSecure = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: request,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["request-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/${id}`
      );

      return res.data;
    },
  });

  const handleConfirmDonate = async () => {
    try {
      await axiosSecure.patch(
        `/donation-requests/donate/${id}`,
        {
          donorName: user?.displayName,
          donorEmail: user?.email,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Thank You ❤️",
        text: "You have committed to this donation.",
      });

      setModalOpen(false);
      refetch();
    } catch (err) {
      Swal.fire(
        "Error",
        err?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-red-500"></span>

          <p className="mt-4 text-gray-500">
            Loading Request Details...
          </p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">
          Request Not Found
        </h2>
      </div>
    );
  }

  return (
    <PrivateRoute>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="max-w-6xl mx-auto p-4 md:p-6"
      >
        {/* Hero */}

        <motion.div
          initial={{
            y: -20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          className="bg-gradient-to-r from-red-600 via-red-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold">
                {request.recipientName}
              </h1>

              <p className="text-red-100 mt-2">
                Blood Donation Request
              </p>
            </div>

            <div className="flex items-center gap-4">
              <StatusBadge
                status={request.donationStatus}
              />

              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                <Droplets size={45} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Details Grid */}

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <h3 className="font-bold text-xl mb-5">
              Request Information
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <User className="text-red-500" />
                <div>
                  <p className="font-semibold">
                    Requester
                  </p>
                  <p>
                    {request.requesterName}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="text-blue-500" />
                <div>
                  <p className="font-semibold">
                    Email
                  </p>
                  <p>
                    {
                      request.requesterEmail
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Hospital className="text-green-500" />
                <div>
                  <p className="font-semibold">
                    Hospital
                  </p>
                  <p>
                    {
                      request.hospitalName
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-orange-500" />
                <div>
                  <p className="font-semibold">
                    Location
                  </p>
                  <p>
                    {
                      request.recipientDistrict
                    }
                    ,{" "}
                    {
                      request.recipientUpazila
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <h3 className="font-bold text-xl mb-5">
              Donation Details
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Droplets className="text-red-500" />

                <div>
                  <p className="font-semibold">
                    Blood Group
                  </p>

                  <span className="badge badge-error badge-lg">
                    {
                      request.bloodGroup
                    }
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Calendar className="text-blue-500" />

                <div>
                  <p className="font-semibold">
                    Donation Date
                  </p>

                  <p>
                    {
                      request.donationDate
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="text-purple-500" />

                <div>
                  <p className="font-semibold">
                    Donation Time
                  </p>

                  <p>
                    {
                      request.donationTime
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-pink-500" />

                <div>
                  <p className="font-semibold">
                    Full Address
                  </p>

                  <p>
                    {
                      request.fullAddress
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Message */}

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-red-500" />
            <h3 className="font-bold text-xl">
              Request Message
            </h3>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {request.requestMessage}
          </p>
        </motion.div>

        {/* Donor Info */}

        {request.donationStatus ===
          "inprogress" &&
          request.donorInfo && (
            <motion.div
              className="bg-blue-50 border border-blue-200 rounded-3xl p-6 mb-6"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="text-blue-600" />

                <div>
                  <h3 className="font-bold text-lg">
                    Assigned Donor
                  </h3>

                  <p>
                    {
                      request.donorInfo
                        .name
                    }
                  </p>

                  <p className="text-gray-500">
                    {
                      request.donorInfo
                        .email
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        {/* Donate Button */}

        {request.donationStatus ===
          "pending" && (
          <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => setModalOpen(true)}
  className="btn btn-success w-1/2 flex items-center justify-center gap-2 font-bold text-white bg-green-700"
>
  <HeartHandshake size={20} />
  <span>Donate Now</span>
</motion.button>
        )}

        {/* Modal */}

        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            >
              <motion.div
                initial={{
                  scale: 0.9,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.9,
                  opacity: 0,
                }}
                className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
              >
                <h3 className="text-2xl text-amber-500 font-bold mb-6">
                  Confirm Donation
                </h3>

                <div className="space-y-4">
                  <input
                    value={
                      user?.displayName ||
                      ""
                    }
                    disabled
                    className="input input-bordered w-full bg-gray-100"
                  />

                  <input
                    value={
                      user?.email || ""
                    }
                    disabled
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={
                      handleConfirmDonate
                    }
                    className="btn btn-error flex-1 bg-green-800"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() =>
                      setModalOpen(false)
                    }
                    className="btn btn-outline text-blue-600 flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </PrivateRoute>
  );
};

export default DonationRequestDetails;