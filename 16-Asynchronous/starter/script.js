'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.keys(data.currencies)[0]
      }</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const whereAmI = (lat, lng) => {
//   const reverseGeoData = fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//   )
//     .then(res => {
//       if (!res.ok) throw Error('Problem with geolocation');

//       return res.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
//     })
//     .then(res => {
//       if (!res.ok) throw Error(`Country not found ${res.status} 😬`);
//       return res.json().then(countriesData => {
//         renderCountry(countriesData[0]);
//       });
//     })
//     .catch(err => {
//       throw Error(`Cannot get your location ${err}`);
//     });
// };

// whereAmI(49.822377, 19.058384);
// whereAmI(37.42159, -122.0837);
// whereAmI(6.796614, -5.265024);

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(position => {
//   console.log(position);
// });

// const whereAmI = async function () {
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();

//     const res = await fetch(
//       `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//     );
//     if (!resGeo.ok) throw new Error('Problem getting country');
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`${err} 💥`);
//     renderError(`💥 ${err.message}`);

//     throw err;
//   }
// };

// console.log('1: Will get location');

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message} 💥`);
//   }
//   console.log('3: Finished getting location');
// })();
// console.log([data1.capital, data2.capital, data3.capital]);

// const get3Counteries = async (c1, c2, c3) => {
//   try {
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     console.log(
//       data.map(country => {
//         return country[0].capital;
//       })
//     );
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// get3Counteries('portugal', 'canada', 'poland');

(async () => {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/poland`),
    getJSON(`https://restcountries.com/v3.1/name/uk`),
  ]);
  console.log(res[0]);
})();

const timeOut = sec => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request took too long.'));
    }, sec * 1000);
  });
};

Promise.race([getJSON(`https://restcountries.com/v3.1/name/uk`), timeOut(1)])
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err.message);
  });

Promise.allSettled([
  Promise.resolve('Succes'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Succes'),
]).then(data => {
  console.log(data);
});
