import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '@/pages/signup-page';
import {
  CONFIRMPASSWORD_PLACEHOLDER,
  EMAILINPUT_PLACEHOLDER,
  PASSWORDINPUT_PLACEHOLDER,
  SIGNUPBUTTON_TEXT,
  USERNAME_PLACEHOLDER,
} from '@/constants/images';

export const formSetup = () => {
  const form = render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );

  const usernameInput = form.getByPlaceholderText(USERNAME_PLACEHOLDER);
  const emailInput = form.getByPlaceholderText(EMAILINPUT_PLACEHOLDER);
  const passwordInput = form.getByPlaceholderText(PASSWORDINPUT_PLACEHOLDER);
  const confirmpasswordInput = form.getByPlaceholderText(CONFIRMPASSWORD_PLACEHOLDER);
  const signupbuttonText = form.getByText(SIGNUPBUTTON_TEXT);

  if (
    !(usernameInput instanceof HTMLInputElement) ||
    !(emailInput instanceof HTMLInputElement) ||
    !(passwordInput instanceof HTMLInputElement) ||
    !(confirmpasswordInput instanceof HTMLInputElement) ||
    !(signupbuttonText instanceof HTMLButtonElement)
  ) {
    throw new Error('Issue during test setup, some input elemnts are not rendered');
  }

  return { form, usernameInput, emailInput, passwordInput, confirmpasswordInput, signupbuttonText };
};
