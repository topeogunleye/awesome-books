const getBooks = () => {
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
};

function generateId() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}

console.log(generateId());

const addBookToList = (book) => {
  const bookList = document.getElementById('booklist');

  const div = document.createElement('div');

  div.innerHTML = `
    <p>${book.title}</p>
    <p>${book.author}</p>
    <p>${book.isbn}</p>
    <button class="btn delete">Remove Book</button>
    `;

  bookList.appendChild(div);
};

// Store Functions: Handles Storage

const addBook = (book) => {
  const books = getBooks();

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
};

const removeBook = (isbn) => {
  const books = getBooks();

  books.forEach((book, index) => {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
};

// UI Function: Handle UI Tasks
const displayBooks = () => {
  const books = getBooks();

  books.forEach((book) => addBookToList(book));
};

const deleteBook = (el) => {
  if (el.classList.contains('delete')) {
    el.parentElement.remove();
  }
};

const clearFields = () => {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

// Event: Display Books
document.addEventListener('DOMContentLoaded', displayBooks);

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
  addBookToList(book);

  // Add Book to Store
  addBook(book);

  // Clear fields
  clearFields();
});

// Event: Remove a Book
document.getElementById('booklist').addEventListener('click', (e) => {
  // Remove Book from UI
  deleteBook(e.target);

  // Remove Book from the store
  removeBook(e.target.previousElementSibling.textContent);
});
