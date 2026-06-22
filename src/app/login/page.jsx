"use client";

import { useContext, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      Swal.fire('Welcome back!', '', 'success');
      router.push(from);
    } catch (err) {
      Swal.fire('Login Failed', 'Check your email and password', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('email', { required: true })} type="email" placeholder="Email" className="input input-bordered w-full" />
        <input {...register('password', { required: true })} type="password" placeholder="Password" className="input input-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">Login</button>
      </form>
      <p className="text-center mt-4">Don&apos;t have an account? <Link href="/register" className="text-blue-600">Register</Link></p>
    </div>
  );
};

const Login = () => {
  return (
    <Suspense fallback={<span className="loading loading-spinner mx-auto block mt-20"></span>}>
      <LoginForm />
    </Suspense>
  );
};

export default Login;