import { t } from "@/lib/lang";

/**
 * Réseaux sociaux : barre fixe à gauche, même modèle que Water Leak Group et
 * Water Leak Expert (ici en jaune Georeseaux). Liens du groupe Water Leak —
 * à remplacer si Georeseaux Mauritius a ses propres pages.
 */
const links = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61595195746000",
    path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/water-leak-group/",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/23057928639",
    path: "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.49-8.41z",
  },
];

export function SocialBar() {
  return (
    <aside
      aria-label={t("Réseaux sociaux", "Social media")}
      className="fixed left-0 top-1/2 z-40 flex -translate-y-1/2 flex-col overflow-hidden rounded-r-[10px] bg-yellow-500 shadow-[0_6px_20px_rgba(16,29,64,0.18)] print:hidden"
    >
      {links.map((l, i) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener"
          aria-label={l.label}
          title={l.label}
          className={
            "flex h-9 w-9 items-center justify-center text-blue-900 transition-colors hover:bg-blue-600 hover:text-white focus-visible:bg-blue-600 focus-visible:text-white sm:h-[42px] sm:w-[42px]" +
            (i > 0 ? " border-t border-black/10" : "")
          }
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-[17px] w-[17px] sm:h-5 sm:w-5">
            <path fill="currentColor" d={l.path} />
          </svg>
        </a>
      ))}
    </aside>
  );
}
