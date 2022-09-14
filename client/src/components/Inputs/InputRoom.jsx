import React from 'react';
import InputStyle from '../../styles/components/Input';
function InputRoom({ room, labelText, name, onChangeHandle, currentValue }) {
  return (
    <InputStyle $size={'45%'}>
      <label htmlFor={name}>{labelText}</label>
      <select
        name={name}
        id={name}
        value={currentValue}
        onChange={(e) =>
          onChangeHandle(e.target.options[e.target.options.selectedIndex].value)
        }
      >
        {room.map((r, i) => {
          return (
            <option
              value={r}
              key={i}
              //   selected={currentValue === r ? true : false}
            >
              {r}
            </option>
          );
        })}
      </select>
    </InputStyle>
  );
}

export default InputRoom;
