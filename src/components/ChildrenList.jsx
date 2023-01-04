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
