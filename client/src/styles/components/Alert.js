import styled, { css } from 'styled-components';

export default styled.div`
  font-size: var(--font--1);
  padding: 0.7em 1.3em;
  border-radius: 4px;
  border: 1px solid;
  margin: 1em 0;

  ${(props) => {
    switch (props.$type) {
      case 'success':
        return css`
          background-color: #e7ffe9;
          border-color: green;
          color: #014e01;
        `;
        break;

      case 'warning':
        return css`
          background-color: #fff3cd;
          border-color: #ffeeba;
          color: #856404;
        `;
        break;

      default:
        return css`
          background-color: #fcd4d4;
          border-color: #9b0909;
          color: #a53030;
        `;
    }
  }}/* background-color: ${(props) => {
    if (props.danger) return '#fcd4d4';
    if (props.success) return '#e7ffe9';
    if (props.warning) return '#fff3cd';
  }};

  border-color: ${(props) => {
    if (props.danger) return '#9b0909';
    if (props.success) return 'green';
    if (props.warning) return '#ffeeba';
  }};

  color: ${(props) => {
    if (props.danger) return '#a53030';
    if (props.success) return '#014e01';
    if (props.warning) return '#856404';
  }}; */
`;
