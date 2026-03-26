begin;

insert into public.restaurant_settings (
  id,
  name,
  description,
  logo_url,
  address,
  schedule,
  phone,
  whatsapp_number,
  whatsapp_label,
  whatsapp_message,
  instagram_url,
  instagram_handle,
  map_url,
  updated_at
)
values (
  'default',
  'Casa Origen',
  'Cocina venezolana hecha al momento, pensada para compartir entre antojos, almuerzos y meriendas.',
  null,
  'Av. Corrientes 1847, CABA',
  'Lun a Dom - 11:30 a 23:30',
  '+54 9 11 5103 6295',
  '5491151036295',
  '+54 9 11 5103 6295',
  'Hola Casa Origen, quiero hacer un pedido.',
  'https://instagram.com/casaorigen.menu',
  '@casaorigen.menu',
  'https://maps.google.com/?q=Av.+Corrientes+1847,+CABA',
  timezone('utc', now())
)
on conflict (id) do update
set
  name = excluded.name,
  description = excluded.description,
  logo_url = excluded.logo_url,
  address = excluded.address,
  schedule = excluded.schedule,
  phone = excluded.phone,
  whatsapp_number = excluded.whatsapp_number,
  whatsapp_label = excluded.whatsapp_label,
  whatsapp_message = excluded.whatsapp_message,
  instagram_url = excluded.instagram_url,
  instagram_handle = excluded.instagram_handle,
  map_url = excluded.map_url,
  updated_at = excluded.updated_at;

insert into public.categories (id, name, description, icon, sort_order, is_active, updated_at)
values
  ('tequenos', 'Tequenos', 'Crujientes por fuera, fundentes por dentro.', 'tequenos', 1, true, timezone('utc', now())),
  ('empanadas', 'Empanadas', 'Masa dorada, rellenos caseros y buen volumen.', 'empanadas', 2, true, timezone('utc', now())),
  ('pastelitos', 'Pastelitos', 'Capas livianas con toque andino y rellenos intensos.', 'pastelitos', 3, true, timezone('utc', now())),
  ('combos', 'Combos', 'Opciones pensadas para compartir o resolver rapido.', 'combos', 4, true, timezone('utc', now())),
  ('bebidas', 'Bebidas', 'Refrescos clasicos para acompanar cada bocado.', 'bebidas', 5, true, timezone('utc', now())),
  ('postres', 'Postres', 'Cierres dulces con perfil casero y goloso.', 'postres', 6, true, timezone('utc', now())),
  ('adicionales', 'Adicionales', 'Salsas y extras para personalizar cada pedido.', 'adicionales', 7, true, timezone('utc', now()))
on conflict (id) do update
set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = excluded.updated_at;

insert into public.products (
  id,
  category_id,
  name,
  description,
  price,
  badge,
  image_url,
  sort_order,
  is_active,
  updated_at
)
values
  ('teq-clasicos-6', 'tequenos', 'Tequenos clasicos x6', 'Bastones de masa fina rellenos con queso blanco suave y servidos al momento.', 8900, 'Mas pedido', null, 1, true, timezone('utc', now())),
  ('teq-mixtos-10', 'tequenos', 'Tequenos mixtos x10', 'Seleccion con relleno clasico y version de platano maduro con queso.', 15200, 'Promo', null, 2, true, timezone('utc', now())),
  ('teq-pizza-6', 'tequenos', 'Tequenos pizza x6', 'Mozzarella, salsa especiada y oregano en formato crujiente.', 9700, 'Nuevo', null, 3, true, timezone('utc', now())),
  ('emp-carne', 'empanadas', 'Empanada de carne mechada', 'Relleno jugoso de carne deshilachada, cebolla, morron y especias suaves.', 5200, null, null, 4, true, timezone('utc', now())),
  ('emp-pollo', 'empanadas', 'Empanada de pollo guisado', 'Pollo cocido lento con sofrito casero y textura bien cremosa.', 4900, null, null, 5, true, timezone('utc', now())),
  ('emp-pabellon', 'empanadas', 'Empanada pabellon', 'Carne mechada, porotos negros, queso y platano maduro en un solo bocado.', 5900, 'Favorita', null, 6, true, timezone('utc', now())),
  ('pas-queso', 'pastelitos', 'Pastelito andino de queso', 'Masa hojaldrada con queso suave y acabado dorado, seco y liviano.', 5400, null, null, 7, true, timezone('utc', now())),
  ('pas-carne', 'pastelitos', 'Pastelito de carne especiada', 'Relleno de carne picada, cebolla y toque leve de comino.', 5600, 'Nuevo', null, 8, true, timezone('utc', now())),
  ('pas-papa', 'pastelitos', 'Pastelito de papa y queso', 'Pure cremoso, queso rallado y borde crocante para una opcion suave.', 5100, null, null, 9, true, timezone('utc', now())),
  ('combo-calle', 'combos', 'Combo Calle', '4 tequenos clasicos, 2 empanadas a eleccion y 2 bebidas individuales.', 12900, 'Promo', null, 10, true, timezone('utc', now())),
  ('combo-compartir', 'combos', 'Combo Compartir', '10 tequenos mixtos, 4 empanadas, 2 salsas y una bebida grande para la mesa.', 21500, 'Mas pedido', null, 11, true, timezone('utc', now())),
  ('combo-merienda', 'combos', 'Combo Merienda', '2 pastelitos, 1 quesillo individual y 2 cafes o maltas segun stock.', 14500, null, null, 12, true, timezone('utc', now())),
  ('beb-papelon', 'bebidas', 'Papelon con limon', 'Bebida fresca con panela y citricos, servida bien fria.', 3600, null, null, 13, true, timezone('utc', now())),
  ('beb-malta', 'bebidas', 'Malta', 'Clasica malta venezolana, ideal para acompanar fritos y combos.', 3200, null, null, 14, true, timezone('utc', now())),
  ('beb-chicha', 'bebidas', 'Chicha venezolana', 'Arroz, leche, canela y leche condensada con textura cremosa.', 3900, 'Recomendada', null, 15, true, timezone('utc', now())),
  ('beb-agua', 'bebidas', 'Agua con gas', 'Opcion ligera y bien fria para limpiar el paladar.', 2600, null, null, 16, true, timezone('utc', now())),
  ('post-quesillo', 'postres', 'Quesillo casero', 'Flan venezolano de textura sedosa con caramelo suave.', 4800, 'Nuevo', null, 17, true, timezone('utc', now())),
  ('post-tres-leches', 'postres', 'Tres leches cacao', 'Bizcocho humedo con crema ligera, cacao y terminacion elegante.', 5600, null, null, 18, true, timezone('utc', now())),
  ('post-marquesa', 'postres', 'Marquesa de chocolate', 'Capas de galleta y crema de chocolate con final intenso.', 5900, 'Favorita', null, 19, true, timezone('utc', now())),
  ('add-guasacaca', 'adicionales', 'Guasacaca', 'Salsa cremosa de palta y hierbas para sumar frescura.', 1200, null, null, 20, true, timezone('utc', now())),
  ('add-ajo', 'adicionales', 'Salsa de ajo y cilantro', 'Toque suave, aromatico y perfecto para fritos.', 1200, null, null, 21, true, timezone('utc', now())),
  ('add-queso', 'adicionales', 'Extra queso rallado', 'Capa adicional para empanadas, pastelitos y combos.', 1400, null, null, 22, true, timezone('utc', now()))
on conflict (id) do update
set
  category_id = excluded.category_id,
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  badge = excluded.badge,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = excluded.updated_at;

commit;
