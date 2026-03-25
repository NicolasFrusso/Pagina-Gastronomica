import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { CartDrawer } from './components/CartDrawer'
import { CategorySection } from './components/CategorySection'
import { CategoryTabs } from './components/CategoryTabs'
import { FloatingCartButton } from './components/FloatingCartButton'
import { HeroHeader } from './components/HeroHeader'
import { MenuContainer } from './components/MenuContainer'
import { SearchBar } from './components/SearchBar'
import { brandConfig } from './data/brandConfig'
import { restaurantData } from './data/restaurantData'
import {
  addCartItem,
  buildCartWhatsAppLink,
  decrementCartItem,
  formatPrice,
  getBrandStyles,
  getCartItemCount,
  getCartLineItems,
  getCartTotal,
  incrementCartItem,
  matchesSearchTerm,
  removeCartItem,
} from './lib/restaurantHelpers'

function App() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia('(max-width: 639px)').matches
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState(
    restaurantData.categories[0]?.id ?? 'all',
  )
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const deferredSearchTerm = useDeferredValue(searchTerm.trim())
  const menuTopRef = useRef(null)
  const sectionRefs = useRef({})

  const desktopSections = restaurantData.categories
    .map((category) => ({
      ...category,
      products: restaurantData.products.filter(
        (product) =>
          product.categoryId === category.id &&
          matchesSearchTerm(product, deferredSearchTerm),
      ),
    }))
    .filter((category) => category.products.length > 0)

  const mobileActiveCategoryId =
    activeCategory === 'all'
      ? restaurantData.categories[0]?.id ?? 'all'
      : activeCategory
  const mobileActiveCategory = restaurantData.categories.find(
    (category) => category.id === mobileActiveCategoryId,
  )
  const mobileCategoryProducts = mobileActiveCategory
    ? restaurantData.products.filter(
        (product) =>
          product.categoryId === mobileActiveCategory.id &&
          matchesSearchTerm(product, deferredSearchTerm),
      )
    : []
  const mobileSections = mobileActiveCategory
    ? mobileCategoryProducts.length > 0
      ? [
        {
          ...mobileActiveCategory,
          products: mobileCategoryProducts,
        },
      ]
      : []
    : []
  const sections = isMobile ? mobileSections : desktopSections

  const visibleCategoryIds = sections.map((category) => category.id)
  const visibleCategoryKey = visibleCategoryIds.join('|')
  const resolvedActiveCategory =
    isMobile
      ? mobileActiveCategoryId
      : activeCategory === 'all' || visibleCategoryIds.includes(activeCategory)
      ? activeCategory
      : visibleCategoryIds[0] ?? 'all'
  const resultsCount = sections.reduce(
    (accumulator, category) => accumulator + category.products.length,
    0,
  )
  const brandStyles = getBrandStyles(brandConfig.colors)
  const totalProducts = restaurantData.products.length
  const cartLineItems = getCartLineItems(cartItems, restaurantData.products)
  const cartItemCount = getCartItemCount(cartItems)
  const cartTotal = getCartTotal(cartItems, restaurantData.products)
  const cartQuantityByProductId = cartItems.reduce((accumulator, item) => {
    accumulator[item.productId] = item.quantity

    return accumulator
  }, {})
  const checkoutUrl = buildCartWhatsAppLink({
    cartItems,
    contact: brandConfig.contact,
    money: brandConfig.money,
    products: restaurantData.products,
    restaurantName: brandConfig.name,
  })
  const formatMoney = (value) => formatPrice(value, brandConfig.money)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)')

    const handleChange = (event) => {
      setIsMobile(event.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)

      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    mediaQuery.addListener(handleChange)

    return () => mediaQuery.removeListener(handleChange)
  }, [])

  useEffect(() => {
    if (isMobile || !visibleCategoryKey) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const currentSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)
          .at(0)

        if (currentSection?.target?.dataset.categoryId) {
          setActiveCategory(currentSection.target.dataset.categoryId)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.6],
      },
    )

    sections.forEach((section) => {
      const node = sectionRefs.current[section.id]

      if (node) {
        observer.observe(node)
      }
    })

    return () => observer.disconnect()
  }, [isMobile, sections, visibleCategoryKey])

  useEffect(() => {
    if (!isCartOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsCartOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCartOpen])

  const handleCategorySelect = (categoryId) => {
    if (isMobile) {
      setActiveCategory(categoryId)
      return
    }

    if (categoryId === 'all') {
      setActiveCategory('all')
      menuTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    setActiveCategory(categoryId)
    sectionRefs.current[categoryId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleOpenCart = () => {
    setIsCartOpen(true)
  }

  const handleCloseCart = () => {
    setIsCartOpen(false)
  }

  const handleAddToCart = (productId) => {
    setCartItems((currentCartItems) => addCartItem(currentCartItems, productId))
  }

  const handleIncrementCartItem = (productId) => {
    setCartItems((currentCartItems) =>
      incrementCartItem(currentCartItems, productId),
    )
  }

  const handleDecrementCartItem = (productId) => {
    setCartItems((currentCartItems) =>
      decrementCartItem(currentCartItems, productId),
    )
  }

  const handleRemoveCartItem = (productId) => {
    setCartItems((currentCartItems) =>
      removeCartItem(currentCartItems, productId),
    )
  }

  return (
    <div
      className="min-h-screen bg-[var(--brand-background)] pb-24 text-[var(--brand-text)] sm:pb-4"
      style={brandStyles}
    >
      <HeroHeader
        brand={brandConfig}
        cartItemCount={cartItemCount}
        onOpenCart={handleOpenCart}
      />

      <MenuContainer
        cartItemCount={cartItemCount}
        isMobile={isMobile}
        mapUrl={brandConfig.contact.mapUrl}
        onOpenCart={handleOpenCart}
        query={searchTerm}
        ref={menuTopRef}
        resultsCount={resultsCount}
        totalProducts={totalProducts}
      >
        <div
          className={`sticky z-30 ${
            isMobile
              ? 'top-0 z-40 -mx-1 mb-4 border-b border-[var(--brand-line)] bg-[var(--brand-surface)] px-1 pb-3 pt-2 shadow-[0_10px_18px_rgba(32,25,20,0.08)]'
              : 'top-3 -mx-1 mb-8 rounded-[28px] bg-white/92 px-1 pb-1 pt-1 shadow-card backdrop-blur'
          }`}
        >
          <SearchBar
            isMobile={isMobile}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            value={searchTerm}
          />
          <CategoryTabs
            activeCategory={resolvedActiveCategory}
            categories={restaurantData.categories}
            isMobile={isMobile}
            onSelect={handleCategorySelect}
          />
        </div>

        {sections.length > 0 ? (
          <div className={isMobile ? 'space-y-4 pt-1' : 'space-y-10'}>
            {sections.map((section) => (
              <CategorySection
                cartQuantityByProductId={cartQuantityByProductId}
                category={section}
                formatMoney={formatMoney}
                isMobile={isMobile}
                key={section.id}
                onAddToCart={handleAddToCart}
                ref={(node) => {
                  sectionRefs.current[section.id] = node
                }}
              />
            ))}
          </div>
        ) : (
          <section className="rounded-[30px] border border-dashed border-[var(--brand-line)] bg-[var(--brand-card)] px-6 py-12 text-center shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
              Sin coincidencias
            </p>
            <h2 className="mt-3 font-heading text-3xl text-[var(--brand-text)]">
              No encontramos productos para &quot;{searchTerm}&quot;
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--brand-muted)] sm:text-base">
              Proba con otro termino o limpia la busqueda para volver a ver toda
              la carta.
            </p>
            <button
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
              onClick={() => setSearchTerm('')}
              type="button"
            >
              Ver menu completo
            </button>
          </section>
        )}
      </MenuContainer>

      <FloatingCartButton
        formatMoney={formatMoney}
        itemCount={cartItemCount}
        onClick={handleOpenCart}
        totalAmount={cartTotal}
      />

      <CartDrawer
        checkoutUrl={checkoutUrl}
        formatMoney={formatMoney}
        isOpen={isCartOpen}
        itemCount={cartItemCount}
        items={cartLineItems}
        onClose={handleCloseCart}
        onDecrement={handleDecrementCartItem}
        onIncrement={handleIncrementCartItem}
        onRemove={handleRemoveCartItem}
        totalAmount={cartTotal}
      />
    </div>
  )
}

export default App
