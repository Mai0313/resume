import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import SplitText from "../components/SplitText";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
        <div className="flex flex-col items-center justify-center">
          <SplitText
            text="Mai"
            className="text-5xl font-bold text-center"
            delay={150}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing={(t) => t}
            threshold={0.2}
            rootMargin="50px"
            onLetterAnimationComplete={() => {}}
          />
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
        </div>
      </section>
    </DefaultLayout>
  );
}
