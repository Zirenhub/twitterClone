import {
  CloseButton,
  CloseButtonContainer,
  FormContainer,
  MainContent,
  SubmitButton,
  MainContainer,
  ErrorMessage,
} from '../../styles/WelcomePageStyles/SignUp.styled.js';
import {
  ExtraInformation,
  ResponsiveButtons,
  ResponsiveSignUp,
} from '../../styles/WelcomePageStyles/SignIn.styled.js';
import {
  Button,
  LineSeperator,
} from '../../styles/WelcomePageStyles/WelcomePage.styled.js';
import { useState } from 'react';
import { UserAuth } from '../../context/authContext.js';
import SignUp from './SignUp.js';
import googleIcon from '../../assets/images/2991148.png';
import appleIcon from '../../assets/images/154870.png';
import { useNavigate } from 'react-router-dom';

const SignIn = (props) => {
  const { handleClose } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSingUp, setShowSingUp] = useState(false);
  const [currentError, setCurrentError] = useState(null);

  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const getSubmitButton = (color) => {
    return (
      <SubmitButton type="submit" value="Log In" color={color}></SubmitButton>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      try {
        await signIn(email, password);
        navigate('/homepage');
      } catch (error) {
        setCurrentError(error.code);
      }
    }
  };

  const handleSignUp = () => {
    setShowSingUp(true);
  };

  return (
    <>
      {showSingUp ? (
        <SignUp handleClose={handleClose}></SignUp>
      ) : (
        <MainContainer style={{ padding: 20 }}>
          <MainContent>
            <CloseButtonContainer>
              <CloseButton onClick={handleClose}></CloseButton>
            </CloseButtonContainer>

            <h1>Sign in to Twitter</h1>

            <ResponsiveButtons>
              <Button bg="#ffffff" color="#0f1419" icon={googleIcon}>
                Sign in with Google
              </Button>
              <Button bg="#ffffff" color="#0f1419" icon={appleIcon}>
                Sign in with Apple
              </Button>
            </ResponsiveButtons>
            <LineSeperator>or</LineSeperator>
            <FormContainer onSubmit={handleSubmit}>
              <label>
                Email
                <input type="email" onChange={handleEmailChange}></input>
              </label>
              <label>
                Password
                <input type="password" onChange={handlePasswordChange}></input>
              </label>
              {email && password
                ? getSubmitButton('#eff3f4')
                : getSubmitButton('#505050f0')}
            </FormContainer>
            <ExtraInformation>
              <ResponsiveSignUp>
                <p>Don't have an account?</p>
                <button onClick={handleSignUp}>Sign up</button>
              </ResponsiveSignUp>

              {currentError && (
                <ErrorMessage style={{ marginLeft: 'auto' }}>
                  {currentError}
                </ErrorMessage>
              )}
            </ExtraInformation>
          </MainContent>
        </MainContainer>
      )}
    </>
  );
};

export default SignIn;
