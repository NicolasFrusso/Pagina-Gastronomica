begin;

create table if not exists public.restaurant_settings (
  id text primary key default 'default',
  name text not null,
  description text not null default '',
  logo_url text,
  address text not null default '',
  schedule text not null default '',
  phone text not null default '',
  whatsapp_number text not null default '',
  whatsapp_label text not null default '',
  whatsapp_message text not null default '',
  instagram_url text not null default '',
  instagram_handle text not null default '',
  map_url text not null default '',
  updated_at timestamptz not null default timezone('utc', now()),
  constraint restaurant_settings_single_row check (id = 'default')
);

create table if not exists public.categories (
  id text primary key,
  name text not null,
  description text not null default '',
  icon text not null default 'tequenos',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.products (
  id text primary key,
  category_id text not null references public.categories (id) on update cascade on delete restrict,
  name text not null,
  description text not null default '',
  price integer not null default 0 check (price >= 0),
  badge text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists categories_sort_idx
  on public.categories (sort_order, name);

create index if not exists products_category_sort_idx
  on public.products (category_id, sort_order, name);

alter table public.restaurant_settings enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;

drop policy if exists "Public read restaurant settings" on public.restaurant_settings;
create policy "Public read restaurant settings"
  on public.restaurant_settings
  for select
  to public
  using (true);

drop policy if exists "Authenticated manage restaurant settings" on public.restaurant_settings;
create policy "Authenticated manage restaurant settings"
  on public.restaurant_settings
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Public read active categories" on public.categories;
create policy "Public read active categories"
  on public.categories
  for select
  to public
  using (is_active = true);

drop policy if exists "Authenticated manage categories" on public.categories;
create policy "Authenticated manage categories"
  on public.categories
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Public read active products" on public.products;
create policy "Public read active products"
  on public.products
  for select
  to public
  using (is_active = true);

drop policy if exists "Authenticated manage products" on public.products;
create policy "Authenticated manage products"
  on public.products
  for all
  to authenticated
  using (true)
  with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'menu-assets',
  'menu-assets',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read menu assets" on storage.objects;
create policy "Public read menu assets"
  on storage.objects
  for select
  to public
  using (bucket_id = 'menu-assets');

drop policy if exists "Authenticated upload menu assets" on storage.objects;
create policy "Authenticated upload menu assets"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'menu-assets');

drop policy if exists "Authenticated update menu assets" on storage.objects;
create policy "Authenticated update menu assets"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'menu-assets')
  with check (bucket_id = 'menu-assets');

drop policy if exists "Authenticated delete menu assets" on storage.objects;
create policy "Authenticated delete menu assets"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'menu-assets');

commit;
