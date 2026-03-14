import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react'

function QuantityButton({ children, label, onClick }) {
  return (
    <button
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-line)] bg-white text-[var(--brand-text)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

function CartLineItem({
  formatMoney,
  item,
  onDecrement,
  onIncrement,
  onRemove,
}) {
  return (
    <article className="rounded-[24px] border border-[var(--brand-line)] bg-[var(--brand-card)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-semibold tracking-[-0.03em] text-[var(--brand-text)]">
            {item.product.name}
          </h3>
          <p className="mt-1 text-sm text-[var(--brand-muted)]">
            {formatMoney(item.product.price)} c/u
          </p>
        </div>

        <button
          aria-label={`Eliminar ${item.product.name} del carrito`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-line)] bg-white text-[var(--brand-muted)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
          onClick={() => onRemove(item.product.id)}
          type="button"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2">
          <QuantityButton
            label={`Restar una unidad de ${item.product.name}`}
            onClick={() => onDecrement(item.product.id)}
          >
            <Minus className="h-4 w-4" />
          </QuantityButton>
          <span className="min-w-[2rem] text-center text-base font-bold text-[var(--brand-text)]">
            {item.quantity}
          </span>
          <QuantityButton
            label={`Sumar una unidad de ${item.product.name}`}
            onClick={() => onIncrement(item.product.id)}
          >
            <Plus className="h-4 w-4" />
          </QuantityButton>
        </div>

        <p className="text-base font-extrabold tracking-[-0.03em] text-[var(--brand-primary)]">
          {formatMoney(item.subtotal)}
        </p>
      </div>
    </article>
  )
}

export function CartDrawer({
  checkoutUrl,
  formatMoney,
  isOpen,
  itemCount,
  items,
  onClose,
  onDecrement,
  onIncrement,
  onRemove,
  totalAmount,
}) {
  const canCheckout = itemCount > 0

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 transition ${isOpen ? '' : 'pointer-events-none'}`}
    >
      <button
        aria-label="Cerrar carrito"
        className={`absolute inset-0 bg-[rgba(32,25,20,0.4)] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        type="button"
      />

      <aside
        aria-label="Carrito de compras"
        aria-modal="true"
        className={`absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-[32px] bg-[var(--brand-surface)] shadow-menu transition-transform duration-300 sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:max-h-none sm:w-full sm:max-w-md sm:rounded-none sm:rounded-l-[32px] ${isOpen ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-y-0 sm:translate-x-full'}`}
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-[var(--brand-line)] px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
              Tu pedido
            </p>
            <h2 className="mt-1 font-heading text-2xl font-semibold tracking-[-0.03em] text-[var(--brand-text)]">
              Carrito
            </h2>
          </div>

          <button
            aria-label="Cerrar drawer del carrito"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-line)] bg-[var(--brand-card)] text-[var(--brand-text)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <CartLineItem
                  formatMoney={formatMoney}
                  item={item}
                  key={item.product.id}
                  onDecrement={onDecrement}
                  onIncrement={onIncrement}
                  onRemove={onRemove}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[var(--brand-line)] bg-[var(--brand-card)] px-6 py-10 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-[var(--brand-primary)] shadow-card">
                <ShoppingBag className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-semibold tracking-[-0.03em] text-[var(--brand-text)]">
                Tu carrito esta vacio
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--brand-muted)]">
                Tocá cualquier producto de la carta para sumar unidades y armar
                el pedido antes de enviarlo por WhatsApp.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-[var(--brand-line)] px-5 py-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--brand-muted)]">
                {itemCount} item{itemCount === 1 ? '' : 's'}
              </p>
              <p className="mt-1 text-2xl font-extrabold tracking-[-0.04em] text-[var(--brand-text)]">
                {formatMoney(totalAmount)}
              </p>
            </div>

            <p className="max-w-[12rem] text-right text-xs leading-6 text-[var(--brand-muted)]">
              Confirmá el resumen y abrí WhatsApp para coordinar stock y tiempo
              estimado.
            </p>
          </div>

          {canCheckout ? (
            <a
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
              href={checkoutUrl}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle className="h-4 w-4" />
              Finalizar pedido por WhatsApp
            </a>
          ) : (
            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-line)] px-5 py-3 text-sm font-semibold text-[var(--brand-muted)]"
              disabled
              type="button"
            >
              <MessageCircle className="h-4 w-4" />
              Finalizar pedido por WhatsApp
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}
