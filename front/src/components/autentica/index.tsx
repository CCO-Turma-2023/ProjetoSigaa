import axios from 'axios';
import { useState, useEffect } from 'react';

// Hook para autenticação
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:3200/users/autentica", {
            headers: {
              Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
            },
          });
        if (response.data) {
          setIsAuthenticated(true); // Token válido
        }
      } catch (error) {
        setIsAuthenticated(false); // Token inválido ou erro na requisição
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};

export { useAuth };
