const productos = [
  {
    id: 1,
    nombre: "Camiseta Local Fútbol Pro 2026",
    categoria: "futbol",
    precio: 85000,
    imagen:
      "https://images.unsplash.com/photo-1577212017308-55c4d60d2609?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion:
      "Edición especial de alto rendimiento. Tejido microporoso que absorbe el sudor rápidamente y costuras reforzadas para máxima comodidad.",
  },
  {
    id: 2,
    nombre: "Camiseta Visitante Baloncesto Pro",
    categoria: "baloncesto",
    precio: 90000,
    imagen:
      "https://plus.unsplash.com/premium_photo-1674164229916-214a5ca5e9d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion:
      "Malla de poliéster transpirable con silueta holgada que permite total libertad de movimiento en cada tiro.",
  },
  {
    id: 3,
    nombre: "Conjunto Entrenamiento Fútbol",
    categoria: "futbol",
    precio: 120000,
    imagen:
      "https://plus.unsplash.com/premium_photo-1783088311791-0ad06a26536d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/futbol-2.jpg",
    descripcion:
      "Incluye camiseta técnica y pantaloneta con ajuste elástico. Diseñada para soportar entrenamientos de alta exigencia física.",
  },
  {
    id: 4,
    nombre: "Jersey Baloncesto Legend Edition",
    categoria: "baloncesto",
    precio: 95000,
    imagen:
      "https://images.unsplash.com/photo-1672369139633-408617172df0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dimagenes/baloncesto-2.jpg",
    descripcion:
      "Inspirada en la cultura urbana deportiva. Bordados de alta precisión y tela suave al contacto con la piel.",
  },
];

let carrito = [];
let productoSeleccionado = null;
let tallaSeleccionada = "S";
let cantidadActual = 1;

const contenedorProductos = document.getElementById("contenedorProductos");
const modalProducto = document.getElementById("modalProducto");
const botonCerrarModal = document.getElementById("botonCerrarModal");
const imagenModalProducto = document.getElementById("imagenModalProducto");
const tituloModalProducto = document.getElementById("tituloModalProducto");
const precioModalProducto = document.getElementById("precioModalProducto");
const descripcionModalProducto = document.getElementById(
  "descripcionModalProducto",
);
const campoCantidadProducto = document.getElementById("campoCantidadProducto");
const botonDisminuirCantidad = document.getElementById(
  "botonDisminuirCantidad",
);
const botonAumentarCantidad = document.getElementById("botonAumentarCantidad");
const campoDorsalPersonalizado = document.getElementById(
  "campoDorsalPersonalizado",
);
const botonAgregarAlCarritoDesdeModal = document.getElementById(
  "botonAgregarAlCarritoDesdeModal",
);
const botonesTalla = document.querySelectorAll(".boton-talla");

