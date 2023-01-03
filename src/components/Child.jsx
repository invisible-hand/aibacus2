import GradePicker from './GradePicker';
import { useState } from 'react';

const Child = ({ id, name, grade, onClick, disabled }) => {
  const [nameState, setNameState] = useState(name);
  const [gradeState, setGradeState] = useState(grade);

  return (
    <>
      <label htmlFor='name' className='mr-1'>
        Name
      </label>
      <input
        id='name'
        name='name'
        type='text'
        placeholder='enter name...'
        value={nameState}
        onChange={(e) => {
          setNameState(e.target.value);
        }}
        className='px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
      />

      <GradePicker
        defaultOption={gradeState}
        onChange={setGradeState}
        label={'Grade'}
      />
      <button
        onClick={() => {
          id
            ? onClick(id, nameState, gradeState)
            : (onClick(nameState, gradeState),
              setNameState(''),
              setGradeState('1'));
        }}
        disabled={disabled || false}
        className='px-6 py-1 ml-1 my-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-200 hover:disabled:bg-blue-200'
      >
        {id ? 'Update' : 'Add'}
      </button>
    </>
  );
};

export default Child;
