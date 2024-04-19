import { createContext } from "react";

interface User {
    accessToken: string;
}

interface UserContextType {
    user: User | null; 
    setUser: React.Dispatch<React.SetStateAction<User | null>>; 
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;