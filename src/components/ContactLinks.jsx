import {
  ArrowUpRight,
  Clock3,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  PhoneCall,
} from 'lucide-react'

function ContactItem({ children, icon }) {
  const Icon = icon

  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-white">
        <Icon className="h-4 w-4" />
      </span>
      <div className="text-sm leading-6 text-white/84">{children}</div>
    </div>
  )
}

function SocialIconButton({ href, icon, label }) {
  const Icon = icon

  return (
    <a
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white transition hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <Icon className="h-4 w-4" />
    </a>
  )
}

export function ContactLinks({ brand, mapUrl, whatsAppUrl }) {
  return (
    <aside className="w-full max-w-md rounded-[30px] bg-[rgba(10,17,20,0.18)] p-5 text-white shadow-glow ring-1 ring-white/12 backdrop-blur sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/64">
        {brand.contact.label}
      </p>

      <div className="mt-5 space-y-4">
        <ContactItem icon={MapPin}>{brand.contact.address}</ContactItem>
        <ContactItem icon={Clock3}>{brand.contact.schedule}</ContactItem>
        <ContactItem icon={PhoneCall}>{brand.contact.phone}</ContactItem>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <SocialIconButton
          href={whatsAppUrl}
          icon={MessageCircle}
          label="Abrir WhatsApp"
        />
        <SocialIconButton
          href={brand.contact.instagramUrl}
          icon={Instagram}
          label="Abrir Instagram"
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--brand-secondary)] transition hover:bg-[var(--brand-primary-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          href={whatsAppUrl}
          rel="noreferrer"
          target="_blank"
        >
          Pedir por WhatsApp
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <a
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          href={mapUrl}
          rel="noreferrer"
          target="_blank"
        >
          Como llegar
          <Navigation className="h-4 w-4" />
        </a>
      </div>
    </aside>
  )
}
