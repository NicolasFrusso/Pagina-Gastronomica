import { categoryIconMap, fallbackCategoryIcon } from '../lib/iconMap'

function CategoryButton({ active, category, onSelect }) {
  const Icon = categoryIconMap[category.icon] ?? fallbackCategoryIcon

  return (
    <button
      aria-controls={`section-${category.id}`}
      className={`flex min-w-[102px] shrink-0 flex-col items-center justify-center gap-2 rounded-[22px] border px-4 py-3 text-center text-sm font-semibold transition ${
        active
          ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] shadow-card'
          : 'border-[var(--brand-line)] bg-white text-[var(--brand-muted)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]'
      }`}
      onClick={() => onSelect(category.id)}
      type="button"
    >
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
          active ? 'bg-white text-[var(--brand-primary)]' : 'bg-[var(--brand-card)]'
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span>{category.name}</span>
    </button>
  )
}

export function CategoryTabs({ activeCategory, categories, onSelect }) {
  return (
    <div className="mt-3 overflow-x-auto pb-2 no-scrollbar">
      <div className="flex min-w-max gap-3 px-1">
        <button
          className={`flex min-w-[102px] shrink-0 flex-col items-center justify-center gap-2 rounded-[22px] border px-4 py-3 text-center text-sm font-semibold transition ${
            activeCategory === 'all'
              ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] shadow-card'
              : 'border-[var(--brand-line)] bg-white text-[var(--brand-muted)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]'
          }`}
          onClick={() => onSelect('all')}
          type="button"
        >
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
              activeCategory === 'all'
                ? 'bg-white text-[var(--brand-primary)]'
                : 'bg-[var(--brand-card)]'
            }`}
          >
            <span className="text-base font-bold">+</span>
          </span>
          <span>Todas</span>
        </button>

        {categories.map((category) => (
          <CategoryButton
            active={activeCategory === category.id}
            category={category}
            key={category.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
