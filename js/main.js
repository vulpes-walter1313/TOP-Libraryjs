let myLibrary = [];
const bookShelf = document.querySelector('.books-wrapper');

function Book(title, author, numOfPages, readStatus=false) {
    // Constructor
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
}

function addBookToLibrary(title, author, numOfPages, readStatus) {
    let book = new Book(title, author, numOfPages, readStatus);
    book.prototype = Object.create(Book.prototype);
    myLibrary.push(book);
}
function formatLongNums(num) {
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
function populateShelf() {
    bookShelf.innerHTML = "";
    myLibrary.forEach(book => {
        let card = document.createElement('div');
        card.classList.add('book-card');

        let bookTitleElem = document.createElement('p');
        bookTitleElem.classList.add('book-title');
        bookTitleElem.textContent = book.title;
        
        let bookAuthorElem = document.createElement('p');
        bookAuthorElem.classList.add('book-author');
        bookAuthorElem.textContent = `by ${book.author}`;

        let bookPagesElem = document.createElement('p');
        bookPagesElem.classList.add('book-pages');
        bookPagesElem.textContent = `Total Pages: ${formatLongNums(book.numOfPages)}`;
        
        let bookReadElem = document.createElement('p');
        bookReadElem.classList.add('book-read');
        bookReadElem.textContent = `Has been read? ${book.readStatus}`;

        card.appendChild(bookTitleElem);
        card.appendChild(bookAuthorElem);
        card.appendChild(bookPagesElem);
        card.appendChild(bookReadElem);

        bookShelf.appendChild(card);
    });
}
addBookToLibrary("Harry Potter 1", "J.K.Rowling", 825, true);
addBookToLibrary("Harry Potter 2", "J.K.Rowling", 1125, true);
addBookToLibrary("Once Upon A Time", "Author", 9800, true);
addBookToLibrary("Frankenstein", "Mary Shelly", 742, false);
addBookToLibrary("Lord of the Flies", "William Golding", 775, false);
addBookToLibrary("Frankenstein", "Mary Shelly", 742, false);
addBookToLibrary("Lord of the Flies", "William Golding", 775, false);

populateShelf();
const addBookForm = document.querySelector("#add-book-form");
const newBookBtn = document.querySelector("#new-book");
newBookBtn.addEventListener('click', ()=> {
    addBookForm.classList.toggle("hide");
});