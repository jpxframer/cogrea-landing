import Image from "next/image";

import { cn } from "@/lib/cn";

export type FeatureCardProps = {
  title: string;
  description: string;
  /** Figma sizes the title per section; defaults to Paragraph/Medium/Medium. */
  titleClassName?: string;
};

/**
 * The pale card with a Cogrea-mark tile above a title and description.
 * Shared by About, Why Choose Cogrea and Features — identical in all three.
 */
export function FeatureCard({ title, description, titleClassName }: FeatureCardProps) {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col items-start rounded-2xl bg-neutral-50 px-4 py-2 shadow-ds-sm">
      <div className="flex w-full flex-col gap-2">
        <span className="flex items-center self-start rounded bg-primary-100 p-2 shadow-ds-md">
          <Image
            src="/assets/icons/cogea-mark.svg"
            alt=""
            width={24}
            height={24}
            unoptimized
            className="block size-6"
          />
        </span>
        <div className="flex w-full flex-col gap-2">
          <p className={cn("w-full text-neutral-900", titleClassName ?? "type-p-md-medium")}>
            {title}
          </p>
          <p className="type-p-xs w-full text-neutral-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
