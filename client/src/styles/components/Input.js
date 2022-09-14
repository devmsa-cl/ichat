import styled from 'styled-components';

export default styled.div`
  > * {
    display: block;
  }

  label {
    font-size: var(--font--1);
    padding-bottom: 0.3em;
  }
  input,
  select {
    width: ${(props) => props.$size || '100%'};
    height: 45px;
    font-size: var(--font-0);
    padding: 0 0.4em;
    background-color: ${({ theme }) => theme.colorInput};
    border: 2px solid ${({ theme }) => theme.inputBorder};
    color: inherit;

    :focus {
      outline: none;
      border: 2px solid var(--cl-primary);
    }
  }
`;
