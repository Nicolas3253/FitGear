// BASE DE DATOS DETALLADA
const products = [
  {
    id: 1,
    name: "Camiseta Local Fútbol Pro 2026",
    category: "futbol",
    price: 85000,
    desc: "Edición especial de alto rendimiento. Tejido microporoso que absorbe la humedad.",
    image: "imagenes/futbol-1.jpg",
  },
  {
    id: 2,
    name: "Camiseta Visitante Baloncesto Pro",
    category: "baloncesto",
    price: 90000,
    desc: "Malla de poliéster transpirable con silueta holgada que permite libertad de movimiento.",
    image: "imagenes/baloncesto-1.jpg",
  },
  {
    id: 3,
    name: "Conjunto Entrenamiento Fútbol",
    category: "futbol",
    price: 120000,
    desc: "Incluye camiseta técnica y pantaloneta con ajuste elástico. Diseñado para alta exigencia.",
    image: "imagenes/futbol-2.jpg",
  },
  {
    id: 4,
    name: "Jersey Baloncesto Legend Edition",
    category: "baloncesto",
    price: 95000,
    desc: "Inspirada en el corte clásico del basketball noventero con acabados premium.",
    image: "imagenes/baloncesto-2.jpg",
  },
  {
    id: 5,
    name: "Camiseta Edición Especial Tricolor",
    category: "futbol",
    price: 110000,
    desc: "Detalles sublimados en alta definición con escudo en relieve.",
    image: "imagenes/futbol-1.jpg",
  },
  {
    id: 6,
    name: "Jersey All-Star Baloncesto Black",
    category: "baloncesto",
    price: 105000,
    desc: "Diseño elegante en tono negro satinado con costuras reforzadas.",
    image: "imagenes/baloncesto-1.jpg",
  },
];

let cart = JSON.parse(localStorage.getItem("fitgear_cart")) || [];
let selectedProduct = null;
let selectedSize = "S";
let selectedQty = 1;

// ELEMENTOS
const catalogGrid = document.getElementById("catalogGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const priceRange = document.getElementById("priceRange");
const maxPriceLabel = document.getElementById("maxPriceLabel");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const resultsCount = document.getElementById("resultsCount");

// MODAL
const productModal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const sizeBtns = document.querySelectorAll(".size-btn");
const qtyVal = document.getElementById("qtyVal");
const qtyMinus = document.getElementById("qtyMinus");
const qtyPlus = document.getElementById("qtyPlus");
const customInput = document.getElementById("customInput");
const addToCartModalBtn = document.getElementById("addToCartModalBtn");

// CARRITO
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotalAmount = document.getElementById("cartTotalAmount");
const checkoutBtn = document.getElementById("checkoutBtn");

// 1. FILTRAR Y RENDERIZAR
function filterAndRenderProducts() {
  let filtered = [...products];

  const searchText = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const sort = sortFilter.value;
  const maxPrice = parseInt(priceRange.value);

  if (searchText)
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchText),
    );
  if (category !== "all")
    filtered = filtered.filter((p) => p.category === category);
  filtered = filtered.filter((p) => p.price <= maxPrice);

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sort === "name-asc")
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "name-desc")
    filtered.sort((a, b) => b.name.localeCompare(a.name));

  catalogGrid.innerHTML = "";
  resultsCount.textContent = `Mostrando ${filtered.length} de ${products.length} productos`;

  if (filtered.length === 0) {
    catalogGrid.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No se encontraron productos.</p>';
    return;
  }

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
                    <div class="product-image">
                        <span class="badge-category">${product.category}</span>
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400/16181f/39a900?text=FitGear+Sport'">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-desc">${product.desc}</p>
                        <div class="product-bottom">
                            <span class="product-price">$${product.price.toLocaleString("es-CO")}</span>
                            <button class="btn-view-options" onclick="openProductModal(${product.id})">Ver Opciones</button>
                        </div>
                    </div>
                `;
    catalogGrid.appendChild(card);
  });
}

// 2. MODAL DE PRODUCTO
window.openProductModal = function (id) {
  selectedProduct = products.find((p) => p.id === id);
  if (!selectedProduct) return;

  selectedSize = "S";
  selectedQty = 1;
  customInput.value = "";
  qtyVal.textContent = selectedQty;

  sizeBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.size === "S");
  });

  modalImg.src = selectedProduct.image;
  modalTitle.textContent = selectedProduct.name;
  modalPrice.textContent = `$${selectedProduct.price.toLocaleString("es-CO")} COP`;
  modalDesc.textContent = selectedProduct.desc;

  productModal.classList.add("active");
};

function closeModal() {
  productModal.classList.remove("active");
}

sizeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sizeBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedSize = btn.dataset.size;
  });
});

qtyMinus.addEventListener("click", () => {
  if (selectedQty > 1) {
    selectedQty--;
    qtyVal.textContent = selectedQty;
  }
});

qtyPlus.addEventListener("click", () => {
  selectedQty++;
  qtyVal.textContent = selectedQty;
});

addToCartModalBtn.addEventListener("click", () => {
  if (!selectedProduct) return;

  const customText = customInput.value.trim();
  const cartItemId = `${selectedProduct.id}-${selectedSize}-${customText || "SinDorsal"}`;

  const existingIndex = cart.findIndex(
    (item) => item.cartItemId === cartItemId,
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += selectedQty;
  } else {
    cart.push({
      cartItemId: cartItemId,
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      size: selectedSize,
      custom: customText ? `Dorsal: ${customText}` : "",
      quantity: selectedQty,
    });
  }

  updateCartUI();
  closeModal();
  openCart();
});

// 3. CARRITO
function updateCartUI() {
  localStorage.setItem("fitgear_cart", JSON.stringify(cart));
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p style="text-align:center; color: var(--text-muted); margin-top:2rem;">El carrito está vacío.</p>';
  } else {
    cart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-meta">Talla: ${item.size} ${item.custom ? "| " + item.custom : ""}</div>
                            <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString("es-CO")} (x${item.quantity})</div>
                        </div>
                    `;
      cartItemsContainer.appendChild(itemElement);
    });
  }

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

// LISTENERS
searchInput.addEventListener("input", filterAndRenderProducts);
categoryFilter.addEventListener("change", filterAndRenderProducts);
sortFilter.addEventListener("change", filterAndRenderProducts);
priceRange.addEventListener("input", (e) => {
  maxPriceLabel.textContent = `$${parseInt(e.target.value).toLocaleString("es-CO")} COP`;
  filterAndRenderProducts();
});

resetFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "all";
  sortFilter.value = "default";
  priceRange.value = 150000;
  maxPriceLabel.textContent = "$150.000 COP";
  filterAndRenderProducts();
});

closeModalBtn.addEventListener("click", closeModal);
productModal.addEventListener("click", (e) => {
  if (e.target === productModal) closeModal();
});

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  window.location.href = "pago.html";
});

// INICIO
updateCartUI();
filterAndRenderProducts();
