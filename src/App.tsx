import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ResumePage from "@/pages/resume";
import PortfolioPage from "@/pages/portfolio";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ResumePage />} path="/resume" />
      <Route element={<PortfolioPage />} path="/portfolio" />
    </Routes>
  );
}

export default App;
