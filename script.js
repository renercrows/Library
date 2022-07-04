const titleInput = document.querySelector('.title');
const authorImput = document.querySelector('.author');
const button = document.querySelector('.addbtn');
const bookList = document.querySelector('.booklist');

button addEventListener('click', function() {
    if (
        titleInput.value == '' && 
        authorImput.value == ''
        ) {
        alert('Enter any input');
    }   else {
        const booklistRow = document.createElement('tr');

        const newTitle = document.createElement('th');
        newTitle.innerHTML = titleInput.value;
        booklistRow.appendChild(newTitle);
        const newAuthor = document.createElement('th');
        newAuthor.innerHTML = authorInput.value;
        booklistRow.appendChild(newAuthor);
    }
});