const cart = {};
const loadCategories = () =>
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      const categoriesContainer = document.getElementById(
        "categories-container"
      );
      categoriesContainer.innerHTML = categories
        .map(
          (cat) => `
        <div onclick=changeCard(${cat.id}) class="cat-btn text-[19.2px] hover:bg-[#15803D] hover:text-white w-full pl-[10px] rounded-[5px] mb-[8px]">${cat.category_name}</div>
      `
        )
        .join("");
    });
loadCategories();
const changeCard = (id) =>
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const cards = data.plants;
      const cardsContainer = document.getElementById("card-container");
      cardsContainer.innerHTML = cards
        .map(
          (card) => `
        <div class="flex flex-col bg-white p-[16px] justify-between lg:w-[343px] w-[200px] lg:h-[430px] rounded-2xl">
  <img class="h-[187px] rounded-2xl" src="${card.image}" alt="${card.name}" />
  <div class="flex flex-col gap-[8px]">
    <div class="text-[14px] font-semibold " onclick="openCardModal('${card.name}', \`${card.description}\`, '${card.image}' , \`${card.category}\` , \`${card.price}\` )">${card.name}</div>
    <div class="text-[12px]">${card.description}</div>
  </div>
  <div class="flex justify-between items-center">
      <div class="text-[#15803D] bg-[#DCFCE7] px-[12px] py-[4px] rounded-3xl w-fit">${card.category}</div>
      <div>৳${card.price}</div>
    </div>
  <div>
    <button class="add-btn w-full py-[12px] bg-[#15803D] rounded-3xl text-[15.2px] text-white hover:bg-[#1db154]">
      Add to Cart
    </button>
  </div>
</div>
`
        )
        .join("");

      const categoryName = cards[0]?.category;

      const categoryButtons = document.querySelectorAll(".cat-btn");
      categoryButtons.forEach((btn) =>
        btn.classList.remove("bg-[#15803D]", "text-white")
      );
      categoryButtons.forEach((btn) => {
        if (btn.textContent.trim() === categoryName) {
          btn.classList.add("bg-[#15803D]", "text-white");
        }
      });

      const addBtns = document.getElementsByClassName("add-btn");
      for (let i = 0; i < addBtns.length; i++) {
        let x = 0;
        const element = addBtns[i];
        element.addEventListener("click", function () {
          const productName = cards[i].name;
          const productPrice = cards[i].price;
          const cartContainer = document.getElementById("cart-data");

          if (cart[productName]) {
            cart[productName]++;
            const qtySpans = cartContainer.querySelectorAll(".qty");
            for (let span of qtySpans) {
              if (
                span.closest("[data-name]")?.getAttribute("data-name") ===
                productName
              ) {
                span.textContent = cart[productName];
              }
            }
            updateTotal()
          } else {
            cart[productName] = 1;
            const cardData = document.createElement("div");
            cardData.setAttribute("data-name", productName);
            cardData.innerHTML = `
      <div class="flex justify-between items-center w-[218px] bg-[#F0FDF4] px-[12px] py-[8px] rounded-2xl">
        <div>
          <div class="font-bold text-[14px]">${productName}</div>
          <div class="text-[#1F293750] price">
            ${productPrice} <i class="fa-solid fa-xmark"></i> <span class="qty">1</span>
          </div>
        </div>
        <div><i class="remove-btn fa-solid fa-xmark text-[#1F293750]"></i></div>
      </div>`;
            cartContainer.appendChild(cardData);
            const removeBtn = cardData.querySelector(".remove-btn");
            removeBtn.addEventListener("click", function () {
              delete cart[productName];
              cardData.remove();
              return updateTotal()
            });
            updateTotal();
          }
        });
      }
    });
