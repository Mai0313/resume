import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LazyMotion, MotionConfig } from "framer-motion";
import { Spinner } from "@heroui/react";

import { envHelpers } from "@/utils/env";

const loadMotionFeatures = () =>
  import("@/utils/motionFeatures").then((mod) => mod.default);

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
    <LazyMotion strict features={loadMotionFeatures}>
      <MotionConfig reducedMotion="user">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<IndexPage />} path="/" />
            {envHelpers.isResumeFileAvailable() && (
              <Route element={<ResumePage />} path="/resume" />
            )}
          </Routes>
        </Suspense>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
