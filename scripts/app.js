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
    const bookList = document.getElementById('books-container');

    const div = document.createElement('div');

    div.classList.add('book-item');

    div.innerHTML = `
      <p>${book.title} by ${book.author}</p>
      <p class="d-none">${book.isbn}</p>
      <button class="btn delete">Remove</button>
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

// window.addEventListener('DOMContentLoaded', () => {
// https://codepen.io/ljc-dev/embed/GRoLWxj?height=600&default-tab=js,result&embed-version=2
// https://dev.to/ljcdev/easy-hamburger-menu-with-js-2do0
const navbar = document.querySelector('.navbar'); // list
const ham = document.querySelector('.ham'); // button
const menuLinks = document.querySelectorAll('.menuLink');

function toggleHamburger() {
  navbar.classList.toggle('showNav');
  ham.classList.toggle('showClose');
}

// toggles hamburger menu in and out when clicking on the hamburger
ham.addEventListener('click', toggleHamburger);

// toggle when clicking on links
menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', toggleHamburger);
});


// Add Highlight to Active Nav Link
// https://dev.to/areeburrub/change-nav-link-s-style-as-you-scroll-4p62
const sections = document.querySelectorAll('section');
console.log(sections)

const navLi = document.querySelectorAll('.navbar ul li a');

window.onscroll = () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    // console.log(sectionTop)

    // eslint-disable-next-line no-restricted-globals
    if (scrollY >= sectionTop - 60) {
      current = section.getAttribute('id');
      console.log(current);
    }
  });

  navLi.forEach((li) => {
    // console.log(li);
    li.classList.remove('active');

    if (li.classList.contains(current)) {
      li.classList.add('active');
    }
  });
};