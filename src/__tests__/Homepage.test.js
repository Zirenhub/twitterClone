import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { AuthContextProvider, UserContext } from '../context/authContext';
import HomePage from '../components/HomePage/HomePage';

afterEach(cleanup);

const userTest = userEvent.setup();

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

  test('Main content renders user is logged in', async () => {
    const user = {
      displayName: 'Ziren',
    };

    render(
      <AuthContextProvider>
        <UserContext.Provider value={{ user }}>
          <HomePage />
        </UserContext.Provider>
      </AuthContextProvider>
    );

    expect(await screen.findByText('Hello Ziren')).toBeInTheDocument();
  });

  test('Main content renders user is logged out', async () => {
    render(
      <AuthContextProvider>
        <UserContext.Provider value={{}}>
          <HomePage />
        </UserContext.Provider>
      </AuthContextProvider>
    );

    expect(await screen.findByText('Hello Guest')).toBeInTheDocument();
  });
});
