
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "./useLocalStorage";

type Props = {
  children?: ReactNode;
}


interface ProvideAuthContext {
  currentUser: string | null,
  login: (name: string) => void,
  logout: () => void
}

const AuthContext = createContext<ProvideAuthContext | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage('user', '');
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (user: string) => {
    setUser(user);
    navigate("/dashboard");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      currentUser: user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext) as ProvideAuthContext;
};