const container = document.querySelector('#container');
const sidebar = document.querySelector('#sidebar');
const callFormButton = document.getElementById('callForm');
const bookForm = document.querySelector('#bookForm');
const deleteButton = document.querySelectorAll('.deleteButton');

//Create library array and Book constructor
let library = [];
// function Book (title, author, pages, readStatus) {
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.readStatus = readStatus
// }

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author
        this.pages = pages
        this.readStatus = readStatus
    }
}

//Holdover from practice build, example of a function declared in the Object prototype
Book.prototype.info = function() {
    return(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.readStatus)
} 
//Function to toggle readStatus and show change on screen
Book.prototype.changeReadStatus = function() {
    if (this.readStatus == true) {
        this.readStatus = false
    }
    else if (this.readStatus == false) {
        this.readStatus = true
    }
    refreshPage();
    printLibrary();
} 

//Add Book object to Library array
function addBookToLibrary(Book) {
    library.push(Book)
}

//Call new book form, build in sidebar
callFormButton.addEventListener('click', function(){
    callFormButton.remove();
    //Create divs to allow proper grid display of form elements
    const titleDiv = document.createElement("div");
    titleDiv.classList.add('formTextInput');
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title:";
    const titleField = document.createElement("input");
    titleField.setAttribute("required", "");
    titleField.setAttribute("id", "title");
    titleField.setAttribute("name", "title");

    const authorDiv = document.createElement("div");
    authorDiv.classList.add('formTextInput');
    const authorLabel = document.createElement("label");
    authorLabel.textContent = "Author:";
    const authorField = document.createElement("input");
    authorField.setAttribute("required", "");
    authorField.setAttribute("id", "author");
    authorField.setAttribute("name", "author");

    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add('formTextInput');
    const pagesLabel = document.createElement("label");
    pagesLabel.textContent = "Page count:";
    const pagesField = document.createElement("input");
    pagesField.setAttribute("required", "");
    pagesField.setAttribute("type", "number");
    pagesField.setAttribute("id", "pages");
    pagesField.setAttribute("name", "pages");

    const radioRow = document.createElement('div');
    radioRow.classList.add('radioRow');
    const readLabel = document.createElement("label");
    readLabel.textContent = "Read:";
    readLabel.setAttribute("for", "readTrue")
    const readRadio = document.createElement("input");
    readRadio.setAttribute("type", "radio");
    readRadio.setAttribute("id", "readTrue");
    readRadio.setAttribute("name", "readStatus");

    //const radioRow2 = document.createElement('div');
    const unreadLabel = document.createElement("label");
    unreadLabel.textContent = "Unread:";
    unreadLabel.setAttribute("for", "readFalse")
    const unreadRadio = document.createElement("input");
    unreadRadio.setAttribute("type", "radio");
    unreadRadio.setAttribute("id", "readFalse");
    unreadRadio.setAttribute("name", "readStatus");
    unreadRadio.setAttribute("checked", "");

    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "addBook");
    submitButton.classList.add('formButton');

    const cancelButton = document.createElement("input");
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("id", "cancelButton");
    cancelButton.setAttribute("value", "Cancel");
    cancelButton.classList.add('formButton');
    cancelButton.addEventListener("click", function () {
        refreshPage();
        printLibrary();
    });
    bookForm.appendChild(titleDiv);
    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleField);

    bookForm.appendChild(authorDiv);
    authorDiv.appendChild(authorLabel);
    authorDiv.appendChild(authorField);

    bookForm.appendChild(pagesDiv);
    pagesDiv.appendChild(pagesLabel);
    pagesDiv.appendChild(pagesField);

    //bookForm.appendChild(radioRow1);
    bookForm.appendChild(radioRow);
    radioRow.appendChild(unreadLabel);
    radioRow.appendChild(unreadRadio);

    //bookForm.appendChild(radioRow2);
    radioRow.appendChild(readLabel);
    radioRow.appendChild(readRadio);

    bookForm.appendChild(submitButton);

    bookForm.appendChild(cancelButton);
});

//Get new book values from form, then add to library and print library
bookForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let readStatus;
    if (document.getElementById("readTrue").checked==true) {
        readStatus = true;
    } else {
        readStatus = false;
    }
    const newBook = new Book(title.value, author.value, pages.value, readStatus);
    addBookToLibrary(newBook);
    printLibrary();
  });

//Add library books to DOM as cards
function printLibrary() {
    refreshPage()
    let libraryPosition = 0;
    for (const entry in library) {
        let card = document.createElement('div');
        card.classList.add('card');
        
        let titleRow = document.createElement('div');
        titleRow.classList.add('titleRow');
        titleRow.textContent = library[entry].title;
        let bookInfoRow = document.createElement('div');
        bookInfoRow.textContent = library[entry].author + ", "+ library[entry].pages + " pages";

        let readToggle = document.createElement('button');
        readToggle.classList.add('readToggle');
        if (library[entry].readStatus == true) {
            readToggle.textContent = "Finished";
            readToggle.classList.add('finished');
        } else if (library[entry].readStatus == false) {
            readToggle.textContent = "Unfinished";
            readToggle.classList.add('unfinished');
        }

        readToggle.addEventListener("click", function () {
            library[entry].changeReadStatus();
        });

        let deleteButton = document.createElement("button");
        deleteButton.classList.add('deleteButton');
        deleteButton.textContent = "Remove";
        deleteButton.setAttribute("data-libraryIndex", libraryPosition);
        deleteButton.addEventListener("click", function () {
            removeBook(this.getAttribute('data-libraryIndex'))
        });
        card.appendChild(titleRow);
        card.appendChild(bookInfoRow);
        card.appendChild(readToggle);
        card.appendChild(deleteButton);
        container.appendChild(card);
        libraryPosition++;
    }
}

//Remove Book from library, disappears from DOM on next refresh and print
function removeBook(libraryPosition) {
    library.splice(libraryPosition, libraryPosition + 1);
    refreshPage();
    printLibrary();
}

//Refresh list and hide form
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
let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
let stayingAlive = new Book("Staying Alive in Toxic Times", "Dr. Jenny Goodman", 377, false);
let danceWithDragons = new Book("A Dance with Dragons, Part 2: After the Feast", "George R. R. Martin", 560, false)
addBookToLibrary(theHobbit);
addBookToLibrary(stayingAlive);
addBookToLibrary(danceWithDragons);
printLibrary()
