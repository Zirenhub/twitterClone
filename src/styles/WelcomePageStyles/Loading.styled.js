import styled from 'styled-components';

export const LoadingStyled = styled.div`
  display: flex;
  flex-grow: 1;
  /* max-width: 600px; */
  border-left: 1px solid #2f3336;
  border-right: 1px solid #2f3336;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background-color: black;
  color: #ffffff;
  height: 100%;
  letter-spacing: 5px;
  font-weight: 700;

  @media (min-width: 500px) {
    margin-right: auto;
  }
`;
