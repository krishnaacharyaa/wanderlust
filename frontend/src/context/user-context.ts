import { createContext, useContext } from 'react';

interface User {
  accessToken: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = UserContext.Provider;

export default function useUserContext() {
  return useContext(UserContext);
}
