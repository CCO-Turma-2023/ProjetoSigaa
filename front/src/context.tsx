import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

// Define o tipo do estado do contexto
interface AuthContextType {
  matricula: string;
  setMatricula: Dispatch<SetStateAction<string>>; // Expondo o setter
  nome: string;
  setNome: Dispatch<SetStateAction<string>>; // Expondo o setter
  isAuthenticated: boolean | null; // Status de autenticação
  setIsAuthenticated: Dispatch<SetStateAction<boolean | null>>; // Expondo o setter
  curso: string;
  setCurso: Dispatch<SetStateAction<string>>; // Expondo o setter
}

// Cria o contexto com valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define o provider do contexto
interface AuthProviderProps {
  children: ReactNode;
}

interface JwtPayload {
  matricula: string;
  name: string;
  curso: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [matricula, setMatricula] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [curso, setCurso] = useState<string>("");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Pegue o token de forma segura
    if (token !== null) {
      const teste = jwtDecode<JwtPayload>(token);
      console.log(token);
      setNome(teste.name);
      setMatricula(teste.matricula);
      setCurso(teste.curso);

      console.log(teste);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        matricula,
        setMatricula,
        nome,
        setNome,
        curso,
        setCurso,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de forma mais simples
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
