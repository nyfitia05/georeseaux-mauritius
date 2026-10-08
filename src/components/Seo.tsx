import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
}

/**
 * Sets the document title (and, optionally, the meta description) per route.
 * The titles here come straight from the "Plan SEO prioritaire" table in the
 * cahier des charges — nothing invented. A dedicated head-management library
 * (react-helmet and friends) would be overkill for a handful of static tags
 * updated on route change; a plain effect does the job.
 */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    let createdMeta = false;
    const previousDescription = meta?.getAttribute("content") ?? null;

    if (description) {
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
        createdMeta = true;
      }
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (meta && !createdMeta && previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);

  return null;
}
