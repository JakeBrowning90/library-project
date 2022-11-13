const container = document.querySelector('#container');
const sidebar = document.querySelector('#sidebar');
const callFormButton = document.getElementById("callForm")

const bookForm = document.querySelector('#bookForm');

//Create library array and Book constructor
let library = [];
function Book (title, author, pages, finished) {
    this.title = title
    this.author = author
    this.pages = pages
    this.finished = finished
}
Book.prototype.info = function() {
    return(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.finished)
} 

//Add Book object to Library array
function addBookToLibrary(Book) {
    library.push(Book)
}

//Manually-created sample books
const theHobbit = new Book("The Hobbit", "J.R.R. Tokien", 295, true);
const stayingAlive = new Book("Staying Alive in Toxic Times", "Dr. Jenny Goodman", 377, false);
addBookToLibrary(theHobbit);
addBookToLibrary(stayingAlive);
printLibrary()

//Call new book form
callFormButton.addEventListener('click', function(){
    callFormButton.remove();
    var titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title:";
    var titleField = document.createElement("input");
    titleField.setAttribute("required", "");
    titleField.setAttribute("id", "title");
    titleField.setAttribute("name", "title");
    var authorLabel = document.createElement("label");
    authorLabel.textContent = "Author:";
    var authorField = document.createElement("input");
    authorField.setAttribute("required", "");
    authorField.setAttribute("id", "author");
    authorField.setAttribute("name", "author");
    var pagesLabel = document.createElement("label");
    pagesLabel.textContent = "Page count:";
    var pagesField = document.createElement("input");
    pagesField.setAttribute("required", "");
    pagesField.setAttribute("id", "pages");
    pagesField.setAttribute("name", "pages");
    var readLabel = document.createElement("label");
    readLabel.textContent = "Read?:";
    var readField = document.createElement("input");
    readField.setAttribute("required", "");
    readField.setAttribute("id", "finished");
    readField.setAttribute("name", "finished");
    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "addBook");
    bookForm.appendChild(titleLabel);
    bookForm.appendChild(titleField);
    bookForm.appendChild(authorLabel);
    bookForm.appendChild(authorField);
    bookForm.appendChild(pagesLabel);
    bookForm.appendChild(pagesField);
    bookForm.appendChild(readLabel);
    bookForm.appendChild(readField);
    bookForm.appendChild(submitButton);
});

//Create new book with form, add to library, refresh list
bookForm.addEventListener('submit', (event) => {
    event.preventDefault()
    var newBook = new Book(title.value, author.value, pages.value, finished.value);
    addBookToLibrary(newBook);
    console.log(library);
    printLibrary();
  });

//Add library books to DOM
function printLibrary() {
    refreshPage()
    for (entry in library) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.textContent = library[entry].info();
        container.appendChild(card);
    }
}

//Refresh list and remove form
function refreshPage() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
    while (bookForm.firstChild) {
        bookForm.removeChild(bookForm.lastChild);
      }
    sidebar.appendChild(callFormButton);
}

