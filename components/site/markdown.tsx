import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

// Renders admin-written Markdown. react-markdown never outputs raw HTML (it is
// escaped), and links/images are limited to safe protocols, so article text
// cannot inject scripts. Styling is applied per element (no typography plugin).
export function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-ink">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (p) => (
            <h2 className="pt-4 text-2xl font-bold text-navy" {...p} />
          ),
          h2: (p) => (
            <h2 className="pt-4 text-2xl font-bold text-navy" {...p} />
          ),
          h3: (p) => (
            <h3 className="pt-2 text-xl font-semibold text-navy" {...p} />
          ),
          h4: (p) => (
            <h4 className="pt-2 text-lg font-semibold text-navy" {...p} />
          ),
          ul: (p) => <ul className="list-disc space-y-1.5 pl-6" {...p} />,
          ol: (p) => <ol className="list-decimal space-y-1.5 pl-6" {...p} />,
          blockquote: (p) => (
            <blockquote
              className="border-l-4 border-brand-orange pl-4 text-muted-foreground italic"
              {...p}
            />
          ),
          a: ({ href, ...p }) => (
            <a
              href={href}
              className="font-medium text-navy underline underline-offset-4 hover:text-brand-orange"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              {...p}
            />
          ),
          img: ({ src, alt }) => (
            // Markdown images can point anywhere, so a plain img is used.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={typeof src === "string" ? src : undefined}
              alt={alt ?? ""}
              loading="lazy"
              className="my-2 w-full rounded-lg"
            />
          ),
          hr: () => <hr className="my-6 border-border" />,
          code: (p) => (
            <code
              className="rounded bg-secondary px-1.5 py-0.5 text-sm"
              {...p}
            />
          ),
          pre: (p) => (
            <pre
              className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm"
              {...p}
            />
          ),
          table: (p) => (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" {...p} />
            </div>
          ),
          th: (p) => (
            <th className="border-b px-3 py-2 text-left font-semibold" {...p} />
          ),
          td: (p) => <td className="border-b px-3 py-2" {...p} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
