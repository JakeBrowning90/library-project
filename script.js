const container = document.querySelector('#container');

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

//Create new book with form, add to library, refresh list
const bookForm = document.querySelector('#bookForm');
bookForm.addEventListener('submit', (event) => {
    event.preventDefault()
    var newBook = new Book(title.value, author.value, pages.value, finished.value);
    addBookToLibrary(newBook);
    printLibrary();
  });

//Add library books to DOM
function printLibrary() {
    refreshList()
    for (entry in library) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.textContent = library[entry].info();
        container.appendChild(card);
    }
}

//Refresh list
function refreshList() {
    document.getElementById("bookForm").reset();
    while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
}

