import type { IconProps } from "@phosphor-icons/react";

import {
  ArrowRightIcon as PhosphorArrowRightIcon,
  ArrowUpRightIcon as PhosphorArrowUpRightIcon,
  BriefcaseIcon as PhosphorBriefcaseIcon,
  CircuitryIcon as PhosphorCircuitryIcon,
  CodeIcon as PhosphorCodeIcon,
  DownloadSimpleIcon as PhosphorDownloadSimpleIcon,
  EnvelopeSimpleIcon as PhosphorEnvelopeSimpleIcon,
  FilePdfIcon as PhosphorFilePdfIcon,
  GithubLogoIcon as PhosphorGithubLogoIcon,
  LinkedinLogoIcon as PhosphorLinkedinLogoIcon,
  MapPinIcon as PhosphorMapPinIcon,
  MoonIcon as PhosphorMoonIcon,
  SparkleIcon as PhosphorSparkleIcon,
  SunIcon as PhosphorSunIcon,
} from "@phosphor-icons/react";

const iconDefaults = {
  "aria-hidden": true,
  "weight": "regular",
} as const;

export const ArrowUpRightIcon = ({ size = 14, ...props }: IconProps) => (
  <PhosphorArrowUpRightIcon size={size} {...iconDefaults} {...props} />
);

export const ArrowRightIcon = ({ size = 14, ...props }: IconProps) => (
  <PhosphorArrowRightIcon size={size} {...iconDefaults} {...props} />
);

export const GitHubIcon = ({ size = 16, ...props }: IconProps) => (
  <PhosphorGithubLogoIcon size={size} {...iconDefaults} {...props} />
);

export const LinkedInIcon = ({ size = 16, ...props }: IconProps) => (
  <PhosphorLinkedinLogoIcon size={size} {...iconDefaults} {...props} />
);

export const SunIcon = ({ size = 18, ...props }: IconProps) => (
  <PhosphorSunIcon size={size} {...iconDefaults} {...props} />
);

export const MoonIcon = ({ size = 18, ...props }: IconProps) => (
  <PhosphorMoonIcon size={size} {...iconDefaults} {...props} />
);

export const DownloadIcon = ({ size = 16, ...props }: IconProps) => (
  <PhosphorDownloadSimpleIcon size={size} {...iconDefaults} {...props} />
);

export const MailIcon = ({ size = 16, ...props }: IconProps) => (
  <PhosphorEnvelopeSimpleIcon size={size} {...iconDefaults} {...props} />
);

export const MapPinIcon = ({ size = 16, ...props }: IconProps) => (
  <PhosphorMapPinIcon size={size} {...iconDefaults} {...props} />
);

export const FilePdfIcon = ({ size = 16, ...props }: IconProps) => (
  <PhosphorFilePdfIcon size={size} {...iconDefaults} {...props} />
);

export const BriefcaseIcon = ({ size = 16, ...props }: IconProps) => (
  <PhosphorBriefcaseIcon size={size} {...iconDefaults} {...props} />
);

export const CodeIcon = ({ size = 16, ...props }: IconProps) => (
  <PhosphorCodeIcon size={size} {...iconDefaults} {...props} />
);

export const CircuitryIcon = ({ size = 16, ...props }: IconProps) => (
  <PhosphorCircuitryIcon size={size} {...iconDefaults} {...props} />
);

export const SparkleIcon = ({ size = 16, ...props }: IconProps) => (
  <PhosphorSparkleIcon size={size} {...iconDefaults} {...props} />
);
