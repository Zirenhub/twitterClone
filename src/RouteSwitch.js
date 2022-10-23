import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import HomePage from './components/HomePage/HomePage';
import GlobalStyle from './styles/Global.styled';
import { AuthContextProvider } from './context/authContext';
import Tweet from './components/HomePage/Tweet';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/tweet" element={<Tweet />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default RouteSwitch;
