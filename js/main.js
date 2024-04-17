import { authFunc } from './modules/auth.js'
import { categoryFunction } from './modules/categories.js'
import { cartFunc } from './modules/cart.js'

console.log('Работает');

authFunc()
categoryFunction()
cartFunc()

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay: true,
});