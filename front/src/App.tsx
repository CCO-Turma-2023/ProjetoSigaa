import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/login/login.tsx";
import Sobre from "./pages/sobre/page.tsx";
import Inicio from "./pages/inicio/page.tsx";
import Turma from "./pages/disciplinas/page.tsx";
import Cadastro from "./pages/cadastro/index.tsx";
import Senha from "./pages/esqueceSenha/page.tsx";
import Historico from "./pages/historico/index.tsx";
import Matricula from "./pages/matricula/page.tsx";
import Indices from "./pages/indices/page.tsx";
import NotFound from "./pages/notfound/pages.tsx";

function App() {
  return (
    <Router>
      <div className="h-full w-full bg-backgroundLinear">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/esqueceu" element={<Senha />} />

          {/* Rotas protegidas */}
          <Route
            path="/inicio"
            element={
              <>
                <Inicio />
              </>
            }
          />
          <Route
            path="/turma"
            element={
                <div className="flex">
                  <Turma />
                </div>
            }
          />

          <Route
            path="/historico"
            element={
                <div className="flex">
                  <Historico />
                </div>
            }
          />

          <Route
            path="/matricula"
            element={
                <div className="flex">
                  <Matricula />
                </div>
            }
          />

          <Route
            path="/indices"
            element={
                <div className="flex">
                  <Indices />
                </div>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
