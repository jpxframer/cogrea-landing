import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type CtaVariant = "primary" | "secondary";

const variantStyles: Record<
  CtaVariant,
  { shell: string; gradient: string; label: string; inset: string }
> = {
  // Figma: CTA / Primary CTA
  primary: {
    shell: "bg-primary-500",
    gradient: "bg-gradient-to-b from-primary-500 from-[45.874%] to-[rgb(27_35_83_/_0.3)]",
    label: "text-primary-100",
    inset: "shadow-[inset_0_4px_4px_0_rgb(255_255_255_/_0.25)]",
  },
  // Figma: CTA / Secondary CTA
  secondary: {
    shell: "bg-primary-100 border border-solid border-grey-200",
    gradient: "bg-gradient-to-b from-primary-100 from-[45.874%] to-[rgb(249_250_254_/_0.3)]",
    label: "text-black",
    inset: "shadow-[inset_0_4px_4px_0_rgb(140_140_140_/_0.25)]",
  },
};

type CtaSharedProps = {
  variant?: CtaVariant;
  /** Padding utilities for the inner label surface — varies per placement in the design. */
  contentClassName?: string;
};

function shellClasses(variant: CtaVariant, className?: string) {
  return cn(
    "flex flex-col items-start rounded-lg p-[2px] shadow-ds-md",
    "transition-opacity hover:opacity-90",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
    variantStyles[variant].shell,
    className,
  );
}

function CtaSurface({
  variant,
  contentClassName,
  children,
}: Required<CtaSharedProps> & { children: React.ReactNode }) {
  const styles = variantStyles[variant];
  return (
    <span className={cn("relative flex w-full items-center justify-center rounded-lg", contentClassName)}>
      <span
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 rounded-lg", styles.gradient)}
      />
      <span className={cn("relative type-body-bold text-center whitespace-nowrap", styles.label)}>
        {children}
      </span>
      <span
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", styles.inset)}
      />
    </span>
  );
}

type CtaButtonProps = ComponentPropsWithoutRef<typeof Link> & CtaSharedProps;

/** A CTA that navigates. */
export function CtaButton({
  variant = "primary",
  className,
  contentClassName = "px-8 py-3",
  children,
  ...props
}: CtaButtonProps) {
  return (
    <Link className={shellClasses(variant, className)} {...props}>
      <CtaSurface variant={variant} contentClassName={contentClassName}>
        {children}
      </CtaSurface>
    </Link>
  );
}

type CtaActionProps = ComponentPropsWithoutRef<"button"> & CtaSharedProps;

/** The same CTA shell as a real button, for in-page actions. */
export function CtaAction({
  variant = "primary",
  className,
  contentClassName = "px-8 py-3",
  children,
  type = "button",
  ...props
}: CtaActionProps) {
  return (
    <button type={type} className={shellClasses(variant, className)} {...props}>
      <CtaSurface variant={variant} contentClassName={contentClassName}>
        {children}
      </CtaSurface>
    </button>
  );
}
