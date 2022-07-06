// Book Class: Represents a Book
class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
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
        <div class="b-title">${book.title}</div>
        <div class="b-author">${book.author}</div>
        <div class="x-pos"><a href="#" class="btn delete" id="x" >Remove</a></div>
        <br>
`;

      list.appendChild(row);
    }

    static deleteBook(el) {
      if(el.classList.contains('delete')) {
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

  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
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
        if(book.author === author) {
          books.splice(index, 1);
        }
      });

      localStorage.setItem('books', JSON.stringify(books));
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
    if(title === '' || author === '') {
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

    //Alternate row color on book list

  function altrows(firstcolor, secondcolor) {
    let rows = document.getElementsByTagName('table');
    for (var i = 0; i < rows.length; i++) {
      if (i % 2 == 0) {
        rows[i].style.backgroundColor = firstcolor;
      } else {
        rows[i].style.backgroundColor = secondcolor;
      }
    }
  }
  altrows("#f0f0f0", "#ffffff");

