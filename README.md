# FitGear - Plataforma E-Commerce de Indumentaria Deportiva

> Plataforma web de compras en línea especializada en ropa e indumentaria deportiva de alta gama (fútbol y baloncesto) con diseño moderno, responsive y gestión dinámica de pedidos.

---

## Características Principales

- **Catálogo Interactivo**: Filtrado dinámico por categorías (Fútbol, Baloncesto y Todos los productos).
- **Personalización de Producto**: Selección de tallas (S, M, L, XL), control de cantidades y opción de agregar dorsal (nombre y número personalizado).
- **Autenticación Local (LocalStorage)**: Registro e inicio de sesión de usuarios con persistencia de datos en el navegador.
- **Carrito de Compras (Drawer Side Bar)**:
  - Modificación de cantidades en tiempo real.
  - Eliminación de ítems.
  - Cálculo automático del total en pesos colombianos (COP).
  - Persistencia del carrito entre páginas mediante `localStorage`.
- **Pasarela de Checkout Dedicada (`checkout.html`)**:
  - Formulario de datos de envío y contacto.
  - Opciones de pago adaptadas al mercado nacional (Nequi, Daviplata, PSE y Tarjeta de Crédito/Débito).
- **Diseño Moderno & Responsive**: Estética *dark mode* enfocada en experiencia de usuario (UX) accesible desde dispositivos móviles, tablets y escritorio.

---

## Tecnologías Utilizadas

- **HTML5**: Estructuración semántica de las vistas (`index.html` y `checkout.html`).
- **CSS3**: Estilos personalizados, variables CSS, Flexbox, CSS Grid y animaciones/transiciones.
- **JavaScript (ES6+)**: Lógica del cliente, manipulación del DOM, manejo de eventos y almacenamiento local.
- **Font Awesome 6 (CDN)**: Iconografía vectorial para interfaz limpia y escalable.
- **Google Fonts**: Tipografías *Bebas Neue* y *Montserrat*.

---

## Estructura del Proyecto

```text
FitGear/
├── index.html          # Página principal (Landing, Catálogo, Modal de Producto y Carrito)
├── checkout.html       # Pantalla dedicada para finalizar el pago y datos de envío
├── imagenes/           # Recursos visuales e imágenes de catálogo
└── README.md           # Documentación del repositorio
