export const brandConfig = {
  // Cambia el nombre visible del local aca.
  name: 'Casa Origen',
  // Cambia la descripcion corta del local aca.
  description:
    'Cocina venezolana hecha al momento, pensada para compartir entre antojos, almuerzos y meriendas.',
  hero: {
    badge: 'Menu QR',
    eyebrow: 'Sabores con acento caraqueno',
    highlights: ['Hecho al momento', 'Pedidos por WhatsApp', 'Listo para fotos'],
    // Pega una imagen de portada en /public y reemplaza null por '/hero-local.jpg'.
    backgroundImage: null,
  },
  // Pega el logo en /public y reemplaza null por '/logo-local.png'.
  logo: null,
  logoAlt: 'Logo de Casa Origen',
  // Cambia los colores de marca aca.
  colors: {
    primary: '#D26743',
    primaryStrong: '#B54E2D',
    primarySoft: '#F7ECE5',
    secondary: '#17353D',
    background: '#F5F0EA',
    surface: '#FFFDFB',
    card: '#FAF6F2',
    line: '#E8DDD4',
    text: '#201914',
    muted: '#6D625B',
    shadow: 'rgba(32, 25, 20, 0.12)',
    shadowSoft: 'rgba(32, 25, 20, 0.07)',
  },
  money: {
    locale: 'es-AR',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  // Edita direccion, horarios, WhatsApp, Instagram y mapa aca.
  contact: {
    label: 'Nuestros canales de contacto',
    address: 'Av. Corrientes 1847, CABA',
    schedule: 'Lun a Dom · 11:30 a 23:30',
    phone: '+54 9 11 5103 6295',
    whatsappNumber: '5491151036295',
    whatsappLabel: '+54 9 11 5103 6295',
    whatsappMessage: 'Hola Casa Origen, quiero hacer un pedido.',
    instagramUrl: 'https://instagram.com/casaorigen.menu',
    instagramHandle: '@casaorigen.menu',
    mapUrl: 'https://maps.google.com/?q=Av.+Corrientes+1847,+CABA',
  },
  footer: {
    phrase: 'Sabores venezolanos con una presencia simple, calida y prolija.',
    legal: '© 2026 Casa Origen. Todos los derechos reservados.',
  },
}
