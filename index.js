// =================================================
// 1 Simulación de base de datos para los artículos
// =================================================
const products = [
  {
    id: 1,
    name: "Camiseta Local Fútbol Pro 2026",
    category: "futbol",
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1577212017308-55c4d60d2609?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Tecnología de ventilación avanzada y corte ergonómico.",
  },
  {
    id: 2,
    name: "Camiseta Visitante Baloncesto Pro",
    category: "baloncesto",
    price: 90000,
    image:
      "https://plus.unsplash.com/premium_photo-1674164229916-214a5ca5e9d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Malla de poliéster transpirable para máxima movilidad.",
  },
  {
    id: 3,
    name: "Conjunto Entrenamiento Fútbol",
    category: "futbol",
    price: 120000,
    image:
      "https://plus.unsplash.com/premium_photo-1783088311791-0ad06a26536d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/futbol-2.jpg",
    description: "Incluye camiseta técnica y pantaloneta de alto rendimiento.",
  },
  {
    id: 4,
    name: "Jersey Baloncesto Legend Edition",
    category: "baloncesto",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1672369139633-408617172df0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Diseño clásico de cultura urbana con acabados premium.",
  },
];

let cart = [];

// ==========================================
// 2. REFERENCIAS DEL DOM
// ==========================================
const productsContainer = document.getElementById("productsContainer");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotalAmount = document.getElementById("cartTotalAmount");
const filterBtns = document.querySelectorAll(".filter-btn");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const checkoutBtn = document.getElementById("checkoutBtn");

// ==========================================
// 3 Renderiza los productos
// ==========================================
function renderProducts(filter = "all") {
  productsContainer.innerHTML = "";

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
                    <div class="product-image">
                        <span class="badge-category">${product.category}</span>
                        <!-- Si la imagen falla en cargar muestra un placeholder estilizado -->
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400/16181f/39a900?text=FitGear+Sport'">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-details">${product.description}</p>
                        <div class="product-footer">
                            <span class="product-price">$${product.price.toLocaleString("es-CO")}</span>
                            <button class="btn-add-cart" onclick="addToCart(${product.id})">Añadir +</button>
                        </div>
                    </div>
                `;
    productsContainer.appendChild(card);
  });
}

// ==========================================
// Guarda los artículos en el carrito de compras
// ==========================================
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  // Actualiza la cantida de prouctos en el carrito
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Renderizar los items
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p style="text-align:center; color: var(--text-muted); margin-top:2rem;">El carrito está vacío.</p>';
  } else {
    cart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100/16181f/39a900?text=FitGear'">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toLocaleString("es-CO")} x ${item.quantity}</div>
                        </div>
                        <button class="btn-remove-item" onclick="removeFromCart(${item.id})">Quitar</button>
                    `;
      cartItemsContainer.appendChild(itemElement);
    });
  }

  // Actualizar el monto total en el carrito
  const totalMoney = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  cartTotalAmount.textContent = `$${totalMoney.toLocaleString("es-CO")} COP`;
}

function openCart() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeCart() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}

// ==========================================
// 5. EVENTOS & FILTROS
// ==========================================
openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    renderProducts(e.target.dataset.filter);
  });
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Simulación el Checkout Seguro
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Agrega al menos un producto al carrito para continuar.");
    return;
  }
  alert(
    "¡Redirigiendo a la pasarela de pago segura! (Simulación de integración Nequi / Daviplata / PSE para la sustentación SENA).",
  );
  cart = [];
  updateCartUI();
  closeCart();
});

// Se inicializa renderizando la página
renderProducts();
