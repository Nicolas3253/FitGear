const productos = [
  {
    id: 1,
    nombre: "Camiseta Local Fútbol Pro 2026",
    categoria: "futbol",
    precio: 85000,
    descripcion: "Edición especial de alto rendimiento. Tejido microporoso que absorbe la humedad.",
    imagen: "https://images.unsplash.com/photo-1577212017308-55c4d60d2609?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    nombre: "Camiseta Visitante Baloncesto Pro",
    categoria: "baloncesto",
    precio: 90000,
    descripcion: "Malla de poliéster transpirable con silueta holgada que permite libertad de movimiento.",
    imagen: "https://plus.unsplash.com/premium_photo-1674164229916-214a5ca5e9d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    nombre: "Conjunto Entrenamiento Fútbol",
    categoria: "futbol",
    precio: 120000,
    descripcion: "Incluye camiseta técnica y pantaloneta con ajuste elástico. Diseñado para alta exigencia.",
    imagen: "https://plus.unsplash.com/premium_photo-1783088311791-0ad06a26536d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/futbol-2.jpg",
  },
  {
    id: 4,
    nombre: "Jersey Baloncesto Legend Edition",
    categoria: "baloncesto",
    precio: 95000,
    descripcion: "Inspirada en el corte clásico del basketball noventero con acabados premium.",
    imagen: "https://images.unsplash.com/photo-1672369139633-408617172df0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dimagenes/baloncesto-2.jpg",
  },
  {
    id: 5,
    nombre: "Camiseta Edición Especial Tricolor",
    categoria: "futbol",
    precio: 110000,
    descripcion: "Detalles sublimados en alta definición con escudo en relieve.",
    imagen: "https://majesticshopcolombia.com/wp-content/uploads/2026/01/futbol-col.png",
  },
  {
    id: 6,
    nombre: "Jersey All-Star Baloncesto Black",
    categoria: "baloncesto",
    precio: 105000,
    descripcion: "Diseño elegante en tono negro satinado con costuras reforzadas.",
    imagen: "https://www.basketballjerseyworld.com/cdn/shop/products/Peja-Kings-Swingman-1.jpg?v=1658571590",
  },
];

let carrito = JSON.parse(localStorage.getItem("fitgear_cart")) || [];
let productoSeleccionado = null;
let tallaSeleccionada = "S";
let cantidadSeleccionada = 1;

const cuadriculaCatalogo = document.getElementById("cuadriculaCatalogo");
const entradaBusqueda = document.getElementById("entradaBusqueda");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroOrden = document.getElementById("filtroOrden");
const rangoPrecio = document.getElementById("rangoPrecio");
const etiquetaPrecioMaximo = document.getElementById("etiquetaPrecioMaximo");
const botonLimpiarFiltros = document.getElementById("botonLimpiarFiltros");
const contadorResultados = document.getElementById("contadorResultados");

const modalProducto = document.getElementById("modalProducto");
const botonCerrarModal = document.getElementById("botonCerrarModal");
const imagenModal = document.getElementById("imagenModal");
const tituloModal = document.getElementById("tituloModal");
const precioModal = document.getElementById("precioModal");
const descripcionModal = document.getElementById("descripcionModal");
const botonesTalla = document.querySelectorAll(".boton-talla");
const valorCantidad = document.getElementById("valorCantidad");
const botonRestarCantidad = document.getElementById("botonRestarCantidad");
const botonSumarCantidad = document.getElementById("botonSumarCantidad");
const entradaPersonalizacion = document.getElementById("entradaPersonalizacion");
const botonAgregarCarritoModal = document.getElementById("botonAgregarCarritoModal");

