"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  Droplets,
  Hospital,
  MapPin,
  Calendar,
  Clock,
  FileText,
  Edit,
} from "lucide-react";

import districts from "../../../../data/districts.json";
import upazilas from "../../../../data/upazilas.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosSecure = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const EditDonationRequest = () => {
  const { id } = useParams();
  const router = useRouter();

  const { register, handleSubmit, reset } =
    useForm();

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDistrictId, setSelectedDistrictId] =
    useState("");

  useEffect(() => {
    if (!id) return;

    const fetchRequest = async () => {
      try {
        const res =
          await axiosSecure.get(
            `/donation-requests/${id}`
          );

        reset(res.data);

        const district = districts.find(
          (d) =>
            d.name ===
            res.data.recipientDistrict
        );

        if (district) {
          setSelectedDistrictId(
            district.id.toString()
          );
        }

        setLoaded(true);
      } catch (error) {
        console.log(error);

        Swal.fire(
          "Error",
          "Failed to load donation request",
          "error"
        );

        router.push(
          "/dashboard/my-donation-requests"
        );
      }
    };

    fetchRequest();
  }, [id, reset, router]);

  const districtUpazilas = upazilas.filter(
    (u) =>
      String(u.district_id) ===
      String(selectedDistrictId)
  );

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const {
        _id,
        requesterEmail,
        requesterName,
        donationStatus,
        donorInfo,
        ...editable
      } = data;

      await axiosSecure.patch(
        `/donation-requests/${id}`,
        editable
      );

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: "Donation request updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push(
        "/dashboard/my-donation-requests"
      );
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message ||
          "Failed to update request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!loaded) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-red-500"></span>

          <p className="mt-4 text-gray-500">
            Loading donation request...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="max-w-5xl mx-auto p-4 md:p-6"
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-3xl p-8 text-white shadow-xl mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-4 rounded-2xl">
            <Edit size={40} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Edit Donation Request
            </h1>

            <p className="text-red-100 mt-2">
              Update your blood donation
              request information.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-6"
        >
          {/* Recipient */}

          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Recipient Name
              </span>
            </label>

            <input
              {...register(
                "recipientName",
                {
                  required: true,
                }
              )}
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
                {...register(
                  "recipientDistrict",
                  {
                    required: true,
                  }
                )}
                onChange={(e) => {
                  const district =
                    districts.find(
                      (d) =>
                        d.name ===
                        e.target.value
                    );

                  setSelectedDistrictId(
                    district?.id || ""
                  );
                }}
                className="select select-bordered w-full"
              >
                {districts.map(
                  (district) => (
                    <option
                      key={district.id}
                      value={district.name}
                    >
                      {district.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Upazila
                </span>
              </label>

              <select
                {...register(
                  "recipientUpazila",
                  {
                    required: true,
                  }
                )}
                className="select select-bordered w-full"
              >
                {districtUpazilas.map(
                  (upazila) => (
                    <option
                      key={upazila.id}
                      value={upazila.name}
                    >
                      {upazila.name}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Hospital & Address */}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Hospital size={16} />
                  Hospital Name
                </span>
              </label>

              <input
                {...register(
                  "hospitalName",
                  {
                    required: true,
                  }
                )}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Full Address
                </span>
              </label>

              <input
                {...register(
                  "fullAddress",
                  {
                    required: true,
                  }
                )}
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
              {...register("bloodGroup", {
                required: true,
              })}
              className="select select-bordered w-full"
            >
              {bloodGroups.map((bg) => (
                <option
                  key={bg}
                  value={bg}
                >
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}

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
                {...register(
                  "donationDate",
                  {
                    required: true,
                  }
                )}
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
                {...register(
                  "donationTime",
                  {
                    required: true,
                  }
                )}
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
              {...register(
                "requestMessage",
                {
                  required: true,
                }
              )}
              rows={5}
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Submit */}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            disabled={loading}
            type="submit"
            className="btn btn-error w-full text-white bg-blue-500"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Updating...
              </>
            ) : (
              "Update Donation Request"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditDonationRequest;