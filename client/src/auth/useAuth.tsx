import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { AuthData, User } from '@putiikki/user';
import axios from "axios";

interface Props {
  children?: ReactNode;
}

const initialUser: User = {
  name: '',
  username: '',
  points: 0,
  groups: null
}

interface ProvideAuthContext {
  currentUser: User,
  setCurrentUser: Dispatch<SetStateAction<User>>,
  login: (data: AuthData) => Promise<void>,
  signup: (data: AuthData, name: string) => Promise<void>,
  logout: () => void,
  token: string,
}

const initialAuthContext = {
  currentUser: initialUser,
  setCurrentUser: () => { },
  login: (() => Promise as any),
  signup: (() => Promise as any),
  logout: (() => { }),
  token: ''
};

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext<ProvideAuthContext>(initialAuthContext);

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
}

export const AuthProvider = ({ children }: Props) => {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const token = localStorage.getItem('token') || '';

  const login = async ({ username, password }: AuthData): Promise<void> => {
    await axios.post(`${API_URL}/users/login`, { username, password })
      .then(response => {
        //TODO: if response = 422 validation error, 401 invalid credentials -> return response
        if (response.data !== undefined || response.data.length > 0) {
          const token = response.data.token;
          localStorage.setItem('token', token);
        }
      })
      .then(async () => {
        await axios.get(`${API_URL}/users/${username}`)
          .then(response => {
            setCurrentUser(response.data);
            navigate("/groups");
          })
      })
      .catch(console.error)
  };

  const signup = async ({ username, password }: AuthData, name: string): Promise<void> => {
    await axios.post(`${API_URL}/users/signup`, { username, password, name })
      .then(response => {
        if (response.data !== undefined || response.data.length > 0) {
          return setCurrentUser(response.data)
        }
      })
      .then(() => navigate("/dashboard"))
      .catch(console.error)
  };

  const logout = () => {
    setCurrentUser(initialUser);
    navigate("/", { replace: true });
    localStorage.removeItem('token');
  };

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      login,
      logout,
      signup,
      token
    }),
    [currentUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext) as ProvideAuthContext;
};
