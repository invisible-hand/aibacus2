import React from 'react';

const AssignmentHeading = ({ subject }) => {
  return (
    <h1 className='text-2xl font-semibold mx-auto mt-4'>
      {subject} assignment generator
    </h1>
  );
};

export default AssignmentHeading;
