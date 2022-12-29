import { createContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
