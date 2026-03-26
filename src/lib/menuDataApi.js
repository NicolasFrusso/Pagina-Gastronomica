import { brandConfig as fallbackBrandConfig } from '../data/brandConfig'
import { restaurantData as fallbackRestaurantData } from '../data/restaurantData'
import { supabase, isSupabaseConfigured } from './supabaseClient'

const MENU_ASSETS_BUCKET = 'menu-assets'

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function createUniqueId(name, existingIds) {
  const baseId = slugify(name) || 'item'

  if (!existingIds.includes(baseId)) {
    return baseId
  }

  let suffix = 2

  while (existingIds.includes(`${baseId}-${suffix}`)) {
    suffix += 1
  }

  return `${baseId}-${suffix}`
}

function sortByOrder(firstItem, secondItem) {
  const firstOrder = firstItem.sortOrder ?? firstItem.sort_order ?? 0
  const secondOrder = secondItem.sortOrder ?? secondItem.sort_order ?? 0

  if (firstOrder !== secondOrder) {
    return firstOrder - secondOrder
  }

  return String(firstItem.name ?? '').localeCompare(String(secondItem.name ?? ''))
}

function createFallbackRestaurantSettings() {
  return {
    id: 'default',
    name: fallbackBrandConfig.name,
    description: fallbackBrandConfig.description,
    logoUrl: fallbackBrandConfig.logo,
    address: fallbackBrandConfig.contact.address,
    schedule: fallbackBrandConfig.contact.schedule,
    phone: fallbackBrandConfig.contact.phone,
    whatsappNumber: fallbackBrandConfig.contact.whatsappNumber,
    whatsappLabel: fallbackBrandConfig.contact.whatsappLabel,
    whatsappMessage: fallbackBrandConfig.contact.whatsappMessage,
    instagramUrl: fallbackBrandConfig.contact.instagramUrl,
    instagramHandle: fallbackBrandConfig.contact.instagramHandle,
    mapUrl: fallbackBrandConfig.contact.mapUrl,
  }
}

function createFallbackCategories() {
  return fallbackRestaurantData.categories.map((category, index) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    icon: category.icon,
    sortOrder: index + 1,
    isActive: true,
  }))
}

function createFallbackProducts() {
  return fallbackRestaurantData.products.map((product, index) => ({
    id: product.id,
    categoryId: product.categoryId,
    name: product.name,
    description: product.description,
    price: product.price,
    badge: product.badge ?? '',
    imageUrl: product.image,
    sortOrder: index + 1,
    isActive: true,
  }))
}

function mapSettingsToBrand(settings) {
  return {
    ...fallbackBrandConfig,
    name: settings.name,
    description: settings.description,
    logo: settings.logoUrl,
    contact: {
      ...fallbackBrandConfig.contact,
      address: settings.address,
      schedule: settings.schedule,
      phone: settings.phone,
      whatsappNumber: settings.whatsappNumber,
      whatsappLabel: settings.whatsappLabel,
      whatsappMessage: settings.whatsappMessage,
      instagramUrl: settings.instagramUrl,
      instagramHandle: settings.instagramHandle,
      mapUrl: settings.mapUrl,
    },
  }
}

function normalizePublicPayload({ categories, products, restaurantSettings }) {
  const activeCategories = [...categories]
    .filter((category) => category.isActive)
    .sort(sortByOrder)
  const activeCategoryIds = new Set(activeCategories.map((category) => category.id))
  const activeProducts = [...products]
    .filter(
      (product) => product.isActive && activeCategoryIds.has(product.categoryId),
    )
    .sort(sortByOrder)

  return {
    brand: mapSettingsToBrand(restaurantSettings),
    restaurantData: {
      categories: activeCategories.map((category) => ({
        id: category.id,
        name: category.name,
        icon: category.icon,
        description: category.description,
      })),
      products: activeProducts.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        categoryId: product.categoryId,
        badge: product.badge || null,
        image: product.imageUrl || null,
      })),
    },
  }
}

function createFallbackAppData() {
  const restaurantSettings = createFallbackRestaurantSettings()
  const categories = createFallbackCategories()
  const products = createFallbackProducts()

  return {
    source: 'fallback',
    adminData: {
      restaurantSettings,
      categories,
      products,
    },
    ...normalizePublicPayload({
      restaurantSettings,
      categories,
      products,
    }),
  }
}

function mapRestaurantRow(row) {
  return {
    id: row.id ?? 'default',
    name: row.name ?? fallbackBrandConfig.name,
    description: row.description ?? '',
    logoUrl: row.logo_url ?? null,
    address: row.address ?? '',
    schedule: row.schedule ?? '',
    phone: row.phone ?? '',
    whatsappNumber: row.whatsapp_number ?? '',
    whatsappLabel: row.whatsapp_label ?? '',
    whatsappMessage: row.whatsapp_message ?? '',
    instagramUrl: row.instagram_url ?? '',
    instagramHandle: row.instagram_handle ?? '',
    mapUrl: row.map_url ?? '',
  }
}

function mapCategoryRow(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? '',
    icon: row.icon ?? 'tequenos',
    sortOrder: row.sort_order ?? 0,
    isActive: row.is_active ?? true,
  }
}

function mapProductRow(row) {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    description: row.description ?? '',
    price: Number(row.price ?? 0),
    badge: row.badge ?? '',
    imageUrl: row.image_url ?? null,
    sortOrder: row.sort_order ?? 0,
    isActive: row.is_active ?? true,
  }
}