const panelCarrito = document.getElementById("panelCarrito");
const capaCarrito = document.getElementById("capaCarrito");
const botonAbrirCarrito = document.getElementById("botonAbrirCarrito");
const botonCerrarCarrito = document.getElementById("botonCerrarCarrito");
const elementosCarritoContenedor = document.getElementById("elementosCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const montoTotalCarrito = document.getElementById("montoTotalCarrito");
const botonesFiltro = document.querySelectorAll(".boton-filtro");
const botonMenuDesplegable = document.getElementById("botonMenuDesplegable");
const enlacesNavegacion = document.getElementById("enlacesNavegacion");
const botonFinalizarCompra = document.getElementById("botonFinalizarCompra");

const modalAutenticacion = document.getElementById("modalAutenticacion");
const botonAbrirIngreso = document.getElementById("botonAbrirIngreso");
const botonAbrirRegistro = document.getElementById("botonAbrirRegistro");
const botonCerrarAutenticacion = document.getElementById(
  "botonCerrarAutenticacion",
);
const pestanaIngreso = document.getElementById("pestanaIngreso");
const pestanaRegistro = document.getElementById("pestanaRegistro");
const formularioIngreso = document.getElementById("formularioIngreso");
const formularioRegistro = document.getElementById("formularioRegistro");
const zonaNavegacionAutenticacion = document.getElementById(
  "zonaNavegacionAutenticacion",
);

function obtenerUsuariosDeAlmacenamiento() {
  return JSON.parse(localStorage.getItem("fitgear_usuarios")) || [];
}

function obtenerUsuarioActual() {
  return JSON.parse(localStorage.getItem("fitgear_sesion"));
}

function verificarEstadoAutenticacion() {
  const usuarioActual = obtenerUsuarioActual();

  if (usuarioActual) {
    zonaNavegacionAutenticacion.innerHTML = `
            <div class="insignia-perfil-usuario">
                <i class="fa-solid fa-user"></i> <span>${usuarioActual.nombre}</span>
                <button class="boton-cerrar-sesion" id="botonCerrarSesion">Salir</button>
            </div>
          `;
    document
      .getElementById("botonCerrarSesion")
      .addEventListener("click", () => {
        localStorage.removeItem("fitgear_sesion");
        verificarEstadoAutenticacion();
      });
  } else {
    zonaNavegacionAutenticacion.innerHTML = `
            <div class="botones-autenticacion">
                <button class="boton-autenticacion-ingresar" id="botonAbrirIngreso">Ingresar</button>
                <button class="boton-autenticacion-registro" id="botonAbrirRegistro">Registro</button>
            </div>
          `;
    document
      .getElementById("botonAbrirIngreso")
      .addEventListener("click", () => abrirModalAutenticacion("ingreso"));
    document
      .getElementById("botonAbrirRegistro")
      .addEventListener("click", () => abrirModalAutenticacion("registro"));
  }
}

function abrirModalAutenticacion(tipo = "ingreso") {
  modalAutenticacion.classList.add("activo");
  if (tipo === "ingreso") {
    pestanaIngreso.classList.add("activo");
    pestanaRegistro.classList.remove("activo");
    formularioIngreso.classList.add("activo");
    formularioRegistro.classList.remove("activo");
  } else {
    pestanaRegistro.classList.add("activo");
    pestanaIngreso.classList.remove("activo");
    formularioRegistro.classList.add("activo");
    formularioIngreso.classList.remove("activo");
  }
}

botonCerrarAutenticacion.addEventListener("click", () =>
  modalAutenticacion.classList.remove("activo"),
);

pestanaIngreso.addEventListener("click", () => {
  pestanaIngreso.classList.add("activo");
  pestanaRegistro.classList.remove("activo");
  formularioIngreso.classList.add("activo");
  formularioRegistro.classList.remove("activo");
});

pestanaRegistro.addEventListener("click", () => {
  pestanaRegistro.classList.add("activo");
  pestanaIngreso.classList.remove("activo");
  formularioRegistro.classList.add("activo");
  formularioIngreso.classList.remove("activo");
});

formularioRegistro.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nombre = document.getElementById("nombreRegistro").value.trim();
  const correo = document
    .getElementById("correoRegistro")
    .value.trim()
    .toLowerCase();
  const clave = document.getElementById("claveRegistro").value;

  const usuarios = obtenerUsuariosDeAlmacenamiento();

  if (usuarios.some((u) => u.correo === correo)) {
    alert("Este correo ya se encuentra registrado. Inicia sesión.");
    return;
  }

  const nuevoUsuario = { nombre, correo, clave };
  usuarios.push(nuevoUsuario);
  localStorage.setItem("fitgear_usuarios", JSON.stringify(usuarios));

  localStorage.setItem(
    "fitgear_sesion",
    JSON.stringify({
      nombre: nuevoUsuario.nombre,
      correo: nuevoUsuario.correo,
    }),
  );
  alert(`¡Registro exitoso! Bienvenido a FitGear, ${nombre}.`);
  modalAutenticacion.classList.remove("activo");
  verificarEstadoAutenticacion();
});

formularioIngreso.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const correo = document
    .getElementById("correoIngreso")
    .value.trim()
    .toLowerCase();
  const clave = document.getElementById("claveIngreso").value;

  const usuarios = obtenerUsuariosDeAlmacenamiento();
  const usuarioEncontrado = usuarios.find(
    (u) => u.correo === correo && u.clave === clave,
  );

  if (usuarioEncontrado) {
    localStorage.setItem(
      "fitgear_sesion",
      JSON.stringify({
        nombre: usuarioEncontrado.nombre,
        correo: usuarioEncontrado.correo,
      }),
    );
    alert(`¡Hola de nuevo, ${usuarioEncontrado.nombre}!`);
    modalAutenticacion.classList.remove("activo");
    verificarEstadoAutenticacion();
  } else {
    alert("Correo o contraseña incorrectos. Verifica tus datos o regístrate.");
  }
});

function renderizarProductos(filtro = "todos") {
  contenedorProductos.innerHTML = "";

  const productosFiltrados =
    filtro === "todos"
      ? productos
      : productos.filter((p) => p.categoria === filtro);

  productosFiltrados.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";
    tarjeta.onclick = () => abrirModal(producto);
    tarjeta.innerHTML = `
            <div class="imagen-producto">
                <span class="insignia-categoria">${producto.categoria}</span>
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/400x400/16181f/39a900?text=FitGear+Sport'">
            </div>
            <div class="informacion-producto">
                <h3 class="titulo-producto">${producto.nombre}</h3>
                <p class="detalles-producto">${producto.descripcion.substring(0, 65)}...</p>
                <div class="pie-producto">
                    <span class="precio-producto">$${producto.precio.toLocaleString("es-CO")}</span>
                    <button class="boton-ver-producto">Ver Opciones</button>
                </div>
            </div>
          `;
    contenedorProductos.appendChild(tarjeta);
  });
}

function abrirModal(producto) {
  productoSeleccionado = producto;
  cantidadActual = 1;
  tallaSeleccionada = "S";

  imagenModalProducto.src = producto.imagen;
  tituloModalProducto.textContent = producto.nombre;
  precioModalProducto.textContent = `$${producto.precio.toLocaleString("es-CO")} COP`;
  descripcionModalProducto.textContent = producto.descripcion;
  campoCantidadProducto.value = cantidadActual;
  campoDorsalPersonalizado.value = "";

  botonesTalla.forEach((btn) => btn.classList.remove("seleccionado"));
  botonesTalla[0].classList.add("seleccionado");

  modalProducto.classList.add("activo");
}

