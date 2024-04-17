import { productsFunction } from "./modules/products.js";
import { authFunc } from './modules/auth.js'
import { cartFunc } from './modules/cart.js'

console.log('catalog work');

productsFunction()
authFunc()
cartFunc()