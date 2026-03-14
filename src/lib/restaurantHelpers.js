export function createWhatsAppLink(contact) {
  const normalizedNumber = contact.whatsappNumber.replace(/\D/g, '')
  const message = encodeURIComponent(contact.whatsappMessage)

  return `https://wa.me/${normalizedNumber}?text=${message}`
}

export function formatPrice(value, money) {
  return new Intl.NumberFormat(money.locale, {
    style: 'currency',
    currency: money.currency,
    minimumFractionDigits: money.minimumFractionDigits,
    maximumFractionDigits: money.maximumFractionDigits,
  }).format(value)
}

export function getBrandStyles(colors) {
  return {
    '--brand-primary': colors.primary,
    '--brand-primary-strong': colors.primaryStrong,
    '--brand-primary-soft': colors.primarySoft,
    '--brand-secondary': colors.secondary,
    '--brand-background': colors.background,
    '--brand-surface': colors.surface,
    '--brand-card': colors.card,
    '--brand-line': colors.line,
    '--brand-text': colors.text,
    '--brand-muted': colors.muted,
    '--brand-shadow': colors.shadow,
    '--brand-shadow-soft': colors.shadowSoft,
  }
}

export function matchesSearchTerm(product, searchTerm) {
  if (!searchTerm) {
    return true
  }

  const normalizedTerm = searchTerm.toLowerCase()
  const target = `${product.name} ${product.description}`.toLowerCase()

  return target.includes(normalizedTerm)
}
