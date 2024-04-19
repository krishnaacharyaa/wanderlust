import UserContext from "@/context/user-context";
import { useState, ReactNode } from "react";

interface User {
    accessToken: string;
}

interface UserContextType {
    user: User | null; 
    setUser: React.Dispatch<React.SetStateAction<User | null>>; 
}

interface UserContextProviderInterface {
    children: ReactNode;
}
function UserContextProvider({children}: UserContextProviderInterface) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser} as UserContextType}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
