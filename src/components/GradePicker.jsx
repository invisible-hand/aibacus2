import { useState } from 'react';

const defaultOptions = [...new Array(13)]
  .map((_, index) => index)
  .filter((index) => index > 0);

const GradePicker = ({
  defaultOption,
  options,
  onChange,
  disabled,
  before,
  after,
}) => {
  const [selected, setSelected] = useState(defaultOption);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onChange && onChange(value);
  };

  const realOptions = options || defaultOptions;

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
          {realOptions.map((option) => (
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
