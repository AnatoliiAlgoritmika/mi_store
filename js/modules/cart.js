import { openModal, closeModal } from './modal.js'
import { getData } from './api.js'

export const cartFunc = () => {
    console.log('cart works');


    const cartModal = document.getElementById('cart-modal')
    const openCartBtn = document.getElementById('open-cart-btn')
    const cartCloseBtn = cartModal.querySelectorAll('.close-btn')

    const cartContainer = document.getElementById('cart-container')
    const cartTotlalPrice = document.getElementById('cart-totlal-price')

    const updateCart = () => {
        const user_id = JSON.parse(localStorage.getItem("auth")).id

        getData(`http://localhost:3001/cart?user_id=${user_id}`)
            .then((data) => {
                console.log(data);
                render(data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const render = (cartData) => {

        let total = 0
        cartData.forEach((good) => {
            total += (good.price * good.count)
        })

        cartTotlalPrice.textContent = `${total} ₽`


        cartContainer.textContent = ''
        cartData.forEach((good) => {
            const { user_id, good_id, count, name, price, id } = good

            const goodRow = document.createElement('div')
            goodRow.className = 'row border-bottom pb-3 pt-3 good-item'
            goodRow.goodinfo = good

            goodRow.innerHTML = `
                <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">
                    ${name}
                </div>
                <div
                    class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
                    <h4 class="me-3 d-flex align-itemns-center">${price * count} ₽</h4>
                    <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                        id="control-dec">
                        -
                    </button>
                    <h6 class="cart-item-count me-3 ms-3">${count}</h6>
                    <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls"
                        id="control-inc">
                        +
                    </button>
                </div>
            `

            cartContainer.insertAdjacentElement('beforeend', goodRow)
        })
    }

    openCartBtn.addEventListener('click', () => {
        updateCart()
        openModal(cartModal)
    })

    cartModal.addEventListener('click', (e) => {
        const target = e.target
        if (target === cartModal || target === cartCloseBtn[0] || target === cartCloseBtn[1]) {
            closeModal(cartModal)
        }

    })
}