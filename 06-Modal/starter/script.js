'use strict';


const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const btnCloseModal = document.querySelector(".close-modal")
const btnShowModal = (document.querySelectorAll(".show-modal"))

console.log([...btnShowModal]);

for (let i = 0; i < btnShowModal.length; i++) {
    btnShowModal[i].addEventListener('click', () => {
        modal.classList.remove('hidden')
        overlay.classList.remove('hidden')
    })
}

btnCloseModal.addEventListener('click', () => {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
})

overlay.addEventListener('click', () => {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
})