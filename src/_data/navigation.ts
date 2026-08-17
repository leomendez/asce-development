export type Destination = {
  href: string;
  label: string;
};

/**
 * Where the chat surfaces send a reader who wants to browse instead of ask.
 * One list so the copies in Chat and Decline can't drift apart.
 */
export const destinations: Destination[] = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];
