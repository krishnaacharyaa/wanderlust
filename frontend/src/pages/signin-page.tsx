import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { TSignInSchema, signInSchema } from '@/lib/types';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import AuthForm from '@/layouts/auth-form-layout';
import { useNavigate } from 'react-router-dom';

function signin() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: FieldValues) => {
    if (data.email === 'abc@gamil.com') {
      toast.error('Submitting form is failed');
      return;
    }

    // TODO: Server-side validation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
    navigate('/');
  };

  return (
    <AuthForm
      headingText="Sign in to WanderLust"
      actionMessage="Don't have an account"
      actionText="Sign up now"
      routeName="/signup"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-3/4 lg:w-2/5">
        <div className="mb-2">
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm placeholder:text-neutral-500"
          />
          {errors.email && <p className="p-3 text-xs text-red-500">{`${errors.email.message}`}</p>}
        </div>

        <div className="mb-4">
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm placeholder:text-neutral-500"
          />
          {errors.password && (
            <p className="p-3 text-xs text-red-500">{`${errors.password.message}`}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="flex w-full items-center justify-center rounded-lg bg-neutral-800 p-3 text-base font-medium text-light disabled:bg-neutral-600 sm:text-lg sm:font-semibold"
        >
          Sign Up
        </button>
      </form>
    </AuthForm>
  );
}

export default signin;
