import styled from 'styled-components';

export default styled.button`
  cursor: pointer;
  font-size: ${(props) => props.$size || 'var(--font--1)'};
  padding: 0.5em 2em;
  border: 1.25px solid #ddd;
  color: #fff;
  border-radius: 4px;
  background-color: ${(props) => {
    if (props.primary) return 'var(--cl-primary)';
    if (props.secondary) return 'var(--cl-secondary)';
  }};
`;
