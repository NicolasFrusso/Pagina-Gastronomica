import { ProductImagePlaceholder } from './ProductImagePlaceholder'

export function ProductCard({
  cartQuantity,
  formatMoney,
  isMobile,
  onAddToCart,
  product,
}) {
  const quantityLabel =
    cartQuantity > 0 ? `En carrito: ${cartQuantity}` : 'Tocar para agregar'
  const cardClassName = isMobile
    ? 'group flex min-h-[132px] w-full items-stretch gap-3 rounded-[14px] border border-[var(--brand-line)] bg-white p-4 text-left shadow-[0_6px_16px_var(--brand-shadow-soft)] transition hover:border-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]'
    : 'group flex min-h-[176px] w-full items-stretch gap-4 rounded-[28px] border border-[var(--brand-line)] bg-[var(--brand-card)] p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:border-[var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] sm:p-5'

  return (
    <button
      aria-label={`Agregar ${product.name} al carrito. ${quantityLabel}.`}
      className={cardClassName}
      onClick={() => onAddToCart(product.id)}
      type="button"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`font-heading font-semibold tracking-[-0.03em] text-[var(--brand-text)] ${
              isMobile ? 'text-[1.08rem] leading-5' : 'text-xl'
            }`}
          >
            {product.name}
          </h3>
          {product.badge ? (
            <span
              className={`rounded-full bg-[var(--brand-primary-soft)] font-bold uppercase tracking-[0.16em] text-[var(--brand-primary)] ${
                isMobile ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'
              }`}
            >
              {product.badge}
            </span>
          ) : null}
        </div>

        <p
          className={`text-[var(--brand-muted)] ${
            isMobile
              ? 'mt-2 text-[0.94rem] leading-5'
              : 'mt-3 text-sm leading-7 sm:text-[15px]'
          }`}
        >
          {product.description}
        </p>

        <div className={`mt-auto ${isMobile ? 'pt-3' : 'flex items-end justify-between gap-3 pt-5'}`}>
          <p
            className={`font-extrabold tracking-[-0.03em] text-[var(--brand-primary)] ${
              isMobile ? 'text-[1.55rem] leading-none' : 'text-xl'
            }`}
          >
            {formatMoney(product.price)}
          </p>

          {isMobile ? (
            cartQuantity > 0 ? (
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
                En carrito: {cartQuantity}
              </p>
            ) : null
          ) : (
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
          )}
        </div>
      </div>

      <ProductImagePlaceholder
        image={product.image}
        isMobile={isMobile}
        name={product.name}
      />
    </button>
  )
}
