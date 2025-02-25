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
  login: (name: string) => void,
  logout: () => void
}

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext<ProvideAuthContext | null>(null);

export const AuthProvider = ({ children }: Props) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const login = async (user: string) => {
    await axios.get(`${API_URL}/users/${user}`)
      .then(response => {
        if (response.data !== undefined || response.data.length > 0) {
          setCurrentUser(response.data)
          navigate("/dashboard");
        }
      }
      )
      .catch(console.error)
  };

  // call this function to sign out logged in user
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