"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";

import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useContext(AuthContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await loginUser(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Welcome back ❤️",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push(from);
    } catch (err) {
      Swal.fire(
        "Login Failed",
        "Invalid email or password",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white"
      >
        {/* Header */}

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-red-100 p-3 rounded-2xl">
              <LogIn className="text-red-500" size={28} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Login to continue saving lives ❤️
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <input
              {...register("email", {
                required: true,
              })}
              type="email"
              placeholder="Email address"
              className="input input-bordered w-full focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Password */}

          <div className="relative">
            <input
              {...register("password", {
                required: true,
              })}
              type={
                showPassword ? "text" : "password"
              }
              placeholder="Password"
              className="input input-bordered w-full pr-10 focus:ring-2 focus:ring-red-400"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-error w-full text-green-500 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <LogIn size={18} />
                Login
              </>
            )}
          </button>
        </form>

        {/* Footer */}

        <p className="text-center text-sm mt-5 text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-red-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;