function cerrarModal() {
  modalProducto.classList.remove("activo");
}

botonesTalla.forEach((btn) => {
  btn.addEventListener("click", (evento) => {
    botonesTalla.forEach((b) => b.classList.remove("seleccionado"));
    evento.target.classList.add("seleccionado");
    tallaSeleccionada = evento.target.textContent;
  });
});

botonAumentarCantidad.addEventListener("click", () => {
  cantidadActual++;
  campoCantidadProducto.value = cantidadActual;
});

botonDisminuirCantidad.addEventListener("click", () => {
  if (cantidadActual > 1) {
    cantidadActual--;
    campoCantidadProducto.value = cantidadActual;
  }
});

botonAgregarAlCarritoDesdeModal.addEventListener("click", () => {
  if (!productoSeleccionado) return;

  const textoPersonalizado = campoDorsalPersonalizado.value.trim();
  const idElementoCarrito = `${productoSeleccionado.id}-${tallaSeleccionada}-${textoPersonalizado}`;

  const indiceExistente = carrito.findIndex(
    (item) => item.idElementoCarrito === idElementoCarrito,
  );

  if (indiceExistente > -1) {
    carrito[indiceExistente].cantidad += cantidadActual;
  } else {
    carrito.push({
      idElementoCarrito: idElementoCarrito,
      id: productoSeleccionado.id,
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      imagen: productoSeleccionado.imagen,
      talla: tallaSeleccionada,
      personalizado: textoPersonalizado,
      cantidad: cantidadActual,
    });
  }

  actualizarInterfazCarrito();
  cerrarModal();
  abrirCarrito();
});

botonCerrarModal.addEventListener("click", cerrarModal);

function cambiarCantidadCarrito(idElementoCarrito, cambio) {
  const elemento = carrito.find(
    (i) => i.idElementoCarrito === idElementoCarrito,
  );
  if (elemento) {
    elemento.cantidad += cambio;
    if (elemento.cantidad <= 0) {
      carrito = carrito.filter(
        (i) => i.idElementoCarrito !== idElementoCarrito,
      );
    }
    actualizarInterfazCarrito();
  }
}

function eliminarDelCarrito(idElementoCarrito) {
  carrito = carrito.filter(
    (item) => item.idElementoCarrito !== idElementoCarrito,
  );
  actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
  const totalElementos = carrito.reduce(
    (suma, item) => suma + item.cantidad,
    0,
  );
  contadorCarrito.textContent = totalElementos;

  elementosCarritoContenedor.innerHTML = "";
  if (carrito.length === 0) {
    elementosCarritoContenedor.innerHTML =
      '<p style="text-align:center; color: var(--texto-secundario); margin-top:2rem;">El carrito está vacío.</p>';
  } else {
    carrito.forEach((item) => {
      const domElemento = document.createElement("div");
      domElemento.className = "elemento-carrito";
      domElemento.innerHTML = `
              <img src="${item.imagen}" alt="${item.nombre}">
              <div class="informacion-elemento-carrito">
                  <div class="titulo-elemento-carrito">${item.nombre}</div>
                  <div class="metadatos-elemento-carrito">Talla: <strong>${item.talla}</strong> ${item.personalizado ? "| " + item.personalizado : ""}</div>
                  <div class="precio-elemento-carrito">$${(item.precio * item.cantidad).toLocaleString("es-CO")}</div>
                  <div class="acciones-cantidad-elemento-carrito">
                      <button class="boton-cantidad-elemento-carrito" onclick="cambiarCantidadCarrito('${item.idElementoCarrito}', -1)">-</button>
                      <span style="font-size:0.85rem; font-weight:700;">${item.cantidad}</span>
                      <button class="boton-cantidad-elemento-carrito" onclick="cambiarCantidadCarrito('${item.idElementoCarrito}', 1)">+</button>
                  </div>
              </div>
              <button class="boton-eliminar-elemento" onclick="eliminarDelCarrito('${item.idElementoCarrito}')"><i class="fa-solid fa-trash-can"></i></button>
            `;
      elementosCarritoContenedor.appendChild(domElemento);
    });
  }

  const dineroTotal = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
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

botonAbrirCarrito.addEventListener("click", abrirCarrito);
botonCerrarCarrito.addEventListener("click", cerrarCarrito);
capaCarrito.addEventListener("click", cerrarCarrito);

botonesFiltro.forEach((btn) => {
  btn.addEventListener("click", (evento) => {
    botonesFiltro.forEach((b) => b.classList.remove("activo"));
    evento.target.classList.add("activo");
    renderizarProductos(evento.target.dataset.filtro);
  });
});

botonMenuDesplegable.addEventListener("click", () =>
  enlacesNavegacion.classList.toggle("activo"),
);

botonFinalizarCompra.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  localStorage.setItem("fitgear_carrito", JSON.stringify(carrito));

  window.location.href = "pago.html";
});

verificarEstadoAutenticacion();
renderizarProductos();
