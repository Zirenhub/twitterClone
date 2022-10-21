import { useEffect, useState } from 'react';
import {
  MainContent,
  MainContainer,
  FormContainer,
  CloseButtonContainer,
  CloseButton,
  ErrorMessage,
  SubmitButton,
} from '../../styles/WelcomePageStyles/SignUp.styled';
import validateEmail from './validateEmail';
import validatePassword from './validatePassword';
import { UserAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const { handleClose } = props;

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (name.length <= 12 && name.length >= 5) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  }, [name]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (validatePassword(password)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (validateEmail(email) && email !== '') {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNameValid && isPasswordValid && isEmailValid) {
      try {
        await createUser(email, password, name);
        navigate('/homepage');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getSubmitButton = (color) => {
    return (
      <SubmitButton
        type="submit"
        value="Create Account"
        color={color}
      ></SubmitButton>
    );
  };

  return (
    <MainContainer>
      <MainContent>
        <CloseButtonContainer>
          <CloseButton onClick={handleClose}></CloseButton>
        </CloseButtonContainer>

        <h1>Create your account</h1>

        <FormContainer onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" onChange={handleNameChange}></input>
          </label>
          {name.length < 5 && (
            <ErrorMessage>
              <p>Name has to be longer than 5 characters</p>
            </ErrorMessage>
          )}
          {name.length > 12 && (
            <ErrorMessage>
              <p>Name can't be longer than 12 characters</p>
            </ErrorMessage>
          )}
          <label>
            Password
            <input type="password" onChange={handlePasswordChange}></input>
          </label>
          {password.length < 6 && (
            <ErrorMessage>
              <p>Password has to be longer than 6 characters</p>
            </ErrorMessage>
          )}
          {password.length > 16 && (
            <ErrorMessage>
              <p>Password can't be longer than 16 characters</p>
            </ErrorMessage>
          )}
          <label>
            Email
            <input type="email" onChange={handleEmailChange}></input>
          </label>
          {!isEmailValid && (
            <ErrorMessage>
              <p>Please enter valid email</p>
            </ErrorMessage>
          )}
          {isNameValid && isEmailValid && isPasswordValid
            ? getSubmitButton('#eff3f4')
            : getSubmitButton('#505050f0')}
        </FormContainer>
      </MainContent>
    </MainContainer>
  );
};

export default SignUp;
