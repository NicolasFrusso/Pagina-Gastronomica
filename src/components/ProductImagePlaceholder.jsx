import { ImageIcon } from 'lucide-react'

export function ProductImagePlaceholder({ image, name }) {
  if (image) {
    return (
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[20px] border border-[var(--brand-line)] bg-[var(--brand-card)] sm:h-28 sm:w-28">
        <img
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
          src={image}
        />
      </div>
    )
  }

  return (
    <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-[20px] border border-dashed border-[var(--brand-line)] bg-[linear-gradient(180deg,#F8F5F1_0%,#F2ECE6_100%)] text-[var(--brand-muted)] sm:h-28 sm:w-28">
      <ImageIcon className="h-5 w-5" />
      <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
        Imagen
      </span>
    </div>
  )
}
