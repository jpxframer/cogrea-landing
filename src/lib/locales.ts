export type Locale = {
  /** BCP-47 tag, written to <html lang>. */
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
    code: "en-US",
    label: "English (US)",
    short: "US | EN",
    flag: "/assets/icons/flag-us.svg",
    dir: "ltr",
  },
  { code: "fr-FR", label: "French", short: "FR | FR", flag: "/assets/icons/flag-fr.svg", dir: "ltr" },
  { code: "de-DE", label: "German", short: "DE | DE", flag: "/assets/icons/flag-de.svg", dir: "ltr" },
  { code: "es-ES", label: "Spanish", short: "ES | ES", flag: "/assets/icons/flag-es.svg", dir: "ltr" },
  { code: "it-IT", label: "Italian", short: "IT | IT", flag: "/assets/icons/flag-it.svg", dir: "ltr" },
  { code: "ar-SA", label: "Arabic", short: "SA | AR", flag: "/assets/icons/flag-sa.svg", dir: "rtl" },
];

export const defaultLocale = locales[0];

export function findLocale(code: string | null | undefined): Locale | undefined {
  return locales.find((locale) => locale.code === code);
}

/** Key used to remember the choice between visits. */
export const LOCALE_STORAGE_KEY = "cogrea:locale";
