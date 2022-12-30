import { useState } from 'react';

const options = [...new Array(30)].map((_, index) => index);

const NumberOfTasks = ({ change_tasks }) => {
  const [selected, setSelected] = useState('15');

  const handleChange = (event) => {
    const value = event.target.value === '0' ? '1' : event.target.value;
    setSelected(value);
    change_tasks(value);
  };

  return (
    <div>
      <label htmlFor='tasks'>Number of tasks:</label>
      <select value={selected} onChange={handleChange} id='tasks'>
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
