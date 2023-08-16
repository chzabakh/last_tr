import Cookies from "js-cookie";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface AuthContextProps {
  accessToken: string;
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  accessToken: "",
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = (): AuthContextProps => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
     Cookies.get('token')  as string
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (token: string) => {
    setIsLoggedIn(true);
    setAccessToken(token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccessToken("");
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
