import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/login/login.tsx";
import Sobre from "./pages/sobre/page.tsx";
import Inicio from "./pages/inicio/page.tsx";
import Menu from "./components/menu/index.tsx";
import Turma from "./pages/disciplinas/page.tsx";
import Cadastro from "./pages/cadastro/index.tsx";
import Senha from "./pages/esqueceSenha/page.tsx";
import PrivateRoute from "./utils/privateRoute.tsx";
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
              <PrivateRoute>
                <div className="flex">
                  <Menu />
                  <Inicio />
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/turma"
            element={
              <PrivateRoute>
                <div className="flex">
                  <Menu />
                  <Turma />
                </div>
              </PrivateRoute>
            }
          />

          <Route
            path="/historico"
            element={
              <PrivateRoute>
                <div className="flex">
                  <Menu />
                  <Historico />
                </div>
              </PrivateRoute>
            }
          />

          <Route
            path="/matricula"
            element={
              <PrivateRoute>
                <div className="flex">
                  <Menu />
                  <Matricula />
                </div>
              </PrivateRoute>
            }
          />

          <Route
            path="/indices"
            element={
              <PrivateRoute>
                <div className="flex">
                  <Menu />
                  <Indices />
                </div>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
