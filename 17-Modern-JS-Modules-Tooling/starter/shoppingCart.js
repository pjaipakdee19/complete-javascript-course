//Exporting module
console.log('Exporting module');

// Blocking code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log('Finish fetching users');

const shippingConst = 10;
export const cart = [];


//or using export const addToCart......
const addToCart = function(product, quantity){
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
}

const totalPrice = 237;
const totalQuantity = 23;


//name export
export { addToCart, totalPrice, totalQuantity as tq }

//default export for export only 1 thing
export default function(product, quantity){
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
}