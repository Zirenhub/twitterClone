import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { AuthContextProvider, UserContext } from '../context/authContext';
import WelcomePage from '../components/WelcomePage/WelcomePage';
import HomePage from '../components/HomePage/HomePage';
import { createMemoryHistory } from '@remix-run/router';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';

afterEach(cleanup);

// const userTest = userEvent.setup();
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('HomePage renders or doesnt, if user is valid or not', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('HomePage renders / user is logged in', () => {
    const user = {
      firestoreDate: 'October 26, 2022 at 2:42:21 PM UTC+3',
      followers: {},
      following: {},
      key: '238f65b9-47f4-49a3-8a70-8d2462912d7e',
      tweetsNum: 0,
      userName: 'ZirenOS',
    };

    render(
      <AuthContextProvider>
        <UserContext.Provider value={{ user }}>
          <WelcomePage />
        </UserContext.Provider>
      </AuthContextProvider>
    );

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });

  test('HomePage does not render / user is logged out', () => {
    const user = null;

    render(
      <AuthContextProvider>
        <UserContext.Provider value={{ user }}>
          <WelcomePage />
        </UserContext.Provider>
      </AuthContextProvider>
    );

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(0);
  });
});

// test('Matches snapshot', () => {
//   const dom = renderer
//     .create(
//       <AuthContextProvider>
//         <HomePage />
//       </AuthContextProvider>
//     )
//     .toJSON();
//   expect(dom).toMatchSnapshot();
// });

// describe('HomePage renders', () => {
//   test('HomePage content renders', async () => {
//     const user = {
//       firestoreDate: 'October 26, 2022 at 2:42:21 PM UTC+3',
//       followers: {},
//       following: {},
//       key: '238f65b9-47f4-49a3-8a70-8d2462912d7e',
//       tweetsNum: 0,
//       userName: 'ZirenOS',
//     };

//     const history = createMemoryHistory();

//     render(
//       await act(async () => {
//         <AuthContextProvider>
//           <UserContext.Provider value={{ user }}>
//             <BrowserRouter>
//               <HomePage location={history} />
//             </BrowserRouter>
//           </UserContext.Provider>
//         </AuthContextProvider>;
//       })
//     );

//     expect(await screen.findByText('Latest Tweets')).toBeInTheDocument();
//   });
// });
