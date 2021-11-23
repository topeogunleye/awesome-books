// Book Class: Represent a Book class
class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI class
class UI {
  static displayBooks() {
    const books = getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book){
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
  static deleteBook(book) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }

  // To Clear Field
  static clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Store Class: Handle localStorage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [
        { title: 'Book 1', author: 'Temitope Ogunleye', isbn: generateId() },
        { title: 'Book 2', author: 'Elumelu', isbn: generateId() },
        { title: 'Anselem', author: 'Elumelu', isbn: generateId() },
      ];
      localStorage.setItem('books', JSON.stringify(books));
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
  
    return books;
  }

  // Add Book to localStorage
  static addBook(book) {
    const books = getBooks();

    books.push(book);
  
    localStorage.setItem('books', JSON.stringify(books));
  }

  // Remove Book
  static removeBook(isbn){
    let books = getBooks();

    books = books.filter((book) => book.isbn !== isbn);
  
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks
)

// Event: Add a Book
document.getElementById('book-form').addEventListener('submit', (e) => {
  
  // Prevent submit event
  e.preventDefault();

  // Get Form Values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = generateId();

  // Instatiate Books
  const book = {
    title,
    author,
    isbn,
  };

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
function generateId() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}
