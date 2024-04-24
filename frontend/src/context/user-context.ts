import { createContext, useContext } from 'react';
import { UserContextType } from '@/types/user-type';

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = UserContext.Provider;

export default function useUserContext() {
    return useContext(UserContext);
}