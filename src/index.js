import "./css/styles.scss";
import Controller from "./js/Controller.js";
console.log('im in...')

const controller = new Controller();

controller.getFromLocalStorage();
controller.populateShelf();
// Add book popup form
const addBookForm = document.querySelector("#add-book-form");
const newBookBtn = document.querySelector("#new-book");
newBookBtn.addEventListener('click', ()=> {
    addBookForm.style.top = `${(window.visualViewport.height / 2) + window.scrollY}px`;
    addBookForm.classList.remove("hide");
});

// close popup form to add book
const cancelBookBtn = document.querySelector('#cancel-book-btn');
cancelBookBtn.addEventListener('click', () => addBookForm.classList.add('hide'));

// Add book to book list from form
const addBookBtn = document.querySelector('#add-book-btn');
addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  controller.handleBookAdd();
  addBookForm.classList.add('hide');
});