// import  {addToCart, totalPrice as price, tq}  from './shoppingCart.js'

// addToCart('bread', 5);
// console.log(price, tq);
console.log("Importing module");

// import * as ShoppingCart from './shoppingCart.js'
// ShoppingCart.addToCart("bread", 5)

import add, {cart} from './shoppingCart.js';

add('pizza', 2)
add('bread', 5)
add('apples', 8)

console.log(cart);



// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json()
// console.log(data);
// console.log("sth");

const getLastPost = async function() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json()

  return {title: data.at(-1).title, text: data.at(-1).body}
}

const lastPost = getLastPost()
console.log(lastPost);

// lastPost.then((last) => {
//     console.log(last);
// })

const lastPost2 = await getLastPost()
console.log(lastPost2);