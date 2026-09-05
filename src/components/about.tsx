import Image from "next/image";

import { SectionPill } from "@/components/ui/section-pill";

type Feature = {
  /** Shown at every width unless `desktopTitle` overrides it from `desk` up. */
  title: string;
  desktopTitle?: string;
  description: string;
};

// The two breakpoints label the first and last cards differently in Figma.
const features: Feature[] = [
  {
    title: "AI-Powered Personalization",
    desktopTitle: "Predictive skill gap analyzer",
    description: "No generic paths; every step is tailored to your journey",
  },
  {
    title: "Verified Talent Pool",
    description: "Work with real, skilled people backed by data and trust.",
  },
  {
    title: "Goal Tracking",
    description: "Stay accountable with smart tools that measure progress.",
  },
  {
    title: "Global & Inclusive",
    desktopTitle: "Career Pathway Engine",
    description: "Accessible in multiple languages and regions worldwide.",
  },
];

function FeatureCard({ title, desktopTitle, description }: Feature) {
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
          <p className="type-p-md-medium w-full text-neutral-900">
            {desktopTitle ? (
              <>
                <span className="desk:hidden">{title}</span>
                <span className="hidden desk:inline">{desktopTitle}</span>
              </>
            ) : (
              title
            )}
          </p>
          <p className="type-p-xs w-full text-neutral-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

type PillarCardProps = {
  icon: { src: string; className: string };
  title: string;
  /** Figma ships different body copy per breakpoint. */
  body: string;
  desktopBody: string;
};

function PillarCard({ icon, title, body, desktopBody }: PillarCardProps) {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col items-start rounded-2xl bg-neutral-50 px-4 py-2 shadow-ds-sm desk:p-4">
      <div className="flex w-full flex-col gap-6">
        <span className="bg-gradient-brand flex items-center self-start rounded-lg p-2.5">
          <span className="relative block size-6 overflow-hidden">
            <Image
              src={icon.src}
              alt=""
              width={24}
              height={24}
              unoptimized
              className={icon.className}
            />
          </span>
        </span>
        <div className="flex w-full flex-col gap-4">
          <h3 className="type-h5-mobile w-full text-neutral-900 desk:type-h5-desktop">{title}</h3>
          <p className="type-p-sm w-full text-neutral-500 desk:hidden">{body}</p>
          <p className="hidden type-p-md w-full text-neutral-500 desk:block">{desktopBody}</p>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    // scroll-mt clears the sticky header when the nav jumps to this anchor
    // (header measures 90px on mobile, 93px on desktop).
    <section
      id="about"
      className="scroll-mt-[90px] px-4 py-[50px] desk:scroll-mt-[93px] desk:px-8 desk:py-[100px]"
    >
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-4 desk:max-w-[1216px] desk:gap-6">
        {/* Media card + copy. Figma stacks the media below the copy on mobile
            and to the left of it on desktop, hence the order swap. */}
        <div className="flex flex-col gap-6 desk:flex-row desk:items-center desk:gap-8">
          <div className="relative order-2 h-[404px] w-full shrink-0 overflow-hidden rounded-3xl bg-primary-300 shadow-ds-md desk:order-1 desk:h-[577px] desk:w-[592px]">
            <Image
              src="/assets/hero-wordmark.svg"
              alt=""
              width={1242}
              height={348}
              unoptimized
              className="absolute left-[-96px] top-[28px] h-[146px] w-[521.429px] max-w-none desk:left-[-125px] desk:top-[-33px] desk:h-[348px] desk:w-[1242px]"
            />
            <div className="pointer-events-none absolute bottom-[-302px] left-[calc(50%+14.5px)] h-[607px] w-[310px] -translate-x-1/2 desk:bottom-[-383px] desk:left-1/2 desk:h-[891px] desk:w-[454px]">
              <Image
                src="/assets/about-scene.png"
                alt="The Cogrea app framed as a compass — the GPS for your career"
                fill
                sizes="(min-width: 1200px) 454px, 310px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="order-1 flex flex-col gap-6 desk:order-2 desk:w-[592px] desk:gap-[49px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-center gap-6">
                <SectionPill>About Us</SectionPill>
                <h2 className="type-h3-mobile text-black desk:type-h3-desktop">
                  Revolutionizing Career Development
                </h2>
              </div>
              <p className="type-p-sm text-neutral-500 desk:type-p-md">
                Cogrea is an emerging CareerTech company bridging learning, work, and business
                growth. We combine the strengths of EdTech and HRTech but go further, delivering
                continuous, personalized support across the entire career journey, from skill
                development and job access to workforce growth and business success.
              </p>
            </div>

            <div className="flex flex-col gap-4 desk:items-end">
              <div className="flex w-full flex-col gap-8 desk:flex-row">
                {features.slice(0, 2).map((feature) => (
                  <FeatureCard key={feature.title} {...feature} />
                ))}
              </div>
              <div className="flex w-full flex-col gap-8 desk:flex-row">
                {features.slice(2).map((feature) => (
                  <FeatureCard key={feature.title} {...feature} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="flex flex-col gap-8 desk:flex-row desk:items-stretch">
          <PillarCard
            icon={{
              src: "/assets/icons/chart-rose.svg",
              // Figma: 24px frame, 21.5px glyph inset by 1.25px
              className: "absolute left-[1.25px] top-[1.25px] h-[21.5px] w-[21.5px] max-w-none",
            }}
            title="Mission"
            body={
              "Our mission is to empower individuals and businesses across the globe with " +
              "personalized career guidance, education, and mentorship, all powered by AI and " +
              "supported through multilingual communities. Through actionable strategies and " +
              "lifelong learning experiences, Cogrea is redefining how people grow, adapt, and " +
              "succeed in today’s workforce."
            }
            desktopBody={
              "A career navigation system built to empower individuals and businesses with " +
              "personalized education, mentorship, career and business development tools. " +
              "Through AI-driven innovation, and actionable strategies, Cogrea delivers lifelong " +
              "learning experiences that unlock sustainable growth and measurable success"
            }
          />
          <PillarCard
            icon={{
              src: "/assets/icons/microscope.svg",
              className: "absolute inset-0 block size-6 max-w-none",
            }}
            title="Vision"
            body={
              "To build a more productive, equitable, and sustainable global economy by " +
              "unlocking human potential at scale. Cogrea reimagines how we learn, work, and " +
              "grow together, democratizing access to opportunity, knowledge, growth and " +
              "success for all."
            }
            desktopBody={
              "To build a more productive, equitable, and sustainable global economy by " +
              "unlocking human potential at scale. Cogrea reimagines how we learn, work, and " +
              "grow together, democratizing access to opportunity, knowledge, growth and " +
              "collaborative networks for all."
            }
          />
        </div>
      </div>
    </section>
  );
}
