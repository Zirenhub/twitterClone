import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { AuthContextProvider } from '../context/authContext';
import HomePage from '../components/HomePage/HomePage';

afterEach(cleanup);

const user = userEvent.setup();

describe('HomePage renders', () => {
  test('Matches snapshot', () => {
    const dom = renderer
      .create(
        <AuthContextProvider>
          <HomePage />
        </AuthContextProvider>
      )
      .toJSON();

    expect(dom).toMatchSnapshot();
  });

  test('Main content renders', async () => {
    render(
      <AuthContextProvider>
        <HomePage />
      </AuthContextProvider>
    );

    expect(screen.getByText(/Hello (.*)$/)).toBeInTheDocument();
  });
});
