import { useAuthContext } from '@/context/authContext';
import axiosInstance from '@/helpers/axios-instance';
import { AuthData } from '@/lib/types';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAuthData = (): AuthData => {
  const location = useLocation;
  const { user } = useAuthContext();

  const [data, setData] = useState<AuthData>({
    _id: user.id || '',
    role: user.role || '',
    token: '',
    loading: true,
  });

  useEffect(() => {
    setData({
      ...data,
      token: '',
    });
  }, [user.id]);

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await axiosInstance.get(`/api/auth/check/${data._id}`);
        setData({
          ...data,
          token: res.data?.data,
          loading: false,
        });
      } catch (error) {
        setData({
          ...data,
          token: '',
          loading: false,
        });
      }
    }
    fetchToken();
  }, [location]);

  return data;
};

export default useAuthData;
