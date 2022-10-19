import { useState } from 'react';
import {
  MainContainer,
  FormContainer,
} from '../../styles/WelcomePageStyles/SignUp.styled';

const SignUp = () => {
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
      </FormContainer>
    </MainContainer>
  );
};

export default SignUp;
