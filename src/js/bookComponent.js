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
    card.innerHTML = `
      <p class="book-title">${this.title}</p>
      <p class="book-author">${this.author}</p>
      <p class="book-pages">Total Pages: ${Controller.formatLongNums(this.pages)}</p>
      <p class="book-read">Has been read: ${this.read}</p>
      <div>
        <button class="inbook-btn inbook-read-btn" type="button" data-index="${this.index}">Read?</button>
        <button class="inbook-btn inbook-remove-btn" type="button" data-index="${this.index}">Remove</button>
      </div>
    `;

    return card;
  }
}