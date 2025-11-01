document.addEventListener('DOMContentLoaded', () => {
  const basketContainer = document.querySelector('.basket');

  if (!basketContainer) {
    console.error("❌ 'basket' klassli element topilmadi!");
    return;
  }

  const basket = JSON.parse(localStorage.getItem('basket')) || [];

  if (basket.length === 0) {
    basketContainer.innerHTML = `
      <p class="text-center text-gray-600 mt-10 text-lg">
        Savat hozircha bo‘sh
      </p>
    `;
    return;
  }

  basketContainer.innerHTML = '';

  basket.forEach((item, index) => {
    basketContainer.innerHTML += `
      <div class="card bg-white shadow rounded-lg p-4 w-[30%] text-center relative">
        <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-contain mb-2">
        <h3 class="font-semibold text-sm">${item.name}</h3>
        <p class="text-blue-600 font-bold">${item.price}</p>
        <p class="text-gray-500">${item.rate}</p>
        <button data-index="${index}" class="deleteBtn bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mt-2">
          O‘chirish
        </button>
      </div>
    `;
  });

  const deleteBtns = document.querySelectorAll('.deleteBtn');

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      basket.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(basket));
      location.reload();
    });
  });
});
