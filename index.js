const loadCategories = () => 
    fetch('https://openapi.programming-hero.com/api/categories')
.then(res => res.json())
.then(data => {
        const categories = data.categories;
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = categories.map(cat => `
        <div onclick=changeCard(${cat.id}) class="text-[19.2px] hover:bg-[#15803D] hover:text-white w-full pl-[10px] rounded-[5px] mb-[8px]">${cat.category_name}</div>
      `).join('');
      })
loadCategories();
const changeCard = (id) => 
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
        const cards = data.plants;
    const cardsContainer = document.getElementById('card-container');
    cardsContainer.innerHTML = cards.map(card => `
        <div class="flex flex-col bg-white p-[16px] justify-between w-[343px] h-[410px] rounded-2xl">
  <img class="h-[187px] rounded-2xl" src="${card.image}" alt="${card.name}" />
  <div class="flex flex-col gap-[8px]">
    <div class="text-[14px] font-semibold ">${card.name}</div>
    <div class="text-[12px]">${card.description}</div>
  </div>
  <div class="flex justify-between items-center">
      <div class="text-[#15803D] bg-[#DCFCE7] px-[12px] py-[4px] rounded-3xl w-fit">${card.category}</div>
      <div>৳${card.price}</div>
    </div>
  <div>
    <button class="w-full py-[12px] bg-[#15803D] rounded-3xl text-[15.2px] text-white hover:bg-[#1db154]">
      Add to Cart
    </button>
  </div>
</div>
` 
).join('')
})
const allTree = () => 
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        const cards = data.plants;
    const cardsContainer = document.getElementById('card-container');
    cardsContainer.innerHTML = cards.map(card => `
        <div class="flex flex-col bg-white p-[16px] justify-between w-[343px] h-[410px] rounded-2xl">
  <img class="h-[187px] rounded-2xl" src="${card.image}" alt="${card.name}" />
  <div class="flex flex-col gap-[8px]">
    <div class="text-[14px] font-semibold ">${card.name}</div>
    <div class="text-[12px]">${card.description}</div>
  </div>
  <div class="flex justify-between items-center">
      <div class="text-[#15803D] bg-[#DCFCE7] px-[12px] py-[4px] rounded-3xl w-fit">${card.category}</div>
      <div>৳${card.price}</div>
    </div>
  <div>
    <button class="w-full py-[12px] bg-[#15803D] rounded-3xl text-[15.2px] text-white hover:bg-[#1db154]">
      Add to Cart
    </button>
  </div>
</div>
` 
).join('')
    })
    allTree();






