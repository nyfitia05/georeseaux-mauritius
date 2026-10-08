import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { Link, type LinkProps } from "react-router-dom";

type Variant = "primary" | "outline-light" | "outline-blue";

const base =
  "inline-flex items-center gap-2.5 rounded-pill px-6 py-3 font-body text-[15px] font-bold transition-all duration-300 ease-premium focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-yellow text-brand-blue-dark hover:bg-brand-yellow-dark hover:-translate-y-0.5 hover:shadow-card active:translate-y-0",
  "outline-light":
    "bg-transparent text-white border-2 border-white/70 hover:bg-white hover:text-brand-blue",
  "outline-blue":
    "bg-white text-brand-blue border border-ink-300/50 hover:border-brand-blue hover:bg-brand-blue-light",
};

function ArrowIcon() {
  return <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />;
}

type BaseProps = {
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Bouton pilule jaune (CTA) qui déclenche une action — pas une navigation. */
export function Button({
  variant = "primary",
  withArrow = true,
  className,
  children,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
      {withArrow && <ArrowIcon />}
    </button>
  );
}

/** Même bouton, mais comme lien de navigation interne (React Router). */
export function ButtonLink({
  variant = "primary",
  withArrow = true,
  className,
  children,
  ...rest
}: BaseProps & LinkProps) {
  return (
    <Link className={clsx(base, variants[variant], className)} {...rest}>
      {children}
      {withArrow && <ArrowIcon />}
    </Link>
  );
}

/** Même bouton, mais comme lien externe / mailto / tel. */
export function ButtonAnchor({
  variant = "primary",
  withArrow = true,
  className,
  children,
  ...rest
}: BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={clsx(base, variants[variant], className)} {...rest}>
      {children}
      {withArrow && <ArrowIcon />}
    </a>
  );
}
