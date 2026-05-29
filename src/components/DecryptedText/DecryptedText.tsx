import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type CSSProperties,
} from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type RevealDirection = "start" | "end" | "center";

interface DecryptedTextOwnProps {
  text: string;
  speed?: number;
  revealDirection?: RevealDirection;
  className?: string;
  encryptedClassName?: string;
}

type DecryptedTextProps = DecryptedTextOwnProps &
  Omit<HTMLMotionProps<"span">, keyof DecryptedTextOwnProps>;

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

/**
 * Sequentially "decrypts" text when it scrolls into view: characters scramble
 * and then resolve one by one in `revealDirection` order.
 */
export default function DecryptedText({
  text,
  speed = 50,
  revealDirection = "start",
  className = "",
  encryptedClassName = "",
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set(),
  );
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  const containerRef = useRef<HTMLSpanElement>(null);

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];

          return AVAILABLE_CHARS[
            Math.floor(Math.random() * AVAILABLE_CHARS.length)
          ];
        })
        .join("");
    },
    [],
  );

  const triggerDecrypt = useCallback(() => {
    setRevealedIndices(new Set());
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;

    const getNextIndex = (revealedSet: Set<number>): number => {
      const textLength = text.length;

      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex =
            revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (
            nextIndex >= 0 &&
            nextIndex < textLength &&
            !revealedSet.has(nextIndex)
          ) {
            return nextIndex;
          }

          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }

          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    const interval = setInterval(() => {
      setRevealedIndices((prevRevealed) => {
        if (prevRevealed.size < text.length) {
          const newRevealed = new Set(prevRevealed);

          newRevealed.add(getNextIndex(prevRevealed));
          setDisplayText(shuffleText(text, newRevealed));

          return newRevealed;
        }

        clearInterval(interval);
        setIsAnimating(false);

        return prevRevealed;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isAnimating, text, speed, revealDirection, shuffleText]);

  useEffect(() => {
    setDisplayText(text);
    setRevealedIndices(new Set());
  }, [text]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerDecrypt();
          setHasAnimated(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });
    const currentRef = containerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, triggerDecrypt]);

  return (
    <motion.span ref={containerRef} style={styles.wrapper} {...props}>
      <span style={styles.srOnly}>{displayText}</span>

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
    </motion.span>
  );
}
