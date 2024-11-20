"use client"; // Este componente deve ser um Client Component

import { useEffect, useState } from "react";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Verifica o caminho apenas após o componente ser montado no cliente
    setShowMenu(
      window.location.pathname !== "/sobre" && window.location.pathname !== "/",
    );
  }, []);

  return (
    <>
      {showMenu && (
        <nav className="min-h-screen w-72 bg-[#00113D]">
          <h1>teste</h1>
        </nav>
      )}
    </>
  );
}
