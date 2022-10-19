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
  TwitterBird,
} from '../styles/WelcomePage.styled';
import googleIcon from '../assets/images/2991148.png';
import appleIcon from '../assets/images/154870.png';

const WelcomePage = () => {
  return (
    <MainContainer>
      <SideImage>
        <TwitterBird></TwitterBird>
      </SideImage>
      <MainContent>
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
              <Button bg="#1d9bf0" color="#ffffff">
                Sign up with phone or email
              </Button>
            </ButtonsContainer>
            <ExistingAccountContainer>
              <ExisitngAccountTitle>
                Already have an account?
              </ExisitngAccountTitle>
              <Button bg="transparent" color="#1d9bf0">
                Sign In
              </Button>
            </ExistingAccountContainer>
          </InteractionsContainer>
        </MainContentContainer>
      </MainContent>
    </MainContainer>
  );
};

export default WelcomePage;
