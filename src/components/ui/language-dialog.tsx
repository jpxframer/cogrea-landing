"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { CtaAction } from "@/components/ui/cta-button";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

type LanguageDialogProps = {
  open: boolean;
  current: Locale;
  dict: Dictionary["language"];
  onClose: () => void;
  onConfirm: (locale: Locale) => void;
};

function LocaleRow({
  locale,
  selected,
  onSelect,
}: {
  locale: Locale;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-4 py-2 text-start transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        selected
          ? "border border-solid border-grey-200 bg-white shadow-ds-md"
          : "border border-solid border-transparent hover:bg-neutral-50",
      )}
    >
      {/* Figma: 24x18 flag clipped to a 2px radius */}
      <span className="relative block h-[18px] w-6 shrink-0 overflow-hidden rounded-sm bg-white">
        <Image
          src={locale.flag}
          alt=""
          width={24}
          height={18}
          unoptimized
          className="absolute inset-0 h-full w-full object-cover"
        />
      </span>
      <span className="type-p-sm text-neutral-500">{locale.label}</span>
    </button>
  );
}

export function LanguageDialog({ open, current, dict, onClose, onConfirm }: LanguageDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState<Locale>(current);
  const [query, setQuery] = useState("");
  const titleId = useId();

  // <dialog> gives us the focus trap, Esc handling and inert background.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) {
      setPending(current);
      setQuery("");
      el.showModal();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open, current]);

  const q = query.trim().toLowerCase();
  const matches = locales.filter((l) => !q || l.label.toLowerCase().includes(q));
  const selectedMatch = matches.filter((l) => l.code === pending.code);
  const otherMatches = matches.filter((l) => l.code !== pending.code);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={onClose}
      // Clicking the backdrop lands on the dialog element itself.
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className={cn(
        "m-auto w-[calc(100%-32px)] max-w-[512px] rounded-3xl bg-white p-6 text-neutral-500 shadow-ds-md",
        "backdrop:bg-black/40",
      )}
    >
      <div className="flex flex-col gap-6">
        <h2
          id={titleId}
          className="type-h2-mobile text-center text-black desk:type-h2-desktop"
        >
          {dict.title}
        </h2>

        <div className="flex flex-col gap-2">
          {/* Figma shows the current value beside the field label. */}
          <div className="flex items-center justify-between rounded-lg border border-solid border-grey-200 bg-white px-4 py-2 shadow-ds-md">
            <span className="type-p-md">{dict.field}</span>
            <span className="type-p-md text-primary-500">{pending.label}</span>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border border-solid border-grey-200 bg-white px-4 py-2 shadow-ds-md">
            <label className="flex items-center gap-2 rounded-lg border border-solid border-grey-200 bg-white px-4 py-2">
              <Image
                src="/assets/icons/search.svg"
                alt=""
                width={16}
                height={16}
                unoptimized
                className="block size-4 shrink-0"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.search}
                aria-label={dict.searchLabel}
                className="type-p-sm w-full bg-transparent text-neutral-500 outline-none placeholder:text-neutral-500"
              />
            </label>

            <div
              aria-label={dict.field}
              className="flex max-h-[280px] flex-col gap-4 overflow-y-auto"
            >
              {selectedMatch.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="type-p-md">{dict.groupDefault}</p>
                  {selectedMatch.map((locale) => (
                    <LocaleRow
                      key={locale.code}
                      locale={locale}
                      selected
                      onSelect={() => setPending(locale)}
                    />
                  ))}
                </div>
              )}

              {otherMatches.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="type-p-md">{dict.groupOther}</p>
                  {otherMatches.map((locale) => (
                    <LocaleRow
                      key={locale.code}
                      locale={locale}
                      selected={false}
                      onSelect={() => setPending(locale)}
                    />
                  ))}
                </div>
              )}

              {matches.length === 0 && (
                <p className="type-p-sm px-4 py-2">{dict.noMatch.replace("{query}", query)}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <CtaAction contentClassName="px-6 py-2" onClick={() => onConfirm(pending)}>
            {dict.confirm}
          </CtaAction>
        </div>
      </div>
    </dialog>
  );
}