async function fetchRemoteMenuData({ includeInactive = false } = {}) {
  if (!supabase) {
    throw new Error('Supabase no configurado.')
  }

  const restaurantPromise = supabase
    .from('restaurant_settings')
    .select('*')
    .limit(1)
    .single()
  const categoriesQuery = supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
  const productsQuery = supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })

  const [
    { data: restaurantRow, error: restaurantError },
    { data: categoryRows, error: categoryError },
    { data: productRows, error: productError },
  ] = await Promise.all([
    restaurantPromise,
    includeInactive ? categoriesQuery : categoriesQuery.eq('is_active', true),
    includeInactive ? productsQuery : productsQuery.eq('is_active', true),
  ])

  if (restaurantError || categoryError || productError) {
    throw restaurantError || categoryError || productError
  }

  const restaurantSettings = mapRestaurantRow(restaurantRow)
  const categories = categoryRows.map(mapCategoryRow)
  const products = productRows.map(mapProductRow)

  return {
    restaurantSettings,
    categories,
    products,
  }
}

export function getFallbackAppData() {
  return createFallbackAppData()
}

export async function fetchPublicAppData() {
  const fallbackAppData = createFallbackAppData()

  if (!isSupabaseConfigured) {
    return fallbackAppData
  }

  try {
    const remoteData = await fetchRemoteMenuData()

    return {
      source: 'remote',
      adminData: remoteData,
      ...normalizePublicPayload(remoteData),
    }
  } catch (error) {
    return {
      ...fallbackAppData,
      error,
    }
  }
}

export async function fetchAdminAppData() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Configura Supabase para usar el panel admin.')
  }

  return fetchRemoteMenuData({ includeInactive: true })
}

export async function signInAdmin({ email, password }) {
  if (!supabase) {
    throw new Error('Configura Supabase para iniciar sesion.')
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOutAdmin() {
  if (!supabase) {
    return
  }

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export async function getAdminSession() {
  if (!supabase) {
    return null
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  return session
}

export function subscribeToAdminAuthChanges(callback) {
  if (!supabase) {
    return () => {}
  }

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })

  return () => subscription.unsubscribe()
}

export async function saveRestaurantSettings(settings) {
  if (!supabase) {
    throw new Error('Configura Supabase para guardar cambios.')
  }

  const payload = {
    id: settings.id ?? 'default',
    name: settings.name,
    description: settings.description,
    logo_url: settings.logoUrl || null,
    address: settings.address,
    schedule: settings.schedule,
    phone: settings.phone,
    whatsapp_number: settings.whatsappNumber,
    whatsapp_label: settings.whatsappLabel,
    whatsapp_message: settings.whatsappMessage,
    instagram_url: settings.instagramUrl,
    instagram_handle: settings.instagramHandle,
    map_url: settings.mapUrl,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('restaurant_settings')
    .upsert(payload)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return mapRestaurantRow(data)
}

export async function saveCategory(category, existingCategories) {
  if (!supabase) {
    throw new Error('Configura Supabase para guardar categorias.')
  }

  const existingIds = existingCategories
    .filter((item) => item.id !== category.id)
    .map((item) => item.id)
  const resolvedId =
    category.id && !String(category.id).startsWith('temp-')
      ? category.id
      : createUniqueId(category.name, existingIds)

  const payload = {
    id: resolvedId,
    name: category.name,
    description: category.description,
    icon: category.icon,
    sort_order: Number(category.sortOrder ?? 0),
    is_active: Boolean(category.isActive),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('categories')
    .upsert(payload)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return mapCategoryRow(data)
}

export async function deleteCategory(categoryId) {
  if (!supabase) {
    throw new Error('Configura Supabase para borrar categorias.')
  }

  const { error } = await supabase.from('categories').delete().eq('id', categoryId)

  if (error) {
    throw error
  }
}

export async function saveProduct(product, existingProducts) {
  if (!supabase) {
    throw new Error('Configura Supabase para guardar productos.')
  }

  const existingIds = existingProducts
    .filter((item) => item.id !== product.id)
    .map((item) => item.id)
  const resolvedId =
    product.id && !String(product.id).startsWith('temp-')
      ? product.id
      : createUniqueId(product.name, existingIds)

  const payload = {
    id: resolvedId,
    category_id: product.categoryId,
    name: product.name,
    description: product.description,
    price: Number(product.price ?? 0),
    badge: product.badge || null,
    image_url: product.imageUrl || null,
    sort_order: Number(product.sortOrder ?? 0),
    is_active: Boolean(product.isActive),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('products')
    .upsert(payload)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return mapProductRow(data)
}

export async function deleteProduct(productId) {
  if (!supabase) {
    throw new Error('Configura Supabase para borrar productos.')
  }

  const { error } = await supabase.from('products').delete().eq('id', productId)

  if (error) {
    throw error
  }
}

export async function uploadAsset({ file, folder }) {
  if (!supabase) {
    throw new Error('Configura Supabase para subir archivos.')
  }

  const extension = file.name.split('.').pop()
  const fileName = slugify(file.name.replace(/\.[^.]+$/, '')) || 'asset'
  const filePath = `${folder}/${Date.now()}-${fileName}.${extension}`

  const { error: uploadError } = await supabase.storage
    .from(MENU_ASSETS_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    throw uploadError
  }

  const { data } = supabase.storage
    .from(MENU_ASSETS_BUCKET)
    .getPublicUrl(filePath)

  return data.publicUrl
}

export const adminIconOptions = [
  'tequenos',
  'empanadas',
  'pastelitos',
  'combos',
  'bebidas',
  'postres',
  'adicionales',
]
