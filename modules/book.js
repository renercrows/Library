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
      <tr>
        <td>
          <article class="book-card">
            <p class="book-title"></p>
            <p class="book-author"></p>
            <button class="book-btn">Remove</button>
          </article>
        </td>
      </tr>
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
        author[i].innerHTML = `By ${this.books[i].author}`;
        errorMsg.innerHTML = '';
      }
      window.bookForm = bookForm;
      title[i].innerHTML = `"${this.books[i].title}"`;
      button[i].setAttribute('onclick', `bookForm.removeBook(${i})`);
    }
    if (this.books.length === 0) {
      document.querySelector('#empty-list').innerHTML = 'List empty';
      document.querySelector('#invitation').innerHTML = 'Add a new book!';
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

export default BookForm;