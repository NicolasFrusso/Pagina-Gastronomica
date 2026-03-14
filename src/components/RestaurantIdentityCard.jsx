function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function RestaurantIdentityCard({ brand }) {
  const initials = getInitials(brand.name)

  return (
    <div className="max-w-xl rounded-[30px] bg-white/96 p-5 shadow-glow ring-1 ring-white/60 backdrop-blur sm:p-6">
      <div className="flex items-start gap-4 sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[24px] border border-[var(--brand-line)] bg-[var(--brand-primary-soft)] text-2xl font-bold text-[var(--brand-primary)]">
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
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-primary)]">
            {brand.hero.badge}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-[-0.04em] text-[var(--brand-text)] sm:text-4xl">
            {brand.name}
          </h1>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)] sm:text-base">
            {brand.description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {brand.hero.highlights.map((highlight) => (
          <span
            className="rounded-full border border-[var(--brand-line)] bg-[var(--brand-surface)] px-3 py-2 text-xs font-semibold text-[var(--brand-muted)]"
            key={highlight}
          >
            {highlight}
          </span>
        ))}
      </div>
    </div>
  )
}
