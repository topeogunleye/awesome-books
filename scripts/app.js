// UI Function: Handle UI Tasks
  const displayBooks = () => {
    
    const books = getBooks();

    books.forEach((book) => addBookToList(book));
  }

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
  }

  const deleteBook = (el) => {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }

  const clearFields = () => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

// Store Functions: Handles Storage
  const getBooks = () => {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }

  const addBook = (book) => {
    const books = getBooks()

    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))
  }

  const removeBook = (isbn) => {
    const books = getBooks()

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }

// Event: Display Books
document.addEventListener('DOMContentLoaded', displayBooks);  

// Event: Add a Book
document.getElementById('book-form').addEventListener('submit', (e) => {
  // Prevent submit event
  e.preventDefault();

  // Get Form Values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Validate
  if (title === '' || author === '' || isbn === '') {
    alert('Please fill in all fields');
  } else {
    // Instatiate Books
    const book = {
      title: title,
      author: author,
      isbn: isbn
    }


    // Add Book to UI
    addBookToList(book);

    // Add Book to Store
    addBook(book)

    // Clear fields
    clearFields();
  }
});

// Event: Remove a Book
document.getElementById('booklist').addEventListener('click', (e) => {
  // Remove Book from UI
  deleteBook(e.target);

  // Remove Book from the store
  removeBook(e.target.previousElementSibling.textContent);
});
