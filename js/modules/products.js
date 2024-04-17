import { getData, sendData } from './api.js'

export const productsFunction = () => {
    const productsContainer = document.getElementById('products-container')

    const render = (goods) => {
        productsContainer.innerHTML = ''
        goods.forEach((good) => {
            const cardGood = document.createElement('div')
            cardGood.className = 'col col-12 col-sm-6 col-lg-4 col-xl-3 mb-3 card-good'
            cardGood.goodInfo = {
                id: good.id,
                category: good.category,
                categoryName: good.categoryName,
                preview: good.preview,
                name: good.name,
                price: good.price
            }

            cardGood.insertAdjacentHTML('beforeend', `
                <a href="#" class="card-link">
                    <div class="card">
                        <img src="${good.preview}" class="card-img-top" alt="phone-1">
                        <div class="card-body">
                            <span class="mb-2 d-block text-secondary">${good.categoryName}</span>
                            <h6 class="card-title mb-3">${good.name}</h6>

                            <div class="row">
                                <div class="col d-flex align-itemns-center justify-content-between">
                                    <h4>${good.price} ₽</h4>
                                    <button type="button" class="btn btn-outline-dark add-to-cart">
                                        <img src="/images/icon/shopping-cart-big.svg" alt="login">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `)
            productsContainer.insertAdjacentElement('beforeend', cardGood)

        })

    }

    // ! прочитать адресную строку
    const cat_id = new URLSearchParams(window.location.search).get("categoryId")
    // ! если в ней есть упоминание categoryId то 
    let url = ''
    if (cat_id) {
        url = `http://localhost:3001/products?category=${cat_id}`
        // ! иначе простой
    } else {
        url = 'http://localhost:3001/products'
    }


    productsContainer.addEventListener('click', (e) => {
        const target = e.target
        const btn = target.closest('.add-to-cart')

        console.log(target);
        console.log(target.closest('.add-to-cart'));

        if (btn) {
            const cardGood = btn.closest('.card-good')
            const cardInfo = cardGood.goodInfo
            const user = JSON.parse(localStorage.getItem('auth'))

            const cartItem = {
                "user_id": user.id,
                "good_id": cardInfo.id,
                "count": 1,
                "name": cardInfo.name,
                "price": cardInfo.price
            }

            console.log(cartItem);
            sendData('http://localhost:3001/cart', cartItem)
        }
    })

    getData(url)
        .then((data) => {
            render(data)
        })
        .catch((error) => {
            alert(error)
        })

}