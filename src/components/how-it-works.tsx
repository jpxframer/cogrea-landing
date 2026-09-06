"use client";

import Image from "next/image";
import { useState } from "react";

import { SectionPill } from "@/components/ui/section-pill";
import { cn } from "@/lib/cn";

type Step = {
  title: string;
  description: string;
  /** Figma nests a 21.5px glyph in the 24px box for some icons, full-bleed for others. */
  icon: { src: string; className: string };
};

/** Figma: 24px frame, 21.5px glyph inset by 1.25px. */
const INSET_GLYPH = "absolute left-[1.25px] top-[1.25px] h-[21.5px] w-[21.5px] max-w-none";
const FULL_GLYPH = "absolute inset-0 block size-6 max-w-none";

const steps: Step[] = [
  {
    title: "Sign Up and Set Goals",
    description: "Tell us where you are and where you want to go.",
    icon: { src: "/assets/icons/paint-board.svg", className: INSET_GLYPH },
  },
  {
    title: "Meet Your Assistant",
    description: "Get real-time guidance customized for you.",
    icon: { src: "/assets/icons/profile-2user.svg", className: FULL_GLYPH },
  },
  {
    title: "Follow Personalized Pathways",
    description: "Access curated courses, tools, and templates.",
    icon: { src: "/assets/icons/profile-2user.svg", className: FULL_GLYPH },
  },
  {
    title: "Join the Community",
    description: "Learn, share, and grow with peers, mentors, and experts.",
    icon: { src: "/assets/icons/chart-rose-dark.svg", className: INSET_GLYPH },
  },
];

function StepButton({
  step,
  active,
  onSelect,
}: {
  step: Step;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "step" : undefined}
      className={cn(
        "flex w-full flex-col items-start rounded-2xl p-4 text-left transition-colors",
        active ? "bg-neutral-50 shadow-ds-sm" : "hover:bg-neutral-50/60",
      )}
    >
      <span className="flex w-full flex-col gap-2">
        <span className="flex items-center self-start rounded bg-primary-100 p-2 shadow-ds-md">
          <span className="relative block size-6 overflow-hidden">
            <Image
              src={step.icon.src}
              alt=""
              width={24}
              height={24}
              unoptimized
              className={step.icon.className}
            />
          </span>
        </span>
        <span className="flex w-full flex-col gap-2">
          <span className="type-p-lg-medium w-full text-neutral-900">{step.title}</span>
          <span className="type-p-xs w-full text-neutral-500">{step.description}</span>
        </span>
      </span>
    </button>
  );
}

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = steps[activeIndex];

  return (
    // scroll-mt clears the sticky header when the nav jumps to this anchor
    // (header measures 90px on mobile, 93px on desktop).
    <section
      id="how-it-works"
      className="scroll-mt-[90px] px-4 py-[50px] desk:scroll-mt-[93px] desk:px-8 desk:py-[100px]"
    >
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-12 desk:max-w-[1216px]">
        {/* Figma left-aligns the header on mobile and centres it on desktop. */}
        <div className="flex w-full flex-col gap-6 desk:mx-auto desk:max-w-[800px] desk:items-center desk:text-center">
          <SectionPill>How it works</SectionPill>
          <div className="flex w-full flex-col gap-4">
            <h2 className="type-h3-desktop text-black">How It works</h2>
            <p className="type-p-sm text-neutral-500">Simple. Personal. Effective.</p>
          </div>
        </div>

        <div className="w-full rounded-2xl bg-white py-4 shadow-ds-md desk:p-6">
          <div className="flex flex-col gap-8 desk:flex-row desk:items-start desk:gap-8">
            <div className="flex flex-col gap-3 desk:w-[488px] desk:shrink-0">
              {steps.map((step, i) => (
                <StepButton
                  key={step.title}
                  step={step}
                  active={i === activeIndex}
                  onSelect={() => setActiveIndex(i)}
                />
              ))}
            </div>

            <div className="flex flex-col justify-center gap-4 rounded-2xl p-4 desk:min-w-0 desk:flex-1 desk:gap-6 desk:px-6 desk:py-4">
              <div className="flex w-full flex-col gap-2">
                <p className="type-h3-mobile text-neutral-900 desk:type-h2-desktop">
                  {active.title}
                </p>
                <p className="type-p-sm text-neutral-500">{active.description}</p>
              </div>

              {/* Figma "Hero BG" — the wordmark and phone deliberately bleed out of the panel. */}
              <div className="relative h-[351px] w-full overflow-hidden rounded-2xl border border-solid border-neutral-100 bg-white shadow-ds-md desk:h-[427px]">
                <Image
                  src="/assets/hero-wordmark.svg"
                  alt=""
                  width={1242}
                  height={348}
                  unoptimized
                  className="absolute left-[-1px] top-[14px] h-[76px] w-[272px] max-w-none desk:left-[14px] desk:top-[-67px] desk:h-[158px] desk:w-[564px]"
                />
                <div className="pointer-events-none absolute bottom-[-197px] left-[calc(50%+5.5px)] h-[505px] w-[258px] -translate-x-1/2 desk:bottom-[-465px] desk:left-[calc(50%+4px)] desk:h-[891px] desk:w-[454px]">
                  <Image
                    src="/assets/about-scene.png"
                    alt="The Cogrea app framed as a compass — the GPS for your career"
                    fill
                    sizes="(min-width: 1200px) 454px, 258px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
