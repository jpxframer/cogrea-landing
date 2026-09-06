import type { LocaleSegment } from "@/i18n/config";

import ar from "./messages/ar";
import de from "./messages/de";
import en, { type Dictionary } from "./messages/en";
import es from "./messages/es";
import fr from "./messages/fr";
import it from "./messages/it";

const dictionaries: Record<LocaleSegment, Dictionary> = { en, fr, de, es, it, ar };

/**
 * Every locale is typed against `en`, so a missing key is a build error.
 * Only import this from server components — the page passes slices down.
 */
export function getDictionary(segment: LocaleSegment): Dictionary {
  return dictionaries[segment];
}

export type { Dictionary };
