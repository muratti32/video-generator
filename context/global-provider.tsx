import { getCurrentUser } from '@/lib/appWrite';
import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext({
  isLoggedIn: false,
  user: null,
  isLoading: true,
  setIsLoggedIn: (value: boolean) => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user: any) => {
        if (user) {
          setIsLoggedIn(true);
          setUser(user);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('error: ', error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading: loading,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
