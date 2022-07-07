/* eslint max-classes-per-file: ['error', 4] */

// Book Class: Represents a Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('div');

    row.innerHTML = `
        <div class="tcard">
        <div class="b-title">${book.title}</div>
        <div class="b-author">${book.author}</div>
        <div class="x-pos"><a href="#" class="btn delete" id="x" >Remove</a></div>
        <br>
        </div>
`;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Validate
  if (title === '' || author === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Book Removed', 'success');
});

// Alternate row color on book list

/* function altrows(firstcolor, secondcolor) {
  const rows = document.getElementsByTagName('table');
  for (let i = 0; i < rows.length; i++) {
    if (i % 2 == 0) {
      rows[i].style.backgroundColor = firstcolor;
    } else {
      rows[i].style.backgroundColor = secondcolor;
    }
  }
}
altrows('#f0f0f0', '#ffffff');
 */

const errorMsg = document.querySelector('#message');

class BookForm {
  constructor() {
    this.books = [
      {
        title: 'Example Book',
        author: 'Example Author',
      },
      {
        title: 'Another Example Book',
        author: 'Another Author',
      },
    ];
  }

  genHTML() {
    const htmlString = `
          <div class="book-card">
            <p class="book-title"></p>
            <p class="book-author"></p>
            <button class="book-btn">Remove</button>
          </div>
          <hr>
      `;
    for (let i = 0; i < this.books.length; i += 1) {
      document.getElementById('book-form').innerHTML += htmlString;
      const title = document.querySelectorAll('.book-title');
      const author = document.querySelectorAll('.book-author');
      const button = document.querySelectorAll('.book-btn');
      if (this.books[i].author === '') {
        author[i].innerHTML = 'By Unknown';
        errorMsg.innerHTML = 'Last author was set as "Unknown"';
      } else {
        author[i].innerHTML = `${this.books[i].author}`;
        errorMsg.innerHTML = '';
      }
      title[i].innerHTML = `${this.books[i].title}`;
      button[i].setAttribute('onclick', `bookForm.removeBook(${i})`);
    }
  }

  addBook(title, author) {
    const bookData = {
      title,
      author,
    };
    this.books.push(bookData);
    const bookList = JSON.stringify(this.books);
    localStorage.setItem('Books', bookList);
    document.querySelector('#empty-list').innerHTML = '';
    document.querySelector('#invitation').innerHTML = '';
  }

  reload() {
    if (localStorage.getItem('Books')) {
      const oldStorage = localStorage.getItem('Books');
      const newStorage = JSON.parse(oldStorage);
      document.getElementById('book-form').innerHTML = '';
      this.books = newStorage;
      this.genHTML();
    } else {
      this.genHTML();
    }
  }

  removeBook(num) {
    this.books.splice(num, 1);
    const bookList = JSON.stringify(this.books);
    localStorage.setItem('Books', bookList);
    this.reload();
  }
}

const bookForm = new BookForm();
window.onload = bookForm.reload();

const form = document.forms[0];
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#button');
addBtn.addEventListener('click', () => {
  if (title.value === '') {
    errorMsg.style.color = '#f00';
    errorMsg.innerHTML = 'Title required';
    document.forms[0][0].style.borderColor = '#f00';
  } else {
    bookForm.addBook(title.value, author.value);
    bookForm.reload();
    errorMsg.style.color = '#000';
    form[0].style.borderColor = '#000';
    form.reset();
  }
});
