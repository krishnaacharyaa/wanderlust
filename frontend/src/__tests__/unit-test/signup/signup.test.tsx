import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { formSetup } from './client-utils';
import {
  CONFIRMPASSWORD_EMPTY_ERRORMESSAGE,
  EMAIL_EMPTY_ERRORMESSAGE,
  INVALID_CONFIRMPWD_ERRORMESSAGE,
  INVALID_PWD_ERRORMESSAGE,
  NAME_EMPTY_ERRORMESSAGE,
  PASSWORD_EMPTY_ERRORMESSAGE,
  USERNAME_EMPTY_ERRORMESSAGE,
} from '@/constants/images';
import { toast } from 'react-toastify';

interface sucessdata {
  status: number;
  message: string;
}

interface errordata {
  status: number;
  message: string;
}

interface Messages {
  success: {
    render: (data: { data: sucessdata }) => void;
  };
  error: {
    render: (error: { error: errordata }) => void;
  };
}
const mockedUseNavigate = vi.fn();
// Mocking the useNavigate hook from React Router DOM
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

// Mock react-toastify's toast.promise
vi.mock('react-toastify', () => ({
  toast: {
    promise: vi.fn((promise: Promise<sucessdata>, messages: Messages) => {
      return promise.then(
        (data: sucessdata) => {
          messages.success.render({ data });
          return data;
        },
        (error: errordata) => {
          messages.error.render({ error });
          throw error;
        }
      );
    }),
  },
}));

describe('Unit Tests : Signup Component', async () => {
  test('Signup : Failure - Invalid Email Address', async () => {
    const userActions = userEvent.setup();
    const { emailInput, signupbuttonText } = await formSetup();

    await userActions.type(emailInput, 'abc@');
    await userActions.click(signupbuttonText);
    await waitFor(() => {
      //should need to trigger the default HTML validation error message
      expect(emailInput.validity.typeMismatch).toBe(true);
    });
  });
  test('Signup : Failure - Confirm Password is not same as Password', async () => {
    const userActions = userEvent.setup();
    const {
      form,
      usernameInput,
      emailInput,
      passwordInput,
      confirmpasswordInput,
      signupbuttonText,
      nameInput,
    } = await formSetup();
    await userActions.type(usernameInput, 'aryastark');
    await userActions.type(nameInput, 'arya');
    await userActions.type(emailInput, 'arya@gmail.com');
    await userActions.type(passwordInput, 'Test@1234');
    await userActions.type(confirmpasswordInput, 'Tesr@1897');
    await userActions.click(signupbuttonText);
    await waitFor(() => {
      expect(form.getByText(INVALID_CONFIRMPWD_ERRORMESSAGE)).toBeInTheDocument();
    });
  });
  /*
  test('Signup : Failure - Invalid Username', async () => {
    const userActions = userEvent.setup();
    const {
      form,
      usernameInput,
      emailInput,
      passwordInput,
      confirmpasswordInput,
      signupbuttonText,
      nameInput
    } = await formSetup();
    await userActions.type(usernameInput, 'ary');
    await userActions.type(nameInput,'arya')
    await userActions.type(emailInput, 'arya@gmail.com');
    await userActions.type(passwordInput, 'Test@1234');
    await userActions.type(confirmpasswordInput, 'Test@1234');
    await userActions.click(signupbuttonText);
    await waitFor(() => {
      expect(form.getByText(INVALID_USERNAME_ERRORMESSAGE)).toBeInTheDocument();
    });
  });
  */

  test('Signup : Failure - Form is submitted without any values', async () => {
    const userActions = userEvent.setup();
    const { form, signupbuttonText } = await formSetup();
    await userActions.click(signupbuttonText);
    await waitFor(() => {
      expect(form.getByText(USERNAME_EMPTY_ERRORMESSAGE)).toBeInTheDocument();
      expect(form.getByText(NAME_EMPTY_ERRORMESSAGE)).toBeInTheDocument();
      expect(form.getByText(EMAIL_EMPTY_ERRORMESSAGE)).toBeInTheDocument();
      expect(form.getByText(PASSWORD_EMPTY_ERRORMESSAGE)).toBeInTheDocument();
      expect(form.getByText(CONFIRMPASSWORD_EMPTY_ERRORMESSAGE)).toBeInTheDocument();
    });
  });

  test('should display invalid error message when providing invalid inputs during signup', async () => {
    const userActions = userEvent.setup();
    const {
      form,
      usernameInput,
      emailInput,
      passwordInput,
      confirmpasswordInput,
      signupbuttonText,
      nameInput,
    } = await formSetup();
    await userActions.type(usernameInput, 'abcd');
    await userActions.type(nameInput, 'ab');
    await userActions.type(emailInput, 'abc@gmail.com');
    await userActions.type(passwordInput, '123');
    await userActions.type(confirmpasswordInput, '1234');
    await userActions.click(signupbuttonText);
    await waitFor(() => {
      expect(form.getByText(NAME_EMPTY_ERRORMESSAGE)).toBeInTheDocument();
      expect(form.getByText(INVALID_PWD_ERRORMESSAGE)).toBeInTheDocument();
      expect(form.getByText(INVALID_CONFIRMPWD_ERRORMESSAGE)).toBeInTheDocument();
    });
  });

  test('should call the signup api when all the input values are valid and should redirect to home page', async () => {
    const userActions = userEvent.setup();
    const mockedToastPromise = toast.promise;

    const {
      usernameInput,
      emailInput,
      passwordInput,
      confirmpasswordInput,
      signupbuttonText,
      nameInput,
    } = await formSetup();
    await userActions.type(nameInput, 'arya');
    await userActions.type(usernameInput, 'aryastark');
    await userActions.type(emailInput, 'arya@gmail.com');
    await userActions.type(passwordInput, 'Test@1234');
    await userActions.type(confirmpasswordInput, 'Test@1234');
    await userActions.click(signupbuttonText);

    await waitFor(() => {
      expect(mockedToastPromise).toHaveBeenCalled();
      expect(mockedUseNavigate).toHaveBeenCalled();
    });
  });
});
