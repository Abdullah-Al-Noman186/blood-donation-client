"use client";

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../providers/AuthProvider';
import useRole from '../hooks/useRole';

const AdminOrVolunteerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useRole();
  const router = useRouter();

  const allowed = role === 'admin' || role === 'volunteer';

  useEffect(() => {
    if (!loading && !roleLoading && (!user || !allowed)) {
      router.push('/dashboard');
    }
  }, [loading, roleLoading, user, allowed, router]);

  if (loading || roleLoading || !user || !allowed) {
    return <span className="loading loading-spinner mx-auto block mt-20"></span>;
  }

  return children;
};

export default AdminOrVolunteerRoute;