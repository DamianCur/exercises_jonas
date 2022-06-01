// const lotteryPromise = new Promise((resolve, reject) => {
// 	console.log('Lottery draw is happening ⏳');

// 	setTimeout(() => {
// 		if (Math.random() >= 0.5) {
// 			resolve('You win 🎁');
// 		} else {
// 			reject(new Error('You lost your money 😫'));
// 		}
// 	}, 2000);
// });

// lotteryPromise.then((res) => console.log(res)).catch((err) => console.log(err));

// wait(2)
// 	.then(() => {
// 		console.log('I waited for 2 seconds');
// 		return wait(1);
// 	})
// 	.then(() => {
// 		console.log('I waited for 1 second');
// 	});

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast. */

// const wait = (seconds) => {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, seconds * 1000);
// 	}, seconds);
// };

// const imgContainer = document.querySelector('.images');

// const imgChange = (imgPath) => {
// 	return new Promise((resolve, reject) => {
// 		const img = document.createElement('img');
// 		img.src = imgPath;

// 		img.addEventListener('load', () => {
// 			imgContainer.append(img);
// 			resolve(img);
// 		});

// 		img.addEventListener('error', () => {
// 			reject(new Error('Cannot load image.😫'));
// 		});
// 	});
// };
// let currentImage;

// imgChange('./img/img-1.jpg')
// 	.then((img) => {
// 		console.log('Image one loaded ');
// 		currentImage = img;
// 		return wait(2);
// 	})
// 	.then(() => {
// 		currentImage.style.display = 'none';
// 		return imgChange('./img/img-2.jpg');
// 	})
// 	.then((img) => {
// 		console.log('Image two loaded ');
// 		console.log('test img');
// 		currentImage = img;
// 		return wait(2);
// 	})
// 	.then(() => {
// 		currentImage.style.display = 'none';
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

// const loadNPause = async () => {
// 	try {
// 		let img = await imgChange('./img/img-1.jpg');
// 		console.log('Image 1 loaded');
// 		await wait(2);
// 		img.style.display = 'none';

// 		await wait(1);

// 		img = await imgChange('./img/img-2.jpg');
// 		console.log('Image 2 loaded');
// 		await wait(2);
// 		img.style.display = 'none';
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// };

// loadNPause();

// const imgPathArr = ['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg'];

// const loadAll = async (imgArr) => {
// 	try {
// 		const imgs = await imgArr.map((imgPath) => {
// 			return imgChange(imgPath);
// 		});

// 		console.log(imgs);

// 		const imgsEl = await Promise.all(imgs);
// 		console.log(imgsEl);

// 		imgsEl.forEach((el) => {
// 			el.classList.add('parallel');
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// };

// loadAll(imgPathArr);

// const loadAll = async function (imgArr) {
// 	try {
// 		const imgs = imgArr.map((img) => imgChange(img));
// 		const imgsEl = await Promise.all(imgs);
// 		console.log(imgsEl);
// 		imgsEl.forEach((img) => img.classList.add('parallel'));
// 	} catch (err) {
// 		console.error(err);
// 	}
// };
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// ZADANIE REKRUTACYJNE

//1. Damian Cur

/*2. 

 - Wpisując adres internetowy pierwszą rzeczą która dzieje się w tle to połączenie z serwerem DNS, który konwertuje wpisany adres na adres IP

 - Request jest wysyłany do serwera gdzie znajdują się pliki potrzebne do wyświetlenia strony takie jak HTML(struktura), CSS(style), JS(logika/dynamika strony) 
 
 -Przeglądarka internetowa(interpreter) może wyrenderować stronę internetową 
 
 */

/*3.
 
 Do wyświetlenia ostatnich 5 błędów użył bym local storage. Daje nam to możliwość zapisaywania danych po stronie użtkownika. Dane zostają zapisane pomimo odświeżenia lub zamknięcia strony.  
 */

/* 4.

 - Klasa Guest

 Niepoprawny zapis constructora, poprawny zapis powinien wyglądać następująco:

 
  constructor(firstName, lastName) {
		this.firstName = firstName, 
		this.lastName = lastName;
	}


	Niepoprawny zapis w metodzie "sayHello" zmiennych w template stringu oraz brak spacji pomiędzy zmiennymi, poprawny zapis:

  sayHello() {
		console.log(`Hi, me name is ${this.firstName} ${this.lastName}`);
	}



	Brak walidacji na typ danych string osobiście uważam za błąd więc również chciałbym tutaj zwrucić na to uwagę.



	- Klasa Employee:

	Klasa employee również zawiera identyczne błędy które opisałem powyżej.

	    * brak zapisu constructora:

	        constructor(firstName, lastName, permissionLevel) {
		this.firstName = firstName, 
		this.lastName = lastName,
		this.permissionLevel = permissionLevel
	}

       * W metodzie sayHello "" zamiast ``
	 
	




5. & 6. 

type accesLevel = "standard" | "extra";


class Employee {
    name: string
    surname: string
    permissionLevel: accesLevel


    constructor(name: string, surname: string, permissionLevel: accesLevel) {
        this.name = name,
        this.surname = surname
        this.permissionLevel = permissionLevel
    }

    welcomeGuest(guestName: string, guestSurname: string) {
        if (this.permissionLevel !== 'extra') throw Error("Sorry you don't have permission for this.")

        console.log(`Welcome ${guestName} ${guestSurname}.
        What can I do for you?`);

    }


}




class Clerk extends Employee {

    constructor(name: string, surname: string, permissionLevel: accesLevel) {
        super(name, surname, permissionLevel)

    }
}



class Director extends Employee {

    constructor(name: string, surname: string, permissionLevel: accesLevel) {
        super(name, surname, permissionLevel)


    }
}


const emp = new Employee("Damian", "Cur", "standard")
emp.welcomeGuest("Jan", "Kowalski")

*/

//unit testing
// add mocha

// const someOrder = {
// 	items: [
// 		{ name: 'Dragon food', price: 8, quantity: 8 },
// 		{ name: 'Dragon cage (small)', price: 800, quantity: 2 },
// 		{ name: 'Shipping', price: 40, shipping: true },
// 	],
// };

// const orderTotal = (order) => {
// 	const totalItems = order.items
// 	.filter((x) => !x.shipping)
// 	.reduce((prev, cur) => prev + (cur.price * cur.quantity), 0)

// 	const shippingItem = order.items.find(x => x.shipping)
	
// 	const shipping = totalItems > 1000 ? 0 : shippingItem.price
	

// 	return totalItems + shipping
	
// };

// const result = orderTotal(someOrder);
// console.log(result);



// class Reservation {
// static DATE_FORMAT: string = "YYYY-MM-DD";
// arrival: string;
// numberOfNights: number;
// changeStayPeriod(today: string, newArrival: string, newLength?: number) {
// //todo:
// }
// }
// describe('Change reservation stay period', function () {
// it('should change arrival when reservation is from the future, otherwise an error should be thro
// wn', function () {
// //todo:
// });
// it('should change stay length when new value is positive and greater than 1', function () {
// //todo:

module.exports = {
	sayHello: function() {
		return "hello"
	}
}