const panelCarrito = document.getElementById("panelCarrito");
const capaCarrito = document.getElementById("capaCarrito");
const botonAbrirCarrito = document.getElementById("botonAbrirCarrito");
const botonCerrarCarrito = document.getElementById("botonCerrarCarrito");
const contenedorElementosCarrito = document.getElementById("elementosCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const montoTotalCarrito = document.getElementById("montoTotalCarrito");
const botonFinalizarCompra = document.getElementById("botonFinalizarCompra");

function filtrarYRenderizarProductos() {
  let filtrados = [...productos];

  const textoBusqueda = entradaBusqueda.value.toLowerCase().trim();
  const categoria = filtroCategoria.value;
  const orden = filtroOrden.value;
  const precioMaximo = parseInt(rangoPrecio.value);

  if (textoBusqueda)
    filtrados = filtrados.filter((p) =>
      p.nombre.toLowerCase().includes(textoBusqueda),
    );
  if (categoria !== "todos")
    filtrados = filtrados.filter((p) => p.categoria === categoria);
  filtrados = filtrados.filter((p) => p.precio <= precioMaximo);

  if (orden === "precio-asc") filtrados.sort((a, b) => a.precio - b.precio);
  else if (orden === "precio-desc") filtrados.sort((a, b) => b.precio - a.precio);
  else if (orden === "nombre-asc")
    filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
  else if (orden === "nombre-desc")
    filtrados.sort((a, b) => b.nombre.localeCompare(a.nombre));

  cuadriculaCatalogo.innerHTML = "";
  contadorResultados.textContent = `Mostrando ${filtrados.length} de ${productos.length} productos`;

  if (filtrados.length === 0) {
    cuadriculaCatalogo.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; color: var(--texto-atenuado); padding: 3rem;">No se encontraron productos.</p>';
    return;
  }

  filtrados.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";
    tarjeta.innerHTML = `
                    <div class="imagen-producto">
                        <span class="insignia-categoria">${producto.categoria}</span>
                        <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/400x400/16181f/39a900?text=FitGear+Sport'">
                    </div>
                    <div class="informacion-producto">
                        <h3 class="titulo-producto">${producto.nombre}</h3>
                        <p class="descripcion-producto">${producto.descripcion}</p>
                        <div class="pie-producto">
                            <span class="precio-producto">$${producto.precio.toLocaleString("es-CO")}</span>
                            <button class="boton-ver-opciones" onclick="abrirModalProducto(${producto.id})">Ver Opciones</button>
                        </div>
                    </div>
                `;
    cuadriculaCatalogo.appendChild(tarjeta);
  });
}

window.abrirModalProducto = function (id) {
  productoSeleccionado = productos.find((p) => p.id === id);
  if (!productoSeleccionado) return;

  tallaSeleccionada = "S";
  cantidadSeleccionada = 1;
  entradaPersonalizacion.value = "";
  valorCantidad.textContent = cantidadSeleccionada;

  botonesTalla.forEach((btn) => {
    btn.classList.toggle("activo", btn.dataset.talla === "S");
  });

  imagenModal.src = productoSeleccionado.imagen;
  tituloModal.textContent = productoSeleccionado.nombre;
  precioModal.textContent = `$${productoSeleccionado.precio.toLocaleString("es-CO")} COP`;
  descripcionModal.textContent = productoSeleccionado.descripcion;

  modalProducto.classList.add("activo");
};

function cerrarModal() {
  modalProducto.classList.remove("activo");
}

botonesTalla.forEach((btn) => {
  btn.addEventListener("click", () => {
    botonesTalla.forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");
    tallaSeleccionada = btn.dataset.talla;
  });
});

botonRestarCantidad.addEventListener("click", () => {
  if (cantidadSeleccionada > 1) {
    cantidadSeleccionada--;
    valorCantidad.textContent = cantidadSeleccionada;
  }
});

botonSumarCantidad.addEventListener("click", () => {
  cantidadSeleccionada++;
  valorCantidad.textContent = cantidadSeleccionada;
});

botonAgregarCarritoModal.addEventListener("click", () => {
  if (!productoSeleccionado) return;

  const textoPersonalizado = entradaPersonalizacion.value.trim();
  const idElementoCarrito = `${productoSeleccionado.id}-${tallaSeleccionada}-${textoPersonalizado || "SinDorsal"}`;

  const indiceExistente = carrito.findIndex(
    (articulo) => (articulo.idElementoCarrito || articulo.cartItemId) === idElementoCarrito,
  );

  if (indiceExistente > -1) {
    const cantidadActual = carrito[indiceExistente].cantidad || carrito[indiceExistente].quantity || 0;
    carrito[indiceExistente].cantidad = cantidadActual + cantidadSeleccionada;
    carrito[indiceExistente].quantity = carrito[indiceExistente].cantidad;
  } else {
    carrito.push({
      idElementoCarrito: idElementoCarrito,
      cartItemId: idElementoCarrito,
      id: productoSeleccionado.id,
      nombre: productoSeleccionado.nombre,
      name: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      price: productoSeleccionado.precio,
      imagen: productoSeleccionado.imagen,
      image: productoSeleccionado.imagen,
      talla: tallaSeleccionada,
      size: tallaSeleccionada,
      personalizado: textoPersonalizado ? `Dorsal: ${textoPersonalizado}` : "",
      custom: textoPersonalizado ? `Dorsal: ${textoPersonalizado}` : "",
      cantidad: cantidadSeleccionada,
      quantity: cantidadSeleccionada,
    });
  }

  actualizarInterfazCarrito();
  cerrarModal();
  abrirCarrito();
});

