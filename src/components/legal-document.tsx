import type { ReactNode } from "react";

export type LegalBlock =
  | { kind: "p"; content: ReactNode }
  | { kind: "ul"; items: ReactNode[] }
  | { kind: "ol"; items: ReactNode[] };

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

type LegalDocumentProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

/** An address in the body copy — Figma colours these primary-500. */
export function MailLink({ address }: { address: string }) {
  return (
    <a
      href={`mailto:${address}`}
      className="text-primary-500 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    >
      {address}
    </a>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.kind === "p") {
    return <p className="type-p-md desk:type-p-lg">{block.content}</p>;
  }

  // Figma draws these flat, with literal "•" / "(1)" characters in the text.
  // Real lists give the wrapped lines a hanging indent, which reads better.
  const className =
    block.kind === "ul" ? "list-disc ps-5 type-p-md desk:type-p-lg" : "list-parenthesised type-p-md desk:type-p-lg";
  const List = block.kind === "ul" ? "ul" : "ol";

  return (
    <List className={className}>
      {block.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </List>
  );
}

export function LegalDocument({ title, intro, sections }: LegalDocumentProps) {
  return (
    <main className="px-4 py-[50px] desk:px-8 desk:py-[100px]">
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-6 desk:max-w-[1216px] desk:gap-12">
        {/* Figma left-aligns the title block on mobile and centres it on desktop. */}
        <div className="flex flex-col gap-4 desk:text-center">
          <h1 className="type-display-sm text-black desk:type-display-lg">{title}</h1>
          <p className="type-p-sm text-neutral-500 desk:type-p-lg">{intro}</p>
        </div>

        <div className="flex flex-col gap-6 text-neutral-500 desk:gap-12">
          {sections.map((section) => (
            <section key={section.title} className="flex flex-col gap-4">
              <h2 className="type-h3-mobile text-black desk:type-h3-desktop">{section.title}</h2>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
