export default class Book {
  constructor(title="unavailable", author="unknown", numOfPages=0, readStatus=false) {
      this.title = title;
      this.author = author;
      this.numOfPages = numOfPages;
      this.readStatus = readStatus;
  }
  
  toggleRead() {
      this.readStatus = !this.readStatus;
  }
}