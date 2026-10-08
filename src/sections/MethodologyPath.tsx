import { useRef } from "react";
import { useMethodologyProgress } from "@/animations/useMethodologyProgress";
import { cn } from "@/lib/utils";
import type { StepItem } from "@/data/content";

interface MethodologyPathProps {
  steps: StepItem[];
}

/**
 * The 01→06 methodology as a scroll-linked path rather than a numbered list:
 * a connecting line fills in as the visitor scrolls, and each step lights up
 * in turn. One underlying `--progress` value (see useMethodologyProgress)
 * drives both the desktop horizontal track and the mobile vertical one, so
 * the two markups stay perfectly in sync without duplicating scroll logic.
 */
export function MethodologyPath({ steps }: MethodologyPathProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useMethodologyProgress(containerRef, steps.length);

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop: horizontal path */}
      <div className="relative hidden lg:block">
        <div className="absolute left-0 right-0 top-[15px] h-px bg-blue-100">
          <div
            className="h-full bg-yellow-500 motion-safe-only"
            style={{ width: "calc(var(--progress, 0) * 100%)" }}
          />
        </div>
        <div className="grid grid-cols-6 gap-4">
          {steps.map((step, index) => (
            <div key={step.number} data-step-index={index} className="group relative pt-10">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[31px] w-[31px] -translate-x-1/2 rounded-full border-2 border-blue-100 bg-paper transition-colors duration-300 group-[.is-active]:border-yellow-500 group-[.is-active]:bg-yellow-500",
                )}
                style={{ left: 0 }}
                aria-hidden
              />
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-blue-400 transition-colors group-[.is-active]:text-blue-700">
                {step.number}
              </p>
              <p className="mt-2 font-display text-base font-semibold text-ink">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / tablet: vertical path */}
      <div className="relative pl-10 lg:hidden">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-blue-100">
          <div
            className="w-full bg-yellow-500 motion-safe-only"
            style={{ height: "calc(var(--progress, 0) * 100%)" }}
          />
        </div>
        <ol className="space-y-8">
          {steps.map((step, index) => (
            <li key={step.number} data-step-index={index} className="group relative">
              <span
                className="absolute -left-10 top-1 h-[15px] w-[15px] rounded-full border-2 border-blue-100 bg-paper transition-colors duration-300 group-[.is-active]:border-yellow-500 group-[.is-active]:bg-yellow-500"
                aria-hidden
              />
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-blue-400 transition-colors group-[.is-active]:text-blue-700">
                {step.number}
              </p>
              <p className="mt-1 font-display text-base font-semibold text-ink">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