function actualizarInterfazCarrito() {
  localStorage.setItem("fitgear_cart", JSON.stringify(carrito));
  const totalArticulos = carrito.reduce((suma, articulo) => suma + (articulo.cantidad || articulo.quantity || 0), 0);
  contadorCarrito.textContent = totalArticulos;

  contenedorElementosCarrito.innerHTML = "";
  if (carrito.length === 0) {
    contenedorElementosCarrito.innerHTML =
      '<p style="text-align:center; color: var(--texto-atenuado); margin-top:2rem;">El carrito está vacío.</p>';
  } else {
    carrito.forEach((articulo) => {
      const elemento = document.createElement("div");
      elemento.className = "elemento-carrito";
      const nombre = articulo.nombre || articulo.name;
      const imagen = articulo.imagen || articulo.image;
      const precio = articulo.precio || articulo.price;
      const cantidad = articulo.cantidad || articulo.quantity;
      const talla = articulo.talla || articulo.size;
      const personalizado = articulo.personalizado || articulo.custom;

      elemento.innerHTML = `
                        <img src="${imagen}" alt="${nombre}">
                        <div class="informacion-elemento-carrito">
                            <div class="titulo-elemento-carrito">${nombre}</div>
                            <div class="meta-elemento-carrito">Talla: ${talla} ${personalizado ? "| " + personalizado : ""}</div>
                            <div class="precio-elemento-carrito">$${(precio * cantidad).toLocaleString("es-CO")} (x${cantidad})</div>
                        </div>
                    `;
      contenedorElementosCarrito.appendChild(elemento);
    });
  }

  const dineroTotal = carrito.reduce(
    (suma, articulo) => suma + (articulo.precio || articulo.price) * (articulo.cantidad || articulo.quantity),
    0,
  );
  montoTotalCarrito.textContent = `$${dineroTotal.toLocaleString("es-CO")} COP`;
}

function abrirCarrito() {
  panelCarrito.classList.add("activo");
  capaCarrito.classList.add("activo");
}
function cerrarCarrito() {
  panelCarrito.classList.remove("activo");
  capaCarrito.classList.remove("activo");
}

entradaBusqueda.addEventListener("input", filtrarYRenderizarProductos);
filtroCategoria.addEventListener("change", filtrarYRenderizarProductos);
filtroOrden.addEventListener("change", filtrarYRenderizarProductos);
rangoPrecio.addEventListener("input", (e) => {
  etiquetaPrecioMaximo.textContent = `$${parseInt(e.target.value).toLocaleString("es-CO")} COP`;
  filtrarYRenderizarProductos();
});

botonLimpiarFiltros.addEventListener("click", () => {
  entradaBusqueda.value = "";
  filtroCategoria.value = "todos";
  filtroOrden.value = "defecto";
  rangoPrecio.value = 150000;
  etiquetaPrecioMaximo.textContent = "$150.000 COP";
  filtrarYRenderizarProductos();
});

botonCerrarModal.addEventListener("click", cerrarModal);
modalProducto.addEventListener("click", (e) => {
  if (e.target === modalProducto) cerrarModal();
});

botonAbrirCarrito.addEventListener("click", abrirCarrito);
botonCerrarCarrito.addEventListener("click", cerrarCarrito);
capaCarrito.addEventListener("click", cerrarCarrito);

botonFinalizarCompra.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  window.location.href = "pago.html";
});

actualizarInterfazCarrito();
filtrarYRenderizarProductos();