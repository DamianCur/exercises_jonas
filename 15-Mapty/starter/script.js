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
  type = 'running';
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
  type = 'cycling';
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
  #workouts = [];

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
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

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

      workout = new Running([lat, lng], ...arrayOfRunningOptionValues);
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
      workout = new Cycling([lat, lng], ...arrayOfElevationOptionValues);
    }

    this.#workouts.push(workout);
    this._renderWorkoutMarker(workout);

    const inputArray = [
      inputCadence,
      inputDistance,
      inputDuration,
      inputElevation,
    ];

    inputArray.forEach(el => {
      el.value = '';
    });

    this._renderWorkout(workout);
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent('workout')
      .openPopup();
  }

  _renderWorkout(workout) {
    const html = `
         <li class="workout workout--running" data-id="1234567890">
          <h2 class="workout__title">Running on April 14</h2>
          <div class="workout__details">
            <span class="workout__icon">🏃‍♂️</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;
  }
}

const app = new App();
console.log(app);
