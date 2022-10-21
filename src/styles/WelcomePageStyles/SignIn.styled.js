import styled from 'styled-components';

export const ResponsiveButtons = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

export const ExtraInformation = styled.div`
  display: flex;
  margin-top: 15px;
  font-size: 5px;
  font-weight: bold;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const ResponsiveSignUp = styled.div`
  display: flex;
  color: #6e7378;

  button {
    background-color: transparent;
    color: #1d9bf0;
    border: none;
    margin-left: 10px;
    cursor: pointer;
  }
`;
