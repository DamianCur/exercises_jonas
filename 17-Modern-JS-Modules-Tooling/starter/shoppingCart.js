console.log('Exporting module');

// console.log('start fething users');
// await fetch('https://jsonplaceholder.typicode.com/users');

// console.log('fnish fetching');

const shippingCost = 10;
export const cart = [];

export const addToCart = (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added do cart`);
};

const totalPrice = 237
const totalQuantity = 23



export {totalPrice, totalQuantity as tq}

export default (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added do cart`);
};

 
