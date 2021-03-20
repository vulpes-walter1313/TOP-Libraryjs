let myLibrary = [];
const bookShelf = document.querySelector('.books-wrapper');
const addBookBtn = document.querySelector('#add-book-btn');
const cancelBookBtn = document.querySelector('#cancel-book-btn');

function Book(title="unavailable", author="unknown", numOfPages=0, readStatus=false) {
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
    let bookIndex = 0;
    myLibrary.forEach(book => {
        let card = document.createElement('div');
        card.classList.add('book-card');
        // this index data key will help remove books from myLibrary later
        card.dataset.index = bookIndex;

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
        // create a div that will house two buttons
        let btnDiv = document.createElement('div');
        let readBtn = document.createElement('button');
        readBtn.classList.add("inbook-btn");
        readBtn.classList.add("inbook-read-btn");
        readBtn.textContent = "Read?";
        readBtn.setAttribute("type", "button");
        
        let removeBtn = document.createElement('button');
        removeBtn.classList.add("inbook-btn");
        removeBtn.classList.add("inbook-remove-btn");
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("type", "button");

        btnDiv.appendChild(readBtn);
        btnDiv.appendChild(removeBtn);

        card.appendChild(bookTitleElem);
        card.appendChild(bookAuthorElem);
        card.appendChild(bookPagesElem);
        card.appendChild(bookReadElem);
        card.appendChild(btnDiv);

        bookShelf.appendChild(card);
        bookIndex++;
    });
}

function handleBookAdd() {
    const titleBtn = document.querySelector('#book-title-input');
    const authorBtn = document.querySelector('#book-author-input');
    const pagesBtn = document.querySelector('#book-pages-input');
    const readBtn = document.querySelector('#book-read-input');

    const bookTitle = titleBtn.value;
    const bookAuthor = authorBtn.value;
    const bookPages = pagesBtn.valueAsNumber;
    const bookRead = readBtn.checked;
    // console.log({bookTitle, bookAuthor, bookPages, bookRead});
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
    // reset the values of all inputs for next submission
    titleBtn.value = "";
    authorBtn.value = "";
    pagesBtn.value = NaN;
    readBtn.checked = false;
    populateShelf();
}
addBookToLibrary("Harry Potter 1", "J.K.Rowling", 825, true);
addBookToLibrary("Harry Potter 2", "J.K.Rowling", 1125, true);
// addBookToLibrary("Once Upon A Time", "Author", 9800, true);
// addBookToLibrary("Frankenstein", "Mary Shelly", 742, false);
// addBookToLibrary("Lord of the Flies", "William Golding", 775, false);
// addBookToLibrary("Frankenstein", "Mary Shelly", 742, false);
// addBookToLibrary("Lord of the Flies", "William Golding", 775, false);

populateShelf();
// Add book popup form
const addBookForm = document.querySelector("#add-book-form");
const newBookBtn = document.querySelector("#new-book");
newBookBtn.addEventListener('click', ()=> {
    addBookForm.classList.remove("hide");
});

// close popup form to add book
cancelBookBtn.addEventListener('click', () => addBookForm.classList.add('hide'));

// Add book to book list from form
addBookBtn.addEventListener('click', handleBookAdd);