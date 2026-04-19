import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

import { ResumeContent } from "../components/ResumeContent";
import { loadResumeData, RenderCVData } from "../utils/resumeLoader";

import { env, envHelpers } from "@/utils/env";
import DefaultLayout from "@/layouts/default";
import { cn } from "@/lib/utils";

const IS_PIN_ENABLED = envHelpers.isPinEnabled();
const MAX_FAIL_ATTEMPTS = 3;

function useResumeData() {
  const [resumeData, setResumeData] = useState<
    (RenderCVData & { sectionOrder: string[] }) | null
  >(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadResume = useCallback(async () => {
    setIsLoadingResume(true);
    setError(null);
    try {
      const data = await loadResumeData();

      if (!data || !data.cv || !data.cv.name) {
        throw new Error("Resume data is incomplete or missing required fields");
      }

      setResumeData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load resume");
      setResumeData(null);
    } finally {
      setIsLoadingResume(false);
    }
  }, []);

  return { resumeData, isLoadingResume, loadResume, error };
}

export default function ResumePage() {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(!IS_PIN_ENABLED);
  const [failCount, setFailCount] = useState(0);
  const controls = useAnimation();
  const inputRef = useRef<HTMLInputElement>(null);

  const { resumeData, isLoadingResume, loadResume, error } = useResumeData();

  const pinLength = env.PIN_CODE?.length || 4;
  const attemptsLeft = Math.max(0, MAX_FAIL_ATTEMPTS - failCount);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlPin = urlParams.get("pin");

    if (!IS_PIN_ENABLED) {
      setAuthenticated(true);
      loadResume();

      return;
    }

    if (urlPin && urlPin === env.PIN_CODE) {
      setAuthenticated(true);
      loadResume();
      urlParams.delete("pin");
      const newUrl =
        window.location.pathname +
        (urlParams.toString() ? "?" + urlParams.toString() : "");

      window.history.replaceState({}, "", newUrl);
    }
  }, [loadResume]);

  const handleSubmit = useCallback(() => {
    if (!IS_PIN_ENABLED) return;

    if (!pin) {
      setFailCount((c) => c + 1);

      return;
    }

    if (pin === env.PIN_CODE) {
      setAuthenticated(true);
      loadResume();
    } else {
      setFailCount((c) => c + 1);
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 },
      });
      setPin("");
    }
  }, [pin, controls, loadResume]);

  useEffect(() => {
    if (IS_PIN_ENABLED && pin.length === pinLength) {
      handleSubmit();
    }
  }, [pin, pinLength, handleSubmit]);

  const showPinModal =
    IS_PIN_ENABLED && !authenticated && failCount < MAX_FAIL_ATTEMPTS;

  useEffect(() => {
    if (showPinModal) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);

      return () => clearTimeout(timer);
    }
  }, [showPinModal]);

  const show404 = IS_PIN_ENABLED && failCount >= MAX_FAIL_ATTEMPTS;

  if (show404) {
    return (
      <DefaultLayout>
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
          <div className="label-mono mb-6 text-fg-subtle">ACCESS DENIED</div>
          <h1
            className="font-display mb-4 font-normal leading-none text-fg"
            style={{
              fontSize: "clamp(6rem, 18vw, 12rem)",
              letterSpacing: "-0.06em",
            }}
          >
            404
          </h1>
          <p
            className="font-display text-xl font-light italic text-fg-muted md:text-2xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
          >
            Not found
          </p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <AnimatePresence>
        {showPinModal && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/90 px-4 backdrop-blur-xl"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-sm"
              exit={{ y: 10, opacity: 0 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={controls}
                className="rounded-2xl border border-border bg-surface p-8 shadow-2xl shadow-black/40"
              >
                <div className="label-mono mb-3 flex items-center gap-2 text-fg-subtle">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                  Restricted
                </div>
                <h2 className="font-display mb-2 text-2xl leading-tight text-fg">
                  Enter access code
                </h2>
                <p className="mb-8 text-[13.5px] text-fg-muted">
                  {pinLength}-digit PIN required to view this résumé.
                </p>
                <input
                  ref={inputRef}
                  aria-label={`${pinLength}-digit PIN code`}
                  className={cn(
                    "w-full rounded-md border border-border bg-bg px-4 py-3.5 text-center font-mono text-2xl tracking-[0.5em] text-fg transition-colors",
                    "placeholder:text-fg-subtle focus:border-fg focus:outline-none",
                  )}
                  inputMode="numeric"
                  maxLength={pinLength}
                  pattern="[0-9]*"
                  placeholder={"·".repeat(pinLength)}
                  type="text"
                  value={pin}
                  onChange={(e) =>
                    setPin(
                      e.target.value.replace(/\D/g, "").slice(0, pinLength),
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                  }}
                />
                {failCount > 0 && (
                  <p className="label-mono mt-4 text-fg-subtle">
                    Invalid code · {attemptsLeft}{" "}
                    {attemptsLeft === 1 ? "attempt" : "attempts"} left
                  </p>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {authenticated && (
        <>
          {isLoadingResume ? (
            <div className="flex min-h-[70vh] items-center justify-center">
              <div className="label-mono animate-pulse text-fg-muted">
                Loading résumé…
              </div>
            </div>
          ) : error ? (
            <div className="mx-auto max-w-2xl px-6 pb-24 pt-40">
              <div className="label-mono mb-4 text-fg-subtle">Error</div>
              <h3 className="font-display mb-4 text-3xl leading-tight text-fg">
                Résumé loading failed
              </h3>
              <p className="mb-8 leading-relaxed text-fg-muted">{error}</p>
              <div className="rounded-lg border border-border bg-surface p-6">
                <div className="label-mono mb-4 text-fg-subtle">
                  Check VITE_RESUME_FILE
                </div>
                <div className="space-y-2.5 font-mono text-[13px]">
                  <div>
                    <span className="text-fg-subtle">local &nbsp;</span>
                    <code className="text-fg">resume.yaml</code>
                  </div>
                  <div>
                    <span className="text-fg-subtle">gist &nbsp;&nbsp;</span>
                    <code className="break-all text-fg">
                      https://gist.github.com/user/id
                    </code>
                  </div>
                  <div>
                    <span className="text-fg-subtle">
                      url &nbsp;&nbsp;&nbsp;
                    </span>
                    <code className="break-all text-fg">
                      https://raw.githubusercontent.com/user/repo/main/resume.yaml
                    </code>
                  </div>
                </div>
              </div>
            </div>
          ) : resumeData && resumeData.cv && resumeData.cv.name ? (
            <ResumeContent data={resumeData} />
          ) : null}
        </>
      )}
    </DefaultLayout>
  );
}
