'use strict';

import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = uuidv4();

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / this.duration;
    return this.speed;
  }
}

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (!navigator.geolocation) throw Error('Geolocation is not supported.');

    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert('We cant get your location 😩');
      }
    );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    const isInputAnNumber = inputs => {
      return inputs.every(input => Number.isFinite(input));
    };

    const isInputAnPositiveNumber = inputs => {
      return inputs.every(input => input > 0);
    };

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    if (type === 'running') {
      const cadence = +inputCadence.value;
      const arrayOfRunningOptionValues = [distance, duration, cadence];

      if (
        !isInputAnNumber(arrayOfRunningOptionValues) ||
        !isInputAnPositiveNumber(arrayOfRunningOptionValues)
      ) {
        alert('The value must be a positive number!');
        throw Error('The value must be a positive number!');
      }
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      const arrayOfElevationOptionValues = [distance, duration, elevation];
            
        if (
          !isInputAnNumber(arrayOfElevationOptionValues) ||
          !isInputAnPositiveNumber([distance, duration])
        ) {
          alert('The value must be a positive number!');
          throw Error('The value must be a positive number!');
        }
  
    }

    const inputArray = [
      inputCadence,
      inputDistance,
      inputDuration,
      inputElevation,
    ];

    inputArray.forEach(el => {
      el.value = '';
    });

    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('asd')
      .openPopup();
  }
}

const app = new App();
