import {
  MainContainer,
  SideImage,
  MainContent,
  MainTitle,
  MainContentContainer,
  InteractionsContainer,
  InteractionsTitle,
  ButtonsContainer,
  Button,
  LineSeperator,
  ExisitngAccountTitle,
  ExistingAccountContainer,
} from '../../styles/WelcomePageStyles/WelcomePage.styled';
import googleIcon from '../../assets/images/2991148.png';
import appleIcon from '../../assets/images/154870.png';
import twitterLogo from '../../assets/images/iconmonstr-twitter-1.svg';
import { useEffect, useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { LoadingStyled } from '../../styles/WelcomePageStyles/Loading.styled';
import { UserAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentError, setCurrentError] = useState(null);

  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/homepage');
  }, []);

  const handleShowSignUp = () => {
    setShowSignUp(true);
  };

  const handleShowSignIn = () => {
    setShowSignIn(true);
  };

  const handleClose = () => {
    setShowSignUp(false);
    setShowSignIn(false);
  };

  useEffect(() => {
    // clear error message when signin or signup page is closed
    return () => {
      setCurrentError(null);
    };
  }, [showSignIn, showSignUp]);

  const Welcome = () => {
    return (
      <MainContentContainer>
        <MainTitle>Happening now</MainTitle>
        <InteractionsContainer>
          <InteractionsTitle>Join Twitter today.</InteractionsTitle>
          <ButtonsContainer>
            <Button bg="#ffffff" color="#0f1419" icon={googleIcon}>
              Sign up with Google
            </Button>
            <Button bg="#ffffff" color="#0f1419" icon={appleIcon}>
              Sign up with Apple
            </Button>
            <LineSeperator>or</LineSeperator>
            <Button bg="#1d9bf0" color="#ffffff" onClick={handleShowSignUp}>
              Sign up with phone or email
            </Button>
          </ButtonsContainer>
          <ExistingAccountContainer>
            <ExisitngAccountTitle>
              Already have an account?
            </ExisitngAccountTitle>
            <Button bg="transparent" color="#1d9bf0" onClick={handleShowSignIn}>
              Sign In
            </Button>
          </ExistingAccountContainer>
        </InteractionsContainer>
      </MainContentContainer>
    );
  };

  return (
    <>
      {loading ? (
        <LoadingStyled>Loading</LoadingStyled>
      ) : (
        <MainContainer>
          <SideImage>
            <img src={twitterLogo} alt="twitter logo"></img>
          </SideImage>
          <MainContent>
            {showSignUp && (
              <SignUp
                handleClose={handleClose}
                setLoading={setLoading}
                currentError={currentError}
                setCurrentError={setCurrentError}
              ></SignUp>
            )}
            {showSignIn && (
              <SignIn
                handleClose={handleClose}
                setLoading={setLoading}
                currentError={currentError}
                setCurrentError={setCurrentError}
              ></SignIn>
            )}
            {!showSignUp && !showSignIn && Welcome()}
          </MainContent>
        </MainContainer>
      )}
    </>
  );
};

export default WelcomePage;
