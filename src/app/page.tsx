import { About } from "@/components/about";
import { Audiences } from "@/components/audiences";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SiteHeader } from "@/components/site-header";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Audiences />
        <HowItWorks />
      </main>
    </>
  );
}
