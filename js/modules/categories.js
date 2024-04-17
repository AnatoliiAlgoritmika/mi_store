import { getData } from './api.js'

export const categoryFunction = () => {
    console.log('categories are working');
    const categoriesContainer = document.getElementById('categories-container')
    const drawCategoriesCards = (data) => {
        categoriesContainer.innerHTML = ''
        data.forEach((category) => {
            categoriesContainer.insertAdjacentHTML('beforeend', `
                <div class="col col-12 col-md-6 col-lg-4 mb-3">
                    <a href="/catalog.html?categoryId=${category.id}" class="card-link">
                        <div class="card">
                            <img src=${category.preview} class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${category.name}</h5>
                            </div>
                        </div>
                    </a>
                </div>
            `)
        })
    }
    getData('http://localhost:3001/categories')
        .then((data) => {
            drawCategoriesCards(data)
        })
        .catch((error) => {
            alert(error)
        })
}


// ! чтобы искать информацию в json-server
// ! адрес_сервера?название_ключа=значение
// ! пример: http://localhost:3001/products?category=${cat_id}