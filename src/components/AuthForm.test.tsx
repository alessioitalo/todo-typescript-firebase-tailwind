import AuthForm from './AuthForm';
import { screen, render, fireEvent } from '@testing-library/react';
import { firebaseConfig } from '../firebase.config';
import { initializeApp } from 'firebase/app';
import { ToastContainer } from 'react-toastify';

const setup = () =>
  render(
    <>
      <ToastContainer />
      <AuthForm />
    </>
  );

describe('AuthForm Component', () => {
  beforeAll(() => {
    initializeApp(firebaseConfig);
  });
  it('should not validate empty email and password', async () => {
    setup();
    const submit = screen.getByRole('button');
    fireEvent.click(submit);
    expect(
      await screen.findByText(/please fill all fields/i)
    ).toBeInTheDocument();
  });

  it('should not login with made up credentials', async () => {
    setup();
    const emailField = screen.getByPlaceholderText(/your email/i);
    const passwordField = screen.getByPlaceholderText(/your password/i);
    const submit = screen.getByRole('button');
    fireEvent.change(emailField, {
      target: { value: 'non-existent@noemail.com' },
    });
    fireEvent.change(passwordField, {
      target: { value: 'non-existent-password' },
    });
    fireEvent.click(submit);
    expect(
      await screen.findByText(/login was unsuccessful/i)
    ).toBeInTheDocument();
  });
});
