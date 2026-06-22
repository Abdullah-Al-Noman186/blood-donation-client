"use client";

import { useContext, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { AuthContext } from "../../providers/AuthProvider";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useContext(AuthContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await loginUser(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Welcome back 👋",
        text: "Login successful",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push(from);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Check your email and password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-pink-600 to-red-700 px-4">

      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] bg-white/10 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-yellow-300/10 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 text-white">

        <h2 className="text-3xl font-extrabold text-center">
          Welcome Back
        </h2>

        <p className="text-center text-white/70 mt-2 mb-8">
          Login to continue saving lives ❤️
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-white/80">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-white/60" size={18} />
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-white text-white placeholder-white/50"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-white/80">Password</label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-white/60" size={18} />

              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-white text-white placeholder-white/50"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/60"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-red-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-white/70 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-yellow-200 font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

const Login = () => {
  return (
    <Suspense
      fallback={
        <span className="loading loading-spinner mx-auto block mt-20"></span>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default Login;