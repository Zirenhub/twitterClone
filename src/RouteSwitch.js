import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import HomePage from './components/HomePage/HomePage';
import GlobalStyle from './styles/Global.styled';
import { AuthContextProvider } from './context/authContext';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default RouteSwitch;
