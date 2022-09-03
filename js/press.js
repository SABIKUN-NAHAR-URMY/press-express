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
            <h5 class="p-lg-4 categoryItems" onclick= "categoryNews('${category.category_id}')">${category.category_name}</h5>
        `;
        categorySection.appendChild(createDiv);
        
    });
}

const categoryNews = (categoryId) =>
{
      //start loader
    toggleSpinner(true);

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
    
    const newsLength = news.length;
    const howMuchItems = document.getElementById('how-much-items');
    howMuchItems.innerHTML = `
        <h3 class="border p-4 m-4 bg-white">${newsLength} items found for this category.</h3>
    `;

    if(news.length === 0)
    {
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <h1 class="text-center">No News Found</h1>
        `;
        categoryNewsShow.appendChild(createDiv);
        //finish loader
        toggleSpinner(false);
    }
   else{
    news.forEach(element =>{
        const createDiv = document.createElement('div');
        createDiv.classList.add('card');
        createDiv.classList.add('mb-5');
        createDiv.innerHTML = `
            <div class="row g-0 m-3">
                <div class="col-md-4">
                    <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${element.title}</h5>
                    <p class="card-text text-truncate pt-3">${element.details}</p>
                    <div class="d-flex pt-3">

                        <div class="d-flex pe-5">
                            <img src="${element.author.img}" style="width:45px; height: 45px;" class="img-fluid rounded-pill" alt="...">
                            <div class="ps-3">
                                <p class="card-text">${element.author.name}<br/>
                                <small class="text-muted">${element.author.published_date}</small></p>
                            </div>
                        </div>

                        <div class="pe-5">
                            <h4><i class="fa-regular fa-eye"></i> ${element.total_view}</h4>
                        </div>

                        <div>
                            <h5>Rating: ${element.rating.number} <span class="text-primary fw-bold">${element.rating.badge}</span></h5>
                        </div>
                    
                    </div>
                </div>
                </div>
            </div>
        `;
        
        categoryNewsShow.appendChild(createDiv);

        //finish loader
        toggleSpinner(false);

    })
    
   }
    
    
}

const toggleSpinner = isloading =>{
    const loaderSection = document.getElementById('loader');
    if(isloading)
    {
        loaderSection.classList.remove('d-none');
    }
    else
    {
        loaderSection.classList.add('d-none');
    }
}

loadCategory();