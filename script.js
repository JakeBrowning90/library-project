function Book (title, author, pages, finished) {
    this.title = title
    this.author = author
    this.pages = pages
    this.finished = finished
    this.info = function() {
        return(title + " by " + author + ", " + pages + " pages, " + finished)
    } 
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tokien", 295, "finished");

console.log(theHobbit.info())
