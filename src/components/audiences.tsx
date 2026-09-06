import Image from "next/image";

import { SectionPill } from "@/components/ui/section-pill";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

type Audience = {
  pill: { icon: string; label: string };
  /** Figma gives each audience its own gradient for the benefit icon tiles. */
  tileClassName: string;
  heading: string;
  intro: string;
  /** Rendered two-up on desktop, stacked on mobile — so keep pairs adjacent. */
  benefits: string[];
  scene: { src: string; alt: string };
  /** Desktop places the photo left of the copy for the second block. */
  reverse?: boolean;
};

type AudiencesProps = { dict: Dictionary["audiences"] };

function buildAudiences(dict: Dictionary["audiences"]): Audience[] {
  return [
    {
      pill: { icon: "/assets/icons/profile.svg", label: dict.individuals.pill },
      tileClassName: "bg-gradient-accent",
      heading: dict.individuals.heading,
      intro: dict.intro,
      benefits: dict.individuals.benefits,
      scene: { src: "/assets/individuals-scene.jpg", alt: dict.individuals.sceneAlt },
    },
    {
      pill: { icon: "/assets/icons/briefcase.svg", label: dict.businesses.pill },
      tileClassName: "bg-gradient-brand",
      heading: dict.businesses.heading,
      intro: dict.intro,
      benefits: dict.businesses.benefits,
      scene: { src: "/assets/businesses-scene.jpg", alt: dict.businesses.sceneAlt },
      reverse: true,
    },
  ];
}

/** Groups the flat benefit list into the two-up rows the desktop layout uses. */
function inPairs<T>(items: T[]): T[][] {
  const pairs: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  return pairs;
}

function BenefitCard({ label, tileClassName }: { label: string; tileClassName: string }) {
  return (
    <div className="flex h-20 w-full flex-col items-start justify-center rounded-2xl border border-solid border-grey-200 bg-white p-4 shadow-ds-md desk:min-w-0 desk:flex-1">
      <div className="flex w-full items-center gap-3">
        <span className={cn("flex shrink-0 items-center rounded-lg p-2", tileClassName)}>
          <Image
            src="/assets/icons/medal-star.svg"
            alt=""
            width={24}
            height={24}
            unoptimized
            className="block size-6"
          />
        </span>
        <p className="type-p-md-medium min-w-0 flex-1 text-black">{label}</p>
      </div>
    </div>
  );
}

function AudienceBlock({
  pill,
  tileClassName,
  heading,
  intro,
  benefits,
  scene,
  reverse,
}: Audience) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 desk:flex-row desk:items-center",
        reverse && "desk:flex-row-reverse",
      )}
    >
      <div className="flex flex-col gap-[29px] desk:min-w-0 desk:flex-1">
        <div className="flex flex-col gap-6">
          <SectionPill icon={pill.icon} className="self-start">
            {pill.label}
          </SectionPill>
          <div className="flex flex-col gap-4">
            <h2 className="type-h3-mobile text-black desk:type-h3-desktop">{heading}</h2>
            <p className="type-p-sm text-neutral-500">{intro}</p>
          </div>
        </div>

        {/* 17px between rows, 16px within a row — as designed at both breakpoints. */}
        <div className="flex flex-col gap-[17px]">
          {inPairs(benefits).map((pair) => (
            <div key={pair[0]} className="flex flex-col gap-4 desk:flex-row desk:items-center">
              {pair.map((label) => (
                <BenefitCard key={label} label={label} tileClassName={tileClassName} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-[250px] w-full overflow-hidden rounded-2xl bg-primary-150 desk:h-[463px] desk:min-w-0 desk:flex-1">
        <Image
          src={scene.src}
          alt={scene.alt}
          fill
          sizes="(min-width: 1200px) 592px, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function Audiences({ dict }: AudiencesProps) {
  return (
    // scroll-mt clears the sticky header when the nav jumps to this anchor
    // (header measures 90px on mobile, 93px on desktop).
    <section
      id="audiences"
      className="scroll-mt-[90px] px-4 py-[50px] desk:scroll-mt-[93px] desk:px-8 desk:py-[100px]"
    >
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-16 desk:max-w-[1216px]">
        {buildAudiences(dict).map((audience) => (
          <AudienceBlock key={audience.heading} {...audience} />
        ))}
      </div>
    </section>
  );
}
