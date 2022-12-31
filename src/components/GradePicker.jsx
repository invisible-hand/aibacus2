import { useState } from 'react';

const options = [...new Array(13)]
  .map((_, index) => index)
  .filter((index) => index > 0);

const GradePicker = ({ onChange }) => {
  const [selected, setSelected] = useState('5');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onChange(+value);
  };

  return (
    <div>
      <label htmlFor='grade'>
        Pick a grade:
        <select value={selected} onChange={handleChange} id='grade'>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          grade.
        </select>
      </label>
    </div>
  );
};

export default GradePicker;
