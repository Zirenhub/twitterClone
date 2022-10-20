import { useState } from 'react';
import {
  MainContent,
  MainContainer,
  FormContainer,
  CloseButtonContainer,
  CloseButton,
} from '../../styles/WelcomePageStyles/SignUp.styled';

const SignUp = (props) => {
  const { handleClose } = props;

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <MainContainer>
      <CloseButtonContainer>
        <CloseButton onClick={handleClose}></CloseButton>
      </CloseButtonContainer>

      <MainContent>
        <h1>Create your account</h1>

        <FormContainer onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" onChange={handleNameChange}></input>
          </label>
          <label>
            Password
            <input type="password" onChange={handlePasswordChange}></input>
          </label>
          <label>
            Email
            <input type="email" onChange={handleEmailChange}></input>
          </label>
          <input type="submit" value="Create Account"></input>
        </FormContainer>
      </MainContent>
    </MainContainer>
  );
};

export default SignUp;
