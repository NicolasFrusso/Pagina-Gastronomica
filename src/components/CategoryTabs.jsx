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

export function CategoryTabs({ activeCategory, categories, isMobile, onSelect }) {
  if (isMobile) {
    return (
      <div className="mt-3 overflow-x-auto border-b border-[var(--brand-line)] pb-0 no-scrollbar">
        <div className="flex min-w-max items-center gap-6">
          {categories.map((category) => (
            <button
              className={`shrink-0 border-b-2 pb-3 pt-2 text-[0.97rem] font-semibold transition ${
                activeCategory === category.id
                  ? 'border-[var(--brand-text)] text-[var(--brand-text)]'
                  : 'border-transparent text-[var(--brand-muted)]'
              }`}
              key={category.id}
              onClick={() => onSelect(category.id)}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-3 overflow-x-auto pb-2 no-scrollbar">
      <div className="flex min-w-max gap-3 px-1">
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
