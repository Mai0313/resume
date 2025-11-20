import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ResumePage from "@/pages/resume";
import { envHelpers } from "@/utils/env";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      {/* 只有在 Resume 文件可用時才渲染 Resume 路由 */}
      {envHelpers.isResumeFileAvailable() && (
        <Route element={<ResumePage />} path="/resume" />
      )}
    </Routes>
  );
}

export default App;
