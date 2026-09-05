import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
