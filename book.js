const { json } = require('body-parser');

if (typeof localStorage === 'undefined' || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

let myLibrary = [];
let uniqueID = 0;

class Book {
    constructor(title, author, pages) {
        this.id = ++uniqueID
        this.title = title
        this.author = author
        this.pages = pages
        this.read = false
    }

    read() {
        this.read = true
    }
    notRead() {
        this.read = false
    }
}

function addBookToLibrary(title, author, pages) {
    
    myLibrary.push(new Book(title, author, pages));

    saveLocal();

}

function removeFromLibrary(index) {
    myLibrary.splice(index, 1)

    saveLocal();
}

function getBook() {
    return myLibrary.filter(book => book.id === req.params._id);
}

function bookInfo() {
    for (books of myLibrary) {
        console.log(`${books.title} by ${books.author}, ${books.pages} pages, ${books.read}.`)
    }
}

// Local Storage
function saveLocal() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    localStorage.setItem('uniqueID', uniqueID);
};

function restoreLocal() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    uniqueID = localStorage.getItem('uniqueID');
    if (myLibrary === null) myLibrary = [];
}

restoreLocal();

module.exports = {
    myLibrary,
    addBookToLibrary,
    Book,
    removeFromLibrary,
    getBook,
};