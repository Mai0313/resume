import { lazy, Suspense } from "react";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Spinner } from "@heroui/spinner";

import SplitText from "../components/SplitText/SplitText";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { env } from "@/utils/env";

// Lazy load heavy WebGL components
const Orb = lazy(() => import("../components/Orb/Orb"));
const Particles = lazy(() => import("../components/Particles/Particles"));

// Loading fallback component
const AnimationLoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <Spinner
      size="lg"
      label="Loading animations..."
      className="text-gray-500"
    />
  </div>
);

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-[70vh] gap-6 relative">
        {/* Particles as background layer with lazy loading */}
        <div className="fixed inset-0 w-screen h-screen -z-10">
          <Suspense fallback={null}>
            <Particles
              alphaParticles={false}
              disableRotation={false}
              moveParticlesOnHover={true}
              particleBaseSize={100}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
            />
          </Suspense>
        </div>
        {/* Orb and SplitText content centered on top layer */}
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <Suspense fallback={<AnimationLoadingFallback />}>
            <Orb
              forceHoverState={false}
              hoverIntensity={0.5}
              hue={0}
              rotateOnHover={true}
            />
          </Suspense>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <SplitText
              className="text-5xl font-bold text-center"
              delay={150}
              duration={0.6}
              ease={(t) => t}
              from={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              rootMargin="50px"
              splitType="words, chars"
              text={env.WEBSITE_TITLE}
              textAlign="center"
              threshold={0.2}
              to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={24} />
            <span className="ml-2">GitHub</span>
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}