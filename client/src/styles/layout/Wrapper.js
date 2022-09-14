import styled from 'styled-components';

export default styled.div`
  max-width: var(--max-width);
  margin: 0 auto;

  &.center {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .container {
      width: auto;
    }
  }

  .container {
    padding: 1.2rem;
    width: 100%;
  }
`;
