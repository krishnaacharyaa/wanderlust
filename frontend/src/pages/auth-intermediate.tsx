import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '@/components/spinner';

type UserType = {
  name: String;
  id: String;
};

//This is the intermediate page where the user redirected with authorized code
const Intermediate = () => {
  const baseURl = 'http://localhost:5000/api/auth';//Change accordingly
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [_, setUser] = useState<UserType | null>(null);
  const [params] = useSearchParams();
  const state = params.get('state');
  const code = params.get('code');
  useEffect(() => {
    const handleLoginOrSignUp = async () => {
      setIsLoading(true);
      try {
        if (state === 'google-sign-up') {
          const response = await axios.get(`${baseURl}/google/signup/callback/?code=${code}`);
          // console.log(response.data);
          setUser(response.data.user);
          toast.success(response.data.message);
          setIsLoading(false);
          navigate('/');
        }
        if (state === 'google-sign-in') {
          const response = await axios.get(`${baseURl}/google/signin/callback/?code=${code}`);
          // console.log(response.data);
          setUser(response.data.user);
          toast.success(response.data.message);
          setIsLoading(false);
          navigate('/');
        }
        if (state === 'github-sign-up') {
          const response = await axios.get(`${baseURl}/github/signup/callback/?code=${code}`);
          // console.log(response.data);
          setUser(response.data.user);
          toast.success(response.data.message);
          setIsLoading(false);
          navigate('/');
        }
        if (state === 'github-sign-in') {
          const response = await axios.get(`${baseURl}/github/signin/callback/?code=${code}`);
          // console.log(response.data);
          setUser(response.data.user);
          toast.success(response.data.message);
          setIsLoading(false);
          navigate('/');
        }
      } catch (error) {
        if (isAxiosError(error)) toast.error(error?.response?.data.message);
        navigate('/signup', { replace: true });
        setIsLoading(false);
      }
    };
    handleLoginOrSignUp();
  }, [state]);
  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center">
      {isLoading && <Spinner className="w-28` h-28 fill-green-800" />}
    </div>
  );
};

export default Intermediate;
