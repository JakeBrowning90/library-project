const container = document.querySelector('#container');
const sidebar = document.querySelector('#sidebar');
const callFormButton = document.getElementById("callForm")
const bookForm = document.querySelector('#bookForm');

//Create library array and Book constructor
let library = [];
function Book (title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
}
Book.prototype.info = function() {
    return(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.readStatus)
} 

//Add Book object to Library array
function addBookToLibrary(Book) {
    library.push(Book)
}

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
    readLabel.textContent = "Read:";
    readLabel.setAttribute("for", "readTrue")
    var readRadio = document.createElement("input");
    readRadio.setAttribute("type", "radio");
    readRadio.setAttribute("id", "readTrue");
    readRadio.setAttribute("name", "readStatus");
    readRadio.setAttribute("checked", "");
    var unreadLabel = document.createElement("label");
    unreadLabel.textContent = "Unread:";
    unreadLabel.setAttribute("for", "readFalse")
    var unreadRadio = document.createElement("input");
    unreadRadio.setAttribute("type", "radio");
    unreadRadio.setAttribute("id", "readFalse");
    unreadRadio.setAttribute("name", "readStatus");
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
    bookForm.appendChild(readRadio);
    bookForm.appendChild(unreadLabel);
    bookForm.appendChild(unreadRadio);
    bookForm.appendChild(submitButton);
});

//Get new book values from form, add to library, refresh list
bookForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let readStatus;
    if (document.getElementById("readTrue").checked==true) {
        readStatus = true;
    } else {
        readStatus = false;
    }
    var newBook = new Book(title.value, author.value, pages.value, readStatus);
    addBookToLibrary(newBook);
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

//Manually-created sample books
const theHobbit = new Book("The Hobbit", "J.R.R. Tokien", 295, true);
const stayingAlive = new Book("Staying Alive in Toxic Times", "Dr. Jenny Goodman", 377, false);
addBookToLibrary(theHobbit);
addBookToLibrary(stayingAlive);
printLibrary()
