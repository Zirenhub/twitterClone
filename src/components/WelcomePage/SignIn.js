import {
  CloseButton,
  CloseButtonContainer,
  FormContainer,
  MainContent,
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
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp.js';
import getSubmitButton from './getSubmitButton.js';
import googleIcon from '../../assets/images/2991148.png';
import appleIcon from '../../assets/images/154870.png';

const SignIn = (props) => {
  const { handleClose, setLoading, currentError, setCurrentError } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSingUp, setShowSingUp] = useState(false);

  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      try {
        setLoading(true);
        await signIn(email, password);
        navigate('/homepage');
      } catch (error) {
        setCurrentError(error.code);
      }
    }
    setLoading(false);
  };

  const submitButton = (color, status) => {
    return getSubmitButton(color, 'Log In', status);
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
              <CloseButton
                data-testid="closeButton"
                onClick={handleClose}
              ></CloseButton>
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
                ? submitButton('#eff3f4', false)
                : submitButton('#505050f0', true)}
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
