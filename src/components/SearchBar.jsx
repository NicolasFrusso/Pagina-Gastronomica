import { Search, X } from 'lucide-react'

export function SearchBar({ isMobile, onChange, onClear, value }) {
  if (isMobile) {
    return (
      <div className="rounded-[14px] border border-[var(--brand-line)] bg-white px-3 py-2.5">
        <label className="flex items-center gap-3">
          <Search className="h-5 w-5 text-[var(--brand-muted)]" />
          <input
            aria-label="Buscar por productos"
            className="w-full border-none bg-transparent text-[15px] text-[var(--brand-text)] outline-none placeholder:text-[var(--brand-muted)]"
            onChange={(event) => onChange(event.target.value)}
            placeholder="Buscar por productos"
            type="search"
            value={value}
          />
          {value ? (
            <button
              aria-label="Limpiar busqueda"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] transition hover:bg-[var(--brand-primary)] hover:text-white"
              onClick={onClear}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </label>
      </div>
    )
  }

  return (
    <div className="rounded-[24px] border border-[var(--brand-line)] bg-[var(--brand-card)] p-2">
      <label className="flex items-center gap-3 rounded-[20px] bg-white px-4 py-3 shadow-[inset_0_0_0_1px_var(--brand-line)] focus-within:shadow-[inset_0_0_0_1px_var(--brand-primary)]">
        <Search className="h-5 w-5 text-[var(--brand-muted)]" />
        <input
          aria-label="Buscar por productos"
          className="w-full border-none bg-transparent text-sm text-[var(--brand-text)] outline-none placeholder:text-[var(--brand-muted)] sm:text-base"
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar por productos"
          type="search"
          value={value}
        />
        {value ? (
          <button
            aria-label="Limpiar busqueda"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] transition hover:bg-[var(--brand-primary)] hover:text-white"
            onClick={onClear}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </label>
    </div>
  )
}
