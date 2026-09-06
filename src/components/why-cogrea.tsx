import { CtaButton } from "@/components/ui/cta-button";
import { FeatureCard } from "@/components/ui/feature-card";
import { SectionPill } from "@/components/ui/section-pill";
import { localePath, type LocaleSegment } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type WhyCogreaProps = { lang: LocaleSegment; dict: Dictionary["whyCogrea"] };

export function WhyCogrea({ lang, dict }: WhyCogreaProps) {
  return (
    <section
      id="why-cogrea"
      className="scroll-mt-[90px] px-4 py-[50px] desk:scroll-mt-[93px] desk:px-8 desk:py-[100px]"
    >
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-8 desk:max-w-[1216px] desk:flex-row desk:items-start">
        <div className="flex flex-col gap-6 desk:min-w-0 desk:flex-1">
          <SectionPill className="self-start">{dict.pill}</SectionPill>
          <div className="flex flex-col gap-4">
            <h2 className="type-h3-mobile text-black desk:type-h3-desktop">{dict.heading}</h2>
            <p className="type-p-xs text-neutral-500 desk:type-p-sm">{dict.intro}</p>
          </div>
          <CtaButton href={localePath(lang, "/get-started")} className="self-start">
            {dict.cta}
          </CtaButton>
        </div>

        {/* 16px between rows, 32px within a row — as designed at both breakpoints. */}
        <div className="flex flex-col gap-4 desk:min-w-0 desk:flex-1">
          {[dict.reasons.slice(0, 2), dict.reasons.slice(2)].map((pair) => (
            <div key={pair[0].title} className="flex flex-col gap-8 desk:flex-row desk:items-start">
              {pair.map((reason) => (
                <FeatureCard key={reason.title} {...reason} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
