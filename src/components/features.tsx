import Image from "next/image";

import { FeatureCard } from "@/components/ui/feature-card";
import { SectionPill } from "@/components/ui/section-pill";
import { cn } from "@/lib/cn";

type Feature = {
  title: string;
  description: string;
  titleClassName?: string;
};

/** Figma sets every title at H6 except the first, which is Paragraph/Large — at both breakpoints. */
const H6 = "type-h6-desktop";

const leftFeatures: Feature[] = [
  {
    title: "24/7 Career Coaching",
    description: "24/7 personalized advice on Career, resumes, interviews, and more.",
    titleClassName: "type-p-lg-medium",
  },
  {
    title: "Personalized Learning Pathways",
    description: "Only the courses and skills you actually need.",
    titleClassName: H6,
  },
  {
    title: "Career & Growth Tracker",
    description: "See your progress in real time, automatically.",
    titleClassName: H6,
  },
];

const rightFeatures: Feature[] = [
  {
    title: "Verified Tutors",
    description: "Get one-on-one help to simplify tough concepts.",
    titleClassName: H6,
  },
  {
    title: "Mental Health & Career Check-ins",
    description: "Stay balanced while you grow.",
    titleClassName: H6,
  },
  {
    title: "Job & Talent Matching",
    description: "AI-powered connections between candidates and companies.",
    titleClassName: H6,
  },
];

function FeatureColumn({ features, className }: { features: Feature[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 desk:w-[384px] desk:shrink-0", className)}>
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}

export function Features() {
  return (
    // scroll-mt clears the sticky header when the nav jumps to this anchor
    // (header measures 90px on mobile, 93px on desktop).
    <section
      id="features"
      className="scroll-mt-[90px] px-4 py-[50px] desk:scroll-mt-[93px] desk:px-8 desk:py-[100px]"
    >
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-6 desk:max-w-[1216px] desk:gap-12">
        {/* Figma left-aligns the header on mobile and centres it on desktop. */}
        <div className="flex w-full flex-col gap-6 desk:mx-auto desk:max-w-[800px] desk:items-center desk:text-center">
          <SectionPill className="self-start desk:self-center">Features</SectionPill>
          <h2 className="type-h3-mobile w-full text-black desk:type-h3-desktop">
            Everything You Need to Succeed
          </h2>
        </div>

        {/* Mobile stacks both card columns above the render; desktop sits it between them. */}
        <div className="flex flex-col gap-4 desk:flex-row desk:items-center desk:justify-center desk:gap-8">
          <FeatureColumn features={leftFeatures} className="desk:order-1" />
          <FeatureColumn features={rightFeatures} className="desk:order-3" />

          <div className="relative h-[391px] w-full overflow-hidden rounded-2xl bg-neutral-50 shadow-ds-md desk:order-2 desk:h-[440px] desk:w-[384px] desk:shrink-0">
            {/* The wordmark and app render deliberately bleed out of the panel. */}
            <Image
              src="/assets/hero-wordmark.svg"
              alt=""
              width={1242}
              height={348}
              unoptimized
              className="absolute left-[29px] top-[9px] h-[120px] w-[428px] max-w-none"
            />
            <div className="pointer-events-none absolute left-[-41px] top-[36px] h-[568px] w-[816px]">
              <Image
                src="/assets/features-app.png"
                alt="The Cogrea web app showing a talent feed alongside a profile sidebar"
                fill
                sizes="816px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
