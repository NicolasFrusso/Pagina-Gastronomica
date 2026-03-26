import {
  AlertTriangle,
  ImagePlus,
  LoaderCircle,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { brandConfig } from '../data/brandConfig'
import { getBrandStyles } from '../lib/restaurantHelpers'
import {
  adminIconOptions,
  deleteCategory,
  deleteProduct,
  fetchAdminAppData,
  getAdminSession,
  saveCategory,
  saveProduct,
  saveRestaurantSettings,
  signInAdmin,
  signOutAdmin,
  subscribeToAdminAuthChanges,
  uploadAsset,
} from '../lib/menuDataApi'
import { isSupabaseConfigured } from '../lib/supabaseClient'

function sortByOrder(firstItem, secondItem) {
  if (firstItem.sortOrder !== secondItem.sortOrder) {
    return firstItem.sortOrder - secondItem.sortOrder
  }

  return String(firstItem.name).localeCompare(String(secondItem.name))
}

function TextField({
  label,
  name,
  onChange,
  placeholder,
  type = 'text',
  value,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[var(--brand-text)]">
        {label}
      </span>
      <input
        className="w-full rounded-2xl border border-[var(--brand-line)] bg-white px-4 py-3 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  )
}

function TextAreaField({ label, name, onChange, placeholder, rows = 4, value }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[var(--brand-text)]">
        {label}
      </span>
      <textarea
        className="w-full rounded-2xl border border-[var(--brand-line)] bg-white px-4 py-3 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
    </label>
  )
}

function ToggleField({ checked, label, onChange }) {
  return (
    <label className="inline-flex items-center gap-3 text-sm font-semibold text-[var(--brand-text)]">
      <input
        checked={checked}
        className="h-4 w-4 rounded border-[var(--brand-line)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
        onChange={onChange}
        type="checkbox"
      />
      {label}
    </label>
  )
}

function SectionCard({ action, children, description, title }) {
  return (
    <section className="rounded-[30px] border border-[var(--brand-line)] bg-[var(--brand-surface)] p-5 shadow-card sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-[var(--brand-text)]">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--brand-muted)]">
            {description}
          </p>
        </div>
        {action}
      </div>

      {children}
    </section>
  )
}

function Banner({ tone, text }) {
  const className =
    tone === 'error'
      ? 'border-red-200 bg-red-50 text-red-700'
      : 'border-emerald-200 bg-emerald-50 text-emerald-700'

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${className}`}>
      {text}
    </div>
  )
}

function FileUploadField({ label, onChange, previewUrl, uploading }) {
  return (
    <div className="block">
      <span className="mb-2 block text-sm font-semibold text-[var(--brand-text)]">
        {label}
      </span>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--brand-line)] bg-[var(--brand-card)] px-4 py-3 text-sm font-semibold text-[var(--brand-text)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]">
          {uploading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {uploading ? 'Subiendo...' : 'Subir imagen'}
          <input
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
            onChange={onChange}
            type="file"
          />
        </label>
        {previewUrl ? (
          <a
            className="truncate text-sm font-medium text-[var(--brand-primary)] underline-offset-4 hover:underline"
            href={previewUrl}
            rel="noreferrer"
            target="_blank"
          >
            Ver imagen cargada
          </a>
        ) : (
          <span className="text-sm text-[var(--brand-muted)]">
            Sin imagen cargada
          </span>
        )}
      </div>
    </div>
  )
}

function AdminLogin({
  email,
  error,
  loading,
  onChange,
  onSubmit,
  password,
}) {
  return (
    <div className="mx-auto w-full max-w-md rounded-[32px] border border-[var(--brand-line)] bg-[var(--brand-surface)] p-6 shadow-card sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--brand-primary)]">
        Admin
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-[var(--brand-text)]">
        Iniciar sesion
      </h1>
      <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
        Entra con el usuario administrador de Supabase para editar la carta y los
        datos del restaurante.
      </p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <TextField
          label="Email"
          name="email"
          onChange={onChange}
          placeholder="admin@tudominio.com"
          type="email"
          value={email}
        />
        <TextField
          label="Contrasena"
          name="password"
          onChange={onChange}
          placeholder="Tu contrasena"
          type="password"
          value={password}
        />

        {error ? <Banner text={error} tone="error" /> : null}

        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
          disabled={loading}
          type="submit"
        >
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          {loading ? 'Ingresando...' : 'Entrar al panel'}
        </button>
      </form>
    </div>
  )
}

function ConfigMissingState() {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-[32px] border border-[var(--brand-line)] bg-[var(--brand-surface)] p-6 shadow-card sm:p-8">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-[var(--brand-text)]">
            Falta configurar Supabase
          </h1>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
            Para usar el panel admin tenes que definir las variables
            `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en tu entorno y crear
            las tablas del proyecto en Supabase.
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
            La carta publica sigue funcionando con datos locales, pero el admin no
            puede iniciar sesion ni guardar cambios hasta completar esa
            configuracion.
          </p>
        </div>
      </div>
    </div>
  )
}

