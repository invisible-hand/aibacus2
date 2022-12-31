import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTE } from '../constants/Route';
import { supabase } from '../supabaseClient';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        if (!pathname.startsWith(ROUTE.SET_NEW_PASSWORD)) {
          navigate(ROUTE.SET_NEW_PASSWORD);
        }
      }
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
