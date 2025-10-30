const cartIcon = document.querySelector("#cart .count");
const favIcon = document.querySelector("#fav i");
const favCount = document.querySelector("#fav .fav-count");
const loginBtn = document.querySelector("#login");

let cartCount = 0;
let favAdded = false;

// Savatcha bosilganda son oshadi
document.getElementById("cart").addEventListener("click", () => {
  cartCount++;
  cartIcon.textContent = cartCount;
});

// Yoqtirish bosilganda yurak qizil bo‘ladi
document.getElementById("fav").addEventListener("click", () => {
  favAdded = !favAdded;
  favIcon.classList.toggle("fa-solid");
  favIcon.style.color = favAdded ? "red" : "#333";
  favCount.textContent = favAdded ? "1" : "0";
});

// Login bosilganda alert chiqadi
loginBtn.addEventListener("click", () => {
  alert("Tizimga kirish oynasi ochiladi (demo).");
});

// 🔹 Mobil menyuni ochish
const menuToggle = document.querySelector(".menu-toggle");
const headerRight = document.querySelector(".header__right");

menuToggle.addEventListener("click", () => {
  headerRight.classList.toggle("show");
});
