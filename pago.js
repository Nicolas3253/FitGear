let carrito = JSON.parse(localStorage.getItem("fitgear_cart")) || [];
const usuarioActual = JSON.parse(localStorage.getItem("fitgear_session"));

const contenedorElementosResumen = document.getElementById("contenedorElementosResumen");
const valorSubtotal = document.getElementById("valorSubtotal");
const valorTotal = document.getElementById("valorTotal");
const botonConfirmarPago = document.getElementById("botonConfirmarPago");

const modalExito = document.getElementById("modalExito");
const nombreUsuarioModal = document.getElementById("nombreUsuarioModal");
const metodoPagoModal = document.getElementById("metodoPagoModal");
const montoTotalModal = document.getElementById("montoTotalModal");
const direccionModal = document.getElementById("direccionModal");
const botonCerrarModalExito = document.getElementById("botonCerrarModalExito");

const COSTO_ENVIO = 12000;

if (usuarioActual) {
  if (usuarioActual.name || usuarioActual.nombre) {
    document.getElementById("campoNombre").value = usuarioActual.name || usuarioActual.nombre;
  }
  if (usuarioActual.lastName || usuarioActual.apellido) {
    document.getElementById("campoApellido").value = usuarioActual.lastName || usuarioActual.apellido;
  }
  if (usuarioActual.email || usuarioActual.correo) {
    document.getElementById("campoCorreo").value = usuarioActual.email || usuarioActual.correo;
  }
  if (usuarioActual.address || usuarioActual.direccion) {
    document.getElementById("campoDireccion").value = usuarioActual.address || usuarioActual.direccion;
  }
  if (usuarioActual.city || usuarioActual.ciudad) {
    document.getElementById("campoCiudad").value = usuarioActual.city || usuarioActual.ciudad;
  }
  if (usuarioActual.phone || usuarioActual.telefono) {
    document.getElementById("campoTelefono").value = usuarioActual.phone || usuarioActual.telefono;
  }
}

function renderizarResumenPago() {
  contenedorElementosResumen.innerHTML = "";

  if (carrito.length === 0) {
    contenedorElementosResumen.innerHTML =
      '<p style="text-align:center; color: var(--texto-atenuado); grid-column: span 2;">No hay productos en el carrito.</p>';
    valorSubtotal.textContent = "$0 COP";
    valorTotal.textContent = "$0 COP";
    botonConfirmarPago.disabled = true;
    return;
  }

  botonConfirmarPago.disabled = false;
  let subtotal = 0;

  carrito.forEach((articulo) => {
    const precio = articulo.price || articulo.precio || 0;
    const cantidad = articulo.quantity || articulo.cantidad || 1;
    const subtotalArticulo = precio * cantidad;
    subtotal += subtotalArticulo;

    const divArticulo = document.createElement("div");
    divArticulo.className = "elemento-resumen";

    const textoPersonalizado = articulo.custom || articulo.personalizado 
      ? ` | Personalizado: ${articulo.custom || articulo.personalizado}` 
      : "";
    const textoTalla = articulo.size || articulo.talla 
      ? `Talla: <strong>${articulo.size || articulo.talla}</strong>` 
      : "";

    divArticulo.innerHTML = `
      <img src="${articulo.image || articulo.imagen || 'https://via.placeholder.com/50'}" alt="${articulo.name || articulo.nombre || 'Producto'}">
      <div class="informacion-elemento-resumen">
          <div class="titulo-elemento-resumen">${articulo.name || articulo.nombre || "Producto FitGear"}</div>
          <div class="meta-elemento-resumen">${textoTalla}${textoPersonalizado} (x${cantidad})</div>
          <div class="precio-elemento-resumen">$${subtotalArticulo.toLocaleString("es-CO")} COP</div>
      </div>
    `;
    contenedorElementosResumen.appendChild(divArticulo);
  });

  const total = subtotal + COSTO_ENVIO;
  valorSubtotal.textContent = `$${subtotal.toLocaleString("es-CO")} COP`;
  valorTotal.textContent = `$${total.toLocaleString("es-CO")} COP`;
}

botonConfirmarPago.addEventListener("click", (evento) => {
  evento.preventDefault();

  const nombre = document.getElementById("campoNombre").value.trim();
  const apellido = document.getElementById("campoApellido").value.trim();
  const correo = document.getElementById("campoCorreo").value.trim();
  const direccion = document.getElementById("campoDireccion").value.trim();
  const ciudad = document.getElementById("campoCiudad").value.trim();
  const telefono = document.getElementById("campoTelefono").value.trim();

  const entradaMetodoSeleccionado = document.querySelector('input[name="metodo_pago"]:checked');
  const metodoSeleccionado = entradaMetodoSeleccionado ? entradaMetodoSeleccionado.value : "Nequi";

  if (!nombre || !apellido || !correo || !direccion || !ciudad || !telefono) {
    alert("Por favor diligencia todos los campos obligatorios del formulario de envío.");
    return;
  }

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  nombreUsuarioModal.textContent = `${nombre} ${apellido}`;
  metodoPagoModal.textContent = metodoSeleccionado;
  montoTotalModal.textContent = valorTotal.textContent;
  direccionModal.textContent = `${direccion}, ${ciudad}`;

  modalExito.classList.add("activo");
});

if (botonCerrarModalExito) {
  botonCerrarModalExito.addEventListener("click", () => {
    modalExito.classList.remove("activo");
    localStorage.removeItem("fitgear_cart");
    window.location.href = "index.html";
  });
}

renderizarResumenPago();