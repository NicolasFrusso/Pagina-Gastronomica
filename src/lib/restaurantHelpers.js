function normalizeWhatsAppNumber(whatsappNumber) {
  return whatsappNumber.replace(/\D/g, '')
}

export function buildWhatsAppUrl(whatsappNumber, message) {
  const normalizedNumber = normalizeWhatsAppNumber(whatsappNumber)

  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`
}

export function createWhatsAppLink(contact) {
  return buildWhatsAppUrl(contact.whatsappNumber, contact.whatsappMessage)
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

export function addCartItem(cartItems, productId) {
  const existingItem = cartItems.find((item) => item.productId === productId)

  if (!existingItem) {
    return [...cartItems, { productId, quantity: 1 }]
  }

  return cartItems.map((item) =>
    item.productId === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  )
}

export function incrementCartItem(cartItems, productId) {
  return addCartItem(cartItems, productId)
}

export function decrementCartItem(cartItems, productId) {
  return cartItems
    .map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    )
    .filter((item) => item.quantity > 0)
}

export function removeCartItem(cartItems, productId) {
  return cartItems.filter((item) => item.productId !== productId)
}

export function getCartItemCount(cartItems) {
  return cartItems.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0,
  )
}

export function getCartLineItems(cartItems, products) {
  return cartItems
    .map((item) => {
      const product = products.find(
        (catalogProduct) => catalogProduct.id === item.productId,
      )

      if (!product) {
        return null
      }

      const subtotal = product.price * item.quantity

      return {
        ...item,
        product,
        subtotal,
      }
    })
    .filter(Boolean)
}

export function getCartTotal(cartItems, products) {
  return getCartLineItems(cartItems, products).reduce(
    (accumulator, item) => accumulator + item.subtotal,
    0,
  )
}

export function buildCartWhatsAppMessage({
  cartItems,
  money,
  products,
  restaurantName,
}) {
  const lineItems = getCartLineItems(cartItems, products)

  if (!lineItems.length) {
    return `Hola ${restaurantName}, quiero hacer un pedido.`
  }

  const itemLines = lineItems.map(
    (item) =>
      `- ${item.quantity} x ${item.product.name} = ${formatPrice(item.subtotal, money)}`,
  )
  const total = getCartTotal(cartItems, products)

  return [
    `Hola ${restaurantName}, quiero hacer este pedido:`,
    ...itemLines,
    `Total: ${formatPrice(total, money)}`,
    'Me confirman el pedido y tiempo estimado?',
  ].join('\n')
}

export function buildCartWhatsAppLink({
  cartItems,
  contact,
  money,
  products,
  restaurantName,
}) {
  const message = buildCartWhatsAppMessage({
    cartItems,
    money,
    products,
    restaurantName,
  })

  return buildWhatsAppUrl(contact.whatsappNumber, message)
}