function LoadingState({ text }) {
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-[32px] border border-[var(--brand-line)] bg-[var(--brand-surface)] px-6 py-8 shadow-card">
      <LoaderCircle className="h-5 w-5 animate-spin text-[var(--brand-primary)]" />
      <span className="text-sm font-semibold text-[var(--brand-text)]">{text}</span>
    </div>
  )
}

export function AdminPage() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [adminLoading, setAdminLoading] = useState(false)
  const [adminError, setAdminError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [restaurantSettings, setRestaurantSettings] = useState(null)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [restaurantSaving, setRestaurantSaving] = useState(false)
  const [savingCategoryId, setSavingCategoryId] = useState('')
  const [savingProductId, setSavingProductId] = useState('')
  const [uploadingTarget, setUploadingTarget] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [productCategoryFilter, setProductCategoryFilter] = useState('all')

  const brandStyles = getBrandStyles(brandConfig.colors)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false)
      return undefined
    }

    let isMounted = true

    getAdminSession()
      .then((nextSession) => {
        if (!isMounted) {
          return
        }

        setSession(nextSession)
        setAuthLoading(false)
      })
      .catch((error) => {
        if (!isMounted) {
          return
        }

        setLoginError(error.message)
        setAuthLoading(false)
      })

    const unsubscribe = subscribeToAdminAuthChanges((nextSession) => {
      setSession(nextSession)
      setAuthLoading(false)
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!session) {
      return
    }

    setAdminLoading(true)
    setAdminError('')

    fetchAdminAppData()
      .then((data) => {
        setRestaurantSettings(data.restaurantSettings)
        setCategories([...data.categories].sort(sortByOrder))
        setProducts([...data.products].sort(sortByOrder))
      })
      .catch((error) => {
        setAdminError(error.message)
      })
      .finally(() => {
        setAdminLoading(false)
      })
  }, [session])

  const categoryOptions = useMemo(
    () => [...categories].sort(sortByOrder),
    [categories],
  )

  const filteredProducts = useMemo(() => {
    return [...products]
      .sort(sortByOrder)
      .filter((product) => {
        const matchesCategory =
          productCategoryFilter === 'all' ||
          product.categoryId === productCategoryFilter
        const matchesText = `${product.name} ${product.description}`
          .toLowerCase()
          .includes(productSearch.toLowerCase())

        return matchesCategory && matchesText
      })
  }, [productCategoryFilter, productSearch, products])

  const linkedProductsByCategory = useMemo(() => {
    return products.reduce((accumulator, product) => {
      accumulator[product.categoryId] = (accumulator[product.categoryId] ?? 0) + 1

      return accumulator
    }, {})
  }, [products])

  const handleLoginFieldChange = (event) => {
    const { name, value } = event.target

    setLoginForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    setLoggingIn(true)
    setLoginError('')

    try {
      await signInAdmin(loginForm)
    } catch (error) {
      setLoginError(error.message)
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOutAdmin()
      setStatusMessage('')
    } catch (error) {
      setAdminError(error.message)
    }
  }

  const refreshAdminData = async () => {
    setAdminLoading(true)
    setAdminError('')

    try {
      const data = await fetchAdminAppData()

      setRestaurantSettings(data.restaurantSettings)
      setCategories([...data.categories].sort(sortByOrder))
      setProducts([...data.products].sort(sortByOrder))
      setStatusMessage('Datos actualizados desde Supabase.')
    } catch (error) {
      setAdminError(error.message)
    } finally {
      setAdminLoading(false)
    }
  }

  const handleRestaurantFieldChange = (event) => {
    const { name, value } = event.target

    setRestaurantSettings((currentSettings) => ({
      ...currentSettings,
      [name]: value,
    }))
  }

  const handleRestaurantSave = async () => {
    setRestaurantSaving(true)
    setAdminError('')

    try {
      const savedSettings = await saveRestaurantSettings(restaurantSettings)

      setRestaurantSettings(savedSettings)
      setStatusMessage('Datos del restaurante guardados.')
    } catch (error) {
      setAdminError(error.message)
    } finally {
      setRestaurantSaving(false)
    }
  }

  const handleRestaurantLogoUpload = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setUploadingTarget('restaurant-logo')
    setAdminError('')

    try {
      const publicUrl = await uploadAsset({ file, folder: 'logos' })

      setRestaurantSettings((currentSettings) => ({
        ...currentSettings,
        logoUrl: publicUrl,
      }))
      setStatusMessage('Logo cargado. Guarda el formulario para publicarlo.')
    } catch (error) {
      setAdminError(error.message)
    } finally {
      setUploadingTarget('')
      event.target.value = ''
    }
  }

  const handleAddCategory = () => {
    const nextSortOrder =
      categories.reduce(
        (highestOrder, category) => Math.max(highestOrder, category.sortOrder),
        0,
      ) + 1

    setCategories((currentCategories) => [
      ...currentCategories,
      {
        id: `temp-category-${Date.now()}`,
        name: '',
        description: '',
        icon: adminIconOptions[0],
        sortOrder: nextSortOrder,
        isActive: true,
      },
    ])
  }

  const handleCategoryChange = (categoryId, field, value) => {
    setCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              [field]: field === 'sortOrder' ? Number(value) : value,
            }
          : category,
      ),
    )
  }

  const handleCategoryToggle = (categoryId, checked) => {
    setCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.id === categoryId ? { ...category, isActive: checked } : category,
      ),
    )
  }

  const handleSaveCategory = async (category) => {
    setSavingCategoryId(category.id)
    setAdminError('')

    try {
      const savedCategory = await saveCategory(category, categories)

      setCategories((currentCategories) =>
        currentCategories
          .map((item) => (item.id === category.id ? savedCategory : item))
          .sort(sortByOrder),
      )

      if (savedCategory.id !== category.id) {
        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.categoryId === category.id
              ? { ...product, categoryId: savedCategory.id }
              : product,
          ),
        )
      }

      setStatusMessage(`Categoria "${savedCategory.name}" guardada.`)
    } catch (error) {
      setAdminError(error.message)
    } finally {
      setSavingCategoryId('')
    }
  }

  const handleDeleteCategory = async (category) => {
    if ((linkedProductsByCategory[category.id] ?? 0) > 0) {
      setAdminError(
        'No se puede eliminar una categoria con productos asociados. Reasignalos o borralos primero.',
      )
      return
    }

    setSavingCategoryId(category.id)
    setAdminError('')

    try {
      if (!String(category.id).startsWith('temp-category-')) {
        await deleteCategory(category.id)
      }

      setCategories((currentCategories) =>
        currentCategories.filter((item) => item.id !== category.id),
      )
      setStatusMessage(`Categoria "${category.name || category.id}" eliminada.`)
    } catch (error) {
      setAdminError(error.message)
    } finally {
      setSavingCategoryId('')
    }
  }

  const handleAddProduct = () => {
    const nextSortOrder =
      products.reduce(
        (highestOrder, product) => Math.max(highestOrder, product.sortOrder),
        0,
      ) + 1

    setProducts((currentProducts) => [
      ...currentProducts,
      {
        id: `temp-product-${Date.now()}`,
        categoryId: categoryOptions[0]?.id ?? '',
        name: '',
        description: '',
        price: 0,
        badge: '',
        imageUrl: null,
        sortOrder: nextSortOrder,
        isActive: true,
      },
    ])
  }

  const handleProductChange = (productId, field, value) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              [field]:
                field === 'price' || field === 'sortOrder' ? Number(value) : value,
            }
          : product,
      ),
    )
  }

  const handleProductToggle = (productId, checked) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, isActive: checked } : product,
      ),
    )
  }

  const handleProductImageUpload = async (productId, event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setUploadingTarget(productId)
    setAdminError('')

    try {
      const publicUrl = await uploadAsset({ file, folder: 'products' })

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId ? { ...product, imageUrl: publicUrl } : product,
        ),
      )
      setStatusMessage('Imagen cargada. Guarda el producto para publicarla.')
    } catch (error) {
      setAdminError(error.message)
    } finally {
      setUploadingTarget('')
      event.target.value = ''
    }
  }

  const handleSaveProduct = async (product) => {
    if (!product.categoryId || String(product.categoryId).startsWith('temp-category-')) {
      setAdminError(
        'El producto necesita una categoria guardada en Supabase antes de publicarse.',
      )
      return
    }

    setSavingProductId(product.id)
    setAdminError('')

    try {
      const savedProduct = await saveProduct(product, products)

      setProducts((currentProducts) =>
        currentProducts
          .map((item) => (item.id === product.id ? savedProduct : item))
          .sort(sortByOrder),
      )
      setStatusMessage(`Producto "${savedProduct.name}" guardado.`)
    } catch (error) {
      setAdminError(error.message)
    } finally {
      setSavingProductId('')
    }
  }

  const handleDeleteProduct = async (product) => {
    setSavingProductId(product.id)
    setAdminError('')

    try {
      if (!String(product.id).startsWith('temp-product-')) {
        await deleteProduct(product.id)
      }

      setProducts((currentProducts) =>
        currentProducts.filter((item) => item.id !== product.id),
      )
      setStatusMessage(`Producto "${product.name || product.id}" eliminado.`)
    } catch (error) {
      setAdminError(error.message)
    } finally {
      setSavingProductId('')
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div
        className="min-h-screen bg-[var(--brand-background)] px-4 py-10 sm:px-6 lg:px-8"
        style={brandStyles}
      >
        <ConfigMissingState />
      </div>
    )
  }

  if (authLoading) {
    return (
      <div
        className="min-h-screen bg-[var(--brand-background)] px-4 py-10 sm:px-6 lg:px-8"
        style={brandStyles}
      >
        <LoadingState text="Verificando sesion..." />
      </div>
    )
  }

  if (!session) {
    return (
      <div
        className="min-h-screen bg-[var(--brand-background)] px-4 py-10 sm:px-6 lg:px-8"
        style={brandStyles}
      >
        <AdminLogin
          email={loginForm.email}
          error={loginError}
          loading={loggingIn}
          onChange={handleLoginFieldChange}
          onSubmit={handleLoginSubmit}
          password={loginForm.password}
        />
      </div>
    )
  }

  if (adminLoading || !restaurantSettings) {
    return (
      <div
        className="min-h-screen bg-[var(--brand-background)] px-4 py-10 sm:px-6 lg:px-8"
        style={brandStyles}
      >
        <LoadingState text="Cargando panel admin..." />
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-[var(--brand-background)] px-4 py-6 sm:px-6 lg:px-8"
      style={brandStyles}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-[32px] border border-[var(--brand-line)] bg-[var(--brand-surface)] p-5 shadow-card sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
                Panel privado
              </p>
              <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-[var(--brand-text)] sm:text-4xl">
                Administracion del menu
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--brand-muted)]">
                Edita en vivo el restaurante, las categorias, los productos y el
                numero que recibe los pedidos por WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-line)] bg-[var(--brand-card)] px-4 py-3 text-sm font-semibold text-[var(--brand-text)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                onClick={refreshAdminData}
                type="button"
              >
                <RefreshCw className="h-4 w-4" />
                Recargar datos
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-secondary)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                onClick={handleLogout}
                type="button"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesion
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-5">
          {adminError ? <Banner text={adminError} tone="error" /> : null}
          {statusMessage ? <Banner text={statusMessage} tone="success" /> : null}

          <SectionCard
            action={
              <button
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-strong)]"
                onClick={handleRestaurantSave}
                type="button"
              >
                {restaurantSaving ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {restaurantSaving ? 'Guardando...' : 'Guardar restaurante'}
              </button>
            }
            description="Actualiza la identidad del local, los datos de contacto y el numero que recibe pedidos."
            title="Restaurante"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <TextField
                label="Nombre del restaurante"
                name="name"
                onChange={handleRestaurantFieldChange}
                placeholder="Casa Origen"
                value={restaurantSettings.name}
              />
              <TextField
                label="Telefono visible"
                name="phone"
                onChange={handleRestaurantFieldChange}
                placeholder="+54 9 11 1234 5678"
                value={restaurantSettings.phone}
              />
              <div className="lg:col-span-2">
                <TextAreaField
                  label="Descripcion"
                  name="description"
                  onChange={handleRestaurantFieldChange}
                  placeholder="Descripcion corta del local"
                  rows={3}
                  value={restaurantSettings.description}
                />
              </div>
              <TextField
                label="Direccion"
                name="address"
                onChange={handleRestaurantFieldChange}
                placeholder="Av. Corrientes 1847, CABA"
                value={restaurantSettings.address}
              />
              <TextField
                label="Horario"
                name="schedule"
                onChange={handleRestaurantFieldChange}
                placeholder="Lun a Dom · 11:30 a 23:30"
                value={restaurantSettings.schedule}
              />
              <TextField
                label="Numero WhatsApp"
                name="whatsappNumber"
                onChange={handleRestaurantFieldChange}
                placeholder="5491155555555"
                value={restaurantSettings.whatsappNumber}
              />
              <TextField
                label="Etiqueta WhatsApp"
                name="whatsappLabel"
                onChange={handleRestaurantFieldChange}
                placeholder="+54 9 11 5555 5555"
                value={restaurantSettings.whatsappLabel}
              />
              <div className="lg:col-span-2">
                <TextAreaField
                  label="Mensaje base WhatsApp"
                  name="whatsappMessage"
                  onChange={handleRestaurantFieldChange}
                  placeholder="Hola Casa Origen, quiero hacer un pedido."
                  rows={3}
                  value={restaurantSettings.whatsappMessage}
                />
              </div>
              <TextField
                label="Instagram URL"
                name="instagramUrl"
                onChange={handleRestaurantFieldChange}
                placeholder="https://instagram.com/casaorigen.menu"
                value={restaurantSettings.instagramUrl}
              />
              <TextField
                label="Instagram handle"
                name="instagramHandle"
                onChange={handleRestaurantFieldChange}
                placeholder="@casaorigen.menu"
                value={restaurantSettings.instagramHandle}
              />
              <TextField
                label="Google Maps URL"
                name="mapUrl"
                onChange={handleRestaurantFieldChange}
                placeholder="https://maps.google.com/?q=..."
                value={restaurantSettings.mapUrl}
              />
              <div className="lg:col-span-2">
                <FileUploadField
                  label="Logo del restaurante"
                  onChange={handleRestaurantLogoUpload}
                  previewUrl={restaurantSettings.logoUrl}
                  uploading={uploadingTarget === 'restaurant-logo'}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            action={
              <button
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-line)] bg-[var(--brand-card)] px-4 py-3 text-sm font-semibold text-[var(--brand-text)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                onClick={handleAddCategory}
                type="button"
              >
                <Plus className="h-4 w-4" />
                Nueva categoria
              </button>
            }
            description="Controla el orden, el icono y la visibilidad de cada categoria del menu."
            title="Categorias"
          >
            <div className="space-y-4">
              {categoryOptions.map((category) => (
                <article
                  className="rounded-[24px] border border-[var(--brand-line)] bg-[var(--brand-card)] p-4"
                  key={category.id}
                >
                  <div className="grid gap-4 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <TextField
                        label="Nombre"
                        name="name"
                        onChange={(event) =>
                          handleCategoryChange(category.id, 'name', event.target.value)
                        }
                        placeholder="Tequenos"
                        value={category.name}
                      />
                    </div>
                    <div className="lg:col-span-3">
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[var(--brand-text)]">
                          Icono
                        </span>
                        <select
                          className="w-full rounded-2xl border border-[var(--brand-line)] bg-white px-4 py-3 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]"
                          onChange={(event) =>
                            handleCategoryChange(
                              category.id,
                              'icon',
                              event.target.value,
                            )
                          }
                          value={category.icon}
                        >
                          {adminIconOptions.map((iconOption) => (
                            <option key={iconOption} value={iconOption}>
                              {iconOption}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="lg:col-span-2">
                      <TextField
                        label="Orden"
                        name="sortOrder"
                        onChange={(event) =>
                          handleCategoryChange(
                            category.id,
                            'sortOrder',
                            event.target.value,
                          )
                        }
                        type="number"
                        value={category.sortOrder}
                      />
                    </div>
                    <div className="lg:col-span-3 flex items-end">
                      <ToggleField
                        checked={category.isActive}
                        label="Categoria activa"
                        onChange={(event) =>
                          handleCategoryToggle(category.id, event.target.checked)
                        }
                      />
                    </div>
                    <div className="lg:col-span-12">
                      <TextAreaField
                        label="Descripcion"
                        name="description"
                        onChange={(event) =>
                          handleCategoryChange(
                            category.id,
                            'description',
                            event.target.value,
                          )
                        }
                        placeholder="Descripcion breve de la categoria"
                        rows={3}
                        value={category.description}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-strong)]"
                      onClick={() => handleSaveCategory(category)}
                      type="button"
                    >
                      {savingCategoryId === category.id ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Guardar categoria
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--brand-text)] transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={(linkedProductsByCategory[category.id] ?? 0) > 0}
                      onClick={() => handleDeleteCategory(category)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar categoria
                    </button>
                    {(linkedProductsByCategory[category.id] ?? 0) > 0 ? (
                      <p className="self-center text-xs font-medium text-[var(--brand-muted)]">
                        Tiene {linkedProductsByCategory[category.id]} producto(s)
                        asociados.
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            action={
              <button
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-line)] bg-[var(--brand-card)] px-4 py-3 text-sm font-semibold text-[var(--brand-text)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                onClick={handleAddProduct}
                type="button"
              >
                <Plus className="h-4 w-4" />
                Nuevo producto
              </button>
            }
            description="Edita nombre, descripcion, precio, imagen, categoria, orden y estado de cada producto."
            title="Productos"
          >
            <div className="mb-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              <TextField
                label="Buscar producto"
                name="productSearch"
                onChange={(event) => setProductSearch(event.target.value)}
                placeholder="Buscar por nombre o descripcion"
                value={productSearch}
              />
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--brand-text)]">
                  Filtrar por categoria
                </span>
                <select
                  className="w-full rounded-2xl border border-[var(--brand-line)] bg-white px-4 py-3 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]"
                  onChange={(event) => setProductCategoryFilter(event.target.value)}
                  value={productCategoryFilter}
                >
                  <option value="all">Todas las categorias</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name || category.id}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <article
                    className="rounded-[24px] border border-[var(--brand-line)] bg-[var(--brand-card)] p-4"
                    key={product.id}
                  >
                    <div className="grid gap-4 lg:grid-cols-12">
                      <div className="lg:col-span-4">
                        <TextField
                          label="Titulo"
                          name="name"
                          onChange={(event) =>
                            handleProductChange(product.id, 'name', event.target.value)
                          }
                          placeholder="Tequenos clasicos x6"
                          value={product.name}
                        />
                      </div>
                      <div className="lg:col-span-3">
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-[var(--brand-text)]">
                            Categoria
                          </span>
                          <select
                            className="w-full rounded-2xl border border-[var(--brand-line)] bg-white px-4 py-3 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]"
                            onChange={(event) =>
                              handleProductChange(
                                product.id,
                                'categoryId',
                                event.target.value,
                              )
                            }
                            value={product.categoryId}
                          >
                            <option value="">Selecciona categoria</option>
                            {categoryOptions.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name || category.id}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <div className="lg:col-span-2">
                        <TextField
                          label="Precio"
                          name="price"
                          onChange={(event) =>
                            handleProductChange(
                              product.id,
                              'price',
                              event.target.value,
                            )
                          }
                          placeholder="8900"
                          type="number"
                          value={product.price}
                        />
                      </div>
                      <div className="lg:col-span-3">
                        <TextField
                          label="Badge"
                          name="badge"
                          onChange={(event) =>
                            handleProductChange(
                              product.id,
                              'badge',
                              event.target.value,
                            )
                          }
                          placeholder="Promo / Nuevo / Mas pedido"
                          value={product.badge}
                        />
                      </div>
                      <div className="lg:col-span-8">
                        <TextAreaField
                          label="Descripcion"
                          name="description"
                          onChange={(event) =>
                            handleProductChange(
                              product.id,
                              'description',
                              event.target.value,
                            )
                          }
                          placeholder="Descripcion breve del producto"
                          rows={3}
                          value={product.description}
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <TextField
                          label="Orden"
                          name="sortOrder"
                          onChange={(event) =>
                            handleProductChange(
                              product.id,
                              'sortOrder',
                              event.target.value,
                            )
                          }
                          type="number"
                          value={product.sortOrder}
                        />
                      </div>
                      <div className="lg:col-span-2 flex items-end">
                        <ToggleField
                          checked={product.isActive}
                          label="Producto activo"
                          onChange={(event) =>
                            handleProductToggle(product.id, event.target.checked)
                          }
                        />
                      </div>
                      <div className="lg:col-span-12">
                        <FileUploadField
                          label="Foto del producto"
                          onChange={(event) =>
                            handleProductImageUpload(product.id, event)
                          }
                          previewUrl={product.imageUrl}
                          uploading={uploadingTarget === product.id}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <button
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-primary-strong)]"
                        onClick={() => handleSaveProduct(product)}
                        type="button"
                      >
                        {savingProductId === product.id ? (
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        Guardar producto
                      </button>
                      <button
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--brand-text)] transition hover:border-red-300 hover:text-red-600"
                        onClick={() => handleDeleteProduct(product)}
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar producto
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-dashed border-[var(--brand-line)] bg-[var(--brand-card)] px-5 py-8 text-center">
                <p className="text-sm font-semibold text-[var(--brand-text)]">
                  No hay productos para este filtro.
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">
                  Ajusta la busqueda, cambia la categoria o crea un producto nuevo.
                </p>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
