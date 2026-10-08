import clsx from "clsx";

type SectionHeadingProps = {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
};

/** Titre de section bleu, cohérent sur tout le site (H2 par défaut). */
export function SectionHeading({
  children,
  align = "left",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={clsx(
        "font-heading text-[28px] font-bold leading-[1.15] text-brand-blue sm:text-[32px]",
        align === "center" && "text-center",
        className
      )}
    >
      {children}
    </Tag>
  );
}
