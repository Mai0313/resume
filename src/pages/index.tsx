import { lazy, Suspense, useState, useEffect } from "react";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Spinner } from "@heroui/spinner";

import SplitText from "../components/SplitText/SplitText";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { env } from "@/utils/env";
import { BREAKPOINTS, PARTICLE_COUNTS } from "@/constants";

// Lazy load heavy WebGL components
const Orb = lazy(() => import("../components/Orb/Orb"));
const Particles = lazy(() => import("../components/Particles/Particles"));

// Loading fallback component
const AnimationLoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <Spinner
      className="text-gray-500"
      label="Loading animations..."
      size="lg"
    />
  </div>
);

export default function IndexPage() {
  const [particleCount, setParticleCount] = useState<number>(
    PARTICLE_COUNTS.DESKTOP,
  );

  useEffect(() => {
    const updateParticleCount = () => {
      // Reduce particle count on mobile and tablet devices for better performance
      if (window.innerWidth < BREAKPOINTS.MOBILE) {
        setParticleCount(PARTICLE_COUNTS.MOBILE);
      } else if (window.innerWidth < BREAKPOINTS.TABLET) {
        setParticleCount(PARTICLE_COUNTS.TABLET);
      } else {
        setParticleCount(PARTICLE_COUNTS.DESKTOP);
      }
    };

    updateParticleCount();
    window.addEventListener("resize", updateParticleCount);

    return () => window.removeEventListener("resize", updateParticleCount);
  }, []);

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
              particleCount={particleCount}
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
