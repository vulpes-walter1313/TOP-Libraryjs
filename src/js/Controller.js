import Book from "./Book.js";
import MakeBookComponent from "./bookComponent.js";

export default class Controller {
  constructor() {
    this.myLibrary = [];
    this.bookShelf = document.querySelector('.books-wrapper');
    this.handleBookAdd = this.handleBookAdd.bind(this);
  }
  
  addBookToLibrary(title, author, numOfPages, readStatus) {
    const book = new Book(title, author, numOfPages, readStatus);
    this.myLibrary.push(book);
    this.storeBooksToLocalStorage();
  }

  static formatLongNums(num) {
    let arr = String(num).split("");
    let fmtarr = [];
    while (arr.length != 0) {
      for (let i = 0; i < 3; i++) {
        if (arr) {
          fmtarr.push(arr.pop())
        }
      }
      if (arr.length != 0) {
        fmtarr.push(',');
      }
    }
    return fmtarr.reverse().join('');
  }
  
  populateShelf() {
    this.bookShelf.innerHTML = "";
    let bookIndex = 0;
    this.myLibrary.forEach(book => {
      let card = new MakeBookComponent(book.title,
        book.author,
        book.numOfPages,
        book.readStatus,
        bookIndex);
      
      this.bookShelf.appendChild(card.render());
      bookIndex++;
    });
    // event listeners for card removal
    let bookRemoveBtns = document.querySelectorAll(".inbook-remove-btn");
    if (bookRemoveBtns) {
      bookRemoveBtns.forEach( book => book.addEventListener('click', () => {
        this.handleBookRemove(book);
      }));
    }
    let updateReadBtns = document.querySelectorAll(".inbook-read-btn");
    if (updateReadBtns) {
      updateReadBtns.forEach( book => book.addEventListener('click', () => {
        this.handleReadUpdate(book);
      }));
    }
  }
  
  storeBooksToLocalStorage() {
      let objs = [];
      this.myLibrary.forEach( book => {
          const obj = {
              title: book.title,
              author: book.author,
              numOfPages: book.numOfPages,
              readStatus: book.readStatus
          }
          objs.push(obj);
      });
      // console.log(JSON.stringify(objs));
      localStorage.setItem("booklist", JSON.stringify(objs));
  }
  
  getFromLocalStorage() {
      let myBooksJson = localStorage.getItem("booklist");
      if (myBooksJson == null) {
          this.myLibrary = [];
      }
      else {
          let myBookObjs = JSON.parse(myBooksJson);
          myBookObjs.forEach( book=> {
           let {title, author, numOfPages, readStatus} = book;
           //  console.log(title, author, numOfPages, readStatus);
           this.addBookToLibrary(title, author, numOfPages, readStatus);
          });
      }
  }
  
  handleBookRemove(book) {
      // console.log(this);
      this.myLibrary.splice(parseInt(book.dataset.index), 1);
      this.populateShelf();
      this.storeBooksToLocalStorage();
  }
  
  handleBookAdd() {
      const titleBtn = document.querySelector('#book-title-input');
      const authorBtn = document.querySelector('#book-author-input');
      const pagesBtn = document.querySelector('#book-pages-input');
      const readBtn = document.querySelector('#book-read-input');
  
      const bookTitle = titleBtn.value;
      const bookAuthor = authorBtn.value;
      const bookPages = pagesBtn.valueAsNumber;
      const bookRead = readBtn.checked;
      // console.log({bookTitle, bookAuthor, bookPages, bookRead});
      this.addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
      // reset the values of all inputs for next submission
      titleBtn.value = "";
      authorBtn.value = "";
      pagesBtn.value = "";
      readBtn.checked = false;
      this.populateShelf();
  }
  
  handleReadUpdate(book) {
      // console.log('inside handleReadUpdate:');
      // console.log(this);
      this.myLibrary[parseInt(book.dataset.index)].toggleRead();
      this.populateShelf();
      this.storeBooksToLocalStorage();
  }

};
