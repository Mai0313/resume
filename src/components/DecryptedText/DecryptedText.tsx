import {
  useEffect,
  useState,
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "framer-motion";

type RevealDirection = "start" | "end" | "center";

interface DecryptedTextOwnProps {
  text: string;
  speed?: number;
  revealDirection?: RevealDirection;
  className?: string;
  encryptedClassName?: string;
}

type DecryptedTextProps = DecryptedTextOwnProps &
  Omit<ComponentPropsWithoutRef<"span">, keyof DecryptedTextOwnProps>;

const AVAILABLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+".split("");

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
};

function shuffleText(originalText: string, revealed: Set<number>): string {
  return originalText
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (revealed.has(i)) return originalText[i];

      return AVAILABLE_CHARS[
        Math.floor(Math.random() * AVAILABLE_CHARS.length)
      ];
    })
    .join("");
}

function getNextIndex(
  revealed: Set<number>,
  textLength: number,
  revealDirection: RevealDirection,
): number {
  switch (revealDirection) {
    case "end":
      return textLength - 1 - revealed.size;
    case "center": {
      const middle = Math.floor(textLength / 2);
      const offset = Math.floor(revealed.size / 2);
      const nextIndex =
        revealed.size % 2 === 0 ? middle + offset : middle - offset - 1;

      if (
        nextIndex >= 0 &&
        nextIndex < textLength &&
        !revealed.has(nextIndex)
      ) {
        return nextIndex;
      }

      for (let i = 0; i < textLength; i++) {
        if (!revealed.has(i)) return i;
      }

      return 0;
    }
    case "start":
    default:
      return revealed.size;
  }
}

/**
 * Sequentially "decrypts" text when it scrolls into view: characters scramble
 * and then resolve one by one in `revealDirection` order. Respects
 * prefers-reduced-motion by rendering the plain text without animating.
 */
export default function DecryptedText({
  text,
  speed = 50,
  revealDirection = "start",
  className = "",
  encryptedClassName = "",
  ...props
}: DecryptedTextProps) {
  const [started, setStarted] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set(),
  );
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isAnimating = started && revealedIndices.size < text.length;
  // Derived on every render: each reveal tick re-renders, so the characters
  // that are still encrypted keep scrambling until they resolve.
  const displayText = isAnimating ? shuffleText(text, revealedIndices) : text;

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setRevealedIndices((prevRevealed) => {
        if (prevRevealed.size >= text.length) {
          return prevRevealed;
        }

        const newRevealed = new Set(prevRevealed);

        newRevealed.add(
          getNextIndex(prevRevealed, text.length, revealDirection),
        );

        return newRevealed;
      });
    }, speed);

    // Once every index is revealed, `isAnimating` derives to false and this
    // cleanup stops the interval.
    return () => clearInterval(interval);
  }, [isAnimating, text, speed, revealDirection]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const target = containerRef.current;

    if (!target) return;

    // One-shot: decrypt on the first viewport entry, then disconnect.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        setStarted(true);
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <span ref={containerRef} style={styles.wrapper} {...props}>
      <span style={styles.srOnly}>{text}</span>

      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const revealed = revealedIndices.has(index) || !isAnimating;

          return (
            <span
              key={index}
              className={revealed ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
