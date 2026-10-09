interface LegalSection {
  id?: string
  title: string
  text: string[]
}

interface LegalPageProps {
  eyebrow: string
  title: string
  sections: LegalSection[]
}

// Same layout as the CMS pages ([slug]/page.tsx), for the demo's fixed legal texts.
export default function LegalPage({ eyebrow, title, sections }: LegalPageProps) {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
          <h1 className="heading-editorial mt-2 text-3xl text-navy md:text-4xl">{title}</h1>
          <div className="mt-3 h-px w-16 bg-gold" />
        </div>

        <div className="rich-text">
          {sections.map((section) => (
            <section key={section.title} id={section.id} className="scroll-mt-28">
              <h2>{section.title}</h2>
              {section.text.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
