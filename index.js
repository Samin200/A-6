const loadCategories = () => 
    fetch('https://openapi.programming-hero.com/api/categories')
.then(res => res.json())
.then(data => {
        const categories = data.categories;
    const categoryNames = categories.map(cat => cat.category_name);
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = categoryNames.map(name => `
        <div class="text-[19.2px] hover:bg-[#15803D] hover:text-white w-full pl-[10px] rounded-[5px] mb-[8px]">${name}</div>
      `).join('');
})
loadCategories();

