import React from 'react';
import InputStyle from '../../styles/components/Input';
function InputGroup({ type, labelText, name, onChange, placeholder }) {
  return (
    <InputStyle>
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </InputStyle>
  );
}

export default InputGroup;
