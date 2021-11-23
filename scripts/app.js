// Book Class: Represent a Book class
/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Store Class: Handle localStorage
class Store {
  // Generate random book
  static generateId() {
    return (
      Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
    );
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [
        { title: 'Book 1', author: 'Temitope Ogunleye', isbn: Store.generateId() },
        { title: 'Book 2', author: 'Elumelu', isbn: Store.generateId() },
        { title: 'Anselem', author: 'Elumelu', isbn: Store.generateId() },
      ];
      localStorage.setItem('books', JSON.stringify(books));
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  // Add Book to localStorage
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  // Remove Book
  static removeBook(isbn) {
    let books = Store.getBooks();

    books = books.filter((book) => book.isbn !== isbn);

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI Class: Handle UI class
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const bookList = document.getElementById('booklist');

    const div = document.createElement('div');

    div.innerHTML = `
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.isbn}</p>
      <button class="btn delete">Remove Book</button>
      `;

    bookList.appendChild(div);
  }

  // Delete book from UI
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }

  // To Clear Field
  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.getElementById('book-form').addEventListener('submit', (e) => {
  // Prevent submit event
  e.preventDefault();

  // Get Form Values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = Store.generateId();

  // Instatiate Books
  const book = new Book(title, author, isbn);

  // Add Book to UI
  UI.addBookToList(book);

  // Add Book to Store
  Store.addBook(book);

  // Clear fields
  UI.clearFields();
});

// Event: Remove a Book
document.getElementById('booklist').addEventListener('click', (e) => {
  // Remove Book from UI
  UI.deleteBook(e.target);

  // Remove Book from the store
  Store.removeBook(e.target.previousElementSibling.textContent);
});

// Generate Random JavaScript ID
