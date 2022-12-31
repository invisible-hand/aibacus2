import React from 'react';

const operations = ['Addition', 'Subtraction', 'Multiplication', 'Division'];

const MathOperations = ({ operationState, handleChange }) => {
  return (
    <>
      <p className='mt-2'>Select operations to include in assignments</p>
      {operations.map((operation) => (
        <label key={operation} htmlFor={operation} className='block'>
          <input
            className='mr-1'
            type='checkbox'
            id={operation}
            name={operation}
            value={operation}
            checked={operationState[operation]}
            onChange={handleChange}
          />
          {operation}
        </label>
      ))}
    </>
  );
};

export default MathOperations;
