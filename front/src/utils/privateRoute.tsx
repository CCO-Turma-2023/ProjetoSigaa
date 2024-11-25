import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context";

const isAuthenticated = async (
  setverifyToken: Dispatch<SetStateAction<boolean>>,
): Promise<boolean> => {
  const token = localStorage.getItem("token"); // Pegando o token para verificar se ainda está autenticado
  if (!token) {
    console.warn("Token não encontrado!");
    setverifyToken(false);
    return false;
  }

  try {
    // Verificando a integridade do token para ver se não estourou o tempo
    const response = await axios.get("http://localhost:3200/users/autentica", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Caso tudo tiver OK, atualizamos o verifyToken para mudar as constantes de exibição
    if (response.status === 200) {
      setverifyToken(true);
      return true;
    } else {
      setverifyToken(false);
      return false;
    }
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    setverifyToken(false);
    return false;
  }
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { setverifyToken } = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true; // Para evitar atualizações no estado após desmontar
    const checkAuthentication = async () => {
      const result = await isAuthenticated(setverifyToken);
      if (isMounted) setAuthenticated(result);
    };

    checkAuthentication();

    return () => {
      isMounted = false; // Limpeza ao desmontar
    };
  }, [setverifyToken]);

  if (authenticated === null) {
    return <div>Carregando...</div>; // Substituir por um componente de loading
  }

  return authenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace /> // Usar "replace" evita adicionar no histórico de navegação
  );
};

export default PrivateRoute;
