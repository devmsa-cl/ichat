import styled from 'styled-components';

export default styled.div`
  font-size: 1rem;
  margin-top: 2.5rem;
  height: calc(100vh - 2.5rem);
  position: relative;

  @media (min-width: 1080px) {
    display: flex;
    height: 90vh;
    flex-direction: row-reverse;
    background-color: ${({ theme }) => theme.boxBgAscent};
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.125);
    border-radius: 10px;
    overflow: hidden;
  }

  .chat {
    height: 100%;
    display: flex;
    flex-direction: column;

    @media (min-width: 1080px) {
      flex: 2;
    }
  }

  .messages > * {
    margin: 1em 0;
  }

  .messages {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 1.3em;
  }
  .message-input {
    margin-top: auto;
  }
  .panel {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 300px;
    height: 100vh;
    background-color: ${({ theme }) => theme.bgPrimary};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.3em;
    transform: translateX(-300px);
    transition: transform 0.3s;

    &.show {
      transform: translateX(0px);

      .toggle {
        right: 10px;
        fill: white;
      }
    }

    @media (min-width: 1080px) {
      position: relative;
      transform: translateX(0px);
      flex: 1;
      height: 100%;
    }

    .toggle {
      position: absolute;
      right: -30px;
      top: 10px;
      font-size: 1.2rem;
    }

    .user {
      width: 150px;
      height: 200px;
      color: #fff;

      figure {
        height: inherit;
        width: inherit;

        text-align: center;
        img {
          width: 100%;
          height: 80%;
          border-radius: 100%;
          border: 5px solid #eee;
        }

        figcaption {
          height: 20%;
        }
      }
    }

    .room-users {
      margin: 2rem 0;
      color: #fff;
      height: calc(100vh - 2.6em - 200px - 2rem - 10%);

      overflow-y: auto;

      h4 {
        font-size: var(--font-0);
        padding: 0.8em 0;
      }

      ul {
        list-style-type: none;
        column-count: 2;

        li {
          font-size: var(--font--1);
          padding: 0.4em 0;
        }
      }
    }
  }
`;
