import Controller from "./Controller";
export default class MakeBookComponent {
  constructor(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
  }
  render() {
    let card = document.createElement('div');
    card.classList.add('book-card');
    
    let bookTitleElem = document.createElement('p');
    bookTitleElem.classList.add('book-title');
    bookTitleElem.textContent = this.title;
    
    let bookAuthorElem = document.createElement('p');
    bookAuthorElem.classList.add('book-author');
    bookAuthorElem.textContent = `by ${this.author}`;
    
    let bookPagesElem = document.createElement('p');
    bookPagesElem.classList.add('book-pages');
    bookPagesElem.textContent = `Total Pages: ${Controller.formatLongNums(this.pages)}`;
    
    let bookReadElem = document.createElement('p');
    bookReadElem.classList.add('book-read');
    bookReadElem.textContent = `Has been read? ${this.read ? 'True' : 'False'}`;
    // create a div that will house two buttons
    let btnDiv = document.createElement('div');
    let readBtn = document.createElement('button');
    readBtn.classList.add("inbook-btn");
    readBtn.classList.add("inbook-read-btn");
    readBtn.textContent = "Read?";
    readBtn.setAttribute("type", "button");
    // this index data key will help update read status from book
    readBtn.dataset.index = this.index;
    
    let removeBtn = document.createElement('button');
    removeBtn.classList.add("inbook-btn");
    removeBtn.classList.add("inbook-remove-btn");
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("type", "button");
    // this index data key will help remove books from myLibrary later
    removeBtn.dataset.index = this.index;

    btnDiv.appendChild(readBtn);
    btnDiv.appendChild(removeBtn);

    card.appendChild(bookTitleElem);
    card.appendChild(bookAuthorElem);
    card.appendChild(bookPagesElem);
    card.appendChild(bookReadElem);
    card.appendChild(btnDiv);
    return card;
  }
}