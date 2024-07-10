import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signin from '@/pages/signin-page';
import {
  PASSWORDINPUT_PLACEHOLDER,
  SIGNINBUTTON_TEXT,
  SIGNIN_EMAIL_PLACEHOLDER,
} from '@/constants/images';

export const formSetup = () => {
  const form = render(
    <BrowserRouter>
      <Signin />
    </BrowserRouter>
  );

  const usernameInput = form.getByPlaceholderText(SIGNIN_EMAIL_PLACEHOLDER);

  const passwordInput = form.getByPlaceholderText(PASSWORDINPUT_PLACEHOLDER);

  const signinbuttonText = form.getByText(SIGNINBUTTON_TEXT);

  if (
    !(usernameInput instanceof HTMLInputElement) ||
    !(passwordInput instanceof HTMLInputElement) ||
    !(signinbuttonText instanceof HTMLButtonElement)
  ) {
    throw new Error('Issue during test setup, some input elemnts are not rendered');
  }

  return { form, usernameInput, passwordInput, signinbuttonText };
};
