import Image from "next/image";

import { CtaButton } from "@/components/ui/cta-button";

export function Hero() {
  return (
    <section className="px-4 py-[50px] desk:px-8 desk:py-[100px]">
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-8 desk:max-w-[1216px] desk:flex-row desk:items-center desk:gap-[33px]">
        {/* Copy + CTAs */}
        <div className="flex flex-col justify-center gap-6 desk:w-[591px] desk:shrink-0">
          <div className="flex flex-col gap-2 desk:gap-4">
            <h1 className="type-h2-mobile text-black desk:type-h1-desktop">
              Your Career. Your Growth. Your Future. Guided by Experts. Powered by AI
            </h1>
            {/* The two breakpoints ship different body copy in the design. */}
            <p className="type-p-sm text-neutral-500 desk:hidden">
              Cogrea helps individuals and businesses unlock skills, close gaps, hire top talent,
              and achieve goals with 24/7 personal guidance. One powerful career community.
            </p>
            <p className="hidden type-p-md text-neutral-500 desk:block">
              Cogrea helps individuals grow their careers and empowers businesses to hire smarter,
              close skill gaps and manage their workforce, all with 24/7 personalized guidance. One
              powerful career community and business ecosystem.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 desk:w-auto desk:flex-row desk:items-center desk:justify-start">
            <CtaButton href="/get-started?audience=personal" variant="primary" className="w-full desk:w-auto">
              For personal
            </CtaButton>
            <CtaButton href="/get-started?audience=business" variant="secondary" className="w-full desk:w-auto">
              For Business
            </CtaButton>
          </div>
        </div>

        {/* Hero BG */}
        <div className="relative h-[420px] w-full shrink-0 overflow-hidden rounded-2xl border border-solid border-neutral-100 bg-white shadow-ds-md desk:h-[659px] desk:w-[592px]">
          <Image
            src="/assets/hero-wordmark.svg"
            alt=""
            width={564}
            height={158}
            unoptimized
            className="absolute left-[7px] top-[7px] h-[88px] w-[314px] max-w-none desk:left-auto desk:right-[12px] desk:top-[32px] desk:h-[158px] desk:w-[564px]"
          />
          <div className="pointer-events-none absolute bottom-[-162px] left-[calc(50%+1px)] h-[566px] w-[329px] -translate-x-1/2 desk:bottom-[-356px] desk:left-[calc(50%+0.5px)] desk:h-[954px] desk:w-[555px]">
            <Image
              src="/assets/hero-scene.png"
              alt="The Cogrea app showing a member's career points, milestones and community feed"
              fill
              preload
              sizes="(min-width: 1200px) 555px, 329px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
