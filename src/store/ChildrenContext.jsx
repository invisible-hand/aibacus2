import { createContext, useContext, useEffect, useState } from 'react';

import { AuthContext } from './AuthContext';
import { addChildToDB } from '../database/addChildToDB';
import { getChildrenFromDB } from '../database/getChildrenFromDB';
import { removeChildFromDB } from '../database/removeChildFromDB';
import { updateChildInDB } from '../database/updateChildInDB';

export const ChildrenContext = createContext();

const ChildrenContextProvider = ({ children }) => {
  const { session } = useContext(AuthContext);
  const userId = session?.user.id;

  const [childrenDB, setChildrenDB] = useState(null);
  const [childrenLoading, setChildrenLoading] = useState(false);
  const [childrenError, setChildrenError] = useState(null);

  const addChild = async (name, grade) => {
    setChildrenError(false);
    if (userId) {
      setChildrenLoading(true);
      try {
        await addChildToDB(name, grade, userId);
        console.log(`addChild to DB ended`);
        await updateChildren();
      } catch (error) {
        setChildrenError(error);
      } finally {
        setChildrenLoading(false);
      }
    }
  };

  const updateChildren = async () => {
    setChildrenError(false);
    if (userId) {
      setChildrenLoading(true);
      try {
        const data = await getChildrenFromDB(userId);
        setChildrenDB(data);
      } catch (error) {
        setChildrenError(error);
      } finally {
        setChildrenLoading(false);
      }
    }
  };

  const updateChildData = async (childId, name, grade) => {
    setChildrenError(false);
    if (userId) {
      setChildrenLoading(true);
      try {
        await updateChildInDB(childId, name, grade);
        await updateChildren();
      } catch (error) {
        setChildrenError(error);
      } finally {
        setChildrenLoading(false);
      }
    }
  };

  const removeChild = async (childId) => {
    setChildrenError(false);
    if (userId) {
      setChildrenLoading(true);
      try {
        await removeChildFromDB(childId);
        await updateChildren();
      } catch (error) {
        setChildrenError(error);
      } finally {
        setChildrenLoading(false);
      }
    }
  };

  useEffect(() => {
    const getChildrenDB = async () => {
      await updateChildren();
    };
    getChildrenDB();
  }, [userId]);

  return (
    <ChildrenContext.Provider
      value={{
        childrenDB,
        childrenLoading,
        childrenError,
        addChild,
        updateChildren,
        updateChildData,
        removeChild,
      }}
    >
      {children}
    </ChildrenContext.Provider>
  );
};

export default ChildrenContextProvider;
