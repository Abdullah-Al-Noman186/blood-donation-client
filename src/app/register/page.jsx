"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  UserPlus,
  Upload,
} from "lucide-react";

import { AuthContext } from "../../providers/AuthProvider";
import districts from "../../data/districts.json";
import upazilas from "../../data/upazilas.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY}`;

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } =
    useContext(AuthContext);

  const router = useRouter();

  const [selectedDistrictId, setSelectedDistrictId] =
    useState("");

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const avatarFile = watch("avatar");

  const districtUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrictId
  );

  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      return Swal.fire(
        "Error",
        "Passwords do not match",
        "error"
      );
    }

    setLoading(true);

    try {
      // Upload image

      const formData = new FormData();
      formData.append("image", data.avatar[0]);

      const imgRes = await axios.post(
        imageUploadUrl,
        formData
      );

      const avatarUrl =
        imgRes.data.data.display_url;

      // Create user

      await createUser(
        data.email,
        data.password
      );

      await updateUserProfile(
        data.name,
        avatarUrl
      );

      const districtName =
        districts.find(
          (d) => d.id === data.district
        )?.name || "";

      const upazilaName =
        upazilas.find(
          (u) => u.id === data.upazila
        )?.name || "";

      const userInfo = {
        name: data.name,
        email: data.email,
        avatar: avatarUrl,
        bloodGroup: data.bloodGroup,
        district: districtName,
        upazila: upazilaName,
      };

      await axios.post(
        `${API_URL}/users`,
        userInfo
      );

      Swal.fire({
        icon: "success",
        title: "Welcome ❤️",
        text: "Registration successful!",
      });

      router.push("/");
    } catch (err) {
      Swal.fire(
        "Error",
        err?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border"
      >
        {/* Header */}

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-red-100 p-3 rounded-2xl">
              <UserPlus
                className="text-red-500"
                size={28}
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold">
            Create Account
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Join and help save lives ❤️
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Name */}

          <input
            {...register("name", {
              required: true,
            })}
            placeholder="Full Name"
            className="input input-bordered w-full"
          />

          {errors.name && (
            <p className="text-red-500 text-sm">
              Name is required
            </p>
          )}

          {/* Email */}

          <input
            {...register("email", {
              required: true,
            })}
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />

          {/* Avatar */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Upload Avatar
            </label>

            <input
              {...register("avatar", {
                required: true,
              })}
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Blood Group */}

          <select
            {...register("bloodGroup", {
              required: true,
            })}
            className="select select-bordered w-full"
          >
            <option value="">
              Select Blood Group
            </option>

            {[
              "A+",
              "A-",
              "B+",
              "B-",
              "AB+",
              "AB-",
              "O+",
              "O-",
            ].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          {/* District */}

          <select
            {...register("district", {
              required: true,
            })}
            onChange={(e) =>
              setSelectedDistrictId(
                e.target.value
              )
            }
            className="select select-bordered w-full"
          >
            <option value="">
              Select District
            </option>

            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Upazila */}

          <select
            {...register("upazila", {
              required: true,
            })}
            className="select select-bordered w-full"
          >
            <option value="">
              Select Upazila
            </option>

            {districtUpazilas.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* Password */}

          <div className="relative">
            <input
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full pr-10"
            />

            <button
              type="button"
              onClick={() =>
                setShowPass(!showPass)
              }
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPass ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Confirm Password */}

          <input
            {...register("confirm_password", {
              required: true,
            })}
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
          />

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-error w-full text-green-500 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <Upload size={18} />
                Register
              </>
            )}
          </button>
        </form>

        {/* Footer */}

        <p className="text-center mt-5 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-red-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;