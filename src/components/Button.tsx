import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Rounded = "sm" | "full";

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold transition-all duration-300 ease-signature focus-visible:outline-2";

const variants: Record<Variant, string> = {
  primary: "bg-yellow-500 text-blue-900 hover:bg-yellow-400 active:bg-yellow-600",
  secondary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
  ghost: "bg-transparent text-inherit ring-1 ring-inset ring-current/30 hover:ring-current/60",
};

// Kept as an explicit prop (rather than left to a `className` override) so
// the radius utility is never appended alongside the default `rounded-sm`
// from `base` — this project doesn't pull in tailwind-merge (see cn(),
// lib/utils.ts), so two conflicting radius classes on the same element
// would silently depend on Tailwind's internal utility ordering instead of
// on what's written here.
const roundedClasses: Record<Rounded, string> = {
  sm: "rounded-sm",
  full: "rounded-full",
};

interface CommonProps {
  variant?: Variant;
  rounded?: Rounded;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; to?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href?: undefined; to: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/** A single button component for the whole site, so "secondary CTA" never
 * drifts into a second, slightly different definition halfway through the
 * project. Renders a router <Link> when `to` is given, a native <button>
 * otherwise. */
// Default is "full": every button on the site is now pill-shaped by default,
// matching the reference design. Pass rounded="sm" explicitly for the rare
// square-cornered case instead.
export function Button({ variant = "primary", rounded = "full", withArrow = false, className, children, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], roundedClasses[rounded], className);

  if ("to" in props && props.to) {
    const { to, ...rest } = props as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
        {withArrow && <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
      {withArrow && <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />}
    </button>
  );
}
