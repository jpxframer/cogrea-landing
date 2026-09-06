import { CtaButton } from "@/components/ui/cta-button";
import { FeatureCard } from "@/components/ui/feature-card";
import { SectionPill } from "@/components/ui/section-pill";

type Reason = {
  title: string;
  description: string;
};

// Rendered two-up on desktop, stacked on mobile — keep pairs adjacent.
const reasons: Reason[] = [
  {
    title: "Actionable framework",
    description: "For personal, professional, and organizational growth.",
  },
  {
    title: "Better & Innovative Approach",
    description: "Deeper, more intentional approach to learning.",
  },
  {
    title: "Lifelong Career Support",
    description: "Emphasis on lifelong learning and continuous improvement.",
  },
  {
    title: "Growth & Success",
    description: "Commitment to assured growth and success for members.",
  },
];

export function WhyCogrea() {
  return (
    <section
      id="why-cogrea"
      className="scroll-mt-[90px] px-4 py-[50px] desk:scroll-mt-[93px] desk:px-8 desk:py-[100px]"
    >
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-8 desk:max-w-[1216px] desk:flex-row desk:items-start">
        <div className="flex flex-col gap-6 desk:min-w-0 desk:flex-1">
          <SectionPill>Why Cogrea?</SectionPill>
          <div className="flex flex-col gap-4">
            <h2 className="type-h3-mobile text-black desk:type-h3-desktop">Why Choose Cogrea</h2>
            <p className="type-p-xs text-neutral-500 desk:type-p-sm">
              Career growth should be simple, personal, and accessible. Cogrea makes that possible.
            </p>
          </div>
          <CtaButton href="/get-started" className="self-start">
            Get Started
          </CtaButton>
        </div>

        {/* 16px between rows, 32px within a row — as designed at both breakpoints. */}
        <div className="flex flex-col gap-4 desk:min-w-0 desk:flex-1">
          {[reasons.slice(0, 2), reasons.slice(2)].map((pair) => (
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
