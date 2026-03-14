import { Instagram, MapPin, MessageCircle } from 'lucide-react'

export function Footer({ brand, cartItemCount, onOpenCart }) {
  const cartLabel =
    cartItemCount > 0 ? `Ver pedido (${cartItemCount})` : 'Pedir por WhatsApp'

  return (
    <footer className="px-4 pb-8 pt-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-[var(--brand-line)] bg-[var(--brand-surface)] px-5 py-6 shadow-card sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-heading text-2xl font-semibold tracking-[-0.04em] text-[var(--brand-text)]">
              {brand.name}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--brand-muted)] sm:text-base">
              {brand.footer.phrase}
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand-muted)]">
              {brand.footer.legal}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-line)] bg-[var(--brand-card)] px-4 py-3 text-sm font-semibold text-[var(--brand-text)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
              href={brand.contact.mapUrl}
              rel="noreferrer"
              target="_blank"
            >
              <MapPin className="h-4 w-4" />
              {brand.contact.address}
            </a>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-line)] bg-[var(--brand-card)] px-4 py-3 text-sm font-semibold text-[var(--brand-text)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
              onClick={onOpenCart}
              type="button"
            >
              <MessageCircle className="h-4 w-4" />
              {cartLabel}
            </button>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-line)] bg-[var(--brand-card)] px-4 py-3 text-sm font-semibold text-[var(--brand-text)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
              href={brand.contact.instagramUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Instagram className="h-4 w-4" />
              {brand.contact.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
