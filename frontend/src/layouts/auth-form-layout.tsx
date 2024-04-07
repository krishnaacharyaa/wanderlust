import AddGoogleIcon from '@/assets/svg/google-color-icon.svg';
import AddGithubIcon from '@/assets/svg/github-icon.svg';
import { Link } from 'react-router-dom';

interface FormProp {
  headingText: string;
  actionMessage: string;
  actionText: string;
  routeName: string;
  children: React.ReactNode;
}

function authForm({ headingText, actionMessage, actionText, routeName, children }: FormProp) {
  return (
    <>
      <div className="m-4 flex-grow cursor-default bg-white py-4">
        <div className="mb-4 flex justify-center">
          <div className="flex w-full items-center justify-center">
            <h2 className="w-3/4 text-center text-lg font-bold text-black sm:text-xl">
              {headingText}
            </h2>
          </div>
        </div>
        <div className="m-2 mt-8 flex flex-col items-center justify-center gap-2">
          {children}
          <div className="mt-2 flex w-5/6 flex-col items-center justify-center gap-4 text-center text-sm font-normal sm:text-base">
            <p>
              {actionMessage}
              <Link to={routeName} className="text-blue-600 hover:text-blue-500">
                {' '}
                {actionText}
              </Link>
            </p>

            <span>OR</span>
          </div>

          <Link
            to={'/google-auth'}
            className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-b-4  border-gray-300 p-3 text-center hover:bg-gray-50 md:w-3/4 lg:w-2/5"
          >
            <img className="h-4 w-6 pl-1 sm:h-5 sm:w-10" src={AddGoogleIcon} />
            <span className="text-sm sm:text-base">Continue with Google</span>
          </Link>

          <Link
            to={'/github-auth'}
            className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-b-4 border-gray-300 p-3 text-center hover:bg-gray-50 md:w-3/4 lg:w-2/5"
          >
            <img className="h-4 w-6 sm:h-5 sm:w-10" src={AddGithubIcon} />
            <span className="text-sm sm:text-base">Continue with Github</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default authForm;
