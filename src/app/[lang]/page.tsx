import { About } from "@/components/about";
import { Audiences } from "@/components/audiences";
import { Features } from "@/components/features";
import { GetStarted } from "@/components/get-started";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhyCogrea } from "@/components/why-cogrea";
import { toSegment } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const lang = toSegment((await params).lang);
  const dict = getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} dict={dict} />
      <main>
        <Hero lang={lang} dict={dict.hero} />
        <About dict={dict.about} />
        <Audiences dict={dict.audiences} />
        <HowItWorks dict={dict.howItWorks} />
        <WhyCogrea lang={lang} dict={dict.whyCogrea} />
        <Features dict={dict.features} />
        <GetStarted lang={lang} dict={dict.getStarted} badges={dict.storeBadges} />
      </main>
      <SiteFooter lang={lang} dict={dict.footer} badges={dict.storeBadges} />
    </>
  );
}
