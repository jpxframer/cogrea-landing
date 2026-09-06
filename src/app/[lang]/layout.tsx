import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { getLocale, localePath, locales, toSegment } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

/** Only the six known locales exist; anything else 404s. */
export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale.segment }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = toSegment((await params).lang);
  const dict = getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: localePath(lang),
      languages: Object.fromEntries(
        locales.map((locale) => [locale.code, localePath(locale.segment)]),
      ),
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const locale = getLocale((await params).lang);

  return (
    <html lang={locale.code} dir={locale.dir} className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
