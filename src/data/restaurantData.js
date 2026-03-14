export const restaurantData = {
  categories: [
    {
      id: 'tequenos',
      name: 'Tequeños',
      icon: 'tequenos',
      description: 'Crujientes por fuera, fundentes por dentro.',
    },
    {
      id: 'empanadas',
      name: 'Empanadas',
      icon: 'empanadas',
      description: 'Masa dorada, rellenos caseros y buen volumen.',
    },
    {
      id: 'pastelitos',
      name: 'Pastelitos',
      icon: 'pastelitos',
      description: 'Capas livianas con toque andino y rellenos intensos.',
    },
    {
      id: 'combos',
      name: 'Combos',
      icon: 'combos',
      description: 'Opciones pensadas para compartir o resolver rapido.',
    },
    {
      id: 'bebidas',
      name: 'Bebidas',
      icon: 'bebidas',
      description: 'Refrescos clasicos para acompanar cada bocado.',
    },
    {
      id: 'postres',
      name: 'Postres',
      icon: 'postres',
      description: 'Cierres dulces con perfil casero y goloso.',
    },
    {
      id: 'adicionales',
      name: 'Adicionales',
      icon: 'adicionales',
      description: 'Salsas y extras para personalizar cada pedido.',
    },
  ],
  products: [
    {
      id: 'teq-clasicos-6',
      name: 'Tequeños clasicos x6',
      description:
        'Bastones de masa fina rellenos con queso blanco suave y servidos al momento.',
      price: 8900,
      categoryId: 'tequenos',
      badge: 'Mas pedido',
      // Pega la foto luego en /public/productos y cambia null por '/productos/teq-clasicos-6.jpg'.
      image: null,
    },
    {
      id: 'teq-mixtos-10',
      name: 'Tequeños mixtos x10',
      description:
        'Seleccion con relleno clasico y version de platano maduro con queso.',
      price: 15200,
      categoryId: 'tequenos',
      badge: 'Promo',
      image: null,
    },
    {
      id: 'teq-pizza-6',
      name: 'Tequeños pizza x6',
      description:
        'Mozzarella, salsa especiada y oregano en formato crujiente.',
      price: 9700,
      categoryId: 'tequenos',
      badge: 'Nuevo',
      image: null,
    },
    {
      id: 'emp-carne',
      name: 'Empanada de carne mechada',
      description:
        'Relleno jugoso de carne deshilachada, cebolla, morron y especias suaves.',
      price: 5200,
      categoryId: 'empanadas',
      image: null,
    },
    {
      id: 'emp-pollo',
      name: 'Empanada de pollo guisado',
      description:
        'Pollo cocido lento con sofrito casero y textura bien cremosa.',
      price: 4900,
      categoryId: 'empanadas',
      image: null,
    },
    {
      id: 'emp-pabellon',
      name: 'Empanada pabellon',
      description:
        'Carne mechada, porotos negros, queso y platano maduro en un solo bocado.',
      price: 5900,
      categoryId: 'empanadas',
      badge: 'Favorita',
      image: null,
    },
    {
      id: 'pas-queso',
      name: 'Pastelito andino de queso',
      description:
        'Masa hojaldrada con queso suave y acabado dorado, seco y liviano.',
      price: 5400,
      categoryId: 'pastelitos',
      image: null,
    },
    {
      id: 'pas-carne',
      name: 'Pastelito de carne especiada',
      description:
        'Relleno de carne picada, cebolla y toque leve de comino.',
      price: 5600,
      categoryId: 'pastelitos',
      badge: 'Nuevo',
      image: null,
    },
    {
      id: 'pas-papa',
      name: 'Pastelito de papa y queso',
      description:
        'Pure cremoso, queso rallado y borde crocante para una opcion suave.',
      price: 5100,
      categoryId: 'pastelitos',
      image: null,
    },
    {
      id: 'combo-calle',
      name: 'Combo Calle',
      description:
        '4 tequeños clasicos, 2 empanadas a eleccion y 2 bebidas individuales.',
      price: 12900,
      categoryId: 'combos',
      badge: 'Promo',
      image: null,
    },
    {
      id: 'combo-compartir',
      name: 'Combo Compartir',
      description:
        '10 tequeños mixtos, 4 empanadas, 2 salsas y una bebida grande para la mesa.',
      price: 21500,
      categoryId: 'combos',
      badge: 'Mas pedido',
      image: null,
    },
    {
      id: 'combo-merienda',
      name: 'Combo Merienda',
      description:
        '2 pastelitos, 1 quesillo individual y 2 cafes o maltas segun stock.',
      price: 14500,
      categoryId: 'combos',
      image: null,
    },
    {
      id: 'beb-papelon',
      name: 'Papelon con limon',
      description:
        'Bebida fresca con panela y citricos, servida bien fria.',
      price: 3600,
      categoryId: 'bebidas',
      image: null,
    },
    {
      id: 'beb-malta',
      name: 'Malta',
      description:
        'Clasica malta venezolana, ideal para acompañar fritos y combos.',
      price: 3200,
      categoryId: 'bebidas',
      image: null,
    },
    {
      id: 'beb-chicha',
      name: 'Chicha venezolana',
      description:
        'Arroz, leche, canela y leche condensada con textura cremosa.',
      price: 3900,
      categoryId: 'bebidas',
      badge: 'Recomendada',
      image: null,
    },
    {
      id: 'beb-agua',
      name: 'Agua con gas',
      description: 'Opcion ligera y bien fria para limpiar el paladar.',
      price: 2600,
      categoryId: 'bebidas',
      image: null,
    },
    {
      id: 'post-quesillo',
      name: 'Quesillo casero',
      description:
        'Flan venezolano de textura sedosa con caramelo suave.',
      price: 4800,
      categoryId: 'postres',
      badge: 'Nuevo',
      image: null,
    },
    {
      id: 'post-tres-leches',
      name: 'Tres leches cacao',
      description:
        'Bizcocho humedo con crema ligera, cacao y terminacion elegante.',
      price: 5600,
      categoryId: 'postres',
      image: null,
    },
    {
      id: 'post-marquesa',
      name: 'Marquesa de chocolate',
      description:
        'Capas de galleta y crema de chocolate con final intenso.',
      price: 5900,
      categoryId: 'postres',
      badge: 'Favorita',
      image: null,
    },
    {
      id: 'add-guasacaca',
      name: 'Guasacaca',
      description: 'Salsa cremosa de palta y hierbas para sumar frescura.',
      price: 1200,
      categoryId: 'adicionales',
      image: null,
    },
    {
      id: 'add-ajo',
      name: 'Salsa de ajo y cilantro',
      description: 'Toque suave, aromatico y perfecto para fritos.',
      price: 1200,
      categoryId: 'adicionales',
      image: null,
    },
    {
      id: 'add-queso',
      name: 'Extra queso rallado',
      description: 'Capa adicional para empanadas, pastelitos y combos.',
      price: 1400,
      categoryId: 'adicionales',
      image: null,
    },
  ],
}
