import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/login/login.tsx";
import Sobre from "./pages/sobre/page.tsx";
import Inicio from "./pages/inicio/page.tsx";
import Menu from "./components/menu/index.tsx";
import Turma from "./pages/disciplinas/page.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route
          path="/inicio"
          element={
            <div className="flex">
              <Menu />
              <Inicio />
            </div>
          }
        />
        <Route
          path="/turma"
          element={
            <div className="flex">
              <Menu />
              <Turma />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
