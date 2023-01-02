import { useState } from 'react';

const options = ['easy', 'medium', 'hard'];

const DifficultyRadioPicker = ({ onChange }) => {
  const [difficulty, setDifficulty] = useState('medium');

  const handleChange = (event) => {
    setDifficulty(event.target.value);
    onChange(event.target.value);
  };

  return (
    <>
      <span>difficulty:</span>
      {options.map((option) => (
        <label key={option} htmlFor={option} className='mr-1'>
          <input
            name='difficulty'
            className='ml-1'
            id={option}
            type='radio'
            value={option}
            checked={difficulty === option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}
    </>
  );
};

export default DifficultyRadioPicker;
