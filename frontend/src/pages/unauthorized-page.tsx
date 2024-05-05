import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function notAuthorizedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <>
      <div className="flex flex-grow items-center justify-center mx-2 bg-gray-100 text-lg">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-semibold text-red-600 md:text-5xl">
            Oops, sorry!
          </h2>
          <p className="text-base text-zinc-900 md:text-lg">
            You are not authorized for this page.
          </p>
          <Link
            to={'/'}
            className="mt-4 rounded-md border bg-zinc-900 hover:bg-zinc-800 px-4 py-2 text-center text-white "
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}

export default notAuthorizedPage;
