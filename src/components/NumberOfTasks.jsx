import { useState } from 'react';

const options = [...new Array(30)]
  .map((_, index) => index)
  .filter((index) => index > 0);

const NumberOfTasks = ({ defaultValue, onChange, disabled }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onChange && onChange(value);
  };

  return (
    <div>
      <label htmlFor='tasks'>Number of tasks:</label>
      <select
        value={selected}
        onChange={handleChange}
        id='tasks'
        disabled={disabled || false}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NumberOfTasks;
