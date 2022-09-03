const loadCategory = () =>
{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
    .catch(error => console.log(error))
}

const displayCategory = (categories) =>
{
    const categorySection = document.getElementById('category-section');
    categories.forEach(category => {
        const createDiv = document.createElement('div');
        createDiv.innerHTML= `
            <h5 class="p-lg-4" onclick= "categoryNews('${category.category_id}')">${category.category_name}</h5>
        `;
        categorySection.appendChild(createDiv);
    });
}

const categoryNews = (categoryId) =>
{
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryNews(data.data))
}

const displayCategoryNews = (news) =>
{
    console.log(news);
    const categoryNewsShow = document.getElementById('category-news');
    categoryNewsShow.innerHTML = ``;
    news.forEach(element =>{
        const createDiv = document.createElement('div');
        createDiv.classList.add('card');
        createDiv.classList.add('mb-5');
        createDiv.innerHTML = `
            <div class="row g-0 m-3">
                <div class="col-md-4">
                    <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${element.title}</h5>
                    <p class="card-text">${element.details}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
                </div>
            </div>
        `;
        categoryNewsShow.appendChild(createDiv);
    })
    
}

loadCategory();