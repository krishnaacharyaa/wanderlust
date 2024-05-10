import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { formSetup } from './Client-util';
import {
  VALID_EMAIL_INPUT,
  VALID_USERNAME_INPUT,
  VALID_CONFIRMPWD_INPUT,
  VALID_PWD_INPUT,
  INVALID_CONFIRMPWD_ERRORMESSAGE,
  INVALID_CONFIRMPWD_INPUT,
  INVALID_EMAIL_ERRORMESSAGE,
  INVALID_EMAIL_INPUT,
  INVALID_PWD_ERRORMESSAGE,
  INVALID_PWD_INPUT,
  INVALID_USERNAME_ERRORMESSAGE,
  INVALID_USERNAME_INPUT,
} from '@/__tests__/Stringconstant';
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
    await userActions.type(usernameInput, INVALID_USERNAME_INPUT);
    await userActions.type(emailInput, INVALID_EMAIL_INPUT);
    await userActions.type(passwordInput, INVALID_PWD_INPUT);
    await userActions.type(confirmpasswordInput, INVALID_CONFIRMPWD_INPUT);
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
    await userActions.type(usernameInput, VALID_USERNAME_INPUT);
    await userActions.type(emailInput, VALID_EMAIL_INPUT);
    await userActions.type(passwordInput, VALID_PWD_INPUT);
    await userActions.type(confirmpasswordInput, VALID_CONFIRMPWD_INPUT);
    await userActions.click(signupbuttonText);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
