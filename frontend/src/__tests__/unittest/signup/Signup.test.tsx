import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { formSetup } from './Client-util';
import {
  INVALID_CONFIRMPWD_ERRORMESSAGE,
  INVALID_EMAIL_ERRORMESSAGE,
  INVALID_PWD_ERRORMESSAGE,
  INVALID_USERNAME_ERRORMESSAGE,
} from '@/constants/Stringconstant';
const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('form', async () => {
  test('should display invalid error message when providing invalid inputs during signup', async () => {
    const userActions = userEvent.setup();
    const {
      form,
      usernameInput,
      emailInput,
      passwordInput,
      confirmpasswordInput,
      signupbuttonText,
    } = await formSetup();
    await userActions.type(usernameInput, 'abcd');
    await userActions.type(emailInput, 'abc@');
    await userActions.type(passwordInput, '123');
    await userActions.type(confirmpasswordInput, '1234');
    await userActions.click(signupbuttonText);
    await waitFor(() => {
      expect(form.getByText(INVALID_USERNAME_ERRORMESSAGE));
      expect(form.getByText(INVALID_EMAIL_ERRORMESSAGE));
      expect(form.getByText(INVALID_PWD_ERRORMESSAGE));
      expect(form.getByText(INVALID_CONFIRMPWD_ERRORMESSAGE));
    });
  });

  test('should call the signup api when all the input values are valid and should redirect to home page', async () => {
    const userActions = userEvent.setup();

    const {
      form,
      usernameInput,
      emailInput,
      passwordInput,
      confirmpasswordInput,
      signupbuttonText,
    } = await formSetup();
    await userActions.type(usernameInput, 'aryastark');
    await userActions.type(emailInput, 'arya@gmail.com');
    await userActions.type(passwordInput, '123456789');
    await userActions.type(confirmpasswordInput, '123456789');
    await userActions.click(signupbuttonText);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
