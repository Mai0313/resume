import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "@heroui/react";

import { envHelpers } from "@/utils/env";

const IndexPage = lazy(() => import("@/pages/index"));
const ResumePage = lazy(() => import("@/pages/resume"));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Spinner size="lg" />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        {envHelpers.isResumeFileAvailable() && (
          <Route element={<ResumePage />} path="/resume" />
        )}
      </Routes>
    </Suspense>
  );
}

export default App;
