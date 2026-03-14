import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react'
import { forwardRef } from 'react'

export const MenuContainer = forwardRef(function MenuContainer(
  { children, mapUrl, query, resultsCount, totalProducts, whatsAppUrl },
  ref,
) {
  const summary = query
    ? `${resultsCount} resultado${resultsCount === 1 ? '' : 's'} para "${query}".`
    : `${totalProducts} opciones listas para explorar y personalizar con fotos propias.`

  return (
    <main className="relative z-10 -mt-24 px-4 pb-10 sm:-mt-28 sm:px-6 lg:px-8">
      <div
        className="mx-auto max-w-7xl rounded-[32px] border border-[var(--brand-line)] bg-[var(--brand-surface)] px-4 py-5 shadow-menu sm:px-6 sm:py-6 lg:px-8 lg:py-8"
        ref={ref}
      >
        <div className="mb-7 flex flex-col gap-5 border-b border-[var(--brand-line)] pb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-primary)]">
                Carta digital
              </p>
              <h2 className="mt-3 font-heading text-3xl tracking-[-0.04em] text-[var(--brand-text)] sm:text-4xl">
                Elegi rapido, revisa con calma y pedi directo.
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)] sm:text-base">
                {summary}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
                href={whatsAppUrl}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle className="h-4 w-4" />
                Pedir por WhatsApp
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-line)] bg-[var(--brand-card)] px-5 py-3 text-sm font-semibold text-[var(--brand-text)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
                href={mapUrl}
                rel="noreferrer"
                target="_blank"
              >
                <MapPin className="h-4 w-4" />
                Como llegar
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {children}
      </div>
    </main>
  )
})
