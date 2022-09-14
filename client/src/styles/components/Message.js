import styled, { css } from 'styled-components';

export default styled.div`
  width: 65%;

  > header {
    font-size: var(--font--2);
    padding: 0.8em 0.4em;
    display: flex;
    align-items: flex-end;
    gap: 1.2em;

    opacity: 0.7;
    span {
      font-size: 0.7rem;
    }
  }

  > p {
    font-size: var(--font--2);
    padding: 1em;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.messageBg};
  }

  @media (min-width: 400px) {
    width: max-content;
    max-width: 300px;
  }

  @media (min-width: 768px) {
    min-width: 300px;
    width: max-content;
    max-width: 600px;
  }

  ${(props) =>
    props.me
      ? css`
          align-self: flex-end;

          > p {
            /* hsl(0deg 0% 41%) */
            background-color: var(--cl-primary);
            color: #fff;
          }
        `
      : undefined}
`;
