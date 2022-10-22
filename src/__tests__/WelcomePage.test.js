import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import WelcomePage from '../components/WelcomePage/WelcomePage';
import { AuthContextProvider } from '../context/authContext';

afterEach(cleanup);

const user = userEvent.setup();

describe('WelcomePage renders', () => {
  test('Matches snapshot', () => {
    const dom = renderer.create(<WelcomePage />).toJSON();

    expect(dom).toMatchSnapshot();
  });

  test('Main content renders', () => {
    render(<WelcomePage />);

    const signUp = screen.getByRole('button', {
      name: 'Sign up with phone or email',
    });
    const signIn = screen.getByRole('button', {
      name: 'Sign In',
    });

    expect(screen.getByText('Happening now')).toBeInTheDocument();
    expect(signUp).toBeInTheDocument();
    expect(signIn).toBeInTheDocument();
  });
});

describe('Sign up and Sign in windows render', () => {
  test('Sign up form', async () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <WelcomePage />
        </AuthContextProvider>
      </BrowserRouter>
    );

    const signUp = screen.getByRole('button', {
      name: 'Sign up with phone or email',
    });

    await user.click(signUp);

    expect(screen.getByText('Create your account')).toBeInTheDocument();
    expect(screen.queryByText('Happening now')).not.toBeInTheDocument();

    const createAccountButton = screen.getByRole('button', {
      name: 'Create Account',
    });

    expect(createAccountButton).toBeDisabled();

    const nameForm = screen.getByLabelText('Name');

    expect(
      screen.getByText('Name has to be longer than 5 or 5 characters')
    ).toBeInTheDocument();
    await user.type(nameForm, 'ThisIsATest');
    expect(
      screen.queryByText('Name has to be longer than 5 or 5 characters')
    ).not.toBeInTheDocument();
    expect(createAccountButton).toBeDisabled();

    const passwordForm = screen.getByLabelText('Password');

    expect(
      screen.getByText('Password has to be longer than 6 or 6 characters')
    ).toBeInTheDocument();

    await user.type(passwordForm, '12345678910111213');

    expect(
      screen.getByText("Password can't be longer than 16 characters")
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Password has to be longer than 6 or 6 characters')
    ).not.toBeInTheDocument();

    await user.clear(passwordForm);
    await user.type(passwordForm, '12345678');

    expect(
      screen.queryByText('Password has to be longer than 6 or 6 characters')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Password can't be longer than 16 characters")
    ).not.toBeInTheDocument();
    expect(createAccountButton).toBeDisabled();

    const emailForm = screen.getByLabelText('Email');

    expect(screen.getByText('Please enter valid email')).toBeInTheDocument();

    await user.type(emailForm, 'test@');

    expect(screen.getByText('Please enter valid email')).toBeInTheDocument();

    await user.clear(emailForm);
    await user.type(emailForm, 'test@test.com');

    expect(
      screen.queryByText('Please enter valid email')
    ).not.toBeInTheDocument();

    expect(createAccountButton).not.toBeDisabled();

    await user.click(screen.getByTestId('closeButton'));

    expect(screen.queryByText('Create your account')).not.toBeInTheDocument();
    expect(screen.getByText('Happening now')).toBeInTheDocument();
  });

  test('Sign in form', async () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <WelcomePage />
        </AuthContextProvider>
      </BrowserRouter>
    );

    const signIn = screen.getByRole('button', {
      name: 'Sign In',
    });

    await user.click(signIn);

    expect(screen.getByText('Sign in to Twitter')).toBeInTheDocument();
    expect(screen.queryByText('Happening now')).not.toBeInTheDocument();

    const createAccountButton = screen.getByRole('button', {
      name: 'Log In',
    });

    expect(createAccountButton).toBeDisabled();

    // no email or password validation in this component

    const emailForm = screen.getByLabelText('Email');

    await user.type(emailForm, 'test@test.com');
    expect(createAccountButton).toBeDisabled();

    const passwordForm = screen.getByLabelText('Password');
    await user.type(passwordForm, '123123123');
    expect(createAccountButton).not.toBeDisabled();

    await user.click(screen.getByTestId('closeButton'));

    expect(screen.queryByText('Sign in to Twitter')).not.toBeInTheDocument();
    expect(screen.getByText('Happening now')).toBeInTheDocument();
  });

  test('From Sign in to Sign up', async () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <WelcomePage />
        </AuthContextProvider>
      </BrowserRouter>
    );
    const signIn = screen.getByRole('button', {
      name: 'Sign In',
    });

    await user.click(signIn);

    const signUpButton = screen.getByRole('button', {
      name: 'Sign up',
    });

    await user.click(signUpButton);

    expect(screen.queryByText('Sign in to Twitter')).not.toBeInTheDocument();
    expect(screen.queryByText('Happening now')).not.toBeInTheDocument();

    expect(screen.getByText('Create your account')).toBeInTheDocument();
  });
});
