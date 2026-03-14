import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { CategorySection } from './components/CategorySection'
import { CategoryTabs } from './components/CategoryTabs'
import { Footer } from './components/Footer'
import { HeroHeader } from './components/HeroHeader'
import { MenuContainer } from './components/MenuContainer'
import { SearchBar } from './components/SearchBar'
import { brandConfig } from './data/brandConfig'
import { restaurantData } from './data/restaurantData'
import {
  createWhatsAppLink,
  formatPrice,
  getBrandStyles,
  matchesSearchTerm,
} from './lib/restaurantHelpers'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState(
    restaurantData.categories[0]?.id ?? 'all',
  )
  const deferredSearchTerm = useDeferredValue(searchTerm.trim())
  const menuTopRef = useRef(null)
  const sectionRefs = useRef({})

  const sections = restaurantData.categories
    .map((category) => ({
      ...category,
      products: restaurantData.products.filter(
        (product) =>
          product.categoryId === category.id &&
          matchesSearchTerm(product, deferredSearchTerm),
      ),
    }))
    .filter((category) => category.products.length > 0)

  const visibleCategoryIds = sections.map((category) => category.id)
  const visibleCategoryKey = visibleCategoryIds.join('|')
  const resolvedActiveCategory =
    activeCategory === 'all' || visibleCategoryIds.includes(activeCategory)
      ? activeCategory
      : visibleCategoryIds[0] ?? 'all'
  const resultsCount = sections.reduce(
    (accumulator, category) => accumulator + category.products.length,
    0,
  )
  const whatsAppUrl = createWhatsAppLink(brandConfig.contact)
  const brandStyles = getBrandStyles(brandConfig.colors)
  const totalProducts = restaurantData.products.length

  useEffect(() => {
    if (!visibleCategoryKey) {
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
  }, [sections, visibleCategoryKey])

  const handleCategorySelect = (categoryId) => {
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

  return (
    <div
      className="min-h-screen bg-[var(--brand-background)] text-[var(--brand-text)]"
      style={brandStyles}
    >
      <HeroHeader
        brand={brandConfig}
        totalCategories={restaurantData.categories.length}
        totalProducts={totalProducts}
        whatsAppUrl={whatsAppUrl}
      />

      <MenuContainer
        mapUrl={brandConfig.contact.mapUrl}
        query={searchTerm}
        ref={menuTopRef}
        resultsCount={resultsCount}
        totalProducts={totalProducts}
        whatsAppUrl={whatsAppUrl}
      >
        <div className="sticky top-3 z-30 -mx-1 mb-8 rounded-[28px] bg-white/92 px-1 pb-1 pt-1 shadow-card backdrop-blur">
          <SearchBar
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            value={searchTerm}
          />
          <CategoryTabs
            activeCategory={resolvedActiveCategory}
            categories={restaurantData.categories}
            onSelect={handleCategorySelect}
          />
        </div>

        {sections.length > 0 ? (
          <div className="space-y-10">
            {sections.map((section) => (
              <CategorySection
                category={section}
                formatMoney={(value) => formatPrice(value, brandConfig.money)}
                key={section.id}
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
              Probá con otro termino o limpiá la búsqueda para volver a ver toda
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

      <Footer brand={brandConfig} whatsAppUrl={whatsAppUrl} />
    </div>
  )
}

export default App
