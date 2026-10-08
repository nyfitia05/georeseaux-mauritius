import { clsx, type ClassValue } from "clsx";

/** Merge conditional class names. A dedicated tailwind-merge pass was left out
 * on purpose: this project's class lists rarely conflict, and adding a
 * library to dedupe classes that don't collide would be exactly the kind of
 * unjustified dependency the project's design skill warns against. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
