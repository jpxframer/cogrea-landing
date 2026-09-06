import { About } from "@/components/about";
import { Audiences } from "@/components/audiences";
import { Features } from "@/components/features";
import { GetStarted } from "@/components/get-started";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SiteHeader } from "@/components/site-header";
import { WhyCogrea } from "@/components/why-cogrea";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Audiences />
        <HowItWorks />
        <WhyCogrea />
        <Features />
        <GetStarted />
      </main>
    </>
  );
}
