// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------- Header: mobile menu toggle ------------------------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const headerRight = document.querySelector(".header__right");

  if (menuToggle && headerRight) {
    headerRight.classList.add("right-[-100%]");
    menuToggle.addEventListener("click", () => {
      if (headerRight.classList.contains("right-0")) {
        headerRight.classList.remove("right-0");
        headerRight.classList.add("right-[-100%]");
      } else {
        headerRight.classList.add("right-0");
        headerRight.classList.remove("right-[-100%]");
      }
    });
  }

  /* ------------------------- Header: cart / fav elements ------------------------- */
  const cartBtn = document.getElementById("cart");
  const favBtn = document.getElementById("fav");
  const cartCountSpan = document.querySelector("#cart .count");
  const favCountSpan = document.querySelector("#fav .fav-count");

  let basket = JSON.parse(localStorage.getItem("basket")) || [];
  let lovely = JSON.parse(localStorage.getItem("lovely")) || [];

  function updateCountsUI() {
    if (cartCountSpan) cartCountSpan.textContent = basket.length;
    if (favCountSpan) favCountSpan.textContent = lovely.length;
  }
  updateCountsUI();

  // Savatchaga bosilganda basket sahifasiga o‘tish
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      window.location.href = "./basket.html";
    });
  }

  if (favBtn) {
    favBtn.addEventListener("click", () => {
      console.log("Favorites clicked — items:", lovely.length);
    });
  }

  /* ------------------------- Products fetch + render ------------------------- */
  const container = document.getElementById("productAsaxiy");
  if (!container) return;

  fetch("https://68fa0502ef8b2e621e7e795f.mockapi.io/api/products")
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data)) {
        // Mock data fallback
        data = [
          { name: "Samsung Galaxy S25 Ultra", price: "12 849 000 so‘m", rate: "5", image: "https://cdn.asaxiy.uz/asaxiy-content/product/main_image/desktop/67933cd159d5c.png.webp" },
          { name: "Apple iPhone 15 Pro", price: "18 999 000 so‘m", rate: "4.9", image: "https://cdn.asaxiy.uz/asaxiy-content/product/main_image/desktop/67933cd159d5c.png.webp" }
        ];
      }
      container.innerHTML = "";
      data.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "card bg-white shadow rounded-lg p-4 text-center flex flex-col";
        card.innerHTML = `
          <img src="${item.image || "./image/blender.png"}" alt="${item.name}" class="w-full h-40 object-contain mb-2">
          <h3 class="font-semibold text-sm">${item.name}</h3>
          <p class="text-blue-600 font-bold price">${item.price} so‘m</p>
          <p class="text-gray-500 rate">${item.rate || "—"}</p>
          <div class="mt-3 flex items-center justify-center gap-3">
            <button data-index="${idx}" class="btnBasket bg-blue-600 text-white py-1 px-3 rounded">Sotib olish</button>
            <button class="btnLike border p-2 rounded heart"><i class="fa-regular fa-heart"></i></button>
          </div>
        `;
        container.appendChild(card);
      });

      attachProductListeners();
      updateCountsUI();
    })
    .catch((err) => {
      // Mock data fallback on error
      const data = [
        { name: "Samsung Galaxy S25 Ultra", price: "12 849 000 so‘m", rate: "5", image: "https://cdn.asaxiy.uz/asaxiy-content/product/main_image/desktop/67933cd159d5c.png.webp" },
        { name: "Apple iPhone 15 Pro", price: "18 999 000 so‘m", rate: "4.9", image: "https://cdn.asaxiy.uz/asaxiy-content/product/main_image/desktop/67933cd159d5c.png.webp" }
      ];
      container.innerHTML = "";
      data.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "card bg-white shadow rounded-lg p-4 text-center flex flex-col";
        card.innerHTML = `
          <img src="${item.image || "./image/blender.png"}" alt="${item.name}" class="w-full h-40 object-contain mb-2">
          <h3 class="font-semibold text-sm">${item.name}</h3>
          <p class="text-blue-600 font-bold price">${item.price} so‘m</p>
          <p class="text-gray-500 rate">${item.rate || "—"}</p>
          <div class="mt-3 flex items-center justify-center gap-3">
            <button data-index="${idx}" class="btnBasket bg-blue-600 text-white py-1 px-3 rounded">Sotib olish</button>
            <button class="btnLike border p-2 rounded heart"><i class="fa-regular fa-heart"></i></button>
          </div>
        `;
        container.appendChild(card);
      });
      attachProductListeners();
      updateCountsUI();
    });

  /* ------------------------- Attach listeners ------------------------- */
  function attachProductListeners() {
    const addBtns = document.querySelectorAll(".btnBasket");
    addBtns.forEach((btn) => {
      const card = btn.closest(".card");
      const name = card?.querySelector("h3")?.textContent?.trim();
      if (name && basket.some((p) => p.name === name)) {
        btn.textContent = "Savat ichida";
        btn.style.backgroundColor = "rgb(1, 1, 94)";
        btn.disabled = true;
      }

      btn.addEventListener("click", (e) => {
        const cardEl = e.currentTarget.closest(".card");
        const name = cardEl.querySelector("h3").textContent.trim();
        const price = cardEl.querySelector(".price").textContent.trim();
        const rate = cardEl.querySelector(".rate").textContent.trim();
        const image = cardEl.querySelector("img").src;
        const product = { name, price, rate, image };

        if (!basket.some((p) => p.name === name)) {
          basket.push(product);
          localStorage.setItem("basket", JSON.stringify(basket));
          updateCountsUI();
        }

        e.currentTarget.textContent = "Savat ichida";
        e.currentTarget.style.backgroundColor = "rgb(1, 1, 94)";
        e.currentTarget.disabled = true;
      });
    });

    const likeBtns = document.querySelectorAll(".btnLike, .heart");
    likeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const cardEl = e.currentTarget.closest(".card");
        const name = cardEl.querySelector("h3").textContent.trim();
        const price = cardEl.querySelector(".price").textContent.trim();
        const rate = cardEl.querySelector(".rate").textContent.trim();
        const image = cardEl.querySelector("img").src;

        e.currentTarget.classList.toggle("active");
        const isActive = e.currentTarget.classList.contains("active");

        if (isActive) {
          if (!lovely.some((p) => p.name === name)) {
            lovely.push({ name, price, rate, image });
          }
        } else {
          lovely = lovely.filter((p) => p.name !== name);
        }
        localStorage.setItem("lovely", JSON.stringify(lovely));
        updateCountsUI();
      });
    });
  }
});
