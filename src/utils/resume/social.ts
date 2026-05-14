const SOCIAL_NETWORK_URL_TEMPLATES: Record<string, string> = {
  linkedin: "https://www.linkedin.com/in/",
  github: "https://github.com/",
  gitlab: "https://gitlab.com/",
  imdb: "https://www.imdb.com/name/",
  instagram: "https://www.instagram.com/",
  orcid: "https://orcid.org/",
  mastodon: "https://mastodon.social/@",
  stackoverflow: "https://stackoverflow.com/users/",
  researchgate: "https://www.researchgate.net/profile/",
  youtube: "https://www.youtube.com/@",
  googlescholar: "https://scholar.google.com/citations?user=",
  telegram: "https://t.me/",
  whatsapp: "https://wa.me/",
  leetcode: "https://leetcode.com/u/",
  x: "https://x.com/",
  twitter: "https://x.com/",
  bluesky: "https://bsky.app/profile/",
  reddit: "https://www.reddit.com/user/",
};

/**
 * Build a full URL for a social network given its name and username.
 * Unknown networks fall back to the raw username.
 */
export function buildSocialUrl(network: string, username: string): string {
  const key = network.toLowerCase().replace(/[\s_-]/g, "");
  const base = SOCIAL_NETWORK_URL_TEMPLATES[key];

  if (!base) {
    return username;
  }

  return `${base}${username}`;
}
