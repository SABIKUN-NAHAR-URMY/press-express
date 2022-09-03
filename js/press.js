const loadCategory = () =>
{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
}

const displayCategory = (categories) =>
{
    const categorySection = document.getElementById('category-section');
    categories.forEach(category => {
        const createDiv = document.createElement('div');
        createDiv.innerHTML= `
            <h5 class="p-lg-4">${category.category_name}</h5>
        `;
        categorySection.appendChild(createDiv);
    });
}

loadCategory();