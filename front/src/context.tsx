import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define o tipo do estado do contexto
interface AuthContextType {
  matricula: string;
  setMatricula: Dispatch<SetStateAction<string>>;
  nome: string;
  setNome: Dispatch<SetStateAction<string>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  curso: string;
  setCurso: Dispatch<SetStateAction<string>>;
  verifyToken: boolean;
  setverifyToken: Dispatch<SetStateAction<boolean>>;
}

// Cria o contexto com valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define o provider do contexto
interface AuthProviderProps {
  children: ReactNode;
}

// Define os itens que estão presentes no tokem
interface JwtPayload {
  matricula: string;
  name: string;
  curso: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [matricula, setMatricula] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [curso, setCurso] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [verifyToken, setverifyToken] = useState<boolean>(false);

  useEffect(() => {
    if (verifyToken) {
      const token = localStorage.getItem("token"); // Pegamos o token
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token); // Decodificamos
          if (decoded && decoded.matricula && decoded.name && decoded.curso) {
            // Atualizamos as constantes de exibição
            setNome(decoded.name);
            setMatricula(decoded.matricula);
            setCurso(decoded.curso);
            setIsAuthenticated(true);
          } else {
            throw new Error("Payload inválido");
          }
        } catch (error) {
          console.error("Token inválido ou malformado", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [verifyToken]);

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
        verifyToken,
        setverifyToken,
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
