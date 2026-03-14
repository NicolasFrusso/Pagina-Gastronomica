import { ProductImagePlaceholder } from './ProductImagePlaceholder'

export function ProductCard({ cartQuantity, formatMoney, onAddToCart, product }) {
  const quantityLabel =
    cartQuantity > 0 ? `En carrito: ${cartQuantity}` : 'Tocar para agregar'

  return (
    <button
      aria-label={`Agregar ${product.name} al carrito. ${quantityLabel}.`}
      className="group flex min-h-[176px] w-full items-stretch gap-4 rounded-[28px] border border-[var(--brand-line)] bg-[var(--brand-card)] p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:border-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] sm:p-5"
      onClick={() => onAddToCart(product.id)}
      type="button"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-[var(--brand-text)]">
            {product.name}
          </h3>
          {product.badge ? (
            <span className="rounded-full bg-[var(--brand-primary-soft)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--brand-primary)]">
              {product.badge}
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)] sm:text-[15px]">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="text-xl font-extrabold tracking-[-0.03em] text-[var(--brand-primary)]">
            {formatMoney(product.price)}
          </p>
          <div className="text-right">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${
                cartQuantity > 0
                  ? 'bg-[var(--brand-primary-soft)] text-[var(--brand-primary)]'
                  : 'bg-white text-[var(--brand-muted)]'
              }`}
            >
              {quantityLabel}
            </span>
          </div>
        </div>
      </div>

      <ProductImagePlaceholder image={product.image} name={product.name} />
    </button>
  )
}
