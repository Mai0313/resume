import React, { useRef, useCallback, useEffect } from "react";

import "./SpotlightCard.css";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!divRef.current) return;

      // Cancel previous animation frame if it exists
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame to throttle updates
      rafRef.current = requestAnimationFrame(() => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty("--mouse-x", `${x}px`);
        divRef.current.style.setProperty("--mouse-y", `${y}px`);
        divRef.current.style.setProperty("--spotlight-color", spotlightColor);

        rafRef.current = null;
      });
    },
    [spotlightColor],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={divRef}
      className={`card-spotlight ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
