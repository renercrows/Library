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

export const toggleList = () => {
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

export default setTimeDate;