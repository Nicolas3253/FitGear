// ==========================================
// 1. BASE DE DATOS DE PRODUCTOS
// ==========================================
const products = [
  {
    id: 1,
    name: "Camiseta Local Fútbol Pro 2026",
    category: "futbol",
    price: 85000,
    image: "https://images.unsplash.com/photo-1577212017308-55c4d60d2609?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Edición especial de alto rendimiento. Tejido microporoso que absorbe el sudor rápidamente y costuras reinforced para máxima comodidad.",
  },
  {
    id: 2,
    name: "Camiseta Visitante Baloncesto Pro",
    category: "baloncesto",
    price: 90000,
    image: "https://plus.unsplash.com/premium_photo-1674164229916-214a5ca5e9d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Malla de poliéster transpirable con silueta holgada que permite total libertad de movimiento en cada tiro.",
  },
  {
    id: 3,
    name: "Conjunto Entrenamiento Fútbol",
    category: "futbol",
    price: 120000,
    image: "https://plus.unsplash.com/premium_photo-1783088311791-0ad06a26536d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/futbol-2.jpg",
    description:
      "Incluye camiseta técnica y pantaloneta con ajuste elástico. Diseñada para soportar entrenamientos de alta exigencia física.",
  },
  {
    id: 4,
    name: "Jersey Baloncesto Legend Edition",
    category: "baloncesto",
    price: 95000,
    image: "https://images.unsplash.com/photo-1672369139633-408617172df0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dimagenes/baloncesto-2.jpg",
    description:
      "Inspirada en la cultura urbana deportiva. Bordados de alta precisión y tela suave al contacto con la piel.",
  },
];

let cart = [];
let selectedProduct = null;
let selectedSize = "S";
let currentQty = 1;

// ==========================================
// 2. ELEMENTOS DEL DOM
// ==========================================
const productsContainer = document.getElementById("productsContainer");
const productModal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalProductImg = document.getElementById("modalProductImg");
const modalProductTitle = document.getElementById("modalProductTitle");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalProductDesc = document.getElementById("modalProductDesc");
const productQtyInput = document.getElementById("productQtyInput");
const decreaseQtyBtn = document.getElementById("decreaseQtyBtn");
const increaseQtyBtn = document.getElementById("increaseQtyBtn");
const customDorsalInput = document.getElementById("customDorsalInput");
const addToCartFromModalBtn = document.getElementById("addToCartFromModalBtn");
const sizeBtns = document.querySelectorAll(".size-btn");

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

// DOM Autenticación
const authModal = document.getElementById("authModal");
const openLoginBtn = document.getElementById("openLoginBtn");
const openRegisterBtn = document.getElementById("openRegisterBtn");
const closeAuthBtn = document.getElementById("closeAuthBtn");
const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const authNavZone = document.getElementById("authNavZone");

// ==========================================
// 3. SISTEMA DE AUTENTICACIÓN CON LOCALSTORAGE
// ==========================================
function getUsersFromStorage() {
  return JSON.parse(localStorage.getItem("fitgear_users")) || [];
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("fitgear_session"));
}

function checkAuthStatus() {
  const currentUser = getCurrentUser();

  if (currentUser) {
    authNavZone.innerHTML = `
                    <div class="user-profile-badge">
                        <i class="fa-solid fa-user"></i> <span>${currentUser.name}</span>
                        <button class="btn-logout" id="logoutBtn">Salir</button>
                    </div>
                `;
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("fitgear_session");
      checkAuthStatus();
    });
  } else {
    authNavZone.innerHTML = `
                    <div class="auth-buttons">
                        <button class="btn-auth-login" id="openLoginBtn">Ingresar</button>
                        <button class="btn-auth-register" id="openRegisterBtn">Registro</button>
                    </div>
                `;
    document
      .getElementById("openLoginBtn")
      .addEventListener("click", () => openAuthModal("login"));
    document
      .getElementById("openRegisterBtn")
      .addEventListener("click", () => openAuthModal("register"));
  }
}

function openAuthModal(type = "login") {
  authModal.classList.add("active");
  if (type === "login") {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  } else {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  }
}

closeAuthBtn.addEventListener("click", () =>
  authModal.classList.remove("active"),
);

