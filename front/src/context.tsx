import {
  createContext,
  useState,
  ReactNode,
} from "react";

import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  validaAcesso: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: false,
  validaAcesso: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const validaAcesso = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const resposta = await axios.get(
        "http://localhost:3200/users/autentica",
        config
      );

      if (resposta.status === 201) {
        console.log("válido")
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Erro ao validar acesso:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loading, isAuthenticated, validaAcesso }}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthProvider };
