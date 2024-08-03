import { getCurrentUser } from '@/lib/appWrite';
import { User } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';

type GlobalContextType = {
  isLoggedIn: boolean;
  user: User | undefined;
  isLoading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (value: User | undefined) => void;
};
const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  user: undefined,
  isLoading: true,
  setIsLoggedIn: (value: boolean) => {},
  setUser: (value: User | undefined) => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user: any) => {
        if (user) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          setIsLoggedIn(false);
          setUser(undefined);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('error in  ge cureent user: ', error);
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
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
