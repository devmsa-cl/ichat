import styled from 'styled-components';

export default styled.div`
  height: 100%;
  padding: 1.3em;
  /* background-color: #eaeaea; */
  background-color: ${({ theme }) => theme.boxBg};
  position: relative;

  @media (min-width: 1080px) {
    background-color: ${({ theme }) => theme.boxBgAscent};
  }

  .message {
    height: 100%;
    padding: 1.5em 2.8rem 1.5em 2em;
    background-color: ${({ theme }) => theme.boxBgAscent};
    border-radius: 30px;
    display: inline-block;
    width: 100%;

    @media (min-width: 1080px) {
      background-color: ${({ theme }) => theme.boxBgAscent2};
    }

    &.active::after {
      display: none;
    }

    :focus {
      outline: none;
      height: auto;
    }
    ::after {
      content: 'Type your message...';
      color: #878787;
    }
  }

  > svg {
    position: absolute;
    right: 35px;
    bottom: 44px;
    font-size: 1.5rem;
    fill: var(--cl-primary);
    cursor: pointer;
  }
`;
