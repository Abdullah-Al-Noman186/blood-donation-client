"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  Droplets,
  Hospital,
  MapPin,
  Calendar,
  Clock,
  User,
  FileText,
} from "lucide-react";

import { AuthContext } from "../../../providers/AuthProvider";
import useRole from "../../../hooks/useRole";

import districts from "../../../data/districts.json";
import upazilas from "../../../data/upazilas.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosSecure = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const { status } = useRole();
  const router = useRouter();

  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // string-safe comparison since JSON ids and select values are both strings,
  // but this guards against any stray type mismatch
  const districtUpazilas = upazilas.filter(
    (u) => String(u.district_id) === String(selectedDistrictId)
  );

  const onSubmit = async (data) => {
    if (status === "blocked") {
      return Swal.fire(
        "Blocked",
        "Blocked users cannot create donation requests",
        "error"
      );
    }

    // data.recipientDistrict / data.recipientUpazila are IDs at this point —
    // convert back to readable names before saving to the database
    const districtName =
      districts.find((d) => String(d.id) === String(data.recipientDistrict))
        ?.name || "";
    const upazilaName =
      upazilas.find((u) => String(u.id) === String(data.recipientUpazila))
        ?.name || "";

    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      recipientDistrict: districtName,
      recipientUpazila: upazilaName,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
    };

    try {
      setLoading(true);

      await axiosSecure.post("/donation-requests", requestData);

      Swal.fire({
        icon: "success",
        title: "Request Created",
        text: "Blood donation request submitted successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      router.push("/dashboard/my-donation-requests");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto p-4 md:p-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-3xl p-8 text-white shadow-xl mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-4 rounded-2xl">
            <Droplets size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Create Donation Request</h1>
            <p className="text-red-100 mt-2">Request blood for patients in need.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
          {/* Requester Info */}
          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <User className="text-red-500" size={20} />
              Requester Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                value={user?.displayName || ""}
                disabled
                className="input input-bordered bg-gray-100 w-full"
              />
              <input
                value={user?.email || ""}
                disabled
                className="input input-bordered bg-gray-100 w-full"
              />
            </div>
          </div>

          {/* Recipient */}
          <div>
            <h2 className="text-lg font-bold mb-4">Recipient Information</h2>
            <input
              {...register("recipientName", { required: true })}
              placeholder="Recipient Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <MapPin size={16} />
                  District
                </span>
              </label>

              <select
                {...register("recipientDistrict", { required: true })}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Upazila</span>
              </label>

              <select
                {...register("recipientUpazila", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Upazila</option>
                {districtUpazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hospital */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Hospital size={16} />
                  Hospital
                </span>
              </label>
              <input
                {...register("hospitalName", { required: true })}
                placeholder="Hospital Name"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Full Address</span>
              </label>
              <input
                {...register("fullAddress", { required: true })}
                placeholder="Full Address"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Droplets size={16} />
                Blood Group
              </span>
            </label>
            <select
              {...register("bloodGroup", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* Date Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Calendar size={16} />
                  Donation Date
                </span>
              </label>
              <input
                type="date"
                {...register("donationDate", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Clock size={16} />
                  Donation Time
                </span>
              </label>
              <input
                type="time"
                {...register("donationTime", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FileText size={16} />
                Request Message
              </span>
            </label>
            <textarea
              {...register("requestMessage", { required: true })}
              rows={5}
              placeholder="Describe why blood is needed..."
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn btn-error w-full text-white bg-blue-600 rounded-3xl"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Submitting...
              </>
            ) : (
              "Create Donation Request"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateDonationRequest;