import styled from 'styled-components';

export default styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 0 20px rgb(0 0 0 / 12%);
  padding: ${(props) => props.$padding || '1.3rem'};
  border-radius: 5px;

  @media (min-width: 550px) {
    width: clamp(100px, 500px, 650px);
  }

  h2 {
    letter-spacing: 1px;
    font-size: var(--font--1);
    margin-bottom: 1em;
  }

  form > * {
    margin: 0.8rem 0;
  }
`;
