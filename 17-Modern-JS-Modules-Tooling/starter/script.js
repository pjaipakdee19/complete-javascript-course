//=========================== 284 Export and importing in ES6 =====================
//Importing module
console.log('Importing module');

// 1st import method
import { addToCart, 
    totalPrice as price, 
    tq } from './shoppingCart.js';
addToCart('Bread', 5);
console.log(price, tq);

// 2nd import method
// import * as ShoppingCart from './shoppingCart.js';

// ShoppingCart.addToCart('bread',5);
// console.log(ShoppingCart.totalPrice);
// console.log(ShoppingCart.tq);

// import default function
// import add, { cart } from './shoppingCart.js';
// add('pizza', 2);
// add('bread', 5);
// add('apple', 4);

// console.log(cart);
//===================================================================

//========================== 285 Top level await ========================
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

// const getLastPost = async function() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const data = await res.json();
//     // console.log(data);

//     return {title: data.at(-1).title, text: data.at(-1).body };
// }

// const lastPost = getLastPost();

// //we will get promise
// console.log(lastPost);

// //not a clean code
// // lastPost.then(last => console.log(last));

// //cleaner code and practical
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

//=====================================================================

//====================== 286. The Module Pattern =====================

// export from 1 time function
const ShoppingCart2 = (function (){
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function(product, quantity){
        cart.push({product, quantity});
        console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost})`);
    }

    const orderStock = function(product, quantity){
        cart.push({product, quantity});
        console.log(`${quantity} ${product} ordered from supplier`);
    }

    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity,
    };

})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log( ShoppingCart2 );
// private variable because of it's not return from function
console.log(ShoppingCart2.shippingCost);

// ================ 287. CommonJS Modules ========================

// // Work only in nodejs not pure browser
// //Export
// //export.<name want to export>
// export.addTocart = function(product, quantity){
//     cart.push({product, quantity});
//     console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost})`);
// }

// //Import
// const { addToCart } = require(./shoppingCart.js);

// ======== 289. Introduction to NPM =====================

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js'
//After ran with parcel you should not define module js file like above import
import cloneDeep from 'lodash-es';

const state = {
    cart: [
        {product: 'bread', quantity: 5},
        {product: 'pizza', quantity: 1}
    ],
    user: { loggedIn : true },
};

const stateClone = Object.assign({}, state); //Shallow copy (inner obj still refer to new target of obj)
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
// Deepclone will help copy the object out without reference to inner object 
console.log(stateDeepClone);

// 290. Bundling With Parcel and NPM Scripts
if(module.hot) {
    module.hot.accept();
}

// 291. Configuring Babel and Polyfilling
class Person {
    #greeting = 'Hey';
    constructor(name) {
        this.name = name;
        console.log(`${this.#greeting} , ${this.name}`);
    }
}

const pj = new Person('Peerapong');

console.log('PJ' ?? null);

console.log(state.cart.filter(el => el.quantity >= 2));
Promise.resolve('TEST').then(x=>console.log(x));

import 'core-js/stable';
// import 'core-js/./features/array/find';

//For Polifilling async functions
import 'regenerator-runtime/runtime';