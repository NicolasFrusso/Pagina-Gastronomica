import { ShoppingBag } from 'lucide-react'

export function FloatingCartButton({
  formatMoney,
  itemCount,
  onClick,
  totalAmount,
}) {
  const summaryLabel =
    itemCount > 0 ? `${itemCount} item${itemCount === 1 ? '' : 's'}` : 'Sin items'

  return (
    <button
      aria-label={`Abrir carrito. ${summaryLabel}. Total ${formatMoney(totalAmount)}.`}
      className="fixed bottom-4 left-1/2 z-40 inline-flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-between gap-4 rounded-full bg-[var(--brand-secondary)] px-4 py-3 text-left text-white shadow-menu transition hover:-translate-y-0.5 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] sm:bottom-6 sm:right-6 sm:left-auto sm:w-auto sm:min-w-[260px] sm:translate-x-0"
      onClick={onClick}
      type="button"
    >
      <span className="flex items-center gap-3">
        <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/12">
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-[var(--brand-primary)] px-1.5 py-0.5 text-[11px] font-bold text-white">
            {itemCount}
          </span>
        </span>

        <span className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">
            Carrito
          </span>
          <span className="text-sm font-semibold">{summaryLabel}</span>
        </span>
      </span>

      <span className="text-base font-extrabold tracking-[-0.03em]">
        {formatMoney(totalAmount)}
      </span>
    </button>
  )
}
