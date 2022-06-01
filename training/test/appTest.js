// const assert = require('chai').assert
// // const app = require('../app').sayHello
// const sayHello = require("../app").sayHello;


// describe('App', function() {
//     it('app should return hello', function () {
//         let result = sayHello()
//         assert.equal(result, 'hello');
//     })
// })

const Reservation = require("../recruitmentProject.ts")
const myReservation= new Reservation()

console.log(myReservation);