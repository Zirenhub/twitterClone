import { useEffect, useState } from 'react';
import {
  MainContent,
  MainContainer,
  FormContainer,
  CloseButtonContainer,
  CloseButton,
  ErrorMessage,
} from '../../styles/WelcomePageStyles/SignUp.styled';
import validateEmail from './validateEmail';
import validatePassword from './validatePassword';
import { UserAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import getSubmitButton from './getSubmitButton';
import writeUserToDB from './writeUserToDB';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const SignUp = (props) => {
  const { handleClose, setLoading, currentError, setCurrentError } = props;

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
    if (name.length <= 12 && name.length >= 5 && name.toLowerCase() === name) {
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

  const checkIfUserNameIsValid = async () => {
    const docRef = doc(db, 'usernames', name);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNameValid && isPasswordValid && isEmailValid) {
      setLoading(true);
      try {
        const usernameExists = await checkIfUserNameIsValid();
        if (usernameExists) {
          const error = new Error('Username already exists');
          error.code = 'Username already exists';
          throw error;
        }
        const newUser = await createUser(email, password, name);

        const userID = newUser.user.uid;
        const displayName = newUser.user.displayName;

        const promiseUser = await writeUserToDB(userID, displayName);
        if (promiseUser) {
          navigate('/homepage');
        }
      } catch (error) {
        setCurrentError(error.code);
      }
    }
    setLoading(false);
  };

  const submitButton = (color, status) => {
    return getSubmitButton(color, 'Create Account', status);
  };

  return (
    <MainContainer>
      <MainContent>
        <CloseButtonContainer>
          <CloseButton
            data-testid="closeButton"
            onClick={handleClose}
          ></CloseButton>
        </CloseButtonContainer>

        <h1>Create your account</h1>

        <FormContainer onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" onChange={handleNameChange}></input>
          </label>
          {name.length < 5 && (
            <ErrorMessage>
              <p>Name has to be longer than 5 or 5 characters</p>
            </ErrorMessage>
          )}
          {name.length > 12 && (
            <ErrorMessage>
              <p>Name can't be longer than 12 characters</p>
            </ErrorMessage>
          )}
          {name.toLowerCase() !== name && (
            <ErrorMessage>
              <p>Name has to be lowercase</p>
            </ErrorMessage>
          )}
          <label>
            Password
            <input type="password" onChange={handlePasswordChange}></input>
          </label>
          {password.length < 6 && (
            <ErrorMessage>
              <p>Password has to be longer than 6 or 6 characters</p>
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
            ? submitButton('#eff3f4', false)
            : submitButton('#505050f0', true)}
        </FormContainer>
        {currentError && (
          <ErrorMessage style={{ marginLeft: 'auto' }}>
            {currentError}
          </ErrorMessage>
        )}
      </MainContent>
    </MainContainer>
  );
};

export default SignUp;
