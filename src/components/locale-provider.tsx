"use client";

import { useEffect, useSyncExternalStore } from "react";

import { LOCALE_STORAGE_KEY, defaultLocale, findLocale, type Locale } from "@/lib/locales";

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep other tabs in step.
  window.addEventListener("storage", emit);
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) window.removeEventListener("storage", emit);
  };
}

/** Returns a plain string so React can compare snapshots by value. */
function getSnapshot(): string {
  try {
    return window.localStorage.getItem(LOCALE_STORAGE_KEY) ?? defaultLocale.code;
  } catch {
    // Private mode or blocked storage.
    return defaultLocale.code;
  }
}

function getServerSnapshot(): string {
  return defaultLocale.code;
}

export function useLocale() {
  const code = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const locale = findLocale(code) ?? defaultLocale;

  const setLocale = (next: Locale) => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next.code);
    } catch {
      // Not being able to persist should not break the switch.
    }
    emit();
  };

  return { locale, setLocale };
}

/**
 * Mirrors the chosen locale onto <html lang> and <html dir>. The server always
 * renders the default, so the stored choice is applied after hydration.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale.code;
    document.documentElement.dir = locale.dir;
  }, [locale]);

  return <>{children}</>;
}