const allTree = () =>
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      document
        .getElementById("all-tree-btn")
        .classList.add("bg-[#15803D]", "text-white");
      const cards = data.plants;
      const cardsContainer = document.getElementById("card-container");
      cardsContainer.innerHTML = cards
        .map(
          (card) => `
        <div class="flex flex-col bg-white p-[16px] justify-between w-[343px] h-[430px] rounded-2xl">
  <img class="h-[187px] rounded-2xl" src="${card.image}" alt="${card.name}" />
  <div class="flex flex-col gap-[8px]">
    <div class="text-[14px] font-semibold " onclick="openCardModal('${card.name}', \`${card.description}\`, '${card.image}' , \`${card.category}\` , \`${card.price}\` )">${card.name}</div>
    <div class="text-[12px]">${card.description}</div>
  </div>
  <div class="flex justify-between items-center">
      <div class="text-[#15803D] bg-[#DCFCE7] px-[12px] py-[4px] rounded-3xl w-fit">${card.category}</div>
      <div>৳${card.price}</div>
    </div>
  <div>
    <button class="add-btn w-full py-[12px] bg-[#15803D] rounded-3xl text-[15.2px] text-white hover:bg-[#1db154]">
      Add to Cart
    </button>
  </div>
</div>
`
        )
        .join("");
      document
        .getElementById("all-tree-btn")
        .addEventListener("click", function () {
          document.querySelectorAll(".cat-btn").forEach((btn) => {
            btn.classList.remove("bg-[#15803D]");
            btn.classList.remove("text-white");
          });
        });
      const addBtns = document.getElementsByClassName("add-btn");
      for (let i = 0; i < addBtns.length; i++) {
        let x = 0;
        const element = addBtns[i];
        element.addEventListener("click", function () {
          const productName = cards[i].name;
          const productPrice = cards[i].price;
          const cartContainer = document.getElementById("cart-data");

          if (cart[productName]) {
            cart[productName]++;
            const qtySpans = cartContainer.querySelectorAll(".qty");
            for (let span of qtySpans) {
              if (
                span.closest("[data-name]")?.getAttribute("data-name") ===
                productName
              ) {
                span.textContent = cart[productName];
              }
            }
            updateTotal()
          } else {
            cart[productName] = 1;
            const cardData = document.createElement("div");
            cardData.setAttribute("data-name", productName);
            cardData.innerHTML = `
      <div class="flex justify-between items-center w-[218px] bg-[#F0FDF4] px-[12px] py-[8px] rounded-2xl">
        <div>
          <div class="font-bold text-[14px]">${productName}</div>
          <div class="text-[#1F293750] price">
            ${productPrice} <i class="fa-solid fa-xmark"></i> <span class="qty">1</span>
          </div>
        </div>
        <div><i class="remove-btn fa-solid fa-xmark text-[#1F293750]"></i></div>
      </div>`;
            cartContainer.appendChild(cardData);
            const removeBtn = cardData.querySelector(".remove-btn");
            removeBtn.addEventListener("click", function () {
              delete cart[productName];
              cardData.remove();
              return updateTotal()
            });
            updateTotal();
          }
        });
      }
    });

allTree();

function openCardModal(name, description, image, category, price) {
  document.getElementById("modal-title").textContent = name;

  document.getElementById("modal-image").innerHTML = `
    <img class="h-[230px] rounded-2xl w-full" src="${image}" alt="${name}" />
  `;

  document.getElementById("modal-category").innerHTML = `
    <div class="mb-2">
      <span class="text-[20px] font-bold text-green-700">Category:</span> ${category}
    </div>
  `;

  document.getElementById("modal-price").innerHTML = `
    <div class="mb-2">
      <span class="text-[20px] font-bold text-green-700">Price:</span> ৳${price}
    </div>
  `;

  document.getElementById("modal-description").innerHTML = `
    <div class="mb-2">
      <span class="text-[20px] font-bold text-green-700">Description:</span> ${description}
    </div>
  `;

  document.getElementById("card_modal").showModal();
}
function updateTotal() {
  let total = 0;

  const cartItems = document.querySelectorAll("[data-name]");

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];

    const price = parseFloat(item.querySelector(".price").textContent);
    const quantity = parseInt(item.querySelector(".qty").textContent);

    if (!isNaN(price) && !isNaN(quantity)) {
      total += price * quantity;
    }
  }

  document.getElementById("total-money").textContent = total;
  return total;
}
