export type LocaleSegment = "en" | "fr" | "de" | "es" | "it" | "ar";

export type Locale = {
  /** URL segment. English is unprefixed, so "en" never appears in a path. */
  segment: LocaleSegment;
  /** BCP-47 tag written to <html lang>. */
  code: string;
  /** Name shown in the picker. */
  label: string;
  /** Compact nav label, e.g. "US | EN". */
  short: string;
  flag: string;
  dir: "ltr" | "rtl";
};

export const locales: Locale[] = [
  {
    segment: "en",
    code: "en-US",
    label: "English (US)",
    short: "US | EN",
    flag: "/assets/icons/flag-us.svg",
    dir: "ltr",
  },
  {
    segment: "fr",
    code: "fr-FR",
    label: "French",
    short: "FR | FR",
    flag: "/assets/icons/flag-fr.svg",
    dir: "ltr",
  },
  {
    segment: "de",
    code: "de-DE",
    label: "German",
    short: "DE | DE",
    flag: "/assets/icons/flag-de.svg",
    dir: "ltr",
  },
  {
    segment: "es",
    code: "es-ES",
    label: "Spanish",
    short: "ES | ES",
    flag: "/assets/icons/flag-es.svg",
    dir: "ltr",
  },
  {
    segment: "it",
    code: "it-IT",
    label: "Italian",
    short: "IT | IT",
    flag: "/assets/icons/flag-it.svg",
    dir: "ltr",
  },
  {
    segment: "ar",
    code: "ar-SA",
    label: "Arabic",
    short: "SA | AR",
    flag: "/assets/icons/flag-sa.svg",
    dir: "rtl",
  },
];

export const defaultLocale = locales[0];

export const localeSegments = locales.map((locale) => locale.segment);

export function isLocaleSegment(value: string): value is LocaleSegment {
  return (localeSegments as string[]).includes(value);
}

/** Route params arrive as plain strings; narrow them to a known segment. */
export function toSegment(value: string): LocaleSegment {
  return isLocaleSegment(value) ? value : defaultLocale.segment;
}

export function getLocale(segment: string): Locale {
  return locales.find((locale) => locale.segment === segment) ?? defaultLocale;
}

/**
 * Builds an in-app path for a locale. English is served unprefixed so the
 * URLs that already exist ("/", "/legal/terms") keep working.
 */
export function localePath(segment: LocaleSegment, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (segment === defaultLocale.segment) return clean || "/";
  return `/${segment}${clean}`;
}

/** Strips a leading locale segment, returning the shared path. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocaleSegment(first) && first !== defaultLocale.segment) {
    return `/${rest.join("/")}`.replace(/\/$/, "") || "/";
  }
  return pathname || "/";
}
