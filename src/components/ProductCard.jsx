import { ProductImagePlaceholder } from './ProductImagePlaceholder'

export function ProductCard({ formatMoney, product }) {
  return (
    <article className="group flex min-h-[176px] items-stretch gap-4 rounded-[28px] border border-[var(--brand-line)] bg-[var(--brand-card)] p-4 shadow-card transition hover:-translate-y-0.5 hover:border-[var(--brand-primary)] sm:p-5">
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

        <div className="mt-auto pt-5">
          <p className="text-xl font-extrabold tracking-[-0.03em] text-[var(--brand-primary)]">
            {formatMoney(product.price)}
          </p>
        </div>
      </div>

      <ProductImagePlaceholder image={product.image} name={product.name} />
    </article>
  )
}
