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

const whereAmI = () => {
  getPosition()
    .then(position => {
      console.log(position.coords);
      const { latitude: lat, longitude: lng } = position.coords;
      console.log(lat);

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
    })

    .then(res => {
      if (!res.ok) throw Error('Problem with geolocation');

      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(res => {
      if (!res.ok) throw Error(`Country not found ${res.status} 😬`);
      return res.json().then(countriesData => {
        renderCountry(countriesData[0]);
      });
    })
    .catch(err => {
      throw Error(`Cannot get your location ${err}`);
    });
};

btn.addEventListener('click', whereAmI);
