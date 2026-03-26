import { ImageIcon } from 'lucide-react'

export function ProductImagePlaceholder({ image, isMobile, name }) {
  const imageWrapperClassName = isMobile
    ? 'h-[96px] w-[96px] shrink-0 overflow-hidden rounded-[14px] border border-[var(--brand-line)] bg-[#f7f5f1]'
    : 'h-[108px] w-[108px] shrink-0 overflow-hidden rounded-[20px] border border-[var(--brand-line)] bg-[var(--brand-card)] sm:h-[120px] sm:w-[120px]'

  if (image) {
    return (
      <div className={imageWrapperClassName}>
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
    <div
      className={`flex shrink-0 items-center justify-center border text-[var(--brand-muted)] ${
        isMobile
          ? 'h-[96px] w-[96px] rounded-[14px] border-[var(--brand-line)] bg-[#f7f5f1]'
          : 'h-[108px] w-[108px] flex-col rounded-[20px] border-dashed border-[var(--brand-line)] bg-[linear-gradient(180deg,#F8F5F1_0%,#F2ECE6_100%)] sm:h-[120px] sm:w-[120px]'
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <ImageIcon className={isMobile ? 'h-9 w-9 text-[#b8b0a7]' : 'h-6 w-6'} />
        {!isMobile ? (
          <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
            Imagen
          </span>
        ) : null}
      </div>
    </div>
  )
}
