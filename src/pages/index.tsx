import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import SplitText from "../components/SplitText";
import Orb from "../components/Orb";
import Particles from "../components/Particles";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-[70vh] gap-6 relative">
        {/* Particles 作為背景層 */}
        <div className="absolute inset-0 w-full h-full -z-10">
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
        {/* Orb 與 SplitText 內容置中於上層 */}
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <Orb
            forceHoverState={false}
            hoverIntensity={0.5}
            hue={0}
            rotateOnHover={true}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <SplitText
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              className="text-5xl font-bold text-center"
              delay={150}
              easing={(t) => t}
              rootMargin="50px"
              text="Mai"
              threshold={0.2}
              onLetterAnimationComplete={() => {}}
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
