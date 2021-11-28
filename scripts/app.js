/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-unresolved */
import { DateTime } from 'https://cdn.skypack.dev/luxon@1.25.0';

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
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [
        {
          title: 'Book 1',
          author: 'Temitope Ogunleye',
          isbn: Store.generateId(),
        },
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

  static getTime() {
    // https://codepen.io/melissamcewen/pen/wvzYeNN?editors=0010
    const now = DateTime.local();
    console.log(now);
    const dateFormatted = now.toFormat("EEEE',' MMMM d',' ha");
    const date = document.querySelector('.date');

    const today = document.createElement('p');
    today.textContent = dateFormatted;
    date.appendChild(today);
  }

  static displayActiveSection(li) {
    // Display Active Section
    current = li.getAttribute('data-id');

    sections.forEach((section) => {
      section.classList.remove('active');

      if (section.classList.contains(current)) {
        section.classList.add('active');
      }
    });

    // Highlight Navbar link of Active Section
    navLi.forEach((li) => {
      li.classList.remove('active');

      if (li.classList.contains(current)) {
        li.classList.add('active');
      }
    });
  }

  static toggleHamburger() {
    navbar.classList.toggle('showNav');
    ham.classList.toggle('showClose');
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

// Event: Get Local Time
document.addEventListener('DOMContentLoaded', UI.getTime);
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

// toggles hamburger menu in and out when clicking on the hamburger
ham.addEventListener('click', UI.toggleHamburger);

// toggle when clicking on links
menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', UI.toggleHamburger);
});

// Add Highlight to Active Nav Link
// https://dev.to/areeburrub/change-nav-link-s-style-as-you-scroll-4p62
const main = document.querySelector('main');
const sections = main.querySelectorAll('section');
// console.log(sections);

const navLi = document.querySelectorAll('.navbar ul li a');

let current = '';

navLi.forEach((li) => {
  li.addEventListener('click', () => UI.displayActiveSection(li));
});
