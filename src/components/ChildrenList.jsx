import Child from './Child';
import ChildDelete from './ChildDelete';
import { ChildrenContext } from '../store/ChildrenContext';
import { useContext } from 'react';

const ChildrenList = () => {
  const {
    childrenDB,
    childrenLoading,
    childrenError,
    addChild,
    updateChildData,
    removeChild,
  } = useContext(ChildrenContext);

  return (
    <div>
      <p>Children:</p>
      {childrenDB && (
        <ul>
          {childrenDB.map((child) => (
            <li key={child.id}>
              <Child
                id={child.id}
                name={child.name}
                grade={child.grade}
                onClick={updateChildData}
                disabled={childrenLoading}
              />
              <ChildDelete
                className='px-6 py-1 ml-1 my-4 text-white bg-red-600 rounded-lg hover:bg-red-900 disabled:bg-red-200 hover:disabled:bg-red-200'
                id={child.id}
                onClick={removeChild}
                disabled={childrenLoading}
              >
                Delete
              </ChildDelete>
            </li>
          ))}
          <li>
            <Child
              name={''}
              grade={'1'}
              onClick={addChild}
              disabled={childrenLoading}
            />
          </li>
        </ul>
      )}
    </div>
  );
};

export default ChildrenList;
