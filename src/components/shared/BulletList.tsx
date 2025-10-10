import type { FC } from "react";

interface BulletListProps {
  items: string[];
  title?: string;
  bulletColor?: string;
  className?: string;
}

/**
 * Display a list of items with custom bullet points
 */
export const BulletList: FC<BulletListProps> = ({
  items,
  title,
  bulletColor = "blue-500",
  className = "",
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {title && (
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {title}
        </h4>
      )}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
          >
            <div
              className={`w-1.5 h-1.5 bg-${bulletColor} rounded-full mt-2 flex-shrink-0`}
            />
            <span className="text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
