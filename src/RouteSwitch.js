import { Routes, Route, useLocation } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import HomePage from './components/HomePage/HomePage';
import GlobalStyle from './styles/Global.styled';
import { AuthContextProvider } from './context/authContext';
import Tweet from './utils/Tweet';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProtectedRoute from './utils/ProtectedRoute';

const RouteSwitch = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <AuthContextProvider>
      <GlobalStyle />
      <Routes location={background || location}>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tweet"
          element={
            <ProtectedRoute>
              <Tweet />
            </ProtectedRoute>
          }
        />
      </Routes>

      {background && (
        <Routes>
          <Route path="tweet" element={<Tweet />} />
        </Routes>
      )}
    </AuthContextProvider>
  );
};

export default RouteSwitch;
