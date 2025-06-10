import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import SplitText from "../components/SplitText/SplitText";
import Orb from "../components/Orb/Orb";
import Particles from "../components/Particles/Particles";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { env } from "@/utils/env";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-[70vh] gap-6 relative">
        {/* Particles as background layer */}
        <div className="fixed inset-0 w-screen h-screen -z-10">
          <Particles
            alphaParticles={false}
            disableRotation={false}
            moveParticlesOnHover={true}
            particleBaseSize={100}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
          />
        </div>
        {/* Orb and SplitText content centered on top layer */}
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <Orb
            forceHoverState={false}
            hoverIntensity={0.5}
            hue={0}
            rotateOnHover={true}
          />
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
              onLetterAnimationComplete={handleAnimationComplete}
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
