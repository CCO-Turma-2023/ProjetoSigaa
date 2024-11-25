import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context";

const isAuthenticated = async (
  setTeste: Dispatch<SetStateAction<boolean>>,
): Promise<boolean> => {
  const token = localStorage.getItem("token"); // Pegue o token de forma segura
  if (!token) {
    console.warn("Token não encontrado!");
    setTeste(false);
    return false;
  }

  try {
    const response = await axios.get("http://localhost:3200/users/autentica", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setTeste(true);
      return true;
    } else {
      setTeste(false);
      return false;
    }
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    setTeste(false);
    return false;
  }
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { setTeste } = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true; // Para evitar atualizações no estado após desmontar
    const checkAuthentication = async () => {
      const result = await isAuthenticated(setTeste);
      if (isMounted) setAuthenticated(result);
    };

    checkAuthentication();

    return () => {
      isMounted = false; // Limpeza ao desmontar
    };
  }, [setTeste]);

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
