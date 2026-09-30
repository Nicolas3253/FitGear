// Cargar productos del carrito almacenados en localStorage
let cart = JSON.parse(localStorage.getItem("fitgear_cart")) || [];
const currentUser = JSON.parse(localStorage.getItem("fitgear_session"));

const summaryItemsContainer = document.getElementById("summaryItemsContainer");
const subtotalVal = document.getElementById("subtotalVal");
const totalVal = document.getElementById("totalVal");
const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");

const SHIPPING_COST = 12000;

// Precargar datos si el usuario inició sesión
if (currentUser) {
  document.getElementById("checkoutName").value = currentUser.name || "";
  document.getElementById("checkoutEmail").value = currentUser.email || "";
}

function renderCheckoutSummary() {
  summaryItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    summaryItemsContainer.innerHTML =
      '<p style="text-align:center; color: var(--text-muted);">No hay productos en el carrito.</p>';
    subtotalVal.textContent = "$0 COP";
    totalVal.textContent = "$0 COP";
    confirmPaymentBtn.disabled = true;
    return;
  }

  let subtotal = 0;

  cart.forEach((item) => {
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "summary-item";
    itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="summary-item-info">
                        <div class="summary-item-title">${item.name}</div>
                        <div class="summary-item-meta">Talla: <strong>${item.size}</strong> ${item.custom ? "| " + item.custom : ""} (x${item.quantity})</div>
                        <div class="summary-item-price">$${itemSubtotal.toLocaleString("es-CO")}</div>
                    </div>
                `;
    summaryItemsContainer.appendChild(itemDiv);
  });

  const total = subtotal + SHIPPING_COST;
  subtotalVal.textContent = `$${subtotal.toLocaleString("es-CO")} COP`;
  totalVal.textContent = `$${total.toLocaleString("es-CO")} COP`;
}

// Confirmar Pago
confirmPaymentBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("checkoutName").value.trim();
  const address = document.getElementById("checkoutAddress").value.trim();
  const city = document.getElementById("checkoutCity").value.trim();
  const selectedMethod = document
    .querySelector('input[name="payment_method"]:checked')
    .value.toUpperCase();

  if (!name || !address || !city) {
    alert("Por favor diligencia todos los datos de envío obligatorios.");
    return;
  }

  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert(
    `¡Proceso Exitoso!\n\nGracias ${name}, tu pedido ha sido procesado mediante ${selectedMethod}.\nEnviaremos la guía de rastreo a tu correo.`,
  );

  // Limpiar carrito tras la compra exitosa
  localStorage.removeItem("fitgear_cart");
  window.location.href = "index.html";
});

renderCheckoutSummary();
