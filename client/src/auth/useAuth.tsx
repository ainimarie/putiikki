import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

type User = {
  name: string,
  points: number
}

type Props = {
  children?: ReactNode;
}

interface ProvideAuthContext {
  currentUser: User | null,
  setCurrentUser: Dispatch<SetStateAction<User | null>>,
  login: ((name: string) => Promise<void>),
  logout: () => void
}

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext<ProvideAuthContext | null>(null);

export const AuthProvider = ({ children }: Props) => {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (user: string): Promise<void> => {
    await axios.get(`${API_URL}/users/${user}`)
      .then(response => {
        if (response.data !== undefined || response.data.length > 0) {
          return setCurrentUser(response.data)
        }
      })
      .then(() => navigate("/dashboard"))
      .catch(console.error)
  };

  const logout = () => {
    setCurrentUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      login,
      logout,
    }),
    [currentUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext) as ProvideAuthContext;
};