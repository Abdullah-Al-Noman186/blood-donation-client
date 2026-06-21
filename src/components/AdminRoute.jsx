"use client";

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../providers/AuthProvider';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !roleLoading && (!user || role !== 'admin')) {
      router.push('/dashboard');
    }
  }, [loading, roleLoading, user, role, router]);

  if (loading || roleLoading || !user || role !== 'admin') {
    return <span className="loading loading-spinner mx-auto block mt-20"></span>;
  }

  return children;
};

export default AdminRoute;