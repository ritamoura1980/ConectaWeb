const productCards = [...document.querySelectorAll(".product-card")];
const filterButtons = document.querySelectorAll(".filter");
const searchPanel = document.querySelector("#searchPanel");
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");
const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector(".nav-links");
const cartCount = document.querySelector("#cartCount");
const cartButton = document.querySelector("#cartButton");
const toast = document.querySelector("#toast");

let activeBrand = "all";
let cartItems = 0;
let toastTimer;

function updateProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  let visibleProducts = 0;

  productCards.forEach((card) => {
    const matchesBrand = activeBrand === "all" || card.dataset.brand === activeBrand;
    const matchesSearch = card.dataset.name.includes(query);
    const isVisible = matchesBrand && matchesSearch;
    card.classList.toggle("hidden", !isVisible);
    visibleProducts += Number(isVisible);
  });

  emptyState.classList.toggle("visible", visibleProducts === 0);
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeBrand = button.dataset.filter;
    updateProducts();
  });
});

document.querySelector("#searchToggle").addEventListener("click", () => {
  searchPanel.classList.add("open");
  searchInput.focus();
});

document.querySelector("#searchClose").addEventListener("click", () => {
  searchPanel.classList.remove("open");
  searchInput.value = "";
  updateProducts();
});

searchInput.addEventListener("input", updateProducts);

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".buy-button").forEach((button) => {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = cartItems;
    cartButton.setAttribute("aria-label", `Carrinho com ${cartItems} ${cartItems === 1 ? "item" : "itens"}`);
    showToast(`${button.dataset.product} adicionado ao carrinho.`);
  });
});

cartButton.addEventListener("click", () => {
  showToast(cartItems ? `Você tem ${cartItems} ${cartItems === 1 ? "item" : "itens"} no carrinho.` : "Seu carrinho está vazio.");
});