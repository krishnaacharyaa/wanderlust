import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type Userstate = {
  id: string;
  token: string;
  email: string;
  role: string;
};

type AuthState = {
  user: Userstate;
  addAuth: (state: Userstate) => void;
};

export const Context = createContext<AuthState | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export function Authprovider({ children }: ProviderProps) {
  const [user, setUser] = useLocalStorage('AUTH1', {
    email: '',
    id: '',
    token: '',
    role: '',
  });

  function addAuth(state: Userstate) {
    setUser({
      email: state.email,
      id: state.id,
      token: state.token,
      role: state.role,
    });
  }
  return <Context.Provider value={{ user, addAuth }}>{children}</Context.Provider>;
}

function useLocalStorage(key: string, initialValue: Userstate) {
  const [value, setValue] = useState<Userstate>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) return initialValue;

    return JSON.parse(jsonValue) as Userstate;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

export function useAuthContext() {
  const value = useContext(Context);

  if (value == null) {
    throw new Error('useAuth must be used with in and authprovider');
  }
  return value;
}
