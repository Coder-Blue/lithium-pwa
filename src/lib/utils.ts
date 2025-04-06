import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function seo({
  title,
  description,
  keywords,
  image,
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
}) {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: "Noah Trần" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@not_sh1ro" },
    { name: "twitter:site", content: "@not_sh1ro" },
    { name: "og:type", content: "website" },
    { name: "og:site_name", content: title },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    { name: "og:url", content: "http://localhost:3000" },
    { name: "og:locale", content: "vi_VN" },
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "og:image", content: image },
        ]
      : []),
  ];

  return tags;
}
