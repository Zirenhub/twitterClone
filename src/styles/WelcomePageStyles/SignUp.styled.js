import styled from 'styled-components';
import X from '../../assets/images/211652_close_icon.svg';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  padding: 15px 20px;
  height: 100%;
  max-width: fit-content;
  align-self: center;
  min-width: 80%;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 30px;
    color: #e7e9ea;
  }
`;

export const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.div`
  background-image: url(${X});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 18px;
  height: 18px;
  cursor: pointer;
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(31deg)
    brightness(110%) contrast(102%);
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  label {
    width: 100%;
    color: #65696e;

    input {
      padding: 10px;
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 3px;
      outline: none;
      color: #ffffff;
      width: 100%;
    }

    input:focus {
      border: 1px solid #1d9bf0;
    }
  }
`;

export const ErrorMessage = styled.div`
  font-weight: bold;
  color: #cf3838;
`;

export const SubmitButton = styled.input`
  width: 100%;
  background-color: ${(props) => props.color};
  outline: none;
  border: none;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;
