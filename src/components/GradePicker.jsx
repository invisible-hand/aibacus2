import { useState } from 'react';

const options = [...new Array(13)]
  .map((_, index) => index)
  .filter((index) => index > 0);

const GradePicker = ({ defaultValue, onChange, disabled, before, after }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onChange && onChange(value);
  };

  return (
    <>
      <label htmlFor='grade'>
        {before}
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
        {after}
      </label>
    </>
  );
};

export default GradePicker;
