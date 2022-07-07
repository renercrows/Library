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

// Navbar

/* eslint-disable no-undef */
const listLink = document.getElementById('list-btn');
const addNewLink = document.getElementById('add-new-btn');
const invitation = document.getElementById('invitation');
const contactLink = document.getElementById('contact-btn');

const setTimeDate = () => {
  const { DateTime } = luxon;
  const now = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
  document.getElementById('date').innerHTML = now;
};

window.setInterval(setTimeDate, 1000);

const list = document.getElementById('list');
const addNew = document.getElementById('add-new');
const contact = document.getElementById('contact');
let visibility = 'list';
if (localStorage.getItem('visibility')) {
  visibility = localStorage.getItem('visibility');
}

const toggleList = () => {
  if (list.classList.contains('invisible')) {
    list.classList.toggle('invisible');
    addNew.classList.add('invisible');
    contact.classList.add('invisible');
  }
  visibility = 'list';
  localStorage.setItem('visibility', visibility);
  listLink.style.color = 'gray';
  addNewLink.style.color = 'black';
  contactLink.style.color = 'black';
};

const toggleAddNew = () => {
  if (addNew.classList.contains('invisible')) {
    addNew.classList.toggle('invisible');
    list.classList.add('invisible');
    contact.classList.add('invisible');
  }
  visibility = 'add-new';
  localStorage.setItem('visibility', visibility);
  addNewLink.style.color = 'gray';
  listLink.style.color = 'black';
  contactLink.style.color = 'black';
};

const toggleContact = () => {
  if (contact.classList.contains('invisible')) {
    contact.classList.toggle('invisible');
    list.classList.add('invisible');
    addNew.classList.add('invisible');
  }
  visibility = 'contact';
  localStorage.setItem('visibility', visibility);
  contactLink.style.color = 'gray';
  listLink.style.color = 'black';
  addNewLink.style.color = 'black';
};

window.onload = () => {
  setTimeDate();
  switch (visibility) {
    case 'list':
      toggleList();
      break;
    case 'add-new':
      toggleAddNew();
      break;
    case 'contact':
      toggleContact();
      break;
    default:
      toggleList();
  }
};

listLink.onclick = () => { toggleList(); };
addNewLink.onclick = () => { toggleAddNew(); };
invitation.onclick = () => { toggleAddNew(); };
contactLink.onclick = () => { toggleContact(); };