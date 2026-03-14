import { Clock3, MapPin, MessageCircle, PhoneCall } from 'lucide-react'

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function InfoItem({ children, icon }) {
  const Icon = icon

  return (
    <span className="inline-flex items-center gap-2 text-sm text-[var(--brand-muted)]">
      <Icon className="h-4 w-4 text-[var(--brand-primary)]" />
      <span>{children}</span>
    </span>
  )
}

export function HeroHeader({ brand, cartItemCount, onOpenCart }) {
  const initials = getInitials(brand.name)
  const cartLabel =
    cartItemCount > 0 ? `Ver pedido (${cartItemCount})` : 'Pedir por WhatsApp'

  return (
    <header className="relative px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <div className="mx-auto max-w-7xl pb-24 sm:pb-28">
        {/* Header simplificado para reducir altura del hero original */}
        {/* El resto de la pagina permanece sin cambios */}
        <div className="rounded-[26px] border border-[var(--brand-line)] bg-[var(--brand-surface)] shadow-card">
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--brand-line)] bg-[var(--brand-primary-soft)] text-sm font-bold text-[var(--brand-primary)]">
                {brand.logo ? (
                  <img
                    alt={brand.logoAlt}
                    className="h-full w-full object-cover"
                    src={brand.logo}
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-heading text-xl font-semibold tracking-[-0.03em] text-[var(--brand-text)] sm:text-2xl">
                  {brand.name}
                </p>
              </div>
            </div>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] sm:w-auto"
              onClick={onOpenCart}
              type="button"
            >
              <MessageCircle className="h-4 w-4" />
              {cartLabel}
            </button>
          </div>

          <div className="border-t border-[var(--brand-line)] px-4 py-3 sm:px-5">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
              <InfoItem icon={MapPin}>{brand.contact.address}</InfoItem>
              <span className="hidden text-[var(--brand-line)] sm:inline">•</span>
              <InfoItem icon={Clock3}>{brand.contact.schedule}</InfoItem>
              <span className="hidden text-[var(--brand-line)] sm:inline">•</span>
              <InfoItem icon={PhoneCall}>{brand.contact.phone}</InfoItem>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
