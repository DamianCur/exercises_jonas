console.log('Exporting module');

const shippingCost = 10;
const cart = [];

export const addToCart = (product, quantity) => {
  console.log({ product, quantity });
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added do cart`);
};

const totalPrice = 237
const totalQuantity = 23

export {totalPrice, totalQuantity as tq}
