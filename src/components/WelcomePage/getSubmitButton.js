import { SubmitButton } from '../../styles/WelcomePageStyles/SignUp.styled';

const getSubmitButton = (color, value, status) => {
  return (
    <SubmitButton type="submit" color={color} disabled={status}>
      {value}
    </SubmitButton>
  );
};

export default getSubmitButton;
