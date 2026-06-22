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
  Mail,
  Lock,
  Droplets,
  MapPin,
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

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const router = useRouter();

  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const districtUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrictId
  );

  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }

    setLoading(true);

    try {
      // Upload image
      const formData = new FormData();
      formData.append("image", data.avatar[0]);

      const imgRes = await axios.post(imageUploadUrl, formData);
      const avatarUrl = imgRes.data.data.display_url;

      // Create auth user
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, avatarUrl);

      const districtName =
        districts.find((d) => d.id === data.district)?.name || "";

      const upazilaName =
        upazilas.find((u) => u.id === data.upazila)?.name || "";

      const userInfo = {
        name: data.name,
        email: data.email,
        avatar: avatarUrl,
        bloodGroup: data.bloodGroup,
        district: districtName,
        upazila: upazilaName,
      };

      await axios.post(`${API_URL}/users`, userInfo);

      Swal.fire({
        icon: "success",
        title: "Welcome ❤️",
        text: "Registration successful!",
      });

      router.push("/");
    } catch (err) {
      Swal.fire("Error", err?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-pink-600 to-red-700 px-4 py-10 overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[400px] h-[400px] bg-white/10 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-yellow-300/10 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 text-white"
      >

        {/* Header */}
        <div className="text-center mb-6">

          <div className="flex justify-center mb-3">
            <div className="bg-white/20 p-4 rounded-2xl">
              <UserPlus className="text-white" size={30} />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold">
            Create Account
          </h2>

          <p className="text-white/70 text-sm mt-1">
            Join and help save lives ❤️
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="input w-full bg-white/10 border border-white/20 text-white placeholder-white/60"
          />
          {errors.name && (
            <p className="text-red-200 text-sm">Name is required</p>
          )}

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/60" size={18} />
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="input w-full pl-10 bg-white/10 border border-white/20 text-white placeholder-white/60"
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="text-sm text-white/80">Upload Avatar</label>
            <input
              {...register("avatar", { required: true })}
              type="file"
              className="file-input w-full mt-1 bg-white/10 border border-white/20 text-white"
            />
          </div>

          {/* Blood Group */}
          <select
            {...register("bloodGroup", { required: true })}
            className="select w-full bg-white/10 border border-white/20 text-white"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          {/* District */}
          <select
  {...register("district", { required: true })}
  onChange={(e) => setSelectedDistrictId(e.target.value)}
  className="select w-full bg-white text-black border border-gray-300"
>
  <option value="">Select District</option>

  {districts.map((d) => (
    <option key={d.id} value={d.id}>
      {d.name}
    </option>
  ))}
</select>

          {/* Upazila */}
          <select
  {...register("upazila", { required: true })}
  className="select w-full bg-white text-black border border-gray-300"
>
  <option value="">Select Upazila</option>

  {districtUpazilas.map((u) => (
    <option key={u.id} value={u.id}>
      {u.name}
    </option>
  ))}
</select>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/60" size={18} />

            <input
              {...register("password", { required: true, minLength: 6 })}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="input w-full pl-10 pr-10 bg-white/10 border border-white/20 text-white"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-white/60"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <input
            {...register("confirm_password", { required: true })}
            type="password"
            placeholder="Confirm Password"
            className="input w-full bg-white/10 border border-white/20 text-white"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-red-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <Upload size={18} />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-5 text-sm text-white/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-yellow-200 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
};

export default Register;