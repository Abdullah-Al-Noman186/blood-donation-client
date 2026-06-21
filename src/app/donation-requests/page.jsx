"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Droplets,
  MapPin,
  Calendar,
  Clock,
  HeartPulse,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const DonationRequests = () => {
  const { data: requests = [], isLoading } =
    useQuery({
      queryKey: ["pending-requests"],
      queryFn: async () => {
        const res = await axios.get(
          `${API_URL}/donation-requests/pending`
        );
        return res.data;
      },
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-red-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-bold text-gray-800 flex justify-center items-center gap-2">
          <HeartPulse className="text-red-500" />
          Blood Donation Requests
        </h2>

        <p className="text-gray-500 mt-2">
          Help save lives by responding to active requests
        </p>
      </motion.div>

      {/* Empty State */}

      {requests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Droplets
            size={60}
            className="mx-auto text-red-400 mb-4"
          />

          <h3 className="text-2xl font-bold">
            No Pending Requests
          </h3>

          <p className="text-gray-500 mt-2">
            All caught up! No urgent donations right now.
          </p>
        </motion.div>
      ) : (
        /* Grid */

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req, index) => (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.03,
              }}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all"
            >
              {/* Title */}

              <h3 className="text-xl font-bold text-gray-800">
                {req.recipientName}
              </h3>

              {/* Location */}

              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                <MapPin size={16} />
                <span>
                  {req.recipientDistrict},{" "}
                  {req.recipientUpazila}
                </span>
              </div>

              {/* Blood Group */}

              <div className="mt-3">
                <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  <Droplets size={14} />
                  {req.bloodGroup}
                </span>
              </div>

              {/* Info */}

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{req.donationDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{req.donationTime}</span>
                </div>
              </div>

              {/* Button */}

              <Link
                href={`/donation-requests/${req._id}`}
                className="mt-5 inline-flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium transition"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequests;