export type TNamespaces = {
  name: string;
  path: string;
  secondary_path: string;
}[];

export const namespaces: TNamespaces = [
  {
    name: "nextjs",
    path: `docs/nextjs-caching.pdf`,
    secondary_path: "/docs/nextjs-caching.pdf",
  },
  {
    name: "resume",
    path: "docs/resume.pdf",
    secondary_path: "/docs/resume.pdf",
  },
  {
    name: "english",
    path: "docs/english.pdf",
    secondary_path: "/docs/english.pdf",
  },
  {
    name: "the-subtle-art",
    path: "docs/the-subtle-art.pdf",
    secondary_path: "/docs/the-subtle-art.pdf",
  },
  {
    name: "ikigai",
    path: "docs/ikigai.pdf",
    secondary_path: "/docs/ikigai.pdf",
  },
];
