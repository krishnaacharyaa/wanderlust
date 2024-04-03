import { Link, useNavigate } from 'react-router-dom';
import AddGoogleIcon from '@/assets/svg/google-color-icon.svg';
import AddGithubIcon from '@/assets/svg/github-icon.svg';
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { TSignInSchema, signInSchema } from '@/lib/types';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

function signin() {
  const navigate = useNavigate();

  const { register, 
        handleSubmit, 
        formState: { errors , isSubmitting},
        reset
      } = useForm<TSignInSchema>({resolver: zodResolver(signInSchema)});

  const onSubmit = async (data: FieldValues) => {

    if(data.email === "abc@gamil.com"){
      toast.error('Submitting form is failed');
      return;
    }
    
    // TODO: Server-side validation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    reset();
    navigate("/");
  }

  return (
    <div className="min-h-screen cursor-default bg-white px-5 py-8 mt-10">
      <div className="mb-4 flex justify-center">
        <div className="flex w-[32rem] items-center justify-center space-x-4 md:w-5/6 lg:w-4/6 ">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-black  ">
            Sign in to WanderLust
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-14 gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className=" w-3/4 md:w-5/6 lg:w-2/4">

          <div className="mb-4">
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full rounded-lg font-semibold bg-input-background p-3 placeholder:text-sm placeholder:text-light-gray"
              // value={formData.title}
              // onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs p-2">
                {`${errors.email.message}`}
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full rounded-lg font-semibold bg-input-background p-3 placeholder:text-sm placeholder:text-light-gray"
              // value={formData.description}
              // onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs p-2">
                {`${errors.password.message}`}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="flex disabled:bg-[#3C3C3C] w-full items-center justify-center rounded-lg bg-login-background p-3 text-base font-semibold text-light md:fit"
          >
            Log in
          </button>
        </form>
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
        <p className='w-3/4 sm:w-full'> Don't have an account? 
          <Link to={'/register'} className="text-blue-600 hover:text-blue-500"> Sign up now</Link>
        </p>

        <span>OR</span>
        </div>

        <Link to={'/google-auth'} className='flex items-center justify-center p-3 space-x-2 rounded-lg border-2 border-gray-300 w-3/4 md:w-5/6 lg:w-2/4 hover:bg-light-white text-center'>
              <img className='h-4 w-6 sm:h-5 sm:w-10' src={AddGoogleIcon}/>
              <span className='font-bold'>Continue with Google</span>
        </Link>

        <Link to={'/github-auth'} className='flex items-center justify-center p-3 space-x-2 rounded-lg border-2 border-gray-300 w-3/4 md:w-5/6 lg:w-2/4 hover:bg-light-white text-center'>
              <img className='h-4 w-6 sm:h-5 sm:w-10' src={AddGithubIcon}/>
              <span className='font-bold'>Continue with Github</span>
        </Link>

      </div>
    </div>
  );
}

export default signin;
