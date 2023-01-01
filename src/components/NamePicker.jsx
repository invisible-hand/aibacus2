import { useState } from 'react';

const Name = ({ defaultOption, options, onChange, disabled }) => {
  const [selected, setSelected] = useState(defaultOption);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onChange && onChange(value);
  };
  return (
    <>
      <label htmlFor='grade'>
        Name
        <select
          value={selected}
          onChange={handleChange}
          id='grade'
          disabled={disabled || false}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default Name;
