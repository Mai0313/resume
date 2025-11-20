import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { motion } from "framer-motion";

import SplitText from "./SplitText/SplitText";

import { siteConfig } from "@/config/site";
import { env } from "@/utils/env";
import { GithubIcon } from "@/components/icons";
import { BREAKPOINTS, PARTICLE_COUNTS } from "@/constants";

const Orb = lazy(() => import("./Orb/Orb"));
const Particles = lazy(() => import("./Particles/Particles"));

export const HeroSection = () => {
  const [particleCount, setParticleCount] = useState<number>(
    PARTICLE_COUNTS.DESKTOP,
  );

  useEffect(() => {
    const updateParticleCount = () => {
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
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full -z-10">
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

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 pointer-events-none">
        <Suspense fallback={null}>
          <Orb
            forceHoverState={false}
            hoverIntensity={0.5}
            hue={0}
            rotateOnHover={true}
          />
        </Suspense>
      </div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center gap-6 text-center px-4">
        <div className="max-w-4xl">
          <SplitText
            className="text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50"
            delay={150}
            duration={0.8}
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

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-2xl text-default-500 max-w-2xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {/* Dynamically render buttons based on available nav items */}
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: "shadow",
                size: "lg",
              })}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}

          <Link
            isExternal
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              size: "lg",
            })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            <span className="ml-2">GitHub</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
