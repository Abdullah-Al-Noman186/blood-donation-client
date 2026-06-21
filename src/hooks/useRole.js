"use client";

import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useRole = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: roleInfo, isLoading: roleLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/users/role/${user.email}`);
      return res.data;
    }
  });

  return { role: roleInfo?.role, status: roleInfo?.status, roleLoading: loading || roleLoading };
};

export default useRole;