import { forwardRef } from 'react'
import { categoryIconMap, fallbackCategoryIcon } from '../lib/iconMap'
import { ProductCard } from './ProductCard'

export const CategorySection = forwardRef(function CategorySection(
  {
    cartQuantityByProductId,
    category,
    formatMoney,
    isMobile,
    onAddToCart,
  },
  ref,
) {
  const Icon = categoryIconMap[category.icon] ?? fallbackCategoryIcon

  return (
    <section
      className={isMobile ? '' : 'scroll-mt-44'}
      data-category-id={category.id}
      id={`section-${category.id}`}
      ref={ref}
    >
      {!isMobile ? (
        <div className="mb-5 flex flex-col gap-3 border-b border-[var(--brand-line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary-soft)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              <Icon className="h-4 w-4" />
              {category.name}
            </div>
            <h2 className="mt-3 font-heading text-3xl tracking-[-0.04em] text-[var(--brand-text)]">
              {category.name}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--brand-muted)] sm:text-base">
              {category.description}
            </p>
          </div>

          <p className="text-sm font-semibold text-[var(--brand-muted)]">
            {category.products.length} opcion
            {category.products.length === 1 ? '' : 'es'}
          </p>
        </div>
      ) : null}

      <div className={`grid ${isMobile ? 'gap-4' : 'gap-4 lg:grid-cols-2'}`}>
        {category.products.map((product) => (
          <ProductCard
            cartQuantity={cartQuantityByProductId[product.id] ?? 0}
            formatMoney={formatMoney}
            isMobile={isMobile}
            key={product.id}
            onAddToCart={onAddToCart}
            product={product}
          />
        ))}
      </div>
    </section>
  )
})
