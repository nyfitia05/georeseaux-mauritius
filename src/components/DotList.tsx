import { cn } from "@/lib/utils";

interface DotListProps {
  items: string[];
  className?: string;
}

/** Renders a "•"-separated inline list exactly as it appears in the source
 * content (e.g. "Plans existants • Observation du site • Géoradar…") — a
 * combination of elements, not a sequence, so it deliberately does not use
 * FlowLine's arrows. */
export function DotList({ items, className }: DotListProps) {
  return (
    <p className={cn("flex flex-wrap gap-x-2 gap-y-1 text-base text-ink-soft", className)}>
      {items.map((item, index) => (
        <span key={item}>
          {item}
          {index < items.length - 1 && <span className="ml-2 text-yellow-600">•</span>}
        </span>
      ))}
    </p>
  );
}
