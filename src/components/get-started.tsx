import Image from "next/image";

import { CtaButton } from "@/components/ui/cta-button";
import { SectionPill } from "@/components/ui/section-pill";
import { StoreBadges } from "@/components/ui/store-badges";
import { cn } from "@/lib/cn";

const INTRO =
  "Start today with AI-powered guidance built for individuals and businesses alike.";

/** The white, hairline-bordered panel both halves of this section sit in. */
function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-solid border-neutral-100 bg-white shadow-ds-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function GetStarted() {
  return (
    // scroll-mt clears the sticky header when the nav jumps to this anchor
    // (header measures 90px on mobile, 93px on desktop).
    <section
      id="get-the-app"
      className="scroll-mt-[90px] px-4 py-[50px] desk:scroll-mt-[93px] desk:px-8 desk:py-[100px]"
    >
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-6 desk:max-w-[1216px] desk:gap-12">
        {/* Figma centres the pill at both widths but only centres the copy on desktop. */}
        <div className="flex w-full flex-col items-center gap-6 desk:mx-auto desk:max-w-[800px] desk:text-center">
          <SectionPill>Get Started</SectionPill>
          <div className="flex w-full flex-col gap-2">
            <h2 className="type-h2-mobile text-neutral-900 desk:type-h2-desktop">
              Your growth and success are one click away.
            </h2>
            <p className="type-p-md text-neutral-500">{INTRO}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-8 desk:flex-row desk:items-center">
          <div className="flex flex-col gap-4 desk:min-w-0 desk:flex-1">
            <Panel className="p-4">
              <div className="relative aspect-[2746/1856] w-full">
                <Image
                  src="/assets/get-started-app.png"
                  alt="A laptop showing the Cogrea welcome screen for employers"
                  fill
                  sizes="(min-width: 1200px) 560px, calc(100vw - 64px)"
                  className="object-cover"
                />
              </div>
            </Panel>

            <Panel className="p-4">
              <div className="flex w-full flex-col gap-6">
                <p className="type-p-md w-full text-neutral-500">{INTRO}</p>
                <div className="flex flex-col gap-4 desk:flex-row desk:items-center">
                  <CtaButton href="/get-started?for=career" className="w-full desk:w-auto">
                    I’m Here for My Career
                  </CtaButton>
                  <CtaButton
                    href="/get-started?for=business"
                    variant="secondary"
                    className="w-full desk:w-auto"
                  >
                    I’m Here for My Business
                  </CtaButton>
                </div>
              </div>
            </Panel>
          </div>

          {/* The phone render deliberately bleeds out of the bottom of the panel. */}
          <Panel className="relative h-[580px] w-full overflow-hidden desk:min-w-0 desk:flex-1">
            <div className="pointer-events-none absolute left-[52px] top-[132px] h-[944px] w-[481px]">
              <Image
                src="/assets/about-scene.png"
                alt="The Cogrea app framed as a compass — the GPS for your career"
                fill
                sizes="481px"
                className="object-cover"
              />
            </div>

            <StoreBadges
              className="absolute left-1/2 top-[28px] -translate-x-1/2 items-center"
              labelClassName="text-center"
            />
          </Panel>
        </div>
      </div>
    </section>
  );
}
