import { LOGO_COLOR_URL, LOGO_WHITE_URL } from "@/lib/constants";

type LogoProps = {
  variant?: "color" | "white";
  className?: string;
};

/**
 * Logo officiel GEORESEAUX FRANCE (fichiers fournis par le client — logo
 * couleur pour fonds clairs, logo blanc pour fonds sombres/photo).
 */
export function LogoLockup({ variant = "color", className }: LogoProps) {
  const src = variant === "white" ? LOGO_WHITE_URL : LOGO_COLOR_URL;
  const alt = "GEORESEAUX MAURITIUS";

  return (
    <img
      src={src}
      alt={alt}
      className={`h-11 w-auto object-contain ${className ?? ""}`}
    />
  );
}