tabLogin.addEventListener("click", () => {
  tabLogin.classList.add("active");
  tabRegister.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

tabRegister.addEventListener("click", () => {
  tabRegister.classList.add("active");
  tabLogin.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
});

// Evento Registro
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim().toLowerCase();
  const password = document.getElementById("regPassword").value;

  const users = getUsersFromStorage();

  if (users.some((user) => user.email === email)) {
    alert("Este correo ya se encuentra registrado. Inicia sesión.");
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("fitgear_users", JSON.stringify(users));

  // Guardar sesión activa
  localStorage.setItem(
    "fitgear_session",
    JSON.stringify({ name: newUser.name, email: newUser.email }),
  );
  alert(`¡Registro exitoso! Bienvenido a FitGear, ${name}.`);
  authModal.classList.remove("active");
  checkAuthStatus();
});

// Evento Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document
    .getElementById("loginEmail")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("loginPassword").value;

  const users = getUsersFromStorage();
  const foundUser = users.find(
    (u) => u.email === email && u.password === password,
  );

  if (foundUser) {
    localStorage.setItem(
      "fitgear_session",
      JSON.stringify({ name: foundUser.name, email: foundUser.email }),
    );
    alert(`¡Hola de nuevo, ${foundUser.name}!`);
    authModal.classList.remove("active");
    checkAuthStatus();
  } else {
    alert("Correo o contraseña incorrectos. Verifica tus datos o regístrate.");
  }
});

// ==========================================
// 4. RENDERIZAR CATÁLOGO
// ==========================================
function renderProducts(filter = "all") {
  productsContainer.innerHTML = "";

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.onclick = () => openModal(product);
    card.innerHTML = `
                    <div class="product-image">
                        <span class="badge-category">${product.category}</span>
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400/16181f/39a900?text=FitGear+Sport'">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-details">${product.description.substring(0, 65)}...</p>
                        <div class="product-footer">
                            <span class="product-price">$${product.price.toLocaleString("es-CO")}</span>
                            <button class="btn-view-product">Ver Opciones</button>
                        </div>
                    </div>
                `;
    productsContainer.appendChild(card);
  });
}

// ==========================================
// 5. LÓGICA DEL MODAL DE DETALLE
// ==========================================
function openModal(product) {
  selectedProduct = product;
  currentQty = 1;
  selectedSize = "S";

  modalProductImg.src = product.image;
  modalProductTitle.textContent = product.name;
  modalProductPrice.textContent = `$${product.price.toLocaleString("es-CO")} COP`;
  modalProductDesc.textContent = product.description;
  productQtyInput.value = currentQty;
  customDorsalInput.value = "";

  sizeBtns.forEach((btn) => btn.classList.remove("selected"));
  sizeBtns[0].classList.add("selected");

  productModal.classList.add("active");
}

function closeModal() {
  productModal.classList.remove("active");
}

sizeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sizeBtns.forEach((b) => b.classList.remove("selected"));
    e.target.classList.add("selected");
    selectedSize = e.target.textContent;
  });
});

increaseQtyBtn.addEventListener("click", () => {
  currentQty++;
  productQtyInput.value = currentQty;
});

decreaseQtyBtn.addEventListener("click", () => {
  if (currentQty > 1) {
    currentQty--;
    productQtyInput.value = currentQty;
  }
});

addToCartFromModalBtn.addEventListener("click", () => {
  if (!selectedProduct) return;

  const customText = customDorsalInput.value.trim();
  const cartItemId = `${selectedProduct.id}-${selectedSize}-${customText}`;

  const existingIndex = cart.findIndex(
    (item) => item.cartItemId === cartItemId,
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += currentQty;
  } else {
    cart.push({
      cartItemId: cartItemId,
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      size: selectedSize,
      custom: customText,
      quantity: currentQty,
    });
  }

  updateCartUI();
  closeModal();
  openCart();
});

closeModalBtn.addEventListener("click", closeModal);

// ==========================================
// 6. LÓGICA DEL CARRITO
// ==========================================
function changeCartQty(cartItemId, delta) {
  const item = cart.find((i) => i.cartItemId === cartItemId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.cartItemId !== cartItemId);
    }
    updateCartUI();
  }
}

function removeFromCart(cartItemId) {
  cart = cart.filter((item) => item.cartItemId !== cartItemId);
  updateCartUI();
}

function updateCartUI() {
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
                            <div class="cart-item-meta">Talla: <strong>${item.size}</strong> ${item.custom ? "| " + item.custom : ""}</div>
                            <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString("es-CO")}</div>
                            <div class="cart-item-qty-actions">
                                <button class="cart-item-qty-btn" onclick="changeCartQty('${item.cartItemId}', -1)">-</button>
                                <span style="font-size:0.85rem; font-weight:700;">${item.quantity}</span>
                                <button class="cart-item-qty-btn" onclick="changeCartQty('${item.cartItemId}', 1)">+</button>
                            </div>
                        </div>
                        <button class="btn-remove-item" onclick="removeFromCart('${item.cartItemId}')"><i class="fa-solid fa-trash-can"></i></button>
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

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// Filtros
filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    renderProducts(e.target.dataset.filter);
  });
});

menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));

checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    // Guardar carrito para leerlo en checkout.html
    localStorage.setItem('fitgear_cart', JSON.stringify(cart));
    
    // Redirigir directamente a la pantalla dedicada de pago
    window.location.href = 'pago.html';
});

// Inicialización
checkAuthStatus();
renderProducts();